import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/headless-marketplace", {
    title: "Custom Commerce Platforms & Marketplaces | MnT Future",
    description:
      "D2C brand stores, marketplaces, B2B, subscription and quick commerce: custom headless commerce builds you fully own, engineered to scale.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/headless-marketplace",
  parent: { label: "Commerce Platforms", href: "/commerce" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Custom Commerce Platforms" },
  ],
  eyebrow: "Custom commerce platforms",
  h1: "Custom commerce platforms, built for how you sell.",
  heroSub:
    "For brands outgrowing templates and founders launching platforms: whatever you sell and however you sell it, we build it custom, you own it outright, and it scales with your catalog and traffic. Safe migration off your old platform when you're switching.",
  heroImage: images.commerce,
  chips: ["Custom & fully owned", "Every commerce model", "Safe migration", "Mobile apps"],
  primaryKeyword: "Headless commerce & marketplace development",
  intro: {
    title: "What is a custom commerce platform?",
    body: (
      <>
        A store built for your brand instead of a rented template. The storefront your customers see
        is built separately from the commerce engine behind it, so it stays fast, looks exactly how
        you want, and is never locked to one platform (the industry calls this headless or composable
        commerce). Whatever the model, D2C, marketplace, B2B, or subscription, you own all of it, and
        it scales through peak traffic without a rebuild.
      </>
    ),
  },
  featuresTitle: "Every commerce model, custom-built.",
  features: [
    { icon: "store", title: "D2C / Brand Stores", desc: "Your own brand selling direct to your own customers: a single-seller storefront built for fashion, beauty, food, and D2C startups." },
    { icon: "network", title: "Marketplace Platforms", desc: "Multiple sellers selling on one platform you own, the way Amazon or Etsy works: seller onboarding, commissions, and split payments built in." },
    { icon: "users", title: "Multi-Vendor Stores", desc: "A marketplace at a smaller scale: local vendors, community sellers, or a single-category platform with the same seller tools, sized for a focused market." },
    { icon: "building", title: "B2B Commerce", desc: "Wholesale and dealer or distributor portals: customer-specific pricing and catalogs, bulk ordering, net terms, and credit limits." },
    { icon: "clock", title: "Subscription Commerce", desc: "Recurring orders for boxes, meal kits, refills, and memberships: auto-billing, pause and skip, and renewal management built in." },
    { icon: "bolt", title: "Quick Commerce / Hyperlocal", desc: "Fast, location-based delivery for grocery, food, and pharmacy: delivery zones, live order tracking, and real-time stock by location." },
    { icon: "phone", title: "Mobile Commerce Apps", desc: "Native iOS and Android apps for any of the models above, built with React Native or Flutter to load fast and convert on every device." },
  ],
  approachTitle: "Engineered for scale: owned by you.",
  approachSub:
    "A beautiful store that loads slowly or cannot scale is a liability. We build systems you own outright.",
  approachPoints: [
    "Built to scale through peak traffic without another rebuild.",
    "Low-risk migrations that keep your data and SEO intact: no traffic cliff when you switch.",
    "Marketplace payouts, commissions, and ratings built to handle more sellers and buyers without rework.",
    "Page speed treated as a feature: measured against Google's Core Web Vitals and protected in every release.",
    "Full code ownership and handover: no black boxes, no lock-in.",
  ],
  related: [
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  ],
  faq: [
    { q: "How long does a custom platform build take?", a: "About four weeks from a signed scope and your catalog in hand. That's fast because we don't start from a blank repo: the commerce engine, the AI layer and the admin already exist, so the four weeks goes on your storefront rather than the platform underneath it. The clock runs on both sides: we need the scope signed and your content ready at kickoff, and change requests get their own scope and timeline. Marketplaces and complex migrations take longer. We work in two-week sprints so you see working software every cycle, not status decks." },
    { q: "Can you migrate us without losing SEO or traffic?", a: "Yes. Moving platforms is a core service: we preserve URL structure, redirects, and metadata, and switch you over in a low-risk, staged way so rankings and revenue hold." },
    { q: "Do I own the code?", a: "Completely. We build on open, composable architecture and hand over full ownership: no proprietary lock-in and no black boxes." },
    { q: "Which platforms do you build on?", a: "We're platform-honest: we pick the commerce engine that fits your stage, build your custom storefront on top of it, and add custom services only where they earn their place. We'll recommend the right architecture in a free strategy session." },
    { q: "Can you add AI search and recommendations?", a: "They're already in the platform we build you on: semantic search, personalized recommendations and a shopping assistant, plus an ops agent for the admin side. That's our AI Search & Recommendations, and most builds run it as the first two weeks so the AI is working before the storefront lands on top of it." },
  ],
  cta: {
    title: "Outgrown your template? Let's architect the next platform.",
    body: "Book a free strategy session: we'll sketch the data model, APIs, and scalability plan for your custom platform or marketplace build.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
