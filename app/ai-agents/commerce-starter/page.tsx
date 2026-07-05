import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/commerce-starter", {
    title: "AI Commerce Starter — Search, Recs & Assistant | MnT",
    description:
      "AI search, personalized recommendations, and a shopping assistant that convert the traffic you already have — measurable lift, live in weeks.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/commerce-starter",
  parent: { label: "AI & Agents", href: "/ai-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "AI Commerce Starter" },
  ],
  eyebrow: "AI commerce starter",
  h1: "Turn the traffic you already have into revenue.",
  heroSub:
    "The fastest ROI in AI commerce. Semantic search, personalized recommendations, and a conversational shopping assistant — dropped into your store to lift conversion and revenue per visit, with evaluation gates that prove the lift.",
  heroImage: images.ai,
  chips: ["Semantic / vector search", "Personalized recs", "Shopping assistant", "Measured lift"],
  primaryKeyword: "AI commerce search, recommendations & assistant",
  intro: {
    title: "What is the AI Commerce Starter?",
    body: (
      <>
        It's a productized way to make your existing store AI-native without a rebuild. We add
        natural-language product search that understands synonyms and typos, a recommendation engine
        that personalizes to "segments of one," and a conversational assistant that helps shoppers find
        and buy — then we measure the conversion and revenue lift so you know it's working. Ideal for
        D2C brands with traffic but weak conversion.
      </>
    ),
  },
  featuresTitle: "What we build",
  features: [
    { icon: "search", title: "Semantic / vector search", desc: "Natural-language search that understands intent, synonyms and typos — shoppers find products even when they don't know your exact wording." },
    { icon: "spark", title: "Personalized recommendations", desc: "A recommendation engine that personalizes to \"segments of one\" — the right products for each shopper, on every page." },
    { icon: "chat", title: "Conversational shopping assistant", desc: "An AI assistant that answers questions, narrows choices, and guides shoppers to checkout — like your best salesperson, 24/7." },
    { icon: "gauge", title: "Analytics & evaluation gates", desc: "We instrument conversion and revenue, and gate every AI change behind evaluations — so you see real lift, not vibes." },
    { icon: "layers", title: "Clean storefront integration", desc: "Drops into your existing storefront — headless or templated — without a re-platform or a disruptive migration." },
    { icon: "records", title: "Merchandising signals", desc: "Search and recommendation data feeds your merchandising decisions, surfacing what to promote and what's being missed." },
  ],
  approachTitle: "AI that pays for itself — measured.",
  approachSub:
    "We don't add AI for a press release. We add it where it lifts revenue, and we prove the lift with evaluation gates.",
  approachPoints: [
    "Smart search converts roughly 4× better than keyword search — a direct revenue lever.",
    "AI personalization lifts revenue by around 40% by matching products to each shopper.",
    "Typical clients see a 19–27% conversion lift within 90 days, live in 8–12 weeks.",
    "Every change is gated behind evaluations and instrumented — measured impact, not hype.",
  ],
  related: [
    { label: "Agent-Ready Commerce", href: "/ai-agents/agent-ready-commerce" },
    { label: "Embedded AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Headless & Marketplace Builds", href: "/commerce/headless-marketplace" },
    { label: "Integrations & Orchestration", href: "/commerce/integrations" },
  ],
  faq: [
    { q: "How fast will we see results?", a: "Most clients are live in 8–12 weeks and see a 19–27% conversion lift within 90 days. Because it works on your existing traffic, the ROI shows up quickly." },
    { q: "Do we need to re-platform first?", a: "No. The Starter is designed to drop into your current store — headless or templated. If a rebuild makes sense later, that's a separate Commerce Platforms conversation." },
    { q: "How do you prove the AI is actually helping?", a: "We instrument conversion and revenue and put evaluation gates around every AI change. You get a clear before/after on lift — we treat it as a measurable engineering outcome." },
    { q: "Which AI models do you use?", a: "We use the best model for each job and keep it swappable — you're never locked to one provider. Search, recommendations, and the assistant each use what performs best and safest for your data." },
    { q: "Is this the same as being agent-ready?", a: "No — this converts human shoppers on your store. Agent-Ready Commerce makes your store sellable to AI shopping agents. Many brands start here, then add agent-readiness." },
  ],
  cta: {
    title: "Convert more of the traffic you're already paying for.",
    body: "Book a free workshop and we'll show you where AI search, recommendations, and an assistant would lift your conversion — with a plan to measure it.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
