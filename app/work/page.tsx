import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/caseStudies";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: { absolute: "Our Work — Case Studies | MnT Future" },
  description:
    "Platforms MnT Future has designed and built — real, live products engineered end to end for US D2C and marketplace brands.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-40" />
        <div className="pointer-events-none absolute -left-40 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[120px]" />
        <div className="container-mnt relative py-16 sm:py-20">
          <span className="eyebrow-dark">Selected work</span>
          <h1 className="mt-6 max-w-2xl font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl">
            Platforms we&apos;ve designed and built.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Real, live products — architected end to end. Judge our engineering from what we ship,
            not a logo wall.
          </p>
        </div>
      </section>

      <section className="container-mnt py-16 sm:py-20">
        <div className="grid gap-7 sm:grid-cols-2">
          {caseStudies.map((c, i) => (
            <Reveal key={c.slug} delay={i * 80}>
              <Link
                href={`/work/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-slate-100 bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-cardhover"
              >
                <div className="img-zoom relative aspect-[16/9] overflow-hidden">
                  <Image src={c.cover} alt={`${c.title} — ${c.tagline}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">{c.type}</span>
                  <h2 className="mt-2 font-display text-2xl font-bold text-ink">{c.title}</h2>
                  <p className="mt-2 text-[15px] leading-relaxed text-slatey">{c.tagline}</p>
                  <span className="link-arrow mt-auto pt-6">
                    Read the case study <Icon name="arrow" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}

          {/* Workshop CTA card */}
          <Reveal delay={caseStudies.length * 80}>
            <div className="flex h-full flex-col justify-center rounded-[1.75rem] border border-dashed border-slate-200 bg-soft p-8 text-center">
              <h2 className="font-display text-xl font-bold text-ink">Your platform here next?</h2>
              <p className="mx-auto mt-2 max-w-sm text-[15px] leading-relaxed text-slatey">
                Book a free architecture workshop — we&apos;ll show you exactly how we&apos;d build it:
                database design, APIs, scalability plan.
              </p>
              <div className="mt-6">
                <Link href="/contact" className="btn-primary">
                  Book a workshop <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
