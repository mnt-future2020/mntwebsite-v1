import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import EmployeeForm from "@/components/admin/hr/EmployeeForm";
import { fullName } from "@/lib/hr";
import { listRoles } from "@/lib/permissions-db";
import { getOrgSettings } from "@/lib/org";

export const dynamic = "force-dynamic";

async function getOptions() {
  try {
    const [departments, managers] = await Promise.all([
      prisma.department.findMany({ orderBy: { name: "asc" } }),
      prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    ]);
    return { departments, managers };
  } catch {
    return { departments: [], managers: [] };
  }
}

export default async function NewEmployeePage() {
  const [{ departments, managers }, roles, org] = await Promise.all([getOptions(), listRoles(), getOrgSettings()]);
  return (
    <>
      <PageHeader title="Add employee" subtitle="A new code (MNT###) is generated automatically." />
      <EmployeeForm
        departments={departments.map((d) => ({ id: d.id, label: d.name }))}
        managers={managers.map((m) => ({ id: m.id, label: fullName(m) }))}
        roles={roles.map((r) => ({ id: r.key, label: r.label }))}
        salarySplit={{ basicPct: org.salaryBasicPct, hraPctOfBasic: org.salaryHraPctOfBasic }}
      />
    </>
  );
}
