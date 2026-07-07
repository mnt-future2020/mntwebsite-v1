import type { MonitorResult, Issue, Tier } from "./types";

const SEV_ICON: Record<string, string> = {
  critical: "[CRIT]",
  high: "[HIGH]",
  medium: "[MED ]",
  low: "[LOW ]",
};

/** Render a monitor result as a scannable text report for the console/digest. */
export function renderReport(r: MonitorResult): string {
  const lines: string[] = [];
  lines.push(`# Searchlight Monitor — ${r.baseUrl}`);
  lines.push(`Ran ${r.ranAt} · ${r.pagesCrawled} pages crawled · ${r.issues.length} issues found`);

  if (r.issues.length === 0) {
    lines.push("\n✅ No issues found.");
    return lines.join("\n");
  }

  const byTier: Record<Tier, Issue[]> = { auto: [], verify: [], escalate: [] };
  for (const i of r.issues) byTier[i.tier].push(i);

  const tierLabel: Record<Tier, string> = {
    auto: "AUTO — Fixer applies, Verifier gates",
    verify: "VERIFY-GATED — fixed, stricter regression bar",
    escalate: "ESCALATE — drafted, a human decides",
  };

  for (const tier of ["auto", "verify", "escalate"] as Tier[]) {
    const items = byTier[tier];
    if (!items.length) continue;
    lines.push(`\n## ${tierLabel[tier]}  (${items.length})`);
    for (const i of items) {
      const tag = i.source === "llm" ? " (AI)" : "";
      lines.push(`  ${SEV_ICON[i.severity]}${tag} ${i.title} — ${i.detail}`);
      lines.push(`         fix: ${i.recommendation}`);
      lines.push(`         page: ${i.url}`);
    }
  }

  lines.push(
    `\n— auto: ${byTier.auto.length} · verify-gated: ${byTier.verify.length} · escalate: ${byTier.escalate.length}`,
  );
  return lines.join("\n");
}
