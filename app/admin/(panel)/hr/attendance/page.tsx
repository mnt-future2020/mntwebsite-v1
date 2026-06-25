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
    const existing: Record<
      string,
      {
        status: string;
        checkIn?: string | null;
        checkOut?: string | null;
        lateMinutes?: number;
        punches?: { type: string; at: string }[];
        breakMinutes?: number;
        onBreak?: boolean;
      }
    > = {};
    for (const r of records)
      existing[r.employeeId] = { status: r.status, checkIn: r.checkIn, checkOut: r.checkOut, lateMinutes: r.lateMinutes };

    // Self-service punches for the IST day → per-employee break summary + timeline,
    // so HR can see breaks / who's currently on break (scoped to the same employees).
    const empIds = employees.map((e) => e.id);
    const istDayStart = new Date(dateStr + "T00:00:00+05:30");
    const istDayEnd = new Date(dateStr + "T23:59:59.999+05:30");
    const punches = await prisma.attendancePunch.findMany({
      where: { employeeId: { in: empIds }, at: { gte: istDayStart, lte: istDayEnd } },
      orderBy: { at: "asc" },
    });
    const istTime = (d: Date) =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(d);
    const byEmp: Record<string, { type: string; at: Date }[]> = {};
    for (const p of punches) (byEmp[p.employeeId] ||= []).push({ type: p.type, at: p.at });
    for (const id of empIds) {
      const ps = byEmp[id];
      if (!ps || ps.length === 0) continue;
      let breakMs = 0;
      let openStart: Date | null = null;
      for (const p of ps) {
        if (p.type === "BREAK_START") openStart = p.at;
        else if (p.type === "BREAK_END" && openStart) {
          breakMs += p.at.getTime() - openStart.getTime();
          openStart = null;
        }
      }
      existing[id] = {
        ...(existing[id] || { status: "ABSENT" }),
        punches: ps.map((p) => ({ type: p.type, at: istTime(p.at) })),
        breakMinutes: Math.round(breakMs / 60000),
        onBreak: ps[ps.length - 1].type === "BREAK_START",
      };
    }
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
