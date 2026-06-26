// One-off: set the global work-end (check-out) time in OrgSetting.
// Run: node --env-file=.env scripts/set-checkout-time.mjs [HH:mm]
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const workEnd = process.argv[2] || "19:30";

const s = await prisma.orgSetting.upsert({
  where: { id: 1 },
  update: { workEnd },
  create: { id: 1, workEnd },
});

console.log("✓ global check-out (workEnd) set to:", s.workEnd, "| check-in (workStart):", s.workStart);
await prisma.$disconnect();
