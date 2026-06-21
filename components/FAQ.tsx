"use client";

import { useState } from "react";
import Icon from "./Icon";

export type QA = { q: string; a: string };

export default function FAQ({ items }: { items: QA[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl divide-y divide-slate-100 overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-base font-semibold text-ink">{item.q}</span>
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                  isOpen ? "bg-brand text-white" : "bg-brand-50 text-brand-700"
                }`}
              >
                <Icon name={isOpen ? "check" : "arrow"} className={`h-4 w-4 ${isOpen ? "" : "rotate-90"}`} />
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-[15px] leading-relaxed text-slatey">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
