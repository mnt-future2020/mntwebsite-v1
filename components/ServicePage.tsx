import Link from "next/link";
import Icon, { IconName } from "./Icon";
import { QA } from "./FAQ";
import BlueprintFaq from "./BlueprintFaq";
import BlueprintMotion from "./BlueprintMotion";
import CTASection from "./CTASection";
import { Process, Breadcrumbs } from "./blocks";
import { SectionHead, RuleLabel, BpButton, PAGE } from "./blueprint";
import { site } from "@/lib/site";

// Cursor spotlight, driven by --mx/--my/--spot from BlueprintMotion.
const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

export type ServiceConfig = {
  slug: string; // full path e.g. /commerce/headless-marketplace
  parent: { label: string; href: string };
  breadcrumb: { label: string; href?: string }[];
  eyebrow: string;
  h1: string;
  heroSub: string;
  /**
   * Meta description, when the hero subtitle is the wrong length for one.
   * The hero has a whole column to fill and reads well at 190–210 characters;
   * a search result cuts off around 160, so reusing it verbatim truncated
   * mid-sentence on every India leaf page. Falls back to `heroSub`.
   */
  metaDescription?: string;
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
  cta: { title: string; body: string; primary?: { label: string; href: string }; secondary?: { label: string; href: string } };
  /** Defaults to the US, which is where most of these pages sell. */
  areaServed?: string[];
};

/** The five stages, in India's words: GST and on-prem, not ADA and PCI. */
const INDIA_PROCESS = [
  {
    title: "Discover",
    desc: "We map how your business actually sells, what your data looks like, and what reaching production would take. You get a costed path, not a proposal full of maybes.",
  },
  {
    title: "Design",
    desc: "Architecture, integrations and the checks we will be judged by. Agreed before anybody writes code, so nobody argues about done later.",
  },
  {
    title: "Build",
    desc: "Senior engineers writing code inside your environment, in two-week sprints. You watch it get built rather than waiting for a handover.",
  },
  {
    title: "Deploy",
    desc: "Live and monitored, on your own servers or private cloud where your data governance needs it. This is the stage most projects never reach.",
  },
  {
    title: "Optimize",
    desc: "Measured against the checks from stage two, tuned for cost, and watched. We stay until it runs without us.",
  },
];

