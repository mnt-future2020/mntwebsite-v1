import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";
import { istDayDate, elapsedHours } from "@/lib/timer";

export const runtime = "nodejs";

// Start a timer for the signed-in employee. Enforces one running timer per
// employee by auto-stopping any timer that's still running first, then creates a
// RUNNING TimeEntry (startedAt set, endedAt null, hours 0). Survives reload —
// elapsed is derived from startedAt, not client state.
export async function POST(req: Request) {
  const emp = await getCurrentEmployee();
  if (!emp) return NextResponse.json({ error: "No employee profile." }, { status: 403 });
  try {
    const b = await req.json();
    const projectId = String(b.projectId || "");
    if (!projectId) return NextResponse.json({ error: "Pick a project to start the timer." }, { status: 400 });

    // Same authorization as manual logging: the employee must lead or be a member
    // of the project — enforced here, not just by the dropdown.
    const onProject = await prisma.project.findFirst({
      where: { id: projectId, OR: [{ leadId: emp.id }, { members: { some: { employeeId: emp.id } } }] },
      select: { id: true },
    });
    if (!onProject) return NextResponse.json({ error: "You are not assigned to that project." }, { status: 403 });

    const taskId = (b.taskId as string) || null;
    if (taskId) {
      const task = await prisma.task.findFirst({ where: { id: taskId, projectId }, select: { id: true } });
      if (!task) return NextResponse.json({ error: "Invalid task for this project." }, { status: 400 });
    }

    const now = new Date();
    const created = await prisma.$transaction(async (tx) => {
      // Auto-stop any timer still running for this employee (one at a time).
      const running = await tx.timeEntry.findFirst({
        where: { employeeId: emp.id, endedAt: null, startedAt: { not: null } },
        select: { id: true, startedAt: true },
      });
      if (running?.startedAt) {
        await tx.timeEntry.update({
          where: { id: running.id },
          data: { endedAt: now, hours: elapsedHours(running.startedAt, now), date: istDayDate(running.startedAt) },
        });
      }
      return tx.timeEntry.create({
        data: {
          projectId,
          employeeId: emp.id,
          taskId,
          date: istDayDate(now),
          hours: 0,
          startedAt: now,
          endedAt: null,
          note: (b.note as string) || null,
          billable: b.billable === undefined ? true : Boolean(b.billable),
        },
        include: { task: true, project: true },
      });
    });
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Couldn't start the timer." }, { status: 500 });
  }
}
