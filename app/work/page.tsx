import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/caseStudies";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: { absolute: "Our Work: Case Studies | MnT Future" },
  description:
    "Platforms MnT Future has designed and built: live client commerce platforms, our own products, and the labs behind them, engineered end to end.",
  alternates: { canonical: "/work" },
};

/**
 * /work is grouped rather than one flat list, because the single most damaging
 * thing this page can do is let a visitor mistake something we own for
 * something a client paid us to build. The headings do that work up front, so
 * the honest labels on each card are confirming what the reader already knows.
 */
const GROUPS = [
  {
    key: "client" as const,
    title: "Client platforms",
    desc: "Commerce platforms we designed and engineered for clients, published with their permission.",
  },
  {
    key: "own" as const,
    title: "Our own platforms",
    desc: "Products we build, run and sell ourselves. Where we prove an approach before we recommend it to anyone.",
  },
  {
    key: "lab" as const,
    title: "Labs and audits",
    desc: "Open experiments and internal audits. How we test a method, and measure it, before it reaches a client build.",
  },
];

export default function WorkIndex() {
  // The CTA belongs under the client group, but that group is empty until a
  // client entry's screenshots land. Fall back to the first group that has
  // anything in it so the card never silently disappears.
  const ctaGroup =
    (caseStudies.some((c) => c.group === "client") && "client") ||
    GROUPS.find((g) => caseStudies.some((c) => c.group === g.key))?.key;

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


      {/* GROUPED CASE STUDIES */}
      {GROUPS.map((g) => {
        // Every study gets the same card. Singling one out as a hero read as a
        // ranking of the clients rather than a layout choice.
        const items = caseStudies.filter((c) => c.group === g.key);
        if (!items.length) return null;

        return (
          <section key={g.key} className="mx-auto max-w-[1200px] px-5 pt-[72px] sm:px-7">
            <Reveal>
              <h2 className="font-display text-[26px] font-bold tracking-[-0.01em] text-ink sm:text-[30px]">
                {g.title}
              </h2>
              <p className="mt-2.5 max-w-[620px] text-[15.5px] leading-[1.65] text-slatey">
                {g.desc}
              </p>
            </Reveal>

            <div className="mt-9 grid gap-[22px] md:grid-cols-2">
              {items.map((c, i) => (
                <Reveal key={c.slug} delay={i * 80}>
                  <Link
                    href={`/work/${c.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(14,27,46,0.05)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(14,102,194,0.22)]"
                  >
                    <div className="relative aspect-[16/8] overflow-hidden border-b border-slate-200 bg-slate-100">
                      <Image
                        src={c.cover}
                        alt={`${c.title}: ${c.tagline}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-[26px]">
                      <div className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-700">
                        {c.type}
                      </div>
                      <h3 className="mt-2.5 font-display text-[23px] font-bold text-ink">{c.title}</h3>
                      <p className="mt-[9px] text-[14.5px] leading-[1.6] text-slatey">{c.tagline}</p>
                      <span className="mt-auto inline-flex items-center gap-[7px] pt-[18px] text-sm font-semibold text-brand-700">
                        Read the case study
                        <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}

              {/* The CTA sits under the client group, where a prospect reading
                  about other people's platforms is most likely to picture theirs. */}
              {g.key === ctaGroup && (
                <Reveal delay={items.length * 80}>
                  <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-9 text-center">
                    <h3 className="font-display text-[21px] font-bold text-ink">Your platform here next?</h3>
                    <p className="mx-auto mt-3 max-w-[360px] text-[14.5px] leading-[1.6] text-slatey">
                      Book a free strategy session and we&apos;ll show you exactly how we&apos;d build
                      it: data model, APIs, and the scalability plan.
                    </p>
                    <div className="mt-[22px]">
                      <Link
                        href="/strategy-session"
                        className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                      >
                        Book a strategy session
                        <Icon name="arrow" className="h-[15px] w-[15px]" />
                      </Link>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        );
      })}

      <div className="pb-[72px]" />

      <CTASection />
    </>
  );
}
