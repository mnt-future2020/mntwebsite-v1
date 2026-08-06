import type { Metadata } from "next";
import IndiaHubPage, { type IndiaHubConfig } from "@/components/IndiaHubPage";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/ecommerce", {
    title: "Ecommerce Development Company in India | MnT Future",
    description:
      "Custom ecommerce platforms for Indian businesses: D2C storefronts, marketplaces, B2B and wholesale, with GST invoicing, UPI and Indian gateways built in.",
  });
}

const config: IndiaHubConfig = {
  slug: "/in/ecommerce",
  eyebrow: "Ecommerce",
  aside: "6 services",
  h1: (
    <>
      A store you <span className="text-brand-700">own</span>, not one you rent.
    </>
  ),
  heroSub:
    "Custom ecommerce platforms for Indian businesses: storefronts, marketplaces, B2B portals and the integrations behind them. GST, UPI and Indian payment gateways handled in the platform rather than bolted on with plugins, and no percentage of every order going somewhere else.",

  servicesTitle: "What we build.",
  servicesSub:
    "All of it engineered by senior engineers end to end. No juniors on client work, which is the only way a platform survives its second year.",
  services: [
    {
      icon: "store",
      title: "Ecommerce Platform Development",
      desc: "A full platform built for how your business actually sells, with GST, Indian payment gateways and courier integrations handled properly from the start.",
      href: "/in/ecommerce/platform-development",
    },
    {
      icon: "cart",
      title: "D2C Storefronts",
      desc: "Sell straight to your customers on a storefront you own, with your customer data, your margins and no commission on every order.",
      href: "/in/ecommerce/d2c-storefront",
    },
    {
      icon: "network",
      title: "Marketplace Platforms",
      desc: "Many sellers on one platform: onboarding, catalogue control, commission, split payouts and settlement. The complicated parts, done properly.",
      href: "/in/ecommerce/marketplace",
    },
    {
      icon: "building",
      title: "B2B & Wholesale",
      desc: "Customer-specific pricing, quotes and RFQ, bulk ordering, credit terms and approval flows, connected to the ERP you already run.",
      href: "/in/ecommerce/b2b-wholesale",
    },
    {
      icon: "layers",
      title: "Integrations & Automation",
      desc: "Tally or your ERP, warehouse, courier, payment gateway and accounting, joined into one flow so nobody is retyping orders into a second system.",
      href: "/in/ecommerce/integrations",
    },
    {
      icon: "shield",
      title: "Managed Support",
      desc: "We run and maintain the platform against an SLA: monitoring, updates, security patching and a person who answers when something breaks at 9pm.",
      href: "/in/ecommerce/managed-support",
    },
  ],

  whyTitle: "Why businesses move off rented platforms.",
  why: [
    {
      icon: "wallet",
      title: "The percentage stops",
      desc: "A monthly fee plus a cut of every order is tolerable at small volume and expensive at real volume. On your own platform, a record month costs the same to run as a quiet one.",
    },
    {
      icon: "shield",
      title: "GST handled in the core",
      desc: "Place of supply deciding CGST and SGST or IGST, slabs following the HSN code, and invoice serials that never skip. These are legal requirements, not preferences, and plugins get them wrong.",
    },
    {
      icon: "lock",
      title: "The customer list is yours",
      desc: "Orders, behaviour and contact data sit in a database you control, in India. You can query it, report on it, and connect anything you like to it.",
    },
    {
      icon: "code",
      title: "The specific thing gets built",
      desc: "Whatever your business does that nothing off the shelf covers is the reason you are reading this. On a custom platform it is a module we write, not a feature request nobody will action.",
    },
  ],

  faq: [
    {
      q: "Should we move off Shopify?",
      a: "Not always. At modest volume Shopify is genuinely the right answer and we will say so rather than sell you a build. The move makes sense when the commission is real money, when GST or your workflow needs something the platform will not do, or when owning the customer data starts to matter strategically.",
    },
    {
      q: "How long does a platform build take?",
      a: "A focused D2C storefront is typically eight to sixteen weeks. Marketplaces and B2B platforms are longer because the rules are more complicated. We scope it properly before quoting, and we would rather give you a number you can plan around than a small one you cannot.",
    },
    {
      q: "Can you migrate our existing store?",
      a: "Usually yes: products, variants, customers and order history migrate from most platforms. We assess what will and will not survive the move up front, and we are honest about the parts that will not.",
    },
    {
      q: "Which payment gateways do you support?",
      a: "Razorpay, PayU, Cashfree, UPI and cash on delivery with the reconciliation that goes with it. We integrate whichever you already use rather than pushing you to switch.",
    },
    {
      q: "Do you handle ONDC?",
      a: "It is a build rather than a switch. Tell us what you want from ONDC and we will scope it honestly, including whether it is worth doing for your category at this point.",
    },
    {
      q: "What happens after launch?",
      a: "Either we run it for you under a managed support agreement, or we hand it over with documentation and train your team. Both are supported outcomes. A platform you cannot maintain without us is a platform we built badly.",
    },
  ],

  related: [
    { label: "MnT Commerce India", href: "/in/products/commerce-india" },
    { label: "AI services", href: "/in/ai" },
    { label: "Our work", href: "/in/work" },
  ],

  cta: {
    title: "Work out what your platform actually costs you.",
    body: "Bring your monthly fee, your order volume and your commission rate. A senior consultant will put a real number on what renting your store costs a year, and show you what owning one would look like instead, including when it is not worth it.",
  },
};

export default function Page() {
  return <IndiaHubPage config={config} />;
}
