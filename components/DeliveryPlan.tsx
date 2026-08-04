import DeliveryScan from "./DeliveryScan";

// The India hero's centrepiece.
//
// The US frame draws the commerce platform, because a US brand is buying a
// platform. An Indian enterprise buyer has usually already been sold an AI
// project by somebody and watched it stall, so what they are really buying is a
// method that ends in production. That is what this frame draws: the three
// things we deliver, and the named process that gets them live.

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.15,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const LINES: { no: string; name: string; note: string; draw: React.ReactNode }[] = [
  {
    no: "01",
    name: "Ecommerce",
    note: "Platform · GST · UPI",
    draw: (
      <>
        <path d="M2.5 4h3l2.2 9.4h9.1" />
        <path d="M7.7 6.6h12l-1.4 5.4H8.7" />
        <circle cx="9.4" cy="17.6" r="1.5" />
        <circle cx="16.4" cy="17.6" r="1.5" />
      </>
    ),
  },
  {
    no: "02",
    name: "AI",
    note: "Agents · automation · apps",
    draw: (
      <>
        <circle cx="11" cy="11" r="2.6" />
        <path d="M11 8.4V3M11 13.6v5.4M13.6 11H19M8.4 11H3" />
        <circle cx="11" cy="3" r="1.3" />
        <circle cx="19" cy="11" r="1.3" />
        <circle cx="3" cy="11" r="1.3" />
      </>
    ),
  },
  {
    no: "03",
    name: "Products",
    note: "Desk · CRM · Commerce",
    draw: (
      <>
        <rect x="2.5" y="2.5" width="7" height="7" />
        <rect x="12.5" y="2.5" width="7" height="7" />
        <rect x="2.5" y="12.5" width="7" height="7" />
        <rect x="12.5" y="12.5" width="7" height="7" />
      </>
    ),
  },
];

export default function DeliveryPlan() {
  return (
    <div
      id="mnt-frame"
      className="relative border border-[#D3DDE9] bg-white shadow-[0_44px_90px_-46px_rgba(11,21,36,0.42)] will-change-transform"
    >
      <span className="absolute -left-1 -top-1 h-[9px] w-[9px] border-l border-t border-brand-500" />
      <span className="absolute -right-1 -top-1 h-[9px] w-[9px] border-r border-t border-brand-500" />
      <span className="absolute -bottom-1 -left-1 h-[9px] w-[9px] border-b border-l border-brand-500" />
      <span className="absolute -bottom-1 -right-1 h-[9px] w-[9px] border-b border-r border-brand-500" />
      <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-500 to-transparent" />

      <div className="flex items-center gap-3 border-b border-bp-line bg-bp-tint px-4 py-3 sm:px-[22px]">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.2em] text-brand-700">
            What we build
          </div>
          <div className="mt-1 font-mono text-[11px] tracking-[0.1em] text-bp-faint">
            And how it reaches production
          </div>
        </div>
        <span className="shrink-0 border border-[#DCE6F2] bg-white px-2.5 py-1 font-mono text-[11px] sm:text-[10px] tracking-[0.1em] text-bp-mute">
          3 lines
        </span>
      </div>

      <div className="grid grid-cols-3 border-l border-bp-hair">
        {LINES.map((l) => (
          <div key={l.no} className="border-b border-r border-bp-hair p-3.5 sm:p-4">
            <div className="flex items-center justify-between gap-2">
              <span className="text-brand-700/85">
                <svg viewBox="0 0 22 22" className="h-[19px] w-[19px]" aria-hidden="true" {...STROKE}>
                  {l.draw}
                </svg>
              </span>
              <span className="font-mono text-[11px] sm:text-[10px] tracking-[0.14em] text-bp-ghost">{l.no}</span>
            </div>
            <div className="mt-3 font-display text-[13.5px] font-bold leading-[1.2] tracking-[-0.015em] text-bp-ink">
              {l.name}
            </div>
            <div className="mt-1 font-mono text-[11px] sm:text-[9.5px] leading-[1.45] tracking-[0.04em] text-bp-faint">
              {l.note}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 border-b border-bp-hair bg-bp-tint px-4 py-2.5 sm:px-[22px]">
        <span className="h-[5px] w-[5px] shrink-0 bg-brand-500" aria-hidden="true" />
        <span className="font-mono text-[11px] sm:text-[9.5px] uppercase tracking-[0.16em] text-brand-700">
          Forward Deployed Engineering
        </span>
        <span className="h-px min-w-3 flex-1 bg-brand-400/40" />
        <span className="whitespace-nowrap font-mono text-[11px] sm:text-[9.5px] uppercase tracking-[0.16em] text-bp-faint">
          5 stages
        </span>
      </div>

      <DeliveryScan />

      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-bp-line bg-bp-tint px-4 py-3.5 sm:px-[22px]">
        <span className="font-mono text-[11px] sm:text-[10px] uppercase tracking-[0.2em] text-bp-ink">
          Built by MnT Future
        </span>
        <span className="h-px min-w-4 flex-1 bg-bp-edge" />
        <span className="font-mono text-[11px] sm:text-[10px] uppercase tracking-[0.14em] text-bp-faint">
          Senior engineers, embedded
        </span>
      </div>
    </div>
  );
}
