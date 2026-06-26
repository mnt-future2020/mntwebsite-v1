"use client";

import { useEffect, useState } from "react";

type RunTimer = { id: string; who: string; project: string; task: string | null; startedAt: string };

const hms = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  return [h, m, s % 60].map((n) => String(n).padStart(2, "0")).join(":");
};

// Live "who is tracking right now" panel for the admin Timesheets page. Running
// timers are excluded from the logged-hours stats (they're 0h until stopped), so
// this surfaces them separately with a ticking elapsed derived from startedAt.
export default function RunningTimers({ timers }: { timers: RunTimer[] }) {
  const [, force] = useState(0);
  useEffect(() => {
    if (!timers.length) return;
    const id = setInterval(() => force((n) => n + 1), 1000);
    return () => clearInterval(id);
  }, [timers.length]);

  if (!timers.length) return null;
  const now = Date.now();

  return (
    <div className="mb-6 rounded-2xl border border-green-200 bg-green-50/60 p-5">
      <div className="mb-3 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
        </span>
        <h2 className="text-sm font-semibold text-ink">Currently tracking ({timers.length})</h2>
      </div>
      <ul className="space-y-2">
        {timers.map((t) => {
          const secs = Math.max(0, Math.floor((now - new Date(t.startedAt).getTime()) / 1000));
          return (
            <li key={t.id} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-2.5 ring-1 ring-green-100">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-ink">{t.who}</p>
                <p className="truncate text-xs text-slate-400">
                  {t.task ? `${t.task} · ${t.project}` : t.project}
                </p>
              </div>
              <span className="font-mono text-lg font-bold tabular-nums text-green-700">{hms(secs)}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
