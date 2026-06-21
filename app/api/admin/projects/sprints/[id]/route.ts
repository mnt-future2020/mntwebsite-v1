import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (b.name !== undefined) data.name = String(b.name).trim();
    if (b.goal !== undefined) data.goal = (b.goal as string) || null;
    if (b.startDate !== undefined) data.startDate = b.startDate ? new Date(String(b.startDate)) : null;
    if (b.endDate !== undefined) data.endDate = b.endDate ? new Date(String(b.endDate)) : null;
    if (b.status !== undefined) data.status = b.status as never;
    const s = await prisma.sprint.update({ where: { id }, data });
    return NextResponse.json(s);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.sprint.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
