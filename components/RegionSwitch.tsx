"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { REGIONS, counterpart, regionFromPath, type Region } from "@/lib/regions";

/**
 * Region switcher.
 *
 * Deliberately a link list rather than a geo-redirect: a visitor who lands on
 * the wrong region should be able to see they are on it and choose, and a
 * crawler should be able to reach both. Auto-redirecting on IP would mean
 * Googlebot, which crawls from the US, would never see the India site at all.
 */
export default function RegionSwitch({ tone = "light" }: { tone?: "light" | "dark" }) {
  const pathname = usePathname() || "/";
  const current = regionFromPath(pathname);
  const [open, setOpen] = useState(false);
  const dark = tone === "dark";

  return (
    <div className="relative" onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        aria-expanded={open}
        aria-label="Change region"
        className={`inline-flex items-center gap-2 whitespace-nowrap border px-3 py-2.5 font-mono text-[12px] tracking-[0.08em] transition-colors ${
          dark
            ? "border-white/15 text-white/70 hover:border-white/35 hover:text-white"
            : "border-[#DDE5EF] text-bp-mute hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
        }`}
      >
        <span aria-hidden="true">{REGIONS[current].flag}</span>
        {REGIONS[current].short}
        <span className={`text-[9px] transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true">
          ▾
        </span>
      </button>

      {open && (
        <div
          className={`absolute right-0 top-full z-50 min-w-[188px] border shadow-[0_24px_50px_-26px_rgba(11,21,36,0.45)] ${
            dark ? "border-white/12 bg-bp-ink" : "border-bp-line bg-white"
          }`}
        >
          {(Object.keys(REGIONS) as Region[]).map((key) => (
            <Link
              key={key}
              href={counterpart(pathname, key)}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2.5 border-b px-4 py-3 font-mono text-[12px] tracking-[0.06em] transition-colors last:border-b-0 ${
                dark
                  ? "border-white/8 text-white/65 hover:bg-white/[0.06] hover:text-white"
                  : "border-bp-hair text-bp-mute hover:bg-bp-tint hover:text-bp-ink"
              } ${key === current ? (dark ? "text-white" : "text-bp-ink") : ""}`}
            >
              <span aria-hidden="true">{REGIONS[key].flag}</span>
              {REGIONS[key].label}
              {key === current && (
                <span className="ml-auto h-[5px] w-[5px] bg-brand-500" aria-hidden="true" />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
