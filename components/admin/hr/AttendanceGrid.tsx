"use client";

import { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { ATT_STATUS_STYLE } from "@/lib/hr";
import { PUNCH_LABEL } from "@/lib/attendance";
import { toast } from "@/components/admin/Toast";

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
  existing: Record<
    string,
    {
      status: string;
      checkIn?: string | null;
      checkOut?: string | null;
      lateMinutes?: number;
      punches?: { type: string; at: string }[];
      breakMinutes?: number;
      onBreak?: boolean;
    }
  >;
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

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
    if (res.ok) {
      setSaved(true);
      toast("Attendance saved");
    } else {
      toast("Couldn't save attendance", "err");
    }
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
        <table className="w-full min-w-[760px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
            <tr>
              <th className="px-5 py-3 font-semibold">Employee</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold">In</th>
              <th className="px-5 py-3 font-semibold">Out</th>
              <th className="px-5 py-3 font-semibold">Late (min)</th>
              <th className="px-5 py-3 font-semibold">Break</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {employees.map((e) => {
              const r = rows[e.id];
              const meta = existing[e.id];
              const isOpen = !!expanded[e.id];
              const punches = meta?.punches || [];
              return (
                <Fragment key={e.id}>
                  <tr className="hover:bg-slate-50">
                    <td className="px-5 py-2.5">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setExpanded((s) => ({ ...s, [e.id]: !s[e.id] }))}
                          aria-expanded={isOpen}
                          aria-label={`Show punch timeline for ${e.name}`}
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded text-slate-400 hover:bg-slate-100 hover:text-slatey"
                        >
                          <Icon name="chevron" className={`h-4 w-4 transition-transform ${isOpen ? "" : "-rotate-90"}`} />
                        </button>
                        <span className="font-medium text-ink">{e.name}</span>
                        <span className="text-xs text-slate-400">{e.code}</span>
                        {meta?.onBreak && (
                          <span
                            title="Currently on break"
                            className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-700"
                          >
                            On break
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-2.5">
                      <select
                        aria-label={`Attendance status for ${e.name}`}
                        value={r.status}
                        onChange={(ev) => set(e.id, "status", ev.target.value)}
                        className={`${field} ${ATT_STATUS_STYLE[r.status] || ""} border-0 font-semibold`}
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                      </select>
                    </td>
                    <td className="px-5 py-2.5"><input type="time" aria-label={`Check-in for ${e.name}`} value={r.checkIn} onChange={(ev) => set(e.id, "checkIn", ev.target.value)} className={`${field} w-28`} /></td>
                    <td className="px-5 py-2.5"><input type="time" aria-label={`Check-out for ${e.name}`} value={r.checkOut} onChange={(ev) => set(e.id, "checkOut", ev.target.value)} className={`${field} w-28`} /></td>
                    <td className="px-5 py-2.5"><input type="number" aria-label={`Late minutes for ${e.name}`} value={r.lateMinutes} onChange={(ev) => set(e.id, "lateMinutes", Number(ev.target.value))} className={`${field} w-20`} /></td>
                    <td className="px-5 py-2.5 text-slatey">{meta?.breakMinutes ? `${meta.breakMinutes}m` : "—"}</td>
                  </tr>
                  {isOpen && (
                    <tr className="bg-slate-50/60">
                      <td colSpan={6} className="px-5 py-3">
                        {punches.length > 0 ? (
                          <ol className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs">
                            {punches.map((p, i) => (
                              <li key={i} className="flex items-center gap-1.5">
                                <span className="font-medium text-ink">{PUNCH_LABEL[p.type] || p.type}</span>
                                <span className="text-slate-400">{p.at}</span>
                              </li>
                            ))}
                          </ol>
                        ) : (
                          <p className="text-xs text-slatey">No self-service punches recorded for this day.</p>
                        )}
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
