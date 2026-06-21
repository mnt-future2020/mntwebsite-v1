import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import ProjectForm from "@/components/admin/projects/ProjectForm";
import { fullName } from "@/lib/hr";

export const dynamic = "force-dynamic";

export default async function EditProjectPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const project = await prisma.project.findUnique({ where: { id } }).catch(() => null);
  if (!project) notFound();

  const [clients, employees] = await Promise.all([
    prisma.client.findMany({ orderBy: { name: "asc" } }),
    prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
  ]);

  return (
    <>
      <PageHeader title={`Edit ${project.code}`} subtitle={project.name} />
      <ProjectForm
        initial={project as unknown as Record<string, unknown>}
        clients={clients.map((c) => ({ id: c.id, label: c.name }))}
        leads={employees.map((e) => ({ id: e.id, label: fullName(e) }))}
      />
    </>
  );
}
