import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const projectId = String(b.projectId || "");
    const employeeId = String(b.employeeId || "");
    const hours = Number(b.hours) || 0;
    if (!projectId || !employeeId || hours <= 0) {
      return NextResponse.json({ error: "Project, employee and hours are required." }, { status: 400 });
    }
    const t = await prisma.timeEntry.create({
      data: {
        projectId,
        employeeId,
        taskId: (b.taskId as string) || null,
        date: b.date ? new Date(String(b.date)) : new Date(),
        hours,
        note: (b.note as string) || null,
        billable: b.billable === undefined ? true : Boolean(b.billable),
      },
      include: { employee: true, task: true },
    });
    return NextResponse.json(t);
  } catch {
    return NextResponse.json({ error: "Couldn't log time." }, { status: 500 });
  }
}
