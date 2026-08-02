"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

// The hero's proof device: the agent-readiness checks running to completion.
// It plays once on load, then holds the finished state.
const STEPS = [
  { label: "Reads your catalogue", tag: "Feed" },
  { label: "Trusts your stock and price", tag: "Sync" },
  { label: "Finishes the checkout", tag: "ACP" },
  { label: "Order placed", tag: "Done" },
];

export default function AgentScan() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    // Respect a reduced-motion preference by showing the end state at once.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(STEPS.length);
      return;
    }
    const timers = STEPS.map((_, i) => setTimeout(() => setDone(i + 1), 900 + i * 700));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="border-t border-bp-line bg-white p-4 sm:p-[22px]">
      <div className="flex items-center gap-2.5">
        <span className="h-[7px] w-[7px] animate-live-pulse rounded-full bg-[#0E9F6E]" />
        <span className="flex-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#5F7189]">
          Agent-ready
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-brand-700">
          {done >= STEPS.length ? "checkout" : "scanning"}
          <span className="animate-caret">_</span>
        </span>
      </div>

      <div className="mt-3.5 border-t border-bp-hair">
        {STEPS.map((s, i) => {
          const complete = i < done;
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 border-b border-bp-hair py-2.5 transition-opacity duration-500"
              style={{ opacity: complete ? 1 : 0.45 }}
            >
              <span
                className={`flex h-[21px] w-[21px] shrink-0 items-center justify-center border font-mono text-[9.5px] transition-all duration-300 ${
                  complete
                    ? "border-[#0E9F6E] bg-[#0E9F6E] text-white"
                    : "border-brand-200 bg-white text-brand-700"
                }`}
              >
                {complete ? <Icon name="check" className="h-[11px] w-[11px]" /> : i + 1}
              </span>
              <span
                className={`flex-1 text-[13.2px] leading-[1.4] transition-colors duration-300 ${
                  complete ? "text-bp-body" : "text-bp-faint"
                }`}
              >
                {s.label}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#9AA9BE]">
                {s.tag}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 h-[2px] bg-bp-hair">
        <div
          className="h-[2px] bg-brand-500 transition-[width] duration-500 ease-out"
          style={{ width: `${(done / STEPS.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
