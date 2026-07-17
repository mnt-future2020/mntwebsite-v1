export const site = {
  // The brand. Use this everywhere the company is named.
  name: "MnT Future",
  // The registered entity. Legal surfaces only — terms, privacy, contracts, and
  // the `legalName` field in structured data. Not the brand.
  legalName: "Magizh NexGen Technologies",
  domain: "mntfuture.com",
  url: "https://mntfuture.com",
  email: "info@mntfuture.com",
  phone: "+91 00000 00000",
  tagline: "AI-Native, Agent-Ready Commerce Platforms",
  description:
    "MnT Future builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands — headless & marketplace builds, integrations, B2B, and AI agents that sell in the new agentic channels.",
  social: {
    instagram: "https://www.instagram.com/mntfuture",
    linkedin: "https://www.linkedin.com/company/mntfuture",
    facebook: "https://www.facebook.com/mntfuture",
  },
};

// Centralised, professionally curated photography (Unsplash CDN, hot-linked via next/image).
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const images = {
  hero: u("1556742049-0cfed4f6a45d", 1600), // online commerce / payments
  commerce: u("1563013544-824ae1b704d3"), // D2C packaging / fulfilment
  marketplace: u("1586528116311-ad8dd3c8310d"), // mobile commerce
  ai: u("1677442136019-21780ecad995"), // AI / agents — abstract
  team: u("1497366216548-37526070297c", 1600), // team / office
  dev: u("1581091226825-a6a2a5aee158"), // engineer coding
};

export type NavChild = { label: string; href: string; desc: string };
export type NavGroup = {
  label: string;
  href: string;
  overviewLabel: string;
  children: NavChild[];
};

export const commerceNav: NavGroup = {
  label: "Commerce Platforms",
  href: "/commerce",
  overviewLabel: "Commerce Platforms overview",
  children: [
    { label: "Headless & Marketplace Builds", href: "/commerce/headless-marketplace", desc: "Composable storefronts & multi-vendor marketplaces, built to scale" },
    { label: "Integrations & Orchestration", href: "/commerce/integrations", desc: "Connect ERP, OMS, PIM, CDP, payments & 3PL into one stack" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale", desc: "Customer pricing, RFQ, bulk ordering — ERP-integrated" },
    { label: "Managed Commerce & Compliance", href: "/commerce/managed-compliance", desc: "SLA support + ADA, PCI DSS & US sales-tax handled" },
    { label: "Shopify Store Builds", href: "/commerce/shopify", desc: "Official-partner Shopify builds with an upgrade path to custom AI-native" },
  ],
};

export const aiNav: NavGroup = {
  label: "AI & Agents",
  href: "/ai-agents",
  overviewLabel: "AI & Agents overview",
  children: [
    { label: "AI Commerce Starter", href: "/ai-agents/commerce-starter", desc: "AI search, recommendations & a shopping assistant that converts" },
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce", desc: "Make your store discoverable & buyable by AI shopping agents" },
    { label: "Embedded AI Agents", href: "/ai-agents/embedded-agents", desc: "Task-specific AI agents built into your platform" },
    { label: "AI Cleanup", href: "/ai-agents/ai-cleanup", desc: "Turn a vibe-coded MVP into a production-grade platform" },
  ],
};

export const companyNav = {
  label: "Company",
  children: [
    { label: "About MnT Future", href: "/about", desc: "Who we are and how we work" },
    { label: "Security & Compliance", href: "/security-compliance", desc: "ADA · PCI DSS v4.0.1 · US sales-tax · SOC 2" },
    { label: "Open Source", href: "/open-source", desc: "agentready & our agentic-commerce tooling — MIT-licensed" },
    { label: "Blog", href: "/blog", desc: "Guides on AI-native & agent-ready commerce" },
    { label: "Contact", href: "/contact", desc: "Book a free strategy session" },
  ],
};

export const footerNav = [
  {
    title: "Commerce Platforms",
    links: commerceNav.children.map((c) => ({ label: c.label, href: c.href })),
  },
  {
    title: "AI & Agents",
    links: aiNav.children.map((c) => ({ label: c.label, href: c.href })),
  },
  {
    title: "Company",
    links: [
      { label: "Book a strategy session", href: "/strategy-session" },
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Open Source", href: "/open-source" },
      { label: "Security & Compliance", href: "/security-compliance" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Commerce Platforms", href: "/commerce" },
      { label: "AI & Agents", href: "/ai-agents" },
    ],
  },
];
