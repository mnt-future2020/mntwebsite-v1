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
    const result = await prisma.$transaction(async (tx) => {
      // Auto-stop ALL timers still running for this employee — normally one, but
      // closing every open entry means a stray/orphaned running row (e.g. from an
      // overlapping start in another tab) can never linger uncloseable.
      const running = await tx.timeEntry.findMany({
        where: { employeeId: emp.id, endedAt: null, startedAt: { not: null } },
        orderBy: { startedAt: "desc" },
        select: { id: true, startedAt: true },
      });
      const stopped = [];
      for (const r of running) {
        if (!r.startedAt) continue;
        stopped.push(
          await tx.timeEntry.update({
            where: { id: r.id },
            data: { endedAt: now, hours: elapsedHours(r.startedAt, now), date: istDayDate(r.startedAt) },
            include: { project: true },
          })
        );
      }
      const fresh = await tx.timeEntry.create({
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
      return { fresh, stopped };
    });
    // Surface any auto-stopped entry so the client can show it in the recent list.
    return NextResponse.json({
      ...result.fresh,
      autoStopped: result.stopped.map((c) => ({ id: c.id, hours: c.hours, date: c.date, project: c.project?.name || "", note: c.note })),
    });
  } catch {
    return NextResponse.json({ error: "Couldn't start the timer." }, { status: 500 });
  }
}
