"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { ATT_STATUS_STYLE } from "@/lib/hr";

type Emp = { id: string; name: string; code: string };
type Row = { employeeId: string; status: string; checkIn: string; checkOut: string; lateMinutes: number };
const STATUSES = ["PRESENT", "WFH", "HALF_DAY", "ABSENT", "LEAVE", "HOLIDAY", "WEEK_OFF"];
const field = "rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function AttendanceGrid({
  date,
  employees,
  existing,
}: {
  date: string;
  employees: Emp[];
  existing: Record<string, { status: string; checkIn?: string | null; checkOut?: string | null; lateMinutes?: number }>;
}) {
  const router = useRouter();
  const [rows, setRows] = useState<Record<string, Row>>(() => {
    const m: Record<string, Row> = {};
    for (const e of employees) {
      const ex = existing[e.id];
      m[e.id] = {
        employeeId: e.id,
        // Reflect reality: an employee with no record/punch defaults to ABSENT
        // until they punch in or HR marks them. ("Mark all present" still bulk-sets.)
        status: ex?.status || "ABSENT",
        checkIn: ex?.checkIn || "",
        checkOut: ex?.checkOut || "",
        lateMinutes: ex?.lateMinutes || 0,
      };
    }
    return m;
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const set = (id: string, k: string, v: unknown) => {
    setRows((s) => ({ ...s, [id]: { ...s[id], [k]: v } }));
    setSaved(false);
  };
  const allPresent = () => {
    setRows((s) => Object.fromEntries(Object.entries(s).map(([k, r]) => [k, { ...r, status: "PRESENT" }])));
    setSaved(false);
  };

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/hr/attendance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, records: Object.values(rows) }),
    });
    setSaving(false);
    if (res.ok) setSaved(true);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Icon name="calendar" className="h-4 w-4 text-slatey" />
          <input
            type="date"
            value={date}
            onChange={(e) => router.push(`/admin/hr/attendance?date=${e.target.value}`)}
            className={field}
          />
          <button onClick={allPresent} className="btn-ghost ml-2 !py-1.5 text-xs">Mark all present</button>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="text-sm font-medium text-green-600">Saved ✓</span>}
          <button onClick={save} disabled={saving} className="btn-primary !py-2 disabled:opacity-70">
            <Icon name="save" className="h-4 w-4" /> {saving ? "Saving…" : "Save attendance"}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
            <tr>
              <th className="px-5 py-3 font-semibold">Employee</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">In</th>
              <th className="px-5 py-3 font-semibold">Out</th>
              <th className="px-5 py-3 font-semibold">Late (min)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((e) => {
              const r = rows[e.id];
              return (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-5 py-2.5">
                    <span className="font-medium text-ink">{e.name}</span>
                    <span className="ml-2 text-xs text-slate-400">{e.code}</span>
                  </td>
                  <td className="px-5 py-2.5">
                    <select value={r.status} onChange={(ev) => set(e.id, "status", ev.target.value)} className={`${field} ${ATT_STATUS_STYLE[r.status] || ""} border-0 font-semibold`}>
                      {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-2.5"><input value={r.checkIn} onChange={(ev) => set(e.id, "checkIn", ev.target.value)} className={`${field} w-20`} placeholder="09:30" /></td>
                  <td className="px-5 py-2.5"><input value={r.checkOut} onChange={(ev) => set(e.id, "checkOut", ev.target.value)} className={`${field} w-20`} placeholder="18:30" /></td>
                  <td className="px-5 py-2.5"><input type="number" value={r.lateMinutes} onChange={(ev) => set(e.id, "lateMinutes", Number(ev.target.value))} className={`${field} w-20`} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
