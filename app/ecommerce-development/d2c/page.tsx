import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "D2C E-Commerce Development for Brands",
  description:
    "Own your customer, own your margin. D2C commerce platforms with India-ready payments, subscriptions and conversion-first design — built to scale.",
  alternates: { canonical: "/ecommerce-development/d2c" },
};

const config: ServiceConfig = {
  slug: "/ecommerce-development/d2c",
  parent: { label: "E-Commerce", href: "/ecommerce-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "E-Commerce", href: "/ecommerce-development" },
    { label: "D2C Brand Platforms" },
  ],
  eyebrow: "E-Commerce · D2C",
  h1: "D2C platforms that put your brand in control.",
  heroSub:
    "Stop renting your customer relationship from marketplaces. We build D2C e-commerce platforms with India-ready payments, subscriptions and conversion-first design — so you own the customer and the margin.",
  heroImage: images.packages,
  chips: ["UPI & payments", "Subscriptions", "Conversion-first", "Own your data"],
  primaryKeyword: "d2c ecommerce platform",
  intro: {
    title: "What is a D2C e-commerce platform?",
    body: "A D2C (direct-to-consumer) platform is the brand's own storefront and customer relationship — selling directly instead of through marketplaces or retailers. MnT builds D2C commerce that owns the customer data, the margin and the experience, with the payments, subscriptions and performance a growing brand needs.",
  },
  featuresTitle: "Built to own the customer relationship",
  features: [
    { icon: "tag", title: "Conversion-first storefront", desc: "Fast, beautiful storefronts engineered to lift add-to-cart and checkout completion." },
    { icon: "store", title: "Subscriptions & loyalty", desc: "Recurring orders, memberships and loyalty that grow lifetime value." },
    { icon: "gauge", title: "India-ready payments", desc: "UPI, cards, wallets, COD and EMI through the gateways your customers expect." },
    { icon: "users", title: "First-party data & CRM", desc: "Own your customer data and connect it to CRM, marketing and analytics." },
    { icon: "network", title: "Logistics & fulfilment", desc: "Shipping, returns and fulfilment integrations that keep operations smooth." },
    { icon: "phone", title: "Mobile & app-ready", desc: "Mobile-first storefronts, with native apps when retention demands it." },
  ],
  approachTitle: "Margin and loyalty, engineered in",
  approachSub:
    "A D2C platform should grow margin and repeat purchase — not just look good. We build for the metrics.",
  approachPoints: [
    "Conversion-first UX with Core Web Vitals protected in every release.",
    "Subscriptions, loyalty and bundles to grow lifetime value.",
    "First-party data ownership wired into CRM and marketing.",
    "India-ready payments (UPI, COD, EMI) and reliable fulfilment integrations.",
  ],
  related: [
    { label: "Custom e-commerce", href: "/ecommerce-development/custom" },
    { label: "Shopify & headless", href: "/ecommerce-development/shopify" },
    { label: "E-commerce apps", href: "/ecommerce-development/mobile-app" },
    { label: "Commerce SaaS for startups", href: "/ecommerce-development/saas" },
  ],
  faq: [
    { q: "Should I build D2C custom or on Shopify?", a: "Many D2C brands start on Shopify or headless Shopify for speed, then go custom as catalogue, subscriptions and integrations get complex. We build both and recommend honestly based on your stage." },
    { q: "Do you handle UPI and Indian payments?", a: "Yes — UPI, cards, wallets, net banking, COD and EMI through gateways like Razorpay, plus international payments for cross-border selling." },
    { q: "Can you add subscriptions?", a: "Yes. We build recurring orders, memberships and loyalty programmes that lift repeat purchase and lifetime value." },
    { q: "Will I own my customer data?", a: "Yes — that's the point of D2C. We make first-party data ownership central, connected to your CRM, marketing and analytics stack." },
  ],
  cta: {
    title: "Ready to own your D2C channel? Let's build it.",
    body: "Talk to a senior commerce engineer about a D2C platform that grows margin, loyalty and lifetime value — not just traffic.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
