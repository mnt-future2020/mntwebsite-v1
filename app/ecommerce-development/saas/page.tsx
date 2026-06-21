import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "E-Commerce SaaS Development for Startups",
  description:
    "Vertical SaaS for funded commerce startups — multi-tenant, with subscriptions, merchant dashboards and analytics. Engineered MVP to Series A.",
  alternates: { canonical: "/ecommerce-development/saas" },
};

const config: ServiceConfig = {
  slug: "/ecommerce-development/saas",
  parent: { label: "E-Commerce", href: "/ecommerce-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "E-Commerce", href: "/ecommerce-development" },
    { label: "Commerce SaaS for Startups" },
  ],
  eyebrow: "E-Commerce · Vertical SaaS",
  h1: "Commerce SaaS, built for funded startups.",
  heroSub:
    "For funded commerce founders, we build the vertical SaaS product itself — multi-tenant, with subscriptions, merchant dashboards and analytics. The platform you sell to brands and sellers, engineered from MVP to Series A.",
  heroImage: images.dev,
  chips: ["Multi-tenant", "Subscriptions", "Merchant dashboards", "MVP to Series A"],
  primaryKeyword: "ecommerce saas development",
  intro: {
    title: "What is e-commerce SaaS development?",
    body: "E-commerce SaaS development is building a multi-tenant, subscription software product for the commerce industry — the platform a startup sells to brands, sellers or retailers. MnT builds vertical commerce SaaS for funded founders: the merchant dashboards, billing, analytics and integrations a real SaaS business needs, engineered to scale from MVP to Series A.",
  },
  featuresTitle: "Everything a commerce SaaS product needs",
  features: [
    { icon: "layers", title: "Multi-tenant architecture", desc: "Secure data isolation per merchant, with the scalability a growing SaaS demands." },
    { icon: "gauge", title: "Subscriptions & billing", desc: "Plans, metering, usage-based billing and self-serve onboarding built in." },
    { icon: "store", title: "Merchant dashboards", desc: "The admin, analytics and tooling your customers log in to every day." },
    { icon: "network", title: "Commerce integrations", desc: "Connect to Shopify, marketplaces, payments, logistics and ad platforms via APIs." },
    { icon: "users", title: "Roles & multi-store", desc: "Team roles, permissions and multi-store support your merchants expect." },
    { icon: "rocket", title: "MVP to Series A", desc: "Ship a focused MVP fast, then harden and scale into a platform ready to raise on." },
  ],
  approachTitle: "A product partner for commerce founders",
  approachSub:
    "We build the SaaS you sell — not just a contractor deliverable — with founder-grade ownership.",
  approachPoints: [
    "Multi-tenant SaaS architecture with per-merchant isolation and scale built in.",
    "Subscriptions, billing and onboarding — the commercial engine of a SaaS business.",
    "API integrations to Shopify, marketplaces, payments and logistics.",
    "Co-founding engagement available for founders who want a true technical partner.",
  ],
  related: [
    { label: "Custom e-commerce", href: "/ecommerce-development/custom" },
    { label: "D2C brand platforms", href: "/ecommerce-development/d2c" },
    { label: "Marketplace development", href: "/ecommerce-development/marketplace" },
    { label: "E-commerce apps", href: "/ecommerce-development/mobile-app" },
  ],
  faq: [
    { q: "Do you build the SaaS product itself, not just a store?", a: "Yes. We build the actual multi-tenant SaaS product a commerce startup sells — architecture, subscriptions, merchant dashboards, analytics and integrations — the platform your customers log into, not a storefront." },
    { q: "Can you integrate with Shopify and marketplaces?", a: "Yes — API integrations to Shopify, major marketplaces, payment gateways, logistics and ad platforms are core to commerce SaaS, and we build them in." },
    { q: "Can you take us from MVP to Series A?", a: "That's the model. We ship a focused MVP to validate, then harden, instrument and scale the platform into something investor- and enterprise-ready." },
    { q: "Do you offer a co-founding or partnership model?", a: "Yes — for the right funded founders we offer a co-founding engagement (part fee, part stake) so incentives are aligned for the long term." },
  ],
  cta: {
    title: "Building a commerce SaaS? Let's build the product.",
    body: "Talk to a senior engineer about your vertical SaaS — architecture, billing, dashboards and a realistic path from MVP to Series A.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
