import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, BpButton, PAGE } from "@/components/blueprint";
import { MADURAI_HUB, MADURAI_SERVICES } from "@/lib/madurai";
import { resolveMetadata } from "@/lib/seo";
import { ratings, site } from "@/lib/site";

/**
 * The Madurai hub.
 *
 * It exists so the three service pages are not three orphans that each have to
 * carry the local signals alone. This page holds the name, the place, the
 * phone number and the review scores in one place, links the three trades, and
 * gives the cluster something to point at internally.
 *
 * It is also the page to extend when there is a second city. Nothing here is
 * written in a way that assumes Madurai is the only one.
 */

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/madurai", {
    title: "Software Development Company in Madurai | MnT Future",
    description:
      "MnT Future builds custom websites, ecommerce platforms and mobile apps from Madurai, Tamil Nadu. Live client platforms in travel, hospitality, construction and services. The code and data are handed over in your name.",
  });
}

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

export default function MaduraiHub() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${site.url}/in/madurai#business`,
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/in/madurai`,
    ...(site.phone ? { telephone: site.phone } : {}),
    email: site.email,
    description: MADURAI_HUB.answer,
    address: {
      "@type": "PostalAddress",
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 9.9252, longitude: 78.1198 },
    areaServed: [
      { "@type": "City", name: "Madurai" },
      { "@type": "State", name: "Tamil Nadu" },
      { "@type": "Country", name: "India" },
    ],
    priceRange: "$$",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Software development services in Madurai",
      itemListElement: Object.values(MADURAI_SERVICES).map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.keyword,
          url: `${site.url}/in/madurai/${s.slug}`,
        },
      })),
    },
    sameAs: [site.social.instagram, site.social.linkedin, site.social.facebook],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
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
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: "Madurai" }]} tone="light" />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              {MADURAI_HUB.eyebrow}
            </span>
          </div>

          <h1 className="mt-8 max-w-[17ch] animate-rise-in font-display text-[38px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[54px] lg:text-[66px]">
            {MADURAI_HUB.h1}
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            {MADURAI_HUB.heroSub}
          </p>
          <div className="mt-9 flex animate-rise-in flex-wrap gap-3 [animation-delay:200ms]">
            <BpButton href="/in/strategy-session">Talk to a Senior Engineer</BpButton>
            <BpButton href="/in/work/clients" variant="outline">
              See our work
            </BpButton>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2.5 border-t border-bp-hair pt-7 font-mono text-[12px] uppercase tracking-[0.12em] text-bp-mute">
            <span className="inline-flex min-h-[26px] items-center gap-2 py-1">
              <Icon name="pin" className="h-3.5 w-3.5 text-brand-700" />
              {site.city}, {site.state}
            </span>
            {site.phone && (
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="inline-flex min-h-[26px] items-center gap-2 py-1 transition-colors hover:text-brand-700"
              >
                <Icon name="phone" className="h-3.5 w-3.5 text-brand-700" />
                {site.phone}
              </a>
            )}
            <a
              href={`mailto:${site.email}`}
              className="inline-flex min-h-[26px] items-center gap-2 py-1 transition-colors hover:text-brand-700"
            >
              <Icon name="mail" className="h-3.5 w-3.5 text-brand-700" />
              {site.email}
            </a>
          </div>
        </div>
      </section>

      {/* THE ANSWER */}
      <section data-reveal className="border-b border-bp-line bg-bp-tint">
        <div className="mx-auto max-w-[900px] px-[18px] py-14 sm:px-8 lg:py-20">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
            In short
          </p>
          <p className="mt-5 text-[19px] leading-[1.72] text-bp-ink sm:text-[21px]">
            {MADURAI_HUB.answer}
          </p>
        </div>
      </section>

      {/* THE THREE */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="01"
            total="03"
            eyebrow="What we do here"
            title="Three things, each built properly."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {MADURAI_HUB.services.map((s, n) => (
              <Link
                key={s.slug}
                href={`/in/madurai/${s.slug}`}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="group flex flex-col border-b border-r border-bp-edge bg-white p-7 transition-colors hover:bg-bp-tint lg:p-9"
              >
                <span className="font-mono text-[11px] tracking-[0.14em] text-bp-faint">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <span className="mt-5 font-display text-[24px] font-bold leading-[1.15] tracking-[-0.03em] text-bp-ink">
                  {s.label}
                </span>
                <span className="mt-3.5 flex-1 text-[15.5px] leading-[1.7] text-bp-mute">
                  {s.desc}
                </span>
                <span className="mt-7 inline-flex items-center gap-2 border-t border-bp-hair pt-4 font-mono text-[11.5px] uppercase tracking-[0.12em] text-brand-700">
                  Read the page
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

      {/* WHY US */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="02"
            total="03"
            eyebrow="Why us"
            title="Four things that are true about working with us."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {MADURAI_HUB.why.map((w) => (
              <div key={w.title} data-stagger className="border-b border-r border-bp-edge p-7 lg:p-8">
                <span className="flex h-11 w-11 items-center justify-center border border-[#DCE6F2] bg-bp-tint text-brand-700">
                  <Icon name={w.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[18.5px] font-bold leading-[1.25] tracking-[-0.022em] text-bp-ink">
                  {w.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RATINGS */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="03"
            total="03"
            eyebrow="What clients scored us"
            title="Three platforms, and the numbers on them."
            sub="Scores our clients left, on profiles you can open. Where we cannot link the profile the number is shown as plain text rather than as a link that goes nowhere."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {ratings.map((r) => {
              const inner = (
                <>
                  <span className="font-display text-[46px] font-bold leading-none tracking-[-0.04em] text-bp-ink">
                    {r.score.toFixed(1)}
                  </span>
                  <span className="mt-4 font-mono text-[11.5px] uppercase tracking-[0.16em] text-bp-mute">
                    {r.source}
                  </span>
                </>
              );
              return r.href ? (
                <a
                  key={r.source}
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-stagger
                  className="flex flex-col items-start border-b border-r border-bp-edge bg-white p-7 transition-colors hover:bg-bp-tint lg:p-9"
                >
                  {inner}
                </a>
              ) : (
                <div
                  key={r.source}
                  data-stagger
                  className="flex flex-col items-start border-b border-r border-bp-edge bg-white p-7 lg:p-9"
                >
                  {inner}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        title="Tell us what you are trying to build."
        body="One call, about thirty minutes, with somebody who will actually work on it. If we are the wrong people for the job we will say so and tell you who is not."
        primary={{ label: "Talk to a Senior Engineer", href: "/in/strategy-session" }}
        secondary={{ label: "See our client work", href: "/in/work/clients" }}
      />
    </>
  );
}
