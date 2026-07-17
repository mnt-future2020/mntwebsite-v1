import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import StackMarquee from "@/components/StackMarquee";
import Partners from "@/components/Partners";
import SectionTitle from "@/components/SectionTitle";
import Testimonials from "@/components/Testimonials";
import FAQ, { QA } from "@/components/FAQ";
import { caseStudies } from "@/lib/caseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/", {
    title: "MnT Future — AI-Native, Agent-Ready Commerce Platforms for US Brands",
    description:
      "AI-native, agent-ready commerce platforms for US D2C & marketplace brands — headless & marketplace builds, integrations, B2B, and AI agents.",
  });
}

const proofStats = [
  { value: "AI-native", label: "Search, recs, assistants & agents built in" },
  { value: "Agent-ready", label: "ACP · Google UCP · Retail MCP" },
  { value: "US-compliant", label: "ADA · PCI DSS · sales-tax handled" },
  { value: "100%", label: "Senior-engineer delivery" },
];

const verticals = [
  {
    kicker: "Commerce Platforms",
    title: "Commerce platform development",
    desc: "Headless & marketplace builds, integrations & orchestration, B2B/wholesale, and managed commerce — with ADA, PCI DSS & US sales-tax handled.",
    href: "/commerce",
    image: "/images/vertical-commerce.jpg",
    alt: "Commerce platform development",
    items: ["Headless & marketplaces", "Integrations & orchestration", "B2B / wholesale", "Managed & compliant"],
    cta: "Explore commerce platforms",
  },
  {
    kicker: "AI & Agents",
    title: "AI & agents for commerce",
    desc: "AI search, recommendations & assistants, agent-ready commerce (ACP/UCP/MCP), embedded AI agents, and AI cleanup for MVPs that broke at scale.",
    href: "/ai-agents",
    image: "/images/vertical-ai.jpg",
    alt: "AI and agents for commerce",
    items: ["AI search & recommendations", "Agent-ready commerce", "Embedded AI agents", "AI cleanup"],
    cta: "Explore AI & agents",
  },
];

const whyMnt = [
  {
    icon: "ai" as const,
    title: "AI-native by default",
    desc: "AI search, recommendations, assistants, and agents — built into the product where they lift revenue and gated behind evaluations. Not a bolted-on chatbot.",
  },
  {
    icon: "network" as const,
    title: "Agent-ready before your competitors",
    desc: "ACP, Google UCP, and a Retail MCP server make your store discoverable and buyable by AI shopping agents — an emerging $900B–$1T channel.",
  },
  {
    icon: "shield" as const,
    title: "US compliance engineered in",
    desc: "ADA/WCAG accessibility, PCI DSS v4.0.1, and multi-state sales-tax handled from day one — the obligations that start the moment a US store goes live.",
  },
  {
    icon: "compass" as const,
    title: "Land small, expand big",
    desc: "Start with a productized pilot that proves ROI in weeks, grow into a dedicated pod, and expand into a full platform build — senior engineers the whole way.",
  },
];

const engagement = [
  {
    no: "01",
    title: "Land",
    desc: "A productized paid pilot that proves ROI in weeks — AI Commerce Starter, AI Cleanup, or an agent-readiness audit. Small scope, fast proof.",
    points: ["Fixed, focused scope", "Live in weeks", "Clear, measured outcome"],
    featured: false,
  },
  {
    no: "02",
    title: "Grow",
    desc: "A dedicated senior pod working as your embedded product team on a monthly retainer — flexing scope sprint to sprint.",
    points: ["Senior engineers", "Sprint flexibility", "Scales up or down"],
    featured: true,
  },
  {
    no: "03",
    title: "Expand",
    desc: "A full platform build — headless, marketplace, or B2B — engineered to scale, plus embedded AI agents and a managed SLA.",
    points: ["Full platform builds", "AI agents & automation", "Managed & compliant"],
    featured: false,
  },
];

