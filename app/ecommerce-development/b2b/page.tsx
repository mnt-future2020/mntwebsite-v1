import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "B2B E-Commerce Development",
  description:
    "B2B e-commerce development — quote-to-order, account pricing, approvals and ERP integration. Commerce engineered for complex business buying.",
  alternates: { canonical: "/ecommerce-development/b2b" },
};

const config: ServiceConfig = {
  slug: "/ecommerce-development/b2b",
  parent: { label: "E-Commerce", href: "/ecommerce-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "E-Commerce", href: "/ecommerce-development" },
    { label: "B2B E-Commerce" },
  ],
  eyebrow: "E-Commerce · B2B",
  h1: "B2B commerce engineered for complex buying.",
  heroSub:
    "B2B e-commerce development for the way businesses actually buy — account-specific pricing, quote-to-order, approvals, credit terms and ERP integration. The complexity handled, the experience kept simple.",
  heroImage: images.dev,
  chips: ["Account pricing", "Quote-to-order", "Approvals", "ERP integration"],
  primaryKeyword: "b2b ecommerce development",
  intro: {
    title: "What is B2B e-commerce development?",
    body: "B2B e-commerce development builds storefronts for business buyers, where the rules differ from retail: negotiated and account-specific pricing, quotes, approval workflows, credit terms, bulk and repeat ordering, and deep ERP integration. MnT engineers B2B commerce that absorbs that complexity while keeping the buying experience simple.",
  },
  featuresTitle: "Built for how businesses buy",
  features: [
    { icon: "tag", title: "Account & contract pricing", desc: "Customer-specific price lists, tiers, discounts and negotiated contract pricing." },
    { icon: "records", title: "Quote-to-order (RFQ)", desc: "Request-for-quote flows that convert into orders without leaving the platform." },
    { icon: "users", title: "Approvals & roles", desc: "Buyer hierarchies, spend limits and approval workflows for procurement teams." },
    { icon: "network", title: "ERP & system integration", desc: "Real-time integration with ERP, inventory, CRM and accounting systems." },
    { icon: "store", title: "Bulk & reordering", desc: "Fast bulk ordering, saved lists, contracts and one-click reorders." },
    { icon: "shield", title: "Credit & terms", desc: "Credit limits, payment terms and invoicing built into checkout." },
  ],
  approachTitle: "Complexity handled, experience kept simple",
  approachSub:
    "B2B buyers want consumer-grade ease with enterprise-grade rules. We build exactly that.",
  approachPoints: [
    "Account-specific pricing, quotes and approvals modelled accurately.",
    "Real-time ERP and inventory integration so data stays in sync.",
    "Credit terms, invoicing and procurement workflows built into checkout.",
    "A clean, fast buyer experience on top of all that complexity.",
  ],
  related: [
    { label: "Custom e-commerce", href: "/ecommerce-development/custom" },
    { label: "Marketplace development", href: "/ecommerce-development/marketplace" },
    { label: "Shopify & headless", href: "/ecommerce-development/shopify" },
    { label: "Commerce SaaS for startups", href: "/ecommerce-development/saas" },
  ],
  faq: [
    { q: "How is B2B e-commerce different from B2C?", a: "B2B adds account-specific pricing, quotes, approval workflows, credit terms, bulk ordering and deep ERP integration. The buying logic is far more complex, even though the experience should still feel simple." },
    { q: "Can you integrate with our ERP?", a: "Yes — real-time integration with ERP, inventory, CRM and accounting is central to B2B commerce, so pricing, stock and orders stay in sync." },
    { q: "Do you support quote-to-order and approvals?", a: "Yes. We build RFQ/quote-to-order flows and configurable approval hierarchies with spend limits for procurement teams." },
    { q: "Can you build B2B on Shopify or do we need custom?", a: "Both are options — Shopify (incl. B2B features) for faster launches, custom or headless when pricing, ERP and workflow complexity demand it. We'll recommend based on your requirements." },
  ],
  cta: {
    title: "Selling B2B online? Let's build it properly.",
    body: "Talk to a senior engineer about B2B commerce — account pricing, quote-to-order, approvals and ERP integration, with a simple buyer experience.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
