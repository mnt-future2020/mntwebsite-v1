import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import PayrollManager from "@/components/admin/hr/PayrollManager";
import { fullName } from "@/lib/hr";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const [slips, employees] = await Promise.all([
      prisma.payslip.findMany({ orderBy: [{ year: "desc" }, { month: "desc" }], include: { employee: true }, take: 100 }),
      prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    ]);
    return { slips, employees };
  } catch {
    return null;
  }
}

export default async function PayrollPage() {
  const data = await getData();
  return (
    <>
      <PageHeader title="Payroll" subtitle="Generate monthly payslips with auto gross/net calculation." />
      {data === null ? (
        <DbNotice />
      ) : data.employees.length === 0 ? (
        <Empty icon="users" title="No employees yet" body="Add employees first to run payroll." />
      ) : (
        <PayrollManager
          slips={data.slips.map((p) => ({ id: p.id, employeeId: p.employeeId, employeeName: fullName(p.employee), month: p.month, year: p.year, gross: p.gross, net: p.net, status: p.status }))}
          employees={data.employees.map((e) => ({ id: e.id, name: fullName(e), basic: e.basic, hra: e.hra, allowances: e.allowances }))}
        />
      )}
    </>
  );
}
