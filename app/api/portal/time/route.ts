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
    const t = await prisma.timeEntry.create({
      data: {
        projectId,
        employeeId: emp.id,
        taskId: (b.taskId as string) || null,
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
