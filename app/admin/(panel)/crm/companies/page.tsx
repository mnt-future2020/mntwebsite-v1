import { prisma } from "@/lib/db";
import { PageHeader, DbNotice } from "@/components/admin/ui";
import ClientsManager from "@/components/admin/projects/ClientsManager";

export const dynamic = "force-dynamic";

async function getClients() {
  try {
    return await prisma.client.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { projects: true } } },
    });
  } catch {
    return null;
  }
}

export default async function CrmCompaniesPage() {
  const clients = await getClients();
  return (
    <>
      <PageHeader title="Companies" subtitle="Accounts in your CRM. Shared with Projects — one source of truth." />
      {clients === null ? (
        <DbNotice />
      ) : (
        <ClientsManager
          apiBase="/api/admin/crm/companies"
          initial={clients.map((c) => ({
            id: c.id,
            name: c.name,
            contact: c.contact,
            email: c.email,
            phone: c.phone,
            website: c.website,
            status: c.status,
            notes: c.notes,
            projectCount: c._count.projects,
          }))}
        />
      )}
    </>
  );
}
