"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { useModalA11y } from "@/components/admin/useModalA11y";

type IconName = React.ComponentProps<typeof Icon>["name"];
type Item = { label: string; sub: string; href: string; icon: IconName };
type Result = { type: string; id: string; label: string; sub: string; href: string };

// Static destinations shown before you type.
const NAV: Item[] = [
  { label: "Pipeline", sub: "CRM", href: "/admin/crm", icon: "network" },
  { label: "Inbox", sub: "CRM · tasks & follow-ups", href: "/admin/crm/inbox", icon: "bell" },
  { label: "Contacts", sub: "CRM", href: "/admin/crm/contacts", icon: "users" },
  { label: "Companies", sub: "CRM", href: "/admin/crm/companies", icon: "building" },
  { label: "Leads", sub: "Workspace", href: "/admin/leads", icon: "records" },
  { label: "Projects", sub: "Delivery", href: "/admin/projects", icon: "layers" },
  { label: "Dashboard", sub: "Workspace", href: "/admin", icon: "gauge" },
];
const ICON_FOR: Record<string, IconName> = { company: "building", contact: "users", deal: "network" };

// Outer shell: owns open/closed, the ⌘K hotkey, and a custom-event opener (so a
// visible "Search ⌘K" button can trigger it). The modal itself mounts only when
// open, which lets useModalA11y manage focus/Esc/scroll-lock correctly.
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const openIt = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", openIt);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", openIt);
    };
  }, []);
  if (!open) return null;
  return <Palette onClose={() => setOpen(false)} />;
}

function Palette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [sel, setSel] = useState(0);
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  useModalA11y(panelRef, onClose);

  useEffect(() => {
    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const t = setTimeout(async () => {
      const r = await fetch(`/api/admin/crm/search?q=${encodeURIComponent(q)}`)
        .then((x) => x.json())
        .catch(() => ({ results: [] }));
      setResults(r.results || []);
      setSel(0);
      setLoading(false);
    }, 180);
    return () => clearTimeout(t);
  }, [q]);

  const typing = q.trim().length > 0;
  const items: Item[] = typing
    ? results.map((r) => ({ label: r.label, sub: r.sub, href: r.href, icon: ICON_FOR[r.type] || "network" }))
    : NAV;

  useEffect(() => {
    if (sel > items.length - 1) setSel(Math.max(0, items.length - 1));
  }, [items.length, sel]);

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label="Command palette" className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center gap-2 border-b border-slate-100 px-4">
          <Icon name="search" className="h-4 w-4 shrink-0 text-slate-500" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="Search contacts, companies, deals, or pages"
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setSel((s) => Math.min(items.length - 1, s + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setSel((s) => Math.max(0, s - 1));
              } else if (e.key === "Enter") {
                const it = items[sel];
                if (it) go(it.href);
              }
            }}
            placeholder="Search contacts, companies, deals… or jump to a page"
            className="w-full bg-transparent py-3.5 text-sm text-ink placeholder:text-slate-500 focus:outline-none"
          />
          {loading && <span className="shrink-0 text-[11px] text-slate-500">Searching…</span>}
          <kbd className="shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500">esc</kbd>
        </div>
        <div className="max-h-[52vh] overflow-y-auto p-2">
          {items.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-slate-500">{typing ? (loading ? "Searching…" : "No matches.") : "Type to search…"}</p>
          ) : (
            <>
              {!typing && <p className="px-2 pb-1 pt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">Jump to</p>}
              <ul>
                {items.map((it, i) => (
                  <li key={`${it.href}-${i}`}>
                    <button
                      onMouseEnter={() => setSel(i)}
                      onClick={() => go(it.href)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors ${i === sel ? "bg-brand-50" : "hover:bg-slate-50"}`}
                    >
                      <Icon name={it.icon} className={`h-4 w-4 shrink-0 ${i === sel ? "text-brand-700" : "text-slate-500"}`} />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-ink">{it.label}</span>
                        <span className="block truncate text-[11px] text-slate-500">{it.sub}</span>
                      </span>
                      {i === sel && <kbd className="shrink-0 rounded border border-slate-200 px-1.5 py-0.5 text-[10px] text-slate-500">↵</kbd>}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
