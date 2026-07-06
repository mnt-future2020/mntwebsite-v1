# 🔦 Searchlight

An autonomous **SEO/AEO agent** that watches, fixes, and checks its own work — repo-native, built on the Claude Agent SDK. Phase 0.

It runs a three-role loop:

```
Monitor ─issues─▶ Fixer ─edits─▶ Verifier ─pass─▶ Shipper ─▶ push → host auto-redeploys
  ▲(deterministic) (Agent SDK)  (typecheck+build)  (git, opt-in)
  │                                    └─ fail → self-heal (back to Fixer) → escalate after N
  └─ runs on a schedule
```

- **Monitor** — deterministic. Crawls the site (via `sitemap.xml`) and flags on-page/technical SEO+AEO issues. No API key, no dependencies beyond Node 20+.
- **Fixer** — a Claude Agent SDK agent (`claude-opus-4-8`) that edits the repo to resolve issues, fully autonomous, scoped to an editing allow-list and a `neverTouch` list.
- **Verifier** — deterministic regression gate: the fix only ships if `tsc --noEmit` + the production build still pass. On failure it hands the build output back to the Fixer (the self-heal loop).
- **Orchestrator** — runs Monitor → Fixer → Verifier per page, retries on failure, escalates after `maxRetries`, then (if enabled) ships.
- **Shipper** — deterministic, **opt-in**. After the Verifier passes, commits the Fixer's changed files and pushes to the deploy branch, triggering the host's auto-redeploy.

## Setup

```bash
cd searchlight
npm install                 # only needed for `run`/`fix` (installs the Agent SDK)
export ANTHROPIC_API_KEY=…  # only needed for `run`/`fix`
npm run build               # compile src → dist
```

`monitor` and `verify` need **neither** the API key nor the Agent SDK.

## Commands

```bash
node dist/cli.js monitor                     # crawl + report (safe, read-only)
node dist/cli.js monitor --url https://x.com # audit any site ad-hoc
node dist/cli.js run --dry-run               # monitor + plan, apply nothing
node dist/cli.js run                         # full auto: fix the `auto` tier, verify each
node dist/cli.js verify                      # regression gate (typecheck + build) on the repo
node dist/cli.js dashboard                   # generate the agents + run-history dashboard (HTML)
node dist/cli.js memory                      # show what the agent has learned (fixed/escalated/wontfix)
```

Add `--config <path>` to point at another project's `searchlight.config.json`.

## Config (`searchlight.config.json`)

One file per project — this is what makes Searchlight reusable. Key fields:

| Field | What it does |
|---|---|
| `site.baseUrl` / `sitemapUrl` | What the Monitor crawls |
| `repo.root` | The project the Fixer edits (relative to the config file) |
| `repo.buildCommand` / `typecheckCommand` | The Verifier's regression gate |
| `checks.*` | Thresholds (title/meta length), required schema types, link-check budget |
| `autoFix.tiers` | Per-check tier: `auto` (ships after verify) · `verify` · `escalate` |
| `autoFix.maxRetries` | Self-heal attempts before escalating |
| `brandVoice` | Voice for any copy the Fixer writes |
| `neverTouch` | Globs the Fixer must never edit (admin, prisma, .env…) |
| `contextFile` | Path to a Markdown **site playbook** the Fixer reads before editing |

## What it checks (Phase 0)

Title length/missing · meta description length/missing · single `<h1>` · canonical · required JSON-LD schema · image alt text · broken internal links.

## Shipping / auto-deploy

The **Shipper** closes the loop to production. When `deploy.enabled` is `true` (or you pass `--ship`), after the Verifier passes it stages **only the Fixer's changed files**, commits, and pushes to `deploy.branch` — which triggers your host's auto-redeploy (DigitalOcean App Platform redeploys on push to `main`).

```json
"deploy": { "enabled": true, "remote": "origin", "branch": "main", "commitPrefix": "searchlight: auto-fix SEO/AEO issues", "push": true }
```

