import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import CaseStudyPage from "@/components/CaseStudyPage";

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const params = await props.params;
  const cs = getCaseStudy(params.slug);
  if (!cs) return { title: "Case study not found" };
  return {
    title: { absolute: cs.metaTitle },
    description: cs.metaDescription,
    alternates: { canonical: `/work/${cs.slug}` },
    openGraph: {
      type: "article",
      title: cs.metaTitle,
      description: cs.metaDescription,
      url: `/work/${cs.slug}`,
      images: [cs.cover],
    },
    twitter: { card: "summary_large_image", title: cs.metaTitle, description: cs.metaDescription, images: [cs.cover] },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();
  return <CaseStudyPage cs={cs} />;
}
