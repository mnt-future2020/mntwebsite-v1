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
    if (b.dueDate !== undefined) data.dueDate = b.dueDate ? new Date(String(b.dueDate)) : null;
    if (b.amount !== undefined) data.amount = parseInt(String(b.amount), 10) || 0;
    if (b.status !== undefined) data.status = b.status as never;
    const m = await prisma.milestone.update({ where: { id }, data });
    return NextResponse.json(m);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.milestone.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
