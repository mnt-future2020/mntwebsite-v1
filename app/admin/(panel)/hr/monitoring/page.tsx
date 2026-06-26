import { prisma } from "@/lib/db";
import { PageHeader, DbNotice, Empty } from "@/components/admin/ui";
import { fullName } from "@/lib/hr";
import { spacesConfigured, signedGetUrl } from "@/lib/spaces";
import MonitoringControls from "@/components/admin/hr/MonitoringControls";

export const dynamic = "force-dynamic";

const SUBTITLE = "Periodic work-session screenshots captured by the desktop agent.";

function todayStr() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
}
function istTime(d: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(d);
}

export default async function MonitoringPage(props: {
  searchParams: Promise<{ employee?: string; date?: string }>;
}) {
  const sp = await props.searchParams;
  const date = sp.date || todayStr();

  let employees: { id: string; name: string; code: string }[] = [];
  try {
    const rows = await prisma.employee.findMany({
      where: { status: { not: "EXITED" } },
      orderBy: { code: "asc" },
      select: { id: true, firstName: true, lastName: true, code: true },
    });
    employees = rows.map((e) => ({ id: e.id, name: fullName(e), code: e.code }));
  } catch {
    return (
      <>
        <PageHeader title="Screen monitoring" subtitle={SUBTITLE} />
        <DbNotice />
      </>
    );
  }

  if (employees.length === 0) {
    return (
      <>
        <PageHeader title="Screen monitoring" subtitle={SUBTITLE} />
        <Empty icon="users" title="No employees yet" body="Add employees first." />
      </>
    );
  }

  const employeeId = sp.employee && employees.some((e) => e.id === sp.employee) ? sp.employee : employees[0].id;

  let shots: { id: string; capturedAt: Date; storageKey: string }[] = [];
  try {
    const dayStart = new Date(date + "T00:00:00+05:30");
    const dayEnd = new Date(date + "T23:59:59.999+05:30");
    shots = await prisma.screenshot.findMany({
      where: { employeeId, capturedAt: { gte: dayStart, lte: dayEnd } },
      orderBy: { capturedAt: "desc" },
      select: { id: true, capturedAt: true, storageKey: true },
    });
  } catch {
    /* DB optional */
  }

  const items = spacesConfigured
    ? await Promise.all(
        shots.map(async (s) => ({ id: s.id, time: istTime(s.capturedAt), url: await signedGetUrl(s.storageKey) }))
      )
    : [];

  return (
    <>
      <PageHeader title="Screen monitoring" subtitle={SUBTITLE} />
      {!spacesConfigured && (
        <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Screenshot storage isn&apos;t configured yet — add the <code>SPACES_*</code> environment variables to enable it.
        </div>
      )}
      <MonitoringControls employees={employees} employeeId={employeeId} date={date} />
      {items.length === 0 ? (
        <Empty icon="eye" title="No screenshots" body="No captures for this employee on this date." />
      ) : (
        <>
          <p className="mb-3 text-xs text-slate-400">{items.length} capture(s) · newest first</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((s) => (
              // eslint-disable-next-line @next/next/no-img-element
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-colors hover:border-brand-200"
              >
                <img src={s.url} alt={`Screenshot at ${s.time}`} className="aspect-video w-full bg-slate-50 object-cover" loading="lazy" />
                <div className="px-2.5 py-1.5 text-xs font-medium text-slatey">{s.time}</div>
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
}
