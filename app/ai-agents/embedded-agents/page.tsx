import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/embedded-agents", {
    title: "Custom AI Agents for Commerce | MnT Future",
    description:
      "Task-specific AI agents in your platform: support, merchandising, SEO/AEO and inventory demand. Trained on your business, with a human always in control.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/embedded-agents",
  parent: { label: "AI & Agents", href: "/ai-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "Custom AI Agents" },
  ],
  eyebrow: "Custom AI agents",
  h1: "Your AI workforce, built into your platform.",
  heroSub:
    "Not another chatbot: task-specific agents that do real work. Support, merchandising, SEO/AEO, and inventory & demand agents, trained on your business and connected to your real tools, running 24/7 with a human approving the important actions.",
  heroImage: images.ai,
  chips: ["Support agent", "Merchandising agent", "Inventory & demand agent", "Human approval built in"],
  primaryKeyword: "Custom AI agents for commerce",
  intro: {
    title: "What are custom AI agents?",
    body: (
      <>
        Custom AI agents are AI workers built into your commerce platform to complete specific jobs:
        answering support tickets, optimizing merchandising, generating SEO/AEO content, or projecting
        stockouts and drafting the restock orders to cover them. Unlike a generic chatbot, each is
        trained on your business and connected to your real tools and data via MCP, with a human
        approving the important actions and quality gates on every change, so the work is reliable,
        not risky.
      </>
    ),
  },
  featuresTitle: "Agents we build",
  features: [
    { icon: "chat", title: "Customer support agent", desc: "Resolves common tickets end to end (order status, returns, product questions), resolving 70 to 90% on its own and handing the rest to your team with context.", href: "/ai-agents/support-agent" },
    { icon: "tag", title: "Merchandising agent", desc: "Optimizes collections, promotions, and product placement from live signals: merchandising that adjusts itself continuously.", href: "/ai-agents/merchandising-agent" },
    { icon: "search", title: "SEO / AEO agent", desc: "Generates and optimizes content for search and AI answer engines: keeping your catalog and content discoverable.", href: "/ai-agents/seo-aeo-agent" },
    { icon: "gauge", title: "Inventory & demand agent", desc: "Projects stockouts from live sales velocity, surfaces the demand your order data can't see, and drafts restock orders for your approval: answers and alerts included, without waiting on a report.", href: "/ai-agents/inventory-demand-agent" },
    { icon: "network", title: "Connected to your real tools", desc: "Each agent is trained on your business and wired to your real tools and data via MCP (Model Context Protocol)." },
    { icon: "shield", title: "A human stays in control", desc: "A human approves the important actions, and every change is tested against quality gates. Measured quality, not blind automation." },
  ],
  approachTitle: "Real work completed: 24/7 and measured.",
  approachSub:
    "Agents earn their place by doing work, not chatting. We deploy them with oversight and prove the outcomes.",
  approachPoints: [
    "70 to 90% of support tickets resolved without a person, with replies in seconds instead of minutes.",
    "Trained on your business and connected via MCP: agents act on your real data and tools, not generic answers.",
    "A human approves customer-facing actions, and quality gates test every deployment.",
    "Outcome and hybrid pricing options: you pay for work completed, not seats.",
  ],
  related: [
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter" },
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "AI Cleanup & MVP Rescue", href: "/commerce/ai-cleanup" },
  ],
  faq: [
    { q: "How is this different from a chatbot?", a: "A chatbot talks; an agent does. Our agents are task-specific and connected to your tools via MCP, so they complete real work: resolving tickets, updating merchandising, generating content, with oversight, not just answering questions." },
    { q: "Will agents make mistakes on customers?", a: "A human reviews customer-facing actions, and quality gates test every deployment. Agents operate within guardrails, and anything uncertain is escalated to a person with full context." },
    { q: "How do you price agents?", a: "Usually outcome or hybrid pricing: a build fee plus a monthly run, and often a per-outcome component. You're paying for completed work, which aligns our incentives with yours." },
    { q: "Which tasks should we automate first?", a: "Support is the most common starting point because resolved tickets are easy to measure and the ROI is immediate. Merchandising, SEO/AEO, and inventory & demand agents typically follow." },
    { q: "How can an agent forecast demand if our store is young?", a: "Most demand tools need years of order history before they say anything useful. Ours blends actual sales velocity with leading indicators: add-to-carts and searches, so it produces workable projections on a store with thin order data. It also surfaces demand your orders can't show you: the searches that returned nothing. If forty people looked for a product last week and you don't stock it, that never appears in your sales data, because those shoppers left." },
    { q: "Can agents work with our existing systems?", a: "Yes, that's what MCP is for. We connect agents to your commerce platform, support desk, analytics, and other tools so they act on live data. Clean integrations make this far smoother, which is where our Integrations service helps." },
  ],
  cta: {
    title: "Put an AI workforce to work in your business.",
    body: "Book a free strategy session and we'll identify the highest-ROI agent to build first, and how we'd measure the work it completes.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
