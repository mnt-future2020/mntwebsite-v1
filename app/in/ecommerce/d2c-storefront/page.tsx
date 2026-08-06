import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { INDIA_SERVICES } from "@/lib/indiaServices";
import { resolveMetadata } from "@/lib/seo";

const config = INDIA_SERVICES["d2c-storefront"];

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata(config.slug, {
    // Not `${config.h1} | MnT Future India`: that H1 is the longest of the ten
    // and the composed title ran to 63 characters, past where results truncate.
    title: "D2C Storefront Development in India | MnT Future",
    description: config.metaDescription ?? config.heroSub,
  });
}

export default function Page() {
  return <ServicePage config={config} />;
}
