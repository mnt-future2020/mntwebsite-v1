import type { Issue, PageSnapshot, CheckId, Severity } from "../types";
import type { SearchlightConfig } from "../config";

function mk(
  config: SearchlightConfig,
  checkId: CheckId,
  url: string,
  key: string,
  severity: Severity,
  title: string,
  detail: string,
  recommendation: string,
  evidence?: Record<string, unknown>,
): Issue {
  return {
    id: `${checkId}:${url}:${key}`,
    checkId,
    url,
    severity,
    tier: config.autoFix.tiers[checkId],
    title,
    detail,
    recommendation,
    evidence,
  };
}

/** Deterministic on-page checks over crawled snapshots. */
export function runChecks(snapshots: PageSnapshot[], config: SearchlightConfig): Issue[] {
  const issues: Issue[] = [];
  const c = config.checks;

  for (const s of snapshots) {
    if (!s.ok) {
      issues.push(
        mk(config, "brokenLinks", s.url, "self", "critical", `Page returns ${s.status || "error"}`,
          `${s.url} responded ${s.status}${s.error ? ` (${s.error})` : ""}`,
          "Page in the sitemap must return 200."),
      );
      continue;
    }

    // Title
    if (!s.title) {
      issues.push(mk(config, "titleLength", s.url, "missing", "high", "Missing <title>",
        `No title tag on ${s.url}`, "Add a unique, keyword-relevant title under 60 characters."));
    } else if (s.title.length > c.titleMaxLength) {
      issues.push(mk(config, "titleLength", s.url, "long", "medium", "Title too long",
        `Title is ${s.title.length} chars (max ${c.titleMaxLength}): "${s.title}"`,
        `Trim the title to <= ${c.titleMaxLength} chars, keeping the primary keyword.`,
        { length: s.title.length, title: s.title }));
    }

    // Meta description
    if (!s.metaDescription) {
      issues.push(mk(config, "missingMeta", s.url, "missing", "high", "Missing meta description",
        `No meta description on ${s.url}`,
        `Add a compelling meta description ${c.metaDescriptionMinLength}-${c.metaDescriptionMaxLength} chars, hook first.`));
    } else if (s.metaDescription.length > c.metaDescriptionMaxLength) {
      issues.push(mk(config, "metaLength", s.url, "long", "medium", "Meta description too long",
        `Meta is ${s.metaDescription.length} chars (max ${c.metaDescriptionMaxLength})`,
        `Rewrite to <= ${c.metaDescriptionMaxLength} chars, front-loading the hook.`,
        { length: s.metaDescription.length, meta: s.metaDescription }));
    } else if (s.metaDescription.length < c.metaDescriptionMinLength) {
      issues.push(mk(config, "metaLength", s.url, "short", "low", "Meta description too short",
        `Meta is ${s.metaDescription.length} chars (min ${c.metaDescriptionMinLength})`,
        `Expand to ${c.metaDescriptionMinLength}-${c.metaDescriptionMaxLength} chars with a benefit + CTA.`,
        { length: s.metaDescription.length }));
    }

    // H1
    if (s.h1Count === 0) {
      issues.push(mk(config, "h1", s.url, "missing", "medium", "No <h1>",
        `${s.url} has no H1`, "Add exactly one H1 containing the primary keyword."));
    } else if (s.h1Count > 1) {
      issues.push(mk(config, "h1", s.url, "multiple", "low", "Multiple <h1>",
        `${s.url} has ${s.h1Count} H1 tags`, "Use exactly one H1 per page.", { count: s.h1Count }));
    }

    // Canonical
    if (!s.canonical) {
      issues.push(mk(config, "canonical", s.url, "missing", "medium", "Missing canonical",
        `${s.url} has no canonical link`, "Add a self-referencing canonical URL."));
    }

    // Schema
    for (const req of c.requireSchemaTypes) {
      if (!s.schemaTypes.includes(req)) {
        issues.push(mk(config, "schema", s.url, `missing-${req}`, "medium", `Missing ${req} schema`,
          `${s.url} has no ${req} JSON-LD (found: ${s.schemaTypes.join(", ") || "none"})`,
          `Add valid ${req} JSON-LD structured data.`, { found: s.schemaTypes }));
      }
    }

    // Alt text
    if (s.imagesMissingAlt > 0) {
      issues.push(mk(config, "altText", s.url, "missing", "low", "Images missing alt text",
        `${s.imagesMissingAlt}/${s.imageCount} images on ${s.url} lack alt text`,
        "Add descriptive alt text to every image.",
        { missing: s.imagesMissingAlt, total: s.imageCount }));
    }
  }

  return issues;
}

/** Turn a broken-link map into issues (attributed to the first page they appear on). */
export function brokenLinkIssues(
  broken: Map<string, number>,
  foundOn: Map<string, string[]>,
  config: SearchlightConfig,
): Issue[] {
  const issues: Issue[] = [];
  for (const [link, status] of broken) {
    const pages = foundOn.get(link) || [];
    issues.push({
      id: `brokenLinks:link:${link}`,
      checkId: "brokenLinks",
      url: pages[0] || link,
      severity: "high",
      tier: config.autoFix.tiers.brokenLinks,
      title: "Broken internal link",
      detail: `${link} returns ${status || "network error"} (linked from ${pages.length} page(s))`,
      recommendation: `Fix or remove links to ${link}.`,
      evidence: { link, status, linkedFrom: pages.slice(0, 10) },
    });
  }
  return issues;
}
