// Seed the current (code-default) SEO into the DB so the admin panel reflects
// what the live site already serves. Idempotent: uses upsert, safe to re-run.
// Run:  node --env-file=.env scripts/seed-seo.mjs
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Global defaults: mirrors DEFAULT_SETTINGS in lib/settings.ts
const SITE = {
  siteName: "MnT Future: AI-Native, Agent-Ready Commerce Platforms",
  titleTemplate: "%s | MnT Future",
  defaultDescription:
    "MnT Future is an e-commerce development company building AI-native, agent-ready commerce platforms for US D2C and marketplace brands: custom storefronts & marketplaces, integrations, B2B, and AI agents.",
};

// Per-page SEO: mirrors each page's resolveMetadata(...) base values verbatim
const PAGES = [
  // India (/in). Extracted from the rendered pages rather than retyped, so a
  // seed can never quietly disagree with what the site actually serves.
  {
    path: "/in",
    title:
      "MnT Future India: Ecommerce Platforms, AI Systems & Products",
    description:
      "MnT Future builds ecommerce platforms with GST built in, AI agents and automation that reach production, and ready products for Indian businesses: MnT AI Desk, MnT AI CRM and MnT Commerce India.",
  },
  {
    path: "/in/ecommerce",
    title:
      "Ecommerce Development Company in India: Custom Platforms | MnT Future",
    description:
      "Custom ecommerce platforms for Indian businesses: D2C storefronts, marketplaces, B2B and wholesale, with GST invoicing, UPI and Indian payment gateways handled natively. Built by senior engineers.",
  },
  {
    path: "/in/ecommerce/platform-development",
    title:
      "Ecommerce platform development in India | MnT Future India",
    description:
      "A platform built for how your business actually sells, running on infrastructure you own. GST decided per order, Indian payment gateways integrated properly, and no percentage of every sale going elsewhere.",
  },
  {
    path: "/in/ecommerce/d2c-storefront",
    title:
      "D2C storefront development for Indian brands | MnT Future India",
    description:
      "Sell straight to your customers on a storefront you own, with your customer data, your margins, and no marketplace taking a cut and keeping the relationship.",
  },
  {
    path: "/in/ecommerce/marketplace",
    title:
      "Marketplace platform development in India | MnT Future India",
    description:
      "Many sellers on one platform: onboarding, catalogue control, commission, split payouts and settlement. The parts that make a marketplace hard, built properly rather than approximated.",
  },
  {
    path: "/in/ecommerce/b2b-wholesale",
    title:
      "B2B and wholesale ecommerce platforms | MnT Future India",
    description:
      "Customer-specific pricing, quotes and RFQ, bulk ordering, credit terms and approval flows, connected to the ERP you already run. Built for buyers who order the same forty items every month.",
  },
  {
    path: "/in/ecommerce/integrations",
    title:
      "Ecommerce integrations and automation | MnT Future India",
    description:
      "Tally or your ERP, warehouse, courier, payment gateway and accounting, joined into one flow. So an order is entered once, and nobody spends their morning copying data between two systems.",
  },
  {
    path: "/in/ecommerce/managed-support",
    title:
      "Managed ecommerce support and maintenance | MnT Future India",
    description:
      "We run and maintain the platform against an agreed SLA: monitoring, updates, security patching, and a person who answers when checkout breaks at 9pm on a Saturday.",
  },
  {
    path: "/in/ai",
    title:
      "AI Consultation, Automation, Agents & Custom Applications | MnT Future India",
    description:
      "AI work that reaches production: consultation, automation, agent development and complete custom AI applications. Delivered by senior engineers embedded in your team, using our Discover to Optimize method.",
  },
  {
    path: "/in/ai/consultation",
    title:
      "AI consultation for Indian businesses | MnT Future India",
    description:
      "What is genuinely worth doing with AI in your business, whether your data can support it, and what reaching production would actually cost. It ends with a costed path, not a maturity score.",
  },
  {
    path: "/in/ai/automation",
    title:
      "AI automation for business workflows | MnT Future India",
    description:
      "The work your team repeats every single day, automated: document handling, data entry, classification, routing and reporting. With a person still in the loop wherever being wrong is expensive.",
  },
  {
    path: "/in/ai/agent-development",
    title:
      "AI agent development for enterprises | MnT Future India",
    description:
      "Agents that do work inside your systems rather than only answer questions, with clear limits on what they may act on alone and a complete record of everything they did.",
  },
  {
    path: "/in/ai/custom-applications",
    title:
      "Custom AI application development | MnT Future India",
    description:
      "A complete application built for your business with AI inside it, from nothing. For when the shape of your problem means no ready product fits, and bending one to fit would cost more than building right.",
  },
  {
    path: "/in/ai/forward-deployed-engineering",
    title:
      "Forward Deployed Engineering: AI That Reaches Production | MnT Future",
    description:
      "Senior engineers embedded in your team and your environment, building your AI system and staying until it runs in production. Our documented method: Discover, Design, Build, Deploy, Optimize.",
  },
  {
    path: "/in/products",
    title:
      "Products: AI Desk, AI CRM & Commerce India | MnT Future",
    description:
      "Three applications we host, brand and customise for you: a support desk with AI, a WhatsApp CRM with automation and AI, and an ecommerce platform with GST built in. Self-hosted, you own them.",
  },
  {
    path: "/in/products/ai-desk",
    title:
      "MnT AI Desk: Support Desk Software for Indian Businesses | MnT Future",
    description:
      "A support desk that puts WhatsApp, Instagram, Facebook, email and website chat in one inbox, with AI answering the repeat questions. Self-hosted, unlimited agents, no per-seat licence.",
  },
  {
    path: "/in/products/ai-crm",
    title:
      "MnT AI CRM: WhatsApp CRM with Automation & AI for Indian Businesses | MnT Future",
    description:
      "Run your whole WhatsApp business from one screen: one official number for the entire team, a sales pipeline, broadcasts on approved templates, no-code automation and an AI reply assistant. Self-hosted.",
  },
  {
    path: "/in/products/commerce-india",
    title:
      "MnT Commerce India: Ecommerce Platform with GST Built In | MnT Future",
    description:
      "Your own ecommerce platform with India GST handled natively: CGST/SGST vs IGST by place of supply, per-HSN slabs, gapless invoice numbering, automatic credit notes. Self-hosted, no commission on orders.",
  },
  {
    path: "/in/work",
    title:
      "Our Work: Platforms Built in India | MnT Future",
    description:
      "Live commerce platforms MnT Future designed and engineered for clients in India, plus the products and labs we build and run ourselves.",
  },
  {
    path: "/in/about",
    title:
      "About MnT Future: Ecommerce & AI Engineering in India",
    description:
      "MnT Future builds ecommerce platforms and AI systems for Indian businesses. Senior engineers only, a documented delivery method, and software you own rather than rent.",
  },
  {
    path: "/in/contact",
    title:
      "Contact MnT Future India: Ecommerce & AI Engineering",
    description:
      "Talk to MnT Future about an ecommerce platform, AI work, or one of our products. A senior consultant reads every enquiry.",
  },
  {
    path: "/in/strategy-session",
    title:
      "Book a Strategy Session: Ecommerce & AI Consulting | MnT Future India",
    description:
      "A 45 minute session with a senior consultant. Bring your ecommerce bottleneck or the AI pilot that stalled, and leave with a plan you can execute. No obligation.",
  },

  // United States (root)
  {
    path: "/",
    title: "MnT Future: AI-Native, Agent-Ready Commerce Platforms for US Brands",
    description:
      "MnT Future is an e-commerce development company building AI-native, agent-ready commerce platforms for US D2C & marketplace brands: custom storefronts & marketplaces, integrations, B2B, and AI agents.",
  },
  {
    path: "/commerce",
    title: "Commerce Platform Development for US Brands | MnT Future",
    description:
      "E-commerce development for US brands: custom stores & marketplaces, integrations, B2B/wholesale, and managed commerce, with ADA, PCI DSS & US sales-tax handled.",
  },
  {
    path: "/commerce/shopify",
    title: "Shopify Store Development: Official Shopify Partner | MnT Future",
    description:
      "Official Shopify Partner builds: fast, conversion-ready Shopify e-commerce stores, advanced Hydrogen (React) headless storefronts, AI search, agent-ready feeds, and a designed upgrade path to a custom AI-native platform.",
  },
  {
    path: "/ai-agents",
    title: "AI & Agents for Commerce: Agent-Ready, Embedded AI | MnT Future",
    description:
      "AI search & recommendations, agent-ready commerce (ACP/UCP/MCP), and custom AI agents: the AI layer of every commerce platform we build for US D2C & marketplace brands.",
  },
  {
    path: "/security-compliance",
    title: "ADA, PCI DSS & US Sales-Tax Compliant Commerce | MnT Future",
    description:
      "US commerce compliance engineered into the architecture: ADA/WCAG accessibility, PCI DSS v4.0.1, sales-tax/economic-nexus, SOC 2, and CCPA/CPRA privacy.",
  },
  {
    path: "/about",
    title: "About MnT Future: AI-Native Commerce Engineering",
    description:
      "MnT Future builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands. A senior team: land small, expand big.",
  },
  {
    path: "/contact",
    title: "Contact MnT Future: Book a Free Strategy Session",
    description:
      "Book a free strategy session or agent-readiness audit with a senior MnT Future consultant. AI-native, agent-ready commerce for US D2C and marketplace brands.",
  },
  {
    path: "/strategy-session",
    title: "Free Strategy Session: Commerce Tech Consulting | MnT Future",
    description:
      "A free 45-minute consulting session with a senior commerce consultant: bring your problem, get the solution that fits your business, and keep the written recommendation brief.",
  },
  {
    path: "/open-source",
    title: "Open Source: agentic & AI-native commerce tooling | MnT Future",
    description:
      "MnT Future's open-source program for agentic & AI-built commerce: agentready (store agent-readiness scanner) and vibecheck (security & production-readiness for AI-built stores) are live and MIT-licensed. retail-mcp and acp-testkit are next.",
  },
  {
    path: "/open-source/agentready",
    title: "Free Agent-Readiness Scan: is your store visible to AI agents? | MnT Future",
    description:
      "Scan any store free: 29 checks across structured data, agent access, feeds and ACP · Google UCP · MCP discovery. Letter grade + prioritized fixes in seconds. No email needed for the score.",
  },
  {
    path: "/open-source/vibecheck",
    title: "vibecheck: is your AI-built store secure & production-ready? | MnT Future",
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
