import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shopify Development Agency | Custom & Headless",
  description:
    "Expert Shopify & headless Shopify development — custom themes, apps and migrations that convert. For D2C brands serious about growth.",
  alternates: { canonical: "/ecommerce-development/shopify" },
};

const config: ServiceConfig = {
  slug: "/ecommerce-development/shopify",
  parent: { label: "E-Commerce", href: "/ecommerce-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "E-Commerce", href: "/ecommerce-development" },
    { label: "Shopify & Headless" },
  ],
  eyebrow: "E-Commerce · Shopify",
  h1: "Shopify builds that go beyond the theme store.",
  heroSub:
    "As a Shopify development agency, we build custom themes, apps and migrations that convert — and headless Shopify when you need full control of the front end. For D2C brands serious about growth.",
  heroImage: images.mobileShopping,
  chips: ["Custom themes", "Headless Shopify", "Apps & migrations", "Conversion-first"],
  primaryKeyword: "shopify development agency",
  intro: {
    title: "What does a Shopify development agency do?",
    body: "A Shopify development agency builds and customises stores on Shopify — custom themes, private apps, integrations, migrations and, when needed, headless storefronts on Shopify's APIs. MnT does the work that goes beyond the theme store: bespoke functionality and performance for brands that want Shopify's speed without its limits.",
  },
  featuresTitle: "Shopify, done properly",
  features: [
    { icon: "bolt", title: "Custom themes", desc: "Bespoke, fast, on-brand themes — not a marketplace template with your logo dropped in." },
    { icon: "layers", title: "Headless Shopify", desc: "Decoupled storefronts on Shopify's APIs for full control of speed and experience." },
    { icon: "code", title: "Custom apps & functions", desc: "Private apps, checkout extensions and Shopify Functions for logic the platform doesn't ship." },
    { icon: "network", title: "Migrations", desc: "Move to Shopify (or to headless) without losing SEO, data or revenue." },
    { icon: "gauge", title: "Performance & CWV", desc: "Speed and Core Web Vitals tuned so the store converts and ranks." },
    { icon: "tag", title: "Conversion optimisation", desc: "Checkout, merchandising and UX improvements that lift revenue per visit." },
  ],
  approachTitle: "Beyond the theme store",
  approachSub:
    "Anyone can install a theme. We build the custom Shopify work that actually moves conversion.",
  approachPoints: [
    "Custom themes and headless storefronts engineered for speed and brand.",
    "Private apps, checkout extensions and Shopify Functions for bespoke logic.",
    "Migrations that protect SEO, data and revenue.",
    "Performance and conversion tuning backed by Core Web Vitals.",
  ],
  related: [
    { label: "Custom e-commerce", href: "/ecommerce-development/custom" },
    { label: "D2C brand platforms", href: "/ecommerce-development/d2c" },
    { label: "E-commerce apps", href: "/ecommerce-development/mobile-app" },
    { label: "B2B e-commerce", href: "/ecommerce-development/b2b" },
  ],
  faq: [
    { q: "Do you build custom Shopify themes or use templates?", a: "We build custom, on-brand themes engineered for speed and conversion — and we can extend or rebuild an existing theme if that's the faster path for your stage." },
    { q: "What is headless Shopify and do I need it?", a: "Headless Shopify decouples the storefront from Shopify's theme layer, using its APIs for full control of speed and experience. It's worth it when performance and bespoke UX matter; we'll advise honestly whether you need it." },
    { q: "Can you migrate us to Shopify without losing SEO?", a: "Yes — we plan redirects, preserve URL structure and metadata, and migrate data carefully so rankings and revenue are protected through the move." },
    { q: "Do you build custom Shopify apps?", a: "Yes — private apps, checkout extensions and Shopify Functions for logic and integrations the platform doesn't offer out of the box." },
  ],
  cta: {
    title: "Want Shopify that actually converts? Let's talk.",
    body: "Talk to a senior Shopify engineer about a custom theme, headless build, app or migration — tuned for speed and revenue.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
