// Seed the current (code-default) SEO into the DB so the admin panel reflects
// what the live site already serves. Idempotent: uses upsert, safe to re-run.
// Run:  node --env-file=.env scripts/seed-seo.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Global defaults — mirrors DEFAULT_SETTINGS in lib/settings.ts
const SITE = {
  siteName: "MnT — Healthcare & E-Commerce Software Development",
  titleTemplate: "%s | MnT",
  defaultDescription:
    "We engineer compliant healthcare platforms and high-growth e-commerce stores. Two specialisms, one senior team. India + global.",
};

// Per-page SEO — mirrors each page's resolveMetadata(...) base values verbatim
const PAGES = [
  {
    path: "/",
    title: "MnT — Healthcare & E-Commerce Software Development",
    description:
      "We engineer compliant healthcare platforms and high-growth e-commerce stores. Two specialisms, one senior team. India + global. Start your build.",
  },
  {
    path: "/healthcare-software-development",
    title: "Healthcare Software Development Company | MnT",
    description:
      "HIPAA & ABDM-compliant healthcare software development — custom platforms, telemedicine, EHR & AI, engineered by a senior team for healthtech founders.",
  },
  {
    path: "/ecommerce-development",
    title: "E-Commerce Development Company | Custom & D2C | MnT",
    description:
      "Custom e-commerce development for D2C brands and marketplaces. Headless, Shopify, and bespoke platforms built to convert and scale. India + global delivery.",
  },
  {
    path: "/security-compliance",
    title: "HIPAA, ABDM & SOC 2 Compliant Development | MnT",
    description:
      "Compliance engineered into the architecture — HIPAA, ABDM/FHIR, GDPR, ISO 27001, SOC 2. How MnT keeps health and commerce data safe.",
  },
  {
    path: "/about",
    title: "About MnT — Magizh NexGen Technologies",
    description:
      "MnT (Magizh NexGen Technologies) — a healthcare & e-commerce software development company. A senior team building compliant platforms, India and global.",
  },
  {
    path: "/contact",
    title: "Contact MnT — Start a Project",
    description:
      "Start a project with MnT. Book a 30-minute discovery call with a senior engineer for healthcare or e-commerce software development. India + global.",
  },
];

async function main() {
  // Global site settings (single row, id = 1)
  await prisma.siteSetting.upsert({
    where: { id: 1 },
    update: SITE,
    create: { id: 1, ...SITE },
  });

  // Per-page SEO overrides
  for (const p of PAGES) {
    await prisma.seoSetting.upsert({
      where: { path: p.path },
      update: { title: p.title, description: p.description },
      create: { path: p.path, title: p.title, description: p.description },
    });
  }

  // Report
  const site = await prisma.siteSetting.findUnique({ where: { id: 1 } });
  const seo = await prisma.seoSetting.findMany({ orderBy: { path: "asc" } });
  console.log("✓ SiteSetting:", site ? `OK (id=1, "${site.siteName}")` : "MISSING");
  console.log(`✓ SeoSetting rows: ${seo.length}`);
  for (const s of seo) console.log(`    ${s.path}  →  ${s.title}`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
