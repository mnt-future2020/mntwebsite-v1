import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const params = await props.params;
  try {
    const { name, head } = await req.json();
    const d = await prisma.department.update({
      where: { id: params.id },
      data: { ...(name ? { name } : {}), head: head ?? null },
    });
    return NextResponse.json(d);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const params = await props.params;
  try {
    await prisma.department.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed — move employees out of this department first." }, { status: 500 });
  }
}
