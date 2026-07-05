import { execSync } from "child_process";
import type { Issue, VerifyResult } from "../types";
import type { SearchlightConfig } from "../config";

function run(cmd: string, cwd: string): { ok: boolean; output: string } {
  try {
    const output = execSync(cmd, {
      cwd,
      stdio: "pipe",
      encoding: "utf8",
      timeout: 15 * 60_000,
      maxBuffer: 32 * 1024 * 1024,
    });
    return { ok: true, output };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string };
    const output = `${err.stdout || ""}\n${err.stderr || ""}`.trim() || err.message || "command failed";
    return { ok: false, output };
  }
}

function tail(s: string, n = 40): string {
  return s.split("\n").slice(-n).join("\n").trim();
}

/**
 * Deterministic regression gate. A fix is only allowed to ship if the project
 * still typechecks and builds. On failure, `reason` carries the compiler/build
 * output so the Orchestrator can hand it back to the Fixer (the self-heal loop).
 */
export function runVerifier(issues: Issue[], config: SearchlightConfig): VerifyResult {
  const issueId = issues.map((i) => i.id).join(",");

  if (config.repo.typecheckCommand) {
    const tc = run(config.repo.typecheckCommand, config.repo.root);
    if (!tc.ok) {
      return {
        issueId,
        passed: false,
        regression: true,
        reason: `Typecheck failed after the fix:\n${tail(tc.output)}`,
      };
    }
  }

  const build = run(config.repo.buildCommand, config.repo.root);
  if (!build.ok) {
    return {
      issueId,
      passed: false,
      regression: true,
      reason: `Build failed after the fix:\n${tail(build.output)}`,
    };
  }

  return { issueId, passed: true, regression: false, reason: "Typecheck + build passed." };
}
