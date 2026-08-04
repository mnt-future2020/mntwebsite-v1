"use client";

import { useMemo, useState } from "react";

/**
 * Industry filter for the client projects list.
 *
 * The page groups projects by how much we can verify about them, which is our
 * problem and not the visitor's. Somebody who runs a travel business wants to
 * see the travel work, and without this they scroll roughly twelve thousand
 * pixels past facade, printing and accounting to find it.
 *
 * Filtering is done by toggling a class rather than by unmounting, so nothing
 * reflows and the counts stay honest whichever filter is on.
 */
export type FilterItem = { slug: string; industry: string };

export default function ClientFilter({ items }: { items: FilterItem[] }) {
  const [active, setActive] = useState<string>("all");

  const groups = useMemo(() => {
    const counts = new Map<string, number>();
    for (const i of items) counts.set(i.industry, (counts.get(i.industry) || 0) + 1);
    return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, [items]);

  function apply(key: string) {
    setActive(key);
    // The cards are server-rendered; this only decides which stay visible.
    for (const el of document.querySelectorAll<HTMLElement>("[data-industry]")) {
      const show = key === "all" || el.dataset.industry === key;
      el.style.display = show ? "" : "none";
    }
    // Sections can empty out entirely, and an empty heading reads as a bug.
    for (const sec of document.querySelectorAll<HTMLElement>("[data-filter-section]")) {
      const visible = [...sec.querySelectorAll<HTMLElement>("[data-industry]")].some(
        (c) => c.style.display !== "none"
      );
      sec.style.display = visible ? "" : "none";
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.16em] text-bp-faint">
        Filter
      </span>
      {[["all", items.length] as const, ...groups].map(([key, count]) => (
        <button
          key={key}
          type="button"
          onClick={() => apply(key)}
          aria-pressed={active === key}
          className={`inline-flex items-center gap-2 border px-3.5 py-2 font-mono text-[12px] tracking-[0.04em] transition-colors ${
            active === key
              ? "border-bp-ink bg-bp-ink text-white"
              : "border-[#D8E1EC] bg-white text-bp-mute hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
          }`}
        >
          {key === "all" ? "All" : key}
          <span className={active === key ? "text-white/50" : "text-bp-faint"}>{count}</span>
        </button>
      ))}
    </div>
  );
}
