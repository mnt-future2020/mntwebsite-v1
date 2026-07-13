import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };
const has = (b: Record<string, unknown>, k: string) => Object.prototype.hasOwnProperty.call(b, k);
const legacyFor = (kind: string) => (kind === "WON" ? "WON" : kind === "LOST" ? "LOST" : "NEW");

export async function GET(_req: Request, props: Ctx) {
  const { id } = await props.params;
  const d = await prisma.deal.findUnique({
    where: { id },
    include: { client: true, contact: true, owner: true, stageRef: true, activities: { include: { owner: true }, orderBy: { createdAt: "desc" } } },
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
    // Move by pipeline stage (the board + drawer send stageId).
    if (has(b, "stageId")) {
      const st = await prisma.pipelineStage.findUnique({ where: { id: String(b.stageId) } });
      if (st) {
        data.stageId = st.id;
        data.pipelineId = st.pipelineId;
        data.stage = legacyFor(st.kind) as never; // keep the legacy enum roughly in sync
        data.stageEnteredAt = new Date();
        if (st.kind === "WON") {
          data.closedAt = new Date();
          data.nextFollowUp = null;
          if (!has(b, "probability")) data.probability = 100;
        } else if (st.kind === "LOST") {
          data.closedAt = new Date();
          data.nextFollowUp = null;
          if (!has(b, "probability")) data.probability = 0;
        } else {
          data.closedAt = null; // reopened / still open
          // Only auto-suggest a follow-up when reopening a closed deal or when
          // none is set — never clobber a user-set date on a routine open→open move.
          if (!has(b, "nextFollowUp")) {
            const cur = await prisma.deal.findUnique({ where: { id }, select: { closedAt: true, nextFollowUp: true } });
            if (cur?.closedAt || !cur?.nextFollowUp) {
              const f = new Date();
              f.setHours(0, 0, 0, 0);
              f.setDate(f.getDate() + 3);
              data.nextFollowUp = f;
            }
          }
        }
      }
    } else if (has(b, "stage")) {
      const stage = String(b.stage);
      data.stage = stage as never;
      data.stageEnteredAt = new Date(); // reset aging clock
      if (stage === "WON") { data.closedAt = new Date(); data.nextFollowUp = null; if (!has(b, "probability")) data.probability = 100; }
      else if (stage === "LOST") { data.closedAt = new Date(); data.nextFollowUp = null; if (!has(b, "probability")) data.probability = 0; }
      else {
        data.closedAt = null; // reopened
        // Auto-suggest a follow-up 3 days out when moving an open deal, unless one was set explicitly.
        if (!has(b, "nextFollowUp")) {
          const f = new Date();
          f.setHours(0, 0, 0, 0);
          f.setDate(f.getDate() + 3);
          data.nextFollowUp = f;
        }
      }
    }
    const d = await prisma.deal.update({ where: { id }, data, include: { client: true, contact: true, owner: true, stageRef: true } });
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
