import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/caseStudies";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: { absolute: "Our Work — Case Studies | MnT Future" },
  description:
    "Platforms MnT Future has designed and built — real, live products engineered end to end for US D2C and marketplace brands.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  const [featured, ...rest] = caseStudies;
  const featuredStack =
    featured.scope.find((s) => s.label === "Stack")?.value.split(" · ") ?? [];

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-gradient-to-b from-mist to-white">
        <div className="mx-auto max-w-[1200px] px-5 pb-[72px] pt-[72px] sm:px-7 lg:pt-[88px]">
          <div className="animate-fade-up">
            <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">
              Selected work
            </div>
            <h1 className="mt-[18px] font-display text-[34px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[46px]">
              Real platforms, shipped.
            </h1>
            <p className="mt-5 max-w-[620px] text-[17px] leading-[1.65] text-slatey">
              Live products we&apos;ve designed and engineered end to end. Judge our engineering
              from what we ship, not a logo wall.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED CASE STUDY */}
      <section className="mx-auto max-w-[1200px] px-5 pt-[72px] sm:px-7">
        <Reveal>
          <Link
            href={`/work/${featured.slug}`}
            className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(14,27,46,0.05)] transition-all duration-[250ms] hover:shadow-[0_20px_44px_-18px_rgba(14,102,194,0.22)]"
          >
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="p-8 sm:p-11">
                <div className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-700">
                  {featured.type}
                </div>
                <h2 className="mt-3.5 font-display text-[28px] font-extrabold text-ink sm:text-[32px]">
                  {featured.title}
                </h2>
                <p className="mt-3.5 text-[15.5px] leading-[1.7] text-slatey">{featured.tagline}</p>
                <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {featured.facts.map((f) => (
                    <div key={f.label} className="border-l-[3px] border-brand-200 pl-3.5">
                      <div className="font-display text-[23px] font-bold text-ink">{f.value}</div>
                      <div className="mt-1 text-[12.5px] leading-normal text-slate-500">{f.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-2.5">
                  {featuredStack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-[12.5px] font-semibold text-slatey"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <span className="mt-7 inline-flex items-center gap-[7px] text-sm font-semibold text-brand-700">
                  Read the case study
                  <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
              <div className="relative min-h-[280px] border-t border-slate-200 bg-slate-100 lg:min-h-[380px] lg:border-l lg:border-t-0">
                <Image
                  src={featured.heroShot}
                  alt={`${featured.title} — product screenshot`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-left-top"
                />
              </div>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* MORE CASE STUDIES */}
      <section className="mx-auto max-w-[1200px] px-5 py-[72px] sm:px-7">
        <div className="grid gap-[22px] md:grid-cols-2">
          {rest.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <Link
                href={`/work/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(14,27,46,0.05)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(14,102,194,0.22)]"
              >
                <div className="relative aspect-[16/8] overflow-hidden border-b border-slate-200 bg-slate-100">
                  <Image
                    src={c.cover}
                    alt={`${c.title} — ${c.tagline}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-[26px]">
                  <div className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-700">
                    {c.type}
                  </div>
                  <h2 className="mt-2.5 font-display text-[23px] font-bold text-ink">{c.title}</h2>
                  <p className="mt-[9px] text-[14.5px] leading-[1.6] text-slatey">{c.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-[7px] pt-[18px] text-sm font-semibold text-brand-700">
                    Read the case study
                    <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Workshop CTA card */}
          <Reveal delay={rest.length * 80}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-9 text-center">
              <h2 className="font-display text-[21px] font-bold text-ink">Your platform here next?</h2>
              <p className="mx-auto mt-3 max-w-[360px] text-[14.5px] leading-[1.6] text-slatey">
                Book a free architecture workshop — we&apos;ll show you exactly how we&apos;d build
                it: database design, APIs, scalability plan.
              </p>
              <div className="mt-[22px]">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                >
                  Book a workshop
                  <Icon name="arrow" className="h-[15px] w-[15px]" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
