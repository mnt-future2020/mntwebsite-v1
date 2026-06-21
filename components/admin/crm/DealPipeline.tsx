"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import DealDrawer from "@/components/admin/crm/DealDrawer";
import { DEAL_STAGES, STAGE_LABELS, STAGE_ACCENT, money, contactName } from "@/lib/crm";
import { fullName } from "@/lib/hr";

type Opt = { id: string; label: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Deal = any;
const initials = (s: string) => s.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

export default function DealPipeline({ initial, companies, contacts, owners }: { initial: Deal[]; companies: Opt[]; contacts: Opt[]; owners: Opt[] }) {
  const [deals, setDeals] = useState<Deal[]>(initial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [fOwner, setFOwner] = useState("");

  const filtered = useMemo(
    () => deals.filter((d) => (!q || `${d.title} ${d.client?.name || ""}`.toLowerCase().includes(q.toLowerCase())) && (!fOwner || (fOwner === "none" ? !d.ownerId : d.ownerId === fOwner))),
    [deals, q, fOwner]
  );

  const move = async (id: string, stage: string) => {
    const d = deals.find((x) => x.id === id);
    if (!d || d.stage === stage) return;
    setDeals((s) => s.map((x) => (x.id === id ? { ...x, stage } : x)));
    const res = await fetch(`/api/admin/crm/deals/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ stage }) });
    if (res.ok) { const u = await res.json(); setDeals((s) => s.map((x) => (x.id === id ? u : x))); toast(`Moved to ${STAGE_LABELS[stage]}`); }
    else toast("Couldn't move deal", "err");
  };

  const add = async (stage: string) => {
    const title = newTitle.trim();
    if (!title) return;
    const res = await fetch("/api/admin/crm/deals", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ title, stage }) });
    if (res.ok) { const d = await res.json(); setDeals((s) => [...s, d]); setNewTitle(""); setAdding(null); toast("Deal added"); }
    else toast("Couldn't add deal", "err");
  };

  const onSaved = (u: Deal) => setDeals((s) => s.map((x) => (x.id === u.id ? u : x)));
  const onDeleted = (id: string) => setDeals((s) => s.filter((x) => x.id !== id));
  const openDeal = deals.find((d) => d.id === openId) || null;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search deals…" className="w-52 rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-sm focus:border-brand focus:outline-none" />
        </div>
        <select value={fOwner} onChange={(e) => setFOwner(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slatey focus:border-brand focus:outline-none">
          <option value="">All owners</option>
          <option value="none">Unassigned</option>
          {owners.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
        </select>
        <span className="ml-auto text-xs text-slate-400">{filtered.length} of {deals.length} deals</span>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {DEAL_STAGES.map((stage) => {
          const col = filtered.filter((d) => d.stage === stage);
          const total = col.reduce((s, d) => s + (d.value || 0), 0);
          return (
            <div
              key={stage}
              onDragOver={(e) => { e.preventDefault(); setOver(stage); }}
              onDragLeave={() => setOver((o) => (o === stage ? null : o))}
              onDrop={() => { if (dragId) move(dragId, stage); setDragId(null); setOver(null); }}
              className={`flex min-h-[150px] flex-col rounded-2xl border p-2.5 transition-colors ${over === stage ? "border-brand bg-brand-50/40" : "border-slate-200 bg-slate-50/60"}`}
            >
              <div className={`mb-2 h-1 rounded-full ${STAGE_ACCENT[stage]}`} />
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slatey">{STAGE_LABELS[stage]}</span>
                <span className="rounded-full bg-white px-1.5 text-[11px] text-slate-400">{col.length}</span>
              </div>
              {total > 0 && <p className="mb-2 px-1 text-[11px] font-medium text-slate-400">{money(total)}</p>}

              <div className="flex flex-1 flex-col gap-2">
                {col.map((d) => (
                  <div key={d.id} draggable onDragStart={() => setDragId(d.id)} onDragEnd={() => setDragId(null)} onClick={() => setOpenId(d.id)}
                    className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md">
                    <p className="text-sm font-medium text-ink">{d.title}</p>
                    {d.client?.name && <p className="mt-0.5 text-xs text-slate-400">{d.client.name}</p>}
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-ink">{money(d.value, d.currency)}</span>
                      {d.ownerId && <span title={d.owner ? fullName(d.owner) : ""} className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-[9px] font-bold text-brand-700">{initials(d.owner ? fullName(d.owner) : "")}</span>}
                    </div>
                    {d.contact && <p className="mt-1 text-[11px] text-slate-400">{contactName(d.contact)}</p>}
                  </div>
                ))}
              </div>

              {adding === stage ? (
                <input autoFocus value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") add(stage); if (e.key === "Escape") { setAdding(null); setNewTitle(""); } }}
                  onBlur={() => (newTitle.trim() ? add(stage) : setAdding(null))}
                  placeholder="Deal title…" className="mt-2 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm focus:border-brand focus:outline-none" />
              ) : (
                <button onClick={() => { setAdding(stage); setNewTitle(""); }} className="mt-2 flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-medium text-slate-400 hover:text-brand-700">
                  <Icon name="plus" className="h-3.5 w-3.5" /> Add
                </button>
              )}
            </div>
          );
        })}
      </div>

      {openDeal && <DealDrawer deal={openDeal} companies={companies} contacts={contacts} owners={owners} onSaved={onSaved} onDeleted={onDeleted} onClose={() => setOpenId(null)} />}
    </div>
  );
}
