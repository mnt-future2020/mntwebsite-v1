import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/buying-portals", {
    title: "B2B Self-Serve Buying Portals | MnT Future",
    description:
      "A portal where business buyers serve themselves: account hierarchies, roles, purchase approvals, net terms and order history, without calling a rep.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/buying-portals",
  parent: { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Self-Serve Buying Portals" },
  ],
  eyebrow: "Self-serve buying portals",
  h1: "A portal where your buyers serve themselves.",
  heroSub:
    "Your buyers want to order at 9pm without calling anyone. Your reps want to sell instead of processing. A self-serve portal gives each account its catalog, its prices, its approvals, and its history: open all hours, correct every time.",
  heroImage: images.commerce,
  chips: ["Account hierarchies", "Roles & approvals", "Net terms & credit", "Order history & invoices"],
  primaryKeyword: "B2B self-serve buying portal development",
  intro: {
    title: "What is a self-serve buying portal?",
    body: (
      <>
        It's a private storefront for your business customers: each account signs in to its own
        catalog, its negotiated prices, its people and their permissions, and its full order history.
        Buyers place and track orders themselves, approvals happen inside the flow, and buying on
        account (net terms, credit limits, PO numbers) works the way their finance team expects. Your
        reps stop being the order-entry department.
      </>
    ),
  },
  featuresTitle: "What the portal handles for you.",
  features: [
    { icon: "building", title: "Account hierarchies", desc: "Parent companies, branches, and teams modeled properly: the right people order for the right locations." },
    { icon: "users", title: "Roles & permissions", desc: "Who browses, who orders, who approves, who pays: set per account, enforced everywhere." },
    { icon: "check", title: "Purchase approvals", desc: "Orders route to the right approver with limits and budgets: control without email chains." },
    { icon: "wallet", title: "Net terms & credit", desc: "Terms and credit limits synced from your ERP and applied at checkout: buying on account, correctly." },
    { icon: "records", title: "History, invoices & tracking", desc: "Every order, invoice, and delivery in one place: fewer where-is-it calls reaching your team." },
    { icon: "spark", title: "Self-serve, with help nearby", desc: "Reps see the same portal and can step in with a quote or an order when the buyer wants a human." },
  ],
  approachTitle: "Self-serve wins when it beats calling.",
  approachSub:
    "Buyers use the portal that's faster than the phone. That's the bar we build to.",
  approachPoints: [
    "Each account's world is exact: catalog, prices, people, terms: correctness is what earns trust.",
    "Approvals and budgets inside the flow, so control doesn't mean slowness.",
    "Synced with your ERP for stock, credit, and order status: the portal always reflects reality.",
    "Reps work in the same system, so self-serve and human help are one experience, not two.",
  ],
  related: [
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Customer-Specific Pricing", href: "/commerce/b2b-pricing" },
    { label: "Bulk & Repeat Ordering", href: "/commerce/bulk-ordering" },
    { label: "Quote / RFQ Workflows", href: "/commerce/quote-rfq" },
  ],
  faq: [
    { q: "Will our buyers actually use it?", a: "They will if it's faster than calling, and that's the design bar: their prices already right, their lists already saved, their approvals already routed. Adoption follows convenience, not memos." },
    { q: "Do we lose the customer relationship?", a: "No, you lose the order entry. Reps see the same portal, can quote and order on a buyer's behalf, and spend their time on accounts and deals instead of retyping POs." },
    { q: "Does it work with our ERP?", a: "Yes, that's central: pricing, stock, credit limits, and order status sync in real time, so what the portal shows is what your business actually has and allows." },
    { q: "Can different people at one customer have different rights?", a: "Yes: a branch manager who orders, a crew member who requests, a finance lead who approves and pays. Roles and limits are per person, per account." },
    { q: "How do we start?", a: "With a free strategy session: we map your accounts, approval rules, and ERP, and design the portal around how your customers actually buy." },
  ],
  cta: {
    title: "Open the store your buyers keep asking for.",
    body: "Book a free strategy session: we'll design the portal, the roles, and the ERP sync around your accounts.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
