"use client";

import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import {
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  TASK_PRIORITIES,
  TASK_TYPES,
  titleCase,
} from "@/lib/projects";

type Opt = { id: string; label: string };
export type DrawerTask = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  priority: string;
  type: string;
  assigneeId?: string | null;
  sprintId?: string | null;
  estimateHours: number;
  dueDate?: string | Date | null;
};

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const lbl = "mb-1 block text-xs font-medium text-slatey";
const dval = (d: unknown) => (d ? new Date(String(d)).toISOString().slice(0, 10) : "");

export default function TaskDrawer({
  task,
  members,
  sprints,
  onSaved,
  onDeleted,
  onClose,
}: {
  task: DrawerTask;
  members: Opt[];
  sprints: Opt[];
  onSaved: (t: DrawerTask) => void;
  onDeleted: (id: string) => void;
  onClose: () => void;
}) {
  const [f, setF] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    type: task.type,
    assigneeId: task.assigneeId || "",
    sprintId: task.sprintId || "",
    estimateHours: String(task.estimateHours || 0),
    dueDate: dval(task.dueDate),
  });
  const [busy, setBusy] = useState(false);
  const up = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [onClose]);

  const save = async () => {
    if (!f.title.trim()) return toast("Title can't be empty", "err");
    setBusy(true);
    const res = await fetch(`/api/admin/projects/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: f.title,
        description: f.description,
        status: f.status,
        priority: f.priority,
        type: f.type,
        assigneeId: f.assigneeId || null,
        sprintId: f.sprintId || null,
        estimateHours: Number(f.estimateHours) || 0,
        dueDate: f.dueDate || null,
      }),
    });
    setBusy(false);
    if (res.ok) {
      const updated = await res.json();
      onSaved({ ...task, ...f, estimateHours: Number(f.estimateHours) || 0, assigneeId: f.assigneeId || null, sprintId: f.sprintId || null, dueDate: f.dueDate || null, ...updated });
      toast("Task saved");
      onClose();
    } else toast("Couldn't save the task", "err");
  };

  const del = async () => {
    if (!confirm("Delete this task?")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/projects/tasks/${task.id}`, { method: "DELETE" });
    setBusy(false);
    if (res.ok) {
      onDeleted(task.id);
      toast("Task deleted");
      onClose();
    } else toast("Delete failed", "err");
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/20" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h2 className="text-sm font-semibold text-ink">Task details</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slatey hover:bg-slate-100">
            <Icon name="x" className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
          <div>
            <label className={lbl}>Title</label>
            <input value={f.title} onChange={(e) => up("title", e.target.value)} className={field} />
          </div>
          <div>
            <label className={lbl}>Description</label>
            <textarea value={f.description} onChange={(e) => up("description", e.target.value)} className={field} rows={4} placeholder="Details, acceptance criteria…" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={lbl}>Status</label>
              <select value={f.status} onChange={(e) => up("status", e.target.value)} className={field}>
                {TASK_STATUSES.map((s) => <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Priority</label>
              <select value={f.priority} onChange={(e) => up("priority", e.target.value)} className={field}>
                {TASK_PRIORITIES.map((p) => <option key={p} value={p}>{titleCase(p)}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Type</label>
              <select value={f.type} onChange={(e) => up("type", e.target.value)} className={field}>
                {TASK_TYPES.map((t) => <option key={t} value={t}>{titleCase(t)}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Estimate (hrs)</label>
              <input value={f.estimateHours} onChange={(e) => up("estimateHours", e.target.value)} type="number" step="0.5" className={field} />
            </div>
            <div>
              <label className={lbl}>Assignee</label>
              <select value={f.assigneeId} onChange={(e) => up("assigneeId", e.target.value)} className={field}>
                <option value="">Unassigned</option>
                {members.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
              </select>
            </div>
            <div>
              <label className={lbl}>Sprint</label>
              <select value={f.sprintId} onChange={(e) => up("sprintId", e.target.value)} className={field}>
                <option value="">Backlog</option>
                {sprints.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className="col-span-2">
              <label className={lbl}>Due date</label>
              <input value={f.dueDate} onChange={(e) => up("dueDate", e.target.value)} type="date" className={field} />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4">
          <button onClick={del} disabled={busy} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slatey hover:bg-red-50 hover:text-red-600 disabled:opacity-60">
            <Icon name="trash" className="mr-1 inline h-4 w-4" /> Delete
          </button>
          <button onClick={save} disabled={busy} className="btn-primary disabled:opacity-70">
            <Icon name="save" className="h-4 w-4" /> {busy ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
