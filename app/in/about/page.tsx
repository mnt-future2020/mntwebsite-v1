import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import Icon from "@/components/Icon";
import Partners from "@/components/Partners";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, RuleLabel, BpButton, PAGE } from "@/components/blueprint";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/about", {
    title: "About MnT Future: Ecommerce & AI Engineering in India",
    description:
      "MnT Future builds ecommerce platforms and AI systems for Indian businesses. Senior engineers only, a documented delivery method, and software you own rather than rent.",
  });
}

const values = [
  {
    icon: "compass" as const,
    title: "Depth over breadth",
    desc: "Ecommerce platforms, AI work, and three products. That is the whole list. We are not a general software company and we turn down work that would make us one.",
  },
  {
    icon: "eye" as const,
    title: "Honesty over hype",
    desc: "Realistic timelines, honest budgets, and a recommendation against the bigger contract when the bigger contract is wrong for you. Every claim on this site is one we can show you.",
  },
  {
    icon: "users" as const,
    title: "Senior by default",
    desc: "No juniors on client work. Embedded engineering only works when the person embedded has shipped this before, and platforms only survive their second year when a senior built the first one.",
  },
  {
    icon: "gauge" as const,
    title: "Outcomes over output",
    desc: "We measure ourselves on launched products, passed audits and systems still running a year later. Not on hours billed or features counted.",
  },
];

const facts = [
  { value: "Madurai", label: "Where our engineers are" },
  { value: "3 lines", label: "Ecommerce, AI, and products" },
  { value: "100%", label: "Senior-engineer delivery" },
  { value: "5 stages", label: "Discover to Optimize, every engagement" },
];

export default function IndiaAbout() {
  return (
    <>
      <BlueprintMotion />

      <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-14 pt-10 lg:pb-20 lg:pt-14`}>
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: "About" }]} tone="light" />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              About MnT Future
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              India
            </span>
          </div>
          <h1 className="mt-8 max-w-[17ch] animate-rise-in font-display text-[40px] font-bold leading-[0.98] tracking-[-0.05em] text-bp-ink sm:text-[58px] lg:text-[76px]">
            A small senior team that ships.
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            We build ecommerce platforms and AI systems for Indian businesses, from our engineering
            team in Madurai. We are deliberately small and deliberately senior, because the two
            things our clients actually need are somebody who has built this before and somebody who
            is still there when it breaks.
          </p>
        </div>
      </section>

      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} grid border-l border-bp-hair sm:grid-cols-2 lg:grid-cols-4`}>
          {facts.map((f) => (
            <div key={f.label} className="border-b border-r border-bp-hair px-6 py-7">
              <div data-decode className="font-display text-[26px] font-bold tracking-[-0.03em] text-bp-ink lg:text-[30px]">
                {f.value}
              </div>
              <div className="mt-2 text-[13.5px] leading-[1.55] text-bp-mute">{f.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Partners />

      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="01"
            total="02"
            eyebrow="How we work"
            title="Four things we will not trade away."
          />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} data-stagger className="border-b border-r border-bp-line bg-white p-7 lg:p-9">
                <span className="flex h-11 w-11 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                  <Icon name={v.icon} className="h-[21px] w-[21px]" />
                </span>
                <h3 className="mt-6 font-display text-[20px] font-bold tracking-[-0.026em] text-bp-ink">
                  {v.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-bp-mute">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section data-reveal className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <div className="grid gap-9 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <RuleLabel tone="dark">Two markets</RuleLabel>
              <h2 className="mt-6 max-w-[15ch] font-display text-[30px] font-bold leading-[1.06] tracking-[-0.038em] text-white lg:text-[42px]">
                India and the United States, sold differently.
              </h2>
            </div>
            <div>
              <p className="m-0 max-w-[62ch] text-[17px] leading-[1.75] text-white/70">
                In India we build ecommerce platforms and deliver AI work through Forward Deployed
                Engineering, with senior engineers embedded in the client&apos;s team. In the United
                States we build commerce platforms ready for the AI shopping agents now starting to
                drive sales. Same engineers, same standards, different problems worth solving in
                each market.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/"
                  className="border border-white/20 px-5 py-3 font-mono text-[12px] tracking-[0.06em] text-white/70 transition-colors hover:border-white/45 hover:text-white"
                >
                  See the US site
                </Link>
                <Link
                  href="/in/ai/forward-deployed-engineering"
                  className="border border-white/20 px-5 py-3 font-mono text-[12px] tracking-[0.06em] text-white/70 transition-colors hover:border-white/45 hover:text-white"
                >
                  How we deliver
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="02" total="02" eyebrow="Talk to us" title="Where to start." />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {[
              { title: "You know what you need", desc: "Book a strategy session and bring the problem. Forty-five minutes with a senior consultant, and you keep the plan.", href: "/in/strategy-session", cta: "Book a session" },
              { title: "You want to see the products", desc: "Three applications we host, brand and customise: a support desk, a WhatsApp CRM, and an ecommerce platform with GST built in.", href: "/in/products", cta: "See the products" },
              { title: "You just have a question", desc: "Send it. We answer questions from people who are not going to buy anything, because that is how this works.", href: "/in/contact", cta: "Contact us" },
            ].map((s) => (
              <div key={s.title} data-stagger className="flex flex-col border-b border-r border-bp-edge bg-white p-7 lg:p-9">
                <h3 className="font-display text-[20px] font-bold tracking-[-0.026em] text-bp-ink">{s.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-[1.72] text-bp-mute">{s.desc}</p>
                <div className="mt-7">
                  <BpButton href={s.href} variant="outline">{s.cta}</BpButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Tell us the bottleneck. Leave with a plan you can execute."
        body={`A senior consultant, not a salesperson. Or email us directly at ${site.email}.`}
        primary={{ label: "Book a strategy session", href: "/in/strategy-session" }}
        secondary={{ label: "See our work", href: "/in/work" }}
      />
    </>
  );
}
