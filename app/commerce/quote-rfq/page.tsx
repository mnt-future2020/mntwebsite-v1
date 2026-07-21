import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/quote-rfq", {
    title: "B2B Quote & RFQ Workflows | MnT Future",
    description:
      "Request-for-quote, negotiation and approval flows that turn a sales conversation into a self-serve order: quotes tracked, versioned and converted online.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/quote-rfq",
  parent: { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Quote / RFQ Workflows" },
  ],
  eyebrow: "Quote / RFQ workflows",
  h1: "From \"send me a quote\" to a placed order.",
  heroSub:
    "RFQs arrive by email, live in inboxes, and die in spreadsheets. We build quoting into the store: buyers request from real products, sales responds in one thread, terms get approved, and the accepted quote becomes an order without retyping.",
  heroImage: images.commerce,
  chips: ["RFQ from the catalog", "Negotiation & versions", "Approvals built in", "Quote to order in one click"],
  primaryKeyword: "B2B quote & RFQ workflow development",
  intro: {
    title: "What is a quote / RFQ workflow?",
    body: (
      <>
        RFQ means request for quote: a buyer asks for pricing on specific products and quantities, and
        a negotiation follows. A quote workflow moves that whole conversation into the store: the
        request is built from the actual catalog, every counter-offer is a tracked version, approvals
        happen on both sides, and the final quote converts into an order at the agreed prices. Sales
        keeps the relationship; the system keeps the paperwork.
      </>
    ),
  },
  featuresTitle: "The quoting flow we build in.",
  features: [
    { icon: "chat", title: "RFQ from the catalog", desc: "Buyers build a quote request from real products and quantities, not a free-text email your team has to decode." },
    { icon: "edit", title: "Negotiation with versions", desc: "Counter-offers and revisions tracked in one thread: no more guessing which spreadsheet was final." },
    { icon: "check", title: "Approvals on both sides", desc: "Your pricing approvals and the buyer's purchase approvals, built into the same flow." },
    { icon: "bolt", title: "Quote to order in one click", desc: "An accepted quote becomes an order at the agreed prices: no retyping, no drift between quote and invoice." },
    { icon: "clock", title: "Expiry & follow-up", desc: "Quotes carry validity windows and reminders, so open quotes get answered instead of forgotten." },
    { icon: "records", title: "A record that syncs", desc: "Quotes, orders, and terms flow to your ERP and CRM, so sales sees the whole history in one place." },
  ],
  approachTitle: "Sales keeps the deal. The system keeps the admin.",
  approachSub:
    "Quoting by inbox costs deals to slow replies and lost threads. The workflow closes that gap.",
  approachPoints: [
    "Requests arrive structured, from the catalog: quoting starts from facts, not from decoding an email.",
    "Every version tracked: what was offered, what was agreed, and when.",
    "Accepted quotes convert at the agreed prices: the invoice always matches the promise.",
    "Synced to your ERP and CRM, so quoting stops being a parallel universe.",
  ],
  related: [
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Customer-Specific Pricing", href: "/commerce/b2b-pricing" },
    { label: "Self-Serve Buying Portals", href: "/commerce/buying-portals" },
    { label: "Bulk & Repeat Ordering", href: "/commerce/bulk-ordering" },
  ],
  faq: [
    { q: "Does this replace our sales team?", a: "No, it removes their admin. Reps still negotiate and own the relationship: the workflow handles the tracking, versions, approvals, and conversion so deals stop dying in inboxes." },
    { q: "Can buyers still just email or call?", a: "Of course. Reps can raise a quote on the buyer's behalf in the same system, so the conversation can start anywhere and still end as a tracked, convertible quote." },
    { q: "What about configured or custom products?", a: "Quotable line items can include configured products and custom terms: how far that goes depends on your catalog, and we'll scope it honestly in the strategy session." },
    { q: "Does it sync with our ERP and CRM?", a: "Yes: quotes and resulting orders flow to your ERP, and the activity lands in your CRM, so finance and sales each see the truth in their own system." },
    { q: "How do we start?", a: "With a free strategy session: we walk through how quoting works today (who asks, who approves, where it stalls) and design the workflow around your real process." },
  ],
  cta: {
    title: "Turn quoting from email ping-pong into a pipeline.",
    body: "Book a free strategy session: we'll map your quoting process and show you the workflow that converts it.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
