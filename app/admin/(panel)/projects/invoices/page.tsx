import { prisma } from "@/lib/db";
import { PageHeader, DbNotice } from "@/components/admin/ui";
import AllInvoices from "@/components/admin/projects/AllInvoices";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [invoices, projects] = await Promise.all([
      prisma.invoice.findMany({ orderBy: { createdAt: "desc" }, include: { project: true, client: true } }),
      prisma.project.findMany({ orderBy: { createdAt: "desc" }, select: { id: true, name: true, code: true } }),
    ]);
    return { invoices, projects };
  } catch {
    return null;
  }
}

export default async function InvoicesPage() {
  const data = await getData();
  return (
    <>
      <PageHeader title="Invoices & billing" subtitle="Track what you've billed and what's outstanding." />
      {!data ? (
        <DbNotice />
      ) : (
        <AllInvoices
          initial={data.invoices}
          projects={data.projects.map((p) => ({ id: p.id, label: `${p.code} · ${p.name}` }))}
        />
      )}
    </>
  );
}
