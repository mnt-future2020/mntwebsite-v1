import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (b.name !== undefined) data.name = String(b.name);
    // Normalize to local midnight to match the create route — Holiday.date is
    // @unique, so an inconsistent instant breaks day-equality and the constraint.
    if (b.date !== undefined) {
      const dt = new Date(b.date);
      dt.setHours(0, 0, 0, 0);
      data.date = dt;
    }
    const h = await prisma.holiday.update({ where: { id: params.id }, data });
    return NextResponse.json(h);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await prisma.holiday.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
