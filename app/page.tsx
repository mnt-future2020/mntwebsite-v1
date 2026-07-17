import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveMetadata } from "@/lib/seo";
import Hero from "@/components/Hero";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import StackMarquee from "@/components/StackMarquee";
import SpotlightCard from "@/components/SpotlightCard";
import Testimonials from "@/components/Testimonials";
import Integrations from "@/components/Integrations";
import FAQ, { QA } from "@/components/FAQ";
import { SectionHeading, Stat } from "@/components/blocks";
import { images } from "@/lib/site";
import { caseStudies } from "@/lib/caseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/", {
    title: "MnT Future — AI-Native, Agent-Ready Commerce Platforms for US Brands",
    description:
      "AI-native, agent-ready commerce platforms for US D2C & marketplace brands — headless & marketplace builds, integrations, B2B, and AI agents.",
  });
}

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
    icon: "compass" as const,
    title: "Land",
    desc: "A productized paid pilot that proves ROI in weeks — AI Commerce Starter, AI Cleanup, or an agent-readiness audit. Small scope, fast proof.",
    points: ["Fixed, focused scope", "Live in weeks", "Clear, measured outcome"],
  },
  {
    icon: "users" as const,
    title: "Grow",
    desc: "A dedicated senior pod working as your embedded product team on a monthly retainer — flexing scope sprint to sprint.",
    points: ["Senior engineers", "Sprint flexibility", "Scales up or down"],
    featured: true,
  },
  {
    icon: "rocket" as const,
    title: "Expand",
    desc: "A full platform build — headless, marketplace, or B2B — engineered to scale, plus embedded AI agents and a managed SLA.",
    points: ["Full platform builds", "AI agents & automation", "Managed & compliant"],
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
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <Hero />

      {/* PROOF BAR */}
      <section className="border-b border-slate-100 bg-white py-12">
        <div className="container-mnt">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slatey">
            Trusted to engineer revenue-critical commerce for US brands
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat value="AI-native" label="Search, recs, assistants &amp; agents built in" />
            <Stat value="Agent-ready" label="ACP · Google UCP · Retail MCP" />
            <Stat value="US-compliant" label="ADA · PCI DSS · sales-tax handled" />
            <Stat value="100%" label="Senior-engineer delivery" />
          </div>
        </div>
        <StackMarquee className="mt-12" />
      </section>

      {/* TWO VERTICALS */}
      <section id="verticals" className="container-mnt py-20 sm:py-28">
        <SectionHeading
          eyebrow="Two sides, one platform"
          title="Commerce platforms — and the AI that sells them."
          subtitle="We build the platform, then make it AI-native and agent-ready. Start on either side — most brands do both."
        />
        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {[
            {
              icon: "store" as const,
              kicker: "Commerce Platforms",
              title: "Commerce platform development",
              desc: "Headless & marketplace builds, integrations & orchestration, B2B/wholesale, and managed commerce — with ADA, PCI DSS & US sales-tax handled.",
              href: "/commerce",
              image: images.commerce,
              count: "4 services",
              items: ["Headless & marketplaces", "Integrations & orchestration", "B2B / wholesale", "Managed & compliant"],
            },
            {
              icon: "ai" as const,
              kicker: "AI & Agents",
              title: "AI & agents for commerce",
              desc: "AI search, recommendations & assistants, agent-ready commerce (ACP/UCP/MCP), embedded AI agents, and AI cleanup for MVPs that broke at scale.",
              href: "/ai-agents",
              image: images.ai,
              count: "4 services",
              items: ["AI search & recommendations", "Agent-ready commerce", "Embedded AI agents", "AI cleanup"],
            },
          ].map((v, i) => (
            <Reveal key={v.kicker} delay={i * 100}>
              <Link
                href={v.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-cardhover"
              >
                <div className="img-zoom relative h-56 w-full overflow-hidden">
                  <Image
                    src={v.image}
                    alt={v.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/10" />
                  <span className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur-md">
                    {v.count}
                  </span>
                  <div className="absolute bottom-5 left-5 flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-700 shadow-lg ring-1 ring-black/5 transition-transform duration-300 group-hover:scale-105">
                      <Icon name={v.icon} className="h-6 w-6" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-white">
                      {v.kicker}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <h3 className="font-display text-[1.7rem] font-bold leading-tight text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-slatey">{v.desc}</p>
                  <ul className="mt-6 grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                    {v.items.map((it) => (
                      <li key={it} className="flex items-center gap-2.5 text-sm font-medium text-ink">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                          <Icon name="check" className="h-3 w-3" />
                        </span>
                        {it}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                    <span className="font-display text-sm font-bold text-ink transition-colors group-hover:text-brand-700">
                      Explore {v.kicker.toLowerCase()}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-brand-700 transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-white">
                      <Icon name="arrow" className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHY MNT */}
      <section className="bg-soft py-20 sm:py-28">
        <div className="container-mnt">
          <SectionHeading
            eyebrow="Why MnT Future"
            title="The reasons founders pick us — and stay."
            subtitle="Specialist depth, compliance built into the architecture, AI where it counts, and the speed of a senior team."
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyMnt.map((f, i) => {
              const wide = i === 0 || i === 3;
              return (
                <Reveal key={f.title} delay={i * 70} className={wide ? "lg:col-span-2" : ""}>
                  <SpotlightCard className="card card-hover group flex h-full flex-col">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                      <Icon name={f.icon} className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-ink">{f.title}</h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slatey">{f.desc}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ENGAGEMENT MODELS */}
      <section className="container-mnt py-20 sm:py-28">
        <SectionHeading
          eyebrow="Engagement models"
          title="Work with us the way your stage demands."
          subtitle="From a fixed-scope MVP to an embedded product team or a true co-founding partnership."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {engagement.map((m, i) => (
            <Reveal key={m.title} delay={i * 80}>
              <SpotlightCard
                className={`relative flex h-full flex-col rounded-3xl border p-8 transition-all duration-300 ${
                  m.featured
                    ? "border-transparent bg-navy text-white shadow-glow"
                    : "border-slate-100 bg-white shadow-card hover:-translate-y-1 hover:shadow-cardhover"
                }`}
              >
                {m.featured && (
                  <span className="absolute right-6 top-6 rounded-full bg-brand px-3 py-1 text-[11px] font-semibold text-white">
                    Most popular
                  </span>
                )}
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                    m.featured ? "bg-white/10 text-brand-200" : "bg-brand-50 text-brand-700"
                  }`}
                >
                  <Icon name={m.icon} className="h-6 w-6" />
                </div>
                <h3 className={`mt-5 text-xl font-bold ${m.featured ? "text-white" : "text-ink"}`}>
                  {m.title}
                </h3>
                <p className={`mt-2 text-[15px] leading-relaxed ${m.featured ? "text-white/70" : "text-slatey"}`}>
                  {m.desc}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <Icon
                        name="check"
                        className={`h-4 w-4 ${m.featured ? "text-brand-200" : "text-brand"}`}
                      />
                      <span className={m.featured ? "text-white/80" : "text-ink"}>{p}</span>
                    </li>
                  ))}
                </ul>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CASE STUDIES */}
      <section className="bg-soft py-20 sm:py-28">
        <div className="container-mnt">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              align="left"
              eyebrow="Selected work"
              title="Real platforms, shipped."
              subtitle="Live products we've designed and engineered end to end."
            />
            <Link href="/work" className="btn-ghost shrink-0">
              See all work <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {caseStudies.map((c, i) => (
              <Reveal key={c.slug} delay={i * 80}>
                <Link
                  href={`/work/${c.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-cardhover"
                >
                  <div className="img-zoom relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={c.cover}
                      alt={`${c.title} — ${c.tagline}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                      {c.type}
                    </div>
                    <h3 className="mt-2 font-display text-2xl font-bold text-ink">{c.title}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-slatey">{c.tagline}</p>
                    <span className="link-arrow mt-auto pt-5">
                      Read the case study <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}

            <Reveal delay={caseStudies.length * 80}>
              <div className="flex h-full flex-col justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-8 text-center">
                <h3 className="font-display text-xl font-bold text-ink">Your platform here next?</h3>
                <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slatey">
                  Book a free architecture workshop — we&apos;ll show you exactly how we&apos;d build
                  it: database design, APIs, scalability plan.
                </p>
                <div className="mt-6">
                  <Link href="/contact" className="btn-primary">
                    Book a workshop <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Integrations />

      <Testimonials />

      {/* FAQ */}
      <section className="bg-soft py-20 sm:py-28">
        <div className="container-mnt">
          <SectionHeading
            eyebrow="FAQ"
            title="Questions buyers ask us first"
            subtitle="Short, direct answers on agent-ready commerce, ACP, and how we work."
          />
          <div className="mt-12">
            <FAQ items={homeFaq} />
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
