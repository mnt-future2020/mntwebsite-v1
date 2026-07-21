import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/managed-compliance", {
    title: "Managed Support & Compliance: ADA · PCI · Tax | MnT Future",
    description:
      "Support & monitoring on an SLA, plus ADA/WCAG, PCI DSS v4.0.1, and US sales-tax: your live store kept fast, secure, and compliant.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/managed-compliance",
  parent: { label: "Commerce Platforms", href: "/commerce" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Managed Support & Compliance" },
  ],
  eyebrow: "Managed support & compliance",
  h1: "Keep it running, secure, and compliant: on an SLA.",
  heroSub:
    "A live US store carries real legal and security risk. We keep yours fast and online while handling ADA/WCAG accessibility, PCI DSS v4.0.1, and multi-state sales-tax: continuously, under a clear SLA.",
  heroImage: images.dev,
  chips: ["SLA support", "ADA / WCAG", "PCI DSS v4.0.1", "US sales-tax handled"],
  primaryKeyword: "Managed commerce & compliance",
  intro: {
    title: "What is managed support & compliance?",
    body: (
      <>
        It's the ongoing work that keeps a live store healthy: support, monitoring, and performance on
        an SLA, plus the US compliance obligations that start the day you launch. We keep your platform
        fast and available, and keep ADA/WCAG accessibility, PCI DSS v4.0.1, and sales-tax/economic-nexus
        continuously handled, so uptime, legal risk, and security aren't things you think about.
      </>
    ),
  },
  featuresTitle: "What we manage",
  features: [
    { icon: "gauge", title: "Support, monitoring & performance (SLA)", desc: "Proactive monitoring, incident response, and performance work on a defined SLA: issues caught before your customers feel them.", href: "/commerce/managed-support" },
    { icon: "shield", title: "ADA / WCAG accessibility", desc: "78% of accessibility lawsuits target e-commerce. We bring your store to WCAG conformance and keep it there as it changes.", href: "/commerce/ada-accessibility" },
    { icon: "lock", title: "PCI DSS v4.0.1 compliance", desc: "Continuous PCI DSS v4.0.1 support: scoping, controls, and evidence, so card data handling stays compliant, not just at audit time.", href: "/commerce/pci-compliance" },
    { icon: "records", title: "Sales-tax & economic nexus", desc: "Multi-state US sales-tax and economic-nexus handled via Avalara / Anrok integration: calculation, filing readiness, and accuracy.", href: "/commerce/sales-tax-compliance" },
    { icon: "bell", title: "Uptime & incident response", desc: "Alerting, on-call response, and clear runbooks: reliable uptime through launches, sales, and traffic spikes.", href: "/commerce/uptime-incident-response" },
    { icon: "cloud", title: "Continuous hardening", desc: "Dependency updates, security patching, and performance tuning applied continuously, not deferred until something breaks.", href: "/commerce/continuous-hardening" },
  ],
  approachTitle: "Lower risk, reliable uptime: handled.",
  approachSub:
    "Accessibility lawsuits, payment security rules, and multi-state tax are liabilities the day you go live. We carry them for you.",
  approachPoints: [
    "ADA/WCAG conformance that lowers a real and growing legal risk for US e-commerce.",
    "Continuous PCI DSS v4.0.1: controls and evidence maintained, not scrambled before an audit.",
    "Multi-state sales-tax and economic-nexus handled through Avalara / Anrok.",
    "Monitoring, incident response, and hardening on an SLA: predictable, reliable uptime.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
    { label: "Security & Compliance", href: "/security-compliance" },
  ],
  faq: [
    { q: "Why is ADA/WCAG such a big deal for e-commerce?", a: "Accessibility lawsuits have surged, and roughly 78% target e-commerce sites. Beyond the legal risk, an accessible store simply converts more shoppers. We bring you to WCAG conformance and keep you there." },
    { q: "Do you make us PCI compliant?", a: "We provide continuous PCI DSS v4.0.1 support: reducing and maintaining scope, implementing controls, and keeping evidence current. The exact responsibilities depend on your payment architecture, which we'll map with you." },
    { q: "How does sales-tax compliance work?", a: "US economic-nexus rules mean you may owe tax in states where you have no physical presence. We integrate Avalara or Anrok for accurate multi-state calculation and filing readiness." },
    { q: "Can you manage a store you didn't build?", a: "Yes. We start with an audit of your platform, accessibility, PCI scope, and tax setup, then take over monitoring, support, and compliance under an SLA." },
    { q: "What does the SLA cover?", a: "Response and resolution targets for incidents, monitoring and alerting, performance budgets, and a maintenance cadence: all defined up front so expectations are clear." },
  ],
  cta: {
    title: "Keep your store fast, secure, and compliant.",
    body: "Book a free strategy session and we'll audit your uptime, accessibility, PCI scope, and sales-tax setup, and show you what a managed SLA would cover.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
