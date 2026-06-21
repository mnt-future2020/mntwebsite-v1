"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { money, fmtDate, PROJECT_STATUS_STYLE, PROJECT_STATUSES, titleCase } from "@/lib/projects";

export type ProjItem = {
  id: string;
  code: string;
  name: string;
  status: string;
  client: string;
  lead: string;
  tasks: number;
  members: number;
  budget: number;
  currency: string;
  endDate: string | null;
  createdAt: string;
};

export default function ProjectsBrowser({ projects }: { projects: ProjItem[] }) {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("recent");

  const view = useMemo(() => {
    let list = projects.filter(
      (p) =>
        (!q || p.name.toLowerCase().includes(q.toLowerCase()) || p.client.toLowerCase().includes(q.toLowerCase()) || p.code.toLowerCase().includes(q.toLowerCase())) &&
        (!status || p.status === status)
    );
    list = [...list].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "budget") return b.budget - a.budget;
      if (sort === "status") return a.status.localeCompare(b.status);
      return (b.createdAt || "").localeCompare(a.createdAt || ""); // recent
    });
    return list;
  }, [projects, q, status, sort]);

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="relative">
          <Icon name="search" className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects…" className="w-56 rounded-lg border border-slate-200 py-1.5 pl-8 pr-3 text-sm focus:border-brand focus:outline-none" />
        </div>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slatey focus:border-brand focus:outline-none">
          <option value="">All statuses</option>
          {PROJECT_STATUSES.map((s) => <option key={s} value={s}>{titleCase(s)}</option>)}
        </select>
        <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-slate-200 px-2 py-1.5 text-sm text-slatey focus:border-brand focus:outline-none">
          <option value="recent">Sort: Recent</option>
          <option value="name">Sort: Name</option>
          <option value="status">Sort: Status</option>
          <option value="budget">Sort: Budget</option>
        </select>
        <span className="ml-auto text-xs text-slate-400">{view.length} of {projects.length}</span>
      </div>

      {view.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slatey">
          No projects match your filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {view.map((p) => (
            <Link key={p.id} href={`/admin/projects/${p.id}`} className="block rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-slate-400">{p.code}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${PROJECT_STATUS_STYLE[p.status] || ""}`}>{titleCase(p.status)}</span>
              </div>
              <h3 className="mt-2 font-semibold text-ink">{p.name}</h3>
              <p className="mt-1 text-sm text-slatey">{p.client}</p>
              <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
                <span>{p.lead}</span>
                <span>{p.tasks} tasks · {p.members} on team</span>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                <span>{money(p.budget, p.currency)}</span>
                <span>{p.endDate ? `due ${fmtDate(p.endDate)}` : "no due date"}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