```bash
node dist/cli.js run --ship      # force on for one run
node dist/cli.js run --no-ship   # force off
```

- **Default OFF** — turn it on deliberately.
- Never uses `git add -A` — only the files the Fixer changed are staged.
- A fix that fails the build is **never** shipped — it self-heals or escalates first.
- **Why push, not "dynamic"?** Only DB-backed metadata could update live without a deploy; schema, alt text, content, and links live in code, so a redeploy is required to reflect them. Auto-push covers every fix type — the standard agent → CI/CD pattern.

## Monitoring (dashboard)

Every `monitor`/`run` writes a structured record to `searchlight/runs/`. Generate a self-contained HTML dashboard from them:

```bash
node dist/cli.js dashboard   # writes searchlight/dashboard.html — open in a browser
```

It shows two things:
- **Agents** — every role's **model**, **tools**, and full **system prompt / instructions** (from `src/agents.ts`, the single source of truth the Fixer also runs on).
- **Runs** — history of what the agents did: issues found (by tier), pages fixed, escalations, and the commit each run shipped. Each run expands to its issue list.

## Knowledge & memory — how the agent "knows" the site

The agents don't store a trained-in copy of the site. Each run assembles knowledge fresh from
three durable sources, plus Claude's built-in SEO/coding expertise:

1. **The live site** — the Monitor crawls `sitemap.xml` and reads each page's HTML every run.
2. **The site playbook** (`contextFile` → [`context.md`](context.md)) — positioning, voice,
   good/bad title-meta examples, and a **map of where metadata/schema/nav live** so the Fixer
   edits the right source (and keeps the DB seed in sync so fixes survive a re-seed). It's fed
   into the Fixer's prompt on every fix.
3. **Persistent memory** (`memory/memory.json`) — what the loop learned in past runs.

### Memory (survives across runs)

Each run is a fresh process — in CI, a thrown-away machine — so "remembering" needs durable
storage, not RAM. After each run the loop records an outcome per issue:

| Status | Meaning | Next run |
|---|---|---|
| `fixed` | fixed and passed the build gate | re-fixes only if it reappears |
| `escalated` | all retries failed — a human owns it | **skipped** (no wasted API/build time) |
| `wontfix` | a human said "leave it" | **skipped**, always |

This is what stops the agent re-attempting the same failed fix, or re-touching something a human
already accepted. The Fixer is also shown the page's history so it won't repeat a fix that failed.

```bash
node dist/cli.js memory                       # list what's been learned
node dist/cli.js memory --wontfix "<key>"     # accept an issue — never auto-attempt it again
node dist/cli.js memory --forget  "<key>"     # drop an entry — re-enables auto-fixing (retry an escalation)
node dist/cli.js memory --clear               # wipe all memory
```

`memory/memory.json` is **tracked in git** (unlike `runs/`): when the Shipper ships a fix it
commits the memory file too, so what was learned persists to the next CI run.

## Safety

- The Fixer runs `bypassPermissions` but is scoped to `Read/Edit/Write/Glob/Grep/Bash`, denies `rm`/`git push`/`git commit`, and is told to respect `neverTouch`.
- Nothing is committed or deployed by Searchlight — it edits the working tree; you review `git diff` and ship via your normal flow.
- The Verifier gate means a fix that breaks the build never survives — it loops back or escalates.

## Roadmap

- **Done** — site playbook (`context.md`) + persistent cross-run memory (fixed/escalated/wontfix), fed into the Fixer so it stays on-brand and doesn't repeat failed fixes.
- **Phase 1** — Search Console integration, content-gap drafting, AI-citation monitoring; per-issue re-verification against a preview build.
- **Phase 2** — extract adapters/connectors; run against a second repo; dashboard.
- **Phase 3** — package as the "Embedded SEO/AEO Agent" offering.

See the [product brief](../) for the full plan.
