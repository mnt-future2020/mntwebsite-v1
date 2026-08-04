"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import type { NavGroup } from "@/lib/site";

/**
 * Desktop nav with the children exposed.
 *
 * Before this, every top-level entry went straight to a hub, so reaching any
 * leaf service took two page loads: one to see what exists, one to open it.
 * The child list and its descriptions were already in the nav data and simply
 * never rendered on desktop. Now the choice is visible before the first click.
 *
 * Opens on hover for a mouse and on focus or Enter for a keyboard, closes on
 * Escape or on leaving the group. The trigger stays a link, so the hub is still
 * reachable in one click for anyone who wants the overview.
 */
export default function NavMenu({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const [shift, setShift] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const id = useId();

  // A centred panel hangs off the left edge for the first nav item once the
  // window is narrow enough, so measure and nudge it back inside. Cheaper and
  // more reliable than picking an alignment per item and hoping.
  useLayoutEffect(() => {
    if (!open || !panel.current) return setShift(0);
    const GUTTER = 18;
    const r = panel.current.getBoundingClientRect();
    const over = r.left - shift < GUTTER
      ? GUTTER - (r.left - shift)
      : r.right - shift > window.innerWidth - GUTTER
        ? window.innerWidth - GUTTER - (r.right - shift)
        : 0;
    if (over !== shift) setShift(over);
  }, [open, shift]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector<HTMLAnchorElement>("a")?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => {
        setOpen(false);
        setShift(0);
      }}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={group.href}
        aria-expanded={open}
        aria-controls={id}
        className="relative flex items-center gap-1.5 whitespace-nowrap px-4 pb-3 pt-2.5 font-mono text-[12.5px] uppercase tracking-[0.1em] text-bp-mute transition-colors hover:text-bp-ink"
      >
        {group.label}
        <span
          className={`text-[8px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▾
        </span>
      </Link>

      {open && (
        <div
          id={id}
          ref={panel}
          style={{ transform: `translateX(calc(-50% + ${shift}px))` }}
          className="absolute left-1/2 top-full z-50 w-[min(540px,calc(100vw-36px))] border border-bp-line bg-white shadow-[0_34px_70px_-30px_rgba(11,21,36,0.35)]"
        >
          {/* A hairline bar so the panel reads as part of the blueprint grid
              rather than as a floating card. */}
          <span className="block h-[2px] bg-gradient-to-r from-brand-500 to-transparent" />
          <div className="grid sm:grid-cols-2">
            {group.children.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                onClick={() => setOpen(false)}
                className="group border-b border-r border-bp-hair p-4 transition-colors last:border-r-0 hover:bg-bp-tint"
              >
                <span className="flex items-center gap-2 font-display text-[14.5px] font-bold leading-[1.25] tracking-[-0.02em] text-bp-ink">
                  {c.label}
                  <Icon
                    name="arrow"
                    className="h-3 w-3 shrink-0 text-bp-faint opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                  />
                </span>
                <span className="mt-1.5 block text-[12.5px] leading-[1.5] text-bp-mute">
                  {c.desc}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href={group.href}
            onClick={() => setOpen(false)}
            className="flex items-center justify-between gap-3 bg-bp-tint px-4 py-3 font-mono text-[11.5px] uppercase tracking-[0.12em] text-brand-700 transition-colors hover:bg-brand-500/[0.07]"
          >
            {group.overviewLabel}
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </div>
  );
}
