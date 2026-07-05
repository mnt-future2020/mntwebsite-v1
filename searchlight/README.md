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

## Safety

- The Fixer runs `bypassPermissions` but is scoped to `Read/Edit/Write/Glob/Grep/Bash`, denies `rm`/`git push`/`git commit`, and is told to respect `neverTouch`.
- Nothing is committed or deployed by Searchlight — it edits the working tree; you review `git diff` and ship via your normal flow.
- The Verifier gate means a fix that breaks the build never survives — it loops back or escalates.

## Roadmap

- **Phase 1** — Search Console integration, content-gap drafting, AI-citation monitoring; per-issue re-verification against a preview build.
- **Phase 2** — extract adapters/connectors; run against a second repo; dashboard.
- **Phase 3** — package as the "Embedded SEO/AEO Agent" offering.

See the [product brief](../) for the full plan.
