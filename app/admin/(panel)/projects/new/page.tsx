import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import { fullName } from "@/lib/hr";

export const dynamic = "force-dynamic";

async function getOptions() {
  try {
    const [clients, employees] = await Promise.all([
      prisma.client.findMany({ where: { status: { not: "INACTIVE" } }, orderBy: { name: "asc" } }),
      prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    ]);
    return { clients, employees };
  } catch {
    return { clients: [], employees: [] };
  }
}

export default async function NewProjectPage() {
  const { clients, employees } = await getOptions();
  return (
    <>
      <PageHeader title="New project" subtitle="A code (PRJ-###) is generated automatically." />
      <ProjectForm
        clients={clients.map((c) => ({ id: c.id, label: c.name }))}
        leads={employees.map((e) => ({ id: e.id, label: fullName(e) }))}
      />
    </>
  );
}
