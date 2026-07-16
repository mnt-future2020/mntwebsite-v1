import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/headless-marketplace", {
    title: "Headless Commerce & Marketplace Development | MnT",
    description:
      "Composable, API-driven storefronts, low-risk replatforming, and multi-vendor marketplaces — headless commerce builds engineered to scale.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/headless-marketplace",
  parent: { label: "Commerce Platforms", href: "/commerce" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Headless & Marketplace Builds" },
  ],
  eyebrow: "Headless & marketplace builds",
  h1: "Headless storefronts and marketplaces, built to scale.",
  heroSub:
    "Custom, composable commerce for brands outgrowing templates and founders launching marketplaces — API-driven storefronts, low-risk replatforming, multi-vendor mechanics, and mobile apps engineered to scale with your catalog and traffic.",
  heroImage: images.commerce,
  chips: ["Headless / composable", "Multi-vendor marketplaces", "Low-risk replatforming", "PWA & mobile"],
  primaryKeyword: "Headless commerce & marketplace development",
  intro: {
    title: "What is a headless / marketplace build?",
    body: (
      <>
        A headless build separates your storefront from the commerce engine, so the front end can be
        fast, custom, and independent of any one platform. A marketplace build adds multi-vendor
        mechanics — onboarding, payouts, and commissions. We do both for US D2C and marketplace
        brands: engineered for Core Web Vitals, full ownership, and scale through peak traffic without
        a re-platform.
      </>
    ),
  },
  featuresTitle: "What we build",
  features: [
    { icon: "grid", title: "Headless & composable storefronts", desc: "API-driven front ends decoupled from the commerce engine — fast, custom, and free of platform lock-in." },
    { icon: "layers", title: "Replatforming & migration", desc: "Low-risk cutover with data integrity — SKUs, orders, customers and SEO moved without losing traffic or revenue." },
    { icon: "store", title: "Multi-vendor marketplaces", desc: "Vendor onboarding and payouts, commission logic, search and discovery, logistics, and trust/ratings — scaled from day one." },
    { icon: "phone", title: "Mobile commerce apps & PWAs", desc: "Native and cross-platform shopping apps and installable PWAs — fast and built to convert on every device." },
    { icon: "search", title: "Search & merchandising", desc: "Fast, relevant product discovery and merchandising rules that put the right products in front of the right shoppers." },
    { icon: "gauge", title: "Performance & Core Web Vitals", desc: "LCP, INP and CLS budgeted and protected in every release — because commerce speed is measured in revenue." },
  ],
  approachTitle: "Engineered for scale — owned by you.",
  approachSub:
    "A beautiful store that loads slowly or can't scale is a liability. We build composable systems you own outright.",
  approachPoints: [
    "API-first, composable architecture that scales through peak traffic without re-platforming.",
    "Low-risk migrations with data integrity and SEO preservation — no traffic cliff at cutover.",
    "Marketplace mechanics — payouts, commissions, trust — architected to scale supply and demand.",
    "Core Web Vitals treated as a feature, budgeted and protected release over release.",
    "Full code ownership and handover — no black boxes, no lock-in.",
  ],
  related: [
    { label: "Integrations & Orchestration", href: "/commerce/integrations" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "AI Commerce Starter", href: "/ai-agents/commerce-starter" },
    { label: "Managed Commerce & Compliance", href: "/commerce/managed-compliance" },
  ],
  faq: [
    { q: "How long does a headless build take?", a: "About four weeks from a signed scope and your catalog in hand. That's fast because we don't start from a blank repo — the commerce engine, the AI layer and the admin already exist, so the four weeks goes on your storefront rather than the platform underneath it. The clock runs on both sides: we need the scope signed and your content ready at kickoff, and change requests get their own scope and timeline. Marketplaces and complex migrations take longer. We work in two-week sprints so you see working software every cycle, not status decks." },
    { q: "Can you migrate us without losing SEO or traffic?", a: "Yes. Replatforming is a core service — we preserve URL structure, redirects, and metadata, and cut over in a low-risk, staged way so rankings and revenue hold." },
    { q: "Do I own the code?", a: "Completely. We build on open, composable architecture and hand over full ownership — no proprietary lock-in and no black boxes." },
    { q: "Which platforms do you build on?", a: "We're composable-first and platform-honest — headless with the commerce engine that fits your stage, plus custom services where it earns its place. We'll recommend the right architecture in a free workshop." },
    { q: "Can you add AI search and recommendations?", a: "Yes — that's our AI Commerce Starter service. Semantic search, personalized recommendations, and a shopping assistant drop into a headless storefront cleanly." },
  ],
  cta: {
    title: "Outgrown your template? Let's architect the next platform.",
    body: "Book a free architecture workshop — we'll sketch the data model, APIs, and scalability plan for your headless or marketplace build.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
