import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

const STAGES = ["NEW", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"];

export async function GET() {
  try {
    const list = await prisma.deal.findMany({
      orderBy: [{ stage: "asc" }, { order: "asc" }, { createdAt: "desc" }],
      include: { client: true, contact: true, owner: true },
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
    const stage = STAGES.includes(String(b.stage)) ? String(b.stage) : "NEW";
    const d = await prisma.deal.create({
      data: {
        title,
        clientId: (b.clientId as string) || null,
        contactId: (b.contactId as string) || null,
        ownerId: (b.ownerId as string) || null,
        stage: stage as never,
        stageEnteredAt: new Date(),
        value: parseInt(String(b.value ?? "0"), 10) || 0,
        currency: (b.currency as string) || "INR",
        probability: Math.max(0, Math.min(100, parseInt(String(b.probability ?? "10"), 10) || 0)),
        expectedCloseDate: b.expectedCloseDate ? new Date(String(b.expectedCloseDate)) : null,
        nextFollowUp: b.nextFollowUp ? new Date(String(b.nextFollowUp)) : null,
        source: (b.source as string) || null,
        notes: (b.notes as string) || null,
      },
      include: { client: true, contact: true, owner: true },
    });
    return NextResponse.json(d);
  } catch {
    return NextResponse.json({ error: "Couldn't create the deal." }, { status: 500 });
  }
}
