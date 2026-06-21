import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const params = await props.params;
  try {
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (b.status) data.status = b.status;
    if (typeof b.notes === "string") data.notes = b.notes;
    const lead = await prisma.lead.update({ where: { id: params.id }, data });
    return NextResponse.json(lead);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const params = await props.params;
  try {
    await prisma.lead.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
