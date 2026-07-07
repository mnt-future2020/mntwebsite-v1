import type { Issue, PageSnapshot, Severity, CheckId } from "../types";
import { LLM_CHECK_IDS } from "../types";
import { loadContextText, type SearchlightConfig } from "../config";
import { ANALYST_SYSTEM_PROMPT } from "../agents";
import { mapLimit } from "../monitor/crawl";

/**
 * Lazy, untyped import of the Claude Agent SDK — same pattern as the Fixer, so
 * the deterministic Monitor/Verifier still run (and the package compiles)
 * WITHOUT the SDK installed. The Analyst only fires on `--deep` / analyst.enabled.
 */
async function loadSdk(): Promise<any> {
  try {
    // @ts-ignore — optional dependency resolved at runtime
    return await import("@anthropic-ai/claude-agent-sdk");
  } catch {
    throw new Error(
      "Analyst needs @anthropic-ai/claude-agent-sdk. Run `npm install` in searchlight/ and set ANTHROPIC_API_KEY.",
    );
  }
}

const SEVERITIES: Severity[] = ["critical", "high", "medium", "low"];

function pagePrompt(s: PageSnapshot, config: SearchlightConfig, context: string): string {
  return `${ANALYST_SYSTEM_PROMPT}

SITE: ${config.site.name} (${config.site.baseUrl})
TARGET KEYWORDS: ${config.targetKeywords.join(", ")}
BRAND VOICE: ${config.brandVoice}
${context ? `\nSITE PLAYBOOK:\n${context}\n` : ""}
PAGE TO JUDGE: ${s.url}
TITLE: ${s.title ?? "(none)"}
META DESCRIPTION: ${s.metaDescription ?? "(none)"}
HEADINGS:
${(s.headings || []).map((h) => `- ${h}`).join("\n") || "(none)"}
BODY EXCERPT:
${s.textExcerpt || "(none)"}

Return the JSON array now.`;
}

/** Parse the model's JSON array into validated Issues (defensive — bad output → []). */
function parseIssues(text: string, s: PageSnapshot, config: SearchlightConfig): Issue[] {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start < 0 || end <= start) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(text.slice(start, end + 1));
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];

  const issues: Issue[] = [];
  for (const raw of parsed) {
    if (!raw || typeof raw !== "object") continue;
    const o = raw as Record<string, unknown>;
    const checkId = o.checkId as CheckId;
    if (!LLM_CHECK_IDS.includes(checkId)) continue; // ignore mechanical/hallucinated ids
    const severity = (SEVERITIES.includes(o.severity as Severity) ? o.severity : "medium") as Severity;
    const title = String(o.title || "").trim().slice(0, 140);
    const detail = String(o.detail || "").trim().slice(0, 600);
    const recommendation = String(o.recommendation || "").trim().slice(0, 600);
    if (!title || !recommendation) continue;
    issues.push({
      id: `${checkId}:${s.url}:llm`,
      checkId,
      url: s.url,
      severity,
      tier: config.autoFix.tiers[checkId] ?? "escalate",
      title,
      detail,
      recommendation,
      source: "llm",
    });
  }
  return issues;
}

/** One judgment call for one page. No tools — a read-only quality verdict. */
async function judgePage(
  sdk: any,
  s: PageSnapshot,
  config: SearchlightConfig,
  context: string,
): Promise<Issue[]> {
  let out = "";
  try {
    for await (const message of sdk.query({
      prompt: pagePrompt(s, config, context),
      options: {
        model: config.analyst?.model || "claude-opus-4-8",
        permissionMode: "bypassPermissions",
        allowedTools: [],
        disallowedTools: ["Read", "Edit", "Write", "Glob", "Grep", "Bash"],
        maxTurns: 1,
        settingSources: [],
      },
    })) {
      if (message.type === "result") out = message.result || "";
    }
  } catch {
    return []; // a single page's failure never sinks the whole pass
  }
  return parseIssues(out, s, config);
}

export interface AnalystResult {
  pagesJudged: number;
  issues: Issue[];
}

/**
 * Opt-in LLM pass: judge quality/AEO issues the deterministic Monitor can't.
 * Runs on the already-crawled snapshots (no re-fetch), capped by analyst.maxPages.
 */
export async function runAnalyst(
  snapshots: PageSnapshot[],
  config: SearchlightConfig,
): Promise<AnalystResult> {
  const sdk = await loadSdk();
  const context = loadContextText(config);
  const cap = config.analyst?.maxPages ?? 12;
  const pages = snapshots.filter((s) => s.ok).slice(0, cap);
  const perPage = await mapLimit(pages, 3, (s) => judgePage(sdk, s, config, context));
  return { pagesJudged: pages.length, issues: perPage.flat() };
}
