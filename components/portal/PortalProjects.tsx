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
const istDay = (d?: unknown) => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(d ? new Date(String(d)) : new Date());
const hms = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return [h, m, s % 60].map((n) => String(n).padStart(2, "0")).join(":");
};
const clockTime = (iso: string) => new Date(iso).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });

export default function PortalProjects({
  projects,
  tasks: initialTasks,
  entries: initialEntries,
  active: initialActive = null,
}: {
  projects: Project[];
  tasks: Task[];
  entries: Entry[];
  active?: ActiveTimer | null;
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [entries, setEntries] = useState<Entry[]>(initialEntries);
  const [active, setActive] = useState<ActiveTimer | null>(initialActive);
  const [elapsed, setElapsed] = useState(0);
  const [busy, setBusy] = useState(false);
  const [timerMsg, setTimerMsg] = useState<string | null>(null);
  const [taskMsg, setTaskMsg] = useState<string | null>(null);

  // Idle "start a timer" picker — for ad-hoc / project-level work not tied to a
  // task in the list below. (You can also just hit Start on a task.)
  const [pProjectId, setPProjectId] = useState(projects[0]?.id || "");
  const [pTaskId, setPTaskId] = useState("");

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

  const startTimer = async (projectId: string, taskId: string | null) => {
    if (!projectId || busy) return;
    setBusy(true);
    setTimerMsg(null);
    const res = await fetch("/api/portal/time/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectId, taskId: taskId || null }),
    }).catch(() => null);
    setBusy(false);
    if (res && res.ok) {
      const e = await res.json();
      // Starting a timer auto-stops any prior one — show it in the recent list.
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
    if (busy) return;
    setBusy(true);
    setTimerMsg(null);
    const res = await fetch("/api/portal/time/stop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    }).catch(() => null);
    setBusy(false);
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

  const pTasksForProject = tasks.filter((t) => t.projectId === pProjectId);
  const todayHours = entries.filter((e) => istDay(e.date) === istDay()).reduce((sum, e) => sum + e.hours, 0);

  if (projects.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slatey">
        You&apos;re not on any projects yet. Your project lead will add you to one.
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      {/* ===== Timer (running banner, or idle start) ===== */}
      {active ? (
        <div className="flex flex-wrap items-center gap-4 rounded-2xl border border-green-300 bg-green-50 p-4 sm:p-5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{active.task || active.project}</p>
            <p className="truncate text-xs text-slate-500">
              {active.task ? active.project : "Project time"} · started {clockTime(active.startedAt)}
            </p>
          </div>
          <span className="ml-auto font-mono text-3xl font-bold tabular-nums text-ink">{hms(elapsed)}</span>
          <button onClick={stopTimer} disabled={busy} className="btn-primary w-full justify-center !bg-red-600 hover:!bg-red-700 sm:w-auto">
            <Icon name="check" className="h-4 w-4" /> Stop &amp; log
          </button>
        </div>
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex flex-wrap items-end gap-3">
            <div className="w-full sm:flex-1">
              <span className="mb-1 block text-[11px] font-medium text-slate-400">Project</span>
              <select value={pProjectId} onChange={(e) => { setPProjectId(e.target.value); setPTaskId(""); }} className={`${field} w-full`}>
                {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
              </select>
            </div>
            <div className="w-full sm:flex-1">
              <span className="mb-1 block text-[11px] font-medium text-slate-400">Task (optional)</span>
              <select value={pTaskId} onChange={(e) => setPTaskId(e.target.value)} className={`${field} w-full`}>
                <option value="">— No specific task —</option>
                {pTasksForProject.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
            <button onClick={() => startTimer(pProjectId, pTaskId || null)} disabled={busy || !pProjectId} className="btn-primary w-full justify-center !bg-green-600 hover:!bg-green-700 sm:w-auto">
              <Icon name="clock" className="h-4 w-4" /> Start timer
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">…or hit <b>Start</b> on any task below.</p>
        </div>
      )}
      {timerMsg && <p className="-mt-3 text-xs text-slatey">{timerMsg}</p>}

      {/* ===== My tasks (start a timer per task + change status) ===== */}
      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-ink">My tasks</h2>
          {todayHours > 0 && <span className="text-xs text-slate-400">{hoursLabel(todayHours)} logged today</span>}
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {tasks.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slatey">Nothing assigned to you right now. 🎉</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {tasks.map((t) => {
                const tracking = active?.taskId === t.id;
                return (
                  <li key={t.id} className={`flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-5 ${tracking ? "bg-green-50/60" : ""}`}>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">{t.title}</p>
                      <p className="truncate text-xs text-slate-400">
                        {t.project}{t.dueDate ? ` · due ${fmtDate(t.dueDate)}` : ""}
                      </p>
                    </div>
                    <span className={`rounded px-1.5 py-0.5 text-[10px] font-semibold ${PRIORITY_STYLE[t.priority] || ""}`}>{titleCase(t.priority)}</span>
                    <select
                      value={t.status}
                      onChange={(e) => moveTask(t.id, e.target.value)}
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${TASK_STATUS_STYLE[t.status] || ""}`}
                    >
                      {TASK_STATUSES.map((s) => <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>)}
                    </select>
                    {tracking ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-green-100 px-2.5 py-1.5 text-xs font-semibold text-green-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> Tracking
                      </span>
                    ) : (
                      <button
                        onClick={() => startTimer(t.projectId, t.id)}
                        disabled={busy}
                        title={active ? "Switch the timer to this task" : "Start a timer on this task"}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-green-300 hover:bg-green-50 hover:text-green-700 disabled:opacity-50"
                      >
                        <Icon name="clock" className="h-3.5 w-3.5" /> {active ? "Switch" : "Start"}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
        {taskMsg && <p className="mt-2 text-xs text-red-600">{taskMsg}</p>}
      </section>

      {/* ===== Projects (compact overview) ===== */}
      <section>
        <h2 className="mb-3 text-sm font-semibold text-ink">Projects you&apos;re on</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((p) => (
            <div key={p.id} className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-ink">{p.name}</p>
                <p className="truncate text-xs text-slate-400">{p.client} · {p.tasks} tasks</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${PROJECT_STATUS_STYLE[p.status] || ""}`}>{titleCase(p.status)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Recent time logs ===== */}
      {entries.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold text-ink">Recent time logs</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <ul className="divide-y divide-slate-100">
              {entries.map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm sm:px-5">
                  <span className="min-w-0 truncate text-ink">
                    <b>{hoursLabel(e.hours)}</b> · {e.project}{e.note ? ` — ${e.note}` : ""}
                  </span>
                  <span className="shrink-0 text-xs text-slate-400">{fmtDate(e.date)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
