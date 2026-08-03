import type { Metadata } from "next";
import BlueprintMotion from "@/components/BlueprintMotion";
import BlueprintFaq from "@/components/BlueprintFaq";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import SectionTitle from "@/components/SectionTitle";
import ContactForm from "@/components/ContactForm";
import { Breadcrumbs } from "@/components/blocks";
import { site } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/strategy-session", {
    title: "Free Strategy Session: Commerce Tech Consulting | MnT Future",
    description:
      "A free 45-minute consulting session with a senior commerce consultant: bring your problem, get the solution that fits your business, and keep the written recommendation brief.",
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
    desc: "The form takes two minutes: your store, your stack, and what's breaking or what's next. A senior consultant reads it before the call, so we start at the real question.",
  },
  {
    no: "02",
    title: "We work it live",
    desc: "45 minutes on a shared whiteboard: data model, APIs, integrations, and where AI and agents would actually lift revenue: the way we'd genuinely build it.",
  },
  {
    no: "03",
    title: "You keep the plan",
    desc: "After the session you get a written recommendation brief: the diagnosis, the solution that fits your business, and what to do first. Yours, whether you hire us or not.",
  },
  {
    no: "04",
    title: "Decide with clarity",
    desc: "If it's a fit, most clients start with a small productized pilot, not a big contract. If Shopify or your current stack is enough, we'll say exactly that.",
  },
];

const deliverables = [
  "A clear diagnosis of your problem: what's holding your commerce back, and what it's costing you",
  "The solution that fits your business: matched to your stage, your stack, and your budget",
  "Where AI can grow your revenue: the opportunities worth taking, in plain language",
  "A straight recommendation and what to do first: Shopify, Hydrogen, or custom, with honest effort framing",
  "The brief is yours to keep, even if we never work together",
];

const audiences = [
  {
    icon: "store" as const,
    title: "D2C brands outgrowing their stack",
    desc: "Template limits, slow pages, integration duct tape: you can feel the ceiling but want the plan before committing to a rebuild.",
  },
  {
    icon: "grid" as const,
    title: "Marketplace & B2B builders",
    desc: "Multi-vendor mechanics, account pricing, RFQ flows: architecture decisions that are expensive to get wrong the first time.",
  },
  {
    icon: "code" as const,
    title: "Founders with an MVP that broke",
    desc: "A vibe-coded or agency-built MVP that's cracking under real traffic: you need a grown-up read on what to keep and what to replace.",
  },
  {
    icon: "network" as const,
    title: "Brands going agent-ready",
    desc: "AI agents are becoming a sales channel. You want to know what it takes for your store to be discovered, and bought from: by them.",
  },
];

