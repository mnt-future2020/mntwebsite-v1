import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const projectId = String(b.projectId || "");
    const title = String(b.title || "").trim();
    if (!projectId || !title) return NextResponse.json({ error: "Project and title are required." }, { status: 400 });
    const t = await prisma.task.create({
      data: {
        projectId,
        title,
        description: (b.description as string) || null,
        status: (b.status as string || "TODO") as never,
        priority: (b.priority as string || "MEDIUM") as never,
        type: (b.type as string || "FEATURE") as never,
        assigneeId: (b.assigneeId as string) || null,
        sprintId: (b.sprintId as string) || null,
        estimateHours: Number(b.estimateHours) || 0,
        dueDate: b.dueDate ? new Date(String(b.dueDate)) : null,
      },
      include: { assignee: true },
    });
    return NextResponse.json(t);
  } catch {
    return NextResponse.json({ error: "Couldn't create the task." }, { status: 500 });
  }
}
