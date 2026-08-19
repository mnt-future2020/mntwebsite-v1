import Link from "next/link";
import Icon from "./Icon";
import CTASection from "./CTASection";
import Partners from "./Partners";
import RatingsRibbon from "./RatingsRibbon";
import BlueprintFaq from "./BlueprintFaq";
import BlueprintMotion from "./BlueprintMotion";
import { Breadcrumbs } from "./blocks";
import { SectionHead, BpButton, PAGE } from "./blueprint";
import { site } from "@/lib/site";
import type { LocalService } from "@/lib/madurai";

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

/**
 * A local service page: one keyword, one city, one trade.
 *
 * Three things here are doing SEO work that the layout does not make obvious.
 *
 * The answer block sits directly under the hero, before anything persuasive.
 * It is written to be lifted whole by an answer engine, so it says who we are,
 * where we are and what we do in plain sentences with no build-up. A page that
 * opens on a slogan gives a model nothing to quote.
 *
 * The schema declares a ProfessionalService, not just an Organization. The
 * site-wide Organization block is correct and stays; it is simply the wrong
 * shape for "in Madurai" queries, which want a business with an area served
 * and a place. The coordinates are the city, not a doorway, because we have
 * not published a street address and inventing precision in structured data is
 * the kind of lie that is trivially caught.
 *
 * The "not for" block is not modesty. Three of these keywords bring in buyers
 * who want a template site next week, and a page that refuses that work in
 * writing costs one bad lead and buys the credibility of everything above it.
 */
