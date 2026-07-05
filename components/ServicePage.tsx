import Link from "next/link";
import Image from "next/image";
import Icon, { IconName } from "./Icon";
import Reveal from "./Reveal";
import FAQ, { QA } from "./FAQ";
import CTASection from "./CTASection";
import SpotlightCard from "./SpotlightCard";
import StackMarquee from "./StackMarquee";
import { SectionHeading, Process, CheckList, Breadcrumbs } from "./blocks";
import { site } from "@/lib/site";

export type ServiceConfig = {
  slug: string; // full path e.g. /commerce/headless-marketplace
  parent: { label: string; href: string };
  breadcrumb: { label: string; href?: string }[];
  eyebrow: string;
  h1: string;
  heroSub: string;
  heroImage: string;
  chips: string[];
  primaryKeyword: string;
  intro: { title: React.ReactNode; body: React.ReactNode };
  featuresTitle: string;
  features: { icon: IconName; title: string; desc: string }[];
  approachTitle: React.ReactNode;
  approachSub?: string;
  approachPoints: string[];
  related: { label: string; href: string }[];
  faq: QA[];
  cta: { title: string; body: string };
};

export default function ServicePage({ config }: { config: ServiceConfig }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: config.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: config.primaryKeyword,
    provider: { "@type": "Organization", name: "MnT (Magizh NexGen Technologies)" },
    areaServed: ["United States"],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: config.breadcrumb.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: b.href ? `${site.url}${b.href}` : `${site.url}${config.slug}`,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-40" />
        <div className="pointer-events-none absolute -left-40 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-navy" />
        <div className="container-mnt relative pb-20 pt-10 sm:pt-12">
          <Breadcrumbs trail={config.breadcrumb} />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="animate-fade-up">
              <span className="eyebrow-dark">{config.eyebrow}</span>
              <h1 className="mt-6 font-display text-[2.1rem] font-extrabold leading-[1.1] tracking-tight sm:text-[2.9rem]">
                {config.h1}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{config.heroSub}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  Book a workshop <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href={config.parent.href} className="btn-outline-light">
                  Back to {config.parent.label}
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/55">
                {config.chips.map((c) => (
                  <span key={c} className="inline-flex items-center gap-2">
                    <Icon name="check" className="h-4 w-4 text-brand-300" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="relative overflow-hidden rounded-[1.6rem] ring-1 ring-white/10 shadow-2xl">
                <Image
                  src={config.heroImage}
                  alt={config.h1}
                  width={1400}
                  height={1080}
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="h-[300px] w-full object-cover sm:h-[400px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO — answer-first for AEO */}
      <section className="container-mnt py-16 sm:py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-bold text-ink sm:text-3xl">{config.intro.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slatey">{config.intro.body}</p>
          </div>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section className="bg-soft py-20 sm:py-24">
        <div className="container-mnt">
          <SectionHeading eyebrow="What we build" title={config.featuresTitle} />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {config.features.map((f, i) => (
              <Reveal key={f.title} delay={i * 60}>
                <SpotlightCard className="card card-hover group h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slatey">{f.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STACK STRIP */}
      <section className="border-y border-slate-100 bg-white py-12">
        <p className="container-mnt text-center text-xs font-semibold uppercase tracking-[0.18em] text-slatey">
          The modern, proven stack we build on
        </p>
        <StackMarquee className="mt-8" />
      </section>

      {/* APPROACH */}
      <section className="container-mnt py-20 sm:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow="Why MnT" title={config.approachTitle} subtitle={config.approachSub} />
            <Link href="/security-compliance" className="link-arrow mt-7">
              How we engineer compliance <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-card sm:p-10">
              <CheckList items={config.approachPoints} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-soft py-20 sm:py-24">
        <div className="container-mnt">
          <SectionHeading
            eyebrow="How we work"
            title="Discovery → Build → Certify → Scale"
            subtitle="A senior-led delivery model built for revenue-critical commerce — predictable and transparent."
          />
          <div className="mt-14">
            <Process />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-mnt py-20 sm:py-24">
        <SectionHeading eyebrow="FAQ" title="Questions buyers ask us first" />
        <div className="mt-12">
          <FAQ items={config.faq} />
        </div>
      </section>

      {/* RELATED */}
      <section className="bg-soft py-16">
        <div className="container-mnt">
          <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-slatey">
            Related {config.parent.label.toLowerCase()} services
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {config.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {r.label}
                <Icon name="arrow" className="h-4 w-4 text-brand" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection title={config.cta.title} body={config.cta.body} />
    </>
  );
}
