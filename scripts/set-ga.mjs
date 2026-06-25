// One-off: set the GA4 Measurement ID in the SiteSetting row so the root layout
// renders the gtag.js tag site-wide. Run: node --env-file=.env scripts/set-ga.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const GA = process.argv[2] || "G-D14DGSH7PP";

const s = await prisma.siteSetting.upsert({
  where: { id: 1 },
  update: { gaMeasurementId: GA },
  create: { id: 1, gaMeasurementId: GA },
});

console.log("✓ gaMeasurementId set to:", s.gaMeasurementId);
await prisma.$disconnect();
