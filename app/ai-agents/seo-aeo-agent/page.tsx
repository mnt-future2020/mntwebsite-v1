import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/seo-aeo-agent", {
    title: "AI SEO & AEO Agent for Commerce | MnT Future",
    description:
      "An AI agent that keeps your catalog visible in Google and cited in AI answers: unique product copy, fresh metadata and structured data, human-reviewed.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/seo-aeo-agent",
  parent: { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "SEO / AEO Agent" },
  ],
  eyebrow: "AI SEO / AEO agent",
  h1: "Visible in Google. Cited in AI answers.",
  heroSub:
    "Search didn't stop at ten blue links: shoppers now ask AI assistants, and the answers cite somebody. This agent keeps your catalog and content working in both worlds: unique product copy, fresh metadata and structured data, and drafts a human reviews before anything publishes.",
  heroImage: images.ai,
  chips: ["Unique product copy", "Metadata & structured data", "AEO: cited in AI answers", "Human review before publish"],
  primaryKeyword: "AI SEO & AEO agent for commerce",
  intro: {
    title: "What is an SEO / AEO agent?",
    body: (
      <>
        An SEO / AEO agent is an AI worker that keeps your store discoverable: in classic search (SEO)
        and in the AI answers shoppers increasingly trust (AEO, answer engine optimization). It keeps
        product and category copy unique and useful, metadata and structured data complete and fresh,
        and content structured so AI assistants can cite you. Everything it writes is a draft until a
        human approves it.
      </>
    ),
  },
  featuresTitle: "The visibility work it keeps doing.",
  features: [
    { icon: "edit", title: "Product copy that stays unique", desc: "Five hundred products described as five hundred products, not one paragraph with the nouns swapped: the thing both Google and AI agents actually parse." },
    { icon: "code", title: "Metadata & structured data", desc: "Titles, descriptions, and schema kept complete and current across the catalog, not just on the pages someone remembered." },
    { icon: "spark", title: "Structured for AI answers", desc: "Content shaped so answer engines can lift it: direct answers, clear structure, facts a model can cite." },
    { icon: "network", title: "Internal linking", desc: "Related products, categories, and guides linked so authority flows and shoppers (and crawlers) keep moving." },
    { icon: "eye", title: "Rank & citation monitoring", desc: "Watches how you show up in search and AI answers, and turns drops and gaps into work items." },
    { icon: "shield", title: "Human review before publish", desc: "Every draft is reviewed and approved by a person before it goes live. No content ships itself." },
  ],
  approachTitle: "Content upkeep at catalog scale.",
  approachSub:
    "Nobody hand-polishes five thousand product pages. The agent does, and a human signs off.",
  approachPoints: [
    "Unique, useful copy across the whole catalog: the foundation search and AI agents both need.",
    "Metadata and structured data maintained continuously, not in a yearly cleanup.",
    "AEO built in: content structured to be cited by AI assistants, not just ranked by Google.",
    "Drafts reviewed by a human before publishing, with quality gates on every change.",
  ],
  related: [
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce" },
    { label: "Merchandising Agent", href: "/ai-agents/merchandising-agent" },
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter" },
  ],
  faq: [
    { q: "Isn't AI-generated content against Google's rules?", a: "No: Google's guidance rewards helpful content however it's produced, and penalizes scaled junk. That's exactly why this agent drafts and a human approves: you get catalog-scale upkeep with editorial standards, not a content farm." },
    { q: "What's AEO, and why should we care?", a: "Answer engine optimization: being the source AI assistants cite when shoppers ask them what to buy. Those answers are replacing a growing share of searches, and the brands cited in them get the shopper. SEO gets you ranked; AEO gets you recommended." },
    { q: "How is this different from Agent-Ready Commerce?", a: "Agent-Ready Commerce makes your store transactable by AI shopping agents: feeds, protocols, real-time data. This agent keeps you visible and cited: the content layer. They compound, and many brands run both." },
    { q: "Will it rewrite our brand voice?", a: "It's trained on your voice and your rules, and nothing publishes without human approval. If a draft doesn't sound like you, it doesn't ship: and the agent learns from the edit." },
    { q: "How do we start?", a: "With a free strategy session: we audit where your catalog is thin, duplicated, or invisible, and scope the agent around the pages where visibility pays fastest." },
  ],
  cta: {
    title: "Be the answer, not just a result.",
    body: "Book a free strategy session: we'll audit your catalog's visibility in search and AI answers, and show you what the agent would fix first.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
