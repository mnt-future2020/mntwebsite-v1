import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import Partners from "@/components/Partners";
import SectionTitle from "@/components/SectionTitle";
import ClutchWidget from "@/components/ClutchWidget";
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
  "Agent-ready commerce: ACP, Google UCP, and a Retail MCP server for the emerging agentic channel.",
  "Land small, expand big: start with a productized pilot, grow into a dedicated pod, expand into a full platform build.",
];

const values = [
  { icon: "compass" as const, title: "Depth over breadth", desc: "We build commerce platforms and nothing else. Specialism is how we ship better, faster software, and know the US compliance surface before we hit it." },
  { icon: "shield" as const, title: "Honesty over hype", desc: "Realistic timelines, honest budgets, and a recommendation that's right for your stage: even when it's not the biggest contract." },
  { icon: "users" as const, title: "Senior by default", desc: "Your software is written by engineers who've shipped regulated, high-traffic systems, not juniors learning on your budget." },
  { icon: "bolt" as const, title: "Outcomes over output", desc: "We measure success in launched products, clean audit findings, and revenue moved, not hours billed or tickets closed." },
];

export default function About() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className="mx-auto max-w-[1200px] px-5 pb-[72px] pt-[72px] sm:px-7 lg:pt-[88px]">
          <div className="animate-fade-up">
            <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">
              About MnT Future
            </div>
            <h1 className="mt-[18px] max-w-[860px] font-display text-[34px] font-extrabold leading-[1.12] tracking-[-0.02em] text-bp-ink sm:text-[46px]">
              A senior engineering team for the agentic-commerce era.
            </h1>
            <p className="mt-5 max-w-[660px] text-[17px] leading-[1.65] text-bp-mute">
              MnT Future builds AI-native, agent-ready commerce
              platforms for US D2C and marketplace brands: custom storefronts &amp; marketplaces,
              integrations, B2B, and AI agents that sell in the new agentic channels.
            </p>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="mx-auto max-w-[1200px] px-5 py-[72px] sm:px-7 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden border border-bp-edge shadow-[0_20px_50px_-24px_rgba(14,27,46,0.2)]">
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
            <h2 className="font-display text-[26px] font-bold text-bp-ink sm:text-[30px]">
              Senior engineers, end to end.
            </h2>
            <p className="mt-3.5 text-[15.5px] leading-[1.7] text-bp-mute">
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
      <section className="border-y border-bp-line bg-bp-wash py-24">
        <div className="mx-auto max-w-[1440px] px-[18px] sm:px-8 lg:px-14">
          <Reveal>
            <SectionTitle eyebrow="What we value" title="The principles we hire and build by." />
          </Reveal>
          <div className="mt-[52px] grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="h-full border border-bp-edge bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]">
                  <div className="flex h-[46px] w-[46px] items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                    <Icon name={v.icon} className="h-[23px] w-[23px]" />
                  </div>
                  <h3 className="mt-[18px] font-display text-[19px] font-bold text-bp-ink">{v.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-7">
        <Reveal>
          <SectionTitle
            eyebrow="Who you'll work with"
            title="Founder-led, end to end."
            sub="No account managers in the middle. The person in your strategy session is the person accountable for your build."
          />
        </Reveal>
        <div className="mx-auto mt-[52px] grid max-w-[1000px] gap-6 md:grid-cols-2">
          {[
            {
              photo: "/images/founder.jpg",
              alt: "Udhayaseelan Renganathan, founder and CEO of MnT Future",
              name: "Udhayaseelan Renganathan",
              role: "Founder & CEO, MnT Future",
              bio: "Leads MnT Future end to end and stays accountable for every build the team ships.",
              linkedin: "https://www.linkedin.com/in/udhayaseelan-renganathan/",
              email: "udhay@mntfuture.com",
            },
            {
              photo: "/images/advisor-syed.jpg",
              alt: "Syed Asrar Ahmed, Chief Tech Consultant at MnT Future",
              name: "Syed Asrar Ahmed",
              role: "Chief Tech Consultant, Commerce Clients",
              bio: "Your first call is with him: Syed runs the strategy sessions for our commerce clients, from diagnosis to the recommendation brief.",
              linkedin: "https://www.linkedin.com/in/syed-asrar-ahmed-advisor/",
              email: "syed@mntfuture.com",
            },
          ].map((person, i) => (
            <Reveal key={person.name} delay={100 + i * 80}>
              <div className="flex h-full flex-col items-center gap-5 border border-bp-edge bg-white p-8 text-center shadow-[0_1px_3px_rgba(14,27,46,0.05)]">
                <Image
                  src={person.photo}
                  alt={person.alt}
                  width={400}
                  height={400}
                  className="h-24 w-24 shrink-0 rounded-full border-2 border-bp-edge object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <h3 className="font-display text-[21px] font-bold text-bp-ink">{person.name}</h3>
                  <div className="mt-0.5 text-[13.5px] font-semibold text-brand-700">{person.role}</div>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{person.bio}</p>
                  <div className="mt-4 flex flex-wrap justify-center gap-3 pt-1">
                    <a
                      href={person.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-bp-edge px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      <Icon name="linkedin" className="h-4 w-4" /> LinkedIn
                    </a>
                    <a
                      href={`mailto:${person.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-bp-edge px-4 py-2 text-[13px] font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:text-brand-700"
                    >
                      <Icon name="mail" className="h-4 w-4" /> {person.email}
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={160}>
          <div className="mt-8 flex justify-center">
            <ClutchWidget className="w-fit border border-bp-edge bg-white px-4 py-2.5 shadow-[0_1px_3px_rgba(14,27,46,0.05)]" />
          </div>
        </Reveal>
      </section>

      <Partners />

      <div className="pt-24">
        <CTASection />
      </div>
    </>
  );
}
