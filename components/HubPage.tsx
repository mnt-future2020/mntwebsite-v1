import Link from "next/link";
import Icon, { IconName } from "./Icon";
import Reveal from "./Reveal";
import FAQ, { QA } from "./FAQ";
import { site } from "@/lib/site";
import CTASection from "./CTASection";
import { SectionHead, RuleLabel, BpButton, PAGE } from "./blueprint";
import BlueprintFaq from "./BlueprintFaq";
import BlueprintMotion from "./BlueprintMotion";
import BrandLogo from "./BrandLogo";
import { Breadcrumbs } from "./blocks";

export type HubConfig = {
  vertical: string;
  breadcrumb: { label: string; href?: string }[];
  eyebrow: string;
  h1: string;
  heroSub: string;
  heroChips: string[];
  heroImage: string;
  servicesTitle: React.ReactNode;
  servicesSub: string;
  services: { icon: IconName; title: string; desc: string; href?: string }[];
  diff: {
    eyebrow: string;
    title: React.ReactNode;
    sub: string;
    points: string[];
  };
  audiencesTitle: string;
  audiences: { icon: IconName; title: string; desc: string }[];
  stats: { value: string; label: string }[];
  addOns?: { icon: IconName; title: string; desc: string }[];
  /** Smaller ways in that graduate into a full build. Rendered as slim bands
      below the flagship services grid, never as equal cards in it. */
  crossSell?: { logoSlug?: string; icon?: IconName; kicker: string; title: string; desc: string; href: string; cta: string }[];
  /** A capability that runs through every build rather than sitting beside it.
      Rendered as its own band under the services grid, so it reads as part of
      the platform and not as a second thing the company sells. */
  layer?: {
    eyebrow: string;
    title: React.ReactNode;
    sub: string;
    href: string;
    cta: string;
    items: { icon: IconName; title: string; desc: string; href: string }[];
  };
  faq: QA[];
  cta: { title: string; body: string };
};

