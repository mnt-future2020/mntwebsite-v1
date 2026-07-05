import type { MonitorResult } from "../types";
import type { SearchlightConfig } from "../config";
import { fetchSitemapUrls, fetchSnapshot, checkLinkStatus, mapLimit } from "./crawl";
import { runChecks, brokenLinkIssues } from "./checks";

const SEVERITY_ORDER: Record<string, number> = { critical: 0, high: 1, medium: 2, low: 3 };

/** Crawl the site (via sitemap) and return the deterministic issue list. */
export async function runMonitor(config: SearchlightConfig): Promise<MonitorResult> {
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

  issues.sort((a, b) => SEVERITY_ORDER[a.severity] - SEVERITY_ORDER[b.severity]);

  return {
    ranAt: new Date().toISOString(),
    baseUrl: base,
    pagesCrawled: snapshots.length,
    issues,
    snapshots,
  };
}
