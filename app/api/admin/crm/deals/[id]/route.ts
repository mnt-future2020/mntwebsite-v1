import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };
const has = (b: Record<string, unknown>, k: string) => Object.prototype.hasOwnProperty.call(b, k);

export async function GET(_req: Request, props: Ctx) {
  const { id } = await props.params;
  const d = await prisma.deal.findUnique({
    where: { id },
    include: { client: true, contact: true, owner: true, activities: { include: { owner: true }, orderBy: { createdAt: "desc" } } },
  });
  if (!d) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(d);
}

// Partial-safe update — only touches fields present in the body.
export async function PATCH(req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (has(b, "title")) data.title = String(b.title).trim();
    if (has(b, "clientId")) data.clientId = (b.clientId as string) || null;
    if (has(b, "contactId")) data.contactId = (b.contactId as string) || null;
    if (has(b, "ownerId")) data.ownerId = (b.ownerId as string) || null;
    if (has(b, "value")) data.value = parseInt(String(b.value), 10) || 0;
    if (has(b, "currency")) data.currency = String(b.currency);
    if (has(b, "probability")) data.probability = Math.max(0, Math.min(100, parseInt(String(b.probability), 10) || 0));
    if (has(b, "expectedCloseDate")) data.expectedCloseDate = b.expectedCloseDate ? new Date(String(b.expectedCloseDate)) : null;
    if (has(b, "nextFollowUp")) data.nextFollowUp = b.nextFollowUp ? new Date(String(b.nextFollowUp)) : null;
    if (has(b, "source")) data.source = (b.source as string) || null;
    if (has(b, "notes")) data.notes = (b.notes as string) || null;
    if (has(b, "lostReason")) data.lostReason = (b.lostReason as string) || null;
    if (has(b, "stage")) {
      const stage = String(b.stage);
      data.stage = stage as never;
      if (stage === "WON") { data.closedAt = new Date(); if (!has(b, "probability")) data.probability = 100; }
      else if (stage === "LOST") { data.closedAt = new Date(); if (!has(b, "probability")) data.probability = 0; }
      else data.closedAt = null; // reopened
    }
    const d = await prisma.deal.update({ where: { id }, data, include: { client: true, contact: true, owner: true } });
    return NextResponse.json(d);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const { id } = await props.params;
  try {
    await prisma.deal.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
