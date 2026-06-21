// Project-management helpers, labels and badge styles.
import { fmtDate } from "@/lib/hr";

export { fmtDate };

export function nextProjectCode(count: number) {
  return "PRJ-" + String(count + 1).padStart(3, "0");
}

export function nextInvoiceNumber(count: number) {
  return "INV-" + String(count + 1).padStart(4, "0");
}

export function money(n?: number | null, currency = "INR") {
  const v = Number(n || 0);
  if (currency === "INR") return "₹" + v.toLocaleString("en-IN");
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(v);
  } catch {
    return `${currency} ${v.toLocaleString()}`;
  }
}

export function hoursLabel(h?: number | null) {
  const v = Number(h || 0);
  return `${v % 1 === 0 ? v : v.toFixed(1)}h`;
}

// ─── Option lists (for selects) ───
export const PROJECT_STATUSES = ["DISCOVERY", "ACTIVE", "ON_HOLD", "COMPLETED", "CANCELLED"] as const;
export const BILLING_TYPES = ["FIXED", "HOURLY", "RETAINER"] as const;
export const CLIENT_STATUSES = ["PROSPECT", "ACTIVE", "INACTIVE"] as const;
export const TASK_STATUSES = ["BACKLOG", "TODO", "IN_PROGRESS", "REVIEW", "DONE"] as const;
export const TASK_PRIORITIES = ["LOW", "MEDIUM", "HIGH", "URGENT"] as const;
export const TASK_TYPES = ["FEATURE", "BUG", "CHORE", "RESEARCH"] as const;
export const SPRINT_STATUSES = ["PLANNED", "ACTIVE", "COMPLETED"] as const;
export const MILESTONE_STATUSES = ["PLANNED", "IN_PROGRESS", "DONE"] as const;
export const INVOICE_STATUSES = ["DRAFT", "SENT", "PAID", "OVERDUE"] as const;

// ─── Human labels ───
export function titleCase(s: string) {
  return s
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export const BILLING_LABELS: Record<string, string> = {
  FIXED: "Fixed bid",
  HOURLY: "Time & material",
  RETAINER: "Retainer",
};

export const TASK_STATUS_LABELS: Record<string, string> = {
  BACKLOG: "Backlog",
  TODO: "To do",
  IN_PROGRESS: "In progress",
  REVIEW: "In review",
  DONE: "Done",
};

// ─── Badge styles ───
export const PROJECT_STATUS_STYLE: Record<string, string> = {
  DISCOVERY: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-green-100 text-green-700",
  ON_HOLD: "bg-amber-100 text-amber-700",
  COMPLETED: "bg-slate-100 text-slatey",
  CANCELLED: "bg-red-100 text-red-700",
};

export const CLIENT_STATUS_STYLE: Record<string, string> = {
  PROSPECT: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-slate-100 text-slatey",
};

export const TASK_STATUS_STYLE: Record<string, string> = {
  BACKLOG: "bg-slate-100 text-slatey",
  TODO: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  REVIEW: "bg-purple-100 text-purple-700",
  DONE: "bg-green-100 text-green-700",
};

export const PRIORITY_STYLE: Record<string, string> = {
  LOW: "bg-slate-100 text-slatey",
  MEDIUM: "bg-blue-100 text-blue-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

export const SPRINT_STATUS_STYLE: Record<string, string> = {
  PLANNED: "bg-blue-100 text-blue-700",
  ACTIVE: "bg-green-100 text-green-700",
  COMPLETED: "bg-slate-100 text-slatey",
};

export const MILESTONE_STATUS_STYLE: Record<string, string> = {
  PLANNED: "bg-blue-100 text-blue-700",
  IN_PROGRESS: "bg-amber-100 text-amber-700",
  DONE: "bg-green-100 text-green-700",
};

export const INVOICE_STATUS_STYLE: Record<string, string> = {
  DRAFT: "bg-slate-100 text-slatey",
  SENT: "bg-blue-100 text-blue-700",
  PAID: "bg-green-100 text-green-700",
  OVERDUE: "bg-red-100 text-red-700",
};
