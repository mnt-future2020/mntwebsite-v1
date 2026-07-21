import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/marketplace-platforms", {
    title: "Marketplace Platform Development | MnT Future",
    description:
      "Build a multi-seller marketplace the way Amazon or Etsy works: seller onboarding, commissions, split payments, and search, engineered to scale.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/marketplace-platforms",
  parent: { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Marketplace Platforms" },
  ],
  eyebrow: "Marketplace platforms",
  h1: "Build the platform other brands sell on.",
  heroSub:
    "Multiple sellers, one platform, and you own it. We build marketplaces the way Amazon or Etsy works: seller onboarding, commissions, split payments, search and trust, engineered to handle more sellers and more buyers from day one.",
  heroImage: images.commerce,
  chips: ["Seller onboarding", "Commissions & split payments", "Search & discovery", "Trust & ratings"],
  primaryKeyword: "Marketplace platform development",
  intro: {
    title: "What is a marketplace platform?",
    body: (
      <>
        A marketplace is a store where many sellers sell on one platform: you run the platform, take a
        commission, and own the customer experience, the way Amazon or Etsy works. We build the whole
        machine: how sellers join and get paid, how buyers find and trust products, and how money
        splits correctly on every order, engineered to keep working as sellers and buyers multiply.
      </>
    ),
  },
  featuresTitle: "The marketplace machinery we build.",
  features: [
    { icon: "users", title: "Seller onboarding & dashboards", desc: "Sellers join, list products, and track orders and earnings themselves: a clean dashboard instead of email threads." },
    { icon: "wallet", title: "Commissions & split payments", desc: "Your cut and the seller's payout calculated and split automatically on every order, with clean records for both sides." },
    { icon: "search", title: "Search & discovery", desc: "Buyers find the right product across thousands of listings, with categories, filters, and ranking you control." },
    { icon: "shield", title: "Trust, ratings & moderation", desc: "Reviews, seller ratings, and listing moderation: the trust machinery that makes strangers comfortable buying." },
    { icon: "records", title: "Orders across many sellers", desc: "One buyer cart, many sellers: orders routed, shipped, and returned correctly, whoever is fulfilling." },
    { icon: "gauge", title: "Built for scale", desc: "More sellers, more listings, more traffic: the platform holds up through growth without a rebuild." },
  ],
  approachTitle: "The marketplace machinery, done right.",
  approachSub:
    "A marketplace is a harder build than a store. The mechanics have to be right from the first order.",
  approachPoints: [
    "Payouts, commissions, and refunds handled correctly from day one: money mistakes kill marketplaces.",
    "Search and ranking that keep buyers finding the right products as listings grow.",
    "Moderation and ratings that keep quality high without manually policing every listing.",
    "Built to handle more sellers and more buyers without another rebuild.",
    "Full code ownership: the platform and its data are yours.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Multi-Vendor Stores", href: "/commerce/multi-vendor-stores" },
    { label: "Mobile Commerce Apps", href: "/commerce/mobile-commerce-apps" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
  ],
  faq: [
    { q: "How long does a marketplace build take?", a: "Longer than a standard store: marketplace mechanics like payouts, commissions, and moderation add real scope. We'll give you a realistic timeline in your strategy session, and we work in two-week sprints so you see working software every cycle." },
    { q: "How do sellers get paid?", a: "Through split payments: each order divides automatically between your commission and the seller's payout, using a payment provider built for marketplaces. Sellers see their earnings and payout schedule in their own dashboard." },
    { q: "How do we keep listing quality high?", a: "With moderation built into the flow: listing review where you want it, seller ratings buyers can see, and clear rules the platform enforces so quality doesn't depend on someone checking everything by hand." },
    { q: "Marketplace platform or multi-vendor store: what's the difference?", a: "Same machinery, different scale. A marketplace platform is built to grow toward thousands of sellers; a multi-vendor store is the smaller, focused version for local vendors or a single category. We build both, and one can grow into the other." },
    { q: "What do we need before starting?", a: "A clear supply side: who your first sellers are and why they'll join. We'll pressure-test the model with you in a free strategy session and design the platform around it." },
  ],
  cta: {
    title: "Building the next marketplace?",
    body: "Book a free strategy session: we'll design the seller flow, the payment splits, and the architecture that scales.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
