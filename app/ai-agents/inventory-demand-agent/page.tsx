import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/inventory-demand-agent", {
    title: "AI Inventory & Demand Agent for Commerce | MnT Future",
    description:
      "An AI agent that projects stockouts from live sales velocity, surfaces the demand your order data can't see, and drafts restock orders for your approval.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/inventory-demand-agent",
  parent: { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Inventory & Demand Agent" },
  ],
  eyebrow: "AI inventory & demand agent",
  h1: "See the stockout before it happens.",
  heroSub:
    "An agent that watches live sales velocity, projects when each product runs out, and drafts the restock orders to cover it: for your approval, not behind your back. It also surfaces the demand your order data can't show you: the searches that found nothing.",
  heroImage: images.ai,
  chips: ["Stockout projections", "Restock drafts for approval", "Demand you can't see", "Answers without reports"],
  primaryKeyword: "AI inventory & demand forecasting agent",
  intro: {
    title: "What is an inventory & demand agent?",
    body: (
      <>
        An inventory and demand agent is an AI worker that keeps watch over your stock: it projects
        stockouts from live sales velocity, drafts restock orders for a human to approve, and answers
        questions like how many weeks of stock are left, without waiting on a report. Because it also
        reads searches and add-to-carts, it sees demand before it becomes orders, and demand that never
        becomes orders because you don't stock the product.
      </>
    ),
  },
  featuresTitle: "The watch it keeps on your stock.",
  features: [
    { icon: "gauge", title: "Stockout projections", desc: "When each product runs out at current velocity, projected continuously: the surprise stockout stops being a surprise." },
    { icon: "edit", title: "Restock drafts, you approve", desc: "The agent drafts the restock order with quantities and timing. Nothing is ordered until a human approves it." },
    { icon: "search", title: "Demand your orders can't see", desc: "If forty people searched for a product you don't stock, that demand never shows in sales data. The agent surfaces it." },
    { icon: "chat", title: "Answers on demand", desc: "How many weeks of stock? What's about to run out? Asked in plain language, answered from live data." },
    { icon: "bell", title: "Alerts that matter", desc: "Flags the products that need a decision this week, instead of a dashboard nobody opens." },
    { icon: "records", title: "Works with young stores", desc: "Blends actual sales velocity with leading indicators like add-to-carts and searches, so thin order history still produces workable projections." },
  ],
  approachTitle: "From gut-feel reordering to a kept watch.",
  approachSub:
    "Stockouts and overstock are both cash problems. The agent's job is fewer of both.",
  approachPoints: [
    "Projections from live velocity, not last quarter's spreadsheet.",
    "Restock orders drafted for approval: a human always signs the purchase.",
    "Leading indicators (searches, add-to-carts) fill in what thin order history can't.",
    "Connected to your commerce platform and inventory systems, so the numbers are real.",
  ],
  related: [
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Merchandising Agent", href: "/ai-agents/merchandising-agent" },
    { label: "Support Agent", href: "/ai-agents/support-agent" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
  ],
  faq: [
    { q: "How can it forecast if our store is young?", a: "Most demand tools need years of order history before they say anything useful. Ours blends actual sales velocity with leading indicators: add-to-carts and searches, so it produces workable projections on a store with thin order data. It also surfaces demand your orders can't show you: the searches that returned nothing." },
    { q: "Does it place orders itself?", a: "No. It drafts the restock order with quantities and timing, and a human approves it before anything is committed. You get the speed of automation with a person signing every purchase." },
    { q: "Does it work with our inventory system or ERP?", a: "Yes, that's the point: it connects to your commerce platform and inventory or ERP data so projections come from reality. If your stock data itself is unreliable, our Integrations & Automation service fixes that first." },
    { q: "How do you price it?", a: "Usually outcome or hybrid pricing: a build fee plus a monthly run, and often a per-outcome component. You're paying for decisions made on time, not another dashboard." },
    { q: "How do we start?", a: "With a free strategy session: we look at your catalog, your reorder rhythm, and where stockouts hurt most, and scope the agent around those products first." },
  ],
  cta: {
    title: "Stop discovering stockouts from customers.",
    body: "Book a free strategy session: we'll show you which products are at risk right now, and how the agent would keep the watch.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
