import type { SearchlightConfig } from "./config";
import type { Issue, MonitorResult } from "./types";
import { runMonitor } from "./monitor";
import { runFixer } from "./fixer";
import { runVerifier } from "./verifier";
import { runDeployer, type DeployResult } from "./deployer";

export interface OrchestrateResult {
  monitor: MonitorResult;
  fixedPages: string[];
  escalated: Issue[];
  verifyGated: Issue[];
  deploy?: DeployResult;
}

export interface OrchestrateOptions {
  dryRun?: boolean;
}

const log = (m: string) => console.log(`[searchlight] ${m}`);

/**
 * The autonomous loop: Monitor → (per page) Fixer → Verifier → ship / self-heal / escalate.
 * Full-auto for the `auto` tier; the Verifier (deterministic build gate) is the safety net.
 */
export async function orchestrate(
  config: SearchlightConfig,
  opts: OrchestrateOptions = {},
): Promise<OrchestrateResult> {
  log("Monitoring…");
  const monitor = await runMonitor(config);
  log(`${monitor.issues.length} issues across ${monitor.pagesCrawled} pages.`);

  const auto = monitor.issues.filter((i) => i.tier === "auto");
  const verifyGated = monitor.issues.filter((i) => i.tier === "verify");
  const escalated = monitor.issues.filter((i) => i.tier === "escalate");

  if (opts.dryRun) {
    log("Dry run — reporting only, no fixes applied.");
    return { monitor, fixedPages: [], escalated, verifyGated };
  }
  if (auto.length === 0) {
    log("No auto-fixable issues to apply.");
    return { monitor, fixedPages: [], escalated, verifyGated };
  }

  // Group auto issues by page so the Fixer makes one coherent edit per page.
  const byPage = new Map<string, Issue[]>();
  for (const i of auto) {
    if (!byPage.has(i.url)) byPage.set(i.url, []);
    byPage.get(i.url)!.push(i);
  }

  const fixedPages: string[] = [];
  const changedFiles: string[] = [];
  for (const [page, issues] of byPage) {
    log(`Fixing ${issues.length} issue(s) on ${page}…`);
    let feedback: string | undefined;
    let success = false;

    for (let attempt = 0; attempt <= config.autoFix.maxRetries; attempt++) {
      const fix = await runFixer(issues, config, feedback);
      if (!fix.applied) {
        feedback = `Fixer error: ${fix.error}`;
        log(`  attempt ${attempt + 1}/${config.autoFix.maxRetries + 1}: fixer did not complete — retrying`);
        continue;
      }
      log(`  edited ${fix.filesChanged.length} file(s) — verifying (typecheck + build)…`);
      const verdict = runVerifier(issues, config);
      if (verdict.passed) {
        success = true;
        fixedPages.push(page);
        changedFiles.push(...fix.filesChanged);
        log(`  ✓ verified and kept.`);
        break;
      }
      feedback = verdict.reason;
      log(`  ✗ verification failed — self-healing (attempt ${attempt + 1}): ${verdict.reason.split("\n")[0]}`);
    }

    if (!success) {
      log(`  ⚠ escalating ${page} to a human after ${config.autoFix.maxRetries + 1} attempts.`);
      escalated.push(...issues);
    }
  }

  log(
    `Fixed ${fixedPages.length} page(s). Verify-gated (not auto-run this phase): ${verifyGated.length}. Escalated: ${escalated.length}.`,
  );

  // Shipper role — opt-in. Only ships after the Verifier passed, and only the
  // files the Fixer actually changed.
  let deploy: DeployResult | undefined;
  if (config.deploy?.enabled && fixedPages.length > 0 && changedFiles.length > 0) {
    log("Shipping (Verifier passed)…");
    deploy = runDeployer(
      config,
      changedFiles,
      `Auto-fixed ${auto.length} SEO/AEO issue(s) across ${fixedPages.length} page(s): ${fixedPages.join(", ")}`,
    );
    log(deploy.shipped ? `  ✓ ${deploy.reason}` : `  ⚠ not shipped: ${deploy.reason}`);
  } else if (config.deploy?.enabled) {
    log("Shipping skipped — nothing verified to ship.");
  }

  return { monitor, fixedPages, escalated, verifyGated, deploy };
}
