import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    const c = await prisma.contact.update({
      where: { id },
      data: {
        firstName: String(b.firstName || "").trim(),
        lastName: (b.lastName as string)?.trim() || null,
        email: (b.email as string)?.trim() || null,
        phone: (b.phone as string)?.trim() || null,
        title: (b.title as string)?.trim() || null,
        clientId: (b.clientId as string) || null,
        ownerId: (b.ownerId as string) || null,
        notes: (b.notes as string) || null,
        nextFollowUp: b.nextFollowUp ? new Date(String(b.nextFollowUp)) : null,
      },
      include: { client: true, owner: true, _count: { select: { deals: true } } },
    });
    return NextResponse.json(c);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.contact.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
