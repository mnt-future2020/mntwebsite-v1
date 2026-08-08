import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintFaq from "@/components/BlueprintFaq";
import BlueprintMotion from "@/components/BlueprintMotion";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, PAGE } from "@/components/blueprint";
import { INDIA_GUIDES, guideBySlug } from "@/lib/indiaGuides";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return INDIA_GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const g = guideBySlug(slug);
  if (!g) return { title: "Guide not found" };
  return resolveMetadata(`/in/guides/${slug}`, {
    title: g.metaTitle,
    description: g.metaDescription,
  });
}

export default async function GuidePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const g = guideBySlug(slug);
  if (!g) notFound();

  // Article + FAQPage: the summary is the answer an answer engine can lift,
  // and every section heading is a question a reader arrived with.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.summary,
    url: `${site.url}/in/guides/${g.slug}`,
    mainEntityOfPage: `${site.url}/in/guides/${g.slug}`,
    author: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
    publisher: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: g.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <BlueprintMotion />

      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className={`${PAGE} pb-14 pt-10 lg:pb-16 lg:pt-14`}>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/in" },
              { label: "Guides", href: "/in/guides" },
              { label: g.cluster },
            ]}
            tone="light"
          />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              {g.cluster}
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              {g.readingMins} min read
            </span>
          </div>

          <h1 className="mt-8 max-w-[20ch] animate-rise-in font-display text-[34px] font-bold leading-[1.04] tracking-[-0.04em] text-bp-ink sm:text-[46px] lg:text-[58px]">
            {g.title}
          </h1>
          {/* The short answer, before the long one. */}
          <p className="mt-7 max-w-[62ch] animate-rise-in border-l-2 border-brand-500 pl-5 text-[18px] leading-[1.7] text-bp-body [animation-delay:120ms]">
            {g.summary}
          </p>
        </div>
      </section>

      <section data-reveal className="border-b border-bp-line">
        <div className="mx-auto max-w-[760px] px-[18px] py-16 sm:px-8 lg:py-24">
          {g.sections.map((s) => (
            <div key={s.heading} className="mb-12 last:mb-0">
              <h2 className="font-display text-[24px] font-bold leading-[1.2] tracking-[-0.03em] text-bp-ink sm:text-[30px]">
                {s.heading}
              </h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-4 text-[17px] leading-[1.75] text-bp-mute">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="01" total="02" eyebrow="Questions" title="What people ask us about this." />
          <div className="mx-auto mt-11 max-w-[1080px] lg:mt-16">
            <BlueprintFaq items={g.faq} />
          </div>
        </div>
      </section>

      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="02" total="02" eyebrow="Next" title="If this is your problem, start here." />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 sm:grid-cols-2">
            {g.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="group flex items-center justify-between gap-4 border-b border-r border-bp-edge bg-white p-7 text-[17px] font-semibold text-bp-ink transition-colors hover:bg-bp-tint lg:p-8"
              >
                {r.label}
                <Icon
                  name="arrow"
                  className="h-4 w-4 shrink-0 text-brand-700 transition-transform group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Bring the version of this that is happening in your business."
        body="A senior consultant, not a salesperson. If the answer is short we will just answer it, including when the answer is that you do not need us."
        primary={{ label: "Talk to a Senior Engineer", href: "/in/strategy-session" }}
        secondary={{ label: "Read the other guides", href: "/in/guides" }}
      />
    </>
  );
}
