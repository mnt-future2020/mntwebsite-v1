import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndustryPage from "@/components/IndustryPage";
import { INDIA_INDUSTRIES, industryBySlug } from "@/lib/indiaIndustries";
import { resolveMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return INDIA_INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const industry = industryBySlug(slug);
  if (!industry) return { title: "Industry not found" };
  return resolveMetadata(`/in/industries/${slug}`, {
    title: industry.metaTitle,
    description: industry.metaDescription,
  });
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const industry = industryBySlug(slug);
  if (!industry) notFound();
  return <IndustryPage industry={industry} />;
}
