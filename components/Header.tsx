"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import { commerceNav, aiNav, companyNav, NavGroup } from "@/lib/site";

function MegaMenu({ group }: { group: NavGroup }) {
  return (
    <div className="invisible absolute left-1/2 top-full z-50 w-[34rem] -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
      <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white p-3 shadow-cardhover">
        <div className="grid grid-cols-2 gap-1">
          {group.children.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="group/item rounded-2xl p-3 transition-colors hover:bg-brand-50"
            >
              <div className="text-sm font-semibold text-ink group-hover/item:text-brand-700">
                {c.label}
              </div>
              <div className="mt-0.5 text-xs leading-snug text-slatey">{c.desc}</div>
            </Link>
          ))}
        </div>
        <Link
          href={group.href}
          className="mt-1 flex items-center justify-between rounded-2xl bg-deep px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-800"
        >
          {group.overviewLabel}
          <Icon name="arrow" className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-100 bg-white/90 backdrop-blur-md"
          : "bg-white/0"
      }`}
    >
      <div className="container-mnt flex h-[68px] items-center justify-between gap-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          <div className="group relative">
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-700">
              Commerce
              <Icon name="arrow" className="h-3.5 w-3.5 rotate-90 opacity-50" />
            </button>
            <MegaMenu group={commerceNav} />
          </div>
          <div className="group relative">
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-700">
              AI &amp; Agents
              <Icon name="arrow" className="h-3.5 w-3.5 rotate-90 opacity-50" />
            </button>
            <MegaMenu group={aiNav} />
          </div>
          <Link
            href="/work"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-700"
          >
            Work
          </Link>
          <Link
            href="/security-compliance"
            className="rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-700"
          >
            Security
          </Link>
          <div className="group relative">
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink transition-colors hover:text-brand-700">
              Company
              <Icon name="arrow" className="h-3.5 w-3.5 rotate-90 opacity-50" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-3xl border border-slate-100 bg-white p-3 shadow-cardhover">
                {companyNav.children.map((c) => (
                  <Link
                    key={c.label}
                    href={c.href}
                    className="group/item block rounded-2xl p-3 transition-colors hover:bg-brand-50"
                  >
                    <div className="text-sm font-semibold text-ink group-hover/item:text-brand-700">
                      {c.label}
                    </div>
                    <div className="mt-0.5 text-xs leading-snug text-slatey">{c.desc}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden lg:block">
          <Link href="/contact" className="btn-primary">
            Book a workshop
            <Icon name="arrow" className="h-4 w-4" />
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
        <div className="fixed inset-x-0 top-[68px] z-40 h-[calc(100dvh-68px)] overflow-y-auto border-t border-slate-100 bg-white px-5 py-6 lg:hidden">
          {[commerceNav, aiNav].map((group) => (
            <div key={group.label} className="border-b border-slate-100 py-2">
              <button
                onClick={() => setMobileGroup(mobileGroup === group.label ? null : group.label)}
                className="flex w-full items-center justify-between py-2 text-base font-semibold text-ink"
              >
                {group.label}
                <Icon
                  name="arrow"
                  className={`h-4 w-4 transition-transform ${mobileGroup === group.label ? "-rotate-90" : "rotate-90"}`}
                />
              </button>
              {mobileGroup === group.label && (
                <div className="space-y-1 pb-3">
                  <Link href={group.href} onClick={() => setOpen(false)} className="block rounded-xl bg-brand-50 px-3 py-2 text-sm font-semibold text-brand-700">
                    {group.overviewLabel}
                  </Link>
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
              )}
            </div>
          ))}
          <Link href="/work" onClick={() => setOpen(false)} className="block border-b border-slate-100 py-4 text-base font-semibold text-ink">
            Work
          </Link>
          <Link href="/security-compliance" onClick={() => setOpen(false)} className="block border-b border-slate-100 py-4 text-base font-semibold text-ink">
            Security &amp; Compliance
          </Link>
          <Link href="/about" onClick={() => setOpen(false)} className="block border-b border-slate-100 py-4 text-base font-semibold text-ink">
            About
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary mt-6 w-full">
            Book a workshop
            <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
