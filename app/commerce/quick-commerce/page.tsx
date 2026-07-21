import type { Metadata } from "next";
import ServicePage, { ServiceConfig } from "@/components/ServicePage";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/quick-commerce", {
    title: "Quick Commerce Platform Development | MnT Future",
    description:
      "Fast, location-based delivery for grocery, food and pharmacy: delivery zones, live order tracking, and real-time stock by location, built for rush hour.",
  });
}

const config: ServiceConfig = {
  slug: "/commerce/quick-commerce",
  parent: { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Commerce Platforms", href: "/commerce" },
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Quick Commerce / Hyperlocal" },
  ],
  eyebrow: "Quick commerce / hyperlocal",
  h1: "Commerce at delivery speed.",
  heroSub:
    "Grocery, food, pharmacy: when the promise is minutes, the platform has to know what's in stock where, route the order to the right location, and show the rider on a map. We build quick-commerce platforms that keep that promise at rush hour.",
  heroImage: images.commerce,
  chips: ["Delivery zones", "Live order tracking", "Stock by location", "Rush-hour ready"],
  primaryKeyword: "Quick commerce & hyperlocal platform development",
  intro: {
    title: "What is quick commerce?",
    body: (
      <>
        Quick commerce (or hyperlocal delivery) is selling with a delivery promise measured in minutes
        or hours, from stores or fulfillment points near the customer: grocery, food, pharmacy,
        convenience. The build is different from normal e-commerce: inventory lives per location,
        availability depends on the shopper's address, and every order flows to pickers and riders in
        real time. We build platforms designed around exactly those constraints.
      </>
    ),
  },
  featuresTitle: "Built for the minutes-level promise.",
  features: [
    { icon: "pin", title: "Delivery zones", desc: "Shoppers see what's available at their address: zones, store mapping, and delivery windows handled automatically." },
    { icon: "records", title: "Stock by location", desc: "Real-time inventory per store or fulfillment point, so the app never sells what the shelf doesn't have." },
    { icon: "bolt", title: "Order to rider, in real time", desc: "Orders route instantly to the right location's pickers and riders, with statuses everyone can see." },
    { icon: "eye", title: "Live tracking", desc: "Customers watch the order move: picked, packed, on the way, arriving. Fewer where-is-my-order calls." },
    { icon: "clock", title: "Rush-hour performance", desc: "Lunch and dinner spikes are the business. The platform is engineered for its busiest hour, not its average." },
    { icon: "phone", title: "Built mobile-first", desc: "Most quick-commerce orders happen on a phone: the experience is designed for one thumb in a hurry." },
  ],
  approachTitle: "Built for the promise: minutes, not days.",
  approachSub: "In quick commerce the product is the delivery promise. Break it and the customer is gone.",
  approachPoints: [
    "Per-location inventory as the source of truth: availability is always real.",
    "Real-time order routing to stores, pickers, and riders.",
    "Engineered for spikes: the platform holds at rush hour, when the revenue happens.",
    "Delivery-zone logic that grows as you add locations and cities.",
  ],
  related: [
    { label: "Custom Commerce Platforms", href: "/commerce/headless-marketplace" },
    { label: "Mobile Commerce Apps", href: "/commerce/mobile-commerce-apps" },
    { label: "Integrations & Automation", href: "/commerce/integrations" },
    { label: "Multi-Vendor Stores", href: "/commerce/multi-vendor-stores" },
  ],
  faq: [
    { q: "Do you build the rider and picker apps too?", a: "Yes: the customer app, store and picker tooling, and rider flows are all part of the build when you need them, sharing one backend so every status is live everywhere." },
    { q: "Can it work with our existing POS or inventory system?", a: "That's usually essential: we integrate your POS or inventory system so stock per location stays real. Our Integrations & Automation service handles exactly this." },
    { q: "What if we start with one city?", a: "That's the right way to do it. Zones, stores, and cities are configuration, not rebuilds: start with one neighborhood, prove the model, and expand." },
    { q: "How is this different from normal e-commerce?", a: "Normal e-commerce has one warehouse and a shipping promise in days. Quick commerce has many locations, per-location stock, and a promise in minutes: the whole platform has to be built around location and speed." },
    { q: "What do we need to launch?", a: "Locations with real inventory data, a delivery operation (yours or a partner's), and the platform. We'll map the whole flow in a free strategy session and tell you honestly what's ready and what's not." },
  ],
  cta: {
    title: "Promising minutes? Let's make the platform keep it.",
    body: "Book a free strategy session: we'll map the zones, the stock, and the order flow for your first city.",
  },
};

export default function Page() {
  return <ServicePage config={config} />;
}
