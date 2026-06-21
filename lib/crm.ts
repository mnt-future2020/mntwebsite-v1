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
export function weightedValue(deals: { stage: string; value: number; probability: number }[]) {
  return deals
    .filter((d) => isOpenStage(d.stage))
    .reduce((s, d) => s + Math.round((d.value * d.probability) / 100), 0);
}
