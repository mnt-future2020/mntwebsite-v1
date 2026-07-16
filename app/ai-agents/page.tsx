import type { Metadata } from "next";
import HubPage, { HubConfig } from "@/components/HubPage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents", {
    title: "AI & Agents for Commerce — Agent-Ready, Embedded AI | MnT",
    description:
      "AI search & recommendations, agent-ready commerce (ACP/UCP/MCP), embedded AI agents, and AI cleanup — for US D2C & marketplace brands.",
  });
}

const config: HubConfig = {
  vertical: "AI & Agents",
  breadcrumb: [{ label: "Home", href: "/" }, { label: "AI & Agents" }],
  eyebrow: "AI & agents",
  h1: "Make your commerce AI-native and agent-ready.",
  heroSub:
    "AI where it earns its place: search and recommendations that convert the traffic you already have, agents that do real work 24/7, and a store that AI shopping agents can discover and buy from. Plus AI cleanup to make a vibe-coded MVP production-grade.",
  heroChips: ["AI search & recs", "Agent-ready (ACP · UCP · MCP)", "Embedded AI agents", "AI cleanup"],
  heroImage: images.ai,
  servicesTitle: "Four ways AI drives your commerce",
  servicesSub:
    "Start by converting more of your existing traffic, then get discoverable and buyable in AI channels, put agents to work, and harden what you've already built.",
  services: [
    { icon: "spark", title: "AI Commerce Starter", desc: "Semantic search, personalized recommendations, and a conversational shopping assistant — turn the traffic you already have into revenue.", href: "/ai-agents/commerce-starter" },
    { icon: "network", title: "Agent-Ready Commerce", desc: "Make your store discoverable and buyable by AI shopping agents — ACP (OpenAI+Stripe), Google UCP, a Retail MCP server, and AEO visibility.", href: "/ai-agents/agent-ready-commerce" },
    { icon: "chat", title: "Embedded AI Agents", desc: "Task-specific agents — SEO/AEO, support, merchandising, analytics — domain-trained, MCP-connected, with human-in-the-loop oversight.", href: "/ai-agents/embedded-agents" },
    { icon: "code", title: "AI Cleanup", desc: "Turn a vibe-coded or no-code MVP into a production-grade platform — security audit, refactor, hardening, and scalable re-architecture.", href: "/ai-agents/ai-cleanup" },
  ],
  diff: {
    eyebrow: "The wedge",
    title: (
      <>
        The next buyers aren't people.
        <br className="hidden sm:block" /> They're agents.
      </>
    ),
    sub: "AI shopping agents are becoming a $900B–$1T channel — and most stores can't transact in it. We get you selling in AI channels before your competitors, while AI lifts conversion on the store you already run.",
    points: [
      "AI search converts ~4× better than keyword search; AI personalization lifts revenue ~40%.",
      "Agent-ready commerce via ACP, Google UCP, and a Retail MCP server — transact correctly in AI channels.",
      "Embedded agents complete real work 24/7 — support deflection of 70–90%, handle time from minutes to seconds.",
      "Every AI deployment ships with evaluation gates and human-in-the-loop oversight — measured, not hype.",
    ],
  },
  audiencesTitle: "Who we serve",
  audiences: [
    { icon: "store", title: "D2C brands with traffic", desc: "You have visitors but weak conversion. AI search, recommendations, and an assistant turn that traffic into revenue — fast." },
    { icon: "spark", title: "Early-mover brands", desc: "You want AI-channel sales before competitors. We make you agent-ready for the $900B–$1T agentic commerce channel." },
    { icon: "code", title: "Founders past an MVP", desc: "Your vibe-coded or no-code store broke at scale. We audit, harden, and re-architect it into something production-grade." },
  ],
  stats: [
    { value: "~4x", label: "AI search conversion vs keyword" },
    { value: "+40%", label: "Revenue lift from AI personalization" },
    { value: "70–90%", label: "Support deflection with agents" },
    { value: "$900B+", label: "Emerging agentic commerce channel" },
  ],
  faq: [
    { q: "Where should we start with AI?", a: "Almost always the AI Commerce Starter — semantic search, recommendations, and a shopping assistant convert your existing traffic and pay for themselves quickly. From there, agent-readiness and embedded agents expand the impact." },
    { q: "What does \"agent-ready\" actually mean?", a: "It means AI shopping agents can discover your products, trust your price and inventory data, and complete a purchase. We implement ACP (OpenAI+Stripe), Google's UCP, and a Retail MCP server, and optimize your product feed and AEO visibility." },
    { q: "Is this just a chatbot?", a: "No. Embedded AI agents are task-specific and connected to your tools via MCP — an SEO/AEO agent, a support agent, a merchandising agent, an inventory & demand agent — doing real work with human-in-the-loop oversight and evaluation gates." },
    { q: "Our store was built with AI/no-code and keeps breaking. Can you help?", a: "Yes — that's AI Cleanup. AI-generated code has ~2.7× more vulnerabilities; we run a security audit, refactor and harden, re-architect for scale, and deploy it production-grade." },
    { q: "How do you keep AI reliable?", a: "Every deployment ships with evaluation gates that measure quality and human-in-the-loop oversight for anything customer-facing. We instrument lift so you can see the impact, not just take it on faith." },
  ],
  cta: {
    title: "Get AI-native and agent-ready — before your competitors.",
    body: "Book a free agent-readiness audit. We'll assess your data, feeds, and AI-channel visibility, and show you the fastest path to more revenue.",
  },
};

export default function AiAgentsHub() {
  return <HubPage config={config} />;
}