export default function HubPage({ config }: { config: HubConfig }) {
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
    serviceType: config.h1,
    provider: { "@type": "Organization", name: site.name, legalName: site.legalName },
    areaServed: ["United States"],
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
              {config.vertical}
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
            <BpButton href="/strategy-session">Book a strategy session</BpButton>
          </div>
          <div className="mt-10 grid border-l border-t border-bp-hair sm:grid-cols-2 lg:grid-cols-4">
            {config.heroChips.map((c, i) => (
              <div key={c} className="flex items-baseline gap-3 border-b border-r border-bp-hair px-5 py-4">
                <span className="font-mono text-[11px] sm:text-[11px] tracking-[0.12em] text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[12.5px] leading-[1.5] text-[#334458]">{c}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mx-auto max-w-[1440px] px-[18px] pb-20 pt-20 sm:px-8 lg:px-14 lg:pb-[120px] lg:pt-[120px]">
        <Reveal>
          <SectionHead no="01" total="04" eyebrow="What we build" title={config.servicesTitle} sub={config.servicesSub} />
        </Reveal>
        <div className="mt-[52px] grid gap-[22px] md:grid-cols-2">
          {config.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <Link
                href={s.href ?? "/contact"}
                className="group flex h-full flex-col border border-bp-edge bg-white p-8 shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_16px_36px_-16px_rgba(14,102,194,0.22)]"
              >
                <div className="font-display text-[13px] font-bold text-brand-700">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3.5 font-display text-[21px] font-bold text-bp-ink">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{s.desc}</p>
                <span className="mt-auto inline-flex items-center gap-[7px] pt-5 text-sm font-semibold text-brand-700">
                  {s.href ? "Explore this service" : "Talk to us about this"}
                  <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {config.crossSell?.map((x, i) => (
          <Reveal key={x.href} delay={280 + i * 60}>
            <Link
              href={x.href}
              className="group mt-[22px] flex flex-col gap-4 border border-bp-edge bg-slate-50 px-7 py-6 transition-all duration-[250ms] hover:border-brand-200 hover:bg-white hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)] sm:flex-row sm:items-center"
            >
              {(x.logoSlug || x.icon) && (
                <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-bp-edge bg-white">
                  {x.logoSlug ? (
                    <BrandLogo slug={x.logoSlug} className="h-6 w-6" />
                  ) : (
                    <Icon name={x.icon!} className="h-[22px] w-[22px] text-brand-700" />
                  )}
                </span>
              )}
              <span className="flex-1">
                <span className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-brand-700">
                  {x.kicker}
                </span>
                <span className="mt-1 block font-display text-[17px] font-bold text-bp-ink">
                  {x.title}
                </span>
                <span className="mt-1 block text-[13.5px] leading-relaxed text-bp-mute">{x.desc}</span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-[7px] py-1.5 text-sm font-semibold text-brand-700">
                {x.cta}
                <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </Reveal>
        ))}
      </section>

      {/* LAYER: a capability that runs through the builds above */}
      {config.layer && (
        <section id="ai" className="border-y border-bp-line bg-bp-wash py-24">
          <div className="mx-auto max-w-[1440px] px-[18px] sm:px-8 lg:px-14">
            <Reveal>
              <SectionHead
                no="02"
                total="04"
                eyebrow={config.layer.eyebrow}
                title={config.layer.title}
                sub={config.layer.sub}
              />
            </Reveal>
            <div className="mt-[52px] grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
              {config.layer.items.map((s, i) => (
                <Reveal key={s.title} delay={i * 70}>
                  <Link
                    href={s.href}
                    className="group flex h-full flex-col border border-bp-edge bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]"
                  >
                    <div className="flex h-[46px] w-[46px] items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                      <Icon name={s.icon} className="h-[23px] w-[23px]" />
                    </div>
                    <h3 className="mt-[18px] font-display text-[18px] font-bold text-bp-ink">{s.title}</h3>
                    <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{s.desc}</p>
                    <span className="mt-auto inline-flex items-center gap-[7px] pt-4 text-[13.5px] font-semibold text-brand-700">
                      Explore this
                      <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal delay={240}>
              <div className="mt-9 flex justify-center">
                <Link
                  href={config.layer.href}
                  className="inline-flex items-center gap-2 border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-bp-ink transition-colors hover:border-brand-300 hover:text-brand-700"
                >
                  {config.layer.cta}
                  <Icon name="arrow" className="h-[15px] w-[15px]" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* DIFFERENTIATOR + STATS */}
      <section className="bg-bp-wash py-24">
        <div className="mx-auto grid max-w-[1440px] items-start gap-14 px-[18px] sm:px-8 lg:grid-cols-2 lg:px-14">
          <Reveal>
            <SectionHead no="03" total="04" eyebrow={config.diff.eyebrow} title={config.diff.title} sub={config.diff.sub} />
            <div className="mt-8 flex flex-col gap-4">
              {config.diff.points.map((p) => (
                <div key={p} className="flex items-start gap-[13px]">
                  <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  <span className="text-[14.5px] leading-relaxed text-slate-700">{p}</span>
                </div>
              ))}
            </div>
            <Link
              href="/security-compliance"
              className="mt-8 inline-flex items-center gap-[7px] py-1.5 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              How we engineer compliance <Icon name="arrow" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-bp-edge bg-white p-8 shadow-[0_1px_3px_rgba(14,27,46,0.05)] sm:p-10">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {config.stats.map((s) => (
                  <div key={s.label} className="border-l-[3px] border-brand-200 pl-3.5">
                    <div className="font-display text-[23px] font-bold text-bp-ink">{s.value}</div>
                    <div className="mt-1 text-[12.5px] leading-normal text-slate-500">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-7">
        <Reveal>
          <SectionHead no="02" total="04" eyebrow="Who we serve" title={config.audiencesTitle} />
        </Reveal>
        <div className="mt-[52px] grid gap-[22px] md:grid-cols-3">
          {config.audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <div className="h-full border border-bp-edge bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]">
                <div className="flex h-[46px] w-[46px] items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                  <Icon name={a.icon} className="h-[23px] w-[23px]" />
                </div>
                <h3 className="mt-[18px] font-display text-[19px] font-bold text-bp-ink">{a.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-bp-line bg-bp-wash py-24">
        <div className="mx-auto max-w-[860px] px-5 sm:px-7">
          <Reveal>
            <SectionHead no="03" total="04" eyebrow="FAQ" title="Questions buyers ask us first" />
          </Reveal>
          <BlueprintFaq items={config.faq} />
        </div>
      </section>

      {config.addOns && config.addOns.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-24 sm:px-7">
          <Reveal>
            <SectionHead no="04" total="04" eyebrow="Add-ons" title="Bundle these onto any build" />
          </Reveal>
          <div className="mt-[52px] grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
            {config.addOns.map((a, i) => (
              <Reveal key={a.title} delay={i * 70}>
                <div className="h-full border border-bp-edge bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]">
                  <div className="flex h-[46px] w-[46px] items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                    <Icon name={a.icon} className="h-[23px] w-[23px]" />
                  </div>
                  <h3 className="mt-[18px] font-display text-[19px] font-bold text-bp-ink">{a.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{a.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <div className={config.addOns && config.addOns.length > 0 ? "" : "pt-24"}>
        <CTASection title={config.cta.title} body={config.cta.body} />
      </div>
    </>
  );
}
