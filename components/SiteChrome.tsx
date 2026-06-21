"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

// The marketing header/footer should not appear on the admin panel.
const isApp = (p?: string | null) =>
  !!p && (p.startsWith("/admin") || p.startsWith("/portal") || p.startsWith("/scan"));

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
