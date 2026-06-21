import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";
import { images } from "@/lib/site";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:56px_56px] opacity-40" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[26rem] w-[26rem] rounded-full bg-brand/15 blur-[130px]" />

      <div className="container-mnt relative grid items-center gap-12 pb-20 pt-14 sm:pt-16 lg:grid-cols-[1.04fr_0.96fr] lg:gap-16 lg:pb-28 lg:pt-20">
        <div className="animate-fade-up">
          <span className="eyebrow-dark">Healthcare &amp; e-commerce specialists</span>
          <h1 className="mt-7 font-display text-[2.6rem] font-extrabold leading-[1.06] tracking-tight sm:text-[3.6rem]">
            We build the platforms{" "}
            <span className="text-brand-300">healthcare and commerce</span> run on.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            MnT engineers compliant healthcare platforms, high-growth e-commerce
            stores, and the vertical SaaS products founders take to market. Two
            specialisms, one senior team — across India and global markets.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Start a project
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link href="#verticals" className="btn-outline-light">
              Explore our work
            </Link>
          </div>

          <div className="mt-11 border-t border-white/10 pt-6">
            <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-medium text-white/55">
              {["HIPAA", "ABDM / FHIR", "ISO 27001", "SOC 2", "GDPR"].map((c) => (
                <span key={c} className="inline-flex items-center gap-2">
                  <Icon name="shield" className="h-4 w-4 text-brand-300" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Professional photographic visual */}
        <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div className="absolute -right-6 -top-6 h-28 w-28 rounded-3xl border border-brand/30 sm:h-36 sm:w-36" />
          <div className="relative overflow-hidden rounded-[1.75rem] ring-1 ring-white/10 shadow-2xl">
            <Image
              src={images.hero}
              alt="A clinician using MnT software on a laptop"
              width={1600}
              height={1200}
              priority
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="h-[360px] w-full object-cover sm:h-[460px]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/5 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3 rounded-2xl border border-white/15 bg-navy/70 px-4 py-3 backdrop-blur-md">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand text-white">
                <Icon name="check" className="h-5 w-5" />
              </span>
              <p className="text-sm leading-snug text-white/85">
                Compliant by design — from first commit to certification.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
