import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { ensureDefaultPipeline } from "@/lib/pipelines";

export const runtime = "nodejs";

const legacyFor = (kind: string) => (kind === "WON" ? "WON" : kind === "LOST" ? "LOST" : "NEW");
const DEAL_INCLUDE = { client: true, contact: true, owner: true, stageRef: true };

export async function GET() {
  try {
    const list = await prisma.deal.findMany({
      orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      include: DEAL_INCLUDE,
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const title = String(b.title || "").trim();
    if (!title) return NextResponse.json({ error: "Deal title is required." }, { status: 400 });

    // Resolve the target stage: an explicit stageId, else the default pipeline's
    // first stage (creating the default pipeline the first time if needed).
    let stageId = (b.stageId as string) || "";
    let pipelineId = "";
    let kind = "OPEN";
    let stageProbability: number | null = null;
    if (stageId) {
      const st = await prisma.pipelineStage.findUnique({ where: { id: stageId } });
      if (st) {
        pipelineId = st.pipelineId;
        kind = st.kind;
        stageProbability = st.probability;
      } else stageId = "";
    }
    if (!stageId) {
      const p = await ensureDefaultPipeline();
      pipelineId = p.id;
      const first = p.stages[0];
      stageId = first?.id || "";
      kind = first?.kind || "OPEN";
      stageProbability = first?.probability ?? null;
    }

    const probability = b.probability != null ? Math.max(0, Math.min(100, parseInt(String(b.probability), 10) || 0)) : stageProbability ?? 10;
    const d = await prisma.deal.create({
      data: {
        title,
        clientId: (b.clientId as string) || null,
        contactId: (b.contactId as string) || null,
        ownerId: (b.ownerId as string) || null,
        pipelineId: pipelineId || null,
        stageId: stageId || null,
        stage: legacyFor(kind) as never,
        stageEnteredAt: new Date(),
        value: parseInt(String(b.value ?? "0"), 10) || 0,
        currency: (b.currency as string) || "INR",
        probability,
        expectedCloseDate: b.expectedCloseDate ? new Date(String(b.expectedCloseDate)) : null,
        nextFollowUp: b.nextFollowUp ? new Date(String(b.nextFollowUp)) : null,
        source: (b.source as string) || null,
        notes: (b.notes as string) || null,
      },
      include: DEAL_INCLUDE,
    });
    return NextResponse.json(d);
  } catch {
    return NextResponse.json({ error: "Couldn't create the deal." }, { status: 500 });
  }
}
