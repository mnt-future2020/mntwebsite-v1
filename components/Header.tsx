"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import BrandLogo from "./BrandLogo";
import AnnouncementBar from "./AnnouncementBar";
import { commerceNav, aiNav } from "@/lib/site";

// One services door, not two. AI is the layer these platforms are built with,
// so it lives inside the commerce hub rather than beside it: a second top-level
// entry told visitors AI was a separate thing to buy, which is the opposite of
// what "AI-native" claims.
const navLinks = [
  { label: "Commerce", href: "/commerce" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export default function Header() {
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
            {navLinks.map((l) => (
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
            <Link
              href="/open-source"
              aria-label="Open Source"
              className="flex items-center gap-2.5 whitespace-nowrap border border-[#DDE5EF] px-3.5 py-2.5 font-mono text-[12px] tracking-[0.08em] text-bp-mute transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
            >
              <BrandLogo slug="github" className="h-[15px] w-[15px] shrink-0" />
              <span className="hidden xl:inline">Open Source</span>
            </Link>
            <Link
              href="/strategy-session"
              className="inline-flex items-center gap-2.5 whitespace-nowrap bg-bp-ink px-[22px] py-3.5 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-white transition-colors hover:bg-brand-700"
            >
              Book a strategy session
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
            {/* One group. The AI services are a labelled subsection inside it,
                matching the desktop nav and the commerce hub. */}
            <Link
              href={commerceNav.href}
              onClick={() => setOpen(false)}
              className="block border-b border-bp-hair py-4 font-display text-[17px] font-semibold text-bp-ink"
            >
              {commerceNav.label}
            </Link>
            <div className="py-1">
              {commerceNav.children.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm text-bp-mute"
                >
                  {c.label}
                </Link>
              ))}
            </div>
            <Link
              href={aiNav.href}
              onClick={() => setOpen(false)}
              className="mt-1 block px-3 pb-1 font-mono text-[11.5px] uppercase tracking-[0.12em] text-brand-700"
            >
              {aiNav.label}
            </Link>
            <div className="border-b border-bp-hair pb-3">
              {aiNav.children.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-sm text-bp-mute"
                >
                  {c.label}
                </Link>
              ))}
            </div>
            {[
              { label: "Work", href: "/work" },
              { label: "About", href: "/about" },
              { label: "Open Source", href: "/open-source" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block border-b border-bp-hair py-4 font-display text-[17px] font-semibold text-bp-ink"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/strategy-session"
              onClick={() => setOpen(false)}
              className="mt-6 flex w-full items-center justify-center gap-2.5 bg-bp-ink px-5 py-4 font-mono text-[13px] font-semibold tracking-[0.06em] text-white"
            >
              Book a strategy session
              <Icon name="arrow" className="h-4 w-4" />
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
