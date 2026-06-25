"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import {
  money,
  fmtDate,
  hoursLabel,
  titleCase,
  SPRINT_STATUSES,
  SPRINT_STATUS_STYLE,
  MILESTONE_STATUSES,
  MILESTONE_STATUS_STYLE,
  INVOICE_STATUSES,
  INVOICE_STATUS_STYLE,
} from "@/lib/projects";

type Opt = { id: string; label: string };
const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const card = "rounded-2xl border border-slate-200 bg-white";
const dval = (d: unknown) => (d ? new Date(String(d)).toISOString().slice(0, 10) : "");

function post(url: string, body: unknown) {
  return fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
}

// ─────────────────────────── Team ───────────────────────────
type Member = { id: string; role: string; allocationPct: number; employee: { id: string; firstName: string; lastName?: string | null } };

export function TeamPanel({ projectId, initial, employees }: { projectId: string; initial: Member[]; employees: Opt[] }) {
  const [members, setMembers] = useState<Member[]>(initial);
  const [empId, setEmpId] = useState("");
  const [role, setRole] = useState("Engineer");
  const [alloc, setAlloc] = useState("100");
  const [err, setErr] = useState<string | null>(null);

  const onProject = new Set(members.map((m) => m.employee.id));
  const available = employees.filter((e) => !onProject.has(e.id));

  const add = async () => {
    if (!empId) return;
    setErr(null);
    const res = await post("/api/admin/projects/members", { projectId, employeeId: empId, role, allocationPct: Number(alloc) || 100 });
    if (res.ok) {
      const m = await res.json();
      setMembers((s) => [...s, m]);
      setEmpId("");
      setRole("Engineer");
      setAlloc("100");
    } else setErr((await res.json().catch(() => ({}))).error || "Couldn't add.");
  };
  const remove = async (id: string) => {
    if (!confirm("Remove this team member from the project?")) return;
    const prev = members;
    setMembers((s) => s.filter((m) => m.id !== id));
    const res = await fetch(`/api/admin/projects/members/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setMembers(prev);
      toast("Couldn't remove member", "err");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      <div className={`overflow-hidden ${card}`}>
        {members.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slatey">No one allocated yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {members.map((m) => (
              <li key={m.id} className="flex items-center justify-between px-5 py-3">
                <div>
                  <p className="text-sm font-medium text-ink">{[m.employee.firstName, m.employee.lastName].filter(Boolean).join(" ")}</p>
                  <p className="text-xs text-slate-400">{m.role} · {m.allocationPct}% allocated</p>
                </div>
                <button onClick={() => remove(m.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                  <Icon name="trash" className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`h-fit p-5 ${card}`}>
        <h3 className="text-sm font-semibold text-ink">Add team member</h3>
        <div className="mt-3 space-y-3">
          <select value={empId} onChange={(e) => setEmpId(e.target.value)} className={field}>
            <option value="">Select employee…</option>
            {available.map((e) => <option key={e.id} value={e.id}>{e.label}</option>)}
          </select>
          <input value={role} onChange={(e) => setRole(e.target.value)} className={field} placeholder="Role (Frontend, QA…)" />
          <input value={alloc} onChange={(e) => setAlloc(e.target.value)} className={field} type="number" placeholder="Allocation %" />
        </div>
        {err && <p className="mt-2 text-xs text-red-600">{err}</p>}
        <button onClick={add} disabled={!empId} className="btn-primary mt-3 w-full disabled:opacity-60">
          <Icon name="plus" className="h-4 w-4" /> Add
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────── Milestones ───────────────────────────
type Milestone = { id: string; title: string; dueDate?: string | Date | null; amount: number; status: string };

export function MilestonesPanel({ projectId, initial, currency }: { projectId: string; initial: Milestone[]; currency: string }) {
  const [items, setItems] = useState<Milestone[]>(initial);
  const [title, setTitle] = useState("");
  const [due, setDue] = useState("");
  const [amount, setAmount] = useState("");

  const add = async () => {
    if (!title.trim()) return;
    const res = await post("/api/admin/projects/milestones", { projectId, title, dueDate: due || null, amount: Number(amount) || 0 });
    if (res.ok) {
      const m = await res.json();
      setItems((s) => [...s, m]);
      setTitle(""); setDue(""); setAmount("");
    }
  };
  const setStatus = async (id: string, status: string) => {
    const prev = items;
    setItems((s) => s.map((m) => (m.id === id ? { ...m, status } : m)));
    const res = await fetch(`/api/admin/projects/milestones/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }).catch(() => null);
    if (!res || !res.ok) {
      setItems(prev);
      toast("Couldn't update milestone", "err");
    }
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this milestone?")) return;
    const prev = items;
    setItems((s) => s.filter((m) => m.id !== id));
    const res = await fetch(`/api/admin/projects/milestones/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setItems(prev);
      toast("Couldn't delete milestone", "err");
    }
  };

  return (
    <div className="space-y-4">
      <div className={`overflow-hidden ${card}`}>
        {items.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slatey">No milestones yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{m.title}</p>
                  <p className="text-xs text-slate-400">Due {fmtDate(m.dueDate)} · {money(m.amount, currency)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select value={m.status} onChange={(e) => setStatus(m.id, e.target.value)} className={`rounded-full px-2 py-1 text-xs font-semibold ${MILESTONE_STATUS_STYLE[m.status] || ""}`}>
                    {MILESTONE_STATUSES.map((s) => <option key={s} value={s}>{titleCase(s)}</option>)}
                  </select>
                  <button onClick={() => remove(m.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`flex flex-wrap items-end gap-3 p-4 ${card}`}>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className={`${field} flex-1 min-w-[140px]`} placeholder="Milestone title" />
        <input value={due} onChange={(e) => setDue(e.target.value)} className={`${field} w-full sm:w-40`} type="date" />
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className={`${field} w-full sm:w-32`} type="number" placeholder="Amount" />
        <button onClick={add} className="btn-primary w-full justify-center sm:w-auto"><Icon name="plus" className="h-4 w-4" /> Add</button>
      </div>
    </div>
  );
}

// ─────────────────────────── Sprints ───────────────────────────
type Sprint = { id: string; name: string; goal?: string | null; startDate?: string | Date | null; endDate?: string | Date | null; status: string };

export function SprintsPanel({ projectId, initial }: { projectId: string; initial: Sprint[] }) {
  const [items, setItems] = useState<Sprint[]>(initial);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const add = async () => {
    if (!name.trim()) return;
    const res = await post("/api/admin/projects/sprints", { projectId, name, goal, startDate: start || null, endDate: end || null });
    if (res.ok) {
      const sprint = await res.json();
      setItems((s) => [...s, sprint]);
      setName(""); setGoal(""); setStart(""); setEnd("");
    }
  };
  const setStatus = async (id: string, status: string) => {
    const prev = items;
    setItems((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    const res = await fetch(`/api/admin/projects/sprints/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }).catch(() => null);
    if (!res || !res.ok) {
      setItems(prev);
      toast("Couldn't update sprint", "err");
    }
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this sprint?")) return;
    const prev = items;
    setItems((s) => s.filter((x) => x.id !== id));
    const res = await fetch(`/api/admin/projects/sprints/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setItems(prev);
      toast("Couldn't delete sprint", "err");
    }
  };

  return (
    <div className="space-y-4">
      <div className={`overflow-hidden ${card}`}>
        {items.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slatey">No sprints yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((s) => (
              <li key={s.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ink">{s.name}</p>
                  <p className="truncate text-xs text-slate-400">
                    {s.goal || "No goal"} · {fmtDate(s.startDate)} → {fmtDate(s.endDate)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select value={s.status} onChange={(e) => setStatus(s.id, e.target.value)} className={`rounded-full px-2 py-1 text-xs font-semibold ${SPRINT_STATUS_STYLE[s.status] || ""}`}>
                    {SPRINT_STATUSES.map((x) => <option key={x} value={x}>{titleCase(x)}</option>)}
                  </select>
                  <button onClick={() => remove(s.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`flex flex-wrap items-end gap-3 p-4 ${card}`}>
        <input value={name} onChange={(e) => setName(e.target.value)} className={`${field} w-full sm:w-40`} placeholder="Sprint name" />
        <input value={goal} onChange={(e) => setGoal(e.target.value)} className={`${field} flex-1 min-w-[140px]`} placeholder="Goal" />
        <input value={start} onChange={(e) => setStart(e.target.value)} className={`${field} w-full sm:w-36`} type="date" />
        <input value={end} onChange={(e) => setEnd(e.target.value)} className={`${field} w-full sm:w-36`} type="date" />
        <button onClick={add} className="btn-primary w-full justify-center sm:w-auto"><Icon name="plus" className="h-4 w-4" /> Add</button>
      </div>
    </div>
  );
}

// ─────────────────────────── Invoices ───────────────────────────
type Invoice = { id: string; number: string; amount: number; currency: string; status: string; issueDate?: string | Date | null; dueDate?: string | Date | null };

export function InvoicesPanel({ projectId, initial, currency }: { projectId: string; initial: Invoice[]; currency: string }) {
  const [items, setItems] = useState<Invoice[]>(initial);
  const [amount, setAmount] = useState("");
  const [issue, setIssue] = useState("");
  const [due, setDue] = useState("");

  const add = async () => {
    if (!(Number(amount) > 0)) return;
    const res = await post("/api/admin/projects/invoices", { projectId, amount: Number(amount), currency, issueDate: issue || null, dueDate: due || null });
    if (res.ok) {
      const inv = await res.json();
      setItems((s) => [inv, ...s]);
      setAmount(""); setIssue(""); setDue("");
    }
  };
  const setStatus = async (id: string, status: string) => {
    const prev = items;
    setItems((s) => s.map((x) => (x.id === id ? { ...x, status } : x)));
    const res = await fetch(`/api/admin/projects/invoices/${id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }).catch(() => null);
    if (!res || !res.ok) {
      setItems(prev);
      toast("Couldn't update invoice", "err");
    }
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this invoice?")) return;
    const prev = items;
    setItems((s) => s.filter((x) => x.id !== id));
    const res = await fetch(`/api/admin/projects/invoices/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setItems(prev);
      toast("Couldn't delete invoice", "err");
    }
  };

  const billed = items.reduce((s, i) => s + i.amount, 0);
  const paid = items.filter((i) => i.status === "PAID").reduce((s, i) => s + i.amount, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-6 text-sm">
        <span className="text-slatey">Billed: <b className="text-ink">{money(billed, currency)}</b></span>
        <span className="text-slatey">Paid: <b className="text-green-700">{money(paid, currency)}</b></span>
        <span className="text-slatey">Outstanding: <b className="text-ink">{money(billed - paid, currency)}</b></span>
      </div>
      <div className={`overflow-hidden ${card}`}>
        {items.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slatey">No invoices yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((i) => (
              <li key={i.id} className="flex items-center justify-between gap-3 px-5 py-3">
                <div>
                  <p className="font-mono text-sm font-medium text-ink">{i.number}</p>
                  <p className="text-xs text-slate-400">Issued {fmtDate(i.issueDate)} · due {fmtDate(i.dueDate)}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-ink">{money(i.amount, i.currency)}</span>
                  <select value={i.status} onChange={(e) => setStatus(i.id, e.target.value)} className={`rounded-full px-2 py-1 text-xs font-semibold ${INVOICE_STATUS_STYLE[i.status] || ""}`}>
                    {INVOICE_STATUSES.map((s) => <option key={s} value={s}>{titleCase(s)}</option>)}
                  </select>
                  <button onClick={() => remove(i.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                    <Icon name="trash" className="h-4 w-4" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={`flex flex-wrap items-end gap-3 p-4 ${card}`}>
        <input value={amount} onChange={(e) => setAmount(e.target.value)} className={`${field} w-full sm:w-40`} type="number" placeholder="Amount" />
        <div className="w-full sm:w-auto"><span className="mb-1 block text-[11px] text-slate-400">Issue date</span><input value={issue} onChange={(e) => setIssue(e.target.value)} className={`${field} w-full sm:w-40`} type="date" /></div>
        <div className="w-full sm:w-auto"><span className="mb-1 block text-[11px] text-slate-400">Due date</span><input value={due} onChange={(e) => setDue(e.target.value)} className={`${field} w-full sm:w-40`} type="date" /></div>
        <button onClick={add} className="btn-primary w-full justify-center sm:w-auto"><Icon name="plus" className="h-4 w-4" /> New invoice</button>
      </div>
    </div>
  );
}

// ─────────────────────────── Time ───────────────────────────
type Entry = { id: string; date: string | Date; hours: number; note?: string | null; billable: boolean; employee: { firstName: string; lastName?: string | null }; task?: { title: string } | null };

export function TimePanel({ projectId, initial, members }: { projectId: string; initial: Entry[]; members: Opt[] }) {
  const [items, setItems] = useState<Entry[]>(initial);
  const [empId, setEmpId] = useState("");
  const [date, setDate] = useState(dval(new Date().toISOString()));
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");

  const add = async () => {
    if (!empId || !(Number(hours) > 0)) return;
    const res = await post("/api/admin/projects/time", { projectId, employeeId: empId, date, hours: Number(hours), note });
    if (res.ok) {
      const entry = await res.json();
      setItems((s) => [entry, ...s]);
      setHours(""); setNote("");
    }
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this time entry?")) return;
    const prev = items;
    setItems((s) => s.filter((x) => x.id !== id));
    const res = await fetch(`/api/admin/projects/time/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setItems(prev);
      toast("Couldn't delete time entry", "err");
    }
  };

  const total = items.reduce((s, e) => s + e.hours, 0);
  const billable = items.filter((e) => e.billable).reduce((s, e) => s + e.hours, 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-6 text-sm">
        <span className="text-slatey">Logged: <b className="text-ink">{hoursLabel(total)}</b></span>
        <span className="text-slatey">Billable: <b className="text-green-700">{hoursLabel(billable)}</b></span>
      </div>
      <div className={`flex flex-wrap items-end gap-3 p-4 ${card}`}>
        <select value={empId} onChange={(e) => setEmpId(e.target.value)} className={`${field} w-full sm:w-44`}>
          <option value="">Who…</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
        <input value={date} onChange={(e) => setDate(e.target.value)} className={`${field} w-full sm:w-40`} type="date" />
        <input value={hours} onChange={(e) => setHours(e.target.value)} className={`${field} w-full sm:w-24`} type="number" step="0.5" placeholder="Hours" />
        <input value={note} onChange={(e) => setNote(e.target.value)} className={`${field} flex-1 min-w-[140px]`} placeholder="What did you work on?" />
        <button onClick={add} className="btn-primary w-full justify-center sm:w-auto"><Icon name="plus" className="h-4 w-4" /> Log</button>
      </div>
      <div className={`overflow-hidden ${card}`}>
        {items.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slatey">No time logged yet.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((e) => (
              <li key={e.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <div className="min-w-0">
                  <p className="text-ink">
                    <b>{hoursLabel(e.hours)}</b> · {[e.employee.firstName, e.employee.lastName].filter(Boolean).join(" ")}
                  </p>
                  <p className="truncate text-xs text-slate-400">{fmtDate(e.date)} · {e.task?.title || e.note || "—"}</p>
                </div>
                <button onClick={() => remove(e.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                  <Icon name="trash" className="h-4 w-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
