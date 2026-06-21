import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, StatCard, DbNotice, Empty } from "@/components/admin/ui";
import Icon from "@/components/Icon";
import { fullName } from "@/lib/hr";
import { money } from "@/lib/projects";
import ProjectsBrowser from "@/components/admin/projects/ProjectsBrowser";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true, lead: true, _count: { select: { tasks: true, members: true } } },
    });
    return { projects };
  } catch {
    return null;
  }
}

export default async function ProjectsOverview() {
  const data = await getData();
  if (!data) {
    return (
      <>
        <PageHeader title="Projects & delivery" subtitle="Plan, staff and ship client software." />
        <DbNotice />
      </>
    );
  }
  const { projects } = data;
  const active = projects.filter((p) => p.status === "ACTIVE").length;
  const completed = projects.filter((p) => p.status === "COMPLETED").length;
  const pipeline = projects
    .filter((p) => p.status !== "COMPLETED" && p.status !== "CANCELLED")
    .reduce((s, p) => s + (p.budget || 0), 0);

  return (
    <>
      <PageHeader
        title="Projects & delivery"
        subtitle="Plan, staff and ship client software."
        action={
          <Link href="/admin/projects/new" className="btn-primary">
            <Icon name="plus" className="h-4 w-4" /> New project
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Projects" value={projects.length} icon="layers" />
        <StatCard label="Active" value={active} icon="rocket" accent />
        <StatCard label="Completed" value={completed} icon="check" />
        <StatCard label="Pipeline value" value={money(pipeline)} icon="wallet" />
      </div>

      <div className="mt-8">
        {projects.length === 0 ? (
          <Empty
            icon="layers"
            title="No projects yet"
            body="Create your first project to start tracking delivery, sprints and billing."
            action={<Link href="/admin/projects/new" className="btn-primary"><Icon name="plus" className="h-4 w-4" /> New project</Link>}
          />
        ) : (
          <ProjectsBrowser
            projects={projects.map((p) => ({
              id: p.id,
              code: p.code,
              name: p.name,
              status: p.status,
              client: p.client?.name || "Internal",
              lead: p.lead ? fullName(p.lead) : "Unassigned",
              tasks: p._count.tasks,
              members: p._count.members,
              budget: p.budget,
              currency: p.currency,
              endDate: p.endDate ? String(p.endDate) : null,
              createdAt: String(p.createdAt),
            }))}
          />
        )}
      </div>
    </>
  );
}