export default function ServicePage({ config }: { config: ServiceConfig }) {
  // Every in-page link has to stay inside the region the page belongs to. The
  // slug already says which that is, so nothing has to be passed in.
  const india = config.slug.startsWith("/in/");
  const base = india ? "/in" : "";
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
    areaServed: config.areaServed ?? ["United States"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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
        <div
          className="pointer-events-none absolute -right-[220px] -top-[320px] h-[720px] w-[720px]"
          style={{ background: "radial-gradient(circle,rgba(32,149,241,0.09),transparent 62%)" }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-14 pt-8 lg:pb-20 lg:pt-11`}>
          <Breadcrumbs trail={config.breadcrumb} tone="light" />

          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              {config.eyebrow}
            </span>
            <span className="min-w-3 flex-1" />
          </div>

          <h1 className="mt-8 max-w-[19ch] animate-rise-in font-display text-[38px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[54px] lg:text-[72px]">
            {config.h1}
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            {config.heroSub}
          </p>

          <div className="mt-9 flex animate-rise-in flex-wrap gap-3 [animation-delay:200ms]">
            <BpButton href={`${base}/strategy-session`}>Book a strategy session</BpButton>
            <BpButton href={config.parent.href} variant="outline">
              Back to {config.parent.label}
            </BpButton>
          </div>

          <div className="mt-10 grid border-l border-t border-bp-hair sm:grid-cols-2 lg:grid-cols-4">
            {config.chips.map((c, i) => (
              <div
                key={c}
                className="flex items-baseline gap-3 border-b border-r border-bp-hair px-5 py-4"
              >
                <span className="font-mono text-[11px] sm:text-[10.5px] tracking-[0.12em] text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[12.5px] leading-[1.5] text-[#334458]">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO: answer-first for AEO */}
      <section data-reveal className="border-b border-bp-line">
        <div className="mx-auto max-w-[900px] px-[18px] py-16 text-center sm:px-8 lg:py-24">
          <h2 className="font-display text-[28px] font-bold tracking-[-0.035em] text-bp-ink sm:text-[38px]">
            {config.intro.title}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.75] text-bp-mute">{config.intro.body}</p>
        </div>
      </section>

      {/* FEATURES */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead no="01" total="03" eyebrow="What we build" title={config.featuresTitle} />
          <div className="mt-11 grid border-l border-t border-bp-edge md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {config.features.map((f, i) => {
              const body = (
                <>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-[46px] w-[46px] items-center justify-center bg-brand-500/[0.07] text-brand-700">
                      <Icon name={f.icon} className="h-[23px] w-[23px]" />
                    </span>
                    <span className="font-display text-[26px] font-extrabold tracking-[-0.04em] text-[#EAF0F7]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-[19px] font-bold tracking-[-0.022em] text-bp-ink">
                    {f.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.72] text-bp-mute">{f.desc}</p>
                </>
              );
              const cls =
                "flex h-full flex-col border-b border-r border-bp-edge bg-white p-7 shadow-[inset_3px_0_0_transparent] transition-shadow duration-200 hover:shadow-[inset_3px_0_0_#2095F1] lg:p-9";
              return f.href ? (
                <Link
                  key={f.title}
                  href={f.href}
                  data-stagger
                  data-spot
                  style={{ backgroundImage: SPOT }}
                  className={`group ${cls}`}
                >
                  {body}
                  <span className="mt-auto inline-flex items-center gap-2.5 pt-6 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-brand-700 transition-all group-hover:gap-4">
                    Explore this
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ) : (
                <div
                  key={f.title}
                  data-stagger
                  data-spot
                  style={{ backgroundImage: SPOT }}
                  className={cls}
                >
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section data-reveal className="border-b border-bp-line">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="02"
            total="03"
            eyebrow="Why MnT Future"
            title={config.approachTitle}
            sub={config.approachSub}
          />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 lg:grid-cols-2">
            {config.approachPoints.map((p, i) => (
              <div
                key={p}
                data-stagger
                className="flex items-start gap-4 border-b border-r border-bp-line px-6 py-7 lg:px-8"
              >
                <span className="mt-0.5 font-mono text-[11px] tracking-[0.12em] text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] leading-[1.7] text-[#334458]">{p}</span>
              </div>
            ))}
          </div>
          <Link
            href="/security-compliance"
            className="mt-9 inline-flex items-center gap-2.5 py-1.5 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-brand-700 transition-all hover:gap-4"
          >
            How we engineer compliance
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </Link>
        </div>
      </section>

      {/* PROCESS */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          {/*
            The method has a name, and it has to be the same name everywhere.

            These ten India leaf pages were rendering the US delivery model —
            four steps called "Discovery, build, certify, scale", verified
            against "ADA/WCAG, PCI DSS, SOC 2 controls" — while /in, /in/ai and
            the Forward Deployed Engineering page all say the method is
            Discover, Design, Build, Deploy, Optimize, and while /in sells
            having a documented method as the thing that separates us ("most
            firms selling AI services in India have no documented method at
            all"). A buyer who read the homepage and then clicked a service
            found a different method and three compliance regimes that do not
            apply to them.
          */}
          <SectionHead
            no="03"
            total="03"
            eyebrow="How we work"
            title={india ? "Discover, Design, Build, Deploy, Optimize." : "Discovery, build, certify, scale."}
            sub={
              india
                ? "Forward Deployed Engineering: senior engineers inside your team, on the same five stages every time."
                : "A senior-led delivery model built for revenue-critical commerce: predictable and transparent."
            }
          />
          <div className="mt-11 lg:mt-16">
            <Process steps={india ? INDIA_PROCESS : undefined} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal className="border-b border-bp-line">
        <div className="mx-auto max-w-[1080px] px-[18px] py-20 sm:px-8 lg:px-14 lg:py-[120px]">
          <RuleLabel>FAQ</RuleLabel>
          <h2 className="mt-6 font-display text-[30px] font-bold leading-[1.04] tracking-[-0.038em] text-bp-ink lg:text-[46px]">
            Questions buyers ask us first
          </h2>
          <BlueprintFaq items={config.faq} />
        </div>
      </section>

      {/* RELATED */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-12`}>
          <RuleLabel>Related {config.parent.label.toLowerCase()}</RuleLabel>
          <div className="mt-5 flex flex-wrap gap-2.5">
            {config.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-2.5 border border-[#D8E1EC] bg-white px-4 py-3 font-mono text-[12.5px] tracking-[0.04em] text-bp-ink transition-colors hover:border-brand-500 hover:text-brand-700"
              >
                {r.label}
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={config.cta.title}
        body={config.cta.body}
        {...(config.cta.primary ? { primary: config.cta.primary } : {})}
        {...(config.cta.secondary ? { secondary: config.cta.secondary } : {})}
      />
    </>
  );
}
