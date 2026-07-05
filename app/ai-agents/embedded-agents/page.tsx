import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/embedded-agents", {
    title: "Embedded AI Agents for Commerce — Support, Merchandising, SEO | MnT",
    description:
      "Task-specific AI agents built into your platform — SEO/AEO, customer support, merchandising, and analytics agents. Domain-trained, MCP-connected, with human-in-the-loop oversight and evaluation gates.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/embedded-agents",
  parent: { label: "AI & Agents", href: "/ai-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "Embedded AI Agents" },
  ],
  eyebrow: "Embedded AI agents",
  h1: "Your AI workforce, built into your platform.",
  heroSub:
    "Not another chatbot — task-specific agents that do real work. Support, merchandising, SEO/AEO, and analytics agents, domain-trained and connected to your tools via MCP, running 24/7 with human-in-the-loop oversight and evaluation gates.",
  heroImage: images.ai,
  chips: ["Support agent", "Merchandising agent", "SEO / AEO agent", "Human-in-the-loop"],
  primaryKeyword: "Embedded AI agents for commerce",
  intro: {
    title: "What are embedded AI agents?",
    body: (
      <>
        Embedded agents are AI workers built into your commerce platform to complete specific jobs —
        answering support tickets, optimizing merchandising, generating SEO/AEO content, or surfacing
        analytics. Unlike a generic chatbot, each is domain-trained on your business and connected to
        your real tools and data via MCP, with human-in-the-loop oversight and evaluation gates so the
        work is reliable, not risky.
      </>
    ),
  },
  featuresTitle: "Agents we build",
  features: [
    { icon: "chat", title: "Customer support agent", desc: "Resolves common tickets end to end — order status, returns, product questions — deflecting 70–90% and escalating the rest with context." },
    { icon: "tag", title: "Merchandising agent", desc: "Optimizes collections, promotions, and product placement from live signals — merchandising that adjusts itself continuously." },
    { icon: "search", title: "SEO / AEO agent", desc: "Generates and optimizes content for search and AI answer engines — keeping your catalog and content discoverable." },
    { icon: "records", title: "Analytics agent", desc: "Turns your data into answers and alerts — surfacing what changed, why, and what to do, without waiting on a report." },
    { icon: "network", title: "MCP-connected & domain-trained", desc: "Each agent is trained on your business and wired to your real tools and data via the Model Context Protocol." },
    { icon: "shield", title: "Human-in-the-loop + evaluation gates", desc: "Oversight for anything customer-facing and evaluation gates on every action — measured quality, not blind automation." },
  ],
  approachTitle: "Real work completed — 24/7 and measured.",
  approachSub:
    "Agents earn their place by doing work, not chatting. We deploy them with oversight and prove the outcomes.",
  approachPoints: [
    "Support deflection of 70–90%, with handle time dropping from minutes to seconds.",
    "Domain-trained and connected via MCP — agents act on your real data and tools, not generic answers.",
    "Human-in-the-loop for customer-facing actions and evaluation gates on every deployment.",
    "Outcome and hybrid pricing options — you pay for work completed, not seats.",
  ],
  related: [
    { label: "AI Commerce Starter", href: "/ai-agents/commerce-starter" },
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce" },
    { label: "Integrations & Orchestration", href: "/commerce/integrations" },
    { label: "AI Cleanup", href: "/ai-agents/ai-cleanup" },
  ],
  faq: [
    { q: "How is this different from a chatbot?", a: "A chatbot talks; an agent does. Our agents are task-specific and connected to your tools via MCP, so they complete real work — resolving tickets, updating merchandising, generating content — with oversight, not just answering questions." },
    { q: "Will agents make mistakes on customers?", a: "We put human-in-the-loop oversight on customer-facing actions and evaluation gates on every deployment. Agents operate within guardrails, and anything uncertain is escalated to a person with full context." },
    { q: "How do you price agents?", a: "Usually outcome or hybrid pricing — a build fee plus a monthly run, and often a per-outcome component. You're paying for completed work, which aligns our incentives with yours." },
    { q: "Which tasks should we automate first?", a: "Support is the most common starting point because deflection is easy to measure and the ROI is immediate. Merchandising, SEO/AEO, and analytics agents typically follow." },
    { q: "Can agents work with our existing systems?", a: "Yes — that's what MCP is for. We connect agents to your commerce platform, support desk, analytics, and other tools so they act on live data. Clean integrations make this far smoother, which is where our Integrations service helps." },
  ],
  cta: {
    title: "Put an AI workforce to work in your business.",
    body: "Book a free workshop and we'll identify the highest-ROI agent to build first — and how we'd measure the work it completes.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
