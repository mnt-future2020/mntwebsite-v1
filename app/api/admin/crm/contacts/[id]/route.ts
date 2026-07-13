import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    // Partial update — only touch keys the caller sent, so a single inline-field
    // save (record page) never wipes the fields it didn't include.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = {};
    if ("firstName" in b) { const v = String(b.firstName || "").trim(); if (v) data.firstName = v; } // required — ignore blanks
    if ("lastName" in b) data.lastName = (b.lastName as string)?.trim() || null;
    if ("email" in b) data.email = (b.email as string)?.trim() || null;
    if ("phone" in b) data.phone = (b.phone as string)?.trim() || null;
    if ("title" in b) data.title = (b.title as string)?.trim() || null;
    if ("clientId" in b) data.clientId = (b.clientId as string) || null;
    if ("ownerId" in b) data.ownerId = (b.ownerId as string) || null;
    if ("notes" in b) data.notes = (b.notes as string) || null;
    if ("nextFollowUp" in b) data.nextFollowUp = b.nextFollowUp ? new Date(String(b.nextFollowUp)) : null;
    const c = await prisma.contact.update({
      where: { id },
      data,
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
