import { loadConfig, defaultConfigPath } from "./config";
import { runMonitor } from "./monitor";
import { renderReport } from "./report";
import { orchestrate } from "./orchestrator";
import { runVerifier } from "./verifier";

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
      const result = await runMonitor(config);
      console.log(renderReport(result));
      break;
    }
    case "run":
    case "fix": {
      await orchestrate(config, { dryRun: has("dry-run") });
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
