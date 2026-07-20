// Seed the current (code-default) SEO into the DB so the admin panel reflects
// what the live site already serves. Idempotent: uses upsert, safe to re-run.
// Run:  node --env-file=.env scripts/seed-seo.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Global defaults — mirrors DEFAULT_SETTINGS in lib/settings.ts
const SITE = {
  siteName: "MnT Future — AI-Native, Agent-Ready Commerce Platforms",
  titleTemplate: "%s | MnT Future",
  defaultDescription:
    "MnT Future is an e-commerce development company building AI-native, agent-ready commerce platforms for US D2C and marketplace brands — headless builds, integrations, B2B, and AI agents.",
};

// Per-page SEO — mirrors each page's resolveMetadata(...) base values verbatim
const PAGES = [
  {
    path: "/",
    title: "MnT Future — AI-Native, Agent-Ready Commerce Platforms for US Brands",
    description:
      "MnT Future is an e-commerce development company building AI-native, agent-ready commerce platforms for US D2C & marketplace brands — headless builds, integrations, B2B, and AI agents.",
  },
  {
    path: "/commerce",
    title: "Commerce Platform Development for US Brands | MnT Future",
    description:
      "E-commerce development for US brands: headless & marketplace builds, integrations, B2B/wholesale, and managed commerce — with ADA, PCI DSS & US sales-tax handled.",
  },
  {
    path: "/commerce/shopify",
    title: "Shopify Store Development — Official Shopify Partner | MnT Future",
    description:
      "Official Shopify Partner builds: fast, conversion-ready Shopify e-commerce stores, advanced Hydrogen (React) headless storefronts, AI search, agent-ready feeds — and a designed upgrade path to a custom AI-native platform.",
  },
  {
    path: "/ai-agents",
    title: "AI & Agents for Commerce — Agent-Ready, Embedded AI | MnT Future",
    description:
      "AI search & recommendations, agent-ready commerce (ACP/UCP/MCP), embedded AI agents, and AI cleanup — for US D2C & marketplace brands.",
  },
  {
    path: "/security-compliance",
    title: "ADA, PCI DSS & US Sales-Tax Compliant Commerce | MnT Future",
    description:
      "US commerce compliance engineered into the architecture — ADA/WCAG accessibility, PCI DSS v4.0.1, sales-tax/economic-nexus, SOC 2, and CCPA/CPRA privacy.",
  },
  {
    path: "/about",
    title: "About MnT Future — AI-Native Commerce Engineering",
    description:
      "MnT Future builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands. A senior team — land small, expand big.",
  },
  {
    path: "/contact",
    title: "Contact MnT Future — Book a Free Strategy Session",
    description:
      "Book a free strategy session or agent-readiness audit with a senior MnT Future consultant. AI-native, agent-ready commerce for US D2C and marketplace brands.",
  },
  {
    path: "/strategy-session",
    title: "Free Strategy Session — Commerce Tech Consulting | MnT Future",
    description:
      "A free 45-minute consulting session with a senior commerce consultant: bring your problem, get the solution that fits your business — and keep the written recommendation brief.",
  },
  {
    path: "/open-source",
    title: "Open Source — agentic & AI-native commerce tooling | MnT Future",
    description:
      "MnT Future's open-source program for agentic & AI-built commerce: agentready (store agent-readiness scanner) and vibecheck (security & production-readiness for AI-built stores) are live and MIT-licensed. retail-mcp and acp-testkit are next.",
  },
  {
    path: "/open-source/agentready",
    title: "Free Agent-Readiness Scan — is your store visible to AI agents? | MnT Future",
    description:
      "Scan any store free: 29 checks across structured data, agent access, feeds and ACP · Google UCP · MCP discovery. Letter grade + prioritized fixes in seconds. No email needed for the score.",
  },
  {
    path: "/open-source/vibecheck",
    title: "vibecheck — is your AI-built store secure & production-ready? | MnT Future",
    description:
      "Open-source scanner for AI-generated commerce codebases: 26 checks across secrets, injection, access control, commerce-logic tampering, dependency CVEs and more. Deterministic, private, MIT. npx @mntglobal/vibecheck.",
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
