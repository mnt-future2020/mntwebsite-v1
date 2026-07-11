"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { fmtDate, LEAVE_STATUS_STYLE, LEAVE_TYPES } from "@/lib/hr";

type Leave = {
  id: string;
  kind: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string | null;
  status: string;
  approverNote: string | null;
};

type Balances = {
  paidLeaveBalance: number;
  casualBalance: number;
  sickBalance: number;
  compOffBalance: number;
};

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const label = "mb-1.5 block text-xs font-medium text-slatey";
const KINDS = ["PAID", "SICK", "CASUAL", "COMP_OFF", "UNPAID"];

export default function LeaveSelfService({ initial, balances }: { initial: Leave[]; balances: Balances }) {
  const router = useRouter();
  const [leaves, setLeaves] = useState<Leave[]>(initial);
  const [f, setF] = useState({ kind: "PAID", startDate: "", endDate: "", reason: "", halfDay: false });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const up = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const balanceList = LEAVE_TYPES.map((t) => ({ kind: t.kind, label: t.label, value: balances[t.field] }));
  const selectedField = LEAVE_TYPES.find((t) => t.kind === f.kind)?.field;
  const selectedRemaining = selectedField ? balances[selectedField] : null;

  const dayCount = () => {
    if (f.halfDay) return 0.5;
    if (!f.startDate || !f.endDate) return 0;
    const a = new Date(f.startDate);
    const b = new Date(f.endDate);
    return Math.max(0, Math.round((b.getTime() - a.getTime()) / 86400000) + 1);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.halfDay && f.startDate && f.endDate && f.endDate < f.startDate) {
      setErr("End date can't be before the start date.");
      return;
    }
    setBusy(true);
    setErr(null);
    const payload = f.halfDay ? { ...f, endDate: f.startDate } : f;
    const res = await fetch("/api/portal/leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok) {
      setLeaves((l) => [
        {
          id: d.id,
          kind: d.kind,
          startDate: d.startDate,
          endDate: d.endDate,
          days: d.days,
          reason: d.reason,
          status: d.status,
          approverNote: null,
        },
        ...l,
      ]);
      setF({ kind: "PAID", startDate: "", endDate: "", reason: "", halfDay: false });
      router.refresh();
    } else {
      setErr(d.error || "Couldn't submit.");
    }
    setBusy(false);
  };

  const cancel = async (id: string) => {
    if (!confirm("Cancel this leave request?")) return;
    const res = await fetch(`/api/portal/leave/${id}`, { method: "PATCH" }).catch(() => null);
    if (res && res.ok) {
      setLeaves((l) => l.map((x) => (x.id === id ? { ...x, status: "CANCELLED" } : x)));
      router.refresh();
    } else {
      setErr("Couldn't cancel — please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {balanceList.map((b) => (
          <div key={b.kind} className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs text-slatey">{b.label}</p>
            <p className="mt-1 text-2xl font-bold text-ink">
              {b.value}
              <span className="text-sm font-normal text-slate-400"> days</span>
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
      <form onSubmit={submit} className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-ink">Apply for leave</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className={label}>Type</label>
            <select value={f.kind} onChange={(e) => up("kind", e.target.value)} className={field}>
              {KINDS.map((k) => (
                <option key={k} value={k}>
                  {k.charAt(0) + k.slice(1).toLowerCase().replace("_", " ")}
                </option>
              ))}
            </select>
            {selectedRemaining != null ? (
              <p className={`mt-1.5 text-xs ${dayCount() > selectedRemaining ? "text-amber-600" : "text-slatey"}`}>
                Remaining: <span className="font-semibold text-ink">{selectedRemaining} days</span>
                {dayCount() > selectedRemaining ? " — exceeds your balance" : ""}
              </p>
            ) : (
              <p className="mt-1.5 text-xs text-slatey">Unpaid leave — no balance deducted.</p>
            )}
          </div>
          <label className="flex items-center gap-2 text-xs font-medium text-slatey">
            <input
              type="checkbox"
              checked={f.halfDay}
              onChange={(e) => setF((s) => ({ ...s, halfDay: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand"
            />
            Half day (0.5 day)
          </label>
          {f.halfDay ? (
            <div>
              <label className={label}>Date</label>
              <input type="date" value={f.startDate} onChange={(e) => up("startDate", e.target.value)} className={field} required />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={label}>From</label>
                <input type="date" value={f.startDate} onChange={(e) => up("startDate", e.target.value)} className={field} required />
              </div>
              <div>
                <label className={label}>To</label>
                <input type="date" value={f.endDate} onChange={(e) => up("endDate", e.target.value)} className={field} required />
              </div>
            </div>
          )}
          <div>
            <label className={label}>Reason</label>
            <textarea rows={3} value={f.reason} onChange={(e) => up("reason", e.target.value)} className={`${field} resize-none`} placeholder="Optional note for your manager" />
          </div>
          {dayCount() > 0 && (
            <p className="text-xs text-slatey">
              Duration: <span className="font-semibold text-ink">{dayCount()} day{dayCount() > 1 ? "s" : ""}</span>
            </p>
          )}
          {err && <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>}
          <button type="submit" disabled={busy} className="btn-primary w-full justify-center disabled:opacity-70">
            <Icon name="plus" className="h-4 w-4" /> {busy ? "Submitting…" : "Submit request"}
          </button>
        </div>
      </form>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-ink">My requests</h2>
        {leaves.length === 0 ? (
          <p className="mt-4 text-sm text-slatey">No leave requests yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-slate-100">
            {leaves.map((l) => (
              <li key={l.id} className="flex items-start justify-between gap-3 py-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-ink">
                      {l.kind.charAt(0) + l.kind.slice(1).toLowerCase().replace("_", " ")}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${LEAVE_STATUS_STYLE[l.status] || ""}`}>
                      {l.status.charAt(0) + l.status.slice(1).toLowerCase()}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slatey">
                    {fmtDate(l.startDate)} – {fmtDate(l.endDate)} · {l.days} day{l.days > 1 ? "s" : ""}
                  </p>
                  {l.reason && <p className="mt-1 text-xs text-slate-400">{l.reason}</p>}
                  {l.approverNote && <p className="mt-1 text-xs text-brand-700">Note: {l.approverNote}</p>}
                </div>
                {l.status === "PENDING" && (
                  <button onClick={() => cancel(l.id)} className="shrink-0 text-xs font-medium text-red-600 hover:underline">
                    Cancel
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      </div>
    </div>
  );
}
