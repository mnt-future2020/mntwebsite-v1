import DeliveryPlan from "./DeliveryPlan";
import { BpButton, PAGE } from "./blueprint";

// The India hero.
//
// The US hero opens on the agent channel, because that is the shift a US brand
// is worried about. An Indian buyer is worried about something else: the last
// thing they bought either never went live or is rented from somebody else.
// So this opens on what actually runs, and who owns it.
const LEAD = ["We", "build", "the", "ecommerce", "platforms", "and", "AI", "systems"];
const TAIL = ["Indian", "businesses"];

const STANDARDS = [
  "GST invoicing, gapless serials",
  "UPI, Razorpay, Cashfree, PayU",
  "Runs on servers you own",
  "Senior engineers, no juniors",
];

export default function IndiaHero() {
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

      <div className={`relative ${PAGE} pt-8 lg:pt-11`}>
        <div className="flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7 lg:pb-10">
          <span className="h-px w-[38px] shrink-0 bg-brand-500" />
          <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
            Ecommerce · AI · Products
          </span>
          <span className="min-w-3 flex-1" />
          <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
            India
          </span>
        </div>

        <h1
          className="mt-8 max-w-[17ch] font-display text-[40px] font-bold leading-[0.96] tracking-[-0.05em] text-bp-ink sm:text-[60px] lg:text-[86px]"
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
              {/* Non-breaking, because an inline-block collapses a trailing
                  ordinary space and every word would run into the next. */}
              {w}
              {" "}
            </span>
          ))}
          <span
            className="relative inline-block animate-word-in"
            style={{ transformOrigin: "50% 100%", animationDelay: "820ms" }}
          >
            <span
              id="mnt-final"
              className="animate-shine-sweep bg-clip-text text-brand-700 [-webkit-text-fill-color:transparent]"
              style={{
                backgroundImage: "linear-gradient(105deg,#0E66C2 42%,#66B7F8 50%,#0E66C2 58%)",
                backgroundSize: "240% 100%",
                backgroundPosition: "135% 0",
                animationDelay: "2.95s",
              }}
            >
              actually run on.
            </span>
            <span
              id="mnt-decode"
              aria-hidden="true"
              className="absolute left-0 top-0 whitespace-nowrap text-brand-700"
            />
            <span
              className="absolute inset-x-0 bottom-[0.015em] h-[0.045em] origin-left animate-draw-rule bg-brand-500"
              style={{ animationDelay: "2.05s" }}
            />
          </span>
        </h1>
      </div>

      <div
        className={`relative ${PAGE} grid items-start gap-9 pb-12 pt-10 lg:grid-cols-[1fr_0.9fr] lg:gap-[68px] lg:pb-[76px] lg:pt-14`}
      >
        <div className="animate-rise-in [animation-delay:120ms]">
          <p className="m-0 max-w-[56ch] text-[18.5px] leading-[1.68] text-bp-mute">
            Ecommerce platforms with GST built in, AI agents and automation that reach production
            rather than stalling at the pilot, and ready applications we brand and customise for
            you. Senior engineers embedded in your team, from the first discovery call to the day
            it goes live and after.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <BpButton href="/in/products">See our products</BpButton>
            <BpButton href="/in/strategy-session" variant="outline">
              Book a strategy session
            </BpButton>
          </div>

          <p className="mt-5 max-w-[54ch] text-[14px] leading-[1.65] text-bp-faint">
            Three live client platforms, our own products, and a documented delivery method. Judge
            us on what runs, not on a logo wall.
          </p>
        </div>

        <div className="relative animate-rise-in [animation-delay:280ms]" style={{ perspective: "1100px" }}>
          <DeliveryPlan />
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
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bp-faint sm:whitespace-nowrap">
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
