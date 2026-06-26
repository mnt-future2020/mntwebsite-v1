// Pure attendance punch state-machine — no prisma import, so it is safe to use
// in both the punch API route (server) and ScanPanel (client).

export type PunchType = "CHECK_IN" | "BREAK_START" | "BREAK_END" | "CHECK_OUT";

export const PUNCH_LABEL: Record<string, string> = {
  CHECK_IN: "Check in",
  BREAK_START: "Start break",
  BREAK_END: "Back from break",
  CHECK_OUT: "Check out",
};

// Which actions can an employee take next, given today's punch types in order
// (oldest → newest)?  While working (last punch is CHECK_IN or BREAK_END) they
// may EITHER take a break OR check out — the previous single-"next" logic could
// never reach CHECK_OUT, which is why check-out appeared broken.
export function allowedPunchTypes(types: string[]): PunchType[] {
  const last = types[types.length - 1];
  if (!last) return ["CHECK_IN"]; // not checked in yet
  if (last === "CHECK_OUT") return []; // done for the day
  if (last === "BREAK_START") return ["BREAK_END"]; // on break → must return first
  return ["BREAK_START", "CHECK_OUT"]; // working → break or check out
}

export function canPunch(types: string[], type: string): boolean {
  return (allowedPunchTypes(types) as string[]).includes(type);
}
