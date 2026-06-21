import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (b.done !== undefined) data.done = Boolean(b.done);
    if (b.subject !== undefined) data.subject = String(b.subject).trim();
    if (b.body !== undefined) data.body = (b.body as string) || null;
    const a = await prisma.activity.update({ where: { id }, data, include: { owner: true } });
    return NextResponse.json(a);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.activity.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
