import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/integrations", {
    title: "Commerce Integrations: ERP, OMS, PIM, CDP | MnT Future",
    description:
      "Connect ERP, OMS, PIM, CDP, payments & 3PL into one commerce stack: orchestration, data pipelines, and automation, one source of truth.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/integrations",
  parent: { label: "Commerce Platforms", href: "/commerce" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Integrations & Automation" },
  ],
  eyebrow: "Integrations & automation",
  h1: "Connect your whole commerce stack so it works as one.",
  heroSub:
    "Your ERP, order management (OMS), product catalog (PIM), customer data (CDP), payments and shipping partners (3PL) should share one source of truth, not fight each other. We connect your systems so data is accurate everywhere and operations run themselves.",
  heroImage: images.dev,
  chips: ["ERP · OMS · PIM · CDP", "Payments & 3PL", "Single source of truth", "Workflow automation"],
  primaryKeyword: "Commerce integrations & orchestration",
  intro: {
    title: "What is commerce integration & automation?",
    body: (
      <>
        Integration connects your systems; orchestration makes them work together as one. We wire your
        store to your ERP, order management, product catalog, customer data, payment and shipping
        systems, then build the
        pipelines and automation that keep inventory, orders, pricing and customer data consistent in
        real time: one connected ecosystem instead of a pile of disconnected tools.
      </>
    ),
  },
  featuresTitle: "What we connect",
  features: [
    { icon: "network", title: "ERP & back-office integration", desc: "Wire your back office to your storefront: inventory, orders, products and customer data flowing both ways in real time.", href: "/commerce/erp-integration" },
    { icon: "wallet", title: "Payments, shipping & logistics", desc: "Gateways, tax engines, and shipping/fulfillment partners integrated cleanly, with reconciliation you can trust.", href: "/commerce/payments-shipping-integration" },
    { icon: "layers", title: "A flexible connecting layer", desc: "One layer coordinates all your systems, so you can swap or add any tool without breaking the rest." },
    { icon: "records", title: "Data pipelines & single source of truth", desc: "One canonical record for products, inventory and customers, so every team and channel sees the same numbers.", href: "/commerce/data-pipelines" },
    { icon: "bolt", title: "Workflow automation", desc: "Automate the manual handoffs between systems: order routing, stock updates, fulfillment triggers, and alerts.", href: "/commerce/workflow-automation" },
    { icon: "cloud", title: "Real-time sync & monitoring", desc: "Event-driven sync with monitoring and retries, so a failed webhook never silently breaks inventory or orders." },
  ],
  approachTitle: "One connected ecosystem: accurate everywhere.",
  approachSub:
    "Disconnected tools mean manual work, drift, and errors that cost orders. We make the stack behave like one system.",
  approachPoints: [
    "A single source of truth for products, inventory, pricing and customers across every channel.",
    "Event-driven, real-time sync with monitoring, retries and reconciliation, not brittle nightly batches.",
    "Middleware built so you can swap or add systems without a rebuild.",
    "Automation across the whole stack: far less manual operations, far fewer errors.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce" },
  ],
  faq: [
    { q: "Which systems do you integrate?", a: "ERP, OMS, PIM, CDP, payment gateways and tax engines, and 3PL/logistics providers, plus marketing, analytics and support tools. If it has an API or a feed, we can connect it." },
    { q: "Our data is a mess across tools. Where do we start?", a: "With a data model and a single source of truth. We map what each system owns, resolve conflicts, and build the canonical record everything else syncs to: usually starting with products and inventory." },
    { q: "Real-time or batch sync?", a: "Event-driven and real-time wherever it matters (inventory, orders, pricing), with monitoring and retries so failures are visible and recoverable. Batch only where real-time adds no value." },
    { q: "Does this help with AI and agentic channels?", a: "Directly. Accurate, real-time price and inventory data is the foundation of Agent-Ready Commerce: AI shopping agents can only transact correctly if your feeds are correct." },
    { q: "Can you keep the integrations running?", a: "Yes, under our Managed Support & Compliance SLA we monitor, maintain and evolve integrations as your systems change." },
  ],
  cta: {
    title: "Tired of systems that don't talk to each other?",
    body: "Book a free strategy session: we'll map your stack and show you the single-source-of-truth design that ends the manual work.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
