import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";

function dayStart(s: string) {
  const d = new Date(s);
  d.setHours(0, 0, 0, 0);
  return d;
}

export async function POST(req: Request) {
  try {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const { date, records } = await req.json();
    if (!date || !Array.isArray(records)) {
      return NextResponse.json({ error: "Date and records are required." }, { status: 400 });
    }
    // A MANAGER may only mark attendance for their own team — the section gate
    // alone doesn't restrict which employees the request body targets.
    if (session.role === "MANAGER") {
      const allowed = new Set(
        (
          await prisma.employee.findMany({
            where: { managerId: session.sub },
            select: { id: true },
          })
        ).map((e) => e.id)
      );
      const outside = records.some((r: Record<string, unknown>) => !allowed.has(String(r.employeeId)));
      if (outside) {
        return NextResponse.json({ error: "You can only mark attendance for your team." }, { status: 403 });
      }
    }
    const day = dayStart(date);
    await prisma.$transaction(
      records.map((r: Record<string, unknown>) =>
        prisma.attendance.upsert({
          where: { employeeId_date: { employeeId: String(r.employeeId), date: day } },
          update: {
            status: String(r.status || "PRESENT") as never,
            checkIn: (r.checkIn as string) || null,
            checkOut: (r.checkOut as string) || null,
            lateMinutes: Number(r.lateMinutes) || 0,
            note: (r.note as string) || null,
          },
          create: {
            employeeId: String(r.employeeId),
            date: day,
            status: String(r.status || "PRESENT") as never,
            checkIn: (r.checkIn as string) || null,
            checkOut: (r.checkOut as string) || null,
            lateMinutes: Number(r.lateMinutes) || 0,
            note: (r.note as string) || null,
          },
        })
      )
    );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Couldn't save attendance." }, { status: 500 });
  }
}
