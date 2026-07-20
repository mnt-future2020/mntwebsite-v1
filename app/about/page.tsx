import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import Partners from "@/components/Partners";
import SectionTitle from "@/components/SectionTitle";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/about", {
    title: "About MnT Future: AI-Native Commerce Engineering",
    description:
      "MnT Future builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands. A senior team: land small, expand big.",
  });
}

const aboutPoints = [
  "AI-native by default: search, recommendations, assistants and agents built into the product, gated behind evaluations.",
  "Agent-ready before your competitors: ACP, Google UCP, and a Retail MCP server for the emerging agentic channel.",
  "Land small, expand big: start with a productized pilot, grow into a dedicated pod, expand into a full platform build.",
];

const values = [
  { icon: "compass" as const, title: "Depth over breadth", desc: "We chose two verticals and went deep. Specialism is how we ship better, faster, and more compliant software than generalists." },
  { icon: "shield" as const, title: "Honesty over hype", desc: "Realistic timelines, honest budgets, and a recommendation that's right for your stage: even when it's not the biggest contract." },
  { icon: "users" as const, title: "Senior by default", desc: "Your software is written by engineers who've shipped regulated, high-traffic systems, not juniors learning on your budget." },
  { icon: "bolt" as const, title: "Outcomes over output", desc: "We measure success in launched products, passed audits, and revenue moved, not hours billed or tickets closed." },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-line bg-gradient-to-b from-mist to-white">
        <div className="mx-auto max-w-[1200px] px-5 pb-[72px] pt-[72px] sm:px-7 lg:pt-[88px]">
          <div className="animate-fade-up">
            <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">
              About MnT Future
            </div>
            <h1 className="mt-[18px] max-w-[860px] font-display text-[34px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[46px]">
              A senior engineering team for the agentic-commerce era.
            </h1>
            <p className="mt-5 max-w-[660px] text-[17px] leading-[1.65] text-slatey">
              MnT Future (Magizh NexGen Technologies) builds AI-native, agent-ready commerce
              platforms for US D2C and marketplace brands: headless &amp; marketplace builds,
              integrations, B2B, and AI agents that sell in the new agentic channels.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-[1200px] px-5 py-[72px] sm:px-7 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_20px_50px_-24px_rgba(14,27,46,0.2)]">
              <Image
                src="/images/about-team.jpg"
                alt="MnT Future team"
                width={1600}
                height={1068}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="block h-[300px] w-full object-cover sm:h-[400px]"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <h2 className="font-display text-[26px] font-bold text-ink sm:text-[30px]">
              Senior engineers, end to end.
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-[1.7] text-slatey">
              No juniors learning on your budget. We architect, build, and operate revenue-critical
              commerce, with ADA/WCAG, PCI DSS v4.0.1, and multi-state sales-tax compliance
              engineered in from day one.
            </p>
            <div className="mt-[30px] flex flex-col gap-4">
              {aboutPoints.map((p) => (
                <div key={p} className="flex items-start gap-[13px]">
                  <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                    <Icon name="check" className="h-3 w-3" />
                  </span>
                  <span className="text-[14.5px] leading-[1.6] text-slate-700">{p}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-y border-line bg-mist py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <Reveal>
            <SectionTitle eyebrow="What we value" title="The principles we hire and build by." />
          </Reveal>
          <div className="mt-[52px] grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full rounded-[14px] border border-slate-200 bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                    <Icon name={v.icon} className="h-[23px] w-[23px]" />
                  </div>
                  <h3 className="mt-[18px] font-display text-[19px] font-bold text-ink">{v.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-slatey">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Partners />

      <div className="pt-24">
        <CTASection />
      </div>
    </>
  );
}
