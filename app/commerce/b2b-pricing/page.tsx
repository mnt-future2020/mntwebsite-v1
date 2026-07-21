import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/b2b-pricing", {
    title: "B2B Pricing & Customer-Specific Catalogs | MnT Future",
    description:
      "Negotiated price lists, contract pricing and per-account catalogs applied automatically: every buyer sees exactly their prices, with no rep in the loop.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/b2b-pricing",
  parent: { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Customer-Specific Pricing & Catalogs" },
  ],
  eyebrow: "Customer-specific pricing & catalogs",
  h1: "Every buyer sees exactly their price.",
  heroSub:
    "Negotiated price lists, contract pricing, volume breaks, and per-account catalogs: applied automatically at sign-in, synced from your ERP, and enforced at checkout. Your reps stop quoting what the system already knows.",
  heroImage: images.commerce,
  chips: ["Negotiated price lists", "Contract pricing", "Per-account catalogs", "Synced from your ERP"],
  primaryKeyword: "B2B customer-specific pricing & catalogs",
  intro: {
    title: "What is customer-specific pricing?",
    body: (
      <>
        B2B rarely has one price. Each account has negotiated rates, contract terms, volume breaks,
        and often its own approved product range. Customer-specific pricing means the store knows all
        of that: a buyer signs in and sees exactly their catalog at exactly their prices, checked out
        at exactly their terms, without a rep looking anything up.
      </>
    ),
  },
  featuresTitle: "Pricing the store enforces for you.",
  features: [
    { icon: "tag", title: "Negotiated price lists", desc: "Each account's agreed prices applied automatically at sign-in: no lookup, no rep, no mistakes." },
    { icon: "records", title: "Contract pricing & volume breaks", desc: "Contracted rates and quantity discounts enforced by the system, exactly as negotiated." },
    { icon: "grid", title: "Per-account catalogs", desc: "Each buyer sees the products they're approved to buy: their range, their units, their pack sizes." },
    { icon: "network", title: "Priced from your ERP", desc: "Price lists keep living where they live today (usually the ERP) and sync in real time: one source of truth." },
    { icon: "users", title: "Roles & visibility", desc: "Who sees prices, who can order, and who needs sign-off: controlled per account." },
    { icon: "shield", title: "Guardrails", desc: "Floors, margins, and expiry dates on special pricing: the system enforces what sales agreed, and nothing below it." },
  ],
  approachTitle: "Pricing is a contract. The store should honor it.",
  approachSub:
    "Every manually quoted price is a chance to leak margin or break a promise.",
  approachPoints: [
    "Applied automatically: the right price for the right buyer, every time, at any hour.",
    "Synced from your ERP in real time: no manually maintained price lists to drift.",
    "Guardrails on floors and expiry, so special pricing never quietly becomes the default.",
    "Works alongside D2C: consumer and business buyers on one platform, each seeing their own world.",
  ],
  related: [
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Quote / RFQ Workflows", href: "/commerce/quote-rfq" },
    { label: "Self-Serve Buying Portals", href: "/commerce/buying-portals" },
    { label: "ERP & Back-Office Integration", href: "/commerce/erp-integration" },
  ],
  faq: [
    { q: "Where do the price lists live?", a: "Wherever they live today, usually your ERP. We sync them in real time rather than recreating them, so pricing has one home and the store always reflects it." },
    { q: "Can buyers see list price versus their price?", a: "Your call: some brands show the discount to reinforce the relationship, others show only the account price. It's a per-account setting, not a rebuild." },
    { q: "What about products without contracted prices?", a: "They can fall back to list price, be hidden from that account, or route into a quote: that's the Quote / RFQ workflow, and the two work together naturally." },
    { q: "Can we run D2C and B2B pricing on one store?", a: "Yes. One platform, shared catalog and inventory, with separate pricing, checkout, and account logic for consumers and business buyers." },
    { q: "How do we start?", a: "With a free strategy session: we map how your pricing actually works today (lists, contracts, exceptions) and design the model that enforces it automatically." },
  ],
  cta: {
    title: "Stop quoting what the system already knows.",
    body: "Book a free strategy session: we'll map your price lists and contracts and show you what applying them automatically looks like.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
