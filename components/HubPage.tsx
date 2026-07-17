import Link from "next/link";
import Image from "next/image";
import Icon, { IconName } from "./Icon";
import Reveal from "./Reveal";
import Counter from "./Counter";
import FAQ, { QA } from "./FAQ";
import { site } from "@/lib/site";
import CTASection from "./CTASection";
import StackMarquee from "./StackMarquee";
import SpotlightCard from "./SpotlightCard";
import { SectionHeading, ServiceCard, Process, CheckList, Breadcrumbs } from "./blocks";

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

      {/* HERO */}
      <section className="relative overflow-hidden bg-deep text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-50" />
        <div className="pointer-events-none absolute -left-40 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-navy" />
        <div className="container-mnt relative pb-20 pt-10 sm:pt-12">
          <Breadcrumbs trail={config.breadcrumb} />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="animate-fade-up">
              <span className="eyebrow-dark">{config.eyebrow}</span>
              <h1 className="mt-6 font-display text-[2.3rem] font-extrabold leading-[1.08] tracking-tight sm:text-[3.2rem]">
                {config.h1}
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">{config.heroSub}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link href="/contact" className="btn-primary">
                  Book a workshop <Icon name="arrow" className="h-4 w-4" />
                </Link>
                <Link href="#services" className="btn-outline-light">
                  See what we build
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-xs font-medium text-white/55">
                {config.heroChips.map((c) => (
                  <span key={c} className="inline-flex items-center gap-2">
                    <Icon name="check" className="h-4 w-4 text-brand-300" />
                    {c}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 shadow-2xl">
                <Image
                  src={config.heroImage}
                  alt={config.h1}
                  width={1400}
                  height={1100}
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="h-[320px] w-full object-cover sm:h-[420px]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/55 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container-mnt py-20 sm:py-28">
        <SectionHeading eyebrow="What we build" title={config.servicesTitle} subtitle={config.servicesSub} />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.services.map((s, i) => (
            <ServiceCard key={s.title} icon={s.icon} title={s.title} desc={s.desc} href={s.href} index={i} />
          ))}
        </div>
      </section>

      {/* STACK STRIP */}
      <section className="border-y border-slate-100 bg-white py-12">
        <p className="container-mnt text-center text-xs font-semibold uppercase tracking-[0.18em] text-slatey">
          The modern, proven stack we build on
        </p>
        <StackMarquee className="mt-8" />
      </section>

      {/* DIFFERENTIATOR */}
      <section className="bg-soft py-20 sm:py-28">
        <div className="container-mnt grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading align="left" eyebrow={config.diff.eyebrow} title={config.diff.title} subtitle={config.diff.sub} />
            <div className="mt-8">
              <CheckList items={config.diff.points} />
            </div>
            <Link href="/security-compliance" className="link-arrow mt-8">
              How we engineer compliance <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative overflow-hidden rounded-[2rem] bg-deep p-8 text-white shadow-glow sm:p-10">
              <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-brand/30 blur-2xl" />
              <div className="grid grid-cols-2 gap-5">
                {config.stats.map((s) => (
                  <div key={s.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="font-display text-3xl font-extrabold text-white">
                      <Counter value={s.value} />
                    </div>
                    <div className="mt-1.5 text-xs leading-snug text-white/60">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section className="container-mnt py-20 sm:py-28">
        <SectionHeading eyebrow="Who we serve" title={config.audiencesTitle} />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {config.audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 80}>
              <SpotlightCard className="card card-hover group h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={a.icon} className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slatey">{a.desc}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-soft py-20 sm:py-28">
        <div className="container-mnt">
          <SectionHeading
            eyebrow="How we work"
            title="Discovery → Build → Certify → Scale"
            subtitle="A delivery model built for revenue-critical commerce — predictable, transparent, and senior-led."
          />
          <div className="mt-14">
            <Process />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-mnt py-20 sm:py-28">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions buyers ask us first"
          subtitle="Short, direct answers — the same ones we give on a discovery call."
        />
        <div className="mt-12">
          <FAQ items={config.faq} />
        </div>
      </section>

      {config.addOns && config.addOns.length > 0 && (
        <section className="bg-soft py-20 sm:py-28">
          <div className="container-mnt">
            <SectionHeading
              eyebrow="Add-ons"
              title="Bundle these onto any build"
              subtitle="Attach to a platform build — sold as part of the engagement, not standalone."
            />
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {config.addOns.map((a, i) => (
                <Reveal key={a.title} delay={i * 70}>
                  <SpotlightCard className="card card-hover group h-full">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon name={a.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink">{a.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-slatey">{a.desc}</p>
                  </SpotlightCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title={config.cta.title} body={config.cta.body} />
    </>
  );
}
