import Image from "next/image";
import Link from "next/link";
import Icon from "./Icon";

// Phrased as what we perform, not what we warrant, and labelled "What we build
// to" rather than sat behind shield icons: a seal-shaped icon over-claims even
// when the words behave. See the compliance-language rules in the sales docs.
const buildStandards = [
  "Built to WCAG 2.2 AA",
  "PCI DSS v4.0.1 scope minimised",
  "Sales-tax engine integrated",
  "SOC 2-aligned controls",
];

export default function Hero() {
  return (
    <section className="border-b border-line bg-gradient-to-b from-mist to-white">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-5 pb-16 pt-16 sm:px-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-20 lg:pt-[88px]">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#C9E0F7] bg-brand-50 px-3.5 py-1.5 text-[12.5px] font-semibold tracking-[0.04em] text-brand-700">
            CUSTOM COMMERCE PLATFORMS · US BRANDS
          </div>
          {/*
            Opens on their gap, not on our capability, and asks rather than
            boasts: the category question is the one move that cannot be argued
            with, and "ahead of your competitors" is the one that invites a buyer
            to fact-check everything else. Plain sentence first, acronyms second.
          */}
          <h1 className="mt-[26px] font-display text-[32px] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink sm:text-[40px] lg:text-[46px]">
            Shoppers are starting to buy inside AI assistants. Can they{" "}
            <span className="relative whitespace-nowrap text-brand-700">
              buy from you
              <svg
                className="absolute -bottom-2 left-0 h-2.5 w-full"
                viewBox="0 0 200 10"
                preserveAspectRatio="none"
                fill="none"
                aria-hidden="true"
              >
                <path d="M2 7 Q 100 1 198 6" stroke="#7BB9F8" strokeWidth="3.5" strokeLinecap="round" />
              </svg>
            </span>
            ?
          </h1>
          {/*
            The headline is the hook (their gap). This is the converter: what we
            build and who builds it. Urgency without "but who are you?" answered
            is how a deal stalls politely — so the platform work and the
            senior-only delivery come before the protocol names, not after.
          */}
          <p className="mt-[22px] max-w-[560px] text-lg leading-[1.65] text-slatey">
            We engineer custom commerce platforms for US brands: storefronts, marketplaces, B2B, and
            the integrations behind them. Senior engineers end to end, no juniors on client work.
            And built so an AI agent can read your catalogue, trust your stock and price, and finish
            a checkout on its own: what ACP, Google UCP and Retail MCP make possible.
          </p>

          {/*
            The scan leads, the call follows. Trust is the weakest card we hold,
            and the scan is the one asset that demonstrates the work instead of
            claiming it: it asks a stranger for a URL, not an hour of their diary.
          */}
          <div className="mt-[34px] flex flex-wrap gap-3.5">
            <Link
              href="/open-source/agentready"
              className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-7 py-3.5 text-[15.5px] font-semibold text-white shadow-[0_8px_20px_-8px_rgba(14,102,194,0.5)] transition-colors hover:bg-brand-800"
            >
              Run the free scan
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
            <Link
              href="/strategy-session"
              className="inline-flex items-center gap-2 rounded-[10px] border border-slate-300 bg-white px-7 py-3.5 text-[15.5px] font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              Book a strategy session
            </Link>
          </div>

          {/* The "we'll tell you if you don't need us" line: cheaper than a case
              study and more convincing than one, so it belongs on the first screen. */}
          <p className="mt-4 max-w-[500px] text-[13.5px] leading-relaxed text-slate-500">
            29 checks, a letter grade in seconds, no email needed for the score. If your store is
            already in good shape, the report will say so.
          </p>

          <div className="mt-[30px] border-t border-slate-200 pt-5">
            <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              What we build to
            </div>
            <div className="mt-2.5 flex flex-wrap gap-x-5 gap-y-2">
              {buildStandards.map((b) => (
                <span key={b} className="text-[13px] font-medium text-slatey">
                  {b}
                </span>
              ))}
            </div>
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
              <strong className="block font-display text-[15px] text-ink">Agent-ready</strong>
              ACP · UCP · MCP
            </span>
          </div>

          <div className="relative mx-5 -mt-[34px] flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-[18px] py-4 shadow-[0_12px_32px_-12px_rgba(14,27,46,0.18)] sm:mx-7">
            <span className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] bg-brand-50 text-brand-700">
              <Icon name="check" className="h-5 w-5" />
            </span>
            <span className="text-[14.5px] leading-[1.45] text-slate-700">
              AI-native and agent-ready: built to sell to people and to AI.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
