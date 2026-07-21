import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/d2c-brand-stores", {
    title: "D2C & Brand Store Development | MnT Future",
    description:
      "Custom D2C brand stores for fashion, beauty, food and CPG: fast, conversion-focused storefronts you fully own, with AI search and agent-ready feeds built in.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/d2c-brand-stores",
  parent: { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "D2C / Brand Stores" },
  ],
  eyebrow: "D2C / brand stores",
  h1: "A brand store that's fully yours.",
  heroSub:
    "Your own brand, selling direct to your own customers, on a storefront built for exactly that. Fast on every device, designed around your products, and owned by you outright: no rented template deciding what your brand can do.",
  heroImage: images.commerce,
  chips: ["Built for your brand", "Fast on every device", "AI search built in", "You own the code"],
  primaryKeyword: "D2C & brand store development",
  intro: {
    title: "What is a D2C / brand store?",
    body: (
      <>
        A D2C (direct to consumer) store is a single-seller storefront where your brand sells straight
        to your customers: no marketplace in the middle, no other sellers on the page. We build custom
        D2C stores for fashion, beauty, food, and everyday products: designed around your catalog and
        your story, engineered to load fast, convert well, and grow without a rebuild.
      </>
    ),
  },
  featuresTitle: "What a brand store gets from us.",
  features: [
    { icon: "store", title: "Storefront design & build", desc: "A storefront designed around your products and your story, not a theme thousands of other brands use." },
    { icon: "bolt", title: "Speed that converts", desc: "Fast pages on every device, protected in every release: shoppers stay, Google ranks you, revenue follows." },
    { icon: "search", title: "AI search & recommendations", desc: "Search that understands what shoppers mean and recommendations that personalize to each visitor, built in from day one." },
    { icon: "cart", title: "Checkout built to convert", desc: "A checkout tuned for fewer steps and fewer drop-offs, with the payment methods your customers expect." },
    { icon: "network", title: "Agent-ready from launch", desc: "Structured product feeds and real-time price and stock data, so AI shopping agents can find and buy your products too." },
    { icon: "layers", title: "Room to grow", desc: "Subscriptions, B2B, or a mobile app later: the store is built so the next channel is an addition, not a rebuild." },
  ],
  approachTitle: "Your brand, your customers, your code.",
  approachSub: "A template store rents you a look. We build you an asset.",
  approachPoints: [
    "Designed around your products and brand, not adapted from a theme.",
    "Fast pages protected release after release, measured against Google's speed standards.",
    "AI search, recommendations, and a shopping assistant included in the platform, not bolted on.",
    "Safe migration off Shopify or any template platform: catalog, customers, and SEO carried over.",
    "Full code ownership and handover: no lock-in, no black boxes.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Subscription Commerce", href: "/commerce/subscription-commerce" },
    { label: "Mobile Commerce Apps", href: "/commerce/mobile-commerce-apps" },
    { label: "AI Search & Recommendations", href: "/ai-agents/commerce-starter" },
  ],
  faq: [
    { q: "How long does a D2C store build take?", a: "About four weeks from a signed scope and your catalog in hand. The commerce engine, the AI layer and the admin already exist, so the four weeks goes on your storefront rather than the platform underneath it. We work in two-week sprints, and you see working software every cycle." },
    { q: "We're on Shopify or a template now. Can you move us without losing sales?", a: "Yes. We preserve your URL structure, redirects, and metadata, and cut over in a staged, low-risk way so rankings and revenue hold. Your catalog, customers, and order history move with you." },
    { q: "Do we own the store?", a: "Completely. Code, design, and data are yours, with a clean handover and documentation. No proprietary lock-in." },
    { q: "Is the AI really included, or is it an add-on?", a: "Included. Search that understands intent, personalized recommendations, and a shopping assistant are part of the platform we build on, and most builds switch them on in the first two weeks." },
    { q: "What does it cost?", a: "Every build is scoped in a free strategy session: you'll get a recommendation brief with the architecture and a realistic budget for your stage, whether or not you hire us." },
  ],
  cta: {
    title: "Ready for a store that's actually yours?",
    body: "Book a free strategy session: we'll sketch the storefront, the data model, and the plan to move off your template safely.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
