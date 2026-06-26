"use client";

import { useEffect, useState } from "react";
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
type ActiveTimer = { id: string; startedAt: string; projectId: string; taskId: string | null; project: string; task: string | null; note: string | null };

const field =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const istToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date()); // YYYY-MM-DD in IST
const hms = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return [h, m, s % 60].map((n) => String(n).padStart(2, "0")).join(":");
};
const clock = (iso: string) => new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

export default function PortalProjects({ projects, tasks: initialTasks, entries: initialEntries, active: initialActive = null }: { projects: Project[]; tasks: Task[]; entries: Entry[]; active?: ActiveTimer | null }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [entries, setEntries] = useState<Entry[]>(initialEntries);

  // timer
  const [active, setActive] = useState<ActiveTimer | null>(initialActive);
  const [elapsed, setElapsed] = useState(0);
  const [tProjectId, setTProjectId] = useState(initialActive?.projectId || projects[0]?.id || "");
  const [tTaskId, setTTaskId] = useState(initialActive?.taskId || "");
  const [timerMsg, setTimerMsg] = useState<string | null>(null);
  const [timerBusy, setTimerBusy] = useState(false);

  // log-time form
  const [projectId, setProjectId] = useState(projects[0]?.id || "");
  const [taskId, setTaskId] = useState("");
  const [date, setDate] = useState(istToday());
  const [hours, setHours] = useState("");
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [taskMsg, setTaskMsg] = useState<string | null>(null);

  // Live elapsed for a running timer — derived from the real start instant so it
  // stays correct after a reload or re-login (not just client state).
  useEffect(() => {
    if (!active) {
      setElapsed(0);
      return;
    }
    const startMs = new Date(active.startedAt).getTime();
    const tick = () => setElapsed(Math.max(0, Math.floor((Date.now() - startMs) / 1000)));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [active]);

  const startTimer = async () => {
    if (!tProjectId || timerBusy) return;
    setTimerBusy(true);
    setTimerMsg(null);
    const res = await fetch("/api/portal/time/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId: tProjectId, taskId: tTaskId || null }),
    }).catch(() => null);
    setTimerBusy(false);
    if (res && res.ok) {
      const e = await res.json();
      // A prior timer may have been auto-stopped — surface it in the recent list.
      if (Array.isArray(e.autoStopped) && e.autoStopped.length) {
        setEntries((s) =>
          [
            ...e.autoStopped.map((a: { id: string; hours: number; date: string; project: string; note: string | null }) => ({
              id: a.id, hours: a.hours, date: String(a.date), project: a.project || "", note: a.note,
            })),
            ...s,
          ].slice(0, 15)
        );
      }
      setActive({ id: e.id, startedAt: String(e.startedAt), projectId: e.projectId, taskId: e.taskId, project: e.project?.name || "", task: e.task?.title || null, note: e.note });
    } else {
      const err = res ? (await res.json().catch(() => ({})))?.error : null;
      setTimerMsg(err || "Couldn't start the timer.");
    }
  };

  const stopTimer = async () => {
    if (timerBusy) return;
    setTimerBusy(true);
    setTimerMsg(null);
    const res = await fetch("/api/portal/time/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).catch(() => null);
    setTimerBusy(false);
    if (res && res.ok) {
      const e = await res.json();
      setActive(null);
      setEntries((s) => [{ id: e.id, hours: e.hours, date: String(e.date), project: e.project?.name || "", note: e.note }, ...s].slice(0, 15));
      setTimerMsg(`Logged ${hoursLabel(e.hours)} ✓`);
    } else {
      const err = res ? (await res.json().catch(() => ({})))?.error : null;
      setTimerMsg(err || "Couldn't stop the timer.");
    }
  };

  const moveTask = async (id: string, status: string) => {
    const prev = tasks;
    setTaskMsg(null);
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, status } : t)));
    const res = await fetch(`/api/portal/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    if (!res || !res.ok) {
      setTasks(prev);
      setTaskMsg("Couldn't move task — try again.");
    }
  };

  const log = async () => {
    if (!projectId || !(Number(hours) > 0)) return;
    setMsg(null);
    const res = await fetch("/api/portal/time", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, taskId: taskId || null, date, hours: Number(hours), note }),
    }).catch(() => null);
    if (res && res.ok) {
      const e = await res.json();
      setEntries((s) => [{ id: e.id, hours: e.hours, date: String(e.date), project: e.project?.name || "", note: e.note }, ...s].slice(0, 15));
      setHours("");
      setNote("");
      setMsg("Time logged ✓");
    } else {
      const err = res ? (await res.json().catch(() => ({})))?.error : null;
      setMsg(err || "Couldn't log time.");
    }
  };

  const tasksForProject = tasks.filter((t) => t.projectId === projectId);
  const tTasksForProject = tasks.filter((t) => t.projectId === tProjectId);

  if (projects.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slatey">
        You&apos;re not on any projects yet. Your project lead will add you to one.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-8">
      {/* Time tracker — start/stop, auto-calculates the hours */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">Time tracker</h2>
        {active ? (
          <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-green-200 bg-green-50/70 p-4">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">
                {active.project}{active.task ? ` · ${active.task}` : ""}
              </p>
              <p className="text-xs text-slate-400">Started {clock(active.startedAt)}</p>
            </div>
            <span className="ml-auto font-mono text-2xl font-bold tabular-nums text-ink">{hms(elapsed)}</span>
            <button onClick={stopTimer} disabled={timerBusy} className="btn-primary w-full justify-center !bg-red-600 hover:!bg-red-700 sm:w-auto">
              <Icon name="check" className="h-4 w-4" /> Stop &amp; log
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="w-full sm:w-auto">
              <span className="mb-1 block text-[11px] text-slate-400">Project</span>
              <select value={tProjectId} onChange={(e) => { setTProjectId(e.target.value); setTTaskId(""); }} className={`${field} w-full sm:w-48`}>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="w-full sm:w-auto">
              <span className="mb-1 block text-[11px] text-slate-400">Task (optional)</span>
              <select value={tTaskId} onChange={(e) => setTTaskId(e.target.value)} className={`${field} w-full sm:w-48`}>
                <option value="">— None —</option>
                {tTasksForProject.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            <button onClick={startTimer} disabled={timerBusy || !tProjectId} className="btn-primary w-full justify-center !bg-green-600 hover:!bg-green-700 sm:w-auto">
              <Icon name="clock" className="h-4 w-4" /> Start timer
            </button>
          </div>
        )}
        {timerMsg && <p className="mt-2 text-xs text-slatey">{timerMsg}</p>}
      </section>

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
        {taskMsg && <p className="mt-2 text-xs text-red-600">{taskMsg}</p>}
      </section>

      {/* Log time manually (for past work) */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">Log time manually</h2>
        <p className="mb-3 -mt-2 text-xs text-slate-400">For past work — or use the timer above to track live.</p>
        <div className="flex flex-wrap items-end gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="w-full sm:w-auto">
            <span className="mb-1 block text-[11px] text-slate-400">Project</span>
            <select value={projectId} onChange={(e) => { setProjectId(e.target.value); setTaskId(""); }} className={`${field} w-full sm:w-48`}>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <span className="mb-1 block text-[11px] text-slate-400">Task (optional)</span>
            <select value={taskId} onChange={(e) => setTaskId(e.target.value)} className={`${field} w-full sm:w-48`}>
              <option value="">— None —</option>
              {tasksForProject.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>
          </div>
          <div className="w-full sm:w-auto">
            <span className="mb-1 block text-[11px] text-slate-400">Date</span>
            <input value={date} onChange={(e) => setDate(e.target.value)} className={`${field} w-full sm:w-40`} type="date" />
          </div>
          <div className="w-full sm:w-auto">
            <span className="mb-1 block text-[11px] text-slate-400">Hours</span>
            <input value={hours} onChange={(e) => setHours(e.target.value)} className={`${field} w-full sm:w-24`} type="number" step="0.5" placeholder="0" />
          </div>
          <input value={note} onChange={(e) => setNote(e.target.value)} className={`${field} w-full flex-1 sm:w-auto sm:min-w-[140px]`} placeholder="What did you work on?" />
          <button onClick={log} className="btn-primary w-full justify-center sm:w-auto"><Icon name="plus" className="h-4 w-4" /> Log</button>
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
