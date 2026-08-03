"use client";

import { useState } from "react";

export type QA = { q: string; a: string };

export default function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-brand-200 hover:shadow-[0_8px_22px_-12px_rgba(14,102,194,0.18)]"
          >
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display text-base font-semibold text-bp-ink"
              aria-expanded={isOpen}
            >
              {item.q}
              <span className="shrink-0 text-lg font-normal text-brand-700">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-[22px] text-[14.5px] leading-[1.7] text-bp-mute">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
