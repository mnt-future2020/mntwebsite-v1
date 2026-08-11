import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocalServicePage from "@/components/LocalServicePage";
import { MADURAI_SERVICES, MADURAI_SLUGS } from "@/lib/madurai";
import { resolveMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return MADURAI_SLUGS.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const s = MADURAI_SERVICES[slug];
  if (!s) return {};
  return resolveMetadata(`/in/madurai/${slug}`, {
    title: s.metaTitle,
    description: s.metaDescription,
  });
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const service = MADURAI_SERVICES[slug];
  if (!service) notFound();
  return <LocalServicePage service={service} />;
}
