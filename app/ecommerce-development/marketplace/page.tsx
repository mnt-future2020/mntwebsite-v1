import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Marketplace Development Company",
  description:
    "Multi-vendor marketplace development — vendor onboarding, payments, logistics and search built to scale from day one. India + global delivery.",
  alternates: { canonical: "/ecommerce-development/marketplace" },
};

const config: ServiceConfig = {
  slug: "/ecommerce-development/marketplace",
  parent: { label: "E-Commerce", href: "/ecommerce-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "E-Commerce", href: "/ecommerce-development" },
    { label: "Marketplace Development" },
  ],
  eyebrow: "E-Commerce · Marketplace",
  h1: "Multi-vendor marketplaces, engineered to scale.",
  heroSub:
    "We build multi-vendor marketplaces end to end — vendor onboarding and payouts, commission logic, search, logistics and trust — architected to scale supply and demand from day one.",
  heroImage: images.ecommerce,
  chips: ["Multi-vendor", "Payouts & commission", "Search & discovery", "Built to scale"],
  primaryKeyword: "marketplace development company",
  intro: {
    title: "What does marketplace development involve?",
    body: "Marketplace development is building a platform where many sellers reach many buyers — with vendor onboarding, catalogues, payments and payouts, commission logic, search, logistics and trust/ratings. The hard part is scaling both sides at once; MnT architects marketplaces to grow supply and demand without buckling.",
  },
  featuresTitle: "Both sides of the marketplace, handled",
  features: [
    { icon: "store", title: "Vendor onboarding & portals", desc: "Self-serve seller onboarding, catalogue management and vendor dashboards." },
    { icon: "tag", title: "Payments, payouts & commission", desc: "Split payments, escrow, automated payouts and flexible commission models." },
    { icon: "grid", title: "Search & discovery", desc: "Fast, relevant search, filtering and recommendations that help buyers convert." },
    { icon: "network", title: "Logistics & fulfilment", desc: "Shipping, tracking and returns across multiple vendors and locations." },
    { icon: "shield", title: "Trust & ratings", desc: "Reviews, ratings, dispute handling and fraud controls that keep the marketplace safe." },
    { icon: "gauge", title: "Scale architecture", desc: "Built to handle catalogue, traffic and transaction growth on both sides." },
  ],
  approachTitle: "Architected for the two-sided scaling problem",
  approachSub:
    "Marketplaces fail when one side outgrows the other's tooling. We build both to scale together.",
  approachPoints: [
    "Vendor and buyer experiences engineered as first-class, scalable systems.",
    "Robust payments, escrow and automated payouts with clean commission logic.",
    "Search, discovery and recommendations tuned for conversion at scale.",
    "Trust, ratings and fraud controls that protect both sides of the market.",
  ],
  related: [
    { label: "Custom e-commerce", href: "/ecommerce-development/custom" },
    { label: "B2B e-commerce", href: "/ecommerce-development/b2b" },
    { label: "E-commerce apps", href: "/ecommerce-development/mobile-app" },
    { label: "Commerce SaaS for startups", href: "/ecommerce-development/saas" },
  ],
  faq: [
    { q: "Can you build a multi-vendor marketplace from scratch?", a: "Yes — end to end: vendor onboarding and payouts, commission, search and discovery, logistics, and trust/ratings, architected to scale supply and demand from day one." },
    { q: "How do payments and payouts work?", a: "We implement split payments, escrow where needed, and automated vendor payouts with configurable commission models, integrated with India and international gateways." },
    { q: "How much does marketplace development cost?", a: "Marketplaces are larger builds than single stores; cost scales with vendor tooling, payments complexity and logistics. Book a discovery call for a scoped range." },
    { q: "How do you solve the cold-start problem technically?", a: "We design onboarding, incentives and discovery so early supply and demand are easy to seed, and we instrument the marketplace so you can see and fix friction as you grow." },
  ],
  cta: {
    title: "Launching a marketplace? Let's architect it right.",
    body: "Talk to a senior engineer about a multi-vendor platform built to scale both sides — onboarding, payouts, search and trust.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
