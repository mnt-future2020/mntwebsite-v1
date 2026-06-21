import Link from "next/link";
import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import Icon from "@/components/Icon";
import { fullName, initials, EMPLOYEE_STATUS_STYLE } from "@/lib/hr";

export const dynamic = "force-dynamic";

async function getEmployees() {
  try {
    return await prisma.employee.findMany({ orderBy: { code: "asc" }, include: { department: true } });
  } catch {
    return null;
  }
}

export default async function EmployeesPage() {
  const employees = await getEmployees();
  const action = (
    <Link href="/admin/hr/employees/new" className="btn-primary">
      <Icon name="plus" className="h-4 w-4" /> Add employee
    </Link>
  );

  return (
    <>
      <PageHeader title="Employees" subtitle="Your team directory and profiles." action={action} />
      {employees === null ? (
        <DbNotice />
      ) : employees.length === 0 ? (
        <Empty icon="users" title="No employees yet" body="Add your first team member to start the directory." action={action} />
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-left text-xs uppercase tracking-wide text-slatey">
              <tr>
                <th className="px-5 py-3 font-semibold">Employee</th>
                <th className="px-5 py-3 font-semibold">Designation</th>
                <th className="px-5 py-3 font-semibold">Department</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {employees.map((e) => (
                <tr key={e.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3">
                    <Link href={`/admin/hr/employees/${e.id}`} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
                        {initials(e) || "?"}
                      </span>
                      <span>
                        <span className="block font-medium text-ink">{fullName(e)}</span>
                        <span className="block text-xs text-slate-400">{e.code} · {e.level || "—"}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-5 py-3 text-slatey">{e.designation || "—"}</td>
                  <td className="px-5 py-3 text-slatey">{e.department?.name || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${EMPLOYEE_STATUS_STYLE[e.status]}`}>
                      {e.status.charAt(0) + e.status.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Link href={`/admin/hr/employees/${e.id}`} className="font-medium text-brand-700 hover:underline">Open</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
