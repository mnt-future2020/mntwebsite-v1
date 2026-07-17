"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import AnnouncementBar from "./AnnouncementBar";
import { commerceNav, aiNav } from "@/lib/site";

const navLinks = [
  { label: "Commerce", href: "/commerce" },
  { label: "AI & Agents", href: "/ai-agents" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <AnnouncementBar />
      <header className="sticky top-0 z-50 w-full border-b border-line bg-white/[0.92] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between gap-6 px-5 sm:px-7">
        <Logo />

        <nav className="hidden items-center gap-1.5 lg:flex">
          {navLinks.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="rounded-lg px-3.5 py-2 text-[14.5px] font-medium text-slate-700 transition-colors hover:bg-[#F1F6FC] hover:text-brand-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-[10px] bg-brand-700 px-[22px] py-[11px] text-[14.5px] font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Book a workshop
            <Icon name="arrow" className="h-[15px] w-[15px]" />
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-ink lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-x-0 top-[72px] z-40 h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white px-5 py-6 lg:hidden">
          {[commerceNav, aiNav].map((group) => (
            <div key={group.label} className="border-b border-slate-100 py-2">
              <Link
                href={group.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-base font-semibold text-ink"
              >
                {group.label}
              </Link>
              <div className="space-y-1 pb-3">
                {group.children.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-2 text-sm text-slatey hover:bg-slate-50"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link href="/work" onClick={() => setOpen(false)} className="block border-b border-slate-100 py-4 text-base font-semibold text-ink">
            Work
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block border-b border-slate-100 py-4 text-base font-semibold text-ink">
            About
          </Link>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-[10px] bg-brand-700 px-6 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-800"
          >
            Book a workshop
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      )}
      </header>
    </>
  );
}
