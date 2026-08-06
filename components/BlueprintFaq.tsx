"use client";

import { useState } from "react";
import type { QA } from "./FAQ";

// The blueprint accordion: numbered rows, a square sign control, and an answer
// that opens on a max-height transition. One row open at a time, the first by
// default, matching the design.
export default function BlueprintFaq({ items }: { items: QA[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-10 border-t border-bp-edge lg:mt-[52px]">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            data-stagger
            className={`border-b border-bp-edge transition-[background,box-shadow] duration-200 ${
              isOpen ? "bg-white shadow-[inset_3px_0_0_#2095F1]" : "bg-transparent"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-start gap-5 px-5 py-[26px] text-left text-bp-ink transition-colors hover:text-brand-700"
            >
              <span className="pt-1.5 font-mono text-[11.5px] tracking-[0.1em] text-bp-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 font-display text-[17px] font-semibold leading-[1.38] tracking-[-0.02em] lg:text-[20.5px]">
                {f.q}
              </span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-[#CFDAE7] bg-white font-mono text-[15px] leading-none text-brand-700">
                {isOpen ? "−" : "+"}
              </span>
            </button>
            <div
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]"
              style={{ maxHeight: isOpen ? "480px" : "0px", opacity: isOpen ? 1 : 0 }}
            >
              <p className="m-0 px-5 pb-[26px] pl-[54px] text-[16px] leading-[1.75] text-bp-mute">
                {f.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
