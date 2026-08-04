import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { INDIA_SERVICES } from "@/lib/indiaServices";
import { resolveMetadata } from "@/lib/seo";

const config = INDIA_SERVICES["d2c-storefront"];

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata(config.slug, {
    title: `${config.h1} | MnT Future India`,
    description: config.heroSub,
  });
}

export default function Page() {
  return <ServicePage config={config} />;
}
