import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import Partners from "@/components/Partners";
import SectionTitle from "@/components/SectionTitle";
import Testimonials from "@/components/Testimonials";
import FAQ, { QA } from "@/components/FAQ";
import { caseStudies } from "@/lib/caseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/", {
    title: "MnT Future: AI-Native, Agent-Ready Commerce Platforms for US Brands",
    description:
      "MnT Future is an e-commerce development company building AI-native, agent-ready commerce platforms for US D2C & marketplace brands: custom storefronts & marketplaces, integrations, B2B, and AI agents.",
  });
}

const proofStats = [
  { value: "AI-native", label: "Search, recs, assistants & agents built in" },
  { value: "Agent-ready", label: "ACP · Google UCP · Retail MCP" },
  { value: "US-ready", label: "Built to ADA/WCAG · PCI scope minimised · sales-tax engine" },
  { value: "100%", label: "Senior-engineer delivery" },
];

// The platform, and the AI layer inside it. Not two businesses: the counts are
// deliberately uneven and the badges read from `count`, so they cannot drift
// out of step with the nav again.
const verticals = [
  {
    kicker: "Commerce Platforms",
    title: "Commerce platform development",
    desc: "Custom platform & marketplace builds, integrations & automation, B2B/wholesale, and managed commerce, built to ADA/WCAG with PCI scope minimised and the sales-tax engine integrated. Plus AI cleanup when an MVP broke at scale.",
    href: "/commerce",
    icon: "store" as const,
    count: "6 services",
    gradient: "from-brand-700 to-brand-900",
    items: [
      { label: "Custom platforms", href: "/commerce/headless-marketplace" },
      { label: "Integrations & automation", href: "/commerce/integrations" },
      { label: "B2B / wholesale", href: "/commerce/b2b-wholesale" },
      { label: "Managed & maintained", href: "/commerce/managed-compliance" },
    ],
    cta: "Explore commerce platforms",
  },
  {
    kicker: "The AI layer",
    title: "AI & agents for commerce",
    desc: "AI search, recommendations and a shopping assistant, agent-ready commerce (ACP/UCP/MCP), and agents that do real work. Part of every platform we build, and two of the three work on the store you already run.",
    href: "/ai-agents",
    icon: "ai" as const,
    count: "3 services",
    gradient: "from-[#3E51B6] to-[#2A367A]",
    items: [
      { label: "AI search & recommendations", href: "/ai-agents/commerce-starter" },
      { label: "Agent-ready commerce", href: "/ai-agents/agent-ready-commerce" },
      { label: "Custom AI agents", href: "/ai-agents/embedded-agents" },
    ],
    cta: "Explore AI & agents",
  },
];

const whyMnt = [
  {
    icon: "ai" as const,
    title: "AI-native by default",
    desc: "AI search, recommendations, assistants, and agents: built into the product where they lift revenue and gated behind evaluations. Not a bolted-on chatbot.",
  },
  {
    icon: "network" as const,
    title: "Ready for the agent channel",
    desc: "ACP, Google UCP, and a Retail MCP server make your store discoverable and buyable by AI shopping agents: an emerging $900B to $1T channel. Do you know whether anyone in your category is transactable inside an AI assistant yet? The free scan answers that.",
  },
  {
    icon: "shield" as const,
    title: "US compliance engineered in",
    desc: "Built to ADA/WCAG, architected to minimise PCI DSS v4.0.1 scope, and the multi-state sales-tax engine integrated from day one: the obligations that start the moment a US store goes live.",
  },
  {
    icon: "compass" as const,
    title: "Land small, expand big",
    desc: "Start with a productized pilot that proves ROI in weeks, grow into a dedicated pod, and expand into a full platform build: senior engineers the whole way.",
  },
];

const engagement = [
  {
    no: "01",
    title: "Land",
    desc: "A productized paid pilot that proves ROI in weeks: AI Search & Recommendations, AI Cleanup, an agent-readiness audit, or a fast Shopify store build. Small scope, fast proof.",
    points: ["Fixed, focused scope", "Live in weeks", "Clear, measured outcome"],
    featured: false,
  },
  {
    no: "02",
    title: "Grow",
    desc: "A dedicated senior pod working as your embedded product team on a monthly retainer: flexing scope sprint to sprint.",
    points: ["Senior engineers", "Sprint flexibility", "Scales up or down"],
    featured: true,
  },
  {
    no: "03",
    title: "Expand",
    desc: "A full platform build (custom store, marketplace, or B2B) engineered to scale, plus custom AI agents and a managed SLA.",
    points: ["Full platform builds", "AI agents & automation", "Managed & maintained"],
    featured: false,
  },
];

