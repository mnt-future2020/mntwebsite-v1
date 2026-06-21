import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const params = await props.params;
  try {
    const { status } = await req.json();
    const slip = await prisma.payslip.update({ where: { id: params.id }, data: { status } });
    return NextResponse.json(slip);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const params = await props.params;
  try {
    await prisma.payslip.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
