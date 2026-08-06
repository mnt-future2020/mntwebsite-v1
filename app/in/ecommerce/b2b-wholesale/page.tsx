import type { Metadata } from "next";
import ServicePage from "@/components/ServicePage";
import { INDIA_SERVICES } from "@/lib/indiaServices";
import { resolveMetadata } from "@/lib/seo";

const config = INDIA_SERVICES["b2b-wholesale"];

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata(config.slug, {
    title: config.metaTitle ?? ` | MnT Future India`,
    description: config.metaDescription ?? config.heroSub,
  });
}

export default function Page() {
  return <ServicePage config={config} />;
}