const homeFaq: QA[] = [
  {
    q: "What is agent-ready commerce?",
    a: "Agent-ready commerce means AI shopping agents, like those in ChatGPT and Google: can discover your products, trust your price and inventory data, and complete a purchase. MnT Future makes your store agent-ready with structured product feeds, real-time sync, and the ACP, UCP, and MCP integrations agents use to buy.",
  },
  {
    q: "What does MnT Future build?",
    a: "MnT Future builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands: custom storefronts and marketplaces, integrations and automation, B2B/wholesale, and managed commerce with US compliance, plus AI search, custom AI agents, and agent-readiness.",
  },
  {
    q: "What is the Agentic Commerce Protocol (ACP)?",
    a: "ACP is an open standard from OpenAI and Stripe that lets AI agents complete purchases on a shopper's behalf. MnT Future implements ACP, Google's UCP, and a Retail MCP server so your store can be discovered and bought from in AI channels.",
  },
  {
    q: "Do you only work with US brands?",
    a: "Our focus is US D2C and marketplace brands, where our compliance depth: ADA/WCAG, PCI DSS v4.0.1, and multi-state sales-tax, and our agentic-commerce work are sharpest. We have also built and shipped commerce platforms for clients elsewhere, and you can see those on our work page.",
  },
  {
    q: "Do you build Shopify stores, or only custom platforms?",
    a: "Both. As an official Shopify Partner we launch fast, conversion-ready Shopify stores when speed matters. Our flagship is custom AI-native commerce: if you can spec it, we can build it, and because the same team builds both, Shopify clients graduate to a custom platform when scale demands, without a re-platform trauma.",
  },
  {
    q: "How do we get started?",
    a: "Start with a free strategy session or a free agent-readiness audit. We sketch how we'd build it, or assess your AI-channel readiness, and give you a clear next step: no obligation.",
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
      </section>

      <Partners />

      {/* THE PLATFORM AND ITS AI LAYER */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-7">
        <Reveal>
          <SectionTitle
            eyebrow="What we build"
            title="Commerce platforms, with the AI layer built in."
            sub="The platform is the product. Search, agent-readiness and agents ship as part of it, and two of them also work on the store you already run."
          />
        </Reveal>
        <div className="mt-[52px] grid gap-[26px] lg:grid-cols-2">
          {verticals.map((v, i) => (
            <Reveal key={v.kicker} delay={i * 100}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_1px_3px_rgba(14,27,46,0.05)] transition-all duration-[250ms] hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_44px_-18px_rgba(14,102,194,0.25)]">
                {/* Gradient feature header instead of a stock photo */}
                <Link href={v.href} className={`relative block bg-gradient-to-br ${v.gradient} p-7`}>
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "36px 36px",
                    }}
                  />
                  <div className="pointer-events-none absolute -right-10 -top-14 h-[180px] w-[180px] rounded-full bg-white/10 blur-[60px]" />
                  <div className="relative flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.15] text-white ring-1 ring-white/20">
                      <Icon name={v.icon} className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-white/[0.15] px-3 py-1 text-[11.5px] font-semibold text-white ring-1 ring-white/20">
                      {v.count}
                    </span>
                  </div>
                  <div className="relative mt-6 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-white/70">
                    {v.kicker}
                  </div>
                  <h3 className="relative mt-1.5 font-display text-2xl font-bold text-white">
                    {v.title}
                  </h3>
                </Link>

                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[15px] leading-relaxed text-slatey">{v.desc}</p>
                  <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {v.items.map((it) => (
                      <Link
                        key={it.label}
                        href={it.href}
                        className="group/item flex items-center justify-between gap-2 rounded-[10px] border border-slate-200 bg-white px-3.5 py-2.5 text-[13.5px] font-semibold text-slate-700 transition-colors hover:border-brand-300 hover:bg-brand-50/40 hover:text-brand-700"
                      >
                        {it.label}
                        <Icon
                          name="arrow"
                          className="h-3.5 w-3.5 shrink-0 opacity-30 transition-all group-hover/item:translate-x-0.5 group-hover/item:opacity-100"
                        />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={v.href}
                    className="mt-auto inline-flex items-center gap-[7px] pt-6 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
                  >
                    {v.cta}
                    <Icon name="arrow" className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
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
              title="The reasons founders pick us, and stay."
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
                    alt={`${featured.title}: ${featured.tagline}`}
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
                  Book a free strategy session: we&apos;ll show you exactly how we&apos;d build
                  it: database design, APIs, scalability plan.
                </p>
                <div className="mt-[22px]">
                  <Link
                    href="/strategy-session"
                    className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-800"
                  >
                    Book a strategy session
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
