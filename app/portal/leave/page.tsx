import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";
import LeaveSelfService from "@/components/portal/LeaveSelfService";

export const dynamic = "force-dynamic";

export default async function PortalLeavePage() {
  const emp = await getCurrentEmployee();

  if (!emp) {
    return (
      <>
        <h1 className="text-2xl font-bold text-ink">My leave</h1>
        <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          No employee profile linked to this account. Contact HR.
        </p>
      </>
    );
  }

  let leaves: {
    id: string;
    kind: string;
    startDate: string;
    endDate: string;
    days: number;
    reason: string | null;
    status: string;
    approverNote: string | null;
  }[] = [];
  try {
    const rows = await prisma.leaveRequest.findMany({
      where: { employeeId: emp.id },
      orderBy: { createdAt: "desc" },
    });
    leaves = rows.map((r) => ({
      id: r.id,
      kind: r.kind,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      days: r.days,
      reason: r.reason,
      status: r.status,
      approverNote: r.approverNote,
    }));
  } catch {
    /* DB optional */
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-ink">My leave</h1>
      <LeaveSelfService
        initial={leaves}
        balances={{
          paidLeaveBalance: emp.paidLeaveBalance ?? 0,
          casualBalance: emp.casualBalance ?? 0,
          sickBalance: emp.sickBalance ?? 0,
          compOffBalance: emp.compOffBalance ?? 0,
        }}
      />
    </>
  );
}
