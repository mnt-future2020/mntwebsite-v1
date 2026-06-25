"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import DateField from "@/components/admin/DateField";
import { toast } from "@/components/admin/Toast";
import { DEAL_STAGES, STAGE_LABELS, ACTIVITY_TYPES, ACTIVITY_ICON, fmtDate, money, titleCase } from "@/lib/crm";

type Opt = { id: string; label: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

const field = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const lbl = "mb-1 block text-xs font-medium text-slatey";
const dval = (d: unknown) => (d ? new Date(String(d)).toISOString().slice(0, 10) : "");

export default function DealDrawer({ deal, companies, contacts, owners, onSaved, onDeleted, onClose }: {
  deal: Any; companies: Opt[]; contacts: Opt[]; owners: Opt[];
  onSaved: (d: Any) => void; onDeleted: (id: string) => void; onClose: () => void;
}) {
  const [f, setF] = useState({
    title: deal.title, clientId: deal.clientId || "", contactId: deal.contactId || "", ownerId: deal.ownerId || "",
    stage: deal.stage, value: String(deal.value || 0), currency: deal.currency || "INR",
    probability: String(deal.probability ?? 10), expectedCloseDate: dval(deal.expectedCloseDate),
    nextFollowUp: dval(deal.nextFollowUp),
    source: deal.source || "", notes: deal.notes || "", lostReason: deal.lostReason || "",
  });
  const [acts, setActs] = useState<Any[]>([]);
  const [actType, setActType] = useState("NOTE");
  const [actSubject, setActSubject] = useState("");
  const [actDue, setActDue] = useState("");
  const [busy, setBusy] = useState(false);
  const up = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    fetch(`/api/admin/crm/deals/${deal.id}`).then((r) => r.json()).then((d) => setActs(d.activities || [])).catch(() => {});
    return () => window.removeEventListener("keydown", onEsc);
  }, [deal.id, onClose]);

  const save = async () => {
    if (!f.title.trim()) return toast("Title required", "err");
    setBusy(true);
    const res = await fetch(`/api/admin/crm/deals/${deal.id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...f, value: Number(f.value) || 0, probability: Number(f.probability) || 0, clientId: f.clientId || null, contactId: f.contactId || null, ownerId: f.ownerId || null, expectedCloseDate: f.expectedCloseDate || null, nextFollowUp: f.nextFollowUp || null }),
    });
    setBusy(false);
    if (res.ok) { onSaved(await res.json()); toast("Deal saved"); onClose(); }
    else toast("Couldn't save", "err");
  };

  const del = async () => {
    if (!confirm("Delete this deal?")) return;
    const res = await fetch(`/api/admin/crm/deals/${deal.id}`, { method: "DELETE" });
    if (res.ok) { onDeleted(deal.id); toast("Deal deleted"); onClose(); } else toast("Delete failed", "err");
  };

  const addActivity = async () => {
    if (!actSubject.trim()) return;
    const res = await fetch("/api/admin/crm/activities", {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dealId: deal.id, clientId: f.clientId || null, contactId: f.contactId || null, type: actType, subject: actSubject, dueDate: actDue || null }),
    });
    if (res.ok) { const a = await res.json(); setActs((s) => [a, ...s]); setActSubject(""); setActDue(""); toast("Activity logged"); }
    else toast("Couldn't log activity", "err");
  };

  const toggleDone = async (a: Any) => {
    setActs((s) => s.map((x) => (x.id === a.id ? { ...x, done: !x.done } : x)));
    await fetch(`/api/admin/crm/activities/${a.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ done: !a.done }) });
  };
  const delActivity = async (id: string) => { setActs((s) => s.filter((x) => x.id !== id)); await fetch(`/api/admin/crm/activities/${id}`, { method: "DELETE" }); };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/20" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-[480px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">Deal</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slatey hover:bg-slate-100"><Icon name="x" className="h-4 w-4" /></button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <div><label className={lbl}>Title</label><input value={f.title} onChange={(e) => up("title", e.target.value)} className={field} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><label className={lbl}>Stage</label><select value={f.stage} onChange={(e) => up("stage", e.target.value)} className={field}>{DEAL_STAGES.map((s) => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}</select></div>
            <div><label className={lbl}>Owner</label><select value={f.ownerId} onChange={(e) => up("ownerId", e.target.value)} className={field}><option value="">—</option>{owners.map((o) => <option key={o.id} value={o.id}>{o.label}</option>)}</select></div>
            <div><label className={lbl}>Value</label><input value={f.value} onChange={(e) => up("value", e.target.value)} type="number" className={field} /></div>
            <div><label className={lbl}>Win probability %</label><input value={f.probability} onChange={(e) => up("probability", e.target.value)} type="number" className={field} /></div>
            <div><label className={lbl}>Company</label><select value={f.clientId} onChange={(e) => up("clientId", e.target.value)} className={field}><option value="">—</option>{companies.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
            <div><label className={lbl}>Contact</label><select value={f.contactId} onChange={(e) => up("contactId", e.target.value)} className={field}><option value="">—</option>{contacts.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}</select></div>
            <DateField label="Expected close" value={f.expectedCloseDate} onChange={(v) => up("expectedCloseDate", v)} />
            <DateField label="Next follow-up" value={f.nextFollowUp} onChange={(v) => up("nextFollowUp", v)} />
            <div><label className={lbl}>Source</label><input value={f.source} onChange={(e) => up("source", e.target.value)} className={field} placeholder="Referral, inbound…" /></div>
          </div>
          <div><label className={lbl}>Notes</label><textarea value={f.notes} onChange={(e) => up("notes", e.target.value)} className={field} rows={3} /></div>
          {f.stage === "LOST" && (
            <div><label className={lbl}>Lost reason</label><input value={f.lostReason} onChange={(e) => up("lostReason", e.target.value)} className={field} placeholder="Price, competitor, timing…" /></div>
          )}

          {/* Activities */}
          <div className="border-t border-slate-100 pt-4">
            <h3 className="text-sm font-semibold text-ink">Activity</h3>
            <div className="mt-3 flex gap-2">
              <select value={actType} onChange={(e) => setActType(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-2 text-sm text-slatey focus:border-brand focus:outline-none">
                {ACTIVITY_TYPES.map((t) => <option key={t} value={t}>{titleCase(t)}</option>)}
              </select>
              <input value={actSubject} onChange={(e) => setActSubject(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addActivity()} placeholder="Log a note, call, task…" className={field} />
              <button onClick={addActivity} className="btn-primary shrink-0"><Icon name="plus" className="h-4 w-4" /></button>
            </div>
            {actType === "TASK" && (
              <input type="date" value={actDue} onChange={(e) => setActDue(e.target.value)} className={`${field} mt-2`} title="Task due date" />
            )}
            <ul className="mt-3 space-y-2">
              {acts.length === 0 && <li className="text-xs text-slate-400">No activity yet.</li>}
              {acts.map((a) => (
                <li key={a.id} className="flex items-start gap-2 rounded-lg border border-slate-100 px-3 py-2 text-sm">
                  <button onClick={() => a.type === "TASK" && toggleDone(a)} className={`mt-0.5 ${a.type === "TASK" ? "cursor-pointer" : ""}`} title={a.type}>
                    <Icon name={a.type === "TASK" && a.done ? "check" : ACTIVITY_ICON[a.type]} className={`h-4 w-4 ${a.done ? "text-green-600" : "text-slate-400"}`} />
                  </button>
                  <div className="min-w-0 flex-1">
                    <p className={`text-ink ${a.done ? "line-through text-slate-400" : ""}`}>{a.subject}</p>
                    <p className="text-[11px] text-slate-400">{titleCase(a.type)} · {fmtDate(a.createdAt)}{a.dueDate ? <span className={a.done ? "" : "text-amber-600"}> · due {fmtDate(a.dueDate)}</span> : ""}</p>
                  </div>
                  <button onClick={() => delActivity(a.id)} className="text-slate-300 hover:text-red-500"><Icon name="x" className="h-3.5 w-3.5" /></button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <button onClick={del} disabled={busy} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slatey hover:bg-red-50 hover:text-red-600 disabled:opacity-60"><Icon name="trash" className="mr-1 inline h-4 w-4" /> Delete</button>
          <button onClick={save} disabled={busy} className="btn-primary disabled:opacity-70"><Icon name="save" className="h-4 w-4" /> {busy ? "Saving…" : "Save"}</button>
        </div>
      </div>
    </div>
  );
}
