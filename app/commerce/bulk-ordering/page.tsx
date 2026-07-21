import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/bulk-ordering", {
    title: "B2B Bulk & Repeat Ordering | MnT Future",
    description:
      "Fast reordering, saved lists, CSV order upload and bulk carts built for how businesses buy: the repeat order takes a minute, not a morning.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/bulk-ordering",
  parent: { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Bulk & Repeat Ordering" },
  ],
  eyebrow: "Bulk & repeat ordering",
  h1: "The reorder should take a minute.",
  heroSub:
    "Most B2B volume is the same order again: same products, same quantities, new PO. We build the fast paths: saved lists, one-click reorder, CSV upload, and bulk carts that handle hundreds of lines without slowing down.",
  heroImage: images.commerce,
  chips: ["One-click reorder", "Saved order lists", "CSV order upload", "Hundreds of lines, no lag"],
  primaryKeyword: "B2B bulk & repeat ordering",
  intro: {
    title: "What is bulk & repeat ordering?",
    body: (
      <>
        Business buying isn't browsing: it's the weekly restock, the standing list per location, the
        two-hundred-line order pasted from a spreadsheet. Bulk and repeat ordering is the set of fast
        paths that make those orders take minutes: reorder from history, order from a saved list,
        upload a CSV, or type SKUs straight in, with live prices and stock checked as you go.
      </>
    ),
  },
  featuresTitle: "The fast paths we build.",
  features: [
    { icon: "cart", title: "One-click reorder", desc: "Past orders become new orders in a click, with current prices and stock checked automatically." },
    { icon: "records", title: "Saved lists & standing orders", desc: "Standing lists per location or team: the weekly order becomes a review, not a rebuild." },
    { icon: "edit", title: "CSV order upload", desc: "Buyers who live in spreadsheets paste or upload SKUs and quantities, and get a validated cart back." },
    { icon: "grid", title: "Bulk carts that hold up", desc: "Hundreds of line items without lag: carts and checkout built for real B2B order sizes." },
    { icon: "bolt", title: "Quick order by SKU", desc: "Buyers who know the SKU type it and go: search is optional when you already know what you want." },
    { icon: "check", title: "Approvals still apply", desc: "Purchase approvals and budget limits run on the fast paths too: speed without losing control." },
  ],
  approachTitle: "Repeat volume deserves the least friction.",
  approachSub:
    "Every extra minute in the reorder is a reason for the buyer to fax it, email it, or take it elsewhere.",
  approachPoints: [
    "Built around how buyers actually order: from history, from lists, from spreadsheets, by SKU.",
    "Live prices, stock, and account terms checked on every line as the order builds.",
    "Big orders stay fast: hundreds of lines is normal here, not an edge case.",
    "Approvals and limits enforced on every path, so fast never means uncontrolled.",
  ],
  related: [
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Self-Serve Buying Portals", href: "/commerce/buying-portals" },
    { label: "Customer-Specific Pricing", href: "/commerce/b2b-pricing" },
    { label: "ERP & Back-Office Integration", href: "/commerce/erp-integration" },
  ],
  faq: [
    { q: "How is this different from a normal cart?", a: "Scale and workflow. Consumer carts are built for a handful of items chosen by browsing; B2B orders are hundreds of lines assembled from history, lists, and spreadsheets, checked against account pricing and stock, and often routed through approval. The whole path is different." },
    { q: "Are prices and stock checked live?", a: "Yes: every line reflects the account's pricing and real-time stock, synced from your ERP, so the order that's placed is an order you can actually fill." },
    { q: "Can buyers order for multiple locations?", a: "Yes: account hierarchies support ordering per branch or location, with the right lists, addresses, and approvers for each." },
    { q: "Do POs and net terms work on fast orders?", a: "Yes: PO numbers, net terms, and credit limits apply on every path, fast or not, exactly as they do at a standard checkout." },
    { q: "How do we start?", a: "With a free strategy session: we look at how your buyers actually place orders today and build the fast paths that match, starting with the highest-volume one." },
  ],
  cta: {
    title: "Make the repeat order effortless.",
    body: "Book a free strategy session: we'll find where your buyers lose time ordering and design the fast paths that fix it.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
