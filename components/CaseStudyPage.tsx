import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";
import CTASection from "./CTASection";
import SpotlightCard from "./SpotlightCard";
import { SectionHeading, CheckList, Breadcrumbs } from "./blocks";
import { site } from "@/lib/site";
import type { CaseStudy } from "@/lib/caseStudies";

function BrowserFrame({ src, alt, url = "lobbi.in" }: { src: string; alt: string; url?: string }) {
  return (
    <div className="overflow-hidden rounded-2xl ring-1 ring-white/10 shadow-2xl">
      <div className="flex items-center gap-2 bg-navy-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
        <span className="ml-3 rounded bg-white/10 px-2 py-0.5 text-[11px] text-white/55">{url}</span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}

export default function CaseStudyPage({ cs }: { cs: CaseStudy }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: cs.title,
    headline: cs.metaTitle,
    description: cs.summary,
    image: `${site.url}${cs.cover}`,
    url: cs.liveUrl,
    creator: { "@type": "Organization", name: "MnT (Magizh NexGen Technologies)", url: site.url },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/work` },
      { "@type": "ListItem", position: 3, name: cs.title, item: `${site.url}/work/${cs.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />

      {/* HERO — split: story + product mockup */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:56px_56px] opacity-25" />
        <div className="pointer-events-none absolute -left-40 top-10 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[130px]" />
        <div className="container-mnt relative grid items-center gap-12 pb-16 pt-10 sm:pt-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div className="animate-fade-up">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Work", href: "/work" }, { label: cs.title }]} />
            <div className="mt-6 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
              <span className="rounded-full bg-brand/20 px-3 py-1 text-brand-200">{cs.type}</span>
              <span className="rounded-full bg-white/10 px-3 py-1 text-white/70">{cs.category}</span>
            </div>
            <h1 className="mt-5 font-display text-[3rem] font-extrabold leading-[1] tracking-tight sm:text-[4rem]">
              {cs.title}
            </h1>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">{cs.tagline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {cs.liveUrl && (
                <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  {cs.liveLabel || "Visit live site"} <Icon name="arrow" className="h-4 w-4 -rotate-45" />
                </a>
              )}
              <Link href="/contact" className="btn-outline-light">Start a project</Link>
            </div>
          </div>
          <Reveal delay={120}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-brand/10 blur-2xl" />
              <div className="relative">
                <BrowserFrame src={cs.heroShot} alt={`${cs.title} product`} url="lobbi.in" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SCOPE STRIP */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container-mnt grid grid-cols-2 gap-x-6 gap-y-6 py-8 lg:grid-cols-4">
          {cs.scope.map((s) => (
            <div key={s.label}>
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{s.label}</div>
              <div className="mt-1.5 text-sm font-medium leading-snug text-ink">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="container-mnt py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <Reveal>
            <span className="eyebrow">Overview</span>
            <p className="mt-5 text-xl leading-relaxed text-ink">{cs.summary}</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-4">
              {cs.facts.map((f) => (
                <div key={f.label} className="rounded-2xl border border-slate-100 bg-soft p-5">
                  <div className="font-display text-2xl font-extrabold text-ink">{f.value}</div>
                  <div className="mt-1 text-xs leading-snug text-slatey">{f.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHALLENGE */}
      <section className="bg-soft py-16 sm:py-20">
        <div className="container-mnt grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading align="left" eyebrow="The challenge" title="Two sides, one platform." />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg leading-relaxed text-slatey">{cs.problem}</p>
          </Reveal>
        </div>
      </section>

      {/* APPROACH */}
      <section className="container-mnt py-16 sm:py-20">
        <SectionHeading eyebrow="How we built it" title="A senior-led path from idea to live." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cs.approach.map((a, i) => (
            <Reveal key={a.no} delay={i * 70}>
              <div className="h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
                <div className="font-display text-3xl font-extrabold text-brand-200">{a.no}</div>
                <h3 className="mt-3 text-base font-bold text-ink">{a.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slatey">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE BUILT */}
      <section className="bg-soft py-16 sm:py-20">
        <div className="container-mnt">
          <SectionHeading eyebrow="What we built" title="A consumer app and an operations platform." />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {cs.build.map((b, i) => (
              <Reveal key={b.audience} delay={i * 100}>
                <div className="h-full rounded-3xl border border-slate-100 bg-white p-8 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand text-white">
                      <Icon name={b.icon} className="h-6 w-6" />
                    </span>
                    <h3 className="font-display text-xl font-bold text-ink">{b.audience}</h3>
                  </div>
                  <div className="mt-6">
                    <CheckList items={b.points} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GALLERY */}
      <section className="container-mnt py-16 sm:py-20">
        <SectionHeading eyebrow="Inside the product" title="What we shipped, on screen." />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {cs.productShots.map((p, i) => (
            <Reveal key={p.title} delay={i * 80}>
              <div className="group h-full overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-cardhover">
                <div className="img-zoom relative aspect-[16/10] overflow-hidden bg-soft">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-base font-bold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slatey">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ENGINEERING HIGHLIGHTS */}
      <section className="bg-soft py-16 sm:py-20">
        <div className="container-mnt">
          <SectionHeading
            eyebrow="Engineering highlights"
            title="Where the hard problems were."
            subtitle="The parts that make LOBBI hold up under real, concurrent, money-moving load."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {cs.highlights.map((h, i) => (
              <Reveal key={h.title} delay={i * 60}>
                <SpotlightCard className="card card-hover group h-full">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={h.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-ink">{h.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-slatey">{h.desc}</p>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TECH DECISIONS — why each technology, and the advantage */}
      <section className="container-mnt py-16 sm:py-20">
        <SectionHeading
          eyebrow="Tech decisions"
          title="Why we chose each piece — and what it bought LOBBI."
          subtitle="Every technology earned its place by solving a specific problem better than the alternatives."
        />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {cs.techDecisions.map((t, i) => (
            <Reveal key={t.tech} delay={i * 50}>
              <div className="h-full rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
                <div className="flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-brand" />
                  <h3 className="font-display text-base font-bold text-ink">{t.tech}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slatey">
                  <span className="font-semibold text-ink">Used for: </span>{t.used}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slatey">
                  <span className="font-semibold text-brand-700">Advantage: </span>{t.advantage}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section className="bg-soft py-16 sm:py-20">
        <div className="container-mnt">
        <SectionHeading eyebrow="Tech stack" title="What it's built on." />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cs.stack.map((s) => (
            <div key={s.group} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-card">
              <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{s.group}</div>
              <ul className="mt-4 space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm text-ink">
                    <Icon name="check" className="h-4 w-4 text-brand" /> {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {cs.liveUrl && (
          <div className="mt-12 text-center">
            <a href={cs.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              See it live — {cs.liveLabel || cs.liveUrl} <Icon name="arrow" className="h-4 w-4 -rotate-45" />
            </a>
          </div>
        )}
        </div>
      </section>

      <CTASection
        title="Have a platform like this in mind?"
        body="LOBBI is the kind of multi-sided, real-time platform we specialise in. Tell us your idea — we'll show you how we'd architect it."
      />
    </>
  );
}
