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
    const running = await prisma.timeEntry.findFirst({
      where: { employeeId: emp.id, endedAt: null, startedAt: { not: null } },
      orderBy: { startedAt: "desc" },
      select: { id: true, startedAt: true, note: true },
    });
    if (!running?.startedAt) return NextResponse.json({ error: "No running timer." }, { status: 404 });

    const now = new Date();
    const note = b.note !== undefined ? String(b.note) || null : running.note;
    const t = await prisma.timeEntry.update({
      where: { id: running.id },
      data: { endedAt: now, hours: elapsedHours(running.startedAt, now), date: istDayDate(running.startedAt), note },
      include: { task: true, project: true },
    });
    return NextResponse.json(t);
  } catch {
    return NextResponse.json({ error: "Couldn't stop the timer." }, { status: 500 });
  }
}
