import Link from "next/link";
import Icon, { IconName } from "./Icon";
import { QA } from "./FAQ";
import BlueprintFaq from "./BlueprintFaq";
import BlueprintMotion from "./BlueprintMotion";
import CTASection from "./CTASection";
import { Breadcrumbs } from "./blocks";
import { SectionHead, RuleLabel, BpButton, PAGE } from "./blueprint";
import { site } from "@/lib/site";

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

/**
 * Category hub for the India tree. Deliberately simpler than the US HubPage,
 * which carries cross-sell bands and an AI layer strip that make no sense here:
 * in India the categories are separate purchases, so each hub only has to
 * explain its own and point at the next one.
 */
export type IndiaHubConfig = {
  slug: string;
  eyebrow: string;
  aside: string;
  h1: React.ReactNode;
  heroSub: string;
  servicesTitle: string;
  servicesSub: string;
  services: { icon: IconName; title: string; desc: string; href: string }[];
  /** Optional highlighted band, used by the AI hub to surface the FDE page. */
  feature?: { kicker: string; title: string; body: string; href: string; cta: string };
  whyTitle: string;
  why: { icon: IconName; title: string; desc: string }[];
  faq: QA[];
  related: { label: string; href: string }[];
  cta: { title: string; body: string };
};

export default function IndiaHubPage({ config: c }: { config: IndiaHubConfig }) {
  const total = c.feature ? "04" : "03";
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: c.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            serviceType: c.eyebrow,
            provider: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
            areaServed: ["India"],
          }),
        }}
      />
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
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: c.eyebrow }]} tone="light" />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              {c.eyebrow}
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              {c.aside}
            </span>
          </div>
          <h1 className="mt-8 max-w-[17ch] animate-rise-in font-display text-[40px] font-bold leading-[0.98] tracking-[-0.05em] text-bp-ink sm:text-[58px] lg:text-[78px]">
            {c.h1}
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            {c.heroSub}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BpButton href="/in/strategy-session">Book a strategy session</BpButton>
            <BpButton href="/in/work" variant="outline">
              See our work
            </BpButton>
          </div>
        </div>
      </section>

      {/* 01 SERVICES */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="01" total={total} eyebrow="What we do" title={c.servicesTitle} sub={c.servicesSub} />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {c.services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="group flex flex-col border-b border-r border-bp-edge bg-white p-7 transition-shadow duration-250 hover:shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)] lg:p-8"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700 transition-colors group-hover:border-brand-300">
                  <Icon name={s.icon} className="h-[21px] w-[21px]" />
                </span>
                <h3 className="mt-6 font-display text-[19px] font-bold leading-[1.22] tracking-[-0.024em] text-bp-ink">
                  {s.title}
                </h3>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-bp-mute">{s.desc}</p>
                <span className="mt-6 inline-flex items-center gap-2.5 font-mono text-[12px] font-semibold tracking-[0.06em] text-brand-700 transition-all group-hover:gap-4">
                  Learn more
                  <Icon name="arrow" className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 02 FEATURE */}
      {c.feature && (
        <section data-reveal className="border-b border-bp-line bg-bp-ink">
          <div className={`${PAGE} py-20 lg:py-[110px]`}>
            <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
              <div>
                <RuleLabel tone="dark">{c.feature.kicker}</RuleLabel>
                <h2 className="mt-6 max-w-[16ch] font-display text-[30px] font-bold leading-[1.06] tracking-[-0.038em] text-white lg:text-[42px]">
                  {c.feature.title}
                </h2>
              </div>
              <div>
                <p className="m-0 max-w-[62ch] text-[17px] leading-[1.75] text-white/70">
                  {c.feature.body}
                </p>
                <div className="mt-8">
                  <Link
                    href={c.feature.href}
                    className="group inline-flex h-14 items-center bg-white pl-7 font-mono text-[13px] font-semibold tracking-[0.06em] text-bp-ink transition-colors hover:bg-brand-300"
                  >
                    {c.feature.cta}
                    <span className="ml-4 flex h-14 w-14 items-center justify-center border-l border-bp-ink/15">
                      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* WHY */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no={c.feature ? "03" : "02"}
            total={total}
            eyebrow="Why us"
            title={c.whyTitle}
          />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 sm:grid-cols-2">
            {c.why.map((w) => (
              <div
                key={w.title}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="border-b border-r border-bp-line bg-white p-7 lg:p-9"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                  <Icon name={w.icon} className="h-[21px] w-[21px]" />
                </span>
                <h3 className="mt-6 font-display text-[20px] font-bold tracking-[-0.026em] text-bp-ink">
                  {w.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-bp-mute">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no={total} total={total} eyebrow="Questions" title="What buyers ask us." />
          <div className="mx-auto mt-11 max-w-[1080px] lg:mt-16">
            <BlueprintFaq items={c.faq} />
          </div>
          <div className="mt-12 border-t border-bp-edge pt-8">
            <RuleLabel>Related</RuleLabel>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {c.related.map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="border border-[#D8E1EC] bg-white px-4 py-2.5 font-mono text-[12px] tracking-[0.06em] text-bp-mute transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={c.cta.title}
        body={c.cta.body}
        primary={{ label: "Book a strategy session", href: "/in/strategy-session" }}
        secondary={{ label: "See our work", href: "/in/work" }}
      />
    </>
  );
}
