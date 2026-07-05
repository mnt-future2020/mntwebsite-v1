import { loadConfig, defaultConfigPath } from "./config";
import { runMonitor } from "./monitor";
import { renderReport } from "./report";
import { orchestrate } from "./orchestrator";
import { runVerifier } from "./verifier";
import { writeRunRecord, byTierCounts, newRunId } from "./audit";
import { writeDashboard } from "./dashboard";

function flag(name: string): string | undefined {
  const i = process.argv.indexOf(`--${name}`);
  return i >= 0 ? process.argv[i + 1] : undefined;
}
function has(name: string): boolean {
  return process.argv.includes(`--${name}`);
}

const USAGE = `Searchlight — autonomous SEO/AEO agent

Usage: searchlight <command> [options]

Commands:
  monitor            Crawl the site and report issues (deterministic, no API key)
  run                Monitor → Fixer → Verifier loop (auto tier). Needs the Agent SDK + ANTHROPIC_API_KEY
  run --dry-run      Monitor + plan only; apply nothing
  run --ship         After verifying, auto-commit + push (triggers redeploy)
  verify             Run the regression gate (typecheck + build) on the repo
  dashboard          Generate a self-contained HTML dashboard (agents + run history)

Options:
  --config <path>     Path to searchlight.config.json (default: alongside the package)
  --url <baseUrl>     Override the site base URL (uses <baseUrl>/sitemap.xml)
  --ship / --no-ship  Force auto-push on/off (overrides config.deploy.enabled)`;

async function main() {
  const cmd = process.argv[2];
  if (!cmd || has("help") || cmd === "help") {
    console.log(USAGE);
    return;
  }

  const config = loadConfig(flag("config") || defaultConfigPath());
  const urlOverride = flag("url");
  if (urlOverride) {
    config.site.baseUrl = urlOverride;
    config.site.sitemapUrl = undefined;
  }

  // --ship / --no-ship override config.deploy.enabled
  const deployDefaults = {
    remote: "origin",
    branch: "main",
    commitPrefix: "searchlight: auto-fix SEO/AEO issues",
    push: true,
  };
  if (has("ship")) config.deploy = { ...deployDefaults, ...config.deploy, enabled: true };
  if (has("no-ship")) config.deploy = { ...deployDefaults, ...config.deploy, enabled: false };

  switch (cmd) {
    case "monitor": {
      const startedAt = new Date().toISOString();
      const result = await runMonitor(config);
      console.log(renderReport(result));
      writeRunRecord({
        id: newRunId(),
        kind: "monitor",
        startedAt,
        finishedAt: new Date().toISOString(),
        baseUrl: result.baseUrl,
        pagesCrawled: result.pagesCrawled,
        issuesFound: result.issues.length,
        byTier: byTierCounts(result.issues),
        fixedPages: [],
        escalatedCount: 0,
        shipped: null,
        issues: result.issues,
      });
      break;
    }
    case "run":
    case "fix": {
      const startedAt = new Date().toISOString();
      const res = await orchestrate(config, { dryRun: has("dry-run") });
      if (!has("dry-run")) {
        writeRunRecord({
          id: newRunId(),
          kind: "run",
          startedAt,
          finishedAt: new Date().toISOString(),
          baseUrl: res.monitor.baseUrl,
          pagesCrawled: res.monitor.pagesCrawled,
          issuesFound: res.monitor.issues.length,
          byTier: byTierCounts(res.monitor.issues),
          fixedPages: res.fixedPages,
          escalatedCount: res.escalated.length,
          shipped: res.deploy?.shipped ? { commit: res.deploy.commit || "", pushed: res.deploy.pushed } : null,
          issues: res.monitor.issues,
        });
      }
      break;
    }
    case "dashboard": {
      const file = writeDashboard(config);
      console.log(`Dashboard written: ${file}`);
      console.log("Open it in a browser (file://…) to see agents (model + system prompt) and run history.");
      break;
    }
    case "verify": {
      const v = runVerifier([], config);
      console.log(v.passed ? `✓ ${v.reason}` : `✗ ${v.reason}`);
      if (!v.passed) process.exit(1);
      break;
    }
    default:
      console.error(`Unknown command: ${cmd}\n\n${USAGE}`);
      process.exit(1);
  }
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
