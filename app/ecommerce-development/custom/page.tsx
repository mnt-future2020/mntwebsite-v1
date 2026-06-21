import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Custom E-Commerce Development",
  description:
    "Bespoke e-commerce platforms for brands that have outgrown templates — custom checkout, integrations and performance built to convert and scale.",
  alternates: { canonical: "/ecommerce-development/custom" },
};

const config: ServiceConfig = {
  slug: "/ecommerce-development/custom",
  parent: { label: "E-Commerce", href: "/ecommerce-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "E-Commerce", href: "/ecommerce-development" },
    { label: "Custom E-Commerce" },
  ],
  eyebrow: "E-Commerce · Custom",
  h1: "Custom e-commerce for brands templates can't contain.",
  heroSub:
    "When you've outgrown an off-the-shelf store, we build custom e-commerce development around your catalogue, checkout and integrations — engineered for conversion, Core Web Vitals and scale.",
  heroImage: images.ecommerce,
  chips: ["Custom checkout", "Headless-ready", "Core Web Vitals", "Scales with you"],
  primaryKeyword: "custom ecommerce development",
  intro: {
    title: "What is custom e-commerce development?",
    body: "Custom e-commerce development is building a bespoke commerce platform around your specific catalogue, checkout logic, integrations and performance needs — instead of bending your brand to a template's limits. MnT builds it for brands that have outgrown Shopify defaults and need control of conversion, speed and scale.",
  },
  featuresTitle: "Built around your business, not a theme",
  features: [
    { icon: "code", title: "Custom checkout & catalogue", desc: "Bespoke checkout logic, complex catalogues, bundles and pricing that templates can't handle." },
    { icon: "gauge", title: "Performance-engineered", desc: "Core Web Vitals treated as a feature — fast pages that lift conversion and rankings." },
    { icon: "network", title: "Deep integrations", desc: "ERP, OMS, CRM, payments, logistics and marketing tools wired into one clean platform." },
    { icon: "layers", title: "Headless-ready", desc: "Composable, API-first architecture when you need full control of the storefront." },
    { icon: "tag", title: "Conversion-first UX", desc: "Search, merchandising and checkout designed to lift revenue per visit." },
    { icon: "shield", title: "Secure & PCI-aware", desc: "Tokenised, gateway-handled payments so sensitive card data stays out of scope." },
  ],
  approachTitle: "Performance and conversion, by design",
  approachSub:
    "A custom store only pays off if it loads fast and converts. We engineer for both from the start.",
  approachPoints: [
    "Core Web Vitals budgeted and protected in every release.",
    "Conversion-first checkout, search and merchandising — built to lift revenue.",
    "India-ready payments (UPI), subscriptions and logistics integrations.",
    "Architecture that scales through peak traffic without a re-platform.",
  ],
  related: [
    { label: "D2C brand platforms", href: "/ecommerce-development/d2c" },
    { label: "Shopify & headless", href: "/ecommerce-development/shopify" },
    { label: "Marketplace development", href: "/ecommerce-development/marketplace" },
    { label: "E-commerce apps", href: "/ecommerce-development/mobile-app" },
  ],
  faq: [
    { q: "When should I choose custom over Shopify?", a: "Go custom when you've outgrown the platform — complex catalogues, unique checkout logic, deep integrations or marketplace mechanics. If you want speed to market with standard flows, Shopify (or headless Shopify) is often the better call, and we build both." },
    { q: "How much does custom e-commerce development cost?", a: "A bespoke build typically starts in the mid five figures (USD) globally and ₹15L+ in India, scaling with catalogue complexity and integrations. Book a call for a tailored range." },
    { q: "Will it be fast?", a: "Yes — we treat Core Web Vitals (LCP, INP, CLS) as a feature and budget them in every release, because commerce performance is measured in revenue." },
    { q: "Can you integrate our ERP and logistics?", a: "Yes. We integrate ERP, OMS, CRM, payment gateways and logistics providers so the storefront is one part of a connected operation." },
  ],
  cta: {
    title: "Outgrown your template? Let's build the real thing.",
    body: "Talk to a senior commerce engineer about a custom platform — built for your catalogue, your integrations and your growth.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
