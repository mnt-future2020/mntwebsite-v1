// Slim announcement strip above the header, not sticky, scrolls away.
export default function AnnouncementBar() {
  return (
    <div className="flex items-center justify-center gap-2.5 bg-gradient-to-r from-brand-700 to-brand-900 px-4 py-[9px] text-[13px] font-medium tracking-[0.02em] text-white">
      <span className="rounded-full bg-white/[0.18] px-2.5 py-0.5 text-[11px] font-bold tracking-[0.06em]">
        NEW
      </span>
      <span className="truncate">Now shipping: ACP · Google UCP · Retail MCP integrations</span>
    </div>
  );
}
