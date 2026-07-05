import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/b2b-wholesale", {
    title: "B2B & Wholesale Commerce Development | MnT",
    description:
      "Customer-specific pricing and catalogs, quote/RFQ workflows, bulk ordering, and ERP-integrated self-serve buying portals. B2B and wholesale commerce that opens a high-margin channel.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/b2b-wholesale",
  parent: { label: "Commerce Platforms", href: "/commerce" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "B2B / Wholesale Commerce" },
  ],
  eyebrow: "B2B / wholesale commerce",
  h1: "Sell to businesses, not just consumers.",
  heroSub:
    "A high-margin channel most brands leave on the table. We build B2B and wholesale commerce with customer-specific pricing, quote/RFQ workflows, bulk ordering, and ERP-integrated self-serve portals — so buying is automated and reps are free to sell.",
  heroImage: images.commerce,
  chips: ["Customer pricing", "Quote / RFQ", "Bulk & repeat ordering", "ERP-integrated"],
  primaryKeyword: "B2B & wholesale commerce development",
  intro: {
    title: "What is B2B / wholesale commerce?",
    body: (
      <>
        B2B commerce sells to businesses — with negotiated pricing, purchase approvals, quotes, and
        bulk orders that consumer stores can't handle. We build self-serve buying portals with
        customer-specific catalogs and pricing, RFQ and reorder workflows, and deep ERP and inventory
        integration — a new, high-margin revenue channel for D2C brands adding wholesale, and for
        manufacturers and distributors going direct.
      </>
    ),
  },
  featuresTitle: "What we build",
  features: [
    { icon: "tag", title: "Customer-specific pricing & catalogs", desc: "Negotiated price lists, contract pricing, and per-account catalogs — the right prices for the right buyers, automatically." },
    { icon: "chat", title: "Quote / RFQ workflows", desc: "Request-for-quote, negotiation, and approval flows that turn a sales conversation into a self-serve order." },
    { icon: "cart", title: "Bulk & repeat ordering", desc: "Fast reordering, saved lists, CSV order upload, and bulk carts built for how businesses actually buy." },
    { icon: "records", title: "Large-SKU catalogs", desc: "Search, filtering and merchandising engineered to stay fast across tens of thousands of SKUs and variants." },
    { icon: "network", title: "ERP & inventory integration", desc: "Real-time pricing, stock, credit and order status synced with your ERP — one source of truth across sales and ops." },
    { icon: "building", title: "Self-serve buying portals", desc: "Account hierarchies, roles, purchase approvals, and net terms — a portal that lets buyers serve themselves." },
  ],
  approachTitle: "A new high-margin channel — automated.",
  approachSub:
    "Manual B2B ordering by email and spreadsheet caps your growth. We automate it into a self-serve channel that scales.",
  approachPoints: [
    "Customer-specific pricing and catalogs, driven from your ERP — no more manual price lists.",
    "Quote, approval, and reorder workflows that match how your buyers actually purchase.",
    "Large-SKU performance — fast search and checkout even with huge, complex catalogs.",
    "Bigger average order value and less rep time per order, as buying moves to self-serve.",
  ],
  related: [
    { label: "Headless & Marketplace Builds", href: "/commerce/headless-marketplace" },
    { label: "Integrations & Orchestration", href: "/commerce/integrations" },
    { label: "Managed Commerce & Compliance", href: "/commerce/managed-compliance" },
    { label: "Embedded AI Agents", href: "/ai-agents/embedded-agents" },
  ],
  faq: [
    { q: "Can you run B2B and D2C on one platform?", a: "Yes. We build hybrid models that serve consumers and business buyers from one platform — shared catalog and inventory, with separate pricing, checkout, and account logic for each." },
    { q: "Do you integrate with our ERP?", a: "Yes — ERP and inventory integration is central to B2B. Pricing, stock, credit limits, and order status sync in real time so the portal always reflects reality." },
    { q: "Can buyers get their negotiated pricing automatically?", a: "That's the point. Customer-specific price lists and contract pricing are applied per account, so each buyer sees exactly their prices and catalog without a rep in the loop." },
    { q: "What about quotes and approvals?", a: "We build RFQ, negotiation, and multi-step purchase approvals — including account hierarchies and net terms — so complex B2B buying happens self-serve." },
    { q: "How do we start?", a: "With a free architecture workshop. We map your pricing rules, catalog, and ERP, then design the portal and integrations around how your customers buy." },
  ],
  cta: {
    title: "Open your wholesale channel — without the manual work.",
    body: "Book a free architecture workshop and we'll design the B2B portal, pricing, and ERP integration around your buyers.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
