import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getCurrentEmployee } from "@/lib/portal";
import { inr, fmtDate } from "@/lib/hr";
import Icon, { IconName } from "@/components/Icon";

export const dynamic = "force-dynamic";

function NoProfile() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
      <p className="font-semibold">No employee profile linked</p>
      <p className="mt-2">
        This account isn&apos;t connected to an employee record yet (or the database isn&apos;t
        connected). If you&apos;re the admin, use the{" "}
        <Link href="/admin" className="font-semibold underline">admin panel</Link>. Otherwise contact HR.
      </p>
    </div>
  );
}

export default async function PortalHome() {
  const session = await getSession();
  const emp = await getCurrentEmployee();

  if (!emp) {
    return (
      <>
        <h1 className="text-2xl font-bold text-ink">Hello{session?.email ? `, ${session.email}` : ""}</h1>
        <p className="mt-1 mb-6 text-sm text-slatey">Your self-service workspace.</p>
        <NoProfile />
      </>
    );
  }

  // Today's attendance + pending leave + latest payslip.
  const dateStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
  const day = new Date(dateStr + "T00:00:00.000Z");
  let today: { status: string; checkIn: string | null; checkOut: string | null } | null = null;
  let pendingLeaves = 0;
  let latestPayslip: { month: number; year: number; net: number } | null = null;
  try {
    const [att, pend, slip] = await Promise.all([
      prisma.attendance.findUnique({ where: { employeeId_date: { employeeId: emp.id, date: day } } }),
      prisma.leaveRequest.count({ where: { employeeId: emp.id, status: "PENDING" } }),
      prisma.payslip.findFirst({ where: { employeeId: emp.id }, orderBy: [{ year: "desc" }, { month: "desc" }] }),
    ]);
    today = att ? { status: att.status, checkIn: att.checkIn, checkOut: att.checkOut } : null;
    pendingLeaves = pend;
    latestPayslip = slip ? { month: slip.month, year: slip.year, net: slip.net } : null;
  } catch {
    /* DB optional */
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ink">Hi {emp.firstName} 👋</h1>
      <p className="mt-1 text-sm text-slatey">
        {emp.designation || "Team member"} · {emp.code}
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <Stat icon="clock" label="Leave balance" value={`${(emp.paidLeaveBalance || 0) + (emp.casualBalance || 0) + (emp.sickBalance || 0) + (emp.compOffBalance || 0)} days`} />
        <Stat
          icon="calendar"
          label="Today"
          value={today ? `${today.checkIn || "—"}${today.checkOut ? ` → ${today.checkOut}` : ""}` : "Not marked"}
        />
        <Stat icon="bell" label="Pending leave" value={`${pendingLeaves}`} />
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Link href="/scan" className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white">
            <Icon name="compass" className="h-5 w-5" />
          </span>
          <h3 className="mt-3 font-semibold text-ink">Mark attendance</h3>
          <p className="mt-1 text-sm text-slatey">Check in, take a break, or check out — works within range of the office, no QR needed.</p>
        </Link>

        <Link href="/portal/leave" className="group rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
            <Icon name="clock" className="h-5 w-5" />
          </span>
          <h3 className="mt-3 font-semibold text-ink">Apply for leave</h3>
          <p className="mt-1 text-sm text-slatey">Request paid, sick, or casual leave and track approvals.</p>
        </Link>
      </div>

      {latestPayslip && (
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Latest payslip</p>
              <p className="mt-1 font-semibold text-ink">
                {new Date(latestPayslip.year, latestPayslip.month - 1).toLocaleDateString("en-GB", {
                  month: "long",
                  year: "numeric",
                })}{" "}
                · Net {inr(latestPayslip.net)}
              </p>
            </div>
            <Link href="/portal/payslips" className="text-sm font-semibold text-brand-700 hover:underline">
              View all
            </Link>
          </div>
        </div>
      )}

      <p className="mt-6 text-xs text-slate-400">Joined {fmtDate(emp.joinDate)} · status {emp.status}</p>
    </>
  );
}

function Stat({ icon, label, value }: { icon: IconName; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="mt-3 text-lg font-bold text-ink">{value}</div>
      <div className="mt-0.5 text-sm text-slatey">{label}</div>
    </div>
  );
}
