import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/erp-integration", {
    title: "ERP & Back-Office Integration for Commerce | MnT Future",
    description:
      "Connect your ERP, order management, product catalog and customer data to your store: two-way, real-time integration with a plan to swap systems later.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/erp-integration",
  parent: { label: "Integrations & Automation", href: "/commerce/integrations" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "ERP & Back-Office Integration" },
  ],
  eyebrow: "ERP & back-office integration",
  h1: "Your back office and your store, finally in sync.",
  heroSub:
    "Inventory in the ERP, orders in the store, products in a spreadsheet somewhere: we wire it into one system. Two-way, real-time integration between your storefront and your ERP, order management, product catalog, and customer data.",
  heroImage: images.dev,
  chips: ["Two-way, real-time", "ERP · OMS · PIM · CDP", "No more retyping", "Swap systems later"],
  primaryKeyword: "Commerce ERP & back-office integration",
  intro: {
    title: "What is back-office integration?",
    body: (
      <>
        Your back office is the set of systems that run the business behind the store: the ERP that
        holds inventory and finance, order management (OMS), the product catalog (PIM), and customer
        data (CDP). Integration connects them to your storefront in both directions, so a change in one
        place is true everywhere: no retyping, no drift, no numbers that disagree.
      </>
    ),
  },
  featuresTitle: "The systems we wire together.",
  features: [
    { icon: "network", title: "ERP two-way sync", desc: "Stock, prices, orders, and invoices flowing both ways with your ERP, so neither side drifts." },
    { icon: "records", title: "Order management (OMS)", desc: "Orders route from the store to fulfillment automatically, and status flows back to the customer without anyone retyping." },
    { icon: "tag", title: "Product catalog (PIM)", desc: "One place products are edited, everywhere products appear: site, feeds, marketplaces, and AI agents." },
    { icon: "users", title: "Customer data (CDP)", desc: "Purchases, support history, and marketing joined into one customer record you can actually use." },
    { icon: "layers", title: "Swap systems without a rebuild", desc: "The store talks to a connecting layer, not directly to each tool: replace your ERP later without rebuilding the store." },
    { icon: "eye", title: "Visibility & reconciliation", desc: "When something disagrees (a price, a stock count), you see it and fix it once, not discover it from a customer." },
  ],
  approachTitle: "One truth per fact.",
  approachSub:
    "Every number should have exactly one home. Everything else syncs from it.",
  approachPoints: [
    "We map what each system owns before we wire anything: that's what ends the drift.",
    "Real-time sync where it matters (stock, price, orders), with monitoring and retries.",
    "Built through a connecting layer, so tools can be swapped without a rebuild.",
    "We integrate what you have: replacing a system is a recommendation, never a requirement.",
  ],
  related: [
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "Payments, Shipping & 3PL", href: "/commerce/payments-shipping-integration" },
    { label: "Data Pipelines & Single Source of Truth", href: "/commerce/data-pipelines" },
    { label: "Workflow Automation", href: "/commerce/workflow-automation" },
  ],
  faq: [
    { q: "Which ERPs do you integrate?", a: "If it has an API or a feed, we can connect it: modern cloud ERPs and the older systems that run on exports alike. We'll map your exact systems and their capabilities in the strategy session before promising anything." },
    { q: "Our data is a mess across tools. Where do we start?", a: "With a data model and a single source of truth. We map what each system owns, resolve the conflicts, and build the canonical record everything else syncs to: usually starting with products and inventory." },
    { q: "Real-time or batch?", a: "Real-time where it matters: stock, prices, and orders, with monitoring and retries so failures are visible and recoverable. Batch only where real-time adds no value." },
    { q: "Do we have to replace anything?", a: "No. We integrate what you have. If a system genuinely can't do its job, we'll say so and show you the options, but replacement is a recommendation you decide on, not a requirement." },
    { q: "How long does an integration take?", a: "It depends on how many systems and how clean the data is, so we won't invent a number: you'll get an honest timeline in your free strategy session after we've mapped the stack." },
  ],
  cta: {
    title: "Stop retyping between systems.",
    body: "Book a free strategy session: we'll map what each system owns and design the sync that ends the drift.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
