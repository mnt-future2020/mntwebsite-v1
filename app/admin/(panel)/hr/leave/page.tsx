import { prisma } from "@/lib/db";
import { PageHeader, DbNotice } from "@/components/admin/ui";
import LeaveManager from "@/components/admin/hr/LeaveManager";
import { fullName } from "@/lib/hr";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

async function getData(scopeManagerId: string | null) {
  try {
    const empWhere = scopeManagerId
      ? { status: { not: "EXITED" as const }, managerId: scopeManagerId }
      : { status: { not: "EXITED" as const } };
    const leaveWhere = scopeManagerId ? { employee: { managerId: scopeManagerId } } : {};
    const [leaves, employees, holidays] = await Promise.all([
      prisma.leaveRequest.findMany({ where: leaveWhere, orderBy: { createdAt: "desc" }, include: { employee: true }, take: 100 }),
      prisma.employee.findMany({ where: empWhere, orderBy: { firstName: "asc" } }),
      prisma.holiday.findMany({ orderBy: { date: "asc" } }),
    ]);
    return { leaves, employees, holidays };
  } catch {
    return null;
  }
}

export default async function LeavePage() {
  const session = await getSession();
  const scopeManagerId = session && session.role === "MANAGER" ? session.sub : null;
  const data = await getData(scopeManagerId);
  return (
    <>
      <PageHeader
        title="Leave"
        subtitle={scopeManagerId ? "Approve your team's leave requests." : "Approve requests, log leave, and manage the holiday calendar."}
      />
      {data === null ? (
        <DbNotice />
      ) : (
        <LeaveManager
          leaves={data.leaves.map((l) => ({
            id: l.id,
            employeeId: l.employeeId,
            employeeName: fullName(l.employee),
            kind: l.kind,
            startDate: l.startDate.toISOString(),
            endDate: l.endDate.toISOString(),
            days: l.days,
            reason: l.reason,
            status: l.status,
          }))}
          employees={data.employees.map((e) => ({ id: e.id, name: fullName(e) }))}
          holidays={data.holidays.map((h) => ({ id: h.id, date: h.date.toISOString(), name: h.name }))}
        />
      )}
    </>
  );
}
