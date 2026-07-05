import { execSync } from "child_process";
import * as path from "path";
import type { SearchlightConfig } from "../config";

export interface DeployResult {
  shipped: boolean;
  committed: boolean;
  pushed: boolean;
  commit?: string;
  reason: string;
}

function git(args: string, cwd: string): { ok: boolean; out: string } {
  try {
    const out = execSync(`git ${args}`, { cwd, stdio: "pipe", encoding: "utf8" });
    return { ok: true, out: out.trim() };
  } catch (e) {
    const err = e as { stdout?: string; stderr?: string; message?: string };
    return { ok: false, out: `${err.stdout || ""}\n${err.stderr || ""}`.trim() || err.message || "git failed" };
  }
}

/**
 * The Shipper role: after the Verifier passes, stage ONLY the Fixer's changed
 * files, commit, and push to the deploy branch — which triggers the host's
 * auto-redeploy (e.g. DigitalOcean App Platform on push to main).
 *
 * Deterministic and OPT-IN — only runs when config.deploy.enabled is true.
 * Never uses `git add -A`, so unrelated working-tree changes are never shipped.
 */
export function runDeployer(
  config: SearchlightConfig,
  changedFiles: string[],
  summary: string,
): DeployResult {
  const d = config.deploy;
  if (!d?.enabled) {
    return { shipped: false, committed: false, pushed: false, reason: "deploy disabled (config.deploy.enabled = false)" };
  }

  const cwd = config.repo.root;
  const files = [...new Set(changedFiles)].filter(Boolean);
  if (files.length === 0) {
    return { shipped: false, committed: false, pushed: false, reason: "no Fixer-changed files to ship" };
  }

  // Stage only the files the Fixer touched (relative to the repo root).
  const rel = files.map((f) => path.relative(cwd, path.resolve(cwd, f)));
  const add = git(`add -- ${rel.map((f) => JSON.stringify(f)).join(" ")}`, cwd);
  if (!add.ok) {
    return { shipped: false, committed: false, pushed: false, reason: `git add failed: ${add.out}` };
  }

  const staged = git("diff --cached --name-only", cwd);
  if (staged.ok && staged.out === "") {
    return { shipped: false, committed: false, pushed: false, reason: "nothing staged (files may have been reverted)" };
  }

  const msg = `${d.commitPrefix}\n\n${summary}`.trim();
  const commit = git(
    `commit -m ${JSON.stringify(msg)} -m ${JSON.stringify("Co-Authored-By: Searchlight <noreply@mntfuture.com>")}`,
    cwd,
  );
  if (!commit.ok) {
    return { shipped: false, committed: false, pushed: false, reason: `git commit failed: ${commit.out}` };
  }
  const sha = git("rev-parse --short HEAD", cwd).out;

  if (!d.push) {
    return { shipped: true, committed: true, pushed: false, commit: sha, reason: `committed ${sha} (push disabled)` };
  }

  const push = git(`push ${d.remote} ${d.branch}`, cwd);
  if (!push.ok) {
    return { shipped: false, committed: true, pushed: false, commit: sha, reason: `committed ${sha} but push failed: ${push.out}` };
  }

  return {
    shipped: true,
    committed: true,
    pushed: true,
    commit: sha,
    reason: `shipped ${sha} → ${d.remote}/${d.branch} (host will auto-redeploy)`,
  };
}
