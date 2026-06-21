import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getOrgSettings, distanceM, nextPunchType } from "@/lib/org";

export const runtime = "nodejs";

const TZ = "Asia/Kolkata";
function nowParts() {
  const now = new Date();
  const hhmm = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now);
  const dateStr = new Intl.DateTimeFormat("en-CA", { timeZone: TZ }).format(now); // YYYY-MM-DD
  return { hhmm, dateStr };
}
function toMin(hhmm: string) {
  const [h, m] = hhmm.split(":").map((x) => parseInt(x, 10));
  return (h || 0) * 60 + (m || 0);
}

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  if (session.sub === "admin")
    return NextResponse.json({ error: "The super-admin account has no employee profile to punch." }, { status: 400 });

  let emp;
  try {
    emp = await prisma.employee.findUnique({ where: { id: session.sub } });
  } catch {
    return NextResponse.json({ error: "Database not reachable." }, { status: 500 });
  }
  if (!emp) return NextResponse.json({ error: "No employee profile found for this account." }, { status: 400 });
  if (emp.status === "EXITED") return NextResponse.json({ error: "This account is inactive." }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const lat = parseFloat(String(body.lat ?? ""));
  const lng = parseFloat(String(body.lng ?? ""));

  const org = await getOrgSettings();
  if (!org.scanEnabled)
    return NextResponse.json({ error: "QR attendance is currently turned off by admin." }, { status: 403 });
  if (org.officeLat == null || org.officeLng == null)
    return NextResponse.json({ error: "Office location isn't set up yet. Ask HR to configure it." }, { status: 400 });
  if (!Number.isFinite(lat) || !Number.isFinite(lng))
    return NextResponse.json({ error: "Couldn't read your location. Enable GPS and allow access." }, { status: 400 });

  const dist = distanceM(lat, lng, org.officeLat, org.officeLng);
  if (dist > org.geofenceRadiusM) {
    return NextResponse.json(
      {
        error: `You're ${dist}m from the office — must be within ${org.geofenceRadiusM}m to scan.`,
        distanceM: dist,
        outOfRange: true,
      },
      { status: 403 }
    );
  }

  const { hhmm, dateStr } = nowParts();
  const day = new Date(dateStr + "T00:00:00.000Z");

  // Decide next punch from today's punches.
  let todays;
  try {
    todays = await prisma.attendancePunch.findMany({
      where: { employeeId: emp.id, at: { gte: day } },
      orderBy: { at: "asc" },
    });
  } catch {
    return NextResponse.json({ error: "Database not reachable." }, { status: 500 });
  }
  const type = nextPunchType(todays.map((p) => p.type));
  if (!type)
    return NextResponse.json({ error: "You've already checked out for today." }, { status: 409 });

  try {
    await prisma.attendancePunch.create({
      data: { employeeId: emp.id, type, lat, lng, distanceM: dist, withinFence: true },
    });

    if (type === "CHECK_IN") {
      const late = Math.max(0, toMin(hhmm) - toMin(org.workStart));
      await prisma.attendance.upsert({
        where: { employeeId_date: { employeeId: emp.id, date: day } },
        update: { checkIn: hhmm, status: "PRESENT", lateMinutes: late },
        create: { employeeId: emp.id, date: day, checkIn: hhmm, status: "PRESENT", lateMinutes: late },
      });
    } else if (type === "CHECK_OUT") {
      await prisma.attendance.upsert({
        where: { employeeId_date: { employeeId: emp.id, date: day } },
        update: { checkOut: hhmm },
        create: { employeeId: emp.id, date: day, checkOut: hhmm, status: "PRESENT" },
      });
    }
  } catch {
    return NextResponse.json({ error: "Couldn't record the punch. Try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true, type, time: hhmm, distanceM: dist });
}
