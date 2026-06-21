import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import AttendanceGrid from "@/components/admin/hr/AttendanceGrid";
import { fullName } from "@/lib/hr";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

async function getData(dateStr: string, scopeManagerId: string | null) {
  try {
    const day = new Date(dateStr);
    day.setHours(0, 0, 0, 0);
    const empWhere = scopeManagerId
      ? { status: { not: "EXITED" as const }, managerId: scopeManagerId }
      : { status: { not: "EXITED" as const } };
    const [employees, records] = await Promise.all([
      prisma.employee.findMany({ where: empWhere, orderBy: { code: "asc" } }),
      prisma.attendance.findMany({ where: { date: day } }),
    ]);
    const existing: Record<string, { status: string; checkIn?: string | null; checkOut?: string | null; lateMinutes?: number }> = {};
    for (const r of records) existing[r.employeeId] = { status: r.status, checkIn: r.checkIn, checkOut: r.checkOut, lateMinutes: r.lateMinutes };
    return { employees, existing };
  } catch {
    return null;
  }
}

export default async function AttendancePage(props: { searchParams: Promise<{ date?: string }> }) {
  const searchParams = await props.searchParams;
  const date = searchParams.date || todayStr();
  const session = await getSession();
  const scopeManagerId = session && session.role === "MANAGER" ? session.sub : null;
  const data = await getData(date, scopeManagerId);

  return (
    <>
      <PageHeader
        title="Attendance"
        subtitle={scopeManagerId ? "Your team's daily attendance." : "Mark and review daily attendance."}
      />
      {data === null ? (
        <DbNotice />
      ) : data.employees.length === 0 ? (
        <Empty icon="users" title="No employees yet" body="Add employees first to mark attendance." />
      ) : (
        <AttendanceGrid
          date={date}
          employees={data.employees.map((e) => ({ id: e.id, name: fullName(e), code: e.code }))}
          existing={data.existing}
        />
      )}
    </>
  );
}
