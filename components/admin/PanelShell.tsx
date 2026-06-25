"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Logo from "@/components/Logo";
import Icon from "@/components/Icon";

// Responsive shell shared by the admin and portal layouts. On desktop (lg+) it
// is the classic 260px sidebar + content grid. Below lg the sidebar becomes an
// off-canvas drawer toggled by a hamburger in a sticky top bar, so the page
// content is reachable without scrolling past 30+ nav links.
export default function PanelShell({
  subtitle,
  nav,
  children,
  mainClassName = "p-6 sm:p-8",
  contentClassName = "mx-auto max-w-5xl",
}: {
  subtitle: string;
  nav: React.ReactNode;
  children: React.ReactNode;
  mainClassName?: string;
  contentClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the drawer after navigating to a new route.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[260px_1fr]">
      {/* Mobile top bar with hamburger */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Logo />
        <button
          type="button"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-slatey hover:bg-slate-100"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="h-6 w-6"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </header>

      {/* Backdrop — mobile only, when the drawer is open */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar: off-canvas drawer on mobile, static column on lg+ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] max-w-[85vw] flex-col gap-6 overflow-y-auto border-r border-slate-200 bg-white p-5 shadow-xl transition-transform duration-200 ease-out lg:static lg:z-auto lg:w-auto lg:max-w-none lg:min-h-screen lg:translate-x-0 lg:shadow-none ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between px-1 pt-1">
          <div>
            <Logo />
            <p className="mt-2 px-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
              {subtitle}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="-mr-1 flex h-9 w-9 items-center justify-center rounded-xl text-slatey hover:bg-slate-100 lg:hidden"
          >
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1">{nav}</div>
      </aside>

      <main className={mainClassName}>
        <div className={contentClassName}>{children}</div>
      </main>
    </div>
  );
}
