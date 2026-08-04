"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import AnnouncementBar from "./AnnouncementBar";
import RegionSwitch from "./RegionSwitch";
import { REGIONS, regionFromPath } from "@/lib/regions";

// The nav is region-derived, not hardcoded: the URL prefix already says which
// market a visitor is in, so reading it here keeps the two navs from drifting
// apart. In the US, AI lives inside the commerce hub rather than beside it,
// because a second top-level entry read as though AI were a separate thing to
// buy. In India it is a separate thing to buy, so there it is top level.
export default function Header() {
  const pathname = usePathname() || "/";
  const region = regionFromPath(pathname);
  const cfg = REGIONS[region];
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  // Reading position, drawn as a hairline along the header's bottom edge.
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header
        id="mnt-header"
        className="sticky top-0 z-50 w-full border-b border-bp-line bg-white/90 backdrop-blur-md transition-shadow duration-300"
      >
        <div
          className="absolute bottom-[-1px] left-0 h-[2px] bg-brand-500 transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
          aria-hidden="true"
        />
        <div
          id="mnt-headbar"
          className="mx-auto flex h-[78px] max-w-[1440px] items-center gap-7 px-[18px] transition-[height] duration-300 ease-[cubic-bezier(.22,1,.36,1)] sm:px-8 lg:px-14"
        >
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {cfg.navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="relative whitespace-nowrap px-4 pb-3 pt-2.5 font-mono text-[12.5px] uppercase tracking-[0.1em] text-bp-mute transition-colors hover:text-bp-ink"
              >
                {l.label}
                <span className="absolute inset-x-4 bottom-1 h-[1.5px] bg-transparent transition-colors" />
              </Link>
            ))}
          </nav>

          <div className="hidden flex-1 items-center justify-end gap-3 lg:flex">
            <RegionSwitch />
            <Link
              href="/open-source"
              aria-label="Open Source"
              className="flex items-center gap-2.5 whitespace-nowrap border border-[#DDE5EF] px-3.5 py-2.5 font-mono text-[12px] tracking-[0.08em] text-bp-mute transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
            >
              <BrandLogo slug="github" className="h-[15px] w-[15px] shrink-0" />
              <span className="hidden xl:inline">Open Source</span>
            </Link>
            <Link
              href={cfg.cta.href}
              className="inline-flex items-center gap-2.5 whitespace-nowrap bg-bp-ink px-[22px] py-3.5 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-white transition-colors hover:bg-brand-700"
            >
              {cfg.cta.label}
              <Icon name="arrow" className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className="ml-auto inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-[#DDE5EF] px-[11px] lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className={`block h-[1.5px] w-full bg-bp-ink transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block h-[1.5px] w-full bg-bp-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-[1.5px] w-full bg-bp-ink transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="fixed inset-x-0 top-[78px] z-40 h-[calc(100dvh-78px)] overflow-y-auto border-t border-bp-line bg-white px-[18px] py-5 sm:px-8 lg:hidden">
            {/* Built from the region's groups so the two markets can never
                drift apart here. In the US that is one group with AI as a
                labelled subsection; in India it is three. */}
            {cfg.groups.map((g, i) => (
              <div key={g.href}>
                <Link
                  href={g.href}
                  onClick={() => setOpen(false)}
                  className={`block py-4 font-display text-[17px] font-semibold text-bp-ink ${
                    i === 0 ? "border-b border-bp-hair" : ""
                  }`}
                >
                  {g.label}
                </Link>
                <div className={i === cfg.groups.length - 1 ? "border-b border-bp-hair pb-3" : "py-1"}>
                  {g.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="block px-3 py-2.5 text-sm text-bp-mute"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            {[
              ...cfg.navLinks.filter((l) => !cfg.groups.some((g) => g.href === l.href)),
              { label: "About", href: `${cfg.base}/about` },
              { label: "Open Source", href: "/open-source" },
            ]
              // "About" is already a top-level nav item in the US, so it would
              // otherwise appear twice on that region's menu.
              .filter((l, i, all) => all.findIndex((x) => x.href === l.href) === i)
              .map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-bp-hair py-4 font-display text-[17px] font-semibold text-bp-ink"
                >
                  {l.label}
                </Link>
              ))}
            <div className="mt-6">
              <RegionSwitch />
            </div>
            <Link
              href={cfg.cta.href}
              onClick={() => setOpen(false)}
              className="mt-4 flex w-full items-center justify-center gap-2.5 bg-bp-ink px-5 py-4 font-mono text-[13px] font-semibold tracking-[0.06em] text-white"
            >
              {cfg.cta.label}
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
