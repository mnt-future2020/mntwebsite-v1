import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/sales-tax-compliance", {
    title: "US Sales Tax & Economic Nexus Compliance | MnT Future",
    description:
      "Multi-state US sales tax handled through Avalara or Anrok: accurate calculation at checkout, filing readiness, and economic-nexus tracking as you grow.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/sales-tax-compliance",
  parent: { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Sales-Tax & Economic Nexus" },
  ],
  eyebrow: "Sales-tax & economic nexus",
  h1: "Owe the right tax in the right states.",
  heroSub:
    "US economic-nexus rules mean you can owe sales tax in states you've never set foot in: crossing a revenue or order threshold is enough. We wire Avalara or Anrok into your store so calculation is right at checkout, filings stay ready, and new nexus doesn't sneak up on you.",
  heroImage: images.dev,
  chips: ["Economic-nexus tracking", "Avalara / Anrok", "Accurate at checkout", "Filing readiness"],
  primaryKeyword: "US sales tax & economic nexus compliance",
  intro: {
    title: "What is economic nexus?",
    body: (
      <>
        Nexus is what obligates you to collect a state's sales tax. It used to require physical
        presence; since the Wayfair ruling, crossing a state's economic thresholds (revenue or order
        count) is enough. A growing store crosses new thresholds without noticing, and the liability
        builds quietly. We integrate a tax engine (Avalara or Anrok) so rates are right at checkout,
        exemptions are handled, and your filings stay ready as your map of obligations grows.
      </>
    ),
  },
  featuresTitle: "How we keep the tax right.",
  features: [
    { icon: "records", title: "Tax engine integration", desc: "Avalara or Anrok wired into checkout: rates come from the systems built to know them, not hand-kept tables." },
    { icon: "pin", title: "Accurate by address", desc: "State, county, city, district: US sales tax is hyper-local, and the calculation follows the ship-to, correctly." },
    { icon: "eye", title: "Nexus monitoring", desc: "Your sales tracked against each state's thresholds, so a new obligation is a heads-up, not a surprise audit." },
    { icon: "check", title: "Exemptions handled", desc: "Wholesale buyers, resale certificates, and exempt categories applied correctly, with the paperwork retained." },
    { icon: "cloud", title: "Filing readiness", desc: "The data each state's return needs, collected and organized as you sell: filing becomes routine." },
    { icon: "layers", title: "Works with B2B & marketplaces", desc: "Tax logic that follows your model: D2C, wholesale with certificates, or marketplace facilitator rules." },
  ],
  approachTitle: "Tax debt compounds quietly. Set it up once, correctly.",
  approachSub:
    "The expensive version of sales tax is discovering it late. The cheap version is architecture.",
  approachPoints: [
    "Calculation delegated to Avalara or Anrok: accuracy is their whole business.",
    "Nexus watched as you grow, so obligations surface when they start, not when a state writes.",
    "Exemption certificates captured and stored, so wholesale doesn't create silent liability.",
    "Set up inside the platform build or added to a live store: both are normal.",
  ],
  related: [
    { label: "Managed Support & Compliance", href: "/commerce/managed-compliance" },
    { label: "Payments, Shipping & 3PL", href: "/commerce/payments-shipping-integration" },
    { label: "PCI DSS Compliance", href: "/commerce/pci-compliance" },
    { label: "B2B / Wholesale Commerce", href: "/commerce/b2b-wholesale" },
  ],
  faq: [
    { q: "We only have an office in one state. Why would we owe tax elsewhere?", a: "Because of economic nexus: since the Wayfair ruling, crossing a state's revenue or order-count threshold creates the obligation even with no physical presence. A growing store collects new obligations quietly, which is exactly why we track thresholds." },
    { q: "Avalara or Anrok: which one?", a: "Both are engines built for US sales tax; the fit depends on your stack and how you sell. We'll recommend one for your setup in the strategy session and integrate it properly either way." },
    { q: "Do you file the returns?", a: "We keep you filing-ready: accurate collection, organized data, and the tax engine's filing workflows configured. The filings themselves run through the engine or your accountant, and we make sure nothing is missing when they do." },
    { q: "What about wholesale and exempt buyers?", a: "Exemptions are part of the setup: resale certificates captured at onboarding, exempt categories mapped, and the paperwork stored so an exempt sale is defensible, not just untaxed." },
    { q: "How do we start?", a: "With a free strategy session: we look at where you sell, where you're already over thresholds, and what it takes to get calculation and filing readiness right." },
  ],
  cta: {
    title: "Get ahead of the states, not behind them.",
    body: "Book a free strategy session: we'll review your nexus map and show you what a correct setup looks like.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
