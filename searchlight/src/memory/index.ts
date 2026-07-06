// Persistent, cross-run memory. Each Searchlight run is a fresh process (in CI,
// a thrown-away machine), so anything the agent should "remember" between runs
// must live in durable storage — a file, committed with the repo — not RAM.
//
// Memory answers three questions on every run:
//   • Did a human say "this is fine"?         → status "wontfix"  → never attempt
//   • Did the loop already give up on this?    → status "escalated" → skip, a human owns it
//   • What happened to this issue last time?   → note + attempts   → fed to the Fixer as context
//
// The key is Issue.id (`checkId:url:key`), which the Monitor derives
// deterministically, so the SAME defect maps to the SAME memory entry across runs.

import * as fs from "fs";
import * as path from "path";
import type { Issue, CheckId } from "../types";

export type MemoryStatus = "fixed" | "escalated" | "wontfix";

export interface MemoryEntry {
  /** Issue.id — stable across runs for the same defect. */
  key: string;
  page: string;
  checkId: CheckId;
  status: MemoryStatus;
  /** How many times the autonomous loop has given up on this (escalations). */
  attempts: number;
  firstSeen: string;
  lastSeen: string;
  /** Recent run ids that touched this entry (capped). */
  runIds: string[];
  /** Freeform: last failure reason, or the human's rationale for wontfix. */
  note?: string;
}

export interface MemoryStore {
  version: number;
  entries: Record<string, MemoryEntry>;
}

const EMPTY: MemoryStore = { version: 1, entries: {} };

/**
 * Memory lives alongside the package (searchlight/memory/memory.json), like
 * runs/. Unlike runs/ it is TRACKED in git — that is what makes it survive a
 * throw-away CI machine: the Shipper commits it with each run.
 */
export function memoryFilePath(): string {
  return path.resolve(__dirname, "..", "memory", "memory.json");
}

export function loadMemory(): MemoryStore {
  try {
    const raw = JSON.parse(fs.readFileSync(memoryFilePath(), "utf8")) as MemoryStore;
    if (!raw || typeof raw !== "object" || !raw.entries) return { ...EMPTY };
    return { version: raw.version || 1, entries: raw.entries };
  } catch {
    return { ...EMPTY };
  }
}

export function saveMemory(store: MemoryStore): string {
  const file = memoryFilePath();
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(store, null, 2) + "\n");
  return file;
}

function short(note: string | undefined): string | undefined {
  if (!note) return undefined;
  return note.replace(/\s+/g, " ").trim().slice(0, 300);
}

/**
 * Should the loop skip this issue entirely this run?
 *  - wontfix  → a human decided it is acceptable; never attempt.
 *  - escalated → the loop already exhausted its retries; a human owns it now.
 * (To retry an escalated issue, clear it: `searchlight memory --forget <key>`.)
 */
export function shouldSkip(store: MemoryStore, issue: Issue): { skip: boolean; reason?: string } {
  const e = store.entries[issue.id];
  if (!e) return { skip: false };
  if (e.status === "wontfix") return { skip: true, reason: "marked wontfix by a human" };
  if (e.status === "escalated")
    return { skip: true, reason: `escalated after ${e.attempts} failed attempt(s) — awaiting a human` };
  return { skip: false };
}

/** Record what happened to an issue this run. */
export function recordOutcome(
  store: MemoryStore,
  issue: Issue,
  status: MemoryStatus,
  runId: string,
  note?: string,
): void {
  const prev = store.entries[issue.id];
  const now = new Date().toISOString();
  store.entries[issue.id] = {
    key: issue.id,
    page: issue.url,
    checkId: issue.checkId,
    status,
    // Only an escalation counts as "the loop gave up once more".
    attempts: status === "escalated" ? (prev?.attempts || 0) + 1 : prev?.attempts || 0,
    firstSeen: prev?.firstSeen || now,
    lastSeen: now,
    runIds: [...(prev?.runIds || []), runId].slice(-20),
    note: short(note) ?? prev?.note,
  };
}

/**
 * A short history of this page for the Fixer's prompt, so it does not repeat a
 * fix that already failed and knows what was tried.
 */
export function noteForPage(store: MemoryStore, page: string): string {
  const entries = Object.values(store.entries).filter((e) => e.page === page);
  if (entries.length === 0) return "";
  return entries
    .map((e) => {
      const bits = [`[${e.checkId}] ${e.status}`];
      if (e.attempts > 1) bits.push(`${e.attempts}× failed`);
      if (e.note) bits.push(e.note.slice(0, 160));
      return `- ${bits.join(" — ")}`;
    })
    .join("\n");
}

/** Mark an entry (creating a stub if needed) as a human "won't fix — leave it". */
export function markWontfix(store: MemoryStore, key: string, reason?: string): boolean {
  const now = new Date().toISOString();
  const prev = store.entries[key];
  // key is `checkId:url:...`; recover checkId/page for a fresh stub.
  const checkId = (prev?.checkId || (key.split(":")[0] as CheckId) || "content") as CheckId;
  const page = prev?.page || key.split(":").slice(1, -1).join(":") || "";
  store.entries[key] = {
    key,
    page,
    checkId,
    status: "wontfix",
    attempts: prev?.attempts || 0,
    firstSeen: prev?.firstSeen || now,
    lastSeen: now,
    runIds: prev?.runIds || [],
    note: short(reason) || prev?.note || "Marked wontfix via CLI.",
  };
  return true;
}

/** Remove an entry — re-enables the loop to attempt it again next run. */
export function forget(store: MemoryStore, key: string): boolean {
  if (!store.entries[key]) return false;
  delete store.entries[key];
  return true;
}

export function memoryCounts(store: MemoryStore): Record<MemoryStatus, number> {
  const c: Record<MemoryStatus, number> = { fixed: 0, escalated: 0, wontfix: 0 };
  for (const e of Object.values(store.entries)) c[e.status]++;
  return c;
}

/** Plain-text render for the `memory` CLI command. */
export function renderMemory(store: MemoryStore): string {
  const entries = Object.values(store.entries);
  if (entries.length === 0)
    return "Searchlight memory is empty — no run has recorded an outcome yet.";
  const rank: Record<MemoryStatus, number> = { wontfix: 0, escalated: 1, fixed: 2 };
  entries.sort((a, b) => rank[a.status] - rank[b.status] || a.page.localeCompare(b.page));
  const icon: Record<MemoryStatus, string> = { fixed: "✓", escalated: "⚠", wontfix: "∅" };
  const counts = memoryCounts(store);
  const head = `Searchlight memory — ${entries.length} entr${entries.length === 1 ? "y" : "ies"} (${counts.fixed} fixed · ${counts.escalated} escalated · ${counts.wontfix} wontfix)`;
  const rows = entries
    .map(
      (e) =>
        `${icon[e.status]} ${e.status.padEnd(9)} ${e.key}${e.attempts > 1 ? `  (${e.attempts}× failed)` : ""}${e.note ? `\n    ↳ ${e.note}` : ""}`,
    )
    .join("\n");
  return `${head}\n\n${rows}`;
}
