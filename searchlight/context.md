# MnT — Site Playbook (for the Searchlight Fixer)

Read this before editing. It defines the voice, the rules, and — most importantly —
**where things live**, so your fix lands in the right source file and survives a re-seed.

## What MnT is

**Magizh NexGen Technologies (MnT)** builds **AI-native, agent-ready commerce platforms for
US D2C & marketplace brands.** Two verticals, no generic "software/web development" language:

| Vertical | Route | What it is |
|---|---|---|
| **Commerce Platforms** | `/commerce` | Headless & marketplace builds, integrations/orchestration, B2B/wholesale, managed commerce & compliance |
| **AI & Agents** | `/ai-agents` | AI Commerce Starter, Agent-Ready Commerce (ACP/UCP/MCP), Embedded AI Agents, AI Cleanup |

Audience: **US** D2C founders, marketplace operators, and brands outgrowing templates. The
company's delivery base is in India — that's fine to state honestly, but the *positioning* is
"US commerce specialists," never "offshore dev shop."

## Voice

Confident, technical, US-commerce focused. AI-native, agent-ready. **No hype, no fluff.**
Front-load the hook. Short, concrete, benefit-led. Prefer verbs over adjectives.

## Hard rules — do not break these

- **No prices. No dollar figures. No "starting at $…".** Pricing is deliberately private.
- **Every primary CTA drives to one of the two magnets:** the **free architecture workshop**
  or the **free agent-readiness audit** (both go to `/contact`). Never invent a third CTA.
- **No healthcare.** MnT dropped that vertical. Never write HIPAA, ABDM, FHIR, telemedicine,
  "patient", or any health language. If you see it, it's a bug — but don't touch pages outside
  your assigned issues.
- **Compliance vocabulary is US-commerce:** ADA / WCAG accessibility, PCI DSS v4.0.1,
  sales-tax / economic-nexus (Avalara / Anrok), SOC 2, US privacy. Use these, not health/geo ones.
- Make the **smallest** change that fixes the issue. Don't restyle, rewrite, or "improve" copy
  that isn't part of the issue.

## Target keywords (weave in naturally, never stuff)

`agent-ready commerce` · `agentic commerce` · `headless commerce development` ·
`AI commerce platform` · `ACP OpenAI Stripe` · `AEO / AI-search visibility`

## Titles & meta descriptions

- **Title ≤ 60 chars.** Pattern: `Primary Value + Qualifier | MnT`. Keep the brand suffix.
- **Meta 70–155 chars.** Hook first, then the benefit, then a nudge to the workshop/audit.
- Keep every title/description **unique** per page.

**Good**
- Title: `Agent-Ready Commerce for US Brands | MnT` (40)
- Meta: `Make your store transactable in AI channels — ACP, Google UCP, and a Retail MCP server, with AEO monitoring. Book a free agent-readiness audit.` (145)

**Bad**
- `Custom E-Commerce & Web Development Services in India | MnT` (generic, offshore, over-length)
- `We build great software for your business` (no keyword, no hook, no CTA)

## Where things live — the map (edit the SOURCE, not built HTML)

Next.js 16 App Router + TypeScript. Per-page SEO flows through `resolveMetadata`.

| To fix… | Edit here |
|---|---|
| A page's **title / description** | `generateMetadata()` in that route's `app/**/page.tsx`, which calls `resolveMetadata("/path", { title, description })` (`lib/seo.ts`) |
| Site-wide **default** title/description/keywords | `app/layout.tsx` and `lib/settings.ts` (`DEFAULT_SETTINGS`) |
| **Service** page content (features, FAQ, schema) | `components/ServicePage.tsx` via each page's `ServiceConfig` |
| **Hub** page content | `components/HubPage.tsx` via each page's `HubConfig` |
| **JSON-LD** (Organization / Service / FAQPage / BreadcrumbList) | emitted by `app/layout.tsx`, `components/ServicePage.tsx`, `components/HubPage.tsx` — add/adjust the schema object there |
| **Navigation / labels** | `lib/site.ts` (centralized — `commerceNav`, `aiNav`, `companyNav`, `footerNav`) |
| **llms.txt / llms-full.txt** | `lib/llms.ts` |
| **Sitemap** | `app/sitemap.ts` |

## ⚠️ Make the fix STICK — the DB-wins gotcha

`resolveMetadata` merges the code default with a **DB `SeoSetting` override, and the DB WINS.**
The DB is populated by `scripts/seed-seo.mjs` (run via `npm run seed`).

So for any **title/description** fix:
1. Update the code default in the route's `generateMetadata` (`resolveMetadata(...)`), **and**
2. Update the same page's entry in `scripts/seed-seo.mjs`.

If you change only the code, a future `npm run seed` silently reverts your fix. Change both.
(You cannot see the live DB from here — just keep the seed source in sync with the code.)

## Never touch

`app/admin/**` · `app/portal/**` · `prisma/**` · `.env*` · `searchlight/**`
These are the app's private/back-office and Searchlight's own files. Out of bounds, always.

## Finish

End with a 2–4 line summary: which files you changed and why, and whether you updated the seed
source too (for title/meta fixes). Then the Verifier runs typecheck + build — keep it green.
