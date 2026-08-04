import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/caseStudies";
import CaseStudyPage from "@/components/CaseStudyPage";

// The India mirror of a case study. Same proof, same page, but inside the /in
// tree so the header nav does not flip to the US one mid-journey. Canonical
// points at the US copy, so search engines index one of them, not two.
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
    robots: { index: false, follow: true },
  };
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const cs = getCaseStudy(params.slug);
  if (!cs) notFound();
  return <CaseStudyPage cs={cs} region="in" />;
}
