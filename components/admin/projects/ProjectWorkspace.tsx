"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";
import KanbanBoard, { BoardTask } from "@/components/admin/projects/KanbanBoard";
import { TeamPanel, MilestonesPanel, SprintsPanel, InvoicesPanel, TimePanel } from "@/components/admin/projects/ProjectPanels";
import { fullName } from "@/lib/hr";
import { money, fmtDate, BILLING_LABELS, PROJECT_STATUS_STYLE, titleCase } from "@/lib/projects";

type Opt = { id: string; label: string };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ProjectWorkspace({ project, employees, canBill }: { project: any; employees: Opt[]; canBill: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTabState] = useState<string>(searchParams.get("tab") || "board");
  // Persist the active tab in the URL (refresh/share-safe) without a server round-trip.
  const setTab = (key: string) => {
    setTabState(key);
    window.history.replaceState(null, "", key === "board" ? window.location.pathname : `?tab=${key}`);
  };

  const memberOpts: Opt[] = project.members.map((m: any) => ({ id: m.employee.id, label: fullName(m.employee) }));
  const sprintOpts: Opt[] = project.sprints.map((s: any) => ({ id: s.id, label: s.name }));
  const total = project.tasks.length;
  const done = project.tasks.filter((t: BoardTask) => t.status === "DONE").length;
  const pct = total ? Math.round((done / total) * 100) : 0;

  const tabs = [
    { key: "board", label: "Board" },
    { key: "sprints", label: "Sprints" },
    { key: "milestones", label: "Milestones" },
    { key: "team", label: "Team" },
    { key: "time", label: "Time" },
    ...(canBill ? [{ key: "invoices", label: "Invoices" }] : []),
    { key: "overview", label: "Overview" },
  ];

  const del = async () => {
    if (!confirm(`Delete project ${project.code}? This removes its tasks, sprints, time and invoices.`)) return;
    const res = await fetch(`/api/admin/projects/${project.id}`, { method: "DELETE" });
    if (res.ok) {
      toast("Project deleted");
      router.push("/admin/projects");
      router.refresh();
    } else toast("Delete failed", "err");
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-slate-400">{project.code}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${PROJECT_STATUS_STYLE[project.status] || ""}`}>
              {titleCase(project.status)}
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-ink">{project.name}</h1>
          <p className="mt-1 text-sm text-slatey">
            {project.client?.name || "Internal"} · {project.lead ? fullName(project.lead) : "No lead"} · {BILLING_LABELS[project.billingType]}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/projects/${project.id}/edit`} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slatey hover:bg-slate-50">
            <Icon name="edit" className="mr-1 inline h-4 w-4" /> Edit
          </Link>
          <button onClick={del} className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slatey hover:bg-red-50 hover:text-red-600">
            <Icon name="trash" className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-ink">Delivery progress</span>
          <span className="text-slatey">{done}/{total} tasks · {pct}%</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-brand transition-all" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-5 flex flex-wrap gap-1 border-b border-slate-200">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`-mb-px border-b-2 px-3.5 py-2 text-sm font-medium transition-colors ${
              tab === t.key ? "border-brand text-brand-700" : "border-transparent text-slatey hover:text-ink"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "board" && <KanbanBoard projectId={project.id} initial={project.tasks} members={memberOpts.length ? memberOpts : employees} sprints={sprintOpts} />}
      {tab === "sprints" && <SprintsPanel projectId={project.id} initial={project.sprints} />}
      {tab === "milestones" && <MilestonesPanel projectId={project.id} initial={project.milestones} currency={project.currency} />}
      {tab === "team" && <TeamPanel projectId={project.id} initial={project.members} employees={employees} />}
      {tab === "time" && <TimePanel projectId={project.id} initial={project.timeEntries} members={memberOpts.length ? memberOpts : employees} />}
      {tab === "invoices" && canBill && <InvoicesPanel projectId={project.id} initial={project.invoices} currency={project.currency} />}

      {tab === "overview" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-ink">Details</h3>
            <dl className="mt-4 space-y-2.5 text-sm">
              <Row label="Client" value={project.client?.name || "Internal"} />
              <Row label="Lead" value={project.lead ? fullName(project.lead) : "—"} />
              <Row label="Budget" value={money(project.budget, project.currency)} />
              <Row label="Billing" value={BILLING_LABELS[project.billingType]} />
              {project.billingType === "HOURLY" && <Row label="Hourly rate" value={money(project.hourlyRate, project.currency)} />}
              <Row label="Start" value={fmtDate(project.startDate)} />
              <Row label="Target delivery" value={fmtDate(project.endDate)} />
              {project.repoUrl && <Row label="Repo" value={project.repoUrl} />}
            </dl>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-ink">Tech stack</h3>
            {project.techStack.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.techStack.map((t: string) => (
                  <span key={t} className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">{t}</span>
                ))}
              </div>
            ) : (
              <p className="mt-3 text-sm text-slate-400">No tech stack set.</p>
            )}
            {project.description && (
              <>
                <h3 className="mt-6 text-sm font-semibold text-ink">Description</h3>
                <p className="mt-2 whitespace-pre-wrap text-sm text-slatey">{project.description}</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-slate-400">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  );
}
