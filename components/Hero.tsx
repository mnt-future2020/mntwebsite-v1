import Image from "next/image";
import AgentScan from "./AgentScan";
import { BpButton, PAGE } from "./blueprint";
import { images } from "@/lib/site";

// Each word rises in on its own delay, so the sentence assembles rather than
// fading in as a block.
const LEAD = ["Shoppers", "are", "starting", "to", "buy", "inside", "AI", "assistants."];
const TAIL = ["Can", "they"];

const STANDARDS = [
  "Built to WCAG 2.2 AA",
  "PCI DSS v4.0.1 scope minimised",
  "Sales-tax engine integrated",
  "SOC 2-aligned controls",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
      <div
        className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
        style={{
          backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
          backgroundSize: "calc(100% / 12) 100%",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-[220px] -top-[320px] h-[880px] w-[880px]"
        style={{ background: "radial-gradient(circle,rgba(32,149,241,0.1),transparent 62%)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-[180px] -left-[160px] h-[520px] w-[520px]"
        style={{ background: "radial-gradient(circle,rgba(62,81,182,0.055),transparent 66%)" }}
        aria-hidden="true"
      />

      <div className={`relative ${PAGE} pt-8 lg:pt-11`}>
        <div className="flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7 lg:pb-10">
          <span className="h-px w-[38px] shrink-0 bg-brand-500" />
          <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
            Custom commerce platforms · US brands
          </span>
          <span className="min-w-3 flex-1" />
          <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
            ACP · UCP · MCP
          </span>
        </div>

        <h1
          className="mt-8 max-w-[16ch] font-display text-[42px] font-bold leading-[0.94] tracking-[-0.05em] text-bp-ink sm:text-[64px] lg:text-[96px]"
          style={{ perspective: "900px" }}
        >
          {[...LEAD, ...TAIL].map((w, i) => (
            <span
              key={w + i}
              className="inline-block animate-word-in"
              style={{
                transformOrigin: "50% 100%",
                animationDelay: `${i < LEAD.length ? i * 55 : 640 + (i - LEAD.length) * 55}ms`,
              }}
            >
              {w}
              {" "}
            </span>
          ))}
          <span
            className="relative inline-block animate-word-in"
            style={{ transformOrigin: "50% 100%", animationDelay: "820ms" }}
          >
            <span className="text-brand-700">buy from you</span>
            <span
              className="absolute inset-x-0 bottom-[0.015em] h-[0.045em] origin-left animate-draw-rule bg-brand-500"
              style={{ animationDelay: "2.05s" }}
            />
          </span>
          <span
            className="relative inline-block animate-pop-q text-brand-500"
            style={{ transformOrigin: "62% 78%", animationDelay: "2150ms" }}
          >
            ?
            <span
              className="pointer-events-none absolute -inset-x-[0.14em] -inset-y-[0.08em] animate-ring-out rounded-full border-2 border-brand-500"
              style={{ animationDelay: "2.4s" }}
              aria-hidden="true"
            />
          </span>
        </h1>
      </div>

      <div
        className={`relative ${PAGE} grid items-start gap-9 pb-12 pt-10 lg:grid-cols-[1fr_0.9fr] lg:gap-[68px] lg:pb-[76px] lg:pt-14`}
      >
        <div className="animate-rise-in [animation-delay:120ms]">
          <p className="m-0 max-w-[56ch] text-[18.5px] leading-[1.68] text-bp-mute">
            We engineer custom commerce platforms for US brands: storefronts, marketplaces, B2B, and
            the integrations behind them. Senior engineers end to end, no juniors on client work. And
            built so an AI agent can read your catalogue, trust your stock and price, and finish a
            checkout on its own: what ACP, Google UCP and Retail MCP make possible.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <BpButton href="/open-source/agentready">Run the free scan</BpButton>
            <BpButton href="/strategy-session" variant="outline">
              Book a strategy session
            </BpButton>
          </div>

          <p className="mt-5 max-w-[54ch] text-[14px] leading-[1.65] text-bp-faint">
            29 checks, a letter grade in seconds, no email needed for the score. If your store is
            already in good shape, the report will say so.
          </p>
        </div>

        <div className="relative animate-rise-in [animation-delay:280ms]">
          <div className="relative border border-[#D3DDE9] bg-white shadow-[0_44px_90px_-46px_rgba(11,21,36,0.42)]">
            {/* Registration marks: the blueprint tell. */}
            <span className="absolute -left-1 -top-1 h-[9px] w-[9px] border-l border-t border-brand-500" />
            <span className="absolute -right-1 -top-1 h-[9px] w-[9px] border-r border-t border-brand-500" />
            <span className="absolute -bottom-1 -left-1 h-[9px] w-[9px] border-b border-l border-brand-500" />
            <span className="absolute -bottom-1 -right-1 h-[9px] w-[9px] border-b border-r border-brand-500" />
            <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-500 to-transparent" />

            <div className="flex items-center gap-2 border-b border-bp-line bg-bp-tint px-4 py-3">
              <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
              <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
              <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
              <span className="ml-2.5 flex-1 border border-[#E9EEF5] bg-white px-3 py-1.5 font-mono text-[11.5px] text-bp-faint">
                mntfuture.com
              </span>
            </div>

            <div className="relative overflow-hidden">
              <Image
                src={images.hero}
                alt="AI-native commerce platform"
                width={900}
                height={300}
                className="block h-[118px] w-full object-cover grayscale contrast-[1.06] brightness-[1.04] lg:h-[152px]"
              />
              <div
                className="absolute inset-0 mix-blend-multiply"
                style={{
                  background: "linear-gradient(120deg,rgba(32,149,241,0.5),rgba(11,21,36,0.42))",
                }}
              />
            </div>

            <AgentScan />

            <div className="flex items-center gap-3.5 border-t border-bp-line bg-bp-tint px-4 py-4 sm:px-[22px]">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-brand-500/[0.07] text-brand-700">
                <svg viewBox="0 0 24 24" className="h-[17px] w-[17px]" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12.5l4.2 4.2L19 7" />
                </svg>
              </span>
              <span className="text-[14px] leading-[1.5] text-[#334458]">
                AI-native and agent-ready: built to sell to people and to AI.
              </span>
            </div>
          </div>
          <div
            className="mx-auto h-7 w-[88%]"
            style={{
              background: "radial-gradient(ellipse at center top,rgba(11,21,36,0.13),transparent 72%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className={`relative ${PAGE} pb-9 lg:pb-13`}>
        <div className="flex items-baseline gap-4 border-t border-bp-line pt-5">
          <span className="whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-bp-faint">
            What we build to
          </span>
          <span className="h-px flex-1 bg-bp-hair" />
        </div>
        <div className="mt-4 grid border-l border-t border-bp-hair sm:grid-cols-2 lg:grid-cols-4">
          {STANDARDS.map((label, i) => (
            <div
              key={label}
              className="flex items-baseline gap-3 border-b border-r border-bp-hair px-5 py-4"
            >
              <span className="font-mono text-[10.5px] tracking-[0.12em] text-brand-500">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[12.5px] leading-[1.5] text-[#334458]">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
