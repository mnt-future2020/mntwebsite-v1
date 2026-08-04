export const site = {
  // The brand. Use this everywhere the company is named.
  name: "MnT Future",
  // The registered entity. Legal surfaces only: terms, privacy, contracts, and
  // the `legalName` field in structured data. Not the brand.
  legalName: "Magizh NexGen Technologies",
  domain: "mntfuture.com",
  url: "https://mntfuture.com",
  email: "info@mntfuture.com",
  phone: "+91 00000 00000",
  tagline: "AI-Native, Agent-Ready Commerce Platforms",
  // Used by the Organization schema and llms.txt, both of which are served on
  // the India tree too, so it has to describe the company rather than only the
  // US line. The US pages still lead with agent-ready commerce in their own
  // metadata; this is the entity-level description.
  description:
    "MnT Future builds commerce platforms and AI systems. In the United States: AI-native, agent-ready commerce for D2C and marketplace brands. In India: ecommerce platforms with GST built in, AI agents and automation delivered by embedded senior engineers, and three products we host and customise.",
  social: {
    instagram: "https://www.instagram.com/mnt_future",
    linkedin: "https://www.linkedin.com/company/mntfuture",
    facebook: "https://www.facebook.com/mntfuture",
  },
};

/**
 * Client ratings, shown in the ribbon under the header.
 *
 * `href` is the profile the score came from. Fill it in and the entry becomes a
 * link a visitor can check; leave it out and the score renders as plain text
 * rather than as a dead link. A rating nobody can verify is worth less than one
 * they can, and it is the kind of claim that quietly goes stale.
 */
export const ratings: { source: string; score: number; href?: string }[] = [
  { source: "Clutch", score: 5, href: "https://clutch.co/profile/mnt-future" },
  { source: "Google", score: 5 },
  { source: "JustDial", score: 4.7 },
];

// Centralised, professionally curated photography (Unsplash CDN, hot-linked via next/image).
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const images = {
  hero: u("1556742049-0cfed4f6a45d", 1600), // online commerce / payments
  commerce: u("1563013544-824ae1b704d3"), // D2C packaging / fulfilment
  marketplace: u("1586528116311-ad8dd3c8310d"), // mobile commerce
  ai: u("1677442136019-21780ecad995"), // AI / agents: abstract
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
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace", desc: "D2C stores, marketplaces, B2B & subscription commerce, built to scale" },
    { label: "Integrations & Automation", href: "/commerce/integrations", desc: "Connect ERP, OMS, PIM, CDP, payments & 3PL into one stack" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale", desc: "Customer pricing, RFQ, bulk ordering: ERP-integrated" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance", desc: "SLA support + ADA, PCI DSS & US sales-tax handled" },
    { label: "Shopify Store Builds", href: "/commerce/shopify", desc: "Official-partner Shopify builds with an upgrade path to custom AI-native" },
    // Filed here, not under AI: this rescues a store that was built with AI
    // tools. It is refactor and hardening work, not an AI capability we add.
    { label: "AI Cleanup & MVP Rescue", href: "/commerce/ai-cleanup", desc: "Turn a vibe-coded MVP into a production-grade platform" },
  ],
};

// The AI layer of the platform, not a second service line. It has no top-level
// nav entry: it is reached from the commerce hub, where it reads as how the
// builds are made rather than as a separate business.
export const aiNav: NavGroup = {
  label: "AI & Agents",
  href: "/ai-agents",
  overviewLabel: "AI & Agents overview",
  children: [
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter", desc: "AI search, recommendations & a shopping assistant that converts" },
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce", desc: "Make your store discoverable & buyable by AI shopping agents" },
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents", desc: "Task-specific AI agents built into your platform" },
  ],
};

export const companyNav = {
  label: "Company",
  children: [
    { label: "About MnT Future", href: "/about", desc: "Who we are and how we work" },
    { label: "Security & Compliance", href: "/security-compliance", desc: "ADA · PCI DSS v4.0.1 · US sales-tax · SOC 2-aligned" },
    { label: "Open Source", href: "/open-source", desc: "agentready & our agentic-commerce tooling: MIT-licensed" },
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
