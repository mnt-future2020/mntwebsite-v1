import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/commerce-starter", {
    title: "AI Search & Recommendations for Commerce — AI Shopping Assistant | MnT Future",
    description:
      "AI search, personalized recommendations and a shopping assistant — already built, fitted to your catalog and instrumented for lift. Live in two weeks.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/commerce-starter",
  parent: { label: "AI & Agents", href: "/ai-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "AI Search & Recommendations" },
  ],
  eyebrow: "AI commerce starter",
  h1: "Turn the traffic you already have into revenue.",
  heroSub:
    "The fastest ROI in AI commerce. Semantic search, personalized recommendations, and a conversational shopping assistant — already built, fitted to your catalog in two weeks, with evaluation gates that prove the lift.",
  heroImage: images.ai,
  chips: ["Semantic / vector search", "Personalized recs", "Shopping assistant", "Live in two weeks"],
  primaryKeyword: "AI commerce search, recommendations & assistant",
  intro: {
    title: "What is AI Search & Recommendations?",
    body: (
      <>
        It's the AI half of a commerce build, sold as its own two-week phase. Natural-language product
        search that understands synonyms and typos, a recommendation engine that personalizes to
        "segments of one," and a conversational assistant that helps shoppers find and buy — all of it
        already built as product, so the two weeks goes on fitting it to your catalog and instrumenting
        the lift, not on writing it. Most brands then carry straight on into their storefront; the AI is
        already working by the time it lands.
      </>
    ),
  },
  featuresTitle: "What we build",
  features: [
    { icon: "search", title: "Semantic / vector search", desc: "Natural-language search that understands intent, synonyms and typos — shoppers find products even when they don't know your exact wording." },
    { icon: "spark", title: "Personalized recommendations", desc: "A recommendation engine that personalizes to \"segments of one\" — the right products for each shopper, on every page." },
    { icon: "chat", title: "Conversational shopping assistant", desc: "An AI assistant that answers questions, narrows choices, and guides shoppers to checkout — like your best salesperson, 24/7." },
    { icon: "gauge", title: "Analytics & evaluation gates", desc: "We instrument conversion and revenue, and gate every AI change behind evaluations — so you see real lift, not vibes." },
    { icon: "layers", title: "Built on a platform that exists", desc: "The engine, the AI layer and the admin are already built and running — which is why this is two weeks of fitting rather than months of building." },
    { icon: "records", title: "Merchandising signals", desc: "Search and recommendation data feeds your merchandising decisions, surfacing what to promote and what's being missed." },
  ],
  approachTitle: "AI that pays for itself — measured.",
  approachSub:
    "We don't add AI for a press release. We add it where it lifts revenue, and we prove the lift with evaluation gates.",
  approachPoints: [
    "Smart search converts roughly 4× better than keyword search — a direct revenue lever.",
    "AI personalization lifts revenue by around 40% by matching products to each shopper.",
    "Live in two weeks — the search, recommendation and assistant layers already exist; we fit them to your catalog rather than build them.",
    "Every change is gated behind evaluations and instrumented — measured impact, not hype.",
  ],
  related: [
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce" },
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
  ],
  faq: [
    { q: "How fast will we see results?", a: "Live in two weeks from a signed scope and access to your catalog. It's quick because we're not building the AI — search, recommendations and the assistant already exist as a product; the two weeks goes on fitting them to your catalog and instrumenting the lift. Because it works on the traffic you already have, the ROI shows up soon after. The clock runs on both sides, though: we need the scope signed and catalog access at kickoff, and change requests get their own scope and timeline." },
    { q: "Does this run on our current store?", a: "It runs on our platform, not on top of your existing one — we'd rather say that plainly than sell you a drop-in that isn't. In practice the Starter is the first two weeks of a build: your AI layer goes up on our engine with your catalog in it, and if it earns its place your storefront follows in the fortnight after. If you want to test AI on the store you already have without moving anything, start with a free agent-readiness audit instead — that one genuinely works on any store." },
    { q: "How do you prove the AI is actually helping?", a: "We instrument conversion and revenue and put evaluation gates around every AI change. You get a clear before/after on lift — we treat it as a measurable engineering outcome." },
    { q: "Which AI models do you use?", a: "We use the best model for each job and keep it swappable — you're never locked to one provider. Search, recommendations, and the assistant each use what performs best and safest for your data." },
    { q: "Is this the same as being agent-ready?", a: "No — this converts human shoppers on your store. Agent-Ready Commerce makes your store sellable to AI shopping agents. Many brands start here, then add agent-readiness." },
  ],
  cta: {
    title: "Convert more of the traffic you're already paying for.",
    body: "Book a free strategy session and we'll show you where AI search, recommendations, and an assistant would lift your conversion — with a plan to measure it.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
