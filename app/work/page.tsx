import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/caseStudies";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import { SectionHead, BpButton, MakerMark, PAGE } from "@/components/blueprint";

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
  const shown = GROUPS.filter((g) => caseStudies.some((c) => c.group === g.key));

  return (
    <>
      <BlueprintMotion />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-14 pt-10 lg:pb-20 lg:pt-14`}>
          <div className="flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              Selected work
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              {caseStudies.length} platforms
            </span>
          </div>
          <h1 className="mt-8 max-w-[16ch] animate-rise-in font-display text-[42px] font-bold leading-[0.98] tracking-[-0.05em] text-bp-ink sm:text-[60px] lg:text-[80px]">
            Real platforms, shipped.
          </h1>
          <p className="mt-6 max-w-[58ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            Live products we&apos;ve designed and engineered end to end. Judge our engineering from
            what we ship, not a logo wall.
          </p>
        </div>
      </section>

      {/* GROUPED CASE STUDIES */}
      {shown.map((g, gi) => {
        // Every study gets the same card. Singling one out as a hero read as a
        // ranking of the clients rather than a layout choice.
        const items = caseStudies.filter((c) => c.group === g.key);
        return (
          <section
            key={g.key}
            data-reveal
            className={`border-b border-bp-line ${gi % 2 === 0 ? "bg-bp-wash" : ""}`}
          >
            <div className={`${PAGE} py-20 lg:py-[120px]`}>
              <SectionHead
                no={String(gi + 1).padStart(2, "0")}
                total={String(shown.length).padStart(2, "0")}
                eyebrow={g.title}
                title={g.title}
                sub={g.desc}
              />

              <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-2">
                {items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/work/${c.slug}`}
                    data-stagger
                    className="group flex flex-col border-b border-r border-bp-edge bg-white transition-shadow duration-250 hover:shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)]"
                  >
                    <div className="relative aspect-[16/8] overflow-hidden border-b border-bp-edge bg-slate-100">
                      <Image
                        src={c.cover}
                        alt={`${c.title}: ${c.tagline}`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7 lg:p-9">
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">
                        {c.type}
                      </div>
                      <h3 className="mt-3.5 font-display text-[23px] font-bold tracking-[-0.028em] text-bp-ink lg:text-[27px]">
                        {c.title}
                      </h3>
                      <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{c.tagline}</p>
                      <MakerMark
                        group={c.group}
                        detail={c.scope.find((s) => s.label === "Status")?.value}
                        className="mt-6 border-t border-bp-hair pt-4"
                      />
                      <span className="mt-auto inline-flex items-center gap-2.5 pb-1.5 pt-7 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-brand-700 transition-all group-hover:gap-4">
                        Read the case study
                        <Icon name="arrow" className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </Link>
                ))}

                {/* The CTA sits under the client group, where a prospect reading
                    about other people's platforms is most likely to picture theirs. */}
                {g.key === ctaGroup && (
                  <div
                    data-stagger
                    className="flex flex-col justify-center border-b border-r border-dashed border-[#C9D6E5] bg-white p-9 lg:p-12"
                  >
                    <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-bp-ink">
                      Your platform here next?
                    </h3>
                    <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.7] text-bp-mute">
                      Book a free strategy session and we&apos;ll show you exactly how we&apos;d
                      build it: data model, APIs, and the scalability plan.
                    </p>
                    <div className="mt-7">
                      <BpButton href="/strategy-session">Book a strategy session</BpButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection />
    </>
  );
}
