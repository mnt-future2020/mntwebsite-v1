"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";
import { CLIENT_STATUSES, CLIENT_STATUS_STYLE, titleCase } from "@/lib/projects";

type Client = {
  id: string;
  name: string;
  contact?: string | null;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
  status: string;
  notes?: string | null;
  projectCount: number;
};

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const blank = { name: "", contact: "", email: "", phone: "", website: "", status: "ACTIVE", notes: "" };

export default function ClientsManager({ initial, apiBase = "/api/admin/projects/clients" }: { initial: Client[]; apiBase?: string }) {
  const router = useRouter();
  const [clients, setClients] = useState<Client[]>(initial);
  const [editId, setEditId] = useState<string | null>(null);
  const [f, setF] = useState<Record<string, string>>(blank);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const up = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));
  const reset = () => {
    setEditId(null);
    setF(blank);
    setErr(null);
  };
  const edit = (c: Client) => {
    setEditId(c.id);
    setErr(null);
    setF({
      name: c.name,
      contact: c.contact || "",
      email: c.email || "",
      phone: c.phone || "",
      website: c.website || "",
      status: c.status,
      notes: c.notes || "",
    });
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!f.name.trim()) return;
    setBusy(true);
    setErr(null);
    const res = await fetch(editId ? `${apiBase}/${editId}` : apiBase, {
      method: editId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (res.ok) {
      const c = await res.json();
      setClients((s) => {
        const next = editId
          ? s.map((x) => (x.id === editId ? { ...x, ...c } : x))
          : [...s, { ...c, projectCount: 0 }];
        return next.sort((a, b) => a.name.localeCompare(b.name));
      });
      reset();
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setErr(d.error || "Couldn't save.");
    }
    setBusy(false);
  };

  const del = async (c: Client) => {
    if (!confirm(`Delete client “${c.name}”?`)) return;
    const res = await fetch(`${apiBase}/${c.id}`, { method: "DELETE" });
    if (res.ok) {
      setClients((s) => s.filter((x) => x.id !== c.id));
      if (editId === c.id) reset();
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      alert(d.error || "Delete failed.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {clients.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slatey">No clients yet. Add your first on the right.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
              <tr>
                <th className="px-5 py-3 font-semibold">Client</th>
                <th className="px-5 py-3 font-semibold">Contact</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Projects</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((c) => (
                <tr key={c.id} className={`hover:bg-slate-50 ${editId === c.id ? "bg-brand-50/40" : ""}`}>
                  <td className="px-5 py-3">
                    <div className="font-medium text-ink">{c.name}</div>
                    {c.website && <div className="text-xs text-slate-400">{c.website}</div>}
                  </td>
                  <td className="px-5 py-3 text-slatey">
                    {c.contact || "—"}
                    {c.email && <div className="text-xs text-slate-400">{c.email}</div>}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${CLIENT_STATUS_STYLE[c.status] || ""}`}>
                      {titleCase(c.status)}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-slatey">{c.projectCount}</td>
                  <td className="px-5 py-3 text-right">
                    <button onClick={() => edit(c)} className="rounded-lg p-1.5 text-slatey hover:bg-slate-100 hover:text-ink">
                      <Icon name="edit" className="h-4 w-4" />
                    </button>
                    <button onClick={() => del(c)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                      <Icon name="trash" className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <form onSubmit={submit} className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink">{editId ? "Edit client" : "Add client"}</h2>
        <div className="mt-4 space-y-3">
          <input value={f.name} onChange={(e) => up("name", e.target.value)} className={field} placeholder="Client / company name *" />
          <input value={f.contact} onChange={(e) => up("contact", e.target.value)} className={field} placeholder="Primary contact" />
          <input value={f.email} onChange={(e) => up("email", e.target.value)} className={field} placeholder="Email" type="email" />
          <input value={f.phone} onChange={(e) => up("phone", e.target.value)} className={field} placeholder="Phone" />
          <input value={f.website} onChange={(e) => up("website", e.target.value)} className={field} placeholder="Website" />
          <select value={f.status} onChange={(e) => up("status", e.target.value)} className={field}>
            {CLIENT_STATUSES.map((s) => (
              <option key={s} value={s}>{titleCase(s)}</option>
            ))}
          </select>
          <textarea value={f.notes} onChange={(e) => up("notes", e.target.value)} className={field} rows={2} placeholder="Notes" />
        </div>
        {err && <p className="mt-3 text-xs text-red-600">{err}</p>}
        <div className="mt-4 flex gap-2">
          <button type="submit" disabled={busy} className="btn-primary flex-1 disabled:opacity-70">
            <Icon name={editId ? "save" : "plus"} className="h-4 w-4" /> {editId ? "Save" : "Add"}
          </button>
          {editId && (
            <button type="button" onClick={reset} className="rounded-lg border border-slate-200 px-3 text-sm text-slatey hover:bg-slate-50">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
