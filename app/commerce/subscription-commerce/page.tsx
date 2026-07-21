import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/subscription-commerce", {
    title: "Subscription Commerce Development | MnT Future",
    description:
      "Boxes, meal kits, refills and memberships: subscription stores with auto-billing, pause and skip, and failed-payment recovery, built to keep subscribers.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/subscription-commerce",
  parent: { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Subscription Commerce" },
  ],
  eyebrow: "Subscription commerce",
  h1: "A store built for orders that repeat.",
  heroSub:
    "Boxes, meal kits, refills, memberships: subscription commerce lives or dies on billing that works and subscribers who stay. We build the auto-billing, pause and skip, and recovery mechanics that keep recurring revenue actually recurring.",
  heroImage: images.commerce,
  chips: ["Auto-billing & renewals", "Pause, skip & swap", "Failed-payment recovery", "Member pricing"],
  primaryKeyword: "Subscription commerce development",
  intro: {
    title: "What is subscription commerce?",
    body: (
      <>
        Subscription commerce is a store where customers order once and receive repeatedly: a monthly
        box, a meal kit, a refill, or a membership with perks. The build is different from a normal
        store: billing runs on a schedule, cards fail and need recovery, and customers need to pause,
        skip, and swap without calling support. We build all of that in from the start.
      </>
    ),
  },
  featuresTitle: "The mechanics that keep subscribers.",
  features: [
    { icon: "clock", title: "Auto-billing & renewals", desc: "Scheduled billing that just works: renewals, plan changes, and receipts handled without manual ops." },
    { icon: "edit", title: "Pause, skip & swap", desc: "Subscribers manage their own plan: pause a month, skip a box, swap a product. Control keeps them from cancelling." },
    { icon: "wallet", title: "Failed-payment recovery", desc: "Cards expire and payments fail. Automatic retries and recovery flows win back revenue that would silently leak." },
    { icon: "users", title: "Memberships & perks", desc: "Member pricing, early access, and perks that make staying subscribed obviously worth it." },
    { icon: "records", title: "Subscription analytics", desc: "Know your churn, your subscriber lifetime, and which products keep people: the numbers that run the business." },
    { icon: "layers", title: "Works with one-time orders", desc: "Subscriptions and normal orders in one store: one cart, one checkout, one customer account." },
  ],
  approachTitle: "Retention is the product.",
  approachSub: "Acquiring a subscriber is expensive. The build's job is keeping them.",
  approachPoints: [
    "Billing edge cases (renewals, plan changes, failed cards) engineered up front, not discovered in production.",
    "Self-serve pause and skip: subscribers who feel in control cancel less.",
    "Recovery flows for failed payments, so revenue doesn't leak silently.",
    "Clean analytics on churn and subscriber lifetime from day one.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "D2C / Brand Stores", href: "/commerce/d2c-brand-stores" },
    { label: "Mobile Commerce Apps", href: "/commerce/mobile-commerce-apps" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
  ],
  faq: [
    { q: "Can you add subscriptions to our existing store?", a: "If it's a store we built, yes, natively. If you're elsewhere, we'll look at your setup in a strategy session and tell you honestly whether to extend what you have or build properly: bolted-on subscriptions are a common source of billing pain." },
    { q: "How do you reduce churn?", a: "By design, not by begging: self-serve pause and skip so cancelling isn't the only way out, perks that make membership worth keeping, and recovery flows for failed payments. We build the mechanics and give you the numbers to watch." },
    { q: "What happens when a card fails?", a: "Automatic retries on a sensible schedule plus recovery emails, so a failed card becomes a recovered subscriber more often than a lost one." },
    { q: "Do you support boxes with changing contents?", a: "Yes: fixed products, rotating boxes, or subscriber-chosen contents each cycle are all models we build." },
    { q: "How long does a subscription store take?", a: "Around the four-week base of a custom store build, with the subscription mechanics scoped on top depending on your model. You'll get a realistic timeline in your free strategy session." },
  ],
  cta: {
    title: "Ready to build recurring revenue?",
    body: "Book a free strategy session: we'll design your billing, retention, and box mechanics around your product.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