const faq = [
  {
    q: "Is the strategy session really free?",
    a: "Yes, no invoice, no obligation, no credit card. We invest the hour because a working session is the best possible demonstration of how we think and build. The written brief you keep is real consulting output, free.",
  },
  {
    q: "Is this a sales call?",
    a: "You talk to a senior consultant who would actually architect your build, not a sales rep with a slide deck. The session is spent on your problem, and the recommendation is honest even when it's 'don't build custom yet' or 'Shopify is enough for your stage.'",
  },
  {
    q: "What should we prepare?",
    a: "Just context: your store or product, your current stack, the bottleneck or goal, and any numbers you're comfortable sharing (traffic, orders, conversion). Links help. Nothing formal: we'll ask the right questions.",
  },
  {
    q: "Who should join from our side?",
    a: "Whoever owns the decision and whoever owns the tech: typically a founder or product lead, plus an engineer if you have one. It works fine with just a founder too.",
  },
  {
    q: "Do we need an NDA?",
    a: "Happy to sign one before the session if you'd like: just mention it in the form and we'll handle it before the call.",
  },
  {
    q: "What happens after the session?",
    a: "You get the recommendation brief in writing. If you want to go further, the usual next step is a small, fixed-scope pilot: AI Search & Recommendations, AI Cleanup, an agent-readiness audit, or a Shopify build: that proves ROI in weeks before anything bigger.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Commerce technology consulting: free strategy session",
  provider: { "@type": "Organization", name: site.name, legalName: site.legalName },
  areaServed: ["United States"],
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function StrategySession() {
  return (
    <>
      <BlueprintMotion />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* HERO */}
      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className="mx-auto max-w-[1440px] px-[18px] pb-14 pt-10 sm:px-8 lg:px-14 lg:pb-20">
          <Breadcrumbs
            trail={[{ label: "Home", href: "/" }, { label: "Book a strategy session" }]}
            tone="light"
          />
          <div className="mt-9 animate-fade-up">
            <div className="flex items-center gap-4">
                <span className="h-px w-[38px] shrink-0 bg-brand-500" />
                <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
                  Free strategy session · Commerce tech consulting
                </span>
              </div>
            <h1 className="mt-[18px] max-w-[820px] font-display text-[40px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[56px] lg:text-[72px]">
              Bring your commerce bottleneck. Leave with a plan you can execute.
            </h1>
            <p className="mt-5 max-w-[640px] text-[17px] leading-[1.65] text-bp-mute">
              A free 45-minute working session with a senior commerce consultant. We dig into your
              store, your stack, and where it's stuck, sketch the solution live, and you keep the
              written plan whether you hire us or not.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <a
                href="#book"
                className="inline-flex items-center gap-2 bg-brand-700 px-7 py-3.5 text-[15.5px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(14,102,194,0.5)] transition-colors hover:bg-brand-800"
              >
                Book my strategy session
                <Icon name="arrow" className="h-4 w-4" />
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 border border-[#D8E1EC] bg-white px-7 py-3.5 text-[15.5px] font-semibold text-bp-ink transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                How it works
              </a>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {chips.map((c) => (
                <span key={c} className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-bp-mute">
                  <Icon name="check" className="h-[15px] w-[15px] text-brand-700" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-[1440px] scroll-mt-24 px-5 pb-24 pt-[72px] sm:px-7">
        <Reveal>
          <SectionTitle
            eyebrow="How the session works"
            title="A working session, not a pitch."
            sub="One hour of real consulting with a defined shape: no surprises."
          />
        </Reveal>
        <div className="mt-[52px] grid gap-[22px] md:grid-cols-2">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="h-full border border-bp-edge bg-white p-8 shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_16px_36px_-16px_rgba(14,102,194,0.22)]">
                <div className="font-display text-[13px] font-bold text-brand-700">{s.no}</div>
                <h3 className="mt-3.5 font-display text-[21px] font-bold text-bp-ink">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT YOU LEAVE WITH */}
      <section data-reveal className="border-y border-bp-line bg-bp-wash py-24">
        <div className="mx-auto grid max-w-[1440px] items-center gap-14 px-[18px] sm:px-8 lg:px-14 lg:grid-cols-2">
          <Reveal>
            <SectionTitle
              align="left"
              eyebrow="What you leave with"
              title="Consulting output you keep, not meeting notes."
              sub="The session ends with a written recommendation brief: your problem, the solution that fits, and what to do first. It's the reason the session is worth your hour even if you never hire us."
            />
            <Link
              href="/work"
              className="mt-8 inline-flex items-center gap-[7px] text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              See the kind of platforms it leads to
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-bp-edge bg-white p-8 shadow-[0_1px_3px_rgba(14,27,46,0.05)] sm:p-10">
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-brand-700">
                The recommendation brief
              </div>
              <div className="mt-5 flex flex-col gap-4">
                {deliverables.map((d) => (
                  <span key={d} className="flex items-start gap-[13px] text-[14.5px] leading-relaxed text-slate-700">
                    <span className="mt-px flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700">
                      <Icon name="check" className="h-3 w-3" />
                    </span>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="mx-auto max-w-[1440px] px-[18px] py-20 sm:px-8 lg:px-14 lg:py-[120px]">
        <Reveal>
          <SectionTitle
            eyebrow="Who it's for"
            title="Built for teams with a real commerce problem."
            sub="US D2C and marketplace brands, at the moments where an hour of senior architecture thinking changes the next year."
          />
        </Reveal>
        <div className="mt-[52px] grid gap-[22px] md:grid-cols-2">
          {audiences.map((a, i) => (
            <Reveal key={a.title} delay={i * 70}>
              <div className="h-full border border-bp-edge bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]">
                <div className="flex h-[46px] w-[46px] items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                  <Icon name={a.icon} className="h-[23px] w-[23px]" />
                </div>
                <h3 className="mt-[18px] font-display text-[19px] font-bold text-bp-ink">{a.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Async alternative */}
        <Reveal delay={280}>
          <div className="mt-[22px] flex flex-col gap-4 border border-bp-edge bg-slate-50 px-7 py-6 sm:flex-row sm:items-center">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-bp-edge bg-white text-brand-700">
              <Icon name="search" className="h-5 w-5" />
            </span>
            <span className="flex-1">
              <span className="block font-display text-[17px] font-bold text-bp-ink">
                Prefer async? Get a free agent-readiness audit instead.
              </span>
              <span className="mt-1 block text-[13.5px] leading-relaxed text-bp-mute">
                We assess your store&apos;s data, feeds, and AI-channel visibility and send you the
                findings: no call required. Ask for it in the form below.
              </span>
            </span>
            <a
              href="#book"
              className="inline-flex shrink-0 items-center gap-[7px] text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              Request the audit
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-t border-bp-line bg-bp-wash py-24">
        <div className="mx-auto max-w-[860px] px-[18px] sm:px-8 lg:px-14">
          <Reveal>
            <SectionTitle
              eyebrow="FAQ"
              title="Fair questions, straight answers"
              sub="Everything people ask before they book."
              className="mb-11"
            />
          </Reveal>
          <BlueprintFaq items={faq} />
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="scroll-mt-24 border-t border-bp-line bg-gradient-to-b from-white to-mist">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 sm:px-7 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-4">
                <span className="h-px w-[38px] shrink-0 bg-brand-500" />
                <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
                  Book your strategy session
                </span>
              </div>
            <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-bp-ink sm:text-[38px]">
              Two minutes now. A plan by next week.
            </h2>
            <p className="mt-4 text-[16px] leading-[1.65] text-bp-mute">
              Tell us what you&apos;re building and what&apos;s in the way. Syed replies within one
              business day to schedule your session.
            </p>

            {/* The consultant who actually runs the session */}
            <div className="mt-8 flex items-center gap-4 border border-bp-edge bg-white p-5 shadow-[0_1px_3px_rgba(14,27,46,0.05)]">
              <Image
                src="/images/advisor-syed.jpg"
                alt="Syed Asrar Ahmed, Chief Tech Consultant at MnT Future"
                width={400}
                height={400}
                className="h-16 w-16 shrink-0 rounded-full border-2 border-bp-edge object-cover"
              />
              <div>
                <div className="font-display text-[17px] font-bold text-bp-ink">Syed Asrar Ahmed</div>
                <div className="text-[13px] font-semibold text-brand-700">
                  Chief Tech Consultant · runs your session
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <a
                href="mailto:syed@mntfuture.com"
                className="inline-flex items-center gap-3 text-[15px] font-medium text-slate-700 transition-colors hover:text-brand-700"
              >
                <span className="flex h-10 w-10 items-center justify-center border border-bp-edge bg-white text-brand-700">
                  <Icon name="mail" className="h-[18px] w-[18px]" />
                </span>
                syed@mntfuture.com
              </a>
              <span className="inline-flex items-center gap-3 text-[15px] font-medium text-slate-700">
                <span className="flex h-10 w-10 items-center justify-center border border-bp-edge bg-white text-brand-700">
                  <Icon name="clock" className="h-[18px] w-[18px]" />
                </span>
                Reply within one business day
              </span>
            </div>
          </div>
          <div className="border border-bp-edge bg-white p-6 shadow-[0_20px_50px_-28px_rgba(14,27,46,0.18)] sm:p-9">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
