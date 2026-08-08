"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

// The marketing header/footer should not appear on the admin panel, and not on
// an ad landing page either: a page paid for by the click has one job, and site
// nav offers the visitor a dozen other places to go.
const isApp = (p?: string | null) =>
  !!p &&
  (p.startsWith("/admin") ||
    p.startsWith("/portal") ||
    p.startsWith("/scan") ||
    p.startsWith("/in/lp"));

export function SiteHeader() {
  const pathname = usePathname();
  if (isApp(pathname)) return null;
  return <Header />;
}

export function SiteFooter() {
  const pathname = usePathname();
  if (isApp(pathname)) return null;
  return <Footer />;
}
