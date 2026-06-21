import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (b.title !== undefined) data.title = String(b.title).trim();
    if (b.description !== undefined) data.description = (b.description as string) || null;
    if (b.status !== undefined) data.status = b.status as never;
    if (b.priority !== undefined) data.priority = b.priority as never;
    if (b.type !== undefined) data.type = b.type as never;
    if (b.assigneeId !== undefined) data.assigneeId = (b.assigneeId as string) || null;
    if (b.sprintId !== undefined) data.sprintId = (b.sprintId as string) || null;
    if (b.estimateHours !== undefined) data.estimateHours = Number(b.estimateHours) || 0;
    if (b.dueDate !== undefined) data.dueDate = b.dueDate ? new Date(String(b.dueDate)) : null;
    const t = await prisma.task.update({ where: { id }, data, include: { assignee: true } });
    return NextResponse.json(t);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
