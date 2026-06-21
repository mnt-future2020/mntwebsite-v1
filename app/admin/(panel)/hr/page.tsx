import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, StatCard, DbNotice } from "@/components/admin/ui";
import { fullName, fmtDate, LEAVE_STATUS_STYLE } from "@/lib/hr";

export const dynamic = "force-dynamic";

async function getData() {
  try {
    const now = new Date();
    const in30 = new Date(now.getTime() + 30 * 86400000);
    const [headcount, probation, pendingLeave, onLeaveToday, pendingList, probationDue] = await Promise.all([
      prisma.employee.count({ where: { status: { not: "EXITED" } } }),
      prisma.employee.count({ where: { status: "PROBATION" } }),
      prisma.leaveRequest.count({ where: { status: "PENDING" } }),
      prisma.leaveRequest.count({ where: { status: "APPROVED", startDate: { lte: now }, endDate: { gte: now } } }),
      prisma.leaveRequest.findMany({ where: { status: "PENDING" }, include: { employee: true }, orderBy: { createdAt: "desc" }, take: 6 }),
      prisma.employee.findMany({ where: { status: "PROBATION", probationEndDate: { not: null, lte: in30 } }, orderBy: { probationEndDate: "asc" }, take: 6 }),
    ]);
    return { headcount, probation, pendingLeave, onLeaveToday, pendingList, probationDue };
  } catch {
    return null;
  }
}

export default async function HrDashboard() {
  const d = await getData();
  return (
    <>
      <PageHeader title="Human resources" subtitle="Headcount, attendance, leave and payroll for MnT." />
      {!d ? (
        <DbNotice />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard label="Headcount" value={d.headcount} icon="users" href="/admin/hr/employees" />
            <StatCard label="On probation" value={d.probation} icon="clock" href="/admin/hr/employees" />
            <StatCard label="Pending leave" value={d.pendingLeave} icon="calendar" href="/admin/hr/leave" accent />
            <StatCard label="On leave today" value={d.onLeaveToday} icon="calendar" href="/admin/hr/attendance" />
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink">Pending leave requests</h2>
                <Link href="/admin/hr/leave" className="text-xs font-medium text-brand-700 hover:underline">View all</Link>
              </div>
              <div className="mt-4 divide-y divide-slate-100">
                {d.pendingList.length === 0 ? (
                  <p className="py-6 text-center text-sm text-slatey">Nothing pending. 🎉</p>
                ) : (
                  d.pendingList.map((l) => (
                    <div key={l.id} className="flex items-center justify-between py-3 text-sm">
                      <div>
                        <span className="font-medium text-ink">{fullName(l.employee)}</span>
                        <span className="ml-2 text-xs text-slate-400">{fmtDate(l.startDate)} → {fmtDate(l.endDate)}</span>
                      </div>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${LEAVE_STATUS_STYLE[l.status]}`}>{l.kind}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-ink">Probation reviews due (30 days)</h2>
                <Link href="/admin/hr/employees" className="text-xs font-medium text-brand-700 hover:underline">Employees</Link>
              </div>
              <div className="mt-4 divide-y divide-slate-100">
                {d.probationDue.length === 0 ? (
                  <p className="py-6 text-center text-sm text-slatey">No reviews due soon.</p>
                ) : (
                  d.probationDue.map((e) => (
                    <Link key={e.id} href={`/admin/hr/employees/${e.id}`} className="flex items-center justify-between py-3 text-sm hover:text-brand-700">
                      <span className="font-medium text-ink">{fullName(e)}</span>
                      <span className="text-xs text-slate-400">ends {fmtDate(e.probationEndDate)}</span>
                    </Link>
                  ))
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
