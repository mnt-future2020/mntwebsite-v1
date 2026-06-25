"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

type Dept = { id: string; name: string; head?: string | null; _count?: { employees: number } };

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function DepartmentManager({ initial }: { initial: Dept[] }) {
  const [depts, setDepts] = useState<Dept[]>(initial);
  const [name, setName] = useState("");
  const [head, setHead] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editHead, setEditHead] = useState("");

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true);
    setErr(null);
    const res = await fetch("/api/admin/hr/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, head }),
    });
    if (res.ok) {
      const d = await res.json();
      setDepts((s) => [...s, { ...d, _count: { employees: 0 } }].sort((a, b) => a.name.localeCompare(b.name)));
      setName("");
      setHead("");
    } else {
      const d = await res.json().catch(() => ({}));
      setErr(d.error || "Couldn't add.");
    }
    setBusy(false);
  };

  const del = async (id: string) => {
    if (!confirm("Delete this department?")) return;
    const res = await fetch(`/api/admin/hr/departments/${id}`, { method: "DELETE" });
    if (res.ok) setDepts((s) => s.filter((d) => d.id !== id));
    else {
      const d = await res.json().catch(() => ({}));
      alert(d.error || "Delete failed.");
    }
  };

  const startEdit = (d: Dept) => {
    setEditId(d.id);
    setEditName(d.name);
    setEditHead(d.head || "");
  };
  const saveEdit = async () => {
    if (!editId || !editName.trim()) return;
    const res = await fetch(`/api/admin/hr/departments/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: editName, head: editHead }),
    });
    if (res.ok) {
      const d = await res.json();
      setDepts((s) =>
        s.map((x) => (x.id === editId ? { ...x, name: d.name, head: d.head } : x)).sort((a, b) => a.name.localeCompare(b.name))
      );
      setEditId(null);
    } else {
      const d = await res.json().catch(() => ({}));
      alert(d.error || "Update failed.");
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        {depts.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slatey">No departments yet. Add your first on the right.</p>
        ) : (
          <table className="w-full min-w-[480px] text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
              <tr>
                <th className="px-5 py-3 font-semibold">Department</th>
                <th className="px-5 py-3 font-semibold">Head</th>
                <th className="px-5 py-3 font-semibold">People</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {depts.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50">
                  {editId === d.id ? (
                    <>
                      <td className="px-5 py-2"><input value={editName} onChange={(e) => setEditName(e.target.value)} className={field} autoFocus /></td>
                      <td className="px-5 py-2"><input value={editHead} onChange={(e) => setEditHead(e.target.value)} className={field} placeholder="Head (optional)" /></td>
                      <td className="px-5 py-3 text-slatey">{d._count?.employees ?? 0}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={saveEdit} title="Save" className="rounded-lg p-1.5 text-green-600 hover:bg-green-50"><Icon name="check" className="h-4 w-4" /></button>
                          <button onClick={() => setEditId(null)} title="Cancel" className="rounded-lg p-1.5 text-slatey hover:bg-slate-100"><Icon name="x" className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-3 font-medium text-ink">{d.name}</td>
                      <td className="px-5 py-3 text-slatey">{d.head || "—"}</td>
                      <td className="px-5 py-3 text-slatey">{d._count?.employees ?? 0}</td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => startEdit(d)} title="Edit" className="rounded-lg p-1.5 text-slatey hover:bg-brand-50 hover:text-brand-700"><Icon name="edit" className="h-4 w-4" /></button>
                          <button onClick={() => del(d.id)} title="Delete" className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600"><Icon name="trash" className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <form onSubmit={add} className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-ink">Add department</h2>
        <div className="mt-4 space-y-3">
          <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="e.g. Development" />
          <input value={head} onChange={(e) => setHead(e.target.value)} className={field} placeholder="Department head (optional)" />
        </div>
        {err && <p className="mt-3 text-xs text-red-600">{err}</p>}
        <button type="submit" disabled={busy} className="btn-primary mt-4 w-full disabled:opacity-70">
          <Icon name="plus" className="h-4 w-4" /> Add
        </button>
      </form>
    </div>
  );
}
