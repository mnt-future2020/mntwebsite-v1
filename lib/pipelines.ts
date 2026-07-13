import { prisma } from "@/lib/db";

// The stages a brand-new default pipeline ships with (mirrors the legacy
// DealStage enum so existing deals map 1:1 during backfill).
export const DEFAULT_STAGES = [
  { name: "New", kind: "OPEN", probability: 10, color: "slate", order: 0 },
  { name: "Qualified", kind: "OPEN", probability: 25, color: "blue", order: 1 },
  { name: "Proposal", kind: "OPEN", probability: 50, color: "violet", order: 2 },
  { name: "Negotiation", kind: "OPEN", probability: 75, color: "amber", order: 3 },
  { name: "Won", kind: "WON", probability: 100, color: "green", order: 4 },
  { name: "Lost", kind: "LOST", probability: 0, color: "red", order: 5 },
] as const;

// Maps a legacy DealStage enum value → the default pipeline's stage name.
export const LEGACY_STAGE_TO_NAME: Record<string, string> = {
  NEW: "New",
  QUALIFIED: "Qualified",
  PROPOSAL: "Proposal",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
};

type PipelineWithStages = Awaited<ReturnType<typeof findDefault>>;

function findDefault() {
  return prisma.pipeline.findFirst({
    where: { isDefault: true },
    include: { stages: { orderBy: { order: "asc" } } },
  });
}

// Return the default pipeline, creating it (with default stages) the first time.
// Safe to call on every request — it only writes when nothing exists yet.
export async function ensureDefaultPipeline(): Promise<NonNullable<PipelineWithStages>> {
  const existing = await findDefault();
  if (existing) return existing;
  return prisma.pipeline.create({
    data: {
      name: "Sales Pipeline",
      isDefault: true,
      order: 0,
      stages: { create: DEFAULT_STAGES.map((s) => ({ ...s, kind: s.kind as never })) },
    },
    include: { stages: { orderBy: { order: "asc" } } },
  });
}
