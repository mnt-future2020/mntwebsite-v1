import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import Partners from "@/components/Partners";
import { QA } from "@/components/FAQ";
import BlueprintFaq from "@/components/BlueprintFaq";
import ReceiptsMarquee from "@/components/ReceiptsMarquee";
import { caseStudies } from "@/lib/caseStudies";
import { SectionHead, RuleLabel, BpButton, MakerMark, PAGE } from "@/components/blueprint";
import BlueprintMotion from "@/components/BlueprintMotion";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/", {
    title: "AI-Native, Agent-Ready Commerce Platforms | MnT Future",
    description:
      "MnT Future builds AI-native, agent-ready commerce platforms for US D2C and marketplace brands: custom storefronts, marketplaces, integrations, B2B and agents.",
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

// Cursor spotlight, driven by --mx/--my/--spot from BlueprintMotion.
const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

const receipts = caseStudies.flatMap((cs) =>
  cs.facts.map((f) => ({ ...f, title: cs.title, slug: cs.slug }))
);

export default function Home() {
  const featured = caseStudies[0];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <BlueprintMotion />

      <Hero />

      {/* PROOF BAR */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-10 lg:py-[60px]`}>
          <RuleLabel>Trusted to engineer revenue-critical commerce for US brands</RuleLabel>
          <div className="mt-[30px] grid border-l border-t border-bp-edge sm:grid-cols-2 lg:grid-cols-4">
            {proofStats.map((s) => (
              <div
                key={s.value}
                data-stagger
                className="border-b border-r border-bp-edge bg-white px-6 py-7 transition-colors hover:bg-[#FAFCFF]"
              >
                <span className="block h-[2px] w-6 bg-brand-500" />
                <div data-decode={s.value} className="mt-5 font-display text-[23px] font-bold tracking-[-0.028em] text-bp-ink lg:text-[31px]">
                  {s.value}
                </div>
                <div className="mt-[11px] text-[13.5px] leading-[1.6] text-bp-soft">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Partners />

      {/* 01 WHAT WE BUILD */}
      <section id="build" data-reveal className="scroll-mt-24 border-b border-bp-line">
        <div className={`${PAGE} py-20 lg:py-[140px]`}>
          <SectionHead
            no="01"
            eyebrow="What we build"
            title="Commerce platforms, with the AI layer built in."
            sub="The platform is the product. Search, agent-readiness and agents ship as part of it, and two of them also work on the store you already run."
          />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 lg:grid-cols-2">
            {verticals.map((v) => (
              <div
                key={v.kicker}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="relative flex flex-col overflow-hidden border-b border-r border-bp-line bg-white transition-shadow duration-250 hover:shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)]"
              >
                <div
                  className="relative overflow-hidden border-b border-bp-line p-7 lg:p-9"
                  style={{
                    background: "linear-gradient(135deg,rgba(32,149,241,0.07),rgba(62,81,182,0.045))",
                  }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right,rgba(11,21,36,0.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(11,21,36,0.035) 1px,transparent 1px)",
                      backgroundSize: "34px 34px",
                    }}
                    aria-hidden="true"
                  />
                  <div className="pointer-events-none absolute -bottom-12 -right-9 text-brand-500/10" aria-hidden="true">
                    <Icon name={v.icon} className="h-[200px] w-[200px]" />
                  </div>
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                      <Icon name={v.icon} className="h-6 w-6" />
                    </span>
                    <span className="border border-[#DCE6F2] bg-white px-[11px] py-1.5 font-mono text-[11px] tracking-[0.08em] text-bp-mute">
                      {v.count}
                    </span>
                  </div>
                  <div className="relative mt-[30px] font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                    {v.kicker}
                  </div>
                  <h3 className="relative mt-3 font-display text-[22px] font-bold leading-[1.14] tracking-[-0.028em] text-bp-ink lg:text-[29px]">
                    {v.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-7 lg:p-9">
                  <p className="m-0 text-[15.5px] leading-[1.72] text-bp-mute">{v.desc}</p>
                  <div className="mt-7 border-t border-bp-hair">
                    {v.items.map((it, n) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className="group flex items-center gap-3.5 border-b border-bp-hair px-0.5 py-[15px] text-[14.8px] font-semibold text-bp-body transition-all duration-200 hover:pl-2.5 hover:text-brand-700"
                      >
                        <span className="font-mono text-[11px] font-medium text-[#9AA9BE]">
                          {String(n + 1).padStart(2, "0")}
                        </span>
                        <span className="flex-1">{it.label}</span>
                        <Icon name="arrow" className="h-3.5 w-3.5 shrink-0 opacity-40" />
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={v.href}
                    className="mt-auto inline-flex items-center gap-2.5 pt-7 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-brand-700 transition-all hover:gap-4"
                  >
                    {v.cta}
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 WHY */}
      <section id="why" data-reveal className="scroll-mt-24 border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[140px]`}>
          <SectionHead
            no="02"
            eyebrow="Why MnT Future"
            title="The reasons founders pick us, and stay."
            sub="Specialist depth, compliance built into the architecture, AI where it counts, and the speed of a senior team."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-2">
            {whyMnt.map((f, i) => (
              <div
                key={f.title}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="border-b border-r border-bp-edge bg-white p-7 shadow-[inset_3px_0_0_transparent] transition-shadow duration-200 hover:shadow-[inset_3px_0_0_#2095F1] lg:p-10"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-[46px] w-[46px] items-center justify-center bg-brand-500/[0.07] text-brand-700">
                    <Icon name={f.icon} className="h-[23px] w-[23px]" />
                  </span>
                  <span className="font-display text-[26px] font-extrabold tracking-[-0.04em] text-[#EAF0F7]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-[20.5px] font-bold tracking-[-0.022em] text-bp-ink">
                  {f.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-bp-mute">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 ENGAGEMENT */}
      <section id="engage" data-reveal className="scroll-mt-24 border-b border-bp-line">
        <div className={`${PAGE} py-20 lg:py-[140px]`}>
          <SectionHead no="03" eyebrow="Engagement models" title="Work with us the way your stage demands." />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 lg:grid-cols-3">
            {engagement.map((m) => (
              <div
                key={m.title}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className={`relative flex flex-col border-b border-r border-bp-line p-7 lg:p-10 ${
                  m.featured ? "bg-[#F7FAFE]" : "bg-white"
                }`}
              >
                {m.featured && <span className="absolute inset-x-0 -top-px h-[3px] bg-brand-500" />}
                <div className="flex min-h-[26px] items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2.5 font-mono text-[12.5px] font-semibold tracking-[0.14em] text-brand-700">
                    <span className="h-px w-5 bg-brand-500" />
                    {m.no}
                  </span>
                  {m.featured && (
                    <span className="bg-bp-ink px-2.5 py-[5px] font-mono text-[11px] sm:text-[10px] font-semibold tracking-[0.12em] text-white">
                      MOST POPULAR
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-[25px] font-bold tracking-[-0.03em] text-bp-ink lg:text-[31px]">
                  {m.title}
                </h3>
                <p className="mt-4 text-[15px] leading-[1.72] text-bp-mute">{m.desc}</p>
                <div className="mt-7 border-t border-bp-line">
                  {m.points.map((p) => (
                    <span
                      key={p}
                      className="flex items-center gap-3 border-b border-bp-line px-0.5 py-3.5 text-[14px] font-medium text-[#334458]"
                    >
                      <Icon name="check" className="h-3.5 w-3.5 shrink-0 text-brand-500" />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 SELECTED WORK */}
      <section id="work" data-reveal className="scroll-mt-24 border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[140px]`}>
          <SectionHead
            no="04"
            eyebrow="Selected work"
            title="Real platforms, shipped."
            sub="Live products we've designed and engineered end to end."
            aside={
              <Link
                href="/work"
                className="inline-flex shrink-0 items-center gap-2.5 border border-[#D8E1EC] bg-white px-6 py-4 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-bp-ink transition-colors hover:border-brand-500 hover:text-brand-700"
              >
                See all work
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            }
          />
          <div className="mt-11 grid border border-bp-line bg-white lg:mt-16 lg:grid-cols-2">
            <Link href={`/work/${featured.slug}`} className="group relative block overflow-hidden">
              <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-2.5 bg-white/95 px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] text-bp-ink">
                01 · Case study
              </span>
              <Image
                src={featured.cover}
                alt={`${featured.title}: ${featured.type}`}
                width={900}
                height={560}
                className="h-full min-h-[280px] w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </Link>
            <div className="flex flex-col justify-center border-t border-bp-line p-7 lg:border-l lg:border-t-0 lg:p-12">
              <div className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-brand-700">
                {featured.type}
              </div>
              <h3 className="mt-4 font-display text-[30px] font-bold tracking-[-0.035em] text-bp-ink lg:text-[38px]">
                {featured.title}
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15.5px] leading-[1.7] text-bp-mute">
                {featured.tagline}
              </p>
              <MakerMark
                group={featured.group}
                detail={featured.scope.find((s) => s.label === "Status")?.value}
                className="mt-7 max-w-[46ch] border-t border-bp-hair pt-4"
              />
              <Link
                href={`/work/${featured.slug}`}
                className="mt-7 inline-flex items-center gap-2.5 py-1.5 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-brand-700 transition-all hover:gap-4"
              >
                Read the case study
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-6 border border-dashed border-[#C9D6E5] bg-white p-8 lg:flex-row lg:items-center lg:p-10">
            <div>
              <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-bp-ink">
                Your platform here next?
              </h3>
              <p className="mt-2.5 max-w-[52ch] text-[15px] leading-[1.65] text-bp-mute">
                Book a free strategy session: we&apos;ll show you exactly how we&apos;d build it:
                database design, APIs, scalability plan.
              </p>
            </div>
            <BpButton href="/strategy-session" className="shrink-0">
              Book a strategy session
            </BpButton>
          </div>
        </div>
      </section>

      {/* 05 RECEIPTS */}
      <section id="receipts" data-reveal className="relative overflow-hidden border-b border-bp-ink bg-bp-ink">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            backgroundImage:
              "linear-gradient(to right,rgba(255,255,255,0.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.035) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-[140px] -top-[200px] h-[620px] w-[620px]"
          style={{ background: "radial-gradient(circle,rgba(32,149,241,0.2),transparent 64%)" }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pt-20 lg:pt-[140px]`}>
          <SectionHead
            no="05"
            tone="dark"
            eyebrow="Receipts, not testimonials"
            title="Numbers from builds you can inspect."
            sub="No invented quotes. Every stat below comes from a public case study, so you can judge the work itself."
          />
        </div>
        <ReceiptsMarquee receipts={receipts} />
      </section>

      {/* 06 FAQ */}
      <section id="faq" data-reveal className="scroll-mt-24 border-b border-bp-line bg-bp-wash">
        <div className="mx-auto max-w-[1080px] px-[18px] py-20 sm:px-8 lg:px-14 lg:py-[140px]">
          <RuleLabel
            right={
              <span className="whitespace-nowrap font-mono text-[11px] tracking-[0.16em] text-bp-faint/70">
                06 / 06
              </span>
            }
          >
            06 · FAQ
          </RuleLabel>
          <h2 className="mt-6 font-display text-[32px] font-bold leading-[1.04] tracking-[-0.038em] text-bp-ink lg:text-[52px]">
            Questions buyers ask us first
          </h2>
          <p className="mt-5 max-w-[62ch] text-[17.5px] leading-[1.7] text-bp-mute">
            Short, direct answers on agent-ready commerce, ACP, and how we work.
          </p>
          <BlueprintFaq items={homeFaq} />
        </div>
      </section>

      <CTASection />
    </>
  );
}
