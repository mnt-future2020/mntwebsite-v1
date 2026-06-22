"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { computePayslip, inr, monthName } from "@/lib/hr";

type Emp = { id: string; name: string; basic: number; hra: number; allowances: number };
type Slip = { id: string; employeeId: string; employeeName: string; month: number; year: number; gross: number; net: number; status: string };

const field = "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const lbl = "mb-1 block text-xs font-medium text-slatey";
const STATUS = ["DRAFT", "FINALIZED", "PAID"];
const statusStyle: Record<string, string> = { DRAFT: "bg-slate-100 text-slatey", FINALIZED: "bg-blue-100 text-blue-700", PAID: "bg-green-100 text-green-700" };

// Module scope so React keeps the <input> mounted between renders — a component
// re-created on each render would lose focus and make the field impossible to type in.
function N({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div><label className={lbl}>{label}</label><input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))} className={field} /></div>
  );
}

export default function PayrollManager({ slips: s0, employees }: { slips: Slip[]; employees: Emp[] }) {
  const [slips, setSlips] = useState(s0);
  const now = new Date();
  const first = employees[0];
  const [f, setF] = useState({
    employeeId: first?.id || "",
    month: now.getMonth() + 1,
    year: now.getFullYear(),
    basic: first?.basic || 0,
    hra: first?.hra || 0,
    allowances: first?.allowances || 0,
    otherEarnings: 0,
    pf: 0, esi: 0, professionalTax: 0, tds: 0, otherDeductions: 0, lopDays: 0,
  });
  const [busy, setBusy] = useState(false);

  const up = (k: string, v: unknown) => setF((s) => ({ ...s, [k]: v }));
  const onEmployee = (id: string) => {
    const e = employees.find((x) => x.id === id);
    setF((s) => ({ ...s, employeeId: id, basic: e?.basic || 0, hra: e?.hra || 0, allowances: e?.allowances || 0 }));
  };

  const preview = computePayslip(f);

  const generate = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const res = await fetch("/api/admin/hr/payroll", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
    if (res.ok) {
      const d = await res.json();
      const name = employees.find((x) => x.id === f.employeeId)?.name || "";
      setSlips((s) => {
        const without = s.filter((x) => !(x.employeeId === d.employeeId && x.month === d.month && x.year === d.year));
        return [{ id: d.id, employeeId: d.employeeId, employeeName: name, month: d.month, year: d.year, gross: d.gross, net: d.net, status: d.status }, ...without];
      });
    }
    setBusy(false);
  };
  const setStatus = async (id: string, status: string) => {
    setSlips((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    await fetch(`/api/admin/hr/payroll/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
  };
  const del = async (id: string) => {
    setSlips((s) => s.filter((x) => x.id !== id));
    await fetch(`/api/admin/hr/payroll/${id}`, { method: "DELETE" });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={generate} className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-ink">Generate payslip</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className={lbl}>Employee</label>
            <select value={f.employeeId} onChange={(e) => onEmployee(e.target.value)} className={field}>
              {employees.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Month</label>
            <select value={f.month} onChange={(e) => up("month", Number(e.target.value))} className={field}>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => <option key={m} value={m}>{monthName(m)}</option>)}
            </select>
          </div>
          <div><label className={lbl}>Year</label><input type="number" value={f.year} onChange={(e) => up("year", Number(e.target.value))} className={field} /></div>
          <div className="flex items-end"><div className="rounded-lg bg-soft px-3 py-2 text-sm"><span className="text-slatey">Net pay: </span><span className="font-bold text-ink">{inr(preview.net)}</span></div></div>
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">Earnings</p>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <N label="Basic" value={f.basic} onChange={(v) => up("basic", v)} /><N label="HRA" value={f.hra} onChange={(v) => up("hra", v)} /><N label="Allowances" value={f.allowances} onChange={(v) => up("allowances", v)} /><N label="Other" value={f.otherEarnings} onChange={(v) => up("otherEarnings", v)} />
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">Deductions</p>
        <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <N label="PF" value={f.pf} onChange={(v) => up("pf", v)} /><N label="ESI" value={f.esi} onChange={(v) => up("esi", v)} /><N label="Prof. tax" value={f.professionalTax} onChange={(v) => up("professionalTax", v)} /><N label="TDS" value={f.tds} onChange={(v) => up("tds", v)} /><N label="Other" value={f.otherDeductions} onChange={(v) => up("otherDeductions", v)} /><N label="LOP days" value={f.lopDays} onChange={(v) => up("lopDays", v)} />
        </div>
        <div className="mt-5 flex items-center gap-4 text-sm">
          <button type="submit" disabled={busy} className="btn-primary disabled:opacity-70"><Icon name="wallet" className="h-4 w-4" /> {busy ? "Saving…" : "Generate / update"}</button>
          <span className="text-slatey">Gross {inr(preview.gross)} · Deductions {inr(preview.totalDeductions)}{preview.lop ? ` (incl. LOP ${inr(preview.lop)})` : ""}</span>
        </div>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[600px] text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
            <tr><th className="px-5 py-3 font-semibold">Employee</th><th className="px-5 py-3 font-semibold">Period</th><th className="px-5 py-3 font-semibold">Gross</th><th className="px-5 py-3 font-semibold">Net</th><th className="px-5 py-3 font-semibold">Status</th><th className="px-5 py-3" /></tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {slips.length === 0 ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-slatey">No payslips yet.</td></tr>
            ) : slips.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 font-medium text-ink">{p.employeeName}</td>
                <td className="px-5 py-3 text-slatey">{monthName(p.month)} {p.year}</td>
                <td className="px-5 py-3 text-slatey">{inr(p.gross)}</td>
                <td className="px-5 py-3 font-medium text-ink">{inr(p.net)}</td>
                <td className="px-5 py-3">
                  <select value={p.status} onChange={(e) => setStatus(p.id, e.target.value)} className={`rounded-full border-0 px-2.5 py-1 text-xs font-semibold ${statusStyle[p.status]}`}>
                    {STATUS.map((s) => <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>)}
                  </select>
                </td>
                <td className="px-5 py-3 text-right"><button onClick={() => del(p.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600"><Icon name="trash" className="h-4 w-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
