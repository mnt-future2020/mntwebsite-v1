"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import DateField from "@/components/admin/DateField";
import { PROJECT_STATUSES, BILLING_TYPES, BILLING_LABELS, titleCase } from "@/lib/projects";

type Opt = { id: string; label: string };
const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const label = "mb-1.5 block text-xs font-medium text-slatey";
const card = "rounded-2xl border border-slate-200 bg-white p-6";
const dval = (d: unknown) => (d ? new Date(String(d)).toISOString().slice(0, 10) : "");

export default function ProjectForm({
  initial,
  clients,
  leads,
}: {
  initial?: Record<string, unknown>;
  clients: Opt[];
  leads: Opt[];
}) {
  const router = useRouter();
  const editing = Boolean(initial?.id);
  const v = (k: string) => (initial?.[k] ?? "") as string;

  const [f, setF] = useState({
    name: v("name"),
    clientId: v("clientId"),
    status: v("status") || "DISCOVERY",
    billingType: v("billingType") || "FIXED",
    budget: initial?.budget != null ? String(initial.budget) : "",
    currency: v("currency") || "INR",
    hourlyRate: initial?.hourlyRate != null ? String(initial.hourlyRate) : "",
    techStack: Array.isArray(initial?.techStack) ? (initial!.techStack as string[]).join(", ") : "",
    repoUrl: v("repoUrl"),
    startDate: dval(initial?.startDate),
    endDate: dval(initial?.endDate),
    leadId: v("leadId"),
    description: v("description"),
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const up = (k: string, val: string) => setF((s) => ({ ...s, [k]: val }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) {
      setErr("Project name is required.");
      return;
    }
    setBusy(true);
    setErr(null);
    const res = await fetch(editing ? `/api/admin/projects/${initial!.id}` : "/api/admin/projects", {
      method: editing ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (res.ok) {
      const p = await res.json();
      router.push(`/admin/projects/${p.id}`);
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setErr(d.error || "Couldn't save.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="space-y-6">
      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Basics</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label}>Project name *</label>
            <input value={f.name} onChange={(e) => up("name", e.target.value)} className={field} placeholder="e.g. Acme Telehealth Platform" />
          </div>
          <div>
            <label className={label}>Client</label>
            <select value={f.clientId} onChange={(e) => up("clientId", e.target.value)} className={field}>
              <option value="">— No client —</option>
              {clients.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Project lead</label>
            <select value={f.leadId} onChange={(e) => up("leadId", e.target.value)} className={field}>
              <option value="">— Unassigned —</option>
              {leads.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Status</label>
            <select value={f.status} onChange={(e) => up("status", e.target.value)} className={field}>
              {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{titleCase(s)}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Tech stack (comma-separated)</label>
            <input value={f.techStack} onChange={(e) => up("techStack", e.target.value)} className={field} placeholder="Next.js, Postgres, AWS" />
          </div>
          <div className="sm:col-span-2">
            <label className={label}>Description</label>
            <textarea value={f.description} onChange={(e) => up("description", e.target.value)} className={field} rows={3} placeholder="Scope, goals, notes…" />
          </div>
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Commercials &amp; timeline</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className={label}>Billing type</label>
            <select value={f.billingType} onChange={(e) => up("billingType", e.target.value)} className={field}>
              {BILLING_TYPES.map((b) => <option key={b} value={b}>{BILLING_LABELS[b]}</option>)}
            </select>
          </div>
          <div>
            <label className={label}>Budget</label>
            <input value={f.budget} onChange={(e) => up("budget", e.target.value)} className={field} type="number" placeholder="0" />
          </div>
          <div>
            <label className={label}>Currency</label>
            <input value={f.currency} onChange={(e) => up("currency", e.target.value)} className={field} placeholder="INR" />
          </div>
          <div>
            <label className={label}>Hourly rate (for T&amp;M)</label>
            <input value={f.hourlyRate} onChange={(e) => up("hourlyRate", e.target.value)} className={field} type="number" placeholder="0" />
          </div>
          <DateField label="Start date" value={f.startDate} onChange={(v) => up("startDate", v)} />
          <DateField label="Target delivery" value={f.endDate} onChange={(v) => up("endDate", v)} />
          <div className="sm:col-span-2 lg:col-span-3">
            <label className={label}>Repository URL</label>
            <input value={f.repoUrl} onChange={(e) => up("repoUrl", e.target.value)} className={field} placeholder="https://github.com/org/repo" />
          </div>
        </div>
      </div>

      {err && <p className="rounded-lg border border-red-100 bg-red-50 px-4 py-2.5 text-sm text-red-700">{err}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-70">
          <Icon name="save" className="h-4 w-4" /> {busy ? "Saving…" : editing ? "Save project" : "Create project"}
        </button>
        <button type="button" onClick={() => router.back()} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slatey hover:bg-slate-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
