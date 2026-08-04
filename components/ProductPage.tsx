import Link from "next/link";
import Icon, { IconName } from "./Icon";
import { QA } from "./FAQ";
import BlueprintFaq from "./BlueprintFaq";
import BlueprintMotion from "./BlueprintMotion";
import CTASection from "./CTASection";
import { Breadcrumbs } from "./blocks";
import { SectionHead, RuleLabel, BpButton, MakerMark, PAGE } from "./blueprint";
import { site } from "@/lib/site";

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

/**
 * Template for the three India products.
 *
 * Written for a buyer, not an engineer: every section answers a question
 * somebody actually asks on a sales call, in the order they ask it. What is
 * this, what is wrong today, what do I get, what do I own, what do you change
 * for me, what do you need from me, how long, and where did it come from.
 *
 * That last one is not optional. Two of the three start from open-source
 * platforms, and a buyer who works that out for themselves after signing is a
 * buyer we have lost. Saying it plainly is both honest and a better sale.
 */
export type ProductConfig = {
  slug: string;
  name: string;
  eyebrow: string;
  h1: React.ReactNode;
  heroSub: string;
  chips: string[];
  forWho: string;
  problem: { title: string; sub?: string; points: string[] };
  getsTitle: string;
  gets: { icon: IconName; what: string; does: string }[];
  ownsTitle: string;
  owns: { title: string; desc: string }[];
  customise: string[];
  needsTitle: string;
  needs: { label: string; note: string }[];
  timeline: { no: string; title: string; desc: string }[];
  /** Where the software came from. Shown verbatim; never soften it. */
  origin: { title: string; body: string; note?: string };
  faq: QA[];
  cta: { title: string; body: string };
};

