import Link from "next/link";
import Icon, { IconName } from "./Icon";
import Reveal from "./Reveal";
import FAQ, { QA } from "./FAQ";
import CTASection from "./CTASection";
import StackMarquee from "./StackMarquee";
import SectionTitle from "./SectionTitle";
import { Process, Breadcrumbs } from "./blocks";
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
  features: { icon: IconName; title: string; desc: string; href?: string }[];
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
    provider: { "@type": "Organization", name: site.name, legalName: site.legalName },
    areaServed: ["United States"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* HERO */}
      <section className="border-b border-line bg-gradient-to-b from-mist to-white">
        <div className="mx-auto max-w-[1200px] px-5 pb-[64px] pt-10 sm:px-7 lg:pt-12">
          <Breadcrumbs trail={config.breadcrumb} tone="light" />
          <div className="mt-9 animate-fade-up">
            <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">
              {config.eyebrow}
            </div>
            <h1 className="mt-[18px] max-w-[820px] font-display text-[32px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[44px]">
              {config.h1}
            </h1>
            <p className="mt-5 max-w-[640px] text-[17px] leading-[1.65] text-slatey">
              {config.heroSub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <Link
                href="/strategy-session"
                className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(14,102,194,0.5)] transition-colors hover:bg-brand-800"
              >
                Book a strategy session
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link
                href={config.parent.href}
                className="inline-flex items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                Back to {config.parent.label}
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {config.chips.map((c) => (
                <span key={c} className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-slatey">
                  <Icon name="check" className="h-[15px] w-[15px] text-brand-700" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTRO: answer-first for AEO */}
      <section className="mx-auto max-w-[860px] px-5 py-16 sm:px-7 lg:py-20">
        <Reveal>
          <div className="text-center">
            <h2 className="font-display text-[26px] font-bold tracking-[-0.02em] text-ink sm:text-[30px]">
              {config.intro.title}
            </h2>
            <p className="mt-4 text-[16.5px] leading-[1.7] text-slatey">{config.intro.body}</p>
          </div>
        </Reveal>
      </section>

      {/* FEATURES */}
      <section className="border-y border-line bg-mist py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <Reveal>
            <SectionTitle eyebrow="What we build" title={config.featuresTitle} />
          </Reveal>
          <div className="mt-[52px] grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
            {config.features.map((f, i) => {
              const cardClass =
                "flex h-full flex-col rounded-[14px] border border-slate-200 bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]";
              const body = (
                <>
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                    <Icon name={f.icon} className="h-[23px] w-[23px]" />
                  </div>
                  <h3 className="mt-[18px] font-display text-[18px] font-bold text-ink">{f.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-slatey">{f.desc}</p>
                </>
              );
              return (
                <Reveal key={f.title} delay={i * 60}>
                  {f.href ? (
                    <Link href={f.href} className={cardClass}>
                      {body}
                      <span className="mt-auto inline-flex items-center gap-[7px] pt-4 text-[13.5px] font-semibold text-brand-700">
                        Explore this <Icon name="arrow" className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  ) : (
                    <div className={cardClass}>{body}</div>
                  )}
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* STACK STRIP */}
      <section className="border-b border-line pt-12">
        <p className="px-5 text-center text-[12.5px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          The modern, proven stack we build on
        </p>
        <StackMarquee className="mt-8 pb-12" />
      </section>

      {/* APPROACH */}
      <section className="mx-auto grid max-w-[1200px] items-center gap-14 px-5 py-24 sm:px-7 lg:grid-cols-2">
        <Reveal>
          <SectionTitle align="left" eyebrow="Why MnT Future" title={config.approachTitle} sub={config.approachSub} />
          <Link
            href="/security-compliance"
            className="mt-7 inline-flex items-center gap-[7px] text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
          >
            How we engineer compliance <Icon name="arrow" className="h-3.5 w-3.5" />
          </Link>
        </Reveal>
        <Reveal delay={120}>
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(14,27,46,0.05)] sm:p-10">
            <div className="flex flex-col gap-4">
              {config.approachPoints.map((p) => (
                <div key={p} className="flex items-start gap-[13px]">
                  <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-slate-700">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* PROCESS */}
      <section className="border-y border-line bg-mist py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <Reveal>
            <SectionTitle
              eyebrow="How we work"
              title="Discovery → Build → Certify → Scale"
              sub="A senior-led delivery model built for revenue-critical commerce: predictable and transparent."
            />
          </Reveal>
          <div className="mt-[52px]">
            <Process />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[860px] px-5 py-24 sm:px-7">
        <Reveal>
          <SectionTitle eyebrow="FAQ" title="Questions buyers ask us first" className="mb-11" />
        </Reveal>
        <FAQ items={config.faq} />
      </section>

      {/* RELATED */}
      <section className="border-t border-line bg-mist py-14">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <h2 className="text-[12.5px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Related {config.parent.label.toLowerCase()} services
          </h2>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {config.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                {r.label}
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CTASection title={config.cta.title} body={config.cta.body} />
      </div>
    </>
  );
}
