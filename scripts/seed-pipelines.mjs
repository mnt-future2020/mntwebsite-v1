// One-off, idempotent migration: create the default pipeline + stages and map
// every existing deal (legacy `stage` enum) onto a real PipelineStage.
// Run once after `db:push`:  node --env-file=.env scripts/seed-pipelines.mjs
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const STAGES = [
  { name: "New", kind: "OPEN", probability: 10, color: "slate", order: 0, legacy: "NEW" },
  { name: "Qualified", kind: "OPEN", probability: 25, color: "blue", order: 1, legacy: "QUALIFIED" },
  { name: "Proposal", kind: "OPEN", probability: 50, color: "violet", order: 2, legacy: "PROPOSAL" },
  { name: "Negotiation", kind: "OPEN", probability: 75, color: "amber", order: 3, legacy: "NEGOTIATION" },
  { name: "Won", kind: "WON", probability: 100, color: "green", order: 4, legacy: "WON" },
  { name: "Lost", kind: "LOST", probability: 0, color: "red", order: 5, legacy: "LOST" },
];

async function main() {
  let pipeline = await prisma.pipeline.findFirst({ where: { isDefault: true }, include: { stages: true } });
  if (!pipeline) {
    pipeline = await prisma.pipeline.create({
      data: {
        name: "Sales Pipeline",
        isDefault: true,
        order: 0,
        stages: { create: STAGES.map(({ legacy, ...s }) => s) },
      },
      include: { stages: true },
    });
    console.log(`created default pipeline "${pipeline.name}" with ${pipeline.stages.length} stages`);
  } else {
    console.log(`default pipeline "${pipeline.name}" already exists`);
  }

  const idByLegacy = {};
  for (const s of STAGES) {
    const st = pipeline.stages.find((x) => x.name === s.name);
    if (st) idByLegacy[s.legacy] = st.id;
  }

  const deals = await prisma.deal.findMany({ where: { stageId: null }, select: { id: true, stage: true } });
  let n = 0;
  for (const d of deals) {
    const stageId = idByLegacy[d.stage] || idByLegacy.NEW;
    await prisma.deal.update({ where: { id: d.id }, data: { pipelineId: pipeline.id, stageId } });
    n++;
  }
  console.log(`backfilled ${n} deal(s) into the default pipeline`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
