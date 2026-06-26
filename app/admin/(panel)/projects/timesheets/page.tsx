import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, StatCard } from "@/components/admin/ui";
import { fullName } from "@/lib/hr";
import { hoursLabel, fmtDate } from "@/lib/projects";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const since = new Date();
    since.setDate(since.getDate() - 30);
    const entries = await prisma.timeEntry.findMany({
      // Exclude in-progress timers (startedAt set, endedAt null, hours still 0) but
      // keep manual entries (which also have endedAt null but no startedAt).
      where: { date: { gte: since }, NOT: { startedAt: { not: null }, endedAt: null } },
      orderBy: { date: "desc" },
      include: { employee: true, project: true, task: true },
      take: 200,
    });
    return { entries };
  } catch {
    return null;
  }
}

export default async function TimesheetsPage() {
  const data = await getData();
  if (!data) {
    return (
      <>
        <PageHeader title="Timesheets" subtitle="Hours logged across all projects (last 30 days)." />
        <DbNotice />
      </>
    );
  }
  const { entries } = data;
  const total = entries.reduce((s, e) => s + e.hours, 0);
  const billable = entries.filter((e) => e.billable).reduce((s, e) => s + e.hours, 0);

  // Per-project totals
  const byProject = new Map<string, { name: string; hours: number }>();
  for (const e of entries) {
    const k = e.projectId;
    const cur = byProject.get(k) || { name: e.project.name, hours: 0 };
    cur.hours += e.hours;
    byProject.set(k, cur);
  }
  const projectTotals = [...byProject.values()].sort((a, b) => b.hours - a.hours);

  return (
    <>
      <PageHeader title="Timesheets" subtitle="Hours logged across all projects (last 30 days)." />
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Hours logged" value={hoursLabel(total)} icon="clock" />
        <StatCard label="Billable" value={hoursLabel(billable)} icon="wallet" accent />
        <StatCard label="Entries" value={entries.length} icon="records" />
      </div>

      {projectTotals.length > 0 && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <h2 className="text-sm font-semibold text-ink">By project</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {projectTotals.map((p) => (
              <li key={p.name} className="flex justify-between">
                <span className="text-slatey">{p.name}</span>
                <span className="font-medium text-ink">{hoursLabel(p.hours)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {entries.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slatey">No time logged in the last 30 days.</p>
        ) : (
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
              <tr>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Who</th>
                <th className="px-5 py-3 font-semibold">Project</th>
                <th className="px-5 py-3 font-semibold">Task / note</th>
                <th className="px-5 py-3 font-semibold text-right">Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-5 py-2.5 text-slatey">{fmtDate(e.date)}</td>
                  <td className="px-5 py-2.5 text-ink">{fullName(e.employee)}</td>
                  <td className="px-5 py-2.5 text-slatey">{e.project.name}</td>
                  <td className="px-5 py-2.5 text-slatey">{e.task?.title || e.note || "—"}</td>
                  <td className="px-5 py-2.5 text-right font-medium text-ink">{hoursLabel(e.hours)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
