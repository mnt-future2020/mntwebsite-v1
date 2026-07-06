import * as fs from "fs";
import * as path from "path";
import type { Issue, Tier } from "./types";

export interface RunRecord {
  id: string;
  kind: "monitor" | "run";
  startedAt: string;
  finishedAt: string;
  baseUrl: string;
  pagesCrawled: number;
  issuesFound: number;
  byTier: Record<Tier, number>;
  fixedPages: string[];
  escalatedCount: number;
  /** Auto issues skipped because memory marks them wontfix/escalated. */
  memorySkipped?: number;
  shipped: { commit: string; pushed: boolean } | null;
  issues: Issue[];
}

// Run records live alongside the package (searchlight/runs), so history is
// portable with the project and independent of where the CLI is invoked from.
function runsDir(): string {
  return path.resolve(__dirname, "..", "runs");
}

export function byTierCounts(issues: Issue[]): Record<Tier, number> {
  const c: Record<Tier, number> = { auto: 0, verify: 0, escalate: 0 };
  for (const i of issues) c[i.tier]++;
  return c;
}

export function writeRunRecord(record: RunRecord): string {
  const dir = runsDir();
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, `${record.id}.json`), JSON.stringify(record, null, 2));

  const indexFile = path.join(dir, "index.json");
  let index: unknown[] = [];
  try {
    index = JSON.parse(fs.readFileSync(indexFile, "utf8"));
  } catch {
    index = [];
  }
  index.unshift({
    id: record.id,
    kind: record.kind,
    startedAt: record.startedAt,
    issuesFound: record.issuesFound,
    byTier: record.byTier,
    fixedPages: record.fixedPages.length,
    escalatedCount: record.escalatedCount,
    shipped: record.shipped,
  });
  fs.writeFileSync(indexFile, JSON.stringify(index.slice(0, 300), null, 2));
  return path.join(dir, `${record.id}.json`);
}

export function readRunRecords(limit = 30): RunRecord[] {
  const dir = runsDir();
  let index: Array<{ id: string }> = [];
  try {
    index = JSON.parse(fs.readFileSync(path.join(dir, "index.json"), "utf8"));
  } catch {
    return [];
  }
  const out: RunRecord[] = [];
  for (const entry of index.slice(0, limit)) {
    try {
      out.push(JSON.parse(fs.readFileSync(path.join(dir, `${entry.id}.json`), "utf8")));
    } catch {
      /* skip a missing/corrupt record */
    }
  }
  return out;
}

export function newRunId(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}
