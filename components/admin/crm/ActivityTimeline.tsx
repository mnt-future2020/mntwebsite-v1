"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import { ACTIVITY_TYPES, ACTIVITY_ICON, fmtDate, titleCase, followUpStatus, FOLLOWUP_STYLE } from "@/lib/crm";
import { fullName } from "@/lib/hr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;
type Scope = { dealId?: string; contactId?: string; clientId?: string };

const TYPE_TINT: Record<string, string> = {
  NOTE: "bg-slate-100 text-slatey",
  CALL: "bg-blue-100 text-blue-700",
  EMAIL: "bg-violet-100 text-violet-700",
  MEETING: "bg-amber-100 text-amber-700",
  TASK: "bg-green-100 text-green-700",
};

// A record's chronological activity feed with a composer. Reusable across deal,
// contact and company records — pass the scope ids and the server-fetched list.
export default function ActivityTimeline({ scope, initial }: { scope: Scope; initial: Any[] }) {
  const [acts, setActs] = useState<Any[]>(initial);
  const [type, setType] = useState("NOTE");
  const [subject, setSubject] = useState("");
  const [due, setDue] = useState("");
  const [busy, setBusy] = useState(false);

  const add = async () => {
    const s = subject.trim();
    if (!s) return;
    setBusy(true);
    const res = await fetch("/api/admin/crm/activities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...scope, type, subject: s, dueDate: type === "TASK" && due ? due : null }),
    }).catch(() => null);
    setBusy(false);
    if (res && res.ok) {
      const a = await res.json();
      setActs((x) => [a, ...x]);
      setSubject("");
      setDue("");
      toast("Activity logged");
    } else toast("Couldn't log activity", "err");
  };

  const toggle = async (a: Any) => {
    setActs((s) => s.map((x) => (x.id === a.id ? { ...x, done: !x.done } : x)));
    await fetch(`/api/admin/crm/activities/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !a.done }),
    }).catch(() => {});
  };
  const del = async (id: string) => {
    const prev = acts;
    setActs((s) => s.filter((x) => x.id !== id));
    const res = await fetch(`/api/admin/crm/activities/${id}`, { method: "DELETE" }).catch(() => null);
    if (!res || !res.ok) setActs(prev);
  };

  return (
    <div>
      {/* Composer */}
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <div className="flex flex-wrap gap-1.5">
          {ACTIVITY_TYPES.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors ${
                type === t ? "bg-brand-50 text-brand-700 ring-1 ring-brand-200" : "text-slatey hover:bg-slate-50"
              }`}
            >
              <Icon name={ACTIVITY_ICON[t]} className="h-3.5 w-3.5" /> {titleCase(t)}
            </button>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder={type === "TASK" ? "What needs doing?" : `Log a ${titleCase(type).toLowerCase()}…`}
            className="min-w-[160px] flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {type === "TASK" && (
            <input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              title="Due date"
              className="rounded-lg border border-slate-200 px-2 py-2 text-sm text-slatey focus:border-brand focus:outline-none"
            />
          )}
          <button onClick={add} disabled={busy} className="btn-primary shrink-0 disabled:opacity-60">
            <Icon name="plus" className="h-4 w-4" /> Log
          </button>
        </div>
      </div>

      {/* Timeline */}
      {acts.length === 0 ? (
        <p className="mt-4 px-1 text-sm text-slate-500">No activity yet — log the first note or task above.</p>
      ) : (
        <ol className="mt-4 space-y-1">
          {acts.map((a, i) => {
            const isTask = a.type === "TASK";
            const fu = isTask && !a.done ? followUpStatus(a.dueDate) : null;
            return (
              <li key={a.id} className="group relative flex gap-3 pb-4">
                {/* rail */}
                {i < acts.length - 1 && <span className="absolute left-[15px] top-8 h-full w-px bg-slate-200" />}
                <span className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TYPE_TINT[a.type] || TYPE_TINT.NOTE}`}>
                  <Icon name={isTask && a.done ? "check" : ACTIVITY_ICON[a.type]} className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1 rounded-xl border border-slate-100 bg-white px-3 py-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className={`text-sm ${a.done ? "text-slate-500 line-through" : "text-ink"}`}>
                        {isTask && (
                          <button onClick={() => toggle(a)} title={a.done ? "Mark not done" : "Mark done"} className="mr-1.5 align-middle">
                            <Icon name={a.done ? "check" : "clock"} className={`inline h-4 w-4 ${a.done ? "text-green-600" : "text-slate-400 hover:text-brand-500"}`} />
                          </button>
                        )}
                        {a.subject}
                      </p>
                      {a.body && <p className="mt-0.5 text-xs text-slatey">{a.body}</p>}
                      <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-slate-500">
                        <span>{titleCase(a.type)}</span>
                        <span>·</span>
                        <span>{fmtDate(a.createdAt)}</span>
                        {a.owner && <><span>·</span><span>{fullName(a.owner)}</span></>}
                        {a.dueDate && (
                          <span className={`rounded-full px-1.5 py-0.5 font-semibold ${fu ? FOLLOWUP_STYLE[fu] : "bg-slate-100 text-slate-500"}`}>
                            due {fmtDate(a.dueDate)}
                          </span>
                        )}
                      </p>
                    </div>
                    <button onClick={() => del(a.id)} title="Delete" className="shrink-0 rounded-lg p-1 text-slate-400 opacity-0 transition-opacity hover:bg-red-50 hover:text-red-500 group-hover:opacity-100">
                      <Icon name="trash" className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
