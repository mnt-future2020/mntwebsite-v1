import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";
import { istDayDate, elapsedHours } from "@/lib/timer";

export const runtime = "nodejs";

// Stop the signed-in employee's running timer: set endedAt, compute hours from
// the real start instant, and file the entry under its start day. The running
// entry is resolved server-side by employeeId — an id from the client is never
// trusted.
export async function POST(req: Request) {
  const emp = await getCurrentEmployee();
  if (!emp) return NextResponse.json({ error: "No employee profile." }, { status: 403 });
  try {
    const b = await req.json().catch(() => ({}));
    // Close ALL running timers for this employee (normally one; sweeps up orphans
    // too). The note override, if any, applies only to the newest entry.
    const running = await prisma.timeEntry.findMany({
      where: { employeeId: emp.id, endedAt: null, startedAt: { not: null } },
      orderBy: { startedAt: "desc" },
      select: { id: true, startedAt: true, note: true },
    });
    if (running.length === 0) return NextResponse.json({ error: "No running timer." }, { status: 404 });

    const now = new Date();
    const noteOverride = b.note !== undefined ? String(b.note) || null : undefined;
    const closed = await prisma.$transaction(
      running
        .filter((r): r is typeof r & { startedAt: Date } => !!r.startedAt)
        .map((r, i) =>
          prisma.timeEntry.update({
            where: { id: r.id },
            data: {
              endedAt: now,
              hours: elapsedHours(r.startedAt, now),
              date: istDayDate(r.startedAt),
              note: i === 0 && noteOverride !== undefined ? noteOverride : r.note,
            },
            include: { task: true, project: true },
          })
        )
    );
    return NextResponse.json(closed[0]); // newest (orderBy desc) — the one the user sees
  } catch {
    return NextResponse.json({ error: "Couldn't stop the timer." }, { status: 500 });
  }
}
