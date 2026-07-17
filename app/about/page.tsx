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
    title: "About MnT Future — AI-Native Commerce Engineering",
    description:
      "MnT Future builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands. A senior team — land small, expand big.",
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
            <span className="eyebrow-dark">About MnT Future</span>
            <h1 className="mt-6 font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-tight sm:text-[3.4rem]">
              A senior team building commerce ready for AI.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              MnT Future builds AI-native, agent-ready commerce platforms
              for US D2C and marketplace brands. We deliberately don&apos;t build everything. We build
              commerce, and the AI that sells it.
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
                We made a different bet: focus on US commerce, where engineering quality, conversion,
                and compliance genuinely decide whether a brand wins — and where AI is rewriting how
                people, and now <strong className="text-ink">agents</strong>, buy.
              </p>
              <p>
                On the platform side, that means <strong className="text-ink">headless &amp; marketplace
                builds</strong>, integrations, and B2B — engineered for Core Web Vitals, scale, and US
                compliance (ADA, PCI DSS, sales-tax). On the <strong className="text-ink">AI &amp; agents</strong>{" "}
                side, it means search, recommendations, embedded agents, and making your store agent-ready
                for the emerging $900B–$1T channel.
              </p>
              <p>
                We <strong className="text-ink">land small and expand big</strong>: a productized pilot
                that proves ROI in weeks, a dedicated pod as you grow, and a full platform build when
                you&apos;re ready. One senior team, no dilution.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/commerce" className="btn-ghost">
                <Icon name="store" className="h-4 w-4" /> Commerce Platforms
              </Link>
              <Link href="/ai-agents" className="btn-ghost">
                <Icon name="ai" className="h-4 w-4" /> AI &amp; Agents
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="group overflow-hidden rounded-[2rem] border border-slate-100 bg-soft shadow-card">
              <div className="img-zoom relative h-60 w-full sm:h-72">
                <Image
                  src={images.team}
                  alt="The MnT Future engineering team at work"
                  fill
                  sizes="(max-width: 1024px) 100vw, 48vw"
                  className="object-cover"
                />
              </div>
              <div className="p-8 sm:p-10">
                <div className="grid grid-cols-2 gap-6">
                  <Stat value="8" label="Commerce &amp; AI services" />
                  <Stat value="100%" label="Senior delivery" />
                  <Stat value="US" label="D2C &amp; marketplace focus" />
                  <Stat value="AI-native" label="Agent-ready by design" />
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
          subtitle="A delivery model built for revenue-critical commerce — transparent, senior-led, and shipping working software every sprint."
        />
        <div className="mt-14">
          <Process />
        </div>
      </section>

      <CTASection />
    </>
  );
}
