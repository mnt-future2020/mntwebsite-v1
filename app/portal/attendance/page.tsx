import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";
import { fmtDate, ATT_STATUS_STYLE } from "@/lib/hr";
import { PUNCH_LABEL } from "@/lib/org";

export const dynamic = "force-dynamic";

export default async function PortalAttendancePage() {
  const emp = await getCurrentEmployee();
  if (!emp) {
    return (
      <>
        <h1 className="text-2xl font-bold text-ink">My attendance</h1>
        <p className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          No employee profile linked to this account.
        </p>
      </>
    );
  }

  let records: { date: string; status: string; checkIn: string | null; checkOut: string | null; lateMinutes: number }[] = [];
  let punches: { type: string; time: string; date: string; withinFence: boolean; distanceM: number | null }[] = [];
  try {
    const [att, pun] = await Promise.all([
      prisma.attendance.findMany({ where: { employeeId: emp.id }, orderBy: { date: "desc" }, take: 30 }),
      prisma.attendancePunch.findMany({ where: { employeeId: emp.id }, orderBy: { at: "desc" }, take: 12 }),
    ]);
    records = att.map((a) => ({
      date: a.date.toISOString(),
      status: a.status,
      checkIn: a.checkIn,
      checkOut: a.checkOut,
      lateMinutes: a.lateMinutes,
    }));
    const fmtT = (d: Date) =>
      new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
    punches = pun.map((p) => ({
      type: p.type,
      time: fmtT(p.at),
      date: p.at.toISOString(),
      withinFence: p.withinFence,
      distanceM: p.distanceM,
    }));
  } catch {
    /* DB optional */
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-ink">My attendance</h1>
      <p className="mt-1 mb-6 text-sm text-slatey">Your last 30 days and recent location check-ins.</p>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-ink">Daily record</h2>
          {records.length === 0 ? (
            <p className="mt-4 text-sm text-slatey">No attendance recorded yet.</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-100 text-left text-xs text-slate-400">
                    <th className="pb-2 font-medium">Date</th>
                    <th className="pb-2 font-medium">Status</th>
                    <th className="pb-2 font-medium">In</th>
                    <th className="pb-2 font-medium">Out</th>
                    <th className="pb-2 font-medium">Late</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {records.map((r, i) => (
                    <tr key={i}>
                      <td className="py-2.5 text-ink">{fmtDate(r.date)}</td>
                      <td className="py-2.5">
                        <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${ATT_STATUS_STYLE[r.status] || ""}`}>
                          {r.status.charAt(0) + r.status.slice(1).toLowerCase().replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-2.5 text-slatey">{r.checkIn || "—"}</td>
                      <td className="py-2.5 text-slatey">{r.checkOut || "—"}</td>
                      <td className="py-2.5 text-slatey">{r.lateMinutes ? `${r.lateMinutes}m` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="h-fit rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-sm font-semibold text-ink">Recent punches</h2>
          {punches.length === 0 ? (
            <p className="mt-4 text-sm text-slatey">No scans yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {punches.map((p, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <div>
                    <p className="font-medium text-ink">{PUNCH_LABEL[p.type] || p.type}</p>
                    <p className="text-xs text-slate-400">
                      {fmtDate(p.date)}
                      {p.distanceM != null ? ` · ${p.distanceM}m` : ""}
                    </p>
                  </div>
                  <span className="font-semibold text-ink">{p.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
