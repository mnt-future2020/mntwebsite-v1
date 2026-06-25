import Icon from "@/components/Icon";
import { fmtDate } from "@/lib/hr";

type Holiday = { id: string; name: string; date: string };

// Employee-facing read-only holiday calendar. Past holidays are de-emphasized
// and the nearest upcoming one is badged "Next".
export default function HolidayList({ holidays }: { holidays: Holiday[] }) {
  const todayMid = new Date();
  todayMid.setHours(0, 0, 0, 0);
  const todayMs = todayMid.getTime();
  const nextIdx = holidays.findIndex((h) => new Date(h.date).getTime() >= todayMs);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
          <Icon name="calendar" className="h-4 w-4" />
        </span>
        <h2 className="text-sm font-semibold text-ink">Holiday calendar</h2>
      </div>

      {holidays.length === 0 ? (
        <p className="mt-4 text-sm text-slatey">No holidays published yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {holidays.map((h, i) => {
            const d = new Date(h.date);
            const past = d.getTime() < todayMs;
            const weekday = d.toLocaleDateString("en-GB", { weekday: "short" });
            return (
              <li key={h.id} className={`flex items-center justify-between py-2.5 ${past ? "opacity-50" : ""}`}>
                <div>
                  <p className={`text-sm font-medium ${past ? "text-slatey" : "text-ink"}`}>{h.name}</p>
                  <p className="text-xs text-slate-400">
                    {weekday} · {fmtDate(h.date)}
                  </p>
                </div>
                {i === nextIdx && (
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700">
                    Next
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
