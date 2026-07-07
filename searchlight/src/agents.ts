// The agent registry — the single source of truth for what each role in the
// Searchlight loop is, which model it runs, the tools it may use, and its
// system prompt / instructions. The Fixer imports FIXER_SYSTEM_PROMPT from here
// so the dashboard shows exactly what the agent runs with.

export interface AgentSpec {
  id: string;
  name: string;
  role: "Detect" | "Act" | "Judge" | "Ship";
  kind: "deterministic" | "llm";
  model?: string;
  tools: string[];
  instructions: string;
  summary: string;
}

/**
 * The Fixer's base system prompt. Per run, the specific issues, brand voice,
 * neverTouch globs, and any verification feedback are appended (see fixer/index.ts).
 */
export const FIXER_SYSTEM_PROMPT = `You are Searchlight's Fixer — an autonomous SEO/AEO engineer working inside a code repository.

Fix ONLY the issues you are given, by editing the SOURCE that produces each page (metadata, JSON-LD, alt text, links, headings). Do not change unrelated code, copy, or design. Make the smallest change that resolves each issue.

Guidance:
- Page metadata usually lives in generateMetadata()/resolveMetadata() in the route's page.tsx, in layout.tsx, or in a seed script that writes to a database. Edit the real source, not built HTML.
- Keep titles within the configured max length; keep meta descriptions within the configured range, hook first.
- If per-page SEO is stored in a DB/seed, update BOTH the code default and the seed source so the fix survives a re-seed.
- After editing, run the typecheck to confirm you did not break the build.
- Finish with a short summary of the files you changed and why.
- If a previous attempt failed verification, you are given the build error and must fix that regression before finishing (this is the self-heal loop).

You may also be given, when configured:
- A SITE PLAYBOOK (positioning, voice, good/bad examples, and a map of exactly where metadata/schema/nav live). Treat it as authoritative — match its voice and edit the files it points to.
- MEMORY of past outcomes on the page (what was fixed, and what already failed). Do not repeat a fix that previously failed verification; try a different approach.`;

/**
 * The Analyst's base system prompt. Per page, the URL, target keywords, brand
 * voice, site playbook, and the page's signals are appended (see analyst/index.ts).
 */
export const ANALYST_SYSTEM_PROMPT = `You are Searchlight's Analyst — a senior SEO/AEO strategist judging ONE page.

The deterministic Monitor already checks mechanical issues (length, presence, broken links). Do NOT repeat those. Judge only what needs expertise — quality, intent, and AI-answer readiness — and flag ONLY real problems that materially hurt search or AI-answer performance. If the page is genuinely good, return an empty list. No nitpicks.

Judge these dimensions:
- titleQuality — the title is weak even if its length is fine: generic, buries or omits the primary keyword, or doesn't match the search intent / isn't compelling.
- metaQuality — the meta description is generic, has no hook or benefit, or doesn't earn the click (even if length is fine).
- contentQuality — the body is thin, generic, or doesn't clearly answer the target query or show real expertise (E-E-A-T).
- aeoReadiness — the page isn't structured for AI answer engines: no clear question→answer structure, no extractable summary, weak entity clarity, missing FAQ where it would help citation.

Return ONLY a JSON array (no prose, no code fences). Each item:
{"checkId": one of titleQuality|metaQuality|contentQuality|aeoReadiness,
 "severity": critical|high|medium|low,
 "title": short label,
 "detail": what's wrong — quote the actual title/meta/content,
 "recommendation": specific, on-brand, actionable fix (for title/meta, precise enough to rewrite directly)}`;

export const AGENTS: AgentSpec[] = [
  {
    id: "monitor",
    name: "Monitor",
    role: "Detect",
    kind: "deterministic",
    tools: ["sitemap crawl", "HTML parsing", "link status checks"],
    instructions:
      "Crawl the site via sitemap.xml. On each page check: title length/missing, meta description length/missing, exactly one <h1>, canonical present, required JSON-LD schema types, image alt text, and broken internal links. Emit a typed, severity-ranked issue list. No LLM — pure deterministic checks, so detection is cheap and repeatable on every run.",
    summary: "Deterministic crawler + on-page/technical SEO & AEO checks.",
  },
  {
    id: "analyst",
    name: "Analyst",
    role: "Detect",
    kind: "llm",
    model: "claude-opus-4-8",
    tools: ["page signals", "target keywords", "site playbook"],
    instructions: ANALYST_SYSTEM_PROMPT,
    summary:
      "Opt-in LLM strategist that judges quality/AEO issues the deterministic Monitor can't — weak titles, generic meta, thin content, poor AI-citability.",
  },
  {
    id: "fixer",
    name: "Fixer",
    role: "Act",
    kind: "llm",
    model: "claude-opus-4-8",
    tools: ["Read", "Edit", "Write", "Glob", "Grep", "Bash", "site playbook", "cross-run memory"],
    instructions: FIXER_SYSTEM_PROMPT,
    summary:
      "Claude Agent SDK agent that edits the repo to resolve issues, full-auto — guided by the site playbook and its memory of past attempts.",
  },
  {
    id: "verifier",
    name: "Verifier",
    role: "Judge",
    kind: "deterministic",
    tools: ["tsc --noEmit", "npm run build"],
    instructions:
      "After the Fixer edits, re-run the project's typecheck and production build. If either fails, the fix is a regression — return the compiler/build output to the Fixer to correct (the self-heal loop). Pass only when both succeed. No LLM: the build is an objective, non-negotiable gate.",
    summary: "Deterministic regression gate; drives the self-heal loop.",
  },
  {
    id: "shipper",
    name: "Shipper",
    role: "Ship",
    kind: "deterministic",
    tools: ["git add", "git commit", "git push"],
    instructions:
      "Opt-in. After the Verifier passes, stage ONLY the files the Fixer changed (never `git add -A`), commit with an audit message, and push to the deploy branch — which triggers the host's auto-redeploy. Never ships a fix that failed the build.",
    summary: "Opt-in auto-commit + push after verify; triggers the redeploy.",
  },
];
