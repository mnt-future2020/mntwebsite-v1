import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/pci-compliance", {
    title: "PCI DSS v4.0.1 Compliance for E-Commerce | MnT Future",
    description:
      "Continuous PCI DSS v4.0.1 support: payment flows architected so card data stays out of scope, plus the controls and evidence that keep you compliant.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/pci-compliance",
  parent: { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "PCI DSS v4.0.1 Compliance" },
  ],
  eyebrow: "PCI DSS v4.0.1 compliance",
  h1: "Card data out of scope. Compliance out of panic.",
  heroSub:
    "PCI DSS v4.0.1 is now the mandatory standard for anyone touching card payments. The smartest move is architectural: payment flows built so card data stays out of your scope entirely, then continuous controls and evidence so compliance is a state, not an annual scramble.",
  heroImage: images.dev,
  chips: ["Scope reduction first", "Tokenized payments", "Continuous controls", "Evidence kept current"],
  primaryKeyword: "PCI DSS v4.0.1 e-commerce compliance",
  intro: {
    title: "What is PCI DSS compliance?",
    body: (
      <>
        PCI DSS is the card industry's security standard: if your store takes card payments, it
        applies to you, and v4.0.1 is the version now in force. Compliance has two halves: scope (how
        much of your system ever touches card data) and controls (what you must prove about that
        scope). We shrink the first with architecture (tokenized, gateway-handled payments) and keep
        the second continuously maintained: controls implemented, evidence current.
      </>
    ),
  },
  featuresTitle: "How we keep card handling compliant.",
  features: [
    { icon: "lock", title: "Scope reduction by architecture", desc: "Payment flows built so card data never touches your systems: tokenized and gateway-handled, which shrinks what you must prove." },
    { icon: "records", title: "Scoping & gap assessment", desc: "What's in scope today, what shouldn't be, and the gap between your controls and v4.0.1: mapped honestly." },
    { icon: "check", title: "Controls implemented", desc: "The technical controls the standard requires, built into the platform and the process, not bolted on for audit week." },
    { icon: "eye", title: "Evidence kept current", desc: "Compliance is proof: we keep the evidence collected and current, so questionnaires and audits are paperwork, not projects." },
    { icon: "cloud", title: "Continuous, not annual", desc: "Controls validated as part of how the store ships, so v4.0.1 is a state you stay in, not a season you survive." },
    { icon: "shield", title: "Works with your gateway", desc: "Built around the payment providers you already use, and the responsibility split each one actually gives you." },
  ],
  approachTitle: "The cheapest scope is the scope you don't have.",
  approachSub:
    "Every system that never sees card data is a system you never have to defend.",
  approachPoints: [
    "Architecture first: tokenized, gateway-handled payments keep card data out of your systems.",
    "The remaining scope gets real controls, maintained continuously, not assembled before an audit.",
    "Evidence collected as we go, so proving compliance is retrieval, not archaeology.",
    "The exact responsibility split depends on your payment architecture, and we map it with you honestly.",
  ],
  related: [
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Payments, Shipping & 3PL", href: "/commerce/payments-shipping-integration" },
    { label: "ADA / WCAG Accessibility", href: "/commerce/ada-accessibility" },
    { label: "Security & Compliance", href: "/security-compliance" },
  ],
  faq: [
    { q: "Do you make us PCI compliant?", a: "We provide continuous PCI DSS v4.0.1 support: reducing and maintaining scope, implementing controls, and keeping evidence current. The exact responsibilities depend on your payment architecture, which we'll map with you before promising anything." },
    { q: "What changed with v4.0.1?", a: "It's the version of the standard now mandatory for card payments, with stronger expectations around continuous validation rather than point-in-time checks. That's exactly the model we run: controls that hold all year, not just at assessment." },
    { q: "What does 'out of scope' actually mean?", a: "That card data never enters your systems: the shopper's card goes straight to the gateway, tokenized, and your platform only ever holds the token. Less scope means less to secure, less to prove, and less that can go wrong." },
    { q: "We already passed a questionnaire. Why continuous?", a: "Because the store keeps changing after the questionnaire: new code, new dependencies, new integrations. Continuous controls and evidence mean next year's assessment finds you already compliant instead of discovering drift." },
    { q: "How do we start?", a: "With a free strategy session: we map your payment flows and current scope, show you where scope can shrink, and what continuous support would cover for your setup." },
  ],
  cta: {
    title: "Make PCI a state, not a scramble.",
    body: "Book a free strategy session: we'll map your payment flows and show you how much scope you can architect away.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
