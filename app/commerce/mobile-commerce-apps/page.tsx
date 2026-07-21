import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/mobile-commerce-apps", {
    title: "Mobile Commerce App Development | MnT Future",
    description:
      "Native iOS and Android shopping apps built with React Native or Flutter: push notifications, instant loading, and one backend shared with your store.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/mobile-commerce-apps",
  parent: { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Mobile Commerce Apps" },
  ],
  eyebrow: "Mobile commerce apps",
  h1: "Your store, on their home screen.",
  heroSub:
    "A shopping app for any of the models we build: D2C, marketplace, subscription, or quick commerce. Built with React Native or Flutter, sharing one backend with your web store, and designed to load instantly and convert on every device.",
  heroImage: images.dev,
  chips: ["iOS & Android", "React Native / Flutter", "Push notifications", "One shared backend"],
  primaryKeyword: "Mobile commerce app development",
  intro: {
    title: "What is a mobile commerce app?",
    body: (
      <>
        A mobile commerce app puts your store on the customer's home screen: faster than the mobile
        web, signed in by default, and able to reach customers with push notifications instead of paid
        ads. We build native iOS and Android apps with React Native or Flutter, sharing one backend
        with your web store so catalog, pricing, and orders stay in sync automatically.
      </>
    ),
  },
  featuresTitle: "An app built to be kept.",
  features: [
    { icon: "phone", title: "Native iOS & Android", desc: "One codebase, two real apps: React Native or Flutter, built to feel native on both platforms." },
    { icon: "bolt", title: "Instant loading", desc: "App-grade speed: browsing, search, and checkout designed to feel immediate." },
    { icon: "bell", title: "Push notifications", desc: "Reach customers directly: order updates, restocks, and offers, without paying for the click." },
    { icon: "layers", title: "One backend with your store", desc: "Catalog, pricing, stock, and orders shared with your web store: no second system to keep in sync." },
    { icon: "lock", title: "Sign-in & wallets", desc: "Biometric sign-in and Apple Pay / Google Pay: fewer steps between wanting and buying." },
    { icon: "gauge", title: "App store launch & analytics", desc: "Store listings, the release pipeline, and analytics wired in: launched properly, measured properly." },
  ],
  approachTitle: "An app that earns its place.",
  approachSub:
    "An app is a commitment. It has to be faster, easier, and more direct than your mobile site, or nobody keeps it.",
  approachPoints: [
    "Built with React Native or Flutter: one codebase, native feel, faster to ship and maintain.",
    "One backend shared with the web store: no drift between the app and the site.",
    "Push notifications as an owned channel: order updates and offers without ad spend.",
    "Designed for conversion: the checkout is the product.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "D2C / Brand Stores", href: "/commerce/d2c-brand-stores" },
    { label: "Quick Commerce / Hyperlocal", href: "/commerce/quick-commerce" },
    { label: "Subscription Commerce", href: "/commerce/subscription-commerce" },
  ],
  faq: [
    { q: "Do we actually need an app?", a: "Not always, and we'll say so. Apps earn their place when customers come back often: subscriptions, quick commerce, memberships. For occasional purchases, a fast mobile web store usually wins. We'll tell you honestly in your strategy session." },
    { q: "React Native or Flutter: which do you use?", a: "Whichever fits your product and team: both give one codebase with a native feel. We'll recommend one in your strategy session and explain exactly why." },
    { q: "Does the app stay in sync with the website?", a: "Automatically. The app and the web store share one backend, so catalog, pricing, stock, and orders are the same everywhere by design." },
    { q: "Can you add an app to the store you built us?", a: "Yes, that's the designed path: the platform's APIs already serve the web store, so the app is an addition, not a rebuild." },
    { q: "Who handles the app stores?", a: "We do: listings, review requirements, and the release pipeline for updates. The accounts and ownership are yours; we run the process." },
  ],
  cta: {
    title: "Put your store on their home screen.",
    body: "Book a free strategy session: we'll tell you honestly if an app earns its place, and what it takes to ship it.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
