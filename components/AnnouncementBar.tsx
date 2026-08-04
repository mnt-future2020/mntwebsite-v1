"use client";

import { usePathname } from "next/navigation";
import { REGIONS, regionFromPath } from "@/lib/regions";

// Slim announcement strip above the header, not sticky, scrolls away. The line
// is region-specific: agent-readiness is the US story and means nothing to an
// Indian buyer, who is here for the platform, the AI work, or the products.
export default function AnnouncementBar() {
  const pathname = usePathname() || "/";
  return (
    <div className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-700 to-brand-900 px-4 py-[9px] text-[13px] font-medium tracking-[0.02em] text-white">
      <span className="rounded-full bg-white/[0.18] px-2.5 py-0.5 text-[11px] font-bold tracking-[0.06em]">
        NEW
      </span>
      <span className="truncate">{REGIONS[regionFromPath(pathname)].announcement}</span>
    </div>
  );
}
