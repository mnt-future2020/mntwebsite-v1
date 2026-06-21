import Link from "next/link";
import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";
import PortalProjects from "@/components/portal/PortalProjects";

export const dynamic = "force-dynamic";

export default async function PortalProjectsPage() {
  const emp = await getCurrentEmployee();
  if (!emp) {
    return (
      <>
        <h1 className="text-2xl font-bold text-ink">My projects</h1>
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          <p className="font-semibold">No employee profile linked</p>
          <p className="mt-2">
            This account isn&apos;t connected to an employee record. If you&apos;re the admin, use the{" "}
            <Link href="/admin/projects" className="font-semibold underline">admin projects</Link> view.
          </p>
        </div>
      </>
    );
  }

  let projects: { id: string; code: string; name: string; status: string; client: string; tasks: number }[] = [];
  let tasks: { id: string; title: string; status: string; priority: string; project: string; projectId: string; dueDate: Date | null }[] = [];
  let entries: { id: string; hours: number; date: Date; project: string; note: string | null }[] = [];
  try {
    const [projRows, taskRows, timeRows] = await Promise.all([
      prisma.project.findMany({
        where: { OR: [{ leadId: emp.id }, { members: { some: { employeeId: emp.id } } }] },
        include: { client: true, _count: { select: { tasks: true } } },
        orderBy: { createdAt: "desc" },
      }),
      prisma.task.findMany({
        where: { assigneeId: emp.id, status: { not: "DONE" } },
        include: { project: true },
        orderBy: [{ priority: "desc" }, { createdAt: "asc" }],
      }),
      prisma.timeEntry.findMany({
        where: { employeeId: emp.id },
        include: { project: true },
        orderBy: { date: "desc" },
        take: 15,
      }),
    ]);
    projects = projRows.map((p) => ({ id: p.id, code: p.code, name: p.name, status: p.status, client: p.client?.name || "Internal", tasks: p._count.tasks }));
    tasks = taskRows.map((t) => ({ id: t.id, title: t.title, status: t.status, priority: t.priority, project: t.project.name, projectId: t.projectId, dueDate: t.dueDate }));
    entries = timeRows.map((e) => ({ id: e.id, hours: e.hours, date: e.date, project: e.project.name, note: e.note }));
  } catch {
    /* DB optional */
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ink">My projects</h1>
      <p className="mt-1 text-sm text-slatey">Your assigned work, and log time against it.</p>
      <PortalProjects
        projects={projects}
        tasks={tasks}
        entries={entries.map((e) => ({ ...e, date: String(e.date) }))}
      />
    </>
  );
}
