"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import {
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  TASK_STATUS_STYLE,
  PRIORITY_STYLE,
  PROJECT_STATUS_STYLE,
  titleCase,
  hoursLabel,
  fmtDate,
} from "@/lib/projects";

type Project = { id: string; code: string; name: string; status: string; client: string; tasks: number };
type Task = { id: string; title: string; status: string; priority: string; project: string; projectId: string; dueDate: string | Date | null };
type Entry = { id: string; hours: number; date: string; project: string; note: string | null };

const field =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const dval = (d: unknown) => (d ? new Date(String(d)).toISOString().slice(0, 10) : "");

export default function PortalProjects({ projects, tasks: initialTasks, entries: initialEntries }: { projects: Project[]; tasks: Task[]; entries: Entry[] }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [entries, setEntries] = useState<Entry[]>(initialEntries);

  // log-time form
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [taskId, setTaskId] = useState("");
  const [date, setDate] = useState(dval(new Date().toISOString()));
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  const moveTask = async (id: string, status: string) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, status } : t)));
    await fetch(`/api/portal/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  };

  const log = async () => {
    if (!projectId || !(Number(hours) > 0)) return;
    setMsg(null);
    const res = await fetch("/api/portal/time", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, taskId: taskId || null, date, hours: Number(hours), note }),
    });
    if (res.ok) {
      const e = await res.json();
      setEntries((s) => [{ id: e.id, hours: e.hours, date: String(e.date), project: e.project?.name || "", note: e.note }, ...s].slice(0, 15));
      setHours("");
      setNote("");
      setMsg("Time logged ✓");
    } else {
      setMsg((await res.json().catch(() => ({}))).error || "Couldn't log time.");
    }
  };

  const tasksForProject = tasks.filter((t) => t.projectId === projectId);

  if (projects.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slatey">
        You&apos;re not on any projects yet. Your project lead will add you to one.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      {/* Projects */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">Projects you&apos;re on</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <div key={p.id} className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">{p.code}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${PROJECT_STATUS_STYLE[p.status] || ""}`}>{titleCase(p.status)}</span>
              </div>
              <h3 className="mt-2 font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-slatey">{p.client} · {p.tasks} tasks</p>
            </div>
          ))}
        </div>
      </section>

      {/* My tasks */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">My open tasks</h2>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {tasks.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slatey">Nothing assigned to you right now. 🎉</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {tasks.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ink">{t.title}</p>
                    <p className="text-xs text-slate-400">
                      {t.project}
                      {t.dueDate ? ` · due ${fmtDate(t.dueDate)}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${PRIORITY_STYLE[t.priority] || ""}`}>{titleCase(t.priority)}</span>
                    <select
                      value={t.status}
                      onChange={(e) => moveTask(t.id, e.target.value)}
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${TASK_STATUS_STYLE[t.status] || ""}`}
                    >
                      {TASK_STATUSES.map((s) => <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>)}
                    </select>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* Log time */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">Log time</h2>
        <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <div>
            <span className="mb-1 block text-[11px] text-slate-400">Project</span>
            <select value={projectId} onChange={(e) => { setProjectId(e.target.value); setTaskId(""); }} className={`${field} w-48`}>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <span className="mb-1 block text-[11px] text-slate-400">Task (optional)</span>
            <select value={taskId} onChange={(e) => setTaskId(e.target.value)} className={`${field} w-48`}>
              <option value="">— None —</option>
              {tasksForProject.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
          <div>
            <span className="mb-1 block text-[11px] text-slate-400">Date</span>
            <input value={date} onChange={(e) => setDate(e.target.value)} className={`${field} w-40`} type="date" />
          </div>
          <div>
            <span className="mb-1 block text-[11px] text-slate-400">Hours</span>
            <input value={hours} onChange={(e) => setHours(e.target.value)} className={`${field} w-24`} type="number" step="0.5" placeholder="0" />
          </div>
          <input value={note} onChange={(e) => setNote(e.target.value)} className={`${field} flex-1 min-w-[140px]`} placeholder="What did you work on?" />
          <button onClick={log} className="btn-primary"><Icon name="plus" className="h-4 w-4" /> Log</button>
        </div>
        {msg && <p className="mt-2 text-xs text-slatey">{msg}</p>}

        {entries.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <ul className="divide-y divide-slate-100">
              {entries.map((e) => (
                <li key={e.id} className="flex items-center justify-between px-5 py-2.5 text-sm">
                  <span className="text-ink"><b>{hoursLabel(e.hours)}</b> · {e.project}</span>
                  <span className="text-xs text-slate-400">{fmtDate(e.date)} · {e.note || "—"}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
