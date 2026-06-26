import Link from "next/link";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { getOrgSettings } from "@/lib/org";
import { fullName } from "@/lib/hr";
import ScanPanel from "@/components/ScanPanel";

export const dynamic = "force-dynamic";

async function load(sub: string) {
  try {
    const emp = await prisma.employee.findUnique({ where: { id: sub } });
    if (!emp) return { emp: null, punches: [] as { type: string; time: string }[] };
    const dateStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
    const day = new Date(dateStr + "T00:00:00.000Z");
    const rows = await prisma.attendancePunch.findMany({
      where: { employeeId: emp.id, at: { gte: day } },
      orderBy: { at: "asc" },
    });
    const punches = rows.map((p) => ({
      type: p.type,
      time: new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(p.at),
    }));
    return { emp, punches };
  } catch {
    return { emp: null, punches: [] as { type: string; time: string }[] };
  }
}

export default async function ScanPage() {
  const session = await getSession();

  if (session?.sub === "admin") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-lg font-bold text-ink">Attendance scan</h1>
          <p className="mt-2 text-sm text-slatey">
            You're signed in as the super-admin, which has no employee profile. Sign in with an
            employee account to punch in.
          </p>
          <Link href="/admin/hr" className="btn-primary mt-5 inline-flex">
            Back to admin
          </Link>
        </div>
      </main>
    );
  }

  const org = await getOrgSettings();
  const { emp, punches } = session ? await load(session.sub) : { emp: null, punches: [] };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-brand-50/40 px-5 py-10">
      <Link
        href="/portal"
        aria-label="Back to portal"
        className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-slatey shadow-sm backdrop-blur transition-colors hover:text-ink"
      >
        <span aria-hidden="true">←</span> Portal
      </Link>
      <ScanPanel
        name={emp ? fullName(emp) : session?.email || ""}
        code={emp?.code || ""}
        workStart={emp?.workStart || org.workStart}
        workEnd={emp?.workEnd || org.workEnd}
        scanEnabled={org.scanEnabled}
        officeSet={org.officeLat != null && org.officeLng != null}
        radius={org.geofenceRadiusM}
        initialPunches={punches}
        hasProfile={!!emp}
      />
    </main>
  );
}
