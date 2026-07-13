// MnT HR policy constants (from company HR policy).
export const HR = {
  annualPaidLeave: 12,
  monthlyAccrual: 1,
  maxCarryForward: 5,
  probationMonths: 3,
  workStart: "09:30",
  workEnd: "18:30",
};

// Leave types that carry a balance, mapped to their Employee balance column.
// UNPAID (loss of pay) is intentionally absent — it has no balance.
export const LEAVE_TYPES = [
  { kind: "PAID", label: "Earned / Paid", field: "paidLeaveBalance" },
  { kind: "CASUAL", label: "Casual", field: "casualBalance" },
  { kind: "SICK", label: "Sick", field: "sickBalance" },
  { kind: "COMP_OFF", label: "Comp-off", field: "compOffBalance" },
] as const;

export type LeaveBalanceField = (typeof LEAVE_TYPES)[number]["field"];

// Which Employee balance column a leave kind draws from (null = no balance, e.g. UNPAID).
export function balanceFieldForKind(kind: string): LeaveBalanceField | null {
  return LEAVE_TYPES.find((t) => t.kind === kind)?.field ?? null;
}

export function fullName(e: { firstName: string; lastName?: string | null }) {
  return [e.firstName, e.lastName].filter(Boolean).join(" ");
}

export function initials(e: { firstName: string; lastName?: string | null }) {
  return [(e.firstName || "")[0], (e.lastName || "")[0]].filter(Boolean).join("").toUpperCase();
}

export function inr(n?: number | null) {
  if (n == null || n === 0) return "₹0";
  return "₹" + Number(n).toLocaleString("en-IN");
}

export function fmtDate(d?: Date | string | null) {
  if (!d) return "—";
  // Date-only values are stored at UTC midnight — format in UTC so the stored
  // calendar day shows correctly regardless of the viewer's timezone.
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
}

export function leaveDays(start: Date | string, end: Date | string) {
  const a = new Date(start);
  const b = new Date(end);
  a.setHours(0, 0, 0, 0);
  b.setHours(0, 0, 0, 0);
  const ms = b.getTime() - a.getTime();
  return Math.max(1, Math.round(ms / 86400000) + 1);
}

// Every day-start Date in [start, end] inclusive. Same normalization the
// attendance API uses (local midnight), so the dates line up on the
// (employeeId, date) unique key when a leave marks attendance.
export function eachDay(start: Date | string, end: Date | string): Date[] {
  const a = new Date(start);
  a.setHours(0, 0, 0, 0);
  const b = new Date(end);
  b.setHours(0, 0, 0, 0);
  const out: Date[] = [];
  for (let d = new Date(a); d <= b; d.setDate(d.getDate() + 1)) out.push(new Date(d));
  return out;
}

export type PayslipInput = {
  basic: number;
  hra: number;
  allowances: number;
  otherEarnings: number;
  pf: number;
  esi: number;
  professionalTax: number;
  tds: number;
  otherDeductions: number;
  lopDays: number;
};

export function computePayslip(p: PayslipInput) {
  const gross = (p.basic || 0) + (p.hra || 0) + (p.allowances || 0) + (p.otherEarnings || 0);
  const perDay = gross / 30;
  const lop = Math.round(perDay * (p.lopDays || 0));
  const totalDeductions =
    (p.pf || 0) + (p.esi || 0) + (p.professionalTax || 0) + (p.tds || 0) + (p.otherDeductions || 0) + lop;
  const net = gross - totalDeductions;
  return { gross, lop, totalDeductions, net };
}

// ── Salary auto-breakdown ───────────────────────────────────────────────────
// Split a monthly gross salary into Basic / HRA / Special Allowance using the
// company's configurable percentages (stored in OrgSetting, editable in HR
// settings). Allowance is the balancing figure so the parts always sum to the
// exact gross — no rounding drift.
export type SalarySplit = { basicPct: number; hraPctOfBasic: number };
export const DEFAULT_SALARY_SPLIT: SalarySplit = { basicPct: 50, hraPctOfBasic: 50 };

export function breakdownSalary(monthlyGross: number, split: SalarySplit = DEFAULT_SALARY_SPLIT) {
  const g = Math.max(0, Math.round(Number(monthlyGross) || 0));
  const basic = Math.round((g * (split.basicPct || 0)) / 100);
  const hra = Math.round((basic * (split.hraPctOfBasic || 0)) / 100);
  const allowances = Math.max(0, g - basic - hra);
  return { basic, hra, allowances, gross: g, ctcAnnual: g * 12 };
}

export function nextEmployeeCode(count: number) {
  return "MNT" + String(count + 1).padStart(3, "0");
}

export function monthName(m: number) {
  return (
    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][(m - 1) % 12] ||
    ""
  );
}

export const EMPLOYEE_STATUS_STYLE: Record<string, string> = {
  PROBATION: "bg-amber-100 text-amber-700",
  CONFIRMED: "bg-green-100 text-green-700",
  NOTICE: "bg-orange-100 text-orange-700",
  EXITED: "bg-slate-100 text-slatey",
};

export const LEAVE_STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  CANCELLED: "bg-slate-100 text-slatey",
};

export const ATT_STATUS_STYLE: Record<string, string> = {
  PRESENT: "bg-green-100 text-green-700",
  WFH: "bg-blue-100 text-blue-700",
  HALF_DAY: "bg-amber-100 text-amber-700",
  ABSENT: "bg-red-100 text-red-700",
  LEAVE: "bg-purple-100 text-purple-700",
  HOLIDAY: "bg-slate-100 text-slatey",
  WEEK_OFF: "bg-slate-100 text-slatey",
};
