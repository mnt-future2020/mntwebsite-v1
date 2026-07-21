import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/managed-support", {
    title: "Managed Store Support on an SLA | MnT Future",
    description:
      "Proactive monitoring, incident response, performance work and a maintenance cadence on a defined SLA: your live store looked after by senior engineers.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/managed-support",
  parent: { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Support, Monitoring & Performance" },
  ],
  eyebrow: "Support, monitoring & performance",
  h1: "A live store, looked after like one.",
  heroSub:
    "Revenue-critical software needs someone watching it, fixing it, and keeping it fast: continuously, not when something breaks. Our managed SLA covers monitoring, incident response, performance work, and a maintenance cadence, with targets defined up front.",
  heroImage: images.dev,
  chips: ["Defined SLA targets", "Proactive monitoring", "Incident response", "Performance budgets"],
  primaryKeyword: "Managed e-commerce support & maintenance (SLA)",
  intro: {
    title: "What does managed support cover?",
    body: (
      <>
        It's the ongoing engineering that keeps a live store healthy: monitoring that catches issues
        before customers feel them, incident response when something does go wrong, performance work
        that keeps pages fast, and a maintenance cadence so the platform never quietly rots. All of it
        runs on a defined SLA: response and resolution targets you see up front, not best-effort
        promises.
      </>
    ),
  },
  featuresTitle: "What the SLA engagement includes.",
  features: [
    { icon: "eye", title: "Proactive monitoring", desc: "The store is watched continuously: errors, slowdowns, and anomalies surface to us before they surface to customers." },
    { icon: "bell", title: "Incident response", desc: "When something breaks, response and resolution run against defined targets, with clear communication throughout." },
    { icon: "gauge", title: "Performance work", desc: "Page speed treated as a budget: measured, protected, and tuned release after release." },
    { icon: "clock", title: "Maintenance cadence", desc: "Updates, patches, and housekeeping on a schedule, so small debts never compound into outages." },
    { icon: "shield", title: "Compliance upkeep", desc: "ADA/WCAG, PCI DSS, and sales-tax obligations kept continuously handled under the same SLA." },
    { icon: "users", title: "Senior engineers on call", desc: "The people supporting your store are the same caliber who build them: no first-line script readers." },
  ],
  approachTitle: "Defined targets, not best effort.",
  approachSub:
    "You should know exactly what's covered, how fast we respond, and what happens next: before you sign.",
  approachPoints: [
    "Response and resolution targets, monitoring scope, and performance budgets defined up front.",
    "Proactive by default: most issues are caught by monitoring, not reported by customers.",
    "A maintenance cadence that keeps dependencies, security, and speed current continuously.",
    "We can take over stores we didn't build: an audit first, then the SLA.",
  ],
  related: [
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Uptime & Incident Response", href: "/commerce/uptime-incident-response" },
    { label: "Continuous Hardening", href: "/commerce/continuous-hardening" },
    { label: "Security & Compliance", href: "/security-compliance" },
  ],
  faq: [
    { q: "What exactly does the SLA define?", a: "Response and resolution targets for incidents, what's monitored and alerted on, performance budgets, and the maintenance cadence: all agreed up front so expectations are clear on both sides." },
    { q: "Can you support a store you didn't build?", a: "Yes. We start with an audit of the platform, its accessibility, PCI scope, and tax setup, then take over monitoring, support, and compliance under the SLA." },
    { q: "What's proactive about it?", a: "Monitoring is designed so we find issues first: error spikes, slow pages, failing syncs. The goal is that most incidents are fixed before a customer ever writes in." },
    { q: "Is compliance included?", a: "Yes: ADA/WCAG conformance, PCI DSS support, and US sales-tax handling run under the same engagement, so the store stays legal as well as up." },
    { q: "How do we start?", a: "With a free strategy session: we audit your uptime, accessibility, PCI scope, and tax setup, and show you exactly what a managed SLA would cover for your store." },
  ],
  cta: {
    title: "Put your store on an SLA.",
    body: "Book a free strategy session: we'll audit your setup and show you what defined targets would look like for your store.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
