import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/ada-accessibility", {
    title: "ADA / WCAG Accessibility for E-Commerce | MnT Future",
    description:
      "78% of accessibility lawsuits target e-commerce. We audit your store against WCAG 2.2 AA, fix what fails, and keep checking as it changes: lower risk, more shoppers served.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/ada-accessibility",
  parent: { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "ADA / WCAG Accessibility" },
  ],
  eyebrow: "ADA / WCAG accessibility",
  h1: "Accessible to every shopper. Defensible in every letter.",
  heroSub:
    "Roughly 78% of accessibility lawsuits target e-commerce, and the demand letters don't warn first. We audit your store against WCAG 2.2 AA, fix what fails, and keep checking as the store changes: lower legal risk, and more shoppers who can actually buy.",
  heroImage: images.dev,
  chips: ["WCAG 2.2 AA", "Screen readers & keyboard", "Checked as you ship", "Audit & fix, then upkeep"],
  primaryKeyword: "ADA / WCAG e-commerce accessibility compliance",
  intro: {
    title: "What does ADA compliance mean for a store?",
    body: (
      <>
        The ADA is the US law; WCAG is the standard courts and auditors measure against. For a store
        it means every shopper can browse, choose, and check out: with a screen reader, with a
        keyboard, with low vision. We audit against WCAG 2.2 AA, fix what fails, and then keep the
        store built to the standard as products, pages, and campaigns change: because accessibility isn't a
        one-time certificate.
      </>
    ),
  },
  featuresTitle: "How we make and keep you accessible.",
  features: [
    { icon: "search", title: "WCAG audit", desc: "A real audit against WCAG 2.2 AA: what fails, where, and what it takes to fix, in priority order." },
    { icon: "code", title: "Fixes in the code", desc: "We fix the product, not the symptoms: semantic markup, focus order, contrast, labels, and announcements." },
    { icon: "eye", title: "Screen reader & keyboard flows", desc: "Browse, cart, and checkout tested end to end the way assistive-technology users actually shop." },
    { icon: "clock", title: "Upkeep as you ship", desc: "New pages, products, and campaigns are checked as they ship, so the standard survives change." },
    { icon: "shield", title: "Evidence you can point to", desc: "Documented conformance work: what was tested, what was fixed, and when, if a letter ever arrives." },
    { icon: "users", title: "More shoppers served", desc: "An accessible store simply works for more people: the legal risk drops and conversion widens." },
  ],
  approachTitle: "A design discipline, not an overlay widget.",
  approachSub:
    "Overlay widgets don't stop lawsuits. Accessible code does.",
  approachPoints: [
    "Built to WCAG 2.2 AA in the code itself: no overlay widgets pretending on top.",
    "Checkout first: the flows that take money are the flows that must work for everyone.",
    "Checked continuously as the store changes, not re-earned in a panic.",
    "Documented as we go, so your defensibility is evidence, not assertion.",
  ],
  related: [
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "PCI DSS Compliance", href: "/commerce/pci-compliance" },
    { label: "Sales-Tax & Economic Nexus", href: "/commerce/sales-tax-compliance" },
    { label: "Security & Compliance", href: "/security-compliance" },
  ],
  faq: [
    { q: "Why is this such a big deal for e-commerce?", a: "Accessibility lawsuits have surged, and roughly 78% target e-commerce sites. Beyond the legal risk, an accessible store simply converts more shoppers: the fixes that satisfy WCAG also make the store easier for everyone." },
    { q: "Do accessibility overlay widgets work?", a: "They don't fix the underlying code, and stores using them still get sued. We build to the standard in the product itself: markup, focus, contrast, and flows, which is what the standard actually measures." },
    { q: "What standard do you build to?", a: "WCAG 2.2 AA: the level courts and auditors reference. We audit against it, fix to it, and keep testing against it as the store changes." },
    { q: "Our store is already live. Where do we start?", a: "With the audit: you get a prioritized list of what fails and what it takes to fix. Checkout and purchase flows come first, because that's where risk and revenue meet." },
    { q: "Is this one-time or ongoing?", a: "Both exist, honestly: an audit-and-fix project gets you to the standard, and the managed SLA keeps it tested as products and campaigns change. A store that ships weekly needs the second." },
  ],
  cta: {
    title: "Get to WCAG 2.2 AA before the letter arrives.",
    body: "Book a free strategy session: we'll assess where your store stands against WCAG and what it takes to fix, in priority order.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
