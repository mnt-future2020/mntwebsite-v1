"use client";

import { useRouter } from "next/navigation";

type Emp = { id: string; name: string; code: string };

const field =
  "rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function MonitoringControls({
  employees,
  employeeId,
  date,
}: {
  employees: Emp[];
  employeeId: string;
  date: string;
}) {
  const router = useRouter();
  const go = (emp: string, d: string) =>
    router.push(`/admin/hr/monitoring?employee=${encodeURIComponent(emp)}&date=${d}`);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-3">
      <select
        aria-label="Employee"
        value={employeeId}
        onChange={(e) => go(e.target.value, date)}
        className={`${field} w-full sm:w-64`}
      >
        {employees.map((e) => (
          <option key={e.id} value={e.id}>
            {e.name} · {e.code}
          </option>
        ))}
      </select>
      <input
        type="date"
        aria-label="Date"
        value={date}
        onChange={(e) => go(employeeId, e.target.value)}
        className={field}
      />
    </div>
  );
}
