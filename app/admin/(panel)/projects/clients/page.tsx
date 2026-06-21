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

export default async function ClientsPage() {
  const clients = await getClients();
  return (
    <>
      <PageHeader title="Clients" subtitle="The companies you build software for." />
      {clients === null ? (
        <DbNotice />
      ) : (
        <ClientsManager
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
