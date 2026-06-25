"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import TaskDrawer, { DrawerTask } from "@/components/admin/projects/TaskDrawer";
import BulkTaskModal from "@/components/admin/projects/BulkTaskModal";
import {
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  TASK_PRIORITIES,
  PRIORITY_STYLE,
  titleCase,
  fmtDate,
} from "@/lib/projects";

export type BoardTask = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  priority: string;
  type: string;
  estimateHours: number;
  assigneeId?: string | null;
  sprintId?: string | null;
  dueDate?: string | Date | null;
  assignee?: { id: string; firstName: string; lastName?: string | null } | null;
};
type Opt = { id: string; label: string };

const initials = (label: string) =>
  label.split(" ").map((w) => w[0]).filter(Boolean).slice(0, 2).join("").toUpperCase();

const isOverdue = (t: BoardTask) =>
  t.dueDate && t.status !== "DONE" && new Date(t.dueDate) < new Date(new Date().toDateString());

export default function KanbanBoard({
  projectId,
  initial,
  members,
  sprints,
}: {
  projectId: string;
  initial: BoardTask[];
  members: Opt[];
  sprints: Opt[];
}) {
  const [tasks, setTasks] = useState<BoardTask[]>(initial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [over, setOver] = useState<string | null>(null);
  const [adding, setAdding] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);
  const [bulkOpen, setBulkOpen] = useState(false);

  // filters
  const [q, setQ] = useState("");
  const [fAssignee, setFAssignee] = useState("");
  const [fPriority, setFPriority] = useState("");
  const [fSprint, setFSprint] = useState("");

  const nameOf = (id?: string | null) => members.find((m) => m.id === id)?.label || "";

  const filtered = useMemo(
    () =>
      tasks.filter(
        (t) =>
          (!q || t.title.toLowerCase().includes(q.toLowerCase())) &&
          (!fAssignee || (fAssignee === "none" ? !t.assigneeId : t.assigneeId === fAssignee)) &&
          (!fPriority || t.priority === fPriority) &&
          (!fSprint || (fSprint === "backlog" ? !t.sprintId : t.sprintId === fSprint))
      ),
    [tasks, q, fAssignee, fPriority, fSprint]
  );

  const move = async (id: string, status: string) => {
    const task = tasks.find((t) => t.id === id);
    if (!task || task.status === status) return;
    const prev = task.status;
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, status } : t)));
    const res = await fetch(`/api/admin/projects/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (res.ok) toast(`Moved to ${TASK_STATUS_LABELS[status]}`);
    else {
      // Roll back the optimistic move so the board doesn't lie about persisted state.
      setTasks((s) => s.map((t) => (t.id === id ? { ...t, status: prev } : t)));
      toast("Couldn't move task", "err");
    }
  };

  const add = async (status: string) => {
    const title = newTitle.trim();
    if (!title) return;
    const res = await fetch("/api/admin/projects/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, title, status }),
    });
    if (res.ok) {
      const t = await res.json();
      setTasks((s) => [...s, t]);
      setNewTitle("");
      setAdding(null);
      toast("Task added");
    } else toast("Couldn't add task", "err");
  };

  const onSaved = (u: DrawerTask) =>
    setTasks((s) => s.map((t) => (t.id === u.id ? { ...t, ...u, assignee: members.find((m) => m.id === u.assigneeId) ? { id: u.assigneeId!, firstName: nameOf(u.assigneeId) } : null } : t)));
  const onDeleted = (id: string) => setTasks((s) => s.filter((t) => t.id !== id));

  const openTask = tasks.find((t) => t.id === openId) || null;
  const activeFilters = q || fAssignee || fPriority || fSprint;

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tasks…"
            className="w-48 rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-sm focus:border-brand focus:outline-none"
          />
        </div>
        <select value={fAssignee} onChange={(e) => setFAssignee(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slatey focus:border-brand focus:outline-none">
          <option value="">All assignees</option>
          <option value="none">Unassigned</option>
          {members.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
        <select value={fPriority} onChange={(e) => setFPriority(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slatey focus:border-brand focus:outline-none">
          <option value="">All priorities</option>
          {TASK_PRIORITIES.map((p) => <option key={p} value={p}>{titleCase(p)}</option>)}
        </select>
        {sprints.length > 0 && (
          <select value={fSprint} onChange={(e) => setFSprint(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slatey focus:border-brand focus:outline-none">
            <option value="">All sprints</option>
            <option value="backlog">Backlog</option>
            {sprints.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
          </select>
        )}
        {activeFilters && (
          <button onClick={() => { setQ(""); setFAssignee(""); setFPriority(""); setFSprint(""); }} className="text-xs font-medium text-brand-700 hover:underline">
            Clear
          </button>
        )}
        <button onClick={() => setBulkOpen(true)} className="ml-auto rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slatey hover:bg-slate-50">
          <Icon name="download" className="mr-1 inline h-3.5 w-3.5 rotate-180" /> Bulk add
        </button>
        <span className="text-xs text-slate-400">{filtered.length} of {tasks.length} tasks</span>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5">
        {TASK_STATUSES.map((col) => {
          const colTasks = filtered.filter((t) => t.status === col);
          return (
            <div
              key={col}
              onDragOver={(e) => { e.preventDefault(); setOver(col); }}
              onDragLeave={() => setOver((o) => (o === col ? null : o))}
              onDrop={() => { if (dragId) move(dragId, col); setDragId(null); setOver(null); }}
              className={`flex min-h-[140px] flex-col rounded-2xl border p-2.5 transition-colors ${
                over === col ? "border-brand bg-brand-50/40" : "border-slate-200 bg-slate-50/60"
              }`}
            >
              <div className="flex items-center justify-between px-1 pb-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slatey">{TASK_STATUS_LABELS[col]}</span>
                <span className="rounded-full bg-white px-1.5 text-[11px] text-slate-400">{colTasks.length}</span>
              </div>

              <div className="flex flex-1 flex-col gap-2">
                {colTasks.map((t) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={() => setDragId(t.id)}
                    onDragEnd={() => setDragId(null)}
                    onClick={() => setOpenId(t.id)}
                    className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <p className="text-sm font-medium text-ink">{t.title}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${PRIORITY_STYLE[t.priority] || ""}`}>{titleCase(t.priority)}</span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slatey">{titleCase(t.type)}</span>
                      {t.estimateHours > 0 && <span className="text-[10px] text-slate-400">{t.estimateHours}h</span>}
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      {t.dueDate ? (
                        <span className={`text-[10px] font-medium ${isOverdue(t) ? "text-red-600" : "text-slate-400"}`}>
                          {isOverdue(t) ? "⚠ " : ""}{fmtDate(t.dueDate)}
                        </span>
                      ) : <span />}
                      {t.assigneeId && (
                        <span
                          title={nameOf(t.assigneeId)}
                          className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-50 text-[9px] font-bold text-brand-700"
                        >
                          {initials(nameOf(t.assigneeId))}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {adding === col ? (
                <input
                  autoFocus
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") add(col);
                    if (e.key === "Escape") { setAdding(null); setNewTitle(""); }
                  }}
                  onBlur={() => (newTitle.trim() ? add(col) : setAdding(null))}
                  placeholder="Task title…"
                  className="mt-2 w-full rounded-lg border border-slate-200 px-2 py-1.5 text-sm focus:border-brand focus:outline-none"
                />
              ) : (
                <button
                  onClick={() => { setAdding(col); setNewTitle(""); }}
                  className="mt-2 flex items-center gap-1 rounded-lg px-1.5 py-1 text-xs font-medium text-slate-400 hover:text-brand-700"
                >
                  <Icon name="plus" className="h-3.5 w-3.5" /> Add
                </button>
              )}
            </div>
          );
        })}
      </div>

      {openTask && (
        <TaskDrawer
          task={openTask}
          members={members}
          sprints={sprints}
          onSaved={onSaved}
          onDeleted={onDeleted}
          onClose={() => setOpenId(null)}
        />
      )}

      {bulkOpen && (
        <BulkTaskModal
          projectId={projectId}
          onImported={(ts) => setTasks((s) => [...s, ...ts])}
          onClose={() => setBulkOpen(false)}
        />
      )}
    </div>
  );
}
