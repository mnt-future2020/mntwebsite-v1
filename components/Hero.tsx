import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

const trustBadges = ["Agent-ready", "ADA / WCAG", "PCI DSS v4.0.1", "SOC 2", "US sales-tax"];

const avatars = [
  { initials: "VP", bg: "bg-brand-700" },
  { initials: "FO", bg: "bg-brand-900" },
  { initials: "CO", bg: "bg-brand-500" },
];

export default function Hero() {
  return (
    <section className="border-b border-line bg-gradient-to-b from-mist to-white">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-16 sm:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20 lg:pt-[88px]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9E0F7] bg-brand-50 px-3.5 py-1.5 text-[12.5px] font-semibold tracking-[0.04em] text-brand-700">
            AI-NATIVE, AGENT-READY COMMERCE
          </div>
          <h1 className="mt-[26px] font-display text-[38px] font-extrabold leading-[1.1] tracking-[-0.025em] text-ink sm:text-[46px] lg:text-[54px]">
            We build commerce platforms{" "}
            <span className="relative whitespace-nowrap text-brand-700">
              ready for AI
              <svg
                className="absolute -bottom-2 left-0 h-2.5 w-full"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 7 Q 100 1 198 6" stroke="#7BB9F8" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>{" "}
            — and the agents now driving sales.
          </h1>
          <p className="mt-[22px] max-w-[540px] text-lg leading-[1.65] text-slatey">
            MnT Future engineers AI-native, agent-ready commerce for US D2C and marketplace brands
            — headless &amp; marketplace builds, integrations, B2B, and AI agents that sell in the
            new agentic channels. Land small, expand big.
          </p>

          <div className="mt-[34px] flex flex-wrap gap-3.5">
            <Link
              href="/workshop"
              className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-7 py-3.5 text-[15.5px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(14,102,194,0.5)] transition-colors hover:bg-brand-800"
            >
              Book a free workshop
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/commerce"
              className="inline-flex items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-7 py-3.5 text-[15.5px] font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              See what we build
            </Link>
          </div>

          <div className="mt-[34px] flex items-center gap-3.5">
            <div className="flex">
              {avatars.map((a, i) => (
                <span
                  key={a.initials}
                  className={`flex h-[34px] w-[34px] items-center justify-center rounded-full border-2 border-white text-[11px] font-bold text-white ${a.bg} ${i > 0 ? "-ml-[9px]" : ""}`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <span className="text-[13.5px] text-slatey">
              Trusted by <strong className="font-semibold text-ink">US commerce founders</strong>{" "}
              &amp; product teams
            </span>
          </div>

          <div className="mt-[26px] flex flex-wrap gap-x-6 gap-y-3 border-t border-slate-200 pt-5">
            {trustBadges.map((b) => (
              <span
                key={b}
                className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-slatey"
              >
                <Icon name="shield" className="h-[15px] w-[15px] text-brand-700" />
                {b}
              </span>
            ))}
          </div>
        </div>

        {/* Browser mockup visual */}
        <div className="relative animate-fade-up" style={{ animationDelay: "120ms" }}>
          <div
            className="pointer-events-none absolute -right-7 -top-7 h-[180px] w-[180px] opacity-70"
            style={{
              backgroundImage: "radial-gradient(circle, #A9D2FB 1.5px, transparent 1.5px)",
              backgroundSize: "16px 16px",
            }}
          />
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_60px_-24px_rgba(14,27,46,0.25)]">
            <div className="flex items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-3.5 py-[11px]">
              <span className="h-[9px] w-[9px] rounded-full bg-red-300" />
              <span className="h-[9px] w-[9px] rounded-full bg-amber-200" />
              <span className="h-[9px] w-[9px] rounded-full bg-green-300" />
              <span className="ml-2.5 flex-1 rounded-md border border-slate-200 bg-white px-3 py-1 font-mono text-[11.5px] text-slate-400">
                mntfuture.com
              </span>
            </div>
            <Image
              src="/images/home-hero.jpg"
              alt="AI-native commerce platform"
              width={1600}
              height={1068}
              priority
              className="block h-[300px] w-full object-cover sm:h-[380px]"
            />
          </div>

          <div className="absolute left-0 top-[84px] flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-[0_14px_34px_-14px_rgba(14,27,46,0.25)] lg:-left-[22px]">
            <span className="flex h-[34px] w-[34px] items-center justify-center rounded-[9px] bg-emerald-50 text-emerald-600">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M15 7h6v6" />
              </svg>
            </span>
            <span className="text-[12.5px] leading-[1.4] text-slate-700">
              <strong className="block font-display text-[15px] text-ink">+24%</strong>
              conversion lift, Q1
            </span>
          </div>

          <div className="relative mx-5 -mt-[34px] flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-[18px] py-4 shadow-[0_12px_32px_-12px_rgba(14,27,46,0.18)] sm:mx-7">
            <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-brand-50 text-brand-700">
              <Icon name="check" className="h-5 w-5" />
            </span>
            <span className="text-[14.5px] leading-[1.45] text-slate-700">
              AI-native and agent-ready — built to sell to people and to AI.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
