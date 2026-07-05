// Shared types for Searchlight. Kept framework-agnostic so the same Monitor/
// Verifier run against any project; only the Fixer + adapters are stack-aware.

export type Severity = "critical" | "high" | "medium" | "low";

/** How the orchestrator handles an issue. */
export type Tier = "auto" | "verify" | "escalate";

export type CheckId =
  | "titleLength"
  | "metaLength"
  | "missingMeta"
  | "schema"
  | "altText"
  | "canonical"
  | "h1"
  | "brokenLinks"
  | "cwv"
  | "content";

export interface Issue {
  /** Stable id so the same defect dedupes across runs. */
  id: string;
  checkId: CheckId;
  url: string;
  severity: Severity;
  tier: Tier;
  /** One-line human summary. */
  title: string;
  /** What's wrong, including the current value. */
  detail: string;
  /** What a correct fix should achieve (fed to the Fixer). */
  recommendation: string;
  evidence?: Record<string, unknown>;
}

export interface PageSnapshot {
  url: string;
  status: number;
  ok: boolean;
  title: string | null;
  metaDescription: string | null;
  h1Count: number;
  canonical: string | null;
  schemaTypes: string[];
  imagesMissingAlt: number;
  imageCount: number;
  internalLinks: string[];
  error?: string;
}

export interface MonitorResult {
  ranAt: string;
  baseUrl: string;
  pagesCrawled: number;
  issues: Issue[];
  snapshots: PageSnapshot[];
}

export interface FixResult {
  issueId: string;
  applied: boolean;
  filesChanged: string[];
  summary: string;
  error?: string;
}

export interface VerifyResult {
  issueId: string;
  passed: boolean;
  regression: boolean;
  reason: string;
}