const homeFaq: QA[] = [
  {
    q: "What is agent-ready commerce?",
    a: "Agent-ready commerce means AI shopping agents — like those in ChatGPT and Google — can discover your products, trust your price and inventory data, and complete a purchase. MnT Future makes your store agent-ready with structured product feeds, real-time sync, and the ACP, UCP, and MCP integrations agents use to buy.",
  },
  {
    q: "What does MnT Future build?",
    a: "MnT Future builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands: headless and marketplace builds, integrations and orchestration, B2B/wholesale, and managed commerce with US compliance — plus AI search, embedded AI agents, and agent-readiness.",
  },
  {
    q: "What is the Agentic Commerce Protocol (ACP)?",
    a: "ACP is an open standard from OpenAI and Stripe that lets AI agents complete purchases on a shopper's behalf. MnT Future implements ACP, Google's UCP, and a Retail MCP server so your store can be discovered and bought from in AI channels.",
  },
  {
    q: "Do you only work with US brands?",
    a: "Yes. MnT Future focuses on US D2C and marketplace brands, where our compliance depth — ADA/WCAG, PCI DSS v4.0.1, and multi-state sales-tax — and our agentic-commerce work are sharpest.",
  },
  {
    q: "How do we get started?",
    a: "Start with a free architecture workshop or a free agent-readiness audit. We sketch how we'd build it, or assess your AI-channel readiness, and give you a clear next step — no obligation.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  const featured = caseStudies[0];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Hero />

      {/* PROOF BAR + STACK */}
      <section className="border-b border-line pt-14">
        <p className="px-5 text-center text-[12.5px] font-semibold uppercase tracking-[0.14em] text-slate-500">
          Trusted to engineer revenue-critical commerce for US brands
        </p>
        <div className="mx-auto mt-9 grid max-w-[1200px] grid-cols-2 gap-y-8 px-5 sm:px-7 lg:grid-cols-4">
          {proofStats.map((s, i) => (
            <Reveal key={s.value}>
              <div className={`px-5 text-center ${i > 0 ? "border-l border-line" : ""}`}>
                <div className="font-display text-[26px] font-bold text-ink">{s.value}</div>
                <div className="mt-1.5 text-[13.5px] leading-normal text-slate-500">{s.label}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <StackMarquee className="mt-11 pb-11" />
      </section>

      <Partners />

      {/* TWO VERTICALS */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-7">
        <Reveal>
          <SectionTitle
            eyebrow="Two sides, one platform"
            title="Commerce platforms — and the AI that sells them."
            sub="We build the platform, then make it AI-native and agent-ready. Start on either side — most brands do both."
          />
        </Reveal>
        <div className="mt-[52px] grid gap-[26px] lg:grid-cols-2">
          {verticals.map((v, i) => (
            <Reveal key={v.kicker} delay={i * 100}>
              <Link
                href={v.href}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(14,27,46,0.05)] transition-all duration-[250ms] hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_44px_-18px_rgba(14,102,194,0.25)]"
              >
                <div className="relative h-[210px] overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute right-3.5 top-3.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-brand-700 shadow-[0_2px_8px_rgba(14,27,46,0.15)]">
                    4 services
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">
                    {v.kicker}
                  </div>
                  <h3 className="mt-2.5 font-display text-2xl font-bold text-ink">{v.title}</h3>
                  <p className="mt-[11px] text-[15px] leading-relaxed text-slatey">{v.desc}</p>
                  <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2.5 sm:grid-cols-2">
                    {v.items.map((it) => (
                      <span key={it} className="flex items-center gap-2 text-[13.5px] font-medium text-slate-700">
                        <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                          <Icon name="check" className="h-2.5 w-2.5" />
                        </span>
                        {it}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto inline-flex items-center gap-[7px] pt-[22px] text-sm font-semibold text-brand-700">
                    {v.cta}
                    <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY MNT */}
      <section className="border-y border-line bg-mist py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <Reveal>
            <SectionTitle
              eyebrow="Why MnT Future"
              title="The reasons founders pick us — and stay."
              sub="Specialist depth, compliance built into the architecture, AI where it counts, and the speed of a senior team."
            />
          </Reveal>
          <div className="mt-[52px] grid gap-[22px] md:grid-cols-2">
            {whyMnt.map((f, i) => (
              <Reveal key={f.title} delay={i * 70}>
                <div className="h-full rounded-[14px] border border-slate-200 bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]">
                  <div className="flex h-[46px] w-[46px] items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                    <Icon name={f.icon} className="h-[23px] w-[23px]" />
                  </div>
                  <h3 className="mt-[18px] font-display text-[19px] font-bold text-ink">{f.title}</h3>
                  <p className="mt-2.5 text-[14.5px] leading-[1.65] text-slatey">{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-7">
        <Reveal>
          <SectionTitle eyebrow="Engagement models" title="Work with us the way your stage demands." />
        </Reveal>
        <div className="mt-[52px] grid items-stretch gap-[22px] lg:grid-cols-3">
          {engagement.map((m, i) => (
            <Reveal key={m.title} delay={i * 80}>
              <div
                className={`relative flex h-full flex-col rounded-[14px] bg-white p-[30px] ${
                  m.featured
                    ? "border-2 border-brand-500 shadow-[0_20px_44px_-18px_rgba(32,149,241,0.3)]"
                    : "border border-slate-200 shadow-[0_1px_3px_rgba(14,27,46,0.04)]"
                }`}
              >
                {m.featured && (
                  <span className="absolute right-5 top-5 rounded-full bg-brand-700 px-3 py-[5px] text-[11px] font-semibold tracking-[0.04em] text-white">
                    MOST POPULAR
                  </span>
                )}
                <div className="font-display text-[13px] font-bold text-brand-700">{m.no}</div>
                <h3 className="mt-3.5 font-display text-2xl font-bold text-ink">{m.title}</h3>
                <p className="mt-[11px] text-[14.5px] leading-[1.65] text-slatey">{m.desc}</p>
                <div className="mt-[22px] flex flex-col gap-2.5">
                  {m.points.map((p) => (
                    <span key={p} className="flex items-center gap-[9px] text-[13.5px] font-medium text-slate-700">
                      <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-brand-700" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="border-y border-line bg-mist py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionTitle
                align="left"
                eyebrow="Selected work"
                title="Real platforms, shipped."
                sub="Live products we've designed and engineered end to end."
              />
              <Link
                href="/work"
                className="inline-flex shrink-0 items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-[22px] py-3 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                See all work
                <Icon name="arrow" className="h-[15px] w-[15px]" />
              </Link>
            </div>
          </Reveal>
          <div className="mt-11 grid gap-[22px] lg:grid-cols-2">
            <Reveal>
              <Link
                href={`/work/${featured.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(14,27,46,0.05)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(14,102,194,0.22)]"
              >
                <div className="relative aspect-[16/8] overflow-hidden border-b border-slate-200 bg-slate-100">
                  <Image
                    src={featured.cover}
                    alt={`${featured.title} — ${featured.tagline}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-[26px]">
                  <div className="text-xs font-semibold uppercase tracking-[0.1em] text-brand-700">
                    {featured.type}
                  </div>
                  <h3 className="mt-2.5 font-display text-[23px] font-bold text-ink">{featured.title}</h3>
                  <p className="mt-[9px] text-[14.5px] leading-relaxed text-slatey">{featured.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-[7px] pt-[18px] text-sm font-semibold text-brand-700">
                    Read the case study
                    <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex h-full flex-col justify-center rounded-2xl border border-dashed border-slate-300 bg-white p-9 text-center">
                <h3 className="font-display text-[21px] font-bold text-ink">Your platform here next?</h3>
                <p className="mx-auto mt-3 max-w-[360px] text-[14.5px] leading-relaxed text-slatey">
                  Book a free architecture workshop — we&apos;ll show you exactly how we&apos;d build
                  it: database design, APIs, scalability plan.
                </p>
                <div className="mt-[22px]">
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                  >
                    Book a workshop
                    <Icon name="arrow" className="h-[15px] w-[15px]" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section className="border-t border-line bg-mist py-24">
        <div className="mx-auto max-w-[860px] px-5 sm:px-7">
          <Reveal>
            <SectionTitle
              eyebrow="FAQ"
              title="Questions buyers ask us first"
              sub="Short, direct answers on agent-ready commerce, ACP, and how we work."
              className="mb-11"
            />
          </Reveal>
          <FAQ items={homeFaq} />
        </div>
      </section>

      <div className="pt-24">
        <CTASection />
      </div>
    </>
  );
}
