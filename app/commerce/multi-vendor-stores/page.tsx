import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/multi-vendor-stores", {
    title: "Multi-Vendor Store Development | MnT Future",
    description:
      "A marketplace at a focused scale: local vendors, community sellers, or one category, with onboarding, payouts and ratings sized for your market.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/multi-vendor-stores",
  parent: { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Multi-Vendor Stores" },
  ],
  eyebrow: "Multi-vendor stores",
  h1: "A marketplace, sized for your market.",
  heroSub:
    "Local vendors, community sellers, or one category done deep: a multi-vendor store gives you real marketplace tools (onboarding, payouts, ratings) at a scale you can launch and run without a platform team.",
  heroImage: images.commerce,
  chips: ["Local & community sellers", "Single-category depth", "Payouts & ratings", "Launch-ready scale"],
  primaryKeyword: "Multi-vendor store development",
  intro: {
    title: "What is a multi-vendor store?",
    body: (
      <>
        A multi-vendor store is a marketplace at a focused scale: a city's local vendors, a community
        of makers, or a single category done properly. Sellers get onboarding, listings, and payouts;
        buyers get one storefront and one checkout. You get the marketplace model without building for
        a scale you don't need yet, and a clear path to grow if the model takes off.
      </>
    ),
  },
  featuresTitle: "Real marketplace tools, right-sized.",
  features: [
    { icon: "users", title: "Vendor onboarding", desc: "Vendors join, list, and manage their products themselves, without your team doing the data entry." },
    { icon: "wallet", title: "Payouts & commissions", desc: "Each sale splits automatically between the vendor and your commission: no spreadsheets, no month-end math." },
    { icon: "store", title: "One storefront, one checkout", desc: "Buyers shop across vendors in a single cart and checkout, and each vendor gets their part of the order." },
    { icon: "tag", title: "Category depth", desc: "Built for a focused catalog: the filters, attributes, and search your specific category actually needs." },
    { icon: "shield", title: "Ratings & quality", desc: "Vendor ratings and simple moderation keep quality visible and catch problems early." },
    { icon: "rocket", title: "A path to grow", desc: "If the model works, the platform grows with it: more vendors, more categories, or a full marketplace build later." },
  ],
  approachTitle: "Marketplace tools, without marketplace overhead.",
  approachSub: "You shouldn't need an Amazon budget to run twenty great vendors well.",
  approachPoints: [
    "Launch-ready scope: the seller tools you need now, not a platform team's worth of machinery.",
    "Payouts and commissions automated from the first sale.",
    "Search and filters designed for your category, not a generic template.",
    "Grows into a full marketplace platform if demand takes off: same foundation, no restart.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Marketplace Platforms", href: "/commerce/marketplace-platforms" },
    { label: "D2C / Brand Stores", href: "/commerce/d2c-brand-stores" },
    { label: "Quick Commerce / Hyperlocal", href: "/commerce/quick-commerce" },
  ],
  faq: [
    { q: "How is this different from a full marketplace platform?", a: "Scale and scope. A multi-vendor store runs a focused market: local vendors, a community, one category. A marketplace platform is engineered for thousands of sellers and the moderation and infrastructure that come with them. Same foundation, so one can grow into the other." },
    { q: "How many vendors can it handle?", a: "It's sized for a focused market: tens to hundreds of vendors rather than thousands. If you're planning for thousands from the start, we'd point you at a full marketplace platform build, and we'll tell you honestly which fits in your strategy session." },
    { q: "Do vendors need to be technical?", a: "No. Onboarding is built so a vendor can join, add products, and see their sales without training. Your team can approve listings if you want a review step." },
    { q: "Can we charge vendors differently?", a: "Yes: commission rates, listing fees, or per-tier subscriptions are all configurable in the model we design with you." },
    { q: "What does it cost to run?", a: "Less than a full marketplace: less infrastructure, less moderation, less ops. We'll scope the build and the monthly run honestly in a free strategy session." },
  ],
  cta: {
    title: "Got the vendors? Let's build the store.",
    body: "Book a free strategy session: we'll design the vendor flow and the payouts around your market.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
