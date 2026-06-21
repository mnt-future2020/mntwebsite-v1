"use client";

import { useMemo, useRef, useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import { TASK_STATUSES, TASK_STATUS_LABELS } from "@/lib/projects";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

const EXAMPLE = `title,priority,type,status,estimate,assignee,due
Set up CI/CD pipeline,HIGH,CHORE,TODO,8,priya.pm@mnt.local,2026-07-10
Design booking schema,MEDIUM,FEATURE,IN_PROGRESS,5,,2026-07-05
Fix login redirect bug,URGENT,BUG,TODO,2,,
Research video SDK,LOW,RESEARCH,BACKLOG,3,,`;

export default function BulkTaskModal({
  projectId,
  onImported,
  onClose,
}: {
  projectId: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onImported: (tasks: any[]) => void;
  onClose: () => void;
}) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState("TODO");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const lineCount = useMemo(() => {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return 0;
    const hasHeader = lines[0].toLowerCase().split(",").map((s) => s.trim()).includes("title");
    return hasHeader ? Math.max(0, lines.length - 1) : lines.length;
  }, [text]);

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setText(String(reader.result || ""));
    reader.readAsText(file);
  };

  const submit = async () => {
    if (lineCount === 0) return toast("Paste some tasks first", "err");
    setBusy(true);
    const res = await fetch("/api/admin/projects/tasks/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, text, defaultStatus: status }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      onImported(data.created || []);
      toast(`Imported ${data.count} task${data.count === 1 ? "" : "s"}${data.skipped ? ` (${data.skipped} skipped)` : ""}`);
      onClose();
    } else {
      toast(data.error || "Import failed", "err");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/30" onClick={onClose} />
      <div className="relative flex max-h-[88vh] w-full max-w-2xl flex-col rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">Bulk add tasks</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slatey hover:bg-slate-100"><Icon name="x" className="h-4 w-4" /></button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <p className="text-sm text-slatey">
            Paste <b>one task per line</b> (just titles), or a <b>CSV with a header row</b> for richer detail.
            CSV columns: <code className="rounded bg-slate-100 px-1 text-xs">title, description, priority, type, status, estimate, assignee, due</code>.
            Assignee can be an employee email or full name.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button onClick={() => setText(EXAMPLE)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slatey hover:bg-slate-50">
              Load example
            </button>
            <button onClick={() => fileRef.current?.click()} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slatey hover:bg-slate-50">
              <Icon name="download" className="mr-1 inline h-3.5 w-3.5 rotate-180" /> Upload .csv
            </button>
            <input ref={fileRef} type="file" accept=".csv,text/csv,text/plain" onChange={onFile} className="hidden" />
            <span className="ml-auto text-xs text-slate-400">{lineCount} task{lineCount === 1 ? "" : "s"} detected</span>
          </div>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            spellCheck={false}
            placeholder={"Build appointment API\nWire up payments\nWrite e2e tests\n\n— or —\n\ntitle,priority,assignee\nFix bug,HIGH,priya.pm@mnt.local"}
            className={`${field} font-mono text-xs leading-relaxed`}
          />

          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-slatey">Default column (for rows without a status):</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slatey focus:border-brand focus:outline-none">
              {TASK_STATUSES.map((s) => <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>)}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-slate-200 px-5 py-4">
          <button onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slatey hover:bg-slate-50">Cancel</button>
          <button onClick={submit} disabled={busy || lineCount === 0} className="btn-primary disabled:opacity-60">
            <Icon name="plus" className="h-4 w-4" /> {busy ? "Importing…" : `Import ${lineCount || ""} task${lineCount === 1 ? "" : "s"}`}
          </button>
        </div>
      </div>
    </div>
  );
}
