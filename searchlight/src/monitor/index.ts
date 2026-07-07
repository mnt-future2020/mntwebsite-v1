import type { MonitorResult } from "../types";
import type { SearchlightConfig } from "../config";
import { fetchSitemapUrls, fetchSnapshot, checkLinkStatus, mapLimit } from "./crawl";
import { runChecks, brokenLinkIssues } from "./checks";
import { runAnalyst } from "../analyst";

const SEVERITY_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

export interface MonitorOptions {
  /** Run the opt-in LLM Analyst pass after the deterministic checks. */
  deep?: boolean;
}

/** Crawl the site (via sitemap) and return the issue list (deterministic; + LLM if deep). */
export async function runMonitor(
  config: SearchlightConfig,
  opts: MonitorOptions = {},
): Promise<MonitorResult> {
  const base = config.site.baseUrl.replace(/\/$/, "");
  const sitemap = config.site.sitemapUrl || `${base}/sitemap.xml`;

  let urls: string[];
  try {
    urls = await fetchSitemapUrls(sitemap, config.checks.maxPages);
  } catch {
    urls = [];
  }
  if (urls.length === 0) urls = [base];

  const snapshots = await mapLimit(urls, 6, (u) => fetchSnapshot(u, base));
  const issues = runChecks(snapshots, config);

  if (config.checks.checkBrokenLinks) {
    const foundOn = new Map<string, string[]>();
    for (const s of snapshots) {
      for (const link of s.internalLinks) {
        if (!foundOn.has(link)) foundOn.set(link, []);
        foundOn.get(link)!.push(s.url);
      }
    }
    const unique = [...foundOn.keys()].slice(0, config.checks.maxLinksToCheck);
    const statuses = await mapLimit(unique, 8, async (link) => [link, await checkLinkStatus(link)] as const);
    const broken = new Map<string, number>();
    for (const [link, status] of statuses) {
      if (status === 0 || status >= 400) broken.set(link, status);
    }
    issues.push(...brokenLinkIssues(broken, foundOn, config));
  }

  // Opt-in LLM Analyst pass — judgment checks the deterministic Monitor can't
  // make. Non-fatal: without the SDK/key it logs and returns deterministic-only.
  if (opts.deep || config.analyst?.enabled) {
    try {
      const { pagesJudged, issues: llmIssues } = await runAnalyst(snapshots, config);
      issues.push(...llmIssues);
      console.log(
        `[searchlight] Analyst judged ${pagesJudged} page(s): +${llmIssues.length} quality/AEO issue(s).`,
      );
    } catch (e) {
      console.log(`[searchlight] Analyst skipped: ${(e as Error).message}`);
    }
  }

  issues.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

  return {
    ranAt: new Date().toISOString(),
    baseUrl: base,
    pagesCrawled: snapshots.length,
    issues,
    snapshots,
  };
}
