import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";
import CTASection from "./CTASection";
import FAQ from "./FAQ";
import SectionTitle from "./SectionTitle";
import { CheckList, Breadcrumbs } from "./blocks";
import { site } from "@/lib/site";
import type { CaseStudy } from "@/lib/caseStudies";

function BrowserFrame({ src, alt, url = "lobbi.in" }: { src: string; alt: string; url?: string }) {
  return (
    <div className="overflow-hidden border border-bp-edge bg-white shadow-[0_24px_60px_-24px_rgba(14,27,46,0.25)]">
      <div className="flex items-center gap-1.5 border-b border-bp-hair bg-slate-50 px-3.5 py-[11px]">
        <span className="h-[9px] w-[9px] rounded-full bg-red-300" />
        <span className="h-[9px] w-[9px] rounded-full bg-amber-200" />
        <span className="h-[9px] w-[9px] rounded-full bg-green-300" />
        <span className="ml-2.5 rounded-md border border-bp-edge bg-white px-3 py-1 font-mono text-[11.5px] text-slate-400">
          {url}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

export default function CaseStudyPage({ cs }: { cs: CaseStudy }) {
  // Article (not bare CreativeWork): named creator + dates = the entity clarity
  // answer engines reward when deciding what to cite.
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    name: cs.title,
    headline: cs.metaTitle,
    description: cs.summary,
    image: `${site.url}${cs.cover}`,
    url: `${site.url}/work/${cs.slug}`,
    mainEntityOfPage: `${site.url}/work/${cs.slug}`,
    ...(cs.dateISO ? { datePublished: cs.dateISO, dateModified: cs.dateISO } : {}),
    author: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
    publisher: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
  };
  const faqSchema = cs.faq?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: cs.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}

      {/* HERO: story + product mockup */}
      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-10 sm:px-7 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:pt-12">
          <div className="animate-fade-up">
            <Breadcrumbs
              trail={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: cs.title }]}
              tone="light"
            />
            <div className="mt-7 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
              <span className="rounded-full bg-brand-50 px-3 py-1 text-brand-700">{cs.type}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-bp-mute">{cs.category}</span>
            </div>
            <h1 className="mt-5 font-display text-[42px] font-extrabold leading-[1.02] tracking-[-0.02em] text-bp-ink sm:text-[58px]">
              {cs.title}
            </h1>
            <p className="mt-4 max-w-md text-[17px] leading-[1.65] text-bp-mute">{cs.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-700 px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(14,102,194,0.5)] transition-colors hover:bg-brand-800"
                >
                  {cs.liveLabel || "Visit live site"}
                  <Icon name="arrow" className="h-4 w-4 -rotate-45" />
                </a>
              )}
              <Link
                href="/strategy-session"
                className="inline-flex items-center gap-2 border border-[#D8E1EC] bg-white px-7 py-3.5 text-[15px] font-semibold text-bp-ink transition-colors hover:border-brand-300 hover:text-brand-700"
              >
                Start a project
              </Link>
            </div>
          </div>
          <Reveal delay={120}>
            <div className="relative">
              <div
                className="pointer-events-none absolute -right-6 -top-6 h-[160px] w-[160px] opacity-70"
                style={{
                  backgroundImage: "radial-gradient(circle, #A9D2FB 1.5px, transparent 1.5px)",
                  backgroundSize: "16px 16px",
                }}
              />
              <div className="relative">
                <BrowserFrame src={cs.heroShot} alt={`${cs.title} product`} url={cs.frameUrl || "lobbi.in"} />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SCOPE STRIP */}
      <section className="border-b border-bp-line">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-6 gap-y-6 px-5 py-8 sm:px-7 lg:grid-cols-4">
          {cs.scope.map((s) => (
            <div key={s.label}>
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{s.label}</div>
              <div className="mt-1.5 text-sm font-medium leading-snug text-bp-ink">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-7 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">Overview</div>
            <p className="mt-4 text-[19px] leading-[1.65] text-bp-ink">{cs.summary}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-4">
              {cs.facts.map((f) => (
                <div key={f.label} className="border border-bp-edge bg-white p-5 shadow-[0_1px_3px_rgba(14,27,46,0.04)]">
                  <div className="font-display text-2xl font-bold text-bp-ink">{f.value}</div>
                  <div className="mt-1 text-xs leading-snug text-bp-faint">{f.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="border-y border-bp-line bg-bp-wash py-16 lg:py-20">
        <div className="mx-auto grid max-w-[1200px] items-start gap-10 px-5 sm:px-7 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionTitle align="left" eyebrow="The challenge" title={cs.copy?.challengeTitle || "The problem behind the build."} />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-[16.5px] leading-[1.7] text-bp-mute">{cs.problem}</p>
          </Reveal>
        </div>
      </section>

      {/* APPROACH */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-7 lg:py-24">
        <Reveal>
          <SectionTitle eyebrow="How we built it" title="A senior-led path from idea to live." />
        </Reveal>
        <div className="mt-[52px] grid gap-[22px] sm:grid-cols-2 lg:grid-cols-4">
          {cs.approach.map((a, i) => (
            <Reveal key={a.no} delay={i * 70}>
              <div className="h-full border border-bp-edge bg-white p-6 shadow-[0_1px_3px_rgba(14,27,46,0.04)]">
                <div className="font-display text-[13px] font-bold text-brand-700">{a.no}</div>
                <h3 className="mt-3 font-display text-base font-bold text-bp-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-bp-mute">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESULTS: the honest before → after proof */}
      {cs.results && cs.results.length > 0 && (
        <section className="border-y border-bp-line bg-bp-wash py-16 lg:py-24">
          <div className="mx-auto max-w-[1440px] px-[18px] sm:px-8 lg:px-14">
            <Reveal>
              <SectionTitle
                align="left"
                eyebrow="Results"
                title={cs.resultsTitle || "What did the build change?"}
                sub={cs.resultsIntro}
              />
            </Reveal>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {cs.results.map((r, i) => (
                <Reveal key={r.metric} delay={i * 70}>
                  <div className="h-full border border-bp-edge bg-white p-6 shadow-[0_1px_3px_rgba(14,27,46,0.04)]">
                    <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{r.metric}</div>
                    <div className="mt-4 text-sm text-bp-faint">{r.before}</div>
                    <div className="mt-1.5 flex items-start gap-2">
                      <Icon name="arrow" className="mt-1.5 h-4 w-4 shrink-0 rotate-90 text-brand-700 sm:rotate-0" />
                      <div className="font-display text-lg font-bold leading-snug text-bp-ink">{r.after}</div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHAT WE BUILT */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-7 lg:py-24">
        <Reveal>
          <SectionTitle eyebrow="What we built" title={cs.copy?.buildTitle || "What we shipped."} />
        </Reveal>
        <div className="mt-[52px] grid gap-[22px] lg:grid-cols-2">
          {cs.build.map((b, i) => (
            <Reveal key={b.audience} delay={i * 100}>
              <div className="h-full border border-bp-edge bg-white p-8 shadow-[0_1px_3px_rgba(14,27,46,0.04)]">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                    <Icon name={b.icon} className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-xl font-bold text-bp-ink">{b.audience}</h3>
                </div>
                <div className="mt-6">
                  <CheckList items={b.points} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRODUCT GALLERY */}
      <section className="border-y border-bp-line bg-bp-wash py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-[18px] sm:px-8 lg:px-14">
          <Reveal>
            <SectionTitle eyebrow="Inside the product" title="What we shipped, on screen." />
          </Reveal>
          <div className="mt-[52px] grid gap-[22px] lg:grid-cols-3">
            {cs.productShots.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="group h-full overflow-hidden border border-bp-edge bg-white shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-1 hover:shadow-[0_20px_44px_-18px_rgba(14,102,194,0.22)]">
                  <div className="img-zoom relative aspect-[16/10] overflow-hidden bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.src} alt={p.title} className="h-full w-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-base font-bold text-bp-ink">{p.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-bp-mute">{p.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ENGINEERING HIGHLIGHTS */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-7 lg:py-24">
        <Reveal>
          <SectionTitle
            eyebrow="Engineering highlights"
            title="Where the hard problems were."
            sub={cs.copy?.highlightsSubtitle}
          />
        </Reveal>
        <div className="mt-[52px] grid gap-[22px] md:grid-cols-2 lg:grid-cols-3">
          {cs.highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 60}>
              <div className="h-full border border-bp-edge bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]">
                <div className="flex h-[46px] w-[46px] items-center justify-center bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                  <Icon name={h.icon} className="h-[23px] w-[23px]" />
                </div>
                <h3 className="mt-[18px] font-display text-[18px] font-bold text-bp-ink">{h.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{h.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TECH DECISIONS */}
      <section className="border-y border-bp-line bg-bp-wash py-16 lg:py-24">
        <div className="mx-auto max-w-[1440px] px-[18px] sm:px-8 lg:px-14">
          <Reveal>
            <SectionTitle
              eyebrow="Tech decisions"
              title={cs.copy?.techTitle || "Why we chose each piece."}
              sub="Every technology earned its place by solving a specific problem better than the alternatives."
            />
          </Reveal>
          <div className="mt-[52px] grid gap-[18px] lg:grid-cols-2">
            {cs.techDecisions.map((t, i) => (
              <Reveal key={t.tech} delay={i * 50}>
                <div className="h-full border border-bp-edge bg-white p-6 shadow-[0_1px_3px_rgba(14,27,46,0.04)]">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    <h3 className="font-display text-base font-bold text-bp-ink">{t.tech}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-bp-mute">
                    <span className="font-semibold text-bp-ink">Used for: </span>
                    {t.used}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-bp-mute">
                    <span className="font-semibold text-brand-700">Advantage: </span>
                    {t.advantage}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section className="mx-auto max-w-[1200px] px-5 py-16 sm:px-7 lg:py-24">
        <Reveal>
          <SectionTitle eyebrow="Tech stack" title="What it's built on." />
        </Reveal>
        <div className="mt-10 grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {cs.stack.map((s) => (
            <div key={s.group} className="border border-bp-edge bg-white p-6 shadow-[0_1px_3px_rgba(14,27,46,0.04)]">
              <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-700">{s.group}</div>
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-slate-700">
                    <Icon name="check" className="h-3.5 w-3.5 text-brand-700" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {cs.liveUrl && (
          <div className="mt-12 text-center">
            <a
              href={cs.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#D8E1EC] bg-white px-6 py-3 text-sm font-semibold text-bp-ink transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              See it live: {cs.liveLabel || cs.liveUrl}
              <Icon name="arrow" className="h-4 w-4 -rotate-45" />
            </a>
          </div>
        )}
      </section>

      {/* FAQ */}
      {cs.faq && cs.faq.length > 0 && (
        <section className="border-t border-bp-line bg-bp-wash py-24">
          <div className="mx-auto max-w-[860px] px-5 sm:px-7">
            <Reveal>
              <SectionTitle eyebrow="FAQ" title="The questions buyers ask about this build." className="mb-11" />
            </Reveal>
            <FAQ items={cs.faq} />
          </div>
        </section>
      )}

      <div className="pt-24">
        <CTASection
          title={cs.copy?.ctaTitle || "Have a platform like this in mind?"}
          body={
            cs.copy?.ctaBody ||
            "This is the kind of platform we specialise in. Tell us your idea: we'll show you how we'd architect it."
          }
        />
      </div>
    </>
  );
}
