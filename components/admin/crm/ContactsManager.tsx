"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import DateField from "@/components/admin/DateField";
import { toast } from "@/components/admin/Toast";
import { followUpStatus, FOLLOWUP_STYLE, fmtDate } from "@/lib/crm";

type Opt = { id: string; label: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Contact = any;

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const dval = (d: unknown) => (d ? String(d).slice(0, 10) : "");
const blank = { firstName: "", lastName: "", email: "", phone: "", title: "", clientId: "", ownerId: "", notes: "", nextFollowUp: "" };

export default function ContactsManager({ initial, companies, owners }: { initial: Contact[]; companies: Opt[]; owners: Opt[] }) {
  const router = useRouter();
  const [items, setItems] = useState<Contact[]>(initial);
  const [editId, setEditId] = useState<string | null>(null);
  const [f, setF] = useState<Record<string, string>>(blank);
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState(false);

  const up = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const reset = () => { setEditId(null); setF(blank); };
  const edit = (c: Contact) => {
    setEditId(c.id);
    setF({ firstName: c.firstName, lastName: c.lastName || "", email: c.email || "", phone: c.phone || "", title: c.title || "", clientId: c.clientId || "", ownerId: c.ownerId || "", notes: c.notes || "", nextFollowUp: dval(c.nextFollowUp) });
  };

  const view = useMemo(
    () => items.filter((c) => !q || `${c.firstName} ${c.lastName || ""} ${c.email || ""} ${c.client?.name || ""}`.toLowerCase().includes(q.toLowerCase())),
    [items, q]
  );

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.firstName.trim()) return;
    setBusy(true);
    const res = await fetch(editId ? `/api/admin/crm/contacts/${editId}` : "/api/admin/crm/contacts", {
      method: editId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    setBusy(false);
    if (res.ok) {
      const c = await res.json();
      setItems((s) => (editId ? s.map((x) => (x.id === editId ? c : x)) : [c, ...s]));
      reset();
      toast(editId ? "Contact updated" : "Contact added");
      router.refresh();
    } else toast((await res.json().catch(() => ({}))).error || "Couldn't save", "err");
  };

  const del = async (c: Contact) => {
    if (!confirm(`Delete ${c.firstName}?`)) return;
    const res = await fetch(`/api/admin/crm/contacts/${c.id}`, { method: "DELETE" });
    if (res.ok) { setItems((s) => s.filter((x) => x.id !== c.id)); if (editId === c.id) reset(); toast("Contact deleted"); router.refresh(); }
    else toast("Delete failed", "err");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div>
        <div className="mb-3 relative">
          <Icon name="search" className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search contacts…" className="w-full rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-sm focus:border-brand focus:outline-none sm:w-64" />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          {view.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slatey">No contacts yet. Add one on the right.</p>
          ) : (
            <table className="w-full min-w-[720px] text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
                <tr><th className="px-5 py-3 font-semibold">Name</th><th className="px-5 py-3 font-semibold">Company</th><th className="px-5 py-3 font-semibold">Owner</th><th className="px-5 py-3 font-semibold">Deals</th><th className="px-5 py-3 font-semibold">Follow-up</th><th className="px-5 py-3" /></tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {view.map((c) => (
                  <tr key={c.id} className={`hover:bg-slate-50 ${editId === c.id ? "bg-brand-50/40" : ""}`}>
                    <td className="px-5 py-3"><Link href={`/admin/crm/contacts/${c.id}`} className="font-medium text-ink hover:text-brand-700 hover:underline">{[c.firstName, c.lastName].filter(Boolean).join(" ")}</Link><div className="text-xs text-slate-400">{c.title || ""}{c.email ? ` · ${c.email}` : ""}</div></td>
                    <td className="px-5 py-3 text-slatey">{c.client?.name || "—"}</td>
                    <td className="px-5 py-3 text-slatey">{c.owner ? [c.owner.firstName, c.owner.lastName].filter(Boolean).join(" ") : "—"}</td>
                    <td className="px-5 py-3 text-slatey">{c._count?.deals ?? 0}</td>
                    <td className="px-5 py-3">
                      {(() => { const fu = followUpStatus(c.nextFollowUp); return (
                        <div className="text-xs">
                          {fu ? <span className={`inline-block rounded-full px-1.5 py-0.5 font-semibold ${FOLLOWUP_STYLE[fu]}`}>{fu === "overdue" ? `Overdue · ${fmtDate(c.nextFollowUp)}` : fu === "today" ? "Today" : fmtDate(c.nextFollowUp)}</span> : <span className="text-slate-300">—</span>}
                          {c.lastContactedAt && <div className="mt-0.5 text-[10px] text-slate-400">last: {fmtDate(c.lastContactedAt)}</div>}
                        </div>
                      ); })()}
                    </td>
                    <td className="px-5 py-3 text-right">
                      <button onClick={() => edit(c)} className="rounded-lg p-1.5 text-slatey hover:bg-slate-100 hover:text-ink"><Icon name="edit" className="h-4 w-4" /></button>
                      <button onClick={() => del(c)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600"><Icon name="trash" className="h-4 w-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <form onSubmit={submit} className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink">{editId ? "Edit contact" : "Add contact"}</h2>
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input value={f.firstName} onChange={(e) => up("firstName", e.target.value)} className={field} placeholder="First name *" />
            <input value={f.lastName} onChange={(e) => up("lastName", e.target.value)} className={field} placeholder="Last name" />
          </div>
          <input value={f.title} onChange={(e) => up("title", e.target.value)} className={field} placeholder="Job title" />
          <input value={f.email} onChange={(e) => up("email", e.target.value)} className={field} placeholder="Email" type="email" />
          <input value={f.phone} onChange={(e) => up("phone", e.target.value)} className={field} placeholder="Phone" />
          <select value={f.clientId} onChange={(e) => up("clientId", e.target.value)} className={field}>
            <option value="">— Company —</option>
            {companies.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
          <select value={f.ownerId} onChange={(e) => up("ownerId", e.target.value)} className={field}>
            <option value="">— Owner —</option>
            {owners.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}
          </select>
          <textarea value={f.notes} onChange={(e) => up("notes", e.target.value)} className={field} rows={2} placeholder="Notes" />
          <DateField label="Next follow-up" value={f.nextFollowUp} onChange={(v) => up("nextFollowUp", v)} />
        </div>
        <div className="mt-4 flex gap-2">
          <button type="submit" disabled={busy} className="btn-primary flex-1 disabled:opacity-70"><Icon name={editId ? "save" : "plus"} className="h-4 w-4" /> {editId ? "Save" : "Add"}</button>
          {editId && <button type="button" onClick={reset} className="rounded-lg border border-slate-200 px-3 text-sm text-slatey hover:bg-slate-50">Cancel</button>}
        </div>
      </form>
    </div>
  );
}
