import type { Issue, FixResult } from "../types";
import type { SearchlightConfig } from "../config";

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

function buildPrompt(issues: Issue[], config: SearchlightConfig, retryFeedback?: string): string {
  const list = issues
    .map(
      (i, n) =>
        `${n + 1}. [${i.checkId}] ${i.title}\n   Page: ${i.url}\n   Problem: ${i.detail}\n   Fix goal: ${i.recommendation}`,
    )
    .join("\n\n");

  return `You are Searchlight's Fixer — an autonomous SEO/AEO engineer working in a ${config.repo.framework} repository.

Fix ONLY the issues below, by editing the SOURCE that produces each page (metadata, JSON-LD, alt text, links, headings). Do not change unrelated code, copy, or design. Make the smallest change that resolves each issue.

Brand voice for any copy you write: ${config.brandVoice}

NEVER edit files matching these globs: ${config.neverTouch.join(", ")}

ISSUES TO FIX:
${list}
${retryFeedback ? `\nYOUR PREVIOUS ATTEMPT FAILED VERIFICATION:\n${retryFeedback}\nFix the regression and complete the task.\n` : ""}
GUIDANCE (${config.repo.framework}):
- Page metadata usually lives in generateMetadata()/resolveMetadata() in the route's page.tsx, in app/layout.tsx, or in a seed script that writes to a DB. Find the real source and edit it there — not the built HTML.
- Keep titles <= ${config.checks.titleMaxLength} chars; meta descriptions ${config.checks.metaDescriptionMinLength}-${config.checks.metaDescriptionMaxLength} chars, hook first.
- If per-page SEO is stored in a database/seed, update BOTH the code default and the seed source so the fix survives a re-seed.
- After editing, run the typecheck to confirm you did not break the build.
- Finish with a short summary: which files you changed and why.`;
}

/**
 * Run the Fixer agent against a batch of issues (typically one page's worth).
 * Full-auto: bypasses permission prompts, scoped to an editing tool allow-list.
 */
export async function runFixer(
  issues: Issue[],
  config: SearchlightConfig,
  retryFeedback?: string,
): Promise<FixResult> {
  const sdk = await loadSdk();
  const prompt = buildPrompt(issues, config, retryFeedback);
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
