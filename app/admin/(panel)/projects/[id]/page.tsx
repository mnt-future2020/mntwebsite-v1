import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import ProjectWorkspace from "@/components/admin/projects/ProjectWorkspace";
import { getSession } from "@/lib/auth";
import { getRolePerms } from "@/lib/permissions-db";
import { fullName } from "@/lib/hr";

export const dynamic = "force-dynamic";

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  const project = await prisma.project
    .findUnique({
      where: { id },
      include: {
        client: true,
        lead: true,
        members: { include: { employee: true }, orderBy: { createdAt: "asc" } },
        sprints: { orderBy: { createdAt: "asc" } },
        tasks: { include: { assignee: true }, orderBy: [{ status: "asc" }, { order: "asc" }, { createdAt: "asc" }] },
        milestones: { orderBy: { dueDate: "asc" } },
        invoices: { orderBy: { createdAt: "desc" } },
        timeEntries: { include: { employee: true, task: true }, orderBy: { date: "desc" }, take: 50 },
      },
    })
    .catch(() => null);

  if (!project) notFound();

  const [employees, session] = await Promise.all([
    prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    getSession(),
  ]);
  const perms = session ? await getRolePerms(session.role) : [];
  const canBill = perms.includes("projects.billing");

  return (
    <ProjectWorkspace
      project={project}
      employees={employees.map((e) => ({ id: e.id, label: fullName(e) }))}
      canBill={canBill}
    />
  );
}
