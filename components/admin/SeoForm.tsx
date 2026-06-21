"use client";

import { useState } from "react";
import Icon from "@/components/Icon";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

type Override = { title?: string | null; description?: string | null; ogImage?: string | null; noindex?: boolean };

function Row({ path, label, initial }: { path: string; label: string; initial: Override }) {
  const [f, setF] = useState({
    title: initial.title ?? "",
    description: initial.description ?? "",
    ogImage: initial.ogImage ?? "",
    noindex: initial.noindex ?? false,
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const up = (k: string, v: unknown) => { setF((s) => ({ ...s, [k]: v })); setSaved(false); };

  const save = async () => {
    setSaving(true);
    await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, ...f }),
    });
    setSaving(false);
    setSaved(true);
  };

  return (
    <details className="rounded-2xl border border-slate-200 bg-white">
      <summary className="flex cursor-pointer items-center justify-between px-5 py-4">
        <span>
          <span className="text-sm font-semibold text-ink">{label}</span>
          <span className="ml-2 text-xs text-slate-400">{path}</span>
        </span>
        {f.noindex && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">noindex</span>}
      </summary>
      <div className="space-y-3 border-t border-slate-100 px-5 py-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-slatey">Title override</label>
          <input value={f.title} onChange={(e) => up("title", e.target.value)} className={field} placeholder="Leave blank to keep the page default" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slatey">Meta description override</label>
          <textarea rows={2} value={f.description} onChange={(e) => up("description", e.target.value)} className={`${field} resize-none`} maxLength={170} placeholder="≤ 155 chars" />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-slatey">OG image override</label>
          <input value={f.ogImage} onChange={(e) => up("ogImage", e.target.value)} className={field} />
        </div>
        <label className="flex items-center gap-2 text-sm text-ink">
          <input type="checkbox" checked={f.noindex} onChange={(e) => up("noindex", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
          Hide this page from search engines
        </label>
        <div className="flex items-center gap-3 pt-1">
          <button onClick={save} disabled={saving} className="btn-primary disabled:opacity-70">
            <Icon name="save" className="h-4 w-4" /> {saving ? "Saving…" : "Save"}
          </button>
          {saved && <span className="text-sm font-medium text-green-600">Saved ✓</span>}
        </div>
      </div>
    </details>
  );
}

export default function SeoForm({
  paths,
  overrides,
}: {
  paths: { path: string; label: string }[];
  overrides: Record<string, Override>;
}) {
  return (
    <div className="space-y-3">
      {paths.map((p) => (
        <Row key={p.path} path={p.path} label={p.label} initial={overrides[p.path] || {}} />
      ))}
    </div>
  );
}
