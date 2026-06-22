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

// Defined at module scope (NOT inside EmployeeForm) so its component identity
// stays stable across re-renders — otherwise React remounts the <input> on every
// keystroke and the field loses focus, making it impossible to type.
function Input({
  label: l,
  value,
  onChange,
  type = "text",
  placeholder = "",
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className={label}>{l}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={field}
        placeholder={placeholder}
      />
    </div>
  );
}

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

  return (
    <form onSubmit={save} className="space-y-6">
      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Identity</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input label="First name *" value={f.firstName} onChange={(val) => up("firstName", val)} />
          <Input label="Last name" value={f.lastName} onChange={(val) => up("lastName", val)} />
          <Input label="Email *" type="email" value={f.email} onChange={(val) => up("email", val)} />
          <Input label="Phone" value={f.phone} onChange={(val) => up("phone", val)} />
          <Input label="Photo URL" value={f.photoUrl} onChange={(val) => up("photoUrl", val)} />
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
          <Input label="Designation" value={f.designation} onChange={(val) => up("designation", val)} placeholder="e.g. Backend Developer" />
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
          <Input label="Join date" type="date" value={f.joinDate} onChange={(val) => up("joinDate", val)} />
          <Input label="Probation ends" type="date" value={f.probationEndDate} onChange={(val) => up("probationEndDate", val)} />
          <Input label="Confirmation date" type="date" value={f.confirmationDate} onChange={(val) => up("confirmationDate", val)} />
          <Input label="Exit date" type="date" value={f.exitDate} onChange={(val) => up("exitDate", val)} />
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Personal</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Input label="Date of birth" type="date" value={f.dob} onChange={(val) => up("dob", val)} />
          <Input label="Gender" value={f.gender} onChange={(val) => up("gender", val)} />
          <Input label="Address" value={f.address} onChange={(val) => up("address", val)} />
          <Input label="Emergency contact" value={f.emergencyName} onChange={(val) => up("emergencyName", val)} />
          <Input label="Emergency phone" value={f.emergencyPhone} onChange={(val) => up("emergencyPhone", val)} />
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Statutory &amp; bank</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Input label="PAN" value={f.pan} onChange={(val) => up("pan", val)} />
          <Input label="Bank name" value={f.bankName} onChange={(val) => up("bankName", val)} />
          <Input label="Account number" value={f.bankAccount} onChange={(val) => up("bankAccount", val)} />
          <Input label="IFSC" value={f.ifsc} onChange={(val) => up("ifsc", val)} />
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Compensation (monthly ₹)</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Input label="Annual CTC" type="number" value={f.ctcAnnual} onChange={(val) => up("ctcAnnual", val)} />
          <Input label="Basic" type="number" value={f.basic} onChange={(val) => up("basic", val)} />
          <Input label="HRA" type="number" value={f.hra} onChange={(val) => up("hra", val)} />
          <Input label="Allowances" type="number" value={f.allowances} onChange={(val) => up("allowances", val)} />
          <Input label="Paid leave balance" type="number" value={f.paidLeaveBalance} onChange={(val) => up("paidLeaveBalance", val)} />
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
