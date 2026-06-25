import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";

export const runtime = "nodejs";

// Log time for the signed-in employee.
export async function POST(req: Request) {
  const emp = await getCurrentEmployee();
  if (!emp) return NextResponse.json({ error: "No employee profile." }, { status: 403 });
  try {
    const b = await req.json();
    const projectId = String(b.projectId || "");
    const hours = Number(b.hours) || 0;
    if (!projectId || hours <= 0) return NextResponse.json({ error: "Project and hours are required." }, { status: 400 });

    // The employee may only log time on projects they lead or are a member of —
    // the route must enforce this, not just the project dropdown in the UI.
    const onProject = await prisma.project.findFirst({
      where: { id: projectId, OR: [{ leadId: emp.id }, { members: { some: { employeeId: emp.id } } }] },
      select: { id: true },
    });
    if (!onProject) return NextResponse.json({ error: "You are not assigned to that project." }, { status: 403 });

    // A supplied task must belong to that same project.
    const taskId = (b.taskId as string) || null;
    if (taskId) {
      const task = await prisma.task.findFirst({ where: { id: taskId, projectId }, select: { id: true } });
      if (!task) return NextResponse.json({ error: "Invalid task for this project." }, { status: 400 });
    }

    const t = await prisma.timeEntry.create({
      data: {
        projectId,
        employeeId: emp.id,
        taskId,
        date: b.date ? new Date(String(b.date)) : new Date(),
        hours,
        note: (b.note as string) || null,
        billable: b.billable === undefined ? true : Boolean(b.billable),
      },
      include: { task: true, project: true },
    });
    return NextResponse.json(t);
  } catch {
    return NextResponse.json({ error: "Couldn't log time." }, { status: 500 });
  }
}
