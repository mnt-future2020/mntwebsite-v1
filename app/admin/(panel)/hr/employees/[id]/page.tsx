import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import EmployeeForm from "@/components/admin/hr/EmployeeForm";
import EmployeeDocs from "@/components/admin/hr/EmployeeDocs";
import { fullName, fmtDate, inr, monthName, LEAVE_STATUS_STYLE } from "@/lib/hr";
import { listRoles } from "@/lib/permissions-db";

export const dynamic = "force-dynamic";

export default async function EmployeeDetail(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const emp = await prisma.employee.findUnique({
    where: { id: params.id },
    include: {
      documents: { orderBy: { uploadedAt: "desc" } },
      leaves: { orderBy: { startDate: "desc" }, take: 6 },
      payslips: { orderBy: [{ year: "desc" }, { month: "desc" }], take: 6 },
      reviews: { orderBy: { createdAt: "desc" }, take: 6 },
    },
  }).catch(() => null);
  if (!emp) notFound();

  const [departments, managers, roles] = await Promise.all([
    prisma.department.findMany({ orderBy: { name: "asc" } }),
    prisma.employee.findMany({ where: { status: { not: "EXITED" } }, orderBy: { firstName: "asc" } }),
    listRoles(),
  ]);

  const sectionCard = "rounded-2xl border border-slate-200 bg-white p-6";

  return (
    <>
      <PageHeader title={fullName(emp)} subtitle={`${emp.code} · ${emp.designation || "—"}`} />

      <EmployeeForm
        initial={emp as unknown as Record<string, unknown>}
        departments={departments.map((d) => ({ id: d.id, label: d.name }))}
        managers={managers.map((m) => ({ id: m.id, label: fullName(m) }))}
        roles={roles.map((r) => ({ id: r.key, label: r.label }))}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className={sectionCard}>
          <h2 className="text-sm font-semibold text-ink">Documents</h2>
          <div className="mt-3">
            <EmployeeDocs employeeId={emp.id} initial={emp.documents.map((d) => ({ id: d.id, type: d.type, name: d.name, url: d.url }))} />
          </div>
        </div>

        <div className={sectionCard}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Leave history</h2>
            <Link href="/admin/hr/leave" className="text-xs font-medium text-brand-700 hover:underline">Manage</Link>
          </div>
          <div className="mt-3 divide-y divide-slate-100">
            {emp.leaves.length === 0 ? <p className="py-3 text-sm text-slatey">No leave records.</p> : emp.leaves.map((l) => (
              <div key={l.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-ink">{fmtDate(l.startDate)} → {fmtDate(l.endDate)} <span className="text-xs text-slate-400">· {l.days}d {l.kind}</span></span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${LEAVE_STATUS_STYLE[l.status]}`}>{l.status.charAt(0) + l.status.slice(1).toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Payslips</h2>
            <Link href="/admin/hr/payroll" className="text-xs font-medium text-brand-700 hover:underline">Payroll</Link>
          </div>
          <div className="mt-3 divide-y divide-slate-100">
            {emp.payslips.length === 0 ? <p className="py-3 text-sm text-slatey">No payslips yet.</p> : emp.payslips.map((p) => (
              <div key={p.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-ink">{monthName(p.month)} {p.year}</span>
                <span className="font-medium text-ink">{inr(p.net)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={sectionCard}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Performance reviews</h2>
            <Link href="/admin/hr/performance" className="text-xs font-medium text-brand-700 hover:underline">Reviews</Link>
          </div>
          <div className="mt-3 divide-y divide-slate-100">
            {emp.reviews.length === 0 ? <p className="py-3 text-sm text-slatey">No reviews yet.</p> : emp.reviews.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-2.5 text-sm">
                <span className="text-ink">{r.period} <span className="text-xs text-slate-400">· {"★".repeat(r.rating)}</span></span>
                <span className="text-xs text-slatey">{r.hikePercent ? `+${r.hikePercent}% hike` : ""}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
