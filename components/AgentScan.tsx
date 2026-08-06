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
    // Runs on a loop: ticks up through the checks, holds the finished state,
    // then clears and starts over, so the hero is never sitting still.
    //
    // The step counter lives here rather than being read back from state:
    // scheduling the next tick from inside a state updater lets React's double
    // invocation queue two timers per tick, which compounds into a runaway.
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      step = step >= STEPS.length + 1 ? 0 : step + 1;
      setDone(step);
      timer = setTimeout(tick, step === 0 ? 900 : step >= STEPS.length ? 2000 : 1350);
    };
    timer = setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border-t border-bp-line bg-white p-4 sm:p-[22px]">
      <div className="flex items-center gap-2.5">
        <span className="h-[7px] w-[7px] animate-live-pulse rounded-full bg-[#0E9F6E]" />
        <span className="flex-1 font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.2em] text-bp-soft">
          Agent-ready
        </span>
        <span className="font-mono text-[11px] sm:text-[10.5px] tracking-[0.14em] text-brand-700">
          {done >= STEPS.length ? "checkout" : "scanning"}
          <span className="animate-caret">_</span>
        </span>
      </div>

      <div className="mt-3.5 border-t border-bp-hair">
        {STEPS.map((s, i) => {
          const complete = i < done;
          return (
            // See DeliveryScan: the 0.45 row wash took the pending label to
            // 1.8:1, and the loop leaves most rows pending most of the time.
            // The chip carries the dim now; the label state is colour only.
            <div
              key={s.label}
              className="flex items-center gap-3 border-b border-bp-hair py-2.5"
            >
              <span
                className={`flex h-[21px] w-[21px] shrink-0 items-center justify-center border font-mono text-[11px] sm:text-[9.5px] transition-all duration-300 ${
                  complete
                    ? "border-[#0E9F6E] bg-[#0E9F6E] text-white"
                    : "border-brand-200 bg-white text-brand-700 opacity-70"
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
              <span className="font-mono text-[11px] sm:text-[10px] uppercase tracking-[0.1em] text-bp-faint">
                {s.tag}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 h-[2px] bg-bp-hair">
        <div
          className="h-[2px] bg-brand-500 transition-[width] duration-500 ease-out"
          style={{ width: `${Math.min(done, STEPS.length) * (100 / STEPS.length)}%` }}
        />
      </div>
    </div>
  );
}
