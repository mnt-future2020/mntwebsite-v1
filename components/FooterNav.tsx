"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { footerNavFor, regionFromPath } from "@/lib/regions";

// Split out of Footer so only the region-dependent part needs the client
// bundle: the rest of the footer stays server-rendered.
export default function FooterNav() {
  const pathname = usePathname() || "/";
  const columns = footerNavFor(regionFromPath(pathname));

  return (
    <>
      {columns.map((col) => (
        <div key={col.title}>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
            {col.title}
          </div>
          <ul className="mt-[18px] space-y-[11px]">
            {col.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-[13.8px] text-[#8497AF] transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </>
  );
}
