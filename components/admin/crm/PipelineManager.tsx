"use client";

import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import { useModalA11y } from "@/components/admin/useModalA11y";
import { STAGE_COLOR_TOKENS, stageColor } from "@/lib/crm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
type Stage = { id?: string; name: string; kind: string; color: string; probability: number };

const NEW_STAGES: Stage[] = [
  { name: "New", kind: "OPEN", color: "slate", probability: 10 },
  { name: "Qualified", kind: "OPEN", color: "blue", probability: 30 },
  { name: "Won", kind: "WON", color: "green", probability: 100 },
  { name: "Lost", kind: "LOST", color: "red", probability: 0 },
];
const KINDS = [
  { value: "OPEN", label: "Open" },
  { value: "WON", label: "Won" },
  { value: "LOST", label: "Lost" },
];
const field = "w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function PipelineManager({
  pipeline,
  canDelete,
  onSaved,
  onDeleted,
  onClose,
}: {
  pipeline: Any | null;
  canDelete: boolean;
  onSaved: (p: Any) => void;
  onDeleted: (id: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(pipeline?.name || "");
  const [isDefault, setIsDefault] = useState(Boolean(pipeline?.isDefault));
  const [stages, setStages] = useState<Stage[]>(
    pipeline?.stages?.length
      ? pipeline.stages.map((s: Any) => ({ id: s.id, name: s.name, kind: s.kind, color: s.color, probability: s.probability }))
      : NEW_STAGES
  );
  const [busy, setBusy] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  useModalA11y(panelRef, onClose);

  const upd = (i: number, patch: Partial<Stage>) => setStages((s) => s.map((x, j) => (j === i ? { ...x, ...patch } : x)));
  const remove = (i: number) => {
    // A persisted stage may hold deals (the API blocks its deletion) — confirm first.
    if (stages[i]?.id && !confirm("Remove this stage? Any deals in it must be reassigned before you can save.")) return;
    setStages((s) => s.filter((_, j) => j !== i));
  };
  const addStage = () => setStages((s) => [...s, { name: `Stage ${s.length + 1}`, kind: "OPEN", color: "slate", probability: 50 }]);
  const swap = (i: number, j: number) => {
    if (j < 0 || j >= stages.length) return;
    setStages((s) => {
      const next = [...s];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const save = async () => {
    if (!name.trim()) return toast("Pipeline name is required", "err");
    if (stages.length === 0) return toast("Add at least one stage", "err");
    setBusy(true);
    const body = { name: name.trim(), isDefault, stages };
    const res = await fetch(pipeline ? `/api/admin/crm/pipelines/${pipeline.id}` : "/api/admin/crm/pipelines", {
      method: pipeline ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);
    setBusy(false);
    if (res && res.ok) {
      onSaved(await res.json());
      toast(pipeline ? "Pipeline updated" : "Pipeline created");
    } else toast((res && (await res.json().catch(() => ({})))?.error) || "Couldn't save", "err");
  };

  const del = async () => {
    if (!pipeline || !confirm(`Delete the “${pipeline.name}” pipeline?`)) return;
    setBusy(true);
    const res = await fetch(`/api/admin/crm/pipelines/${pipeline.id}`, { method: "DELETE" }).catch(() => null);
    setBusy(false);
    if (res && res.ok) {
      onDeleted(pipeline.id);
      toast("Pipeline deleted");
    } else toast((res && (await res.json().catch(() => ({})))?.error) || "Couldn't delete", "err");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[8vh]">
      <div className="absolute inset-0 bg-slate-900/25" onClick={onClose} />
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label={pipeline ? "Edit pipeline" : "New pipeline"} className="relative flex max-h-[84vh] w-full max-w-xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">{pipeline ? "Edit pipeline" : "New pipeline"}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-slatey hover:bg-slate-100"><Icon name="x" className="h-4 w-4" /></button>
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
          <div className="flex flex-wrap items-end gap-4">
            <div className="min-w-[200px] flex-1">
              <label className="mb-1 block text-xs font-medium text-slatey">Pipeline name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className={field} placeholder="e.g. New business" />
            </div>
            <label className="flex items-center gap-2 pb-1.5 text-sm text-slatey">
              <input type="checkbox" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
              Default for new deals
            </label>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">Stages</label>
              <span className="text-[11px] text-slate-500">order = board columns, left → right</span>
            </div>
            <div className="space-y-2">
              {stages.map((s, i) => (
                <div key={s.id || i} className="rounded-xl border border-slate-200 bg-slate-50/60 p-2.5">
                  <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                      <button type="button" onClick={() => swap(i, i - 1)} disabled={i === 0} aria-label="Move stage up" className="p-0.5 text-slate-400 hover:text-brand-600 disabled:opacity-30"><Icon name="arrow" className="h-3.5 w-3.5 -rotate-90" /></button>
                      <button type="button" onClick={() => swap(i, i + 1)} disabled={i === stages.length - 1} aria-label="Move stage down" className="p-0.5 text-slate-400 hover:text-brand-600 disabled:opacity-30"><Icon name="arrow" className="h-3.5 w-3.5 rotate-90" /></button>
                    </div>
                    <input value={s.name} onChange={(e) => upd(i, { name: e.target.value })} className={`${field} flex-1`} placeholder="Stage name" />
                    <select value={s.kind} onChange={(e) => upd(i, { kind: e.target.value })} className={`${field} w-24`} title="Counts as">
                      {KINDS.map((k) => <option key={k.value} value={k.value}>{k.label}</option>)}
                    </select>
                    <div className="flex items-center gap-1" title="Default win probability">
                      <input type="number" min={0} max={100} value={s.probability} onChange={(e) => upd(i, { probability: Math.max(0, Math.min(100, parseInt(e.target.value) || 0)) })} className={`${field} w-16`} />
                      <span className="text-xs text-slate-500">%</span>
                    </div>
                    <button type="button" onClick={() => remove(i)} aria-label="Remove stage" className="rounded-lg p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-500" title="Remove stage"><Icon name="trash" className="h-4 w-4" /></button>
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 pl-7">
                    {STAGE_COLOR_TOKENS.map((tok) => (
                      <button
                        key={tok}
                        type="button"
                        onClick={() => upd(i, { color: tok })}
                        title={tok}
                        aria-label={`Colour: ${tok}`}
                        aria-pressed={s.color === tok}
                        className={`grid h-6 w-6 place-items-center rounded-full ${s.color === tok ? "ring-2 ring-slate-400 ring-offset-1" : ""}`}
                      >
                        <span className={`h-3.5 w-3.5 rounded-full ${stageColor(tok).dot}`} />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addStage} className="mt-2 flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm font-medium text-brand-700 hover:bg-brand-50">
              <Icon name="plus" className="h-4 w-4" /> Add stage
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          {pipeline && canDelete ? (
            <button onClick={del} disabled={busy} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slatey hover:bg-red-50 hover:text-red-600 disabled:opacity-60">
              <Icon name="trash" className="mr-1 inline h-4 w-4" /> Delete
            </button>
          ) : <span />}
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slatey hover:bg-slate-50">Cancel</button>
            <button onClick={save} disabled={busy} className="btn-primary disabled:opacity-70"><Icon name="save" className="h-4 w-4" /> {busy ? "Saving…" : "Save"}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
