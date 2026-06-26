import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";

export const runtime = "nodejs";

// The signed-in employee's currently running timer (if any), so the widget can
// resume live ticking after a reload or re-login. Elapsed is computed client-side
// from startedAt.
export async function GET() {
  const emp = await getCurrentEmployee();
  if (!emp) return NextResponse.json({ error: "No employee profile." }, { status: 403 });
  try {
    const running = await prisma.timeEntry.findFirst({
      where: { employeeId: emp.id, endedAt: null, startedAt: { not: null } },
      orderBy: { startedAt: "desc" },
      include: { task: true, project: true },
    });
    if (!running) return NextResponse.json({ active: null });
    return NextResponse.json({
      active: {
        id: running.id,
        startedAt: running.startedAt,
        projectId: running.projectId,
        taskId: running.taskId,
        project: running.project?.name || "",
        task: running.task?.title || null,
        note: running.note,
      },
    });
  } catch {
    return NextResponse.json({ active: null });
  }
}
