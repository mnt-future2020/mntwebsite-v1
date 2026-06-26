"use client";

import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";

type Doc = { id: string; type: string; name: string };
const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function EmployeeDocs({ employeeId, initial }: { employeeId: string; initial: Doc[] }) {
  const [docs, setDocs] = useState<Doc[]>(initial);
  const [type, setType] = useState("Offer Letter");
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast("Choose a file to upload", "err");
      return;
    }
    setBusy(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("employeeId", employeeId);
    fd.append("type", type);
    fd.append("name", name || file.name);
    const res = await fetch("/api/admin/hr/documents/upload", { method: "POST", body: fd }).catch(() => null);
    setBusy(false);
    if (res && res.ok) {
      const created = await res.json();
      setDocs((s) => [created, ...s]);
      setName("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      toast("Document uploaded");
    } else {
      const msg = res ? (await res.json().catch(() => ({}))).error : null;
      toast(msg || "Upload failed", "err");
    }
  };

  const del = async (id: string) => {
    if (!confirm("Remove this document?")) return;
    const prev = docs;
    setDocs((s) => s.filter((d) => d.id !== id));
    const res = await fetch(`/api/admin/hr/documents/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) {
      setDocs(prev);
      toast("Couldn't remove document", "err");
    }
  };

  return (
    <div>
      <div className="divide-y divide-slate-100">
        {docs.length === 0 ? (
          <p className="py-4 text-sm text-slatey">No documents yet.</p>
        ) : (
          docs.map((d) => (
            <div key={d.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <a
                href={`/api/admin/hr/documents/${d.id}/file`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-700 hover:underline"
              >
                <Icon name="records" className="h-4 w-4" /> {d.name}
                <span className="text-xs text-slate-400">· {d.type}</span>
              </a>
              <button type="button" onClick={() => del(d.id)} className="rounded-lg p-1.5 text-slatey hover:bg-red-50 hover:text-red-600">
                <Icon name="trash" className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
      <form onSubmit={add} className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-[1fr_1.2fr_1.4fr_auto]">
        <input value={type} onChange={(e) => setType(e.target.value)} className={field} placeholder="Type" />
        <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="Document name (optional)" />
        <input
          ref={fileRef}
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="rounded-lg border border-slate-200 bg-white text-sm text-slatey file:mr-3 file:border-0 file:bg-brand-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-brand-700"
        />
        <button type="submit" disabled={busy} className="btn-ghost shrink-0 disabled:opacity-70">
          {busy ? <span className="text-xs">Uploading…</span> : <Icon name="plus" className="h-4 w-4" />}
        </button>
      </form>
    </div>
  );
}
