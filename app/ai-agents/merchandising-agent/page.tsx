import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/ai-agents/merchandising-agent", {
    title: "AI Merchandising Agent for Commerce | MnT Future",
    description:
      "An AI agent that tunes collections, promotions and product placement from live shopper signals, and proposes every change for your approval.",
  });
}

const config: ServiceConfig = {
  slug: "/ai-agents/merchandising-agent",
  parent: { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "AI & Agents", href: "/ai-agents" },
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Merchandising Agent" },
  ],
  eyebrow: "AI merchandising agent",
  h1: "Merchandising that tunes itself daily.",
  heroSub:
    "Collections, promotions, and product placement adjusted continuously from live signals: what shoppers search, click, buy, and miss. You set the strategy; the agent does the daily tuning and proposes every change for approval.",
  heroImage: images.ai,
  chips: ["Live shopper signals", "Collections & promotions", "Proposals, not surprises", "Measured lift"],
  primaryKeyword: "AI merchandising agent for commerce",
  intro: {
    title: "What is an AI merchandising agent?",
    body: (
      <>
        An AI merchandising agent watches how shoppers actually behave in your store: what they search,
        what they click, what they buy, and what they look for but don't find, and turns that into
        merchandising work: refreshed collections, tuned promotions, better product placement. It
        proposes each change for a human to approve, so your store never changes behind your back.
      </>
    ),
  },
  featuresTitle: "The daily tuning it takes over.",
  features: [
    { icon: "grid", title: "Collections that stay fresh", desc: "Collections reordered and refreshed from live demand, not from whenever someone last had time." },
    { icon: "tag", title: "Promotion tuning", desc: "Which offers run where, and whether they're actually lifting revenue: watched and adjusted continuously." },
    { icon: "eye", title: "Placement by signal", desc: "Products moved up when shoppers vote with clicks and carts, and down when they stop." },
    { icon: "search", title: "What shoppers miss", desc: "The searches that return nothing are demand you're not stocking or not surfacing: the agent surfaces them to you." },
    { icon: "shield", title: "Proposals, not surprises", desc: "Every change arrives as a proposal a human approves. Your store never changes without sign-off." },
    { icon: "gauge", title: "Measured lift", desc: "Each approved change is tracked against conversion and revenue, so you know what worked." },
  ],
  approachTitle: "Strategy stays human. Tuning goes 24/7.",
  approachSub:
    "A merchandiser's judgment, applied at a frequency no human has time for.",
  approachPoints: [
    "Runs on live signals: searches, clicks, carts, and the gaps between them.",
    "Every change proposed for approval: nothing ships without a human saying so.",
    "We run this pattern on our own platform: the ops agent on MnT Commerce proposes changes as real workflow code it cannot execute until a human approves.",
    "Lift measured per change, so the agent earns trust with numbers, not promises.",
  ],
  related: [
    { label: "Custom AI Agents", href: "/ai-agents/embedded-agents" },
    { label: "Inventory & Demand Agent", href: "/ai-agents/inventory-demand-agent" },
    { label: "SEO / AEO Agent", href: "/ai-agents/seo-aeo-agent" },
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter" },
  ],
  faq: [
    { q: "How do we know it won't wreck the store?", a: "Because it can't act alone: every change is a proposal a human approves before it ships. It's the same pattern we run on our own platform, where the ops agent on MnT Commerce writes the change as real workflow code and zero changes reach the store before someone clicks Approve." },
    { q: "What signals does it use?", a: "Your store's own behavior data: searches, clicks, add-to-carts, purchases, and the searches that return nothing. It works from what your shoppers are already telling you." },
    { q: "Does it replace our merchandiser?", a: "No, it staffs them. Strategy, brand, and taste stay human; the agent does the daily reordering, watching, and flagging that nobody has time to do continuously." },
    { q: "How do you price it?", a: "Usually outcome or hybrid pricing: a build fee plus a monthly run, and often a per-outcome component tied to the lift it produces." },
    { q: "How do we start?", a: "With a free strategy session: we look at your catalog, your current merchandising rhythm, and where the signal is strongest, and scope the agent around the highest-value slice first." },
  ],
  cta: {
    title: "Merchandise at machine frequency, with human taste.",
    body: "Book a free strategy session: we'll show you what your shopper signals already know, and how the agent would act on them.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
