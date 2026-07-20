import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/agent-ready-commerce", {
    title: "Agent-Ready Commerce: ACP, Google UCP & Retail MCP | MnT Future",
    description:
      "Make your store discoverable & buyable by AI shopping agents: agent-readiness audit, feed & price sync, ACP + Google UCP + Retail MCP, AEO.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/agent-ready-commerce",
  parent: { label: "AI & Agents", href: "/ai-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "Agent-Ready Commerce" },
  ],
  eyebrow: "Agent-ready commerce",
  h1: "Make your store discoverable and buyable by AI agents.",
  heroSub:
    "AI shopping agents are becoming a $900B to $1T channel, and most stores can't transact in it. We make yours agent-ready: correct data, optimized feeds, real-time sync, and the ACP, UCP and MCP integrations agents use to buy.",
  heroImage: images.ai,
  chips: ["Agent-readiness audit", "ACP · Google UCP", "Retail MCP server", "AEO visibility"],
  primaryKeyword: "Agent-ready commerce (ACP, UCP, MCP)",
  intro: {
    title: "What is agent-ready commerce?",
    body: (
      <>
        Agent-ready commerce means AI shopping agents, like those in ChatGPT and Google: can find
        your products, trust your price and inventory data, and complete a purchase on a customer's
        behalf. We audit your readiness, optimize your structured product feed, keep price and inventory
        synced in real time, and integrate the emerging agentic protocols: ACP (OpenAI + Stripe),
        Google's UCP, and a Retail MCP server, plus AEO so AI answers surface your brand.
      </>
    ),
  },
  featuresTitle: "What we build",
  features: [
    { icon: "search", title: "Agent-readiness audit", desc: "A clear assessment of your data, price and inventory accuracy, and feed quality: the wedge that shows exactly what's blocking agentic sales." },
    { icon: "records", title: "Structured product-feed optimization", desc: "Clean, complete, structured product data that agents and AI search can parse and trust: the foundation of every agentic sale." },
    { icon: "network", title: "Real-time price & inventory sync", desc: "Agents won't transact on stale data. We keep price and inventory accurate in real time across every channel." },
    { icon: "bolt", title: "ACP + Google UCP integration", desc: "Integrate the Agentic Commerce Protocol (OpenAI + Stripe) and Google's Universal Commerce Protocol so agents can check out." },
    { icon: "cloud", title: "Retail MCP server", desc: "A Model Context Protocol server that exposes your catalog, pricing and inventory to AI agents in a standard, secure way." },
    { icon: "eye", title: "AEO / AI-search visibility + monitoring", desc: "Answer-engine optimization so AI assistants recommend your brand, with ongoing monitoring of how you show up." },
  ],
  approachTitle: "Sell where the next buyers are: first.",
  approachSub:
    "Multi-protocol agent-readiness is an early-mover edge. The brands that get there first win the channel.",
  approachPoints: [
    "Correct, real-time data first: agents only transact when price and inventory are trustworthy.",
    "Multi-protocol coverage (ACP, UCP, MCP) can add ~40% agentic traffic versus a single integration.",
    "AEO visibility so AI answers recommend and cite your brand, not just your competitors.",
    "Ongoing monitoring: the agentic channel is moving fast, and we keep you current as it evolves.",
  ],
  related: [
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter" },
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  ],
  faq: [
    { q: "Is agentic commerce real yet, or is it hype?", a: "It's early but moving fast: OpenAI and Stripe's ACP and Google's UCP are live, and analysts size the agentic channel at $900B to $1T. Getting ready now is an early-mover advantage, not a bet on the far future." },
    { q: "What's the fastest way to find out if we're ready?", a: "The free agent-readiness audit. We assess your data, price/inventory accuracy, and feed quality and show you exactly what's blocking agentic sales: it's our recommended starting point." },
    { q: "What is a Retail MCP server?", a: "MCP (Model Context Protocol) is a standard way for AI agents to access tools and data. A Retail MCP server securely exposes your catalog, pricing and inventory so agents can query and transact reliably." },
    { q: "How is this different from SEO?", a: "SEO gets you ranked for humans; AEO (answer-engine optimization) gets you surfaced and recommended inside AI answers. Agent-ready commerce goes further: it lets agents actually buy, not just cite you." },
    { q: "Do our systems need to be integrated first?", a: "Accurate real-time data is a prerequisite, so Integrations & Automation often pairs with this. If your price/inventory data isn't reliable yet, we fix that as part of getting you agent-ready." },
  ],
  cta: {
    title: "Get agent-ready before your competitors do.",
    body: "Start with a free agent-readiness audit: we'll assess your data and feeds and map the fastest path into AI shopping channels.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
