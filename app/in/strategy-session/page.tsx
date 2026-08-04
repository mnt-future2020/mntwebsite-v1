import type { Metadata } from "next";
import Link from "next/link";
import BlueprintMotion from "@/components/BlueprintMotion";
import BlueprintFaq from "@/components/BlueprintFaq";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { QA } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, RuleLabel, PAGE } from "@/components/blueprint";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/strategy-session", {
    title: "Book a Strategy Session: Ecommerce & AI Consulting | MnT Future India",
    description:
      "A 45 minute session with a senior consultant. Bring your ecommerce bottleneck or the AI pilot that stalled, and leave with a plan you can execute. No obligation.",
  });
}

const chips = [
  "45 minutes, live",
  "Senior consultant, not a sales rep",
  "You keep the plan",
  "No obligation",
];

const steps = [
  {
    no: "01",
    title: "Tell us the problem",
    desc: "The form takes two minutes: what your business sells, what you run today, and what is breaking or what is next. A senior consultant reads it before the call so we start at the real question.",
  },
  {
    no: "02",
    title: "We work it live",
    desc: "45 minutes on a shared screen: the data model, the systems it has to touch, and where AI would genuinely help rather than where it would demo well.",
  },
  {
    no: "03",
    title: "You keep the plan",
    desc: "A written summary of what we would build and in what order, whether or not you build it with us. Plenty of clients take it to their own team, and that is a fine outcome.",
  },
];

const bring = [
  "An ecommerce platform that is costing you a percentage of every order and limiting how you sell.",
  "An AI pilot that impressed a room and then stopped, and nobody can say exactly why.",
  "WhatsApp enquiries that arrive faster than your team can answer, with follow-ups getting missed.",
  "A workflow somebody repeats forty times a day that everyone agrees should be automated.",
  "A GST or invoicing setup you suspect would not survive an audit.",
  "A decision between building custom and buying a product, where nobody neutral has given you an answer.",
];

const faq: QA[] = [
  {
    q: "Is this a sales call?",
    a: "It is a working session with a senior consultant. We will tell you if the answer is a product rather than a build, or if the honest answer is that you do not need us yet. We would rather be the firm you call in a year than the one that sold you the wrong thing this quarter.",
  },
  {
    q: "What should we prepare?",
    a: "Nothing formal. If you have your current platform costs, your order volume, or a description of the workflow that is causing pain, bring those. Everything else we can work out on the call.",
  },
  {
    q: "Who will we talk to?",
    a: "A senior consultant who has built this kind of system. Not an account manager reading from a deck, and not somebody who has to check with an engineer and get back to you.",
  },
  {
    q: "What happens afterwards?",
    a: "You get the written plan. If you want to go further, the usual next step for AI work is a discovery sprint, which is one to two weeks and ends with a costed path to production. For a platform build it is a scoping exercise. Neither is automatic.",
  },
];

export default function IndiaStrategySession() {
  return (
    <>
      <BlueprintMotion />

      {/* HERO + FORM */}
      <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-16 pt-10 lg:pb-24 lg:pt-14`}>
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: "Strategy session" }]} tone="light" />
          <div className="mt-9 grid items-start gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-[72px]">
            <div className="animate-rise-in">
              <div className="flex items-center gap-4">
                <span className="h-px w-[38px] shrink-0 bg-brand-500" />
                <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
                  Strategy session
                </span>
              </div>
              <h1 className="mt-6 max-w-[15ch] font-display text-[38px] font-bold leading-[0.99] tracking-[-0.048em] text-bp-ink sm:text-[52px] lg:text-[64px]">
                Bring your bottleneck. Leave with a plan you can execute.
              </h1>
              <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.68] text-bp-mute">
                45 minutes with a senior consultant who has built this kind of system before. We
                work the problem live and you keep the written plan, whether or not you build it
                with us.
              </p>

              <div className="mt-9 grid border-l border-t border-bp-hair sm:grid-cols-2">
                {chips.map((chip, i) => (
                  <div key={chip} className="flex items-baseline gap-3 border-b border-r border-bp-hair px-5 py-4">
                    <span className="font-mono text-[11px] sm:text-[10.5px] tracking-[0.12em] text-brand-500">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-[12.5px] leading-[1.5] text-[#334458]">{chip}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <RuleLabel>What people bring us</RuleLabel>
                <div className="mt-4 border-t border-bp-hair">
                  {bring.map((b) => (
                    <div key={b} className="flex items-start gap-3 border-b border-bp-hair py-3">
                      <span className="mt-1 flex h-[16px] w-[16px] shrink-0 items-center justify-center bg-brand-500/[0.09] text-brand-700">
                        <Icon name="check" className="h-[10px] w-[10px]" />
                      </span>
                      <span className="text-[14.5px] leading-[1.6] text-bp-body">{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-rise-in border border-bp-edge bg-white p-7 shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)] [animation-delay:160ms] lg:p-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
                Book your session
              </div>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-bp-mute">
                Two minutes. A senior consultant reads it before the call.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="01" total="02" eyebrow="How it works" title="Three steps, no theatre." />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {steps.map((s) => (
              <div key={s.no} data-stagger className="border-b border-r border-bp-edge bg-white p-7 lg:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">{s.no}</span>
                  <span className="h-px flex-1 bg-bp-hair" />
                </div>
                <h3 className="mt-5 font-display text-[20px] font-bold tracking-[-0.026em] text-bp-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-bp-mute">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="02" total="02" eyebrow="Questions" title="Before you book." />
          <div className="mx-auto mt-11 max-w-[1080px] lg:mt-16">
            <BlueprintFaq items={faq} />
          </div>
          <div className="mt-12 border-t border-bp-edge pt-8">
            <RuleLabel>Or read first</RuleLabel>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
                { label: "Our products", href: "/in/products" },
                { label: "AI services", href: "/in/ai" },
                { label: "Ecommerce platforms", href: "/in/ecommerce" },
                { label: "How we deliver", href: "/in/ai/forward-deployed-engineering" },
                { label: "Our work", href: "/in/work" },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="border border-[#D8E1EC] bg-white px-4 py-2.5 font-mono text-[12px] tracking-[0.06em] text-bp-mute transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
