"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { fmtDate, leaveDays, LEAVE_STATUS_STYLE, balanceFieldForKind } from "@/lib/hr";

type Leave = { id: string; employeeId: string; employeeName: string; kind: string; startDate: string; endDate: string; days: number; reason?: string | null; status: string };
type Emp = { id: string; name: string; paidLeaveBalance: number; casualBalance: number; sickBalance: number; compOffBalance: number };
type Holiday = { id: string; date: string; name: string };

const field = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const KINDS = ["PAID", "SICK", "CASUAL", "COMP_OFF", "UNPAID"];

export default function LeaveManager({ leaves: l0, employees, holidays: h0 }: { leaves: Leave[]; employees: Emp[]; holidays: Holiday[] }) {
  const router = useRouter();
  const [leaves, setLeaves] = useState(l0);
  const [holidays, setHolidays] = useState(h0);
  const [form, setForm] = useState({ employeeId: employees[0]?.id || "", kind: "PAID", startDate: "", endDate: "", reason: "" });
  const [hol, setHol] = useState({ date: "", name: "" });

  const decide = async (id: string, status: string) => {
    setLeaves((s) => s.map((l) => (l.id === id ? { ...l, status } : l)));
    await fetch(`/api/admin/hr/leave/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    router.refresh(); // pull fresh balances after the deduction/restore
  };
  const del = async (id: string) => {
    setLeaves((s) => s.filter((l) => l.id !== id));
    await fetch(`/api/admin/hr/leave/${id}`, { method: "DELETE" });
  };
  const addLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.employeeId || !form.startDate || !form.endDate) return;
    const res = await fetch("/api/admin/hr/leave", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) {
      const d = await res.json();
      const name = employees.find((x) => x.id === form.employeeId)?.name || "";
      setLeaves((s) => [{ ...d, employeeName: name, startDate: d.startDate, endDate: d.endDate }, ...s]);
      setForm({ ...form, startDate: "", endDate: "", reason: "" });
    }
  };
  const addHoliday = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hol.date || !hol.name) return;
    const res = await fetch("/api/admin/hr/holidays", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(hol) });
    if (res.ok) {
      const created = await res.json();
      setHolidays((s) => [...s, created].sort((a, b) => +new Date(a.date) - +new Date(b.date)));
      setHol({ date: "", name: "" });
    }
  };
  const delHoliday = async (id: string) => {
    setHolidays((s) => s.filter((h) => h.id !== id));
    await fetch(`/api/admin/hr/holidays/${id}`, { method: "DELETE" });
  };

  const estDays = form.startDate && form.endDate ? leaveDays(form.startDate, form.endDate) : 0;

  // Remaining balance for an employee + leave type (null = no balance, e.g. UNPAID).
  const balanceFor = (employeeId: string, kind: string): number | null => {
    const fld = balanceFieldForKind(kind);
    if (!fld) return null;
    const emp = employees.find((e) => e.id === employeeId);
    return emp ? emp[fld] : null;
  };
  const formBalance = balanceFor(form.employeeId, form.kind);

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
            <tr><th className="px-5 py-3 font-semibold">Employee</th><th className="px-5 py-3 font-semibold">Dates</th><th className="px-5 py-3 font-semibold">Type</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {leaves.length === 0 ? (
              <tr><td colSpan={5} className="px-5 py-10 text-center text-slatey">No leave records yet.</td></tr>
            ) : leaves.map((l) => {
              const bal = balanceFor(l.employeeId, l.kind);
              const low = l.status === "PENDING" && bal != null && l.days > bal;
              return (
              <tr key={l.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-ink">{l.employeeName}</td>
                <td className="px-5 py-3 text-slatey">{fmtDate(l.startDate)} → {fmtDate(l.endDate)} <span className="text-xs text-slate-400">· {l.days}d</span></td>
                <td className="px-5 py-3 text-slatey">
                  {l.kind.replace("_", " ")}
                  {bal != null && <span className={`mt-0.5 block text-xs ${low ? "font-semibold text-amber-600" : "text-slate-400"}`}>bal: {bal}d{low ? " ⚠ low" : ""}</span>}
                </td>
                <td className="px-5 py-3"><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${LEAVE_STATUS_STYLE[l.status]}`}>{l.status.charAt(0) + l.status.slice(1).toLowerCase()}</span></td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-1">
                    {l.status === "PENDING" && (
                      <>
                        <button onClick={() => decide(l.id, "APPROVED")} title="Approve" className="rounded-lg p-1.5 text-green-600 hover:bg-green-50"><Icon name="check" className="h-4 w-4" /></button>
                        <button onClick={() => decide(l.id, "REJECTED")} title="Reject" className="rounded-lg p-1.5 text-red-600 hover:bg-red-50"><Icon name="x" className="h-4 w-4" /></button>
                      </>
                    )}
                    <button onClick={() => del(l.id)} title="Delete" className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600"><Icon name="trash" className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="space-y-6">
        <form onSubmit={addLeave} className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-ink">Add leave</h2>
          <div className="mt-4 space-y-3">
            <select value={form.employeeId} onChange={(e) => setForm({ ...form, employeeId: e.target.value })} className={field}>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            <select value={form.kind} onChange={(e) => setForm({ ...form, kind: e.target.value })} className={field}>
              {KINDS.map((k) => <option key={k} value={k}>{k.replace("_", " ")}</option>)}
            </select>
            {formBalance != null ? (
              <p className={`text-xs ${estDays > formBalance ? "font-semibold text-amber-600" : "text-slate-400"}`}>
                Balance: {formBalance} day(s){estDays > formBalance ? " — exceeds" : ""}
              </p>
            ) : (
              <p className="text-xs text-slate-400">Unpaid — no balance deducted.</p>
            )}
            <div className="grid grid-cols-2 gap-2">
              <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className={field} />
              <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className={field} />
            </div>
            <textarea rows={2} value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })} className={`${field} resize-none`} placeholder="Reason (optional)" />
            {estDays > 0 && <p className="text-xs text-slate-400">{estDays} day(s)</p>}
          </div>
          <button type="submit" className="btn-primary mt-4 w-full"><Icon name="plus" className="h-4 w-4" /> Add leave</button>
        </form>

        <form onSubmit={addHoliday} className="rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-ink">Holiday calendar</h2>
          <div className="mt-3 divide-y divide-slate-100">
            {holidays.length === 0 ? <p className="py-2 text-sm text-slatey">No holidays added.</p> : holidays.map((h) => (
              <div key={h.id} className="flex items-center justify-between py-2 text-sm">
                <span className="text-ink">{fmtDate(h.date)} <span className="text-xs text-slate-400">· {h.name}</span></span>
                <button onClick={() => delHoliday(h.id)} className="rounded-lg p-1 text-slatey hover:bg-red-50 hover:text-red-600"><Icon name="trash" className="h-3.5 w-3.5" /></button>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <input type="date" value={hol.date} onChange={(e) => setHol({ ...hol, date: e.target.value })} className={field} />
            <input value={hol.name} onChange={(e) => setHol({ ...hol, name: e.target.value })} className={field} placeholder="Name" />
          </div>
          <button type="submit" className="btn-ghost mt-3 w-full"><Icon name="plus" className="h-4 w-4" /> Add holiday</button>
        </form>
      </div>
    </div>
  );
}
