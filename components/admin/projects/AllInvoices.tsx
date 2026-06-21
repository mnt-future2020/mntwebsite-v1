"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { money, fmtDate, titleCase, INVOICE_STATUSES, INVOICE_STATUS_STYLE } from "@/lib/projects";

type Opt = { id: string; label: string };
type Invoice = {
  id: string;
  number: string;
  amount: number;
  currency: string;
  status: string;
  issueDate?: string | Date | null;
  dueDate?: string | Date | null;
  project?: { name: string } | null;
  client?: { name: string } | null;
};
const field =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function AllInvoices({ initial, projects }: { initial: Invoice[]; projects: Opt[] }) {
  const [items, setItems] = useState<Invoice[]>(initial);
  const [projectId, setProjectId] = useState("");
  const [amount, setAmount] = useState("");
  const [issue, setIssue] = useState("");
  const [due, setDue] = useState("");

  const add = async () => {
    if (!(Number(amount) > 0)) return;
    const res = await fetch("/api/admin/projects/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: projectId || null, amount: Number(amount), issueDate: issue || null, dueDate: due || null }),
    });
    if (res.ok) {
      const inv = await res.json();
      setItems((s) => [inv, ...s]);
      setAmount(""); setIssue(""); setDue("");
    }
  };
  const setStatus = async (id: string, status: string) => {
    setItems((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    await fetch(`/api/admin/projects/invoices/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
  };
  const remove = async (id: string) => {
    setItems((s) => s.filter((x) => x.id !== id));
    await fetch(`/api/admin/projects/invoices/${id}`, { method: "DELETE" });
  };

  const billed = items.reduce((s, i) => s + i.amount, 0);
  const paid = items.filter((i) => i.status === "PAID").reduce((s, i) => s + i.amount, 0);
  const overdue = items.filter((i) => i.status === "OVERDUE").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total billed" value={money(billed)} />
        <Stat label="Paid" value={money(paid)} tone="text-green-700" />
        <Stat label="Overdue" value={money(overdue)} tone="text-red-600" />
      </div>

      <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <select value={projectId} onChange={(e) => setProjectId(e.target.value)} className={`${field} w-56`}>
          <option value="">— No project —</option>
          {projects.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
        </select>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className={`${field} w-36`} type="number" placeholder="Amount" />
        <div><span className="mb-1 block text-[11px] text-slate-400">Issue</span><input value={issue} onChange={(e) => setIssue(e.target.value)} className={`${field} w-40`} type="date" /></div>
        <div><span className="mb-1 block text-[11px] text-slate-400">Due</span><input value={due} onChange={(e) => setDue(e.target.value)} className={`${field} w-40`} type="date" /></div>
        <button onClick={add} className="btn-primary"><Icon name="plus" className="h-4 w-4" /> New invoice</button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {items.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slatey">No invoices yet.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
              <tr>
                <th className="px-5 py-3 font-semibold">Invoice</th>
                <th className="px-5 py-3 font-semibold">Project / client</th>
                <th className="px-5 py-3 font-semibold">Amount</th>
                <th className="px-5 py-3 font-semibold">Dates</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {items.map((i) => (
                <tr key={i.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-mono font-medium text-ink">{i.number}</td>
                  <td className="px-5 py-3 text-slatey">{i.project?.name || "—"}<div className="text-xs text-slate-400">{i.client?.name || ""}</div></td>
                  <td className="px-5 py-3 font-medium text-ink">{money(i.amount, i.currency)}</td>
                  <td className="px-5 py-3 text-xs text-slate-400">{fmtDate(i.issueDate)} → {fmtDate(i.dueDate)}</td>
                  <td className="px-5 py-3">
                    <select value={i.status} onChange={(e) => setStatus(i.id, e.target.value)} className={`rounded-full px-2 py-1 text-xs font-semibold ${INVOICE_STATUS_STYLE[i.status] || ""}`}>
                      {INVOICE_STATUSES.map((s) => <option key={s} value={s}>{titleCase(s)}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => remove(i.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className={`text-2xl font-bold ${tone || "text-ink"}`}>{value}</div>
      <div className="mt-1 text-sm text-slatey">{label}</div>
    </div>
  );
}
