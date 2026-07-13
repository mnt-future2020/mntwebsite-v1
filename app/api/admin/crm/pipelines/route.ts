import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { STAGE_COLOR_TOKENS, STAGE_KINDS } from "@/lib/crm";

export const runtime = "nodejs";

const kindOf = (k: unknown) => (STAGE_KINDS as readonly string[]).includes(String(k)) ? String(k) : "OPEN";
const colorOf = (c: unknown) => (STAGE_COLOR_TOKENS as readonly string[]).includes(String(c)) ? String(c) : "slate";
const probOf = (p: unknown) => Math.max(0, Math.min(100, parseInt(String(p ?? 10), 10) || 0));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stageData(s: any, i: number) {
  return {
    name: String(s?.name || `Stage ${i + 1}`).trim().slice(0, 40) || `Stage ${i + 1}`,
    kind: kindOf(s?.kind) as never,
    probability: probOf(s?.probability),
    color: colorOf(s?.color),
    order: i,
  };
}

export async function GET() {
  try {
    const list = await prisma.pipeline.findMany({
      orderBy: { order: "asc" },
      include: { stages: { orderBy: { order: "asc" } }, _count: { select: { deals: true } } },
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const name = String(b.name || "").trim();
    if (!name) return NextResponse.json({ error: "Pipeline name is required." }, { status: 400 });
    const stages = Array.isArray(b.stages) && b.stages.length ? b.stages : [
      { name: "New", kind: "OPEN", probability: 10, color: "slate" },
      { name: "Won", kind: "WON", probability: 100, color: "green" },
      { name: "Lost", kind: "LOST", probability: 0, color: "red" },
    ];
    const count = await prisma.pipeline.count();
    const created = await prisma.pipeline.create({
      data: {
        name,
        isDefault: Boolean(b.isDefault),
        order: count,
        stages: { create: stages.map(stageData) },
      },
      include: { stages: { orderBy: { order: "asc" } }, _count: { select: { deals: true } } },
    });
    if (created.isDefault) {
      await prisma.pipeline.updateMany({ where: { id: { not: created.id }, isDefault: true }, data: { isDefault: false } });
    }
    return NextResponse.json(created);
  } catch {
    return NextResponse.json({ error: "Couldn't create the pipeline." }, { status: 500 });
  }
}
