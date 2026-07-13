"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { ACTIVITY_ICON, fmtDate, titleCase, followUpStatus, FOLLOWUP_STYLE, contactName } from "@/lib/crm";
import { fullName } from "@/lib/hr";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Any = any;

// Where an activity is anchored → a label + link to that record.
function contextOf(a: Any): { label: string; href?: string } | null {
  if (a.contact) return { label: contactName(a.contact), href: `/admin/crm/contacts/${a.contact.id}` };
  if (a.client) return { label: a.client.name, href: `/admin/crm/companies/${a.client.id}` };
  if (a.deal) return { label: a.deal.title, href: "/admin/crm" };
  return null;
}

const BUCKETS = [
  { key: "overdue", label: "Overdue", tint: "text-red-700" },
  { key: "today", label: "Today", tint: "text-amber-700" },
  { key: "soon", label: "Upcoming", tint: "text-slatey" },
  { key: "later", label: "No date", tint: "text-slate-500" },
] as const;

export default function InboxView({ tasks: t0, followUps, recent }: { tasks: Any[]; followUps: Any[]; recent: Any[] }) {
  const [tasks, setTasks] = useState<Any[]>(t0);

  const done = async (a: Any) => {
    setTasks((s) => s.filter((x) => x.id !== a.id));
    await fetch(`/api/admin/crm/activities/${a.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: true }),
    }).catch(() => {});
  };

  const bucketOf = (d: Any) => followUpStatus(d) || "later";
  const grouped = BUCKETS.map((b) => ({ ...b, items: tasks.filter((a) => bucketOf(a.dueDate) === b.key) }));

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      {/* Tasks */}
      <div className="space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
            <h2 className="text-sm font-semibold text-ink">My tasks</h2>
            <span className="text-xs text-slate-500">{tasks.length} open</span>
          </div>
          {tasks.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-slate-500">Nothing open — you&apos;re all caught up. 🎉</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {grouped.map((g) =>
                g.items.length === 0 ? null : (
                  <div key={g.key} className="px-5 py-3">
                    <p className={`mb-2 text-xs font-semibold uppercase tracking-wide ${g.tint}`}>
                      {g.label} <span className="text-slate-400">· {g.items.length}</span>
                    </p>
                    <ul className="space-y-1.5">
                      {g.items.map((a) => {
                        const ctx = contextOf(a);
                        return (
                          <li key={a.id} className="flex items-start gap-2.5">
                            <button onClick={() => done(a)} title="Mark done" className="mt-0.5 text-slate-400 hover:text-green-600">
                              <Icon name="check" className="h-4 w-4" />
                            </button>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm text-ink">{a.subject}</p>
                              <p className="flex flex-wrap items-center gap-x-2 text-[11px] text-slate-500">
                                {a.dueDate && (
                                  <span className={`rounded-full px-1.5 py-0.5 font-semibold ${FOLLOWUP_STYLE[followUpStatus(a.dueDate) || "soon"]}`}>
                                    {fmtDate(a.dueDate)}
                                  </span>
                                )}
                                {ctx && (ctx.href ? <Link href={ctx.href} className="hover:text-brand-700 hover:underline">{ctx.label}</Link> : <span>{ctx.label}</span>)}
                                {a.owner && <span>· {fullName(a.owner)}</span>}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* Recent activity */}
        <section className="rounded-2xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 px-5 py-3">
            <h2 className="text-sm font-semibold text-ink">Recent activity</h2>
          </div>
          {recent.length === 0 ? (
            <p className="px-5 py-8 text-center text-sm text-slate-500">No activity logged yet.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {recent.map((a) => {
                const ctx = contextOf(a);
                return (
                  <li key={a.id} className="flex items-center gap-3 px-5 py-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slatey">
                      <Icon name={a.type === "TASK" && a.done ? "check" : ACTIVITY_ICON[a.type]} className="h-3.5 w-3.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`truncate text-sm ${a.done ? "text-slate-500 line-through" : "text-ink"}`}>{a.subject}</p>
                      <p className="text-[11px] text-slate-500">
                        {titleCase(a.type)} · {fmtDate(a.createdAt)}
                        {ctx && <> · {ctx.href ? <Link href={ctx.href} className="hover:text-brand-700 hover:underline">{ctx.label}</Link> : ctx.label}</>}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      {/* Follow-ups due */}
      <section className="h-fit rounded-2xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3">
          <h2 className="text-sm font-semibold text-ink">Follow-ups due</h2>
          <span className="text-xs text-slate-500">{followUps.length}</span>
        </div>
        {followUps.length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">No follow-ups due or overdue.</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {followUps.map((f) => (
              <li key={`${f.kind}-${f.id}`} className="px-5 py-2.5">
                <Link href={f.href} className="block hover:opacity-80">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm font-medium text-ink">{f.label}</p>
                    <span className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${FOLLOWUP_STYLE[f.status]}`}>
                      {f.status === "overdue" ? "Overdue" : "Today"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {f.kind === "deal" ? "Deal" : "Contact"} · {fmtDate(f.date)}
                    {f.sub ? ` · ${f.sub}` : ""}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
