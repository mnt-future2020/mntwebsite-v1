"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";

type Emp = { id: string; name: string };
type Review = { id: string; employeeId: string; employeeName: string; period: string; rating: number; hikePercent?: number | null; reviewer?: string | null; status: string };

const field = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const lbl = "mb-1 block text-xs font-medium text-slatey";

export default function PerformanceManager({ reviews: r0, employees }: { reviews: Review[]; employees: Emp[] }) {
  const [reviews, setReviews] = useState(r0);
  const [f, setF] = useState({ employeeId: employees[0]?.id || "", period: "", rating: 3, strengths: "", improvements: "", goals: "", hikePercent: "", reviewer: "", status: "DRAFT" });
  const [busy, setBusy] = useState(false);
  const up = (k: string, v: unknown) => setF((s) => ({ ...s, [k]: v }));
  const [editId, setEditId] = useState<string | null>(null);
  const [ef, setEf] = useState({ period: "", rating: 3, hikePercent: "" });

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.employeeId || !f.period) return;
    setBusy(true);
    const res = await fetch("/api/admin/hr/performance", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    if (res.ok) {
      const d = await res.json();
      const name = employees.find((x) => x.id === f.employeeId)?.name || "";
      setReviews((s) => [{ id: d.id, employeeId: d.employeeId, employeeName: name, period: d.period, rating: d.rating, hikePercent: d.hikePercent, reviewer: d.reviewer, status: d.status }, ...s]);
      setF({ ...f, period: "", strengths: "", improvements: "", goals: "", hikePercent: "" });
      toast("Review saved");
    } else {
      toast("Couldn't save review", "err");
    }
    setBusy(false);
  };
  const del = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const prev = reviews;
    setReviews((s) => s.filter((x) => x.id !== id));
    const res = await fetch(`/api/admin/hr/performance/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setReviews(prev);
      toast("Couldn't delete review", "err");
    }
  };
  const startEdit = (r: Review) => {
    setEditId(r.id);
    setEf({ period: r.period, rating: r.rating, hikePercent: r.hikePercent != null ? String(r.hikePercent) : "" });
  };
  const saveEdit = async () => {
    if (!editId) return;
    const res = await fetch(`/api/admin/hr/performance/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ period: ef.period, rating: ef.rating, hikePercent: ef.hikePercent }),
    });
    if (res.ok) {
      const d = await res.json();
      setReviews((s) => s.map((x) => (x.id === editId ? { ...x, period: d.period, rating: d.rating, hikePercent: d.hikePercent } : x)));
      setEditId(null);
      toast("Review updated");
    } else toast("Couldn't update review", "err");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[520px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
            <tr><th className="px-5 py-3 font-semibold">Employee</th><th className="px-5 py-3 font-semibold">Period</th><th className="px-5 py-3 font-semibold">Rating</th><th className="px-5 py-3 font-semibold">Hike</th><th className="px-5 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-slatey">No reviews yet.</td></tr>
            ) : reviews.map((r) => (
              <tr key={r.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-ink">{r.employeeName}</td>
                {editId === r.id ? (
                  <>
                    <td className="px-5 py-2"><input value={ef.period} onChange={(e) => setEf((s) => ({ ...s, period: e.target.value }))} className={field} /></td>
                    <td className="px-5 py-2">
                      <select value={ef.rating} onChange={(e) => setEf((s) => ({ ...s, rating: Number(e.target.value) }))} className={field}>
                        {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} ★</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-2"><input type="number" value={ef.hikePercent} onChange={(e) => setEf((s) => ({ ...s, hikePercent: e.target.value }))} className={field} placeholder="%" /></td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={saveEdit} title="Save" className="rounded-lg p-1.5 text-green-600 hover:bg-green-50"><Icon name="check" className="h-4 w-4" /></button>
                        <button onClick={() => setEditId(null)} title="Cancel" className="rounded-lg p-1.5 text-slatey hover:bg-slate-100"><Icon name="x" className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-5 py-3 text-slatey">{r.period}</td>
                    <td className="px-5 py-3 text-amber-500">{"★".repeat(r.rating)}<span className="text-slate-200">{"★".repeat(5 - r.rating)}</span></td>
                    <td className="px-5 py-3 text-slatey">{r.hikePercent ? `+${r.hikePercent}%` : "—"}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => startEdit(r)} title="Edit" className="rounded-lg p-1.5 text-slatey hover:bg-brand-50 hover:text-brand-700"><Icon name="edit" className="h-4 w-4" /></button>
                        <button onClick={() => del(r.id)} title="Delete" className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600"><Icon name="trash" className="h-4 w-4" /></button>
                      </div>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form onSubmit={add} className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink">New review</h2>
        <div className="mt-4 space-y-3">
          <div><label className={lbl}>Employee</label>
            <select value={f.employeeId} onChange={(e) => up("employeeId", e.target.value)} className={field}>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div><label className={lbl}>Period</label><input value={f.period} onChange={(e) => up("period", e.target.value)} className={field} placeholder="e.g. H1 2026" /></div>
          <div><label className={lbl}>Rating (1–5)</label>
            <select value={f.rating} onChange={(e) => up("rating", Number(e.target.value))} className={field}>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n} — {"★".repeat(n)}</option>)}
            </select>
          </div>
          <div><label className={lbl}>Strengths</label><textarea rows={2} value={f.strengths} onChange={(e) => up("strengths", e.target.value)} className={`${field} resize-none`} /></div>
          <div><label className={lbl}>Areas to improve</label><textarea rows={2} value={f.improvements} onChange={(e) => up("improvements", e.target.value)} className={`${field} resize-none`} /></div>
          <div><label className={lbl}>Goals</label><textarea rows={2} value={f.goals} onChange={(e) => up("goals", e.target.value)} className={`${field} resize-none`} /></div>
          <div className="grid grid-cols-2 gap-2">
            <div><label className={lbl}>Hike %</label><input type="number" value={f.hikePercent} onChange={(e) => up("hikePercent", e.target.value)} className={field} /></div>
            <div><label className={lbl}>Reviewer</label><input value={f.reviewer} onChange={(e) => up("reviewer", e.target.value)} className={field} /></div>
          </div>
        </div>
        <button type="submit" disabled={busy} className="btn-primary mt-4 w-full disabled:opacity-70"><Icon name="plus" className="h-4 w-4" /> Save review</button>
      </form>
    </div>
  );
}
