// CRM helpers, labels and badge styles. Money/date formatting reused from projects.
import { money, fmtDate, titleCase } from "@/lib/projects";

export { money, fmtDate, titleCase };

export const DEAL_STAGES = ["NEW", "QUALIFIED", "PROPOSAL", "NEGOTIATION", "WON", "LOST"] as const;
export const OPEN_STAGES = ["NEW", "QUALIFIED", "PROPOSAL", "NEGOTIATION"] as const;
export const ACTIVITY_TYPES = ["NOTE", "CALL", "EMAIL", "MEETING", "TASK"] as const;

export const STAGE_LABELS: Record<string, string> = {
  NEW: "New",
  QUALIFIED: "Qualified",
  PROPOSAL: "Proposal",
  NEGOTIATION: "Negotiation",
  WON: "Won",
  LOST: "Lost",
};

// Sensible default win-probability per stage (user can override per deal).
export const STAGE_PROBABILITY: Record<string, number> = {
  NEW: 10,
  QUALIFIED: 25,
  PROPOSAL: 50,
  NEGOTIATION: 75,
  WON: 100,
  LOST: 0,
};

export const STAGE_STYLE: Record<string, string> = {
  NEW: "bg-slate-100 text-slatey",
  QUALIFIED: "bg-blue-100 text-blue-700",
  PROPOSAL: "bg-violet-100 text-violet-700",
  NEGOTIATION: "bg-amber-100 text-amber-700",
  WON: "bg-green-100 text-green-700",
  LOST: "bg-red-100 text-red-700",
};

// Accent for the top of each pipeline column.
export const STAGE_ACCENT: Record<string, string> = {
  NEW: "bg-slate-300",
  QUALIFIED: "bg-blue-400",
  PROPOSAL: "bg-violet-400",
  NEGOTIATION: "bg-amber-400",
  WON: "bg-green-500",
  LOST: "bg-red-400",
};

// ── Custom pipelines ────────────────────────────────────────────────────────
// Colour tokens a stage can use. Full literal class strings so Tailwind (which
// scans lib/) generates them. { chip: the stage pill · bar: column top accent }.
export const STAGE_COLORS: Record<string, { chip: string; bar: string; dot: string }> = {
  slate: { chip: "bg-slate-100 text-slatey", bar: "bg-slate-300", dot: "bg-slate-400" },
  blue: { chip: "bg-blue-100 text-blue-700", bar: "bg-blue-400", dot: "bg-blue-500" },
  violet: { chip: "bg-violet-100 text-violet-700", bar: "bg-violet-400", dot: "bg-violet-500" },
  amber: { chip: "bg-amber-100 text-amber-700", bar: "bg-amber-400", dot: "bg-amber-500" },
  green: { chip: "bg-green-100 text-green-700", bar: "bg-green-500", dot: "bg-green-500" },
  red: { chip: "bg-red-100 text-red-700", bar: "bg-red-400", dot: "bg-red-500" },
  teal: { chip: "bg-teal-100 text-teal-700", bar: "bg-teal-400", dot: "bg-teal-500" },
  pink: { chip: "bg-pink-100 text-pink-700", bar: "bg-pink-400", dot: "bg-pink-500" },
  orange: { chip: "bg-orange-100 text-orange-700", bar: "bg-orange-400", dot: "bg-orange-500" },
  brand: { chip: "bg-brand-50 text-brand-700", bar: "bg-brand-400", dot: "bg-brand-500" },
};
export const STAGE_COLOR_TOKENS = ["slate", "blue", "violet", "amber", "green", "red", "teal", "pink", "orange", "brand"] as const;
export const STAGE_KINDS = ["OPEN", "WON", "LOST"] as const;
export function stageColor(token?: string | null) {
  return STAGE_COLORS[token || "slate"] || STAGE_COLORS.slate;
}

