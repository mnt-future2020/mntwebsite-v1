import * as fs from "fs";
import * as path from "path";
import { AGENTS, type AgentSpec } from "./agents";
import { readRunRecords, type RunRecord } from "./audit";
import { loadMemory, memoryCounts, type MemoryEntry } from "./memory";
import type { SearchlightConfig } from "./config";

function esc(s: unknown): string {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const STYLE = `<style>
  :root{
    --ink:#0f1518;--panel:#141d21;--panel2:#0c1417;--line:#26332f;
    --text:#e8eeec;--muted:#93a2a6;--teal:#2dd4bf;--teal-d:#0d9488;
    --good:#4ade80;--warn:#fbbf24;--crit:#f87171;
    --mono:ui-monospace,"SF Mono","JetBrains Mono",Menlo,Consolas,monospace;
    --sans:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  }
  *{box-sizing:border-box}
  body{margin:0;background:var(--ink);color:var(--text);font-family:var(--sans);line-height:1.5}
  .wrap{max-width:1080px;margin:0 auto;padding:28px 20px 64px}
  header.top{display:flex;flex-wrap:wrap;gap:8px 16px;align-items:baseline;justify-content:space-between;border-bottom:1px solid var(--line);padding-bottom:18px}
  .brand{font-size:1.45rem;font-weight:700;letter-spacing:-.01em}
  .brand .g{color:var(--teal)}
  .meta{font-family:var(--mono);font-size:.74rem;color:var(--muted)}
  h2.sec{font-family:var(--mono);font-size:.72rem;letter-spacing:.18em;text-transform:uppercase;color:var(--teal-d);margin:34px 0 14px}
  .agents{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr))}
  .card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:16px}
  .card .h{display:flex;align-items:center;gap:8px}
  .name{font-weight:700}
  .badge{font-family:var(--mono);font-size:.64rem;padding:.14rem .45rem;border-radius:5px;border:1px solid var(--line);color:var(--muted);text-transform:uppercase;letter-spacing:.06em}
  .badge.llm{color:#0c1417;background:var(--teal);border-color:var(--teal)}
  .role{margin-left:auto;font-family:var(--mono);font-size:.66rem;color:var(--muted)}
  .summary{color:var(--muted);font-size:.9rem;margin:.5rem 0 .1rem}
  .kv{font-family:var(--mono);font-size:.72rem;color:var(--muted);margin-top:.35rem}
  .kv b{color:var(--text);font-weight:600}
  .chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:.55rem}
  .chip{font-family:var(--mono);font-size:.67rem;padding:.14rem .4rem;border-radius:5px;background:var(--panel2);border:1px solid var(--line);color:var(--muted)}
  details.prompt{margin-top:.65rem}
  details.prompt>summary{cursor:pointer;font-family:var(--mono);font-size:.72rem;color:var(--teal);list-style:none}
  details.prompt>summary::-webkit-details-marker{display:none}
  details.prompt>summary::before{content:"▸ ";color:var(--teal-d)}
  details.prompt[open]>summary::before{content:"▾ "}
  pre{white-space:pre-wrap;background:var(--panel2);border:1px solid var(--line);border-radius:8px;padding:12px;font-family:var(--mono);font-size:.76rem;color:#cdd6d3;overflow-x:auto;margin:.5rem 0 0}
  details.run{border:1px solid var(--line);border-radius:10px;background:var(--panel);margin-bottom:8px}
  details.run>summary{list-style:none;cursor:pointer;padding:.6rem .85rem;font-size:.86rem;display:flex;flex-wrap:wrap;gap:.35rem .8rem;align-items:center}
  details.run>summary::-webkit-details-marker{display:none}
  details.run[open]>summary{border-bottom:1px solid var(--line)}
  .run .when{font-family:var(--mono);font-size:.78rem;color:var(--teal)}
  .run .kind{font-family:var(--mono);font-size:.66rem;color:var(--muted);text-transform:uppercase}
  .run .body{padding:.55rem .85rem .75rem}
  .tallies{font-family:var(--mono);font-size:.74rem;color:var(--muted)}
  .pill{font-family:var(--mono);font-size:.66rem;padding:.12rem .42rem;border-radius:5px}
  .pill.ship{color:#0c1417;background:var(--good)}
  .pill.no{color:var(--muted);border:1px solid var(--line)}
  .mem{display:grid;gap:6px}
  .mrow{display:flex;flex-wrap:wrap;gap:.4rem .7rem;align-items:baseline;background:var(--panel);border:1px solid var(--line);border-radius:9px;padding:.5rem .7rem}
  .mrow .st{font-family:var(--mono);font-size:.64rem;text-transform:uppercase;letter-spacing:.06em;padding:.12rem .42rem;border-radius:5px}
  .st.fixed{color:#0c1417;background:var(--good)}
  .st.escalated{color:#0c1417;background:var(--warn)}
  .st.wontfix{color:var(--muted);border:1px solid var(--line)}
  .mrow .k{font-family:var(--mono);font-size:.74rem;color:#b8c4c1;word-break:break-all}
  .mrow .n{font-family:var(--mono);font-size:.7rem;color:var(--muted);width:100%;margin-top:.1rem}
  .issue{font-family:var(--mono);font-size:.75rem;color:#b8c4c1;padding:.18rem 0;border-top:1px solid #1b262a}
  .issue:first-child{border-top:0}
  .issue .sev{color:var(--warn)}
  .issue .u{color:#5b6b68}
  .empty{color:var(--muted);font-size:.9rem;padding:18px;border:1px dashed var(--line);border-radius:12px}
  a{color:var(--teal)}
</style>`;

function agentCard(a: AgentSpec): string {
  return `<div class="card">
    <div class="h">
      <span class="name">${esc(a.name)}</span>
      <span class="badge ${a.kind === "llm" ? "llm" : "det"}">${a.kind === "llm" ? "LLM" : "deterministic"}</span>
      <span class="role">${esc(a.role)}</span>
    </div>
    <div class="summary">${esc(a.summary)}</div>
    <div class="kv">model: <b>${a.model ? esc(a.model) : "— (no LLM)"}</b></div>
    <div class="chips">${a.tools.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>
    <details class="prompt"><summary>system prompt / instructions</summary><pre>${esc(a.instructions)}</pre></details>
  </div>`;
}

function runBlock(r: RunRecord): string {
  const when = esc(r.startedAt.replace("T", " ").slice(0, 19));
  const ship = r.shipped
    ? `<span class="pill ship">shipped ${esc(r.shipped.commit)}${r.shipped.pushed ? " ↑" : ""}</span>`
    : `<span class="pill no">not shipped</span>`;
  const issues = r.issues.length
    ? r.issues
        .slice(0, 60)
        .map(
          (i) =>
            `<div class="issue"><span class="sev">[${esc(i.severity)}]</span> ${esc(i.title)} — ${esc(i.detail)} <span class="u">${esc(i.url)}</span></div>`,
        )
        .join("") + (r.issues.length > 60 ? `<div class="issue">…and ${r.issues.length - 60} more</div>` : "")
    : `<div class="issue">No issues.</div>`;
  const fixed = r.fixedPages.length
    ? `<div class="tallies" style="margin-bottom:.4rem">fixed: ${r.fixedPages.map(esc).join(", ")}</div>`
    : "";
  return `<details class="run"><summary>
      <span class="when">${when}</span>
      <span class="kind">${esc(r.kind)}</span>
      <span class="tallies">${r.pagesCrawled} pages · ${r.issuesFound} issues (auto ${r.byTier.auto} / verify ${r.byTier.verify} / escalate ${r.byTier.escalate}) · fixed ${r.fixedPages.length} · escalated ${r.escalatedCount}</span>
      ${ship}
    </summary>
    <div class="body">${fixed}${issues}</div>
  </details>`;
}

function memRow(e: MemoryEntry): string {
  return `<div class="mrow">
    <span class="st ${esc(e.status)}">${esc(e.status)}</span>
    <span class="k">${esc(e.key)}</span>
    ${e.attempts > 1 ? `<span class="tallies">${e.attempts}× failed</span>` : ""}
    ${e.note ? `<span class="n">↳ ${esc(e.note)}</span>` : ""}
  </div>`;
}

function memorySection(): string {
  const store = loadMemory();
  const entries = Object.values(store.entries);
  if (entries.length === 0) {
    return `<div class="empty">No memory yet. After a <code>run</code>, fixed / escalated / wontfix outcomes are recorded here so the agent doesn't repeat itself.</div>`;
  }
  const rank: Record<string, number> = { wontfix: 0, escalated: 1, fixed: 2 };
  entries.sort((a, b) => rank[a.status] - rank[b.status] || a.page.localeCompare(b.page));
  const c = memoryCounts(store);
  return `<div class="tallies" style="margin-bottom:10px">${c.fixed} fixed · ${c.escalated} escalated · ${c.wontfix} wontfix</div>
    <div class="mem">${entries.map(memRow).join("")}</div>`;
}

export function renderDashboardInner(config: SearchlightConfig): string {
  const runs = readRunRecords(40);
  const generated = new Date().toISOString().replace("T", " ").slice(0, 19);
  const runsHtml = runs.length
    ? runs.map(runBlock).join("")
    : `<div class="empty">No runs yet. Run <code>node dist/cli.js monitor</code> or <code>run</code>, then regenerate.</div>`;

  return `${STYLE}
  <div class="wrap">
    <header class="top">
      <div class="brand">🔦 Searchlight <span class="g">dashboard</span></div>
      <div class="meta">${esc(config.site.name)} · ${esc(config.site.baseUrl)} · generated ${generated}</div>
    </header>

    <h2 class="sec">Agents — model · tools · system prompt</h2>
    <div class="agents">${AGENTS.map(agentCard).join("")}</div>

    <h2 class="sec">Memory — what the agent has learned</h2>
    ${memorySection()}

    <h2 class="sec">Runs — what the agents did (${runs.length})</h2>
    ${runsHtml}
  </div>`;
}

/** Write a standalone, self-contained dashboard.html (opens in any browser). */
export function writeDashboard(config: SearchlightConfig): string {
  const inner = renderDashboardInner(config);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Searchlight — ${esc(config.site.name)}</title></head><body>${inner}</body></html>`;
  const file = path.resolve(__dirname, "..", "dashboard.html");
  fs.writeFileSync(file, html);
  return file;
}
