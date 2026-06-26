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
import { SectionHeading, Stat } from "@/components/blocks";
import { images } from "@/lib/site";
import { caseStudies } from "@/lib/caseStudies";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/", {
    title: "MnT — Healthcare & E-Commerce Software Development",
    description:
      "We engineer compliant healthcare platforms and high-growth e-commerce stores. Two specialisms, one senior team. India + global. Start your build.",
  });
}

const whyMnt = [
  {
    icon: "users" as const,
    title: "A senior team, not a staffing pool",
    desc: "Every line is written by engineers who've shipped regulated, high-traffic systems. No juniors learning on your budget.",
  },
  {
    icon: "shield" as const,
    title: "Compliance is architecture",
    desc: "HIPAA, ABDM, FHIR, SOC 2 and GDPR are designed into the system from day one — never retrofitted before an audit.",
  },
  {
    icon: "ai" as const,
    title: "AI-native by default",
    desc: "From ambient clinical scribes to commerce personalisation, we build AI into the product where it earns its place.",
  },
  {
    icon: "bolt" as const,
    title: "Built for speed",
    desc: "Two-week sprints, working software every cycle, and Core Web Vitals treated as a feature — not an afterthought.",
  },
];

const engagement = [
  {
    icon: "compass" as const,
    title: "Fixed-bid build",
    desc: "Defined scope, fixed price, fixed timeline. Best when the spec is clear and you want budget certainty.",
    points: ["Clear milestones", "Predictable cost", "Ideal for MVPs & v1"],
  },
  {
    icon: "users" as const,
    title: "Dedicated team",
    desc: "An embedded senior squad working as your product team — flexing scope sprint to sprint.",
    points: ["Senior engineers", "Sprint flexibility", "Scales up or down"],
    featured: true,
  },
  {
    icon: "rocket" as const,
    title: "Co-founding partner",
    desc: "We build alongside you — part fee, part stake — for founders who want a true technical partner.",
    points: ["Aligned incentives", "Long-term ownership", "Hands-on senior leadership"],
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* PROOF BAR */}
      <section className="border-b border-slate-100 bg-white py-12">
        <div className="container-mnt">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-slatey">
            Trusted to engineer regulated, revenue-critical software
          </p>
          <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat value="2" label="Deep specialisms — healthcare & commerce" />
            <Stat value="100%" label="Senior-engineer delivery" />
            <Stat value="5+" label="Compliance frameworks engineered in" />
            <Stat value="Global" label="India-based · US, Gulf &amp; Europe delivery" />
          </div>
        </div>
        <StackMarquee className="mt-12" />
      </section>

      {/* TWO VERTICALS */}
      <section id="verticals" className="container-mnt py-20 sm:py-28">
        <SectionHeading
          eyebrow="Two specialisms"
          title="We go deep in two worlds — not wide across many."
          subtitle="Generalists build everything adequately. We build healthcare and commerce platforms exceptionally. Pick your vertical."
        />
        <div className="mt-14 grid gap-7 lg:grid-cols-2">
          {[
            {
              icon: "stethoscope" as const,
              kicker: "Healthcare",
              title: "Healthcare software development",
              desc: "Compliant platforms for providers and healthtech founders — telemedicine, EHR/EMR, hospital management, AI, and ABDM/FHIR integration.",
              href: "/healthcare-software-development",
              image: images.healthcare,
              count: "7 service areas",
              items: ["Custom healthcare software", "Telemedicine · EHR/EMR", "ABDM / FHIR integration", "SaaS for healthtech startups"],
            },
            {
              icon: "cart" as const,
              kicker: "E-Commerce",
              title: "E-commerce development",
              desc: "Stores and platforms engineered to convert and scale — custom builds, D2C brand platforms, marketplaces, Shopify, headless, and B2B.",
              href: "/ecommerce-development",
              image: images.ecommerce,
              count: "7 service areas",
              items: ["Custom & headless commerce", "D2C & marketplaces", "Shopify & mobile apps", "SaaS for commerce startups"],
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
            eyebrow="Why MnT"
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

      <CTASection />
    </>
  );
}
