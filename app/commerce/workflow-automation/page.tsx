import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/workflow-automation", {
    title: "Commerce Workflow Automation | MnT Future",
    description:
      "Automate the manual handoffs that run your store: order routing, stock updates, fulfillment triggers and alerts, with monitoring so nothing fails silently.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/workflow-automation",
  parent: { label: "Integrations & Automation", href: "/commerce/integrations" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "Workflow Automation" },
  ],
  eyebrow: "Workflow automation",
  h1: "The ops your team does by hand, done by the system.",
  heroSub:
    "Every store runs on handoffs: order to warehouse, stock to site, refund to books. When people carry them, they're slow and they break on vacation days. We automate the handoffs and put monitoring around them, so the boring work runs itself and failures raise their hand.",
  heroImage: images.dev,
  chips: ["Order routing", "Stock & price updates", "Alerts & escalations", "Monitored, with retries"],
  primaryKeyword: "Commerce workflow automation",
  intro: {
    title: "What is commerce workflow automation?",
    body: (
      <>
        It's turning the manual handoffs between your systems into automatic ones: an order arrives
        and routes itself to fulfillment, a stock change updates every channel, a refund updates the
        books, and the exceptions (and only the exceptions) reach a person. The result is ops that run
        at machine speed with fewer errors, and a team that works on judgment instead of copy-paste.
      </>
    ),
  },
  featuresTitle: "The handoffs we automate.",
  features: [
    { icon: "bolt", title: "Order routing", desc: "Orders flow to the right warehouse, store, or 3PL by rules you set: no morning batch of copy-paste." },
    { icon: "records", title: "Stock & price updates", desc: "Changes propagate everywhere automatically, so the site never sells at yesterday's price or count." },
    { icon: "check", title: "Fulfillment triggers", desc: "Pick, pack, ship, notify: each step kicks off the next, with the customer informed along the way." },
    { icon: "bell", title: "Alerts & escalations", desc: "Stuck orders, failed syncs, and weird totals reach a human fast, with the context to act." },
    { icon: "cloud", title: "Real-time, with retries", desc: "Event-driven automation with monitoring and retries, so a failed webhook never silently breaks inventory or orders." },
    { icon: "gauge", title: "Measured ops", desc: "Hours saved and errors prevented are visible, so the automation proves itself." },
  ],
  approachTitle: "Boring work at machine speed.",
  approachSub:
    "Automation isn't about replacing your team. It's about never making them the pipeline.",
  approachPoints: [
    "Highest-volume handoffs first: orders and stock, where manual work costs most.",
    "Exceptions escalate to people with context: automation handles the normal, humans handle the odd.",
    "Every workflow monitored with retries, so failures are visible and recoverable.",
    "Built on your rules: the system enforces what you decide, and you can change it.",
  ],
  related: [
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "ERP & Back-Office Integration", href: "/commerce/erp-integration" },
    { label: "Data Pipelines & Single Source of Truth", href: "/commerce/data-pipelines" },
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
  ],
  faq: [
    { q: "What should we automate first?", a: "The handoffs with the highest volume and the least judgment: order routing and stock updates are the usual winners. They're where hours disappear and where a missed step costs an order." },
    { q: "Will we lose control of our ops?", a: "No: the rules are yours, the system just enforces them tirelessly. Anything outside the rules escalates to a person with context, and you can change the rules as the business changes." },
    { q: "What happens when an automation fails?", a: "It fails loudly: monitoring catches it, retries recover the transient cases, and a person is alerted for the rest. The dangerous failure is the silent one, and that's exactly what we engineer against." },
    { q: "Do our systems need to be integrated first?", a: "Automation rides on integration: if the systems can't talk, there's nothing to automate. We often build both together, and our Integrations service covers the wiring." },
    { q: "Where do AI agents fit in?", a: "Workflow automation handles the predictable handoffs by rules. When the work needs judgment (support answers, merchandising calls, restock decisions), that's our Custom AI Agents service, with a human approving the important actions." },
  ],
  cta: {
    title: "Automate the handoffs.",
    body: "Book a free strategy session: we'll find the manual work eating your team's week and design the automation around it.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
