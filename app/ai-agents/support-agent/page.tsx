import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/support-agent", {
    title: "AI Customer Support Agent for Commerce | MnT Future",
    description:
      "An AI support agent that resolves order status, returns and product questions end to end: 70 to 90% of tickets handled, the rest escalated with full context.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/support-agent",
  parent: { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Support Agent" },
  ],
  eyebrow: "AI support agent",
  h1: "Support that answers in seconds, not queues.",
  heroSub:
    "An AI agent that resolves the tickets that eat your team's day: order status, returns, product questions. It answers in your brand voice from your real order data, resolves 70 to 90% on its own, and hands the hard ones to your team with full context.",
  heroImage: images.ai,
  chips: ["Order status & returns", "Your real order data", "Escalation with context", "24/7 in your brand voice"],
  primaryKeyword: "AI customer support agent for commerce",
  intro: {
    title: "What is an AI support agent?",
    body: (
      <>
        An AI support agent is a support teammate built into your store: it reads the customer's
        question, looks up the real order, and resolves the ticket end to end: where is my order,
        start a return, will this fit. Unlike a chatbot reading scripts, it acts on live data through
        your actual tools, and anything uncertain goes to a person with the full story attached.
      </>
    ),
  },
  featuresTitle: "The tickets it takes off your plate.",
  features: [
    { icon: "chat", title: "Order status, end to end", desc: "Where is my order answered from live order and shipping data, not a canned reply." },
    { icon: "records", title: "Returns & exchanges", desc: "Starts and tracks returns inside your rules: eligibility, windows, and refunds handled correctly." },
    { icon: "search", title: "Product questions", desc: "Sizing, materials, compatibility: answered from your catalog, so pre-sale questions become sales." },
    { icon: "users", title: "Escalation with context", desc: "The hard tickets reach your team with the customer, the order, and the conversation already attached." },
    { icon: "shield", title: "Guardrails & approvals", desc: "Refunds and sensitive actions follow your rules, with a human approving where you want one." },
    { icon: "gauge", title: "Measured, not assumed", desc: "Resolution rate, response time, and customer satisfaction tracked from day one." },
  ],
  approachTitle: "Your best rep, cloned at the boring parts.",
  approachSub:
    "The repetitive 80% gets resolved instantly. Your team keeps the judgment calls.",
  approachPoints: [
    "70 to 90% of tickets resolved without a person, with replies in seconds instead of minutes.",
    "Trained on your policies, your catalog, and your tone: it sounds like your brand, not a bot.",
    "Connected to your real order, shipping, and help desk data, so answers are facts.",
    "A human approves sensitive actions, and quality gates test every change before it ships.",
  ],
  related: [
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Merchandising Agent", href: "/ai-agents/merchandising-agent" },
    { label: "Inventory & Demand Agent", href: "/ai-agents/inventory-demand-agent" },
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter" },
  ],
  faq: [
    { q: "Will it make things up to customers?", a: "It answers from your order data, catalog, and policies, not from imagination, and anything it isn't sure about goes to your team instead of being guessed at. Quality gates test its answers before changes ship, and a human approves sensitive actions like refunds." },
    { q: "Which tickets should it handle first?", a: "The high-volume, low-judgment ones: order status, returns and exchanges, and product questions. That's usually most of the queue, and it's where the time savings show up immediately." },
    { q: "Does it work with our help desk?", a: "Yes: it connects to your support desk and commerce platform so tickets, orders, and customer history stay in one flow. Escalations land in your existing queue with context attached." },
    { q: "How do you price it?", a: "Usually outcome or hybrid pricing: a build fee plus a monthly run, and often a per-outcome component. You're paying for resolved tickets, which keeps our incentives aligned with yours." },
    { q: "How do we start?", a: "With a free strategy session: we look at your ticket volume and types, pick the highest-value slice, and scope the agent and its guardrails around exactly that." },
  ],
  cta: {
    title: "Give your support team their day back.",
    body: "Book a free strategy session: we'll pick your highest-volume tickets and show you how the agent would resolve them.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
