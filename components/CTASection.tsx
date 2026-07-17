import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function CTASection({
  title = "Tell us what you're building. We'll show you how we'd build it.",
  body = "A free architecture workshop with a senior consultant — data model, APIs, and a scalability plan. Or a free agent-readiness audit of your store.",
  primary = { label: "Book a free workshop", href: "/workshop" },
  secondary = { label: "See our work", href: "/work" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-[1200px] px-5 pb-24 sm:px-7">
      <Reveal>
        <div className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-brand-700 to-brand-900 px-8 py-[72px] text-center">
          {/* faint grid */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
          />
          <div className="pointer-events-none absolute -left-[70px] -top-[70px] h-[260px] w-[260px] rounded-full bg-brand-500/45 blur-[80px]" />
          <div className="pointer-events-none absolute -bottom-20 -right-[60px] h-[260px] w-[260px] rounded-full bg-brand-200/30 blur-[80px]" />

          <div className="relative mx-auto max-w-[680px]">
            <h2 className="font-display text-[28px] font-bold leading-[1.18] tracking-[-0.02em] text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-[540px] text-[15.5px] leading-[1.65] text-white/[0.85]">
              {body}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
              <Link
                href={primary.href}
                className="inline-flex items-center gap-2 rounded-[10px] bg-white px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:bg-brand-50"
              >
                {primary.label}
                <Icon name="arrow" className="h-[15px] w-[15px]" />
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/50 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.12]"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
