import type { Metadata } from "next";
import HubPage, { HubConfig } from "@/components/HubPage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce", {
    title: "Commerce Platform Development for US Brands | MnT Future",
    description:
      "E-commerce development for US brands: custom stores and marketplaces, integrations, B2B/wholesale and managed commerce, with ADA, PCI and sales tax handled.",
  });
}

const config: HubConfig = {
  vertical: "Commerce Platforms",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "Commerce Platforms" }],
  eyebrow: "Commerce platforms",
  h1: "Commerce platforms, engineered to scale.",
  heroSub:
    "We build the platform your growth depends on: custom storefronts, multi-vendor marketplaces, B2B/wholesale, and the integrations that make your whole stack work as one. Built for US D2C and marketplace brands, with ADA, PCI DSS and sales-tax compliance handled.",
  heroChips: ["Custom & fully owned", "Multi-vendor marketplaces", "B2B / wholesale", "ADA · PCI · sales-tax"],
  heroImage: images.commerce,
  servicesTitle: "Four ways we build and run your commerce",
  servicesSub:
    "From a platform migration to a marketplace launch to keeping a live US store secure and audit-ready: one senior team across the whole platform.",
  services: [
    { icon: "grid", title: "Custom Commerce Platforms", desc: "D2C brand stores, marketplaces, multi-vendor, subscription and quick commerce, plus mobile apps: custom-built and engineered to scale.", href: "/commerce/headless-marketplace" },
    { icon: "network", title: "Integrations & Automation", desc: "Connect ERP, OMS, PIM, CDP, payments and 3PL into one connected stack: a single source of truth with automation across every system.", href: "/commerce/integrations" },
    { icon: "building", title: "B2B / Wholesale Commerce", desc: "Customer-specific pricing and catalogs, quote/RFQ workflows, bulk ordering, and ERP-integrated self-serve buying portals for a high-margin channel.", href: "/commerce/b2b-wholesale" },
    { icon: "shield", title: "Managed Support & Compliance", desc: "Support, monitoring and performance on an SLA, plus ADA/WCAG accessibility, PCI DSS v4.0.1, and US sales-tax/economic-nexus, handled continuously.", href: "/commerce/managed-compliance" },
  ],
  // Two smaller ways in. Both graduate into a full build with the same team,
  // which is why they sit under the flagship grid rather than inside it.
  crossSell: [
    {
      logoSlug: "shopify",
      kicker: "Also · Official Shopify Partner",
      title: "Need speed over custom logic right now? We build Shopify stores too.",
      desc: "Fast, conversion-ready Shopify builds with AI add-ons, and a designed upgrade path to a custom AI-native platform when you outgrow it. Same team, no re-platform trauma.",
      href: "/commerce/shopify",
      cta: "Shopify Store Builds",
    },
    {
      icon: "code" as const,
      kicker: "Also · AI cleanup & MVP rescue",
      title: "Shipped fast with AI or no-code, and it broke at scale?",
      desc: "Security audit, refactor, hardening and a re-architecture that holds under real traffic. A low-barrier way to see our engineering before committing to a full build.",
      href: "/commerce/ai-cleanup",
      cta: "AI Cleanup & MVP Rescue",
    },
  ],
  // AI is not a second thing we sell: it is how these platforms are built, and
  // the pieces of it you can buy without a rebuild. It sits under the builds
  // for that reason, rather than in its own top-level menu.
  layer: {
    eyebrow: "The AI layer",
    title: "AI-native means built in, not bolted on.",
    sub: "Search, recommendations and agents ship as part of the platform. Two of them also work on the store you already run, so you can start there.",
    href: "/ai-agents",
    cta: "See the whole AI & agents story",
    items: [
      { icon: "spark", title: "AI Search & Recommendations", desc: "Search that understands what shoppers mean, personalized recommendations, and a shopping assistant. Usually the first two weeks of a build.", href: "/ai-agents/commerce-starter" },
      { icon: "network", title: "Agent-Ready Commerce", desc: "Make your store discoverable and buyable by AI shopping agents: ACP, Google UCP, a Retail MCP server, and AEO visibility. Works on any store.", href: "/ai-agents/agent-ready-commerce" },
      { icon: "chat", title: "Custom AI Agents", desc: "Agents that each do one job well: support, merchandising, SEO, inventory. Connected to your real tools, with a human approving what matters.", href: "/ai-agents/embedded-agents" },
    ],
  },
  diff: {
    eyebrow: "Why it matters",
    title: (
      <>
        A store that scales,
        <br className="hidden sm:block" /> not one you re-platform every year.
      </>
    ),
    sub: "Templates break at scale, integrations drift, and US compliance is a liability the day you launch. We engineer commerce as a system: connected, secure, and built to scale from day one.",
    points: [
      "Architecture that scales through peak traffic without another rebuild.",
      "One connected stack: ERP, OMS, PIM, CDP, payments and 3PL talking to each other, accurate everywhere.",
      "ADA/WCAG, PCI DSS v4.0.1 and multi-state sales-tax engineered in, not bolted on before an audit.",
      "Senior-only delivery in two-week sprints: working software every cycle, full ownership at the end.",
    ],
  },
  audiencesTitle: "Built for brands serious about scale",
  audiences: [
    { icon: "store", title: "D2C brands", desc: "Outgrown a template? We build the custom platform that protects your margin, your brand, and your page speed." },
    { icon: "grid", title: "Marketplace founders", desc: "Multi-vendor platforms with onboarding, payouts, commissions, and ratings: built to handle more sellers and more buyers." },
    { icon: "building", title: "B2B & wholesale", desc: "Account pricing, quotes, approvals, and ERP integration: a self-serve buying channel for manufacturers and distributors." },
  ],
  stats: [
    { value: "Custom", label: "Fully owned, API-first architecture" },
    { value: "1 stack", label: "ERP · OMS · PIM · CDP · 3PL connected" },
    { value: "ADA + PCI", label: "US compliance engineered in" },
    { value: "SLA", label: "Managed support & monitoring" },
  ],
  addOns: [
    { icon: "gauge", title: "CRO / Checkout Optimization", desc: "Conversion-focused UX and A/B testing on a retainer: lift revenue per visit from the traffic you already have." },
    { icon: "records", title: "Data & Analytics / CDP", desc: "A single customer view, dashboards, and decision support so every team works from the same numbers." },
    { icon: "wallet", title: "Subscription & Retention", desc: "Subscriptions, memberships, replenishment, and value-based loyalty: recurring revenue that compounds." },
    { icon: "globe", title: "Cross-Border / International", desc: "Multi-currency, localization, and tax for when a US brand expands into new markets." },
  ],
  faq: [
    { q: "Do you only build for US brands?", a: "Our focus is US D2C and marketplace brands: that's where our compliance depth (ADA, PCI DSS, sales-tax) and agentic-commerce work is sharpest. We build cross-border and international as an add-on when a US brand expands." },
    { q: "A template or a custom platform: which should I choose?", a: "A template is fine until it isn't. Go custom (the industry calls it headless or composable) when you've outgrown the platform: complex catalogs, unique checkout logic, deep integrations, or marketplace mechanics. We'll recommend honestly based on your stage in a free strategy session." },
    { q: "Can you build a multi-vendor marketplace?", a: "Yes, end to end: vendor onboarding and payouts, commission logic, search and discovery, logistics, and trust and ratings, built to handle more sellers and more buyers from day one." },
    { q: "Will my systems actually talk to each other?", a: "That's the Integrations & Automation service. We connect ERP, OMS, PIM, CDP, payments and 3PL into a single source of truth with automation across systems, so data is accurate everywhere and ops are far less manual." },
    { q: "What about ADA and PCI compliance?", a: "78% of accessibility lawsuits target e-commerce, and PCI DSS v4.0.1 is now mandatory. We build to ADA/WCAG from the start, architect to minimise PCI scope, and keep the controls and evidence current under a managed SLA, along with the US sales-tax/economic-nexus engine." },
    { q: "Do you also build Shopify stores?", a: "Yes, we're an official Shopify Partner. When launching in weeks matters more than custom logic, we build fast, conversion-ready Shopify stores with AI search and agent-ready feeds. And because the same team builds our custom AI-native platforms, you graduate to custom when you outgrow Shopify: a planned migration, not a re-platform trauma." },
    { q: "Do you do e-commerce development?", a: "Yes, that's exactly what we build. Modern e-commerce is what the industry now calls commerce: custom storefronts, marketplaces, B2B portals, and the integrations behind them. MnT Future engineers AI-native, agent-ready e-commerce platforms for US D2C and marketplace brands: from official-partner Shopify builds to fully custom platforms." },
    { q: "How do we start?", a: "With a free strategy session. We sketch how we'd build it: data model, APIs, scalability, and give you a clear plan. Most engagements start as a small productized pilot and expand into a full build." },
  ],
  cta: {
    title: "Ready to build a platform that scales with you?",
    body: "Book a free strategy session with a senior commerce consultant. Bring your brand and your goals: leave with a platform recommendation, an architecture sketch, and a clear next step.",
  },
};

export default function CommerceHub() {
  return <HubPage config={config} />;
}
