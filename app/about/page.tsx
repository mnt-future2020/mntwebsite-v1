import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeading, Process, Stat, Breadcrumbs } from "@/components/blocks";
import { images } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/about", {
    title: "About MnT — Magizh NexGen Technologies",
    description:
      "MnT (Magizh NexGen Technologies) — a healthcare & e-commerce software development company. A senior team building compliant platforms, India and global.",
  });
}

const values = [
  { icon: "compass" as const, title: "Depth over breadth", desc: "We chose two verticals and went deep. Specialism is how we ship better, faster, and more compliant software than generalists." },
  { icon: "shield" as const, title: "Honesty over hype", desc: "Realistic timelines, honest budgets, and a recommendation that's right for your stage — even when it's not the biggest contract." },
  { icon: "users" as const, title: "Senior by default", desc: "Your software is written by engineers who've shipped regulated, high-traffic systems — not juniors learning on your budget." },
  { icon: "bolt" as const, title: "Outcomes over output", desc: "We measure success in launched products, passed audits, and revenue moved — not hours billed or tickets closed." },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-50" />
        <div className="pointer-events-none absolute -left-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-navy" />
        <div className="container-mnt relative pb-20 pt-10 sm:pb-24 sm:pt-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "About" }]} />
          <div className="mt-8 max-w-3xl animate-fade-up">
            <span className="eyebrow-dark">About MnT</span>
            <h1 className="mt-6 font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-tight sm:text-[3.4rem]">
              A senior team that builds two things exceptionally well.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              MnT — Magizh NexGen Technologies — is a healthcare and e-commerce software
              development company. We deliberately don&apos;t build everything. We build compliant
              healthcare platforms and high-growth commerce stores, for clients across India and
              global markets.
            </p>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="container-mnt py-20 sm:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our approach"
              title="Why we said no to being a generalist."
              subtitle="Most software agencies say they build everything. That breadth is exactly why so much custom software is mediocre."
            />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slatey">
              <p>
                We made a different bet: go deep in two verticals where engineering quality and
                compliance genuinely decide whether a product succeeds — <strong className="text-ink">healthcare</strong> and{" "}
                <strong className="text-ink">e-commerce</strong>.
              </p>
              <p>
                In healthcare, that means platforms that pass HIPAA and ABDM/FHIR certification and
                hold up in clinical reality. In commerce, it means stores engineered for conversion,
                Core Web Vitals, and scale. One senior team, two specialisms, no dilution.
              </p>
              <p>
                And for funded startups in both verticals, we go further than client work — we build
                the <strong className="text-ink">vertical SaaS</strong> product itself: the
                multi-tenant, subscription platform you take to market, from first MVP to a system
                ready to raise on.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/healthcare-software-development" className="btn-ghost">
                <Icon name="stethoscope" className="h-4 w-4" /> Healthcare
              </Link>
              <Link href="/ecommerce-development" className="btn-ghost">
                <Icon name="cart" className="h-4 w-4" /> E-Commerce
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-soft shadow-card">
              <div className="img-zoom relative h-60 w-full sm:h-72">
                <Image
                  src={images.team}
                  alt="The MnT engineering team at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 sm:p-10">
                <div className="grid grid-cols-2 gap-6">
                  <Stat value="2" label="Deep specialisms" />
                  <Stat value="100%" label="Senior delivery" />
                  <Stat value="5+" label="Compliance frameworks" />
                  <Stat value="4" label="Markets — India · US · Gulf · EU" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-soft py-20 sm:py-28">
        <div className="container-mnt">
          <SectionHeading eyebrow="What we value" title="The principles we hire and build by." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <SpotlightCard className="card card-hover group h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={v.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{v.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slatey">{v.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="container-mnt py-20 sm:py-28">
        <SectionHeading
          eyebrow="How we work"
          title="Discovery → Build → Certify → Scale"
          subtitle="A delivery model built for regulated, revenue-critical software — transparent, senior-led, and shipping working software every sprint."
        />
        <div className="mt-14">
          <Process />
        </div>
      </section>

      <CTASection />
    </>
  );
}
