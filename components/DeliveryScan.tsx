"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

// A project walking the five stages, on a loop. Same device as the US hero's
// AgentScan, pointed at what India actually buys: a documented delivery method
// that ends in production rather than in a slide deck.
const STAGES = [
  { no: "01", label: "Discover", note: "Your data, the use case, what it costs" },
  { no: "02", label: "Design", note: "Architecture, model choice, how we check it" },
  { no: "03", label: "Build", note: "Code, in your environment" },
  { no: "04", label: "Deploy", note: "Live, monitored, on-prem if you need it" },
  { no: "05", label: "Optimize", note: "Evaluated, tuned, cost under control" },
];

export default function DeliveryScan() {
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDone(STAGES.length);
      return;
    }
    // The counter is a local, not state read back inside the updater: React's
    // double invocation would otherwise queue two timers per tick.
    let step = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      step = step >= STAGES.length + 1 ? 0 : step + 1;
      setDone(step);
      timer = setTimeout(tick, step === 0 ? 900 : step >= STAGES.length ? 2200 : 1250);
    };
    timer = setTimeout(tick, 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border-t border-bp-line bg-white p-4 sm:p-[22px]">
      <div className="flex items-center gap-2.5">
        <span className="h-[7px] w-[7px] animate-live-pulse rounded-full bg-[#0E9F6E]" />
        <span className="flex-1 font-mono text-[10.5px] uppercase tracking-[0.2em] text-[#5F7189]">
          Delivery
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.14em] text-brand-700">
          {done >= STAGES.length ? "in production" : "building"}
          <span className="animate-caret">_</span>
        </span>
      </div>

      <div className="mt-3.5 border-t border-bp-hair">
        {STAGES.map((s, i) => {
          const complete = i < done;
          return (
            <div
              key={s.no}
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
                className={`text-[13.2px] font-semibold leading-[1.4] transition-colors duration-300 ${
                  complete ? "text-bp-ink" : "text-bp-faint"
                }`}
              >
                {s.label}
              </span>
              <span className="ml-auto hidden truncate font-mono text-[10px] tracking-[0.04em] text-[#9AA9BE] sm:inline">
                {s.note}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-3.5 h-[2px] bg-bp-hair">
        <div
          className="h-[2px] bg-brand-500 transition-[width] duration-500 ease-out"
          style={{ width: `${Math.min(done, STAGES.length) * (100 / STAGES.length)}%` }}
        />
      </div>
    </div>
  );
}
