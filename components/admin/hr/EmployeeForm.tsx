"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const label = "mb-1.5 block text-xs font-medium text-slatey";
const card = "rounded-2xl border border-slate-200 bg-white p-6";

type Opt = { id: string; label: string };
const dval = (d: unknown) => (d ? new Date(String(d)).toISOString().slice(0, 10) : "");

export default function EmployeeForm({
  initial,
  departments,
  managers,
  roles,
}: {
  initial?: Record<string, unknown>;
  departments: Opt[];
  managers: Opt[];
  roles: Opt[];
}) {
  const router = useRouter();
  const editing = Boolean(initial?.id);
  const v = (k: string) => (initial?.[k] ?? "") as string;

  const [f, setF] = useState({
    firstName: v("firstName"),
    lastName: v("lastName"),
    email: v("email"),
    phone: v("phone"),
    photoUrl: v("photoUrl"),
    departmentId: v("departmentId"),
    designation: v("designation"),
    level: v("level") || "Junior",
    employmentType: v("employmentType") || "FULL_TIME",
    status: v("status") || "PROBATION",
    role: v("role") || "EMPLOYEE",
    managerId: v("managerId"),
    joinDate: dval(initial?.joinDate),
    probationEndDate: dval(initial?.probationEndDate),
    confirmationDate: dval(initial?.confirmationDate),
    exitDate: dval(initial?.exitDate),
    dob: dval(initial?.dob),
    gender: v("gender"),
    address: v("address"),
    emergencyName: v("emergencyName"),
    emergencyPhone: v("emergencyPhone"),
    pan: v("pan"),
    bankName: v("bankName"),
    bankAccount: v("bankAccount"),
    ifsc: v("ifsc"),
    ctcAnnual: (initial?.ctcAnnual ?? "") as string | number,
    basic: (initial?.basic ?? "") as string | number,
    hra: (initial?.hra ?? "") as string | number,
    allowances: (initial?.allowances ?? "") as string | number,
    paidLeaveBalance: (initial?.paidLeaveBalance ?? 0) as string | number,
    notes: v("notes"),
    password: "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const up = (k: string, val: unknown) => setF((s) => ({ ...s, [k]: val }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    const res = await fetch(editing ? `/api/admin/hr/employees/${initial!.id}` : "/api/admin/hr/employees", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (res.ok) {
      router.push("/admin/hr/employees");
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setErr(d.error || "Save failed.");
      setBusy(false);
    }
  };

  const del = async () => {
    if (!initial?.id || !confirm("Delete this employee and all their records? This can't be undone.")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/hr/employees/${initial.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/hr/employees");
      router.refresh();
    } else {
      setErr("Delete failed.");
      setBusy(false);
    }
  };

  const Input = ({ k, label: l, type = "text", placeholder = "" }: { k: string; label: string; type?: string; placeholder?: string }) => (
    <div>
      <label className={label}>{l}</label>
      <input type={type} value={(f as never)[k]} onChange={(e) => up(k, e.target.value)} className={field} placeholder={placeholder} />
    </div>
  );

  return (
    <form onSubmit={save} className="space-y-6">
      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Identity</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input k="firstName" label="First name *" />
          <Input k="lastName" label="Last name" />
          <Input k="email" label="Email *" type="email" />
          <Input k="phone" label="Phone" />
          <Input k="photoUrl" label="Photo URL" />
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Job</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={label}>Department</label>
            <select value={f.departmentId} onChange={(e) => up("departmentId", e.target.value)} className={field}>
              <option value="">—</option>
              {departments.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
            </select>
          </div>
          <Input k="designation" label="Designation" placeholder="e.g. Backend Developer" />
          <div>
            <label className={label}>Level</label>
            <select value={f.level} onChange={(e) => up("level", e.target.value)} className={field}>
              {["Junior", "Mid", "Senior", "Lead"].map((x) => <option key={x}>{x}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Employment type</label>
            <select value={f.employmentType} onChange={(e) => up("employmentType", e.target.value)} className={field}>
              {["FULL_TIME", "PART_TIME", "INTERN", "CONTRACT"].map((x) => <option key={x} value={x}>{x.replace("_", " ")}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Status</label>
            <select value={f.status} onChange={(e) => up("status", e.target.value)} className={field}>
              {["PROBATION", "CONFIRMED", "NOTICE", "EXITED"].map((x) => <option key={x} value={x}>{x.charAt(0) + x.slice(1).toLowerCase()}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Reporting manager</label>
            <select value={f.managerId} onChange={(e) => up("managerId", e.target.value)} className={field}>
              <option value="">—</option>
              {managers.filter((m) => m.id !== initial?.id).map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
          <Input k="joinDate" label="Join date" type="date" />
          <Input k="probationEndDate" label="Probation ends" type="date" />
          <Input k="confirmationDate" label="Confirmation date" type="date" />
          <Input k="exitDate" label="Exit date" type="date" />
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Personal</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input k="dob" label="Date of birth" type="date" />
          <Input k="gender" label="Gender" />
          <Input k="address" label="Address" />
          <Input k="emergencyName" label="Emergency contact" />
          <Input k="emergencyPhone" label="Emergency phone" />
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Statutory &amp; bank</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input k="pan" label="PAN" />
          <Input k="bankName" label="Bank name" />
          <Input k="bankAccount" label="Account number" />
          <Input k="ifsc" label="IFSC" />
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Compensation (monthly ₹)</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Input k="ctcAnnual" label="Annual CTC" type="number" />
          <Input k="basic" label="Basic" type="number" />
          <Input k="hra" label="HRA" type="number" />
          <Input k="allowances" label="Allowances" type="number" />
          <Input k="paidLeaveBalance" label="Paid leave balance" type="number" />
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Access &amp; login</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={label}>Role</label>
            <select value={f.role} onChange={(e) => up("role", e.target.value)} className={field}>
              {roles.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
          </div>
          <div className="lg:col-span-2">
            <label className={label}>{editing ? "Reset password (leave blank to keep current)" : "Set password"}</label>
            <input type="password" value={f.password} onChange={(e) => up("password", e.target.value)} className={field} placeholder="••••••••" autoComplete="new-password" />
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Signs in at <code>/admin/login</code> with their email + this password. HR / Admin get the
          admin panel; Employee / Manager get the self-service portal.
        </p>
      </div>

      <div className={card}>
        <label className={label}>Notes</label>
        <textarea rows={2} value={f.notes} onChange={(e) => up("notes", e.target.value)} className={`${field} resize-none`} />
      </div>

      {err && <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">{err}</p>}

      <div className="flex items-center gap-3">
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-70">
          <Icon name="save" className="h-4 w-4" /> {busy ? "Saving…" : editing ? "Save changes" : "Add employee"}
        </button>
        {editing && (
          <button type="button" onClick={del} disabled={busy} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
            <Icon name="trash" className="h-4 w-4" /> Delete
          </button>
        )}
      </div>
    </form>
  );
}