export type StageLike = { id?: string; name?: string | null; kind?: string | null; color?: string | null; probability?: number } | null | undefined;
export type DealLike = { stage?: string | null; stageRef?: StageLike; value?: number; probability?: number; lastActivityAt?: string | Date | null; createdAt?: string | Date | null };

// Legacy enum → kind, so pre-migration deals (no stageRef) still classify.
function legacyKind(stage?: string | null): "OPEN" | "WON" | "LOST" {
  if (stage === "WON") return "WON";
  if (stage === "LOST") return "LOST";
  return "OPEN";
}
// The authoritative open/won/lost for a deal — stageRef.kind, falling back to
// the legacy enum for any deal not yet mapped onto a pipeline stage.
export function dealKind(d: DealLike): "OPEN" | "WON" | "LOST" {
  return (d.stageRef?.kind as "OPEN" | "WON" | "LOST") || legacyKind(d.stage);
}
export const dealIsOpen = (d: DealLike) => dealKind(d) === "OPEN";
export const dealIsWon = (d: DealLike) => dealKind(d) === "WON";
export function dealStageName(d: DealLike): string {
  return d.stageRef?.name || STAGE_LABELS[d.stage || "NEW"] || "—";
}
export function dealStageChip(d: DealLike): string {
  if (d.stageRef?.color) return stageColor(d.stageRef.color).chip;
  return STAGE_STYLE[d.stage || "NEW"] || STAGE_STYLE.NEW;
}

export const ACTIVITY_ICON: Record<string, "chat" | "phone" | "mail" | "video" | "check"> = {
  NOTE: "chat",
  CALL: "phone",
  EMAIL: "mail",
  MEETING: "video",
  TASK: "check",
};

export const isOpenStage = (stage: string) => (OPEN_STAGES as readonly string[]).includes(stage);

export function contactName(c?: { firstName: string; lastName?: string | null } | null) {
  if (!c) return "";
  return [c.firstName, c.lastName].filter(Boolean).join(" ");
}

// Weighted pipeline = sum(value * probability) over OPEN deals only.
export function weightedValue(deals: DealLike[]) {
  return deals
    .filter(dealIsOpen)
    .reduce((s, d) => s + Math.round(((d.value || 0) * (d.probability || 0)) / 100), 0);
}

// Total value of OPEN deals (un-weighted).
export function openValue(deals: DealLike[]) {
  return deals.filter(dealIsOpen).reduce((s, d) => s + (d.value || 0), 0);
}

// Where a deal's next follow-up sits relative to today.
export type FollowUp = "overdue" | "today" | "soon" | null;
export function followUpStatus(d?: string | Date | null): FollowUp {
  if (!d) return null;
  // Date-only fields are stored at UTC midnight. Compare calendar days (the
  // stored date's UTC day vs. the viewer's local day) so a US viewer isn't shown
  // a follow-up as overdue a day early. Works the same on server and client.
  const due = new Date(d);
  const dueDay = Date.UTC(due.getUTCFullYear(), due.getUTCMonth(), due.getUTCDate());
  const now = new Date();
  const todayDay = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((dueDay - todayDay) / 86400000);
  if (days < 0) return "overdue";
  if (days === 0) return "today";
  return "soon";
}
export const FOLLOWUP_STYLE: Record<string, string> = {
  overdue: "bg-red-100 text-red-700",
  today: "bg-amber-100 text-amber-700",
  soon: "bg-slate-100 text-slatey",
};

// Whole days the deal has sat in its current stage (null if unknown).
export function daysInStage(stageEnteredAt?: string | Date | null): number | null {
  if (!stageEnteredAt) return null;
  return Math.max(0, Math.floor((Date.now() - new Date(stageEnteredAt).getTime()) / 86400000));
}

// An OPEN deal with no activity in `days` days is "stale" and needs a nudge.
export function isStale(d: DealLike, days = 14): boolean {
  if (!dealIsOpen(d)) return false;
  const last = d.lastActivityAt || d.createdAt;
  if (!last) return true;
  return Date.now() - new Date(last).getTime() > days * 86400000;
}
