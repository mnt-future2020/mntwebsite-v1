import { prisma } from "@/lib/db";
import { PageHeader, StatCard, DbNotice } from "@/components/admin/ui";
import Icon from "@/components/Icon";
import DealPipeline from "@/components/admin/crm/DealPipeline";
import { ensureDefaultPipeline } from "@/lib/pipelines";
import { fullName } from "@/lib/hr";
import { money, weightedValue, contactName, dealIsOpen, dealIsWon, followUpStatus, isStale } from "@/lib/crm";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    await ensureDefaultPipeline(); // guarantee at least one pipeline exists
    const [pipelines, deals, clients, contacts, employees] = await Promise.all([
      prisma.pipeline.findMany({
        orderBy: { order: "asc" },
        include: { stages: { orderBy: { order: "asc" } }, _count: { select: { deals: true } } },
      }),
      prisma.deal.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        include: { client: true, contact: true, owner: true, stageRef: true },
      }),
      prisma.client.findMany({ orderBy: { name: "asc" } }),
      prisma.contact.findMany({ orderBy: { firstName: "asc" } }),
      prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    ]);
    return { pipelines, deals, clients, contacts, employees };
  } catch {
    return null;
  }
}

export default async function CrmPipelinePage() {
  const data = await getData();
  if (!data) {
    return (
      <>
        <PageHeader title="Sales pipeline" subtitle="Track deals from first touch to won." />
        <DbNotice />
      </>
    );
  }
  const { pipelines, deals, clients, contacts, employees } = data;
  const open = deals.filter(dealIsOpen);
  const openValue = open.reduce((s, d) => s + d.value, 0);
  const weighted = weightedValue(deals);
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const wonThisMonth = deals
    .filter((d) => dealIsWon(d) && d.closedAt && new Date(d.closedAt) >= monthStart)
    .reduce((s, d) => s + d.value, 0);
  const fuOverdue = open.filter((d) => followUpStatus(d.nextFollowUp) === "overdue").length;
  const fuToday = open.filter((d) => followUpStatus(d.nextFollowUp) === "today").length;
  const staleCount = open.filter((d) => isStale(d)).length;

  return (
    <>
      <PageHeader title="Sales pipeline" subtitle="Track deals from first touch to won." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open deals" value={open.length} icon="network" />
        <StatCard label="Open pipeline" value={money(openValue)} icon="wallet" accent />
        <StatCard label="Weighted forecast" value={money(weighted)} icon="gauge" />
        <StatCard label="Won this month" value={money(wonThisMonth)} icon="check" />
      </div>

      {(fuOverdue > 0 || fuToday > 0 || staleCount > 0) && (
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-3 text-sm">
          <span className="inline-flex items-center gap-1.5 font-semibold text-amber-900"><Icon name="bell" className="h-4 w-4" /> Needs attention</span>
          {fuOverdue > 0 && <span className="text-red-700"><b>{fuOverdue}</b> follow-up{fuOverdue > 1 ? "s" : ""} overdue</span>}
          {fuToday > 0 && <span className="text-amber-800"><b>{fuToday}</b> due today</span>}
          {staleCount > 0 && <span className="text-slatey"><b>{staleCount}</b> stale (no activity 14d+)</span>}
        </div>
      )}

      <div className="mt-8">
        <DealPipeline
          pipelines={pipelines}
          initial={deals}
          companies={clients.map((c) => ({ id: c.id, label: c.name }))}
          contacts={contacts.map((c) => ({ id: c.id, label: contactName(c) }))}
          owners={employees.map((e) => ({ id: e.id, label: fullName(e) }))}
        />
      </div>
    </>
  );
}
