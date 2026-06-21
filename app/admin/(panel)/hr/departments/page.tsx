import { prisma } from "@/lib/db";
import { PageHeader, DbNotice } from "@/components/admin/ui";
import DepartmentManager from "@/components/admin/hr/DepartmentManager";

export const dynamic = "force-dynamic";

async function getDepartments() {
  try {
    return await prisma.department.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { employees: true } } },
    });
  } catch {
    return null;
  }
}

export default async function DepartmentsPage() {
  const depts = await getDepartments();
  return (
    <>
      <PageHeader title="Departments" subtitle="Organise your team into departments." />
      {depts === null ? (
        <DbNotice />
      ) : (
        <DepartmentManager
          initial={depts.map((d) => ({ id: d.id, name: d.name, head: d.head, _count: d._count }))}
        />
      )}
    </>
  );
}
