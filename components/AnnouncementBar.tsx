import Link from "next/link";
import BrandLogo from "./BrandLogo";

// Slim announcement strip above the header — not sticky, scrolls away.
export default function AnnouncementBar() {
  return (
    <div className="relative flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-700 to-brand-900 px-4 py-[9px] text-[13px] font-medium tracking-[0.02em] text-white sm:px-36">
      <span className="rounded-full bg-white/[0.18] px-2.5 py-0.5 text-[11px] font-bold tracking-[0.06em]">
        NEW
      </span>
      <span className="truncate">Now shipping — ACP · Google UCP · Retail MCP integrations</span>
      <Link
        href="/open-source"
        className="absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-2 rounded-full border border-white/25 py-1 pl-1.5 pr-3 transition-colors hover:border-white/60 hover:bg-white/10 sm:inline-flex"
      >
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full bg-white">
          <BrandLogo slug="github" className="h-[15px] w-[15px]" />
        </span>
        <span className="text-[12.5px] font-semibold">Open Source</span>
      </Link>
    </div>
  );
}
