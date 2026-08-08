import Link from "next/link";
import Icon from "./Icon";
import CTASection from "./CTASection";
import BlueprintFaq from "./BlueprintFaq";
import BlueprintMotion from "./BlueprintMotion";
import { Breadcrumbs } from "./blocks";
import { SectionHead, BpButton, PAGE } from "./blueprint";
import { site } from "@/lib/site";
import type { Industry } from "@/lib/indiaIndustries";

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

/**
 * An industry page.
 *
 * The proof band is the reason the page is allowed to exist: the content plan
 * says to build these only for sectors where we have credible capability, so
 * every page names the client work behind the claim and links to it. If a
 * sector ever loses its proof, the page should go, not soften.
 */
export default function IndustryPage({ industry: i }: { industry: Industry }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: i.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: `${i.name} software development`,
    provider: { "@type": "Organization", name: site.name, legalName: site.legalName },
    areaServed: ["India"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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
        <div className={`relative ${PAGE} pb-14 pt-10 lg:pb-20 lg:pt-14`}>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/in" },
              { label: "Industries", href: "/in/industries" },
              { label: i.name },
            ]}
            tone="light"
          />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              {i.eyebrow}
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              India
            </span>
          </div>

          <h1 className="mt-8 max-w-[17ch] animate-rise-in font-display text-[38px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[54px] lg:text-[68px]">
            {i.name}
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            {i.heroSub}
          </p>
          <div className="mt-9 flex animate-rise-in flex-wrap gap-3 [animation-delay:200ms]">
            <BpButton href="/in/strategy-session">Talk to a Senior Engineer</BpButton>
            <BpButton href="/in/work/clients" variant="outline">
              See our work
            </BpButton>
          </div>
        </div>
      </section>

      {/* THE PROBLEM */}
      <section data-reveal className="border-b border-bp-line">
        <div className="mx-auto max-w-[900px] px-[18px] py-16 text-center sm:px-8 lg:py-24">
          <h2 className="font-display text-[28px] font-bold tracking-[-0.035em] text-bp-ink sm:text-[38px]">
            {i.problem.title}
          </h2>
          <p className="mt-5 text-[17px] leading-[1.75] text-bp-mute">{i.problem.body}</p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead no="01" total="03" eyebrow="What we build" title={i.buildsTitle} />
          <div className="mt-11 grid border-l border-t border-bp-edge md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {i.builds.map((b, n) => (
              <div
                key={b.title}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="border-b border-r border-bp-edge bg-white p-7 lg:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center border border-[#DCE6F2] bg-bp-tint text-brand-700">
                    <Icon name={b.icon} className="h-5 w-5" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.14em] text-bp-faint">
                    {String(n + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[18.5px] font-bold leading-[1.25] tracking-[-0.022em] text-bp-ink">
                  {b.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="02"
            total="03"
            eyebrow="Proof"
            title={i.proofTitle}
            sub="Named, linked and live. We do not write an industry page for a sector we cannot show work in."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-2">
            {i.proof.map((p) => (
              <Link
                key={p.href}
                href={p.href}
                data-stagger
                className="group flex flex-col border-b border-r border-bp-edge bg-white p-7 transition-colors hover:bg-bp-tint lg:p-9"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                  {p.kind}
                </span>
                <span className="mt-3.5 font-display text-[23px] font-bold leading-[1.15] tracking-[-0.028em] text-bp-ink">
                  {p.name}
                </span>
                <span className="mt-3.5 flex-1 text-[15px] leading-[1.7] text-bp-mute">{p.what}</span>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-bp-hair pt-4 font-mono text-[11.5px] uppercase tracking-[0.12em] text-brand-700">
                  Read it
                  <Icon
                    name="arrow"
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead no="03" total="03" eyebrow="Questions" title="What buyers in this sector ask." />
          <div className="mx-auto mt-11 max-w-[1080px] lg:mt-16">
            <BlueprintFaq items={i.faq} />
          </div>
        </div>
      </section>

      <CTASection
        title={i.cta.title}
        body={i.cta.body}
        primary={{ label: i.cta.label, href: "/in/strategy-session" }}
        secondary={{ label: "See all industries", href: "/in/industries" }}
      />
    </>
  );
}
