import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";
import { inr, monthName } from "@/lib/hr";
import Icon from "@/components/Icon";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slatey",
  FINALIZED: "bg-blue-100 text-blue-700",
  PAID: "bg-green-100 text-green-700",
};

export default async function PortalPayslipsPage() {
  const emp = await getCurrentEmployee();
  if (!emp) {
    return (
      <>
        <h1 className="text-2xl font-bold text-ink">Payslips</h1>
        <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          No employee profile linked to this account.
        </p>
      </>
    );
  }

  let slips: {
    id: string;
    month: number;
    year: number;
    gross: number;
    totalDeductions: number;
    net: number;
    status: string;
  }[] = [];
  try {
    const rows = await prisma.payslip.findMany({
      where: { employeeId: emp.id, status: { not: "DRAFT" } },
      orderBy: [{ year: "desc" }, { month: "desc" }],
    });
    slips = rows.map((r) => ({
      id: r.id,
      month: r.month,
      year: r.year,
      gross: r.gross,
      totalDeductions: r.totalDeductions,
      net: r.net,
      status: r.status,
    }));
  } catch {
    /* DB optional */
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ink">Payslips</h1>
      <p className="mt-1 mb-6 text-sm text-slatey">Your finalized salary slips.</p>

      {slips.length === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
            <Icon name="wallet" className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-base font-semibold text-ink">No payslips yet</h3>
          <p className="mt-1 max-w-sm text-sm text-slatey">Finalized payslips from HR will show up here.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-left text-xs text-slate-400">
                <th className="px-5 py-3 font-medium">Month</th>
                <th className="px-5 py-3 font-medium">Gross</th>
                <th className="px-5 py-3 font-medium">Deductions</th>
                <th className="px-5 py-3 font-medium">Net pay</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {slips.map((s) => (
                <tr key={s.id}>
                  <td className="px-5 py-3.5 font-medium text-ink">{monthName(s.month)} {s.year}</td>
                  <td className="px-5 py-3.5 text-slatey">{inr(s.gross)}</td>
                  <td className="px-5 py-3.5 text-slatey">{inr(s.totalDeductions)}</td>
                  <td className="px-5 py-3.5 font-semibold text-ink">{inr(s.net)}</td>
                  <td className="px-5 py-3.5">
                    <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${STATUS_STYLE[s.status] || ""}`}>
                      {s.status.charAt(0) + s.status.slice(1).toLowerCase()}
                    </span>
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
