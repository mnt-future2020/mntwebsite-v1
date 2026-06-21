import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// An engineer can move the status of a task assigned to them.
export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  const emp = await getCurrentEmployee();
  if (!emp) return NextResponse.json({ error: "No employee profile." }, { status: 403 });
  try {
    const task = await prisma.task.findUnique({ where: { id }, select: { assigneeId: true } });
    if (!task || task.assigneeId !== emp.id) {
      return NextResponse.json({ error: "You can only update your own tasks." }, { status: 403 });
    }
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (b.status !== undefined) data.status = b.status as never;
    const t = await prisma.task.update({ where: { id }, data });
    return NextResponse.json(t);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}
