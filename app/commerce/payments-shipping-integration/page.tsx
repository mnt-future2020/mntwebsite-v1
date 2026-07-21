import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/payments-shipping-integration", {
    title: "Payments, Shipping & 3PL Integration | MnT Future",
    description:
      "Payment gateways, tax engines, and shipping/3PL partners wired into your store cleanly: every order charged, taxed, shipped and reconciled correctly.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/payments-shipping-integration",
  parent: { label: "Integrations & Automation", href: "/commerce/integrations" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "Payments, Shipping & Logistics" },
  ],
  eyebrow: "Payments, shipping & logistics",
  h1: "Money in, orders out, books that balance.",
  heroSub:
    "Payments, tax, and shipping are where integration mistakes cost real money. We wire gateways, tax engines, and your logistics partners into the store so every order is charged correctly, taxed correctly, shipped on time, and reconciled without a spreadsheet.",
  heroImage: images.dev,
  chips: ["Payment gateways", "Tax engines", "Shipping & 3PL", "Reconciliation you trust"],
  primaryKeyword: "Payments, shipping & 3PL integration",
  intro: {
    title: "What does payments & logistics integration cover?",
    body: (
      <>
        Everything between the customer paying and the box arriving: the payment gateway that charges
        the card, the tax engine that gets US sales tax right, the warehouse or 3PL that picks and
        ships, and the tracking that flows back to the customer. We integrate each piece cleanly and
        make sure the numbers reconcile at the end: what the gateway paid you matches what the store
        sold.
      </>
    ),
  },
  featuresTitle: "The money and delivery rails we wire.",
  features: [
    { icon: "wallet", title: "Payment gateways", desc: "Cards, wallets, and the payment methods your customers expect: integrated cleanly, tokenized, and PCI-minded." },
    { icon: "records", title: "Tax engines", desc: "US sales tax calculated correctly at checkout through Avalara or Anrok: multi-state rules handled by the systems built for them." },
    { icon: "cloud", title: "Shipping & 3PL", desc: "Orders flow to your warehouse or 3PL automatically, and tracking flows back to the customer without anyone chasing it." },
    { icon: "check", title: "Returns that flow back", desc: "When a return happens, the refund, the restock, and the books all update: no orphaned credits, no ghost inventory." },
    { icon: "gauge", title: "Reconciliation", desc: "Payouts matched to orders automatically, so finance stops reconciling by spreadsheet." },
    { icon: "bell", title: "Failure alerts", desc: "A failed charge, a stuck order, or a broken webhook raises its hand instead of silently losing revenue." },
  ],
  approachTitle: "Correct at checkout. Correct in the books.",
  approachSub:
    "A store that charges wrong, taxes wrong, or ships late doesn't get a second order.",
  approachPoints: [
    "Payment flows architected so card data stays out of scope: tokenized and gateway-handled.",
    "Multi-state US sales tax through Avalara or Anrok, not hand-maintained rate tables.",
    "Order-to-shipment flow automated end to end, with the customer informed at each step.",
    "Reconciliation built in, so revenue, fees, and refunds always add up.",
  ],
  related: [
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "ERP & Back-Office Integration", href: "/commerce/erp-integration" },
    { label: "Workflow Automation", href: "/commerce/workflow-automation" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  ],
  faq: [
    { q: "Which payment gateways do you work with?", a: "The ones your customers and your business need: major US gateways and wallets, and marketplace-grade providers when split payments are involved. We'll recommend the fit for your model in the strategy session." },
    { q: "Do you handle PCI compliance?", a: "We architect payment flows so card data stays out of your scope: tokenized and gateway-handled. For continuous PCI DSS support and evidence, that's our Managed Support & Compliance service, and the two pair naturally." },
    { q: "How does multi-state sales tax work?", a: "Through a tax engine built for it: we integrate Avalara or Anrok so calculation is accurate across states and you're ready for filing, instead of maintaining rate tables by hand." },
    { q: "Can you connect our 3PL or warehouse?", a: "Yes: if it has an API or a feed, we can connect it. Orders flow out automatically, tracking and stock levels flow back, and exceptions get flagged to a person." },
    { q: "What about selling internationally?", a: "Cross-border (multi-currency, localization, and international tax) is an add-on we build when a US brand expands. We'll tell you honestly what it adds in scope before you commit." },
  ],
  cta: {
    title: "Every order charged, shipped, and accounted for.",
    body: "Book a free strategy session: we'll map your payment, tax, and shipping flow and show you where it leaks.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
