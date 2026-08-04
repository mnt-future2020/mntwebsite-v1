"use client";

import { useEffect, useRef, useState } from "react";
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
 *
 * Two shapes. `dropdown` is the header control on desktop. `menu` is what the
 * mobile menu gets: both regions listed outright, because a dropdown inside a
 * menu is a second thing to open, and because a hover-opened dropdown cannot be
 * opened by a finger at all.
 */
export default function RegionSwitch({
  tone = "light",
  variant = "dropdown",
  onNavigate,
}: {
  tone?: "light" | "dark";
  variant?: "dropdown" | "menu";
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || "/";
  const current = regionFromPath(pathname);
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const dark = tone === "dark";

  // Click-to-toggle rather than hover-to-open: a tap fires enter and leave
  // together, so a hover menu is unopenable on a touch screen.
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (variant === "menu") {
    return (
      <div>
        <div className="px-3 pb-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-brand-700">
          Region
        </div>
        <div className="border-t border-bp-hair">
          {(Object.keys(REGIONS) as Region[]).map((key) => {
            const active = key === current;
            return (
              <Link
                key={key}
                href={counterpart(pathname, key)}
                onClick={onNavigate}
                aria-current={active ? "true" : undefined}
                className={`flex items-center gap-3 border-b border-bp-hair py-3.5 pl-3 pr-3 text-[15px] transition-colors ${
                  active ? "font-semibold text-bp-ink" : "text-bp-mute"
                }`}
              >
                <span className="text-[17px]" aria-hidden="true">
                  {REGIONS[key].flag}
                </span>
                {REGIONS[key].label}
                {active && <span className="ml-auto h-[6px] w-[6px] bg-brand-500" aria-hidden="true" />}
              </Link>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative" ref={wrap}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
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
          role="menu"
          className={`absolute right-0 top-full z-50 mt-1 min-w-[196px] border shadow-[0_24px_50px_-26px_rgba(11,21,36,0.45)] ${
            dark ? "border-white/12 bg-bp-ink" : "border-bp-line bg-white"
          }`}
        >
          {(Object.keys(REGIONS) as Region[]).map((key) => (
            <Link
              key={key}
              role="menuitem"
              href={counterpart(pathname, key)}
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
              className={`flex items-center gap-2.5 border-b px-4 py-3.5 font-mono text-[12px] tracking-[0.06em] transition-colors last:border-b-0 ${
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