export default function LocalServicePage({ service: s }: { service: LocalService }) {
  const url = `${site.url}/in/madurai/${s.slug}`;

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#business`,
    name: site.name,
    legalName: site.legalName,
    url,
    ...(site.phone ? { telephone: site.phone } : {}),
    email: site.email,
    description: s.answer,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.street,
      addressLocality: site.city,
      addressRegion: site.state,
      addressCountry: "IN",
    },
    // Madurai city centre, not the office rooftop: these are the city-wide
    // service pages, and a pin surveyed to the doorstep would imply a
    // catchment we do not mean. The street address sits in `address` above.
    geo: { "@type": "GeoCoordinates", latitude: 9.9252, longitude: 78.1198 },
    areaServed: [
      { "@type": "City", name: "Madurai" },
      { "@type": "State", name: "Tamil Nadu" },
      { "@type": "Country", name: "India" },
    ],
    serviceType: s.keyword,
    priceRange: "$$",
    sameAs: [site.social.instagram, site.social.linkedin, site.social.facebook],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const crumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/in` },
      { "@type": "ListItem", position: 2, name: "Madurai", item: `${site.url}/in/madurai` },
      { "@type": "ListItem", position: 3, name: s.navLabel, item: url },
    ],
  };

  return (
    <>
      {[businessSchema, faqSchema, crumbSchema].map((sc, n) => (
        <script
          key={n}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(sc) }}
        />
      ))}
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
              { label: "Madurai", href: "/in/madurai" },
              { label: s.navLabel },
            ]}
            tone="light"
          />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              {s.eyebrow}
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              Tamil Nadu
            </span>
          </div>

          {/* The H1 is the search phrase, unedited. It is the one place on the
              page where matching the query exactly is worth more than style. */}
          <h1 className="mt-8 max-w-[18ch] animate-rise-in font-display text-[36px] font-bold leading-[1.02] tracking-[-0.045em] text-bp-ink sm:text-[50px] lg:text-[62px]">
            {s.keyword}
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            {s.heroSub}
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
          <p className="mt-5 text-[19px] leading-[1.72] text-bp-ink sm:text-[21px]">{s.answer}</p>
        </div>
      </section>

      {/* WHAT WE BUILD */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead no="01" total="06" eyebrow="What we build" title={s.buildsTitle} />
          <div className="mt-11 grid border-l border-t border-bp-edge md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {s.builds.map((b, n) => (
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

      {/* THE SPECIFICS */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="02"
            total="06"
            eyebrow="The specifics"
            title="Timelines and terms, before you ask."
            sub="We do not publish prices, because a number quoted before we understand your business is a number you cannot plan around. Everything else that is normally hidden until the second meeting is here."
          />
          <dl className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {s.engagement.map((e) => (
              <div key={e.label} data-stagger className="border-b border-r border-bp-edge p-7 lg:p-9">
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                  {e.label}
                </dt>
                <dd className="mt-4 font-display text-[27px] font-bold leading-[1.1] tracking-[-0.032em] text-bp-ink">
                  {e.value}
                </dd>
                <dd className="mt-3.5 text-[14.5px] leading-[1.7] text-bp-mute">{e.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* STACK */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="03"
            total="06"
            eyebrow="What it is built with"
            title="Named, so you can check it."
            sub="You are entitled to know what your business will be running on, and to have somebody else look at the answer."
          />
          <div className="mt-11 grid gap-px border border-bp-edge bg-bp-edge lg:mt-16 lg:grid-cols-3">
            {s.stack.map((g) => (
              <div key={g.group} data-stagger className="bg-white p-7 lg:p-9">
                <h3 className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                  {g.group}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {g.items.map((it) => (
                    <li
                      key={it}
                      className="border border-[#D8E1EC] bg-bp-tint px-3 py-2 font-mono text-[12px] tracking-[0.04em] text-bp-ink"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead no="04" total="06" eyebrow="How it goes" title="Four steps, and you are in two of them." />
          <ol className="mt-11 grid border-l border-t border-bp-edge md:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {s.process.map((p, n) => (
              <li key={p.title} data-stagger className="border-b border-r border-bp-edge p-7 lg:p-8">
                <span className="font-mono text-[11px] tracking-[0.14em] text-bp-faint">
                  {String(n + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[18px] font-bold leading-[1.25] tracking-[-0.022em] text-bp-ink">
                  {p.title}
                </h3>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{p.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* PROOF */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="05"
            total="06"
            eyebrow="Proof"
            title={s.proofTitle}
            sub="Named, linked and live. Open any of them in another tab and check that it is a real business before you read another word here."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-2">
            {s.proof.map((p) => (
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

      <RatingsRibbon />
      <Partners />

      {/* WHO THIS IS NOT FOR */}
      <section data-reveal className="border-b border-bp-line bg-bp-ink text-white">
        <div className="mx-auto max-w-[900px] px-[18px] py-16 sm:px-8 lg:py-24">
          <p className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-300">
            Do not hire us if
          </p>
          <h2 className="mt-6 font-display text-[28px] font-bold leading-[1.1] tracking-[-0.035em] sm:text-[38px]">
            Three reasons to call somebody else.
          </h2>
          <ul className="mt-9 space-y-4">
            {s.notFor.map((n) => (
              <li key={n} className="flex items-start gap-4 border-t border-white/12 pt-4">
                <Icon name="x" className="mt-1 h-4 w-4 shrink-0 text-brand-300" />
                <span className="text-[16.5px] leading-[1.7] text-white/75">{n}</span>
              </li>
            ))}
          </ul>
          <p className="mt-9 text-[15px] leading-[1.7] text-white/50">
            We would rather lose the enquiry here than three weeks into a project neither of us
            wanted.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="06"
            total="06"
            eyebrow="Questions"
            title="What people in Madurai actually ask us."
          />
          <div className="mx-auto mt-11 max-w-[1080px] lg:mt-16">
            <BlueprintFaq items={s.faq} />
          </div>
        </div>
      </section>

      <CTASection
        title={s.cta.title}
        body={s.cta.body}
        primary={{ label: s.cta.label, href: "/in/strategy-session" }}
        secondary={{ label: "All Madurai services", href: "/in/madurai" }}
      />
    </>
  );
}
