// Seed the current (code-default) SEO into the DB so the admin panel reflects
// what the live site already serves. Idempotent: uses upsert, safe to re-run.
// Run:  node --env-file=.env scripts/seed-seo.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Global defaults — mirrors DEFAULT_SETTINGS in lib/settings.ts
const SITE = {
  siteName: "MnT — AI-Native, Agent-Ready Commerce Platforms",
  titleTemplate: "%s | MnT",
  defaultDescription:
    "MnT builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands — headless & marketplace builds, integrations, B2B, and AI agents.",
};

// Per-page SEO — mirrors each page's resolveMetadata(...) base values verbatim
const PAGES = [
  {
    path: "/",
    title: "MnT — AI-Native, Agent-Ready Commerce Platforms for US Brands",
    description:
      "AI-native, agent-ready commerce platforms for US D2C & marketplace brands — headless & marketplace builds, integrations, B2B, and AI agents.",
  },
  {
    path: "/commerce",
    title: "Commerce Platform Development for US Brands | MnT",
    description:
      "Headless & marketplace builds, integrations, B2B/wholesale, and managed commerce — with ADA, PCI DSS & US sales-tax handled. Built to scale.",
  },
  {
    path: "/ai-agents",
    title: "AI & Agents for Commerce — Agent-Ready, Embedded AI | MnT",
    description:
      "AI search & recommendations, agent-ready commerce (ACP/UCP/MCP), embedded AI agents, and AI cleanup — for US D2C & marketplace brands.",
  },
  {
    path: "/security-compliance",
    title: "ADA, PCI DSS & US Sales-Tax Compliant Commerce | MnT",
    description:
      "US commerce compliance engineered into the architecture — ADA/WCAG accessibility, PCI DSS v4.0.1, sales-tax/economic-nexus, SOC 2, and CCPA/CPRA privacy.",
  },
  {
    path: "/about",
    title: "About MnT — Magizh NexGen Technologies",
    description:
      "MnT (Magizh NexGen Technologies) builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands. A senior team — land small, expand big.",
  },
  {
    path: "/contact",
    title: "Contact MnT — Book a Free Architecture Workshop",
    description:
      "Book a free architecture workshop or agent-readiness audit with a senior MnT engineer. AI-native, agent-ready commerce for US D2C and marketplace brands.",
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
