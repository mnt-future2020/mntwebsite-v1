import { prisma } from "@/lib/db";
import { PageHeader, StatCard, DbNotice } from "@/components/admin/ui";
import DealPipeline from "@/components/admin/crm/DealPipeline";
import { fullName } from "@/lib/hr";
import { money, weightedValue, contactName, isOpenStage } from "@/lib/crm";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [deals, clients, contacts, employees] = await Promise.all([
      prisma.deal.findMany({ orderBy: [{ stage: "asc" }, { createdAt: "desc" }], include: { client: true, contact: true, owner: true } }),
      prisma.client.findMany({ orderBy: { name: "asc" } }),
      prisma.contact.findMany({ orderBy: { firstName: "asc" } }),
      prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    ]);
    return { deals, clients, contacts, employees };
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
  const { deals, clients, contacts, employees } = data;
  const open = deals.filter((d) => isOpenStage(d.stage));
  const openValue = open.reduce((s, d) => s + d.value, 0);
  const weighted = weightedValue(deals);
  const monthStart = new Date();
  monthStart.setDate(1);
  monthStart.setHours(0, 0, 0, 0);
  const wonThisMonth = deals.filter((d) => d.stage === "WON" && d.closedAt && new Date(d.closedAt) >= monthStart).reduce((s, d) => s + d.value, 0);

  return (
    <>
      <PageHeader title="Sales pipeline" subtitle="Track deals from first touch to won." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Open deals" value={open.length} icon="network" />
        <StatCard label="Open pipeline" value={money(openValue)} icon="wallet" accent />
        <StatCard label="Weighted forecast" value={money(weighted)} icon="gauge" />
        <StatCard label="Won this month" value={money(wonThisMonth)} icon="check" />
      </div>

      <div className="mt-8">
        <DealPipeline
          initial={deals}
          companies={clients.map((c) => ({ id: c.id, label: c.name }))}
          contacts={contacts.map((c) => ({ id: c.id, label: contactName(c) }))}
          owners={employees.map((e) => ({ id: e.id, label: fullName(e) }))}
        />
      </div>
    </>
  );
}
