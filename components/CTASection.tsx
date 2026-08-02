import Link from "next/link";
import Icon from "./Icon";
import { PAGE } from "./blueprint";

export default function CTASection({
  title = "Tell us what you're building. We'll show you how we'd build it.",
  body = "A free strategy session with a senior consultant: data model, APIs, and a scalability plan. Or a free agent-readiness audit of your store.",
  primary = { label: "Book a free strategy session", href: "/strategy-session" },
  secondary = { label: "See our work", href: "/work" },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section id="cta" className="relative overflow-hidden bg-bp-ink">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg,rgba(32,149,241,0.26),rgba(62,81,182,0.16) 52%,transparent 78%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.045) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.045) 1px,transparent 1px)",
          backgroundSize: "58px 58px",
        }}
        aria-hidden="true"
      />
      {/* Registration marks, as on the hero frame. */}
      <span className="absolute left-6 top-6 h-[11px] w-[11px] border-l border-t border-white/40" />
      <span className="absolute right-6 top-6 h-[11px] w-[11px] border-r border-t border-white/40" />
      <span className="absolute bottom-6 left-6 h-[11px] w-[11px] border-b border-l border-white/40" />
      <span className="absolute bottom-6 right-6 h-[11px] w-[11px] border-b border-r border-white/40" />

      <div className={`relative ${PAGE} py-20 text-center lg:py-[140px]`}>
        <span className="inline-block font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-300">
          Next step
        </span>
        <h2 className="mx-auto mt-6 max-w-[21ch] font-display text-[32px] font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-[46px] lg:text-[62px]">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-[58ch] text-[17.5px] leading-[1.7] text-[#A9BCD2]">{body}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href={primary.href}
            className="inline-flex items-center gap-2.5 bg-white px-[30px] py-[17px] font-mono text-[13.5px] font-semibold tracking-[0.04em] text-bp-ink transition-all hover:-translate-y-0.5 hover:bg-brand-500"
          >
            {primary.label}
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
          <Link
            href={secondary.href}
            className="inline-flex items-center gap-2.5 border border-white/35 px-[30px] py-[17px] font-mono text-[13.5px] font-semibold tracking-[0.04em] text-white transition-colors hover:border-white hover:bg-white/10"
          >
            {secondary.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
