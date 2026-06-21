import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (b.status !== undefined) data.status = b.status as never;
    if (b.amount !== undefined) data.amount = parseInt(String(b.amount), 10) || 0;
    if (b.currency !== undefined) data.currency = String(b.currency);
    if (b.issueDate !== undefined) data.issueDate = b.issueDate ? new Date(String(b.issueDate)) : null;
    if (b.dueDate !== undefined) data.dueDate = b.dueDate ? new Date(String(b.dueDate)) : null;
    if (b.notes !== undefined) data.notes = (b.notes as string) || null;
    const inv = await prisma.invoice.update({ where: { id }, data, include: { project: true, client: true } });
    return NextResponse.json(inv);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.invoice.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
