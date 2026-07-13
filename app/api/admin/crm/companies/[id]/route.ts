import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    // Partial update — only touch keys the caller sent (inline-field saves).
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {};
    if ("name" in b) data.name = String(b.name || "").trim();
    if ("contact" in b) data.contact = (b.contact as string)?.trim() || null;
    if ("email" in b) data.email = (b.email as string)?.trim() || null;
    if ("phone" in b) data.phone = (b.phone as string)?.trim() || null;
    if ("website" in b) data.website = (b.website as string)?.trim() || null;
    if ("status" in b && b.status) data.status = b.status as never;
    if ("notes" in b) data.notes = (b.notes as string) || null;
    const c = await prisma.client.update({ where: { id }, data });
    return NextResponse.json(c);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const [projects, deals] = await Promise.all([
      prisma.project.count({ where: { clientId: id } }),
      prisma.deal.count({ where: { clientId: id } }),
    ]);
    if (projects + deals > 0) {
      return NextResponse.json({ error: `Linked to ${projects} project(s) and ${deals} deal(s). Reassign them first.` }, { status: 409 });
    }
    await prisma.client.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
