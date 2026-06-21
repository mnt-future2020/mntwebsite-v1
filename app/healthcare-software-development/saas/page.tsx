import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";

export const metadata: Metadata = {
  title: "Healthcare SaaS Development for Startups",
  description:
    "Vertical SaaS for funded healthtech startups — multi-tenant, HIPAA & ABDM-compliant, with subscriptions and dashboards. MVP to Series A.",
  alternates: { canonical: "/healthcare-software-development/saas" },
};

const config: ServiceConfig = {
  slug: "/healthcare-software-development/saas",
  parent: { label: "Healthcare", href: "/healthcare-software-development" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Healthcare", href: "/healthcare-software-development" },
    { label: "Healthcare SaaS for Startups" },
  ],
  eyebrow: "Healthcare · Vertical SaaS",
  h1: "Healthcare SaaS, built for funded healthtech startups.",
  heroSub:
    "For funded healthtech founders, we build the vertical SaaS product itself — multi-tenant, HIPAA and ABDM-compliant, with subscriptions, onboarding and dashboards. The product you take to market, from MVP to a platform ready for Series A.",
  heroImage: images.dev,
  chips: ["Multi-tenant", "HIPAA & ABDM", "Subscriptions", "MVP to Series A"],
  primaryKeyword: "healthcare saas development",
  intro: {
    title: "What is healthcare SaaS development?",
    body: "Healthcare SaaS development is building a multi-tenant, subscription software product for the health industry — the platform a startup sells to providers, payers or patients. MnT builds vertical healthcare SaaS for funded founders: HIPAA and ABDM-compliant, with the billing, onboarding and admin a real SaaS business needs, engineered to scale from MVP to Series A.",
  },
  featuresTitle: "Everything a healthcare SaaS product needs",
  features: [
    { icon: "layers", title: "Multi-tenant architecture", desc: "Secure data isolation per customer, with the scalability a growing SaaS demands." },
    { icon: "gauge", title: "Subscriptions & billing", desc: "Plans, metering, usage-based billing and self-serve onboarding wired in from the start." },
    { icon: "shield", title: "HIPAA & ABDM compliance", desc: "Health-grade compliance built into the product — the bar enterprise health buyers require." },
    { icon: "users", title: "Admin & roles", desc: "Tenant administration, role-based access and dashboards your customers and team rely on." },
    { icon: "ai", title: "AI-native features", desc: "Build AI capabilities into the product where they differentiate and add real value." },
    { icon: "rocket", title: "MVP to Series A", desc: "Ship a focused MVP fast, then harden and scale into a platform ready to raise on." },
  ],
  approachTitle: "A product partner for healthtech founders",
  approachSub:
    "We build the SaaS you sell — not just a contractor deliverable — with founder-grade ownership.",
  approachPoints: [
    "Multi-tenant SaaS architecture with per-customer isolation and scale built in.",
    "Subscriptions, billing and onboarding — the commercial engine of a SaaS business.",
    "HIPAA and ABDM compliance native to the product, unblocking enterprise health deals.",
    "Co-founding engagement available for founders who want a true technical partner.",
  ],
  related: [
    { label: "Custom healthcare software", href: "/healthcare-software-development/custom" },
    { label: "Telemedicine apps", href: "/healthcare-software-development/telemedicine" },
    { label: "AI in healthcare", href: "/healthcare-software-development/ai-healthcare" },
    { label: "ABDM & FHIR integration", href: "/healthcare-software-development/abdm-fhir" },
  ],
  faq: [
    { q: "Do you build the SaaS product itself, not just a website?", a: "Yes. We build the actual multi-tenant SaaS product a healthtech startup sells — architecture, subscriptions, onboarding, dashboards and compliance — the platform your customers log into, not a marketing site." },
    { q: "Is the SaaS HIPAA and ABDM compliant?", a: "Yes. Health-grade compliance is engineered into the product from day one, which is exactly what enterprise providers and payers require before they buy." },
    { q: "Can you take us from MVP to Series A?", a: "That's the model. We ship a focused MVP quickly to validate, then harden, instrument and scale the platform into something investor- and enterprise-ready." },
    { q: "Do you offer a co-founding or partnership model?", a: "Yes — for the right funded founders we offer a co-founding engagement (part fee, part stake) so incentives are aligned for the long term." },
  ],
  cta: {
    title: "Building a healthtech SaaS? Let's build the product.",
    body: "Talk to a senior engineer about your vertical SaaS — architecture, compliance, billing and a realistic path from MVP to Series A.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
