import AgentScan from "./AgentScan";

// The hero's centrepiece.
//
// A blueprint is what a *builder* draws, so this frame shows an annotated plan
// of the platform we deliver, with its subsystems numbered and labelled. The
// obvious alternative, showing a storefront, reads as though we ran the shop
// ourselves; the point of the hero is that we build the shop for somebody else.
//
// The parts are the real anatomy of the platforms in /work, not a stock
// diagram: every one of them is something we have shipped for a client.

const STROKE = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.15,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

const PARTS: { no: string; name: string; note: string; draw: React.ReactNode }[] = [
  {
    no: "01",
    name: "Catalogue",
    note: "Products · variants · media",
    draw: (
      <>
        <rect x="2.5" y="2.5" width="7" height="7" />
        <rect x="12.5" y="2.5" width="7" height="7" />
        <rect x="2.5" y="12.5" width="7" height="7" />
        <rect x="12.5" y="12.5" width="7" height="7" />
      </>
    ),
  },
  {
    no: "02",
    name: "Cart",
    note: "Pricing · promos · tax",
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
    no: "03",
    name: "Checkout",
    note: "Payments · fraud · PCI",
    draw: (
      <>
        <rect x="2.5" y="5" width="17" height="12" />
        <path d="M2.5 9h17" />
        <path d="M6 13.2h4.4" />
      </>
    ),
  },
  {
    no: "04",
    name: "Admin",
    note: "Orders · stock · content",
    draw: (
      <>
        <rect x="2.5" y="3.5" width="17" height="15" />
        <path d="M8.6 3.5v15" />
        <path d="M11.4 8h5.2M11.4 11.4h5.2M11.4 14.8h3" />
      </>
    ),
  },
  {
    no: "05",
    name: "POS and apps",
    note: "In-store · mobile",
    draw: (
      <>
        <rect x="3" y="2.5" width="9.5" height="17" />
        <path d="M3 15.6h9.5" />
        <rect x="14.5" y="7" width="5.5" height="12.5" />
        <path d="M14.5 16.4h5.5" />
      </>
    ),
  },
  {
    no: "06",
    name: "Integrations",
    note: "ERP · WMS · shipping",
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
];

export default function PlatformPlan() {
  return (
    <div
      id="mnt-frame"
      className="relative border border-[#D3DDE9] bg-white shadow-[0_44px_90px_-46px_rgba(11,21,36,0.42)] will-change-transform"
    >
      {/* Registration marks: the blueprint tell. */}
      <span className="absolute -left-1 -top-1 h-[9px] w-[9px] border-l border-t border-brand-500" />
      <span className="absolute -right-1 -top-1 h-[9px] w-[9px] border-r border-t border-brand-500" />
      <span className="absolute -bottom-1 -left-1 h-[9px] w-[9px] border-b border-l border-brand-500" />
      <span className="absolute -bottom-1 -right-1 h-[9px] w-[9px] border-b border-r border-brand-500" />
      <span className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-brand-500 to-transparent" />

      {/* Title block, the way a drawing is labelled. */}
      <div className="flex items-center gap-3 border-b border-bp-line bg-bp-tint px-4 py-3 sm:px-[22px]">
        <div className="min-w-0 flex-1">
          <div className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-brand-700">
            Commerce platform
          </div>
          <div className="mt-1 font-mono text-[11px] tracking-[0.1em] text-bp-faint">
            What we build for you
          </div>
        </div>
        <span className="shrink-0 border border-[#DCE6F2] bg-white px-2.5 py-1 font-mono text-[10px] tracking-[0.1em] text-bp-mute">
          6 subsystems
        </span>
      </div>

      {/* The plan itself. Storefront row first, back office beneath it. */}
      <div className="grid border-l border-bp-hair grid-cols-2 sm:grid-cols-3">
        {PARTS.map((p, i) => (
          <div
            key={p.no}
            className={`relative border-b border-r border-bp-hair p-3.5 sm:p-4 ${
              i < 3 ? "bg-brand-500/[0.035]" : ""
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-brand-700/85">
                <svg viewBox="0 0 22 22" className="h-[19px] w-[19px]" aria-hidden="true" {...STROKE}>
                  {p.draw}
                </svg>
              </span>
              <span className="flex items-center gap-1.5">
                {/* Keyed to the legend below, so the marked subsystems still
                    read as a set when the grid drops to two columns. */}
                {i < 3 && <span className="h-[5px] w-[5px] bg-brand-500" aria-hidden="true" />}
                <span className="font-mono text-[10px] tracking-[0.14em] text-bp-ghost">{p.no}</span>
              </span>
            </div>
            <div className="mt-3 font-display text-[13.5px] font-bold leading-[1.2] tracking-[-0.015em] text-bp-ink">
              {p.name}
            </div>
            <div className="mt-1 font-mono text-[9.5px] leading-[1.45] tracking-[0.04em] text-bp-faint">
              {p.note}
            </div>
          </div>
        ))}
      </div>

      {/* Legend, the way a drawing explains its own marks. */}
      <div className="flex items-center gap-2.5 border-b border-bp-hair bg-bp-tint px-4 py-2.5 sm:px-[22px]">
        <span className="h-[5px] w-[5px] shrink-0 bg-brand-500" aria-hidden="true" />
        <span className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-brand-700">
          Agent surface
        </span>
        <span className="h-px min-w-3 flex-1 bg-brand-400/40" />
        <span className="whitespace-nowrap font-mono text-[9.5px] uppercase tracking-[0.16em] text-bp-faint">
          ACP · UCP · MCP
        </span>
      </div>

      <AgentScan />

      {/* Maker's mark: the plate a builder leaves on the thing they built. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-bp-line bg-bp-tint px-4 py-3.5 sm:px-[22px]">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-bp-ink">
          Built by MnT Future
        </span>
        <span className="h-px min-w-4 flex-1 bg-bp-edge" />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-bp-faint">
          Senior engineers end to end
        </span>
      </div>
    </div>
  );
}
