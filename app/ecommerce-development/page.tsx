import type { Metadata } from "next";
import HubPage, { HubConfig } from "@/components/HubPage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ecommerce-development", {
    title: "E-Commerce Development Company | Custom & D2C | MnT",
    description:
      "Custom e-commerce development for D2C brands and marketplaces. Headless, Shopify, and bespoke platforms built to convert and scale. India + global delivery.",
  });
}

const config: HubConfig = {
  vertical: "E-Commerce",
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "E-Commerce Development" },
  ],
  eyebrow: "E-commerce development",
  h1: "E-commerce development that scales with your brand.",
  heroSub:
    "MnT is an e-commerce development company building stores and platforms engineered to convert and scale — custom builds, D2C brand platforms, marketplaces, Shopify, headless commerce, and B2B. Performance-obsessed, conversion-first, India + global.",
  heroChips: ["Custom & headless", "Shopify experts", "D2C & marketplace", "Conversion-first"],
  heroImage: images.ecommerce,
  servicesTitle: "Seven ways we engineer commerce",
  servicesSub:
    "Whether you've outgrown a template or you're launching a new category, we build the platform your growth depends on.",
  services: [
    { icon: "code", title: "Custom e-commerce", desc: "Bespoke platforms for brands that have outgrown templates — custom checkout, integrations, and performance built to scale.", href: "/ecommerce-development/custom" },
    { icon: "store", title: "D2C brand platforms", desc: "Own your customer and your margin — India-ready payments, subscriptions, and conversion-first design.", href: "/ecommerce-development/d2c" },
    { icon: "grid", title: "Marketplace development", desc: "Multi-vendor platforms with vendor onboarding, payments, logistics, and search engineered to scale from day one.", href: "/ecommerce-development/marketplace" },
    { icon: "bolt", title: "Shopify & headless Shopify", desc: "Custom themes, apps, and migrations that convert — and headless Shopify when you need full control of the front end.", href: "/ecommerce-development/shopify" },
    { icon: "users", title: "B2B e-commerce", desc: "Quote-to-order, account pricing, approvals, and ERP integration — commerce engineered for complex B2B buying.", href: "/ecommerce-development/b2b" },
    { icon: "phone", title: "E-commerce app development", desc: "Native and cross-platform shopping apps — fast, beautiful, and built to convert on iOS, Android, React Native and Flutter.", href: "/ecommerce-development/mobile-app" },
    { icon: "layers", title: "Commerce SaaS for startups", desc: "For funded commerce startups: multi-tenant SaaS products with subscriptions, merchant dashboards and analytics — engineered to scale, the platform you take to market.", href: "/ecommerce-development/saas" },
  ],
  diff: {
    eyebrow: "Conversion & performance",
    title: (
      <>
        Traffic is vanity.
        <br className="hidden sm:block" /> Conversion is the build.
      </>
    ),
    sub: "A beautiful store that loads slowly or converts poorly is a liability. We engineer for Core Web Vitals, checkout conversion, and scale — because commerce performance is measured in revenue.",
    points: [
      "Core Web Vitals as a feature — LCP, INP and CLS budgeted and protected in every release.",
      "Conversion-first checkout, search, and merchandising — built to lift revenue per visit.",
      "India-ready payments (UPI), subscriptions, and logistics integrations out of the box.",
      "Headless and composable architecture that scales through peak traffic without re-platforming.",
    ],
  },
  audiencesTitle: "Built for brands serious about growth",
  audiences: [
    { icon: "tag", title: "D2C brands", desc: "Outgrown Shopify's defaults? We build the custom commerce that protects your margin and your brand." },
    { icon: "grid", title: "Marketplaces", desc: "Multi-vendor platforms with the onboarding, payments, and trust infrastructure to scale supply and demand." },
    { icon: "users", title: "B2B & enterprise", desc: "Account pricing, quotes, approvals, and ERP integration — commerce engineered for complex buying." },
  ],
  stats: [
    { value: "CWV", label: "Core Web Vitals treated as a feature" },
    { value: "Headless", label: "Composable, API-first architecture" },
    { value: "UPI-ready", label: "India payments & subscriptions" },
    { value: "iOS+Android", label: "Native & cross-platform apps" },
  ],
  faq: [
    { q: "How much does e-commerce development cost?", a: "It depends on scope. A custom D2C build typically starts in the mid five figures (USD) for global clients and ₹15L+ for India builds; a marketplace or headless platform costs more. Book a discovery call and we'll give you an honest range against your requirements." },
    { q: "Shopify or custom — which should I choose?", a: "Shopify (or headless Shopify) is ideal when you want speed to market and standard commerce flows. Go custom when you've outgrown the platform — complex catalogues, unique checkout logic, deep integrations, or marketplace mechanics. We build both and will recommend honestly based on your stage." },
    { q: "Can you build a multi-vendor marketplace?", a: "Yes. We build marketplaces end to end — vendor onboarding and payouts, commission logic, search and discovery, logistics, and trust/ratings — architected to scale supply and demand from day one." },
    { q: "Do you handle India (UPI) payments?", a: "Yes. We integrate UPI, cards, wallets, net banking, EMI, and subscriptions through gateways like Razorpay and others, plus international payments for global storefronts." },
    { q: "How long does a store take to build?", a: "A focused Shopify or D2C build typically launches in 6–12 weeks; custom platforms and marketplaces take longer. We work in two-week sprints so you see progress every cycle." },
    { q: "Do you do both D2C and B2B?", a: "Yes. We build D2C brand platforms, B2B commerce with account pricing and approvals, and hybrid models that serve both customer types from one platform." },
  ],
  cta: {
    title: "Ready to build a store that actually converts?",
    body: "A 30-minute call with a senior commerce engineer. Bring your brand and your goals — leave with a platform recommendation, a timeline, and an honest budget range.",
  },
};

export default function EcommerceHub() {
  return <HubPage config={config} />;
}
