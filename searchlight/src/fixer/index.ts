import type { Issue, FixResult } from "../types";
import { loadContextText, type SearchlightConfig } from "../config";
import { FIXER_SYSTEM_PROMPT } from "../agents";

/**
 * Lazy, untyped import of the Claude Agent SDK. This keeps the Monitor and
 * Verifier runnable (and the package compilable) WITHOUT the SDK installed —
 * the SDK is only needed when actually fixing. Install it and set
 * ANTHROPIC_API_KEY before running `fix`/`run`.
 */
async function loadSdk(): Promise<any> {
  try {
    // @ts-ignore — optional dependency resolved at runtime
    return await import("@anthropic-ai/claude-agent-sdk");
  } catch {
    throw new Error(
      "Fixer needs @anthropic-ai/claude-agent-sdk. Run `npm install` in searchlight/ and set ANTHROPIC_API_KEY.",
    );
  }
}

function buildPrompt(
  issues: Issue[],
  config: SearchlightConfig,
  retryFeedback?: string,
  memoryNote?: string,
): string {
  const list = issues
    .map(
      (i, n) =>
        `${n + 1}. [${i.checkId}] ${i.title}\n   Page: ${i.url}\n   Problem: ${i.detail}\n   Fix goal: ${i.recommendation}`,
    )
    .join("\n\n");

  const context = loadContextText(config);

  return `${FIXER_SYSTEM_PROMPT}

Context for this run:
- Repository framework: ${config.repo.framework}
- Brand voice for any copy you write: ${config.brandVoice}
- NEVER edit files matching: ${config.neverTouch.join(", ")}
- Title max ${config.checks.titleMaxLength} chars; meta description ${config.checks.metaDescriptionMinLength}-${config.checks.metaDescriptionMaxLength} chars.
${context ? `\n===== SITE PLAYBOOK (authoritative for voice, structure, and where things live) =====\n${context}\n===== END PLAYBOOK =====\n` : ""}${memoryNote ? `\nMEMORY — past outcomes on this page (do NOT repeat a fix that already failed):\n${memoryNote}\n` : ""}
ISSUES TO FIX:
${list}
${retryFeedback ? `\nYOUR PREVIOUS ATTEMPT FAILED VERIFICATION:\n${retryFeedback}\nFix the regression and complete the task.\n` : ""}`;
}

/**
 * Run the Fixer agent against a batch of issues (typically one page's worth).
 * Full-auto: bypasses permission prompts, scoped to an editing tool allow-list.
 */
export async function runFixer(
  issues: Issue[],
  config: SearchlightConfig,
  retryFeedback?: string,
  memoryNote?: string,
): Promise<FixResult> {
  const sdk = await loadSdk();
  const prompt = buildPrompt(issues, config, retryFeedback, memoryNote);
  const id = issues.map((i) => i.id).join(",");
  const filesChanged: string[] = [];
  let summary = "";
  let applied = false;

  for await (const message of sdk.query({
    prompt,
    options: {
      model: "claude-opus-4-8",
      cwd: config.repo.root,
      permissionMode: "bypassPermissions",
      allowedTools: ["Read", "Edit", "Write", "Glob", "Grep", "Bash"],
      disallowedTools: ["Bash(rm:*)", "Bash(git push:*)", "Bash(git commit:*)"],
      maxTurns: 24,
      settingSources: [],
    },
  })) {
    if (message.type === "assistant") {
      for (const block of message.message?.content || []) {
        if (block.type === "tool_use" && (block.name === "Edit" || block.name === "Write")) {
          const p = block.input?.file_path;
          if (typeof p === "string" && !filesChanged.includes(p)) filesChanged.push(p);
        }
      }
    } else if (message.type === "result") {
      applied = message.subtype === "success";
      summary = message.result || "";
    }
  }

  return {
    issueId: id,
    applied,
    filesChanged,
    summary,
    error: applied ? undefined : summary || "Fixer did not complete successfully.",
  };
}