export default function ProductPage({ config: c }: { config: ProductConfig }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: c.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${site.url}${c.slug}`,
    provider: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <BlueprintMotion />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-14 pt-10 lg:pb-20 lg:pt-12`}>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/in" },
              { label: "Products", href: "/in/products" },
              { label: c.name },
            ]}
            tone="light"
          />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              {c.eyebrow}
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              {c.name}
            </span>
          </div>

          <h1 className="mt-8 max-w-[19ch] animate-rise-in font-display text-[38px] font-bold leading-[0.99] tracking-[-0.048em] text-bp-ink sm:text-[54px] lg:text-[72px]">
            {c.h1}
          </h1>

          <div className="mt-9 grid items-start gap-9 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
            <p className="m-0 max-w-[58ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
              {c.heroSub}
            </p>
            <div className="animate-rise-in border-l-2 border-brand-500 bg-bp-tint px-6 py-5 [animation-delay:200ms]">
              <div className="font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.2em] text-brand-700">
                Who it is for
              </div>
              <p className="m-0 mt-2.5 text-[15px] leading-[1.65] text-bp-body">{c.forWho}</p>
            </div>
          </div>

          <div className="mt-9 grid animate-rise-in border-l border-t border-bp-hair [animation-delay:280ms] sm:grid-cols-2 lg:grid-cols-4">
            {c.chips.map((chip, i) => (
              <div key={chip} className="flex items-baseline gap-3 border-b border-r border-bp-hair px-5 py-4">
                <span className="font-mono text-[11px] sm:text-[10.5px] tracking-[0.12em] text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-mono text-[12.5px] leading-[1.5] text-[#334458]">{chip}</span>
              </div>
            ))}
          </div>

          <div className="mt-9 flex flex-wrap gap-3">
            <BpButton href="/in/strategy-session">Book a strategy session</BpButton>
            <BpButton href="/in/products" variant="outline">
              Compare the products
            </BpButton>
          </div>
        </div>
      </section>

      {/* 01 THE PROBLEM */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="01" total="05" eyebrow="What happens today" title={c.problem.title} sub={c.problem.sub} />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 sm:grid-cols-2">
            {c.problem.points.map((p, i) => (
              <div key={p} data-stagger className="flex gap-4 border-b border-r border-bp-edge bg-white p-7">
                <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="m-0 text-[15.5px] leading-[1.7] text-bp-body">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 WHAT YOU GET */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="02"
            total="05"
            eyebrow="What you get"
            title={c.getsTitle}
            sub="Left is what you get. Right is what it changes about your day. If a feature does not change something on the right, it does not belong on this page."
          />
          <div className="mt-11 border-t border-bp-edge lg:mt-16">
            {c.gets.map((g) => (
              <div
                key={g.what}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="grid gap-3 border-b border-bp-edge py-6 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12 lg:py-7"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                    <Icon name={g.icon} className="h-[17px] w-[17px]" />
                  </span>
                  <h3 className="m-0 font-display text-[18px] font-bold leading-[1.3] tracking-[-0.022em] text-bp-ink">
                    {g.what}
                  </h3>
                </div>
                <p className="m-0 text-[15.5px] leading-[1.72] text-bp-mute">{g.does}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 WHAT YOU OWN + WHAT WE CHANGE */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="03" total="05" eyebrow="Ownership" title={c.ownsTitle} />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {c.owns.map((o) => (
              <div key={o.title} data-stagger className="border-b border-r border-bp-edge bg-white p-7 lg:p-8">
                <h3 className="m-0 font-display text-[19px] font-bold tracking-[-0.024em] text-bp-ink">
                  {o.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-bp-mute">{o.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div>
              <RuleLabel>What we customise for you</RuleLabel>
              <p className="mt-4 max-w-[42ch] text-[15px] leading-[1.7] text-bp-mute">
                This is the part you are paying us for. The software is the starting point, not the
                deliverable.
              </p>
            </div>
            <div className="border-t border-bp-edge">
              {c.customise.map((item) => (
                <div key={item} data-stagger className="flex items-start gap-3.5 border-b border-bp-edge py-4">
                  <span className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-brand-500/[0.09] text-brand-700">
                    <Icon name="check" className="h-[11px] w-[11px]" />
                  </span>
                  <span className="text-[15.5px] leading-[1.65] text-bp-body">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 04 WHAT WE NEED + TIMELINE */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="04"
            total="05"
            eyebrow="Getting started"
            title={c.needsTitle}
            sub="Said plainly up front, because finding out about a prerequisite three weeks in is the fastest way to lose a month."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {c.needs.map((n) => (
              <div key={n.label} data-stagger className="border-b border-r border-bp-edge bg-bp-tint p-6 lg:p-7">
                <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">
                  {n.label}
                </div>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{n.note}</p>
              </div>
            ))}
          </div>

          <div className="mt-14">
            <RuleLabel>How it goes live</RuleLabel>
            <div className="mt-5 grid border-l border-t border-bp-edge sm:grid-cols-2 lg:grid-cols-4">
              {c.timeline.map((t) => (
                <div key={t.no} data-stagger className="border-b border-r border-bp-edge bg-white p-6 lg:p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">{t.no}</span>
                    <span className="h-px flex-1 bg-bp-hair" />
                  </div>
                  <h3 className="mt-5 font-display text-[17px] font-bold tracking-[-0.022em] text-bp-ink">
                    {t.title}
                  </h3>
                  <p className="mt-2.5 text-[14px] leading-[1.65] text-bp-mute">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 05 WHERE IT CAME FROM */}
      <section data-reveal className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div>
              <RuleLabel tone="dark">Where this comes from</RuleLabel>
              <h2 className="mt-6 max-w-[16ch] font-display text-[30px] font-bold leading-[1.06] tracking-[-0.038em] text-white lg:text-[40px]">
                {c.origin.title}
              </h2>
            </div>
            <div>
              <p className="m-0 max-w-[62ch] text-[17px] leading-[1.75] text-white/70">
                {c.origin.body}
              </p>
              {c.origin.note && (
                <p className="mt-5 max-w-[62ch] border-l-2 border-brand-500 pl-5 text-[15px] leading-[1.7] text-white/55">
                  {c.origin.note}
                </p>
              )}
              <MakerMark group="own" detail="Hosted, branded and supported by us" tone="dark" className="mt-9" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="06" total="06" eyebrow="Questions" title="What buyers ask us." />
          <div className="mx-auto mt-11 max-w-[1080px] lg:mt-16">
            <BlueprintFaq items={c.faq} />
          </div>
          <div className="mt-12 border-t border-bp-edge pt-8">
            <RuleLabel>The other products</RuleLabel>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
                { label: "MnT AI Desk", href: "/in/products/ai-desk" },
                { label: "MnT AI CRM", href: "/in/products/ai-crm" },
                { label: "MnT Commerce India", href: "/in/products/commerce-india" },
                { label: "Which one do I need?", href: "/in/products" },
              ]
                .filter((p) => p.href !== c.slug)
                .map((p) => (
                  <Link
                    key={p.href}
                    href={p.href}
                    className="border border-[#D8E1EC] bg-white px-4 py-2.5 font-mono text-[12px] tracking-[0.06em] text-bp-mute transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
                  >
                    {p.label}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title={c.cta.title}
        body={c.cta.body}
        primary={{ label: "Book a strategy session", href: "/in/strategy-session" }}
        secondary={{ label: "See our work", href: "/in/work" }}
      />
    </>
  );
}
