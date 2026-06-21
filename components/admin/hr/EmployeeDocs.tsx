"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

type Doc = { id: string; type: string; name: string; url: string };
const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function EmployeeDocs({ employeeId, initial }: { employeeId: string; initial: Doc[] }) {
  const [docs, setDocs] = useState<Doc[]>(initial);
  const [type, setType] = useState("Offer Letter");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !url) return;
    setBusy(true);
    const res = await fetch("/api/admin/hr/documents", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ employeeId, type, name, url }),
    });
    if (res.ok) {
      const created = await res.json();
      setDocs((s) => [...s, created]);
      setName("");
      setUrl("");
    }
    setBusy(false);
  };

  const del = async (id: string) => {
    setDocs((s) => s.filter((d) => d.id !== id));
    await fetch(`/api/admin/hr/documents/${id}`, { method: "DELETE" });
  };

  return (
    <div>
      <div className="divide-y divide-slate-100">
        {docs.length === 0 ? (
          <p className="py-4 text-sm text-slatey">No documents yet.</p>
        ) : (
          docs.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <a href={d.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-brand-700 hover:underline">
                <Icon name="records" className="h-4 w-4" /> {d.name}
                <span className="text-xs text-slate-400">· {d.type}</span>
              </a>
              <button onClick={() => del(d.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                <Icon name="trash" className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
      <form onSubmit={add} className="mt-4 grid gap-2 sm:grid-cols-[1fr_1.2fr_1.4fr_auto]">
        <input value={type} onChange={(e) => setType(e.target.value)} className={field} placeholder="Type" />
        <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Document name" />
        <input value={url} onChange={(e) => setUrl(e.target.value)} className={field} placeholder="URL" />
        <button type="submit" disabled={busy} className="btn-ghost shrink-0 disabled:opacity-70">
          <Icon name="plus" className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
