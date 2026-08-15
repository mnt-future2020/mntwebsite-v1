# MnT Future — Content Topic Log

Running record of every blog angle already published. The `blog-sync` skill
reads this file BEFORE writing a new post and must not repeat any angle
listed here. After publishing, it appends a new row.

This lives in the repo (not Google Drive) specifically so the routine can
append to it with a normal file edit — the Drive connector can only create
new Docs, not edit existing ones, which is what produced duplicate
"Topic Log" docs in Drive before this file existed.

Market: US ONLY (India content is parked for later.)
Voice: MnT Future company voice. Company channels only — not Udhay's personal profile.

Format: `YYYY-MM-DD | Theme | Blog headline | Angle in one line | Primary keyword`

## Log

2026-08-04 | AI search, recommendations & shopping assistants | AI Reads Your Product Pages Worst. Here's the Fix. | Adobe's 2026 benchmark scores US retail product pages at 66% machine-readable, the lowest of any page type — the fix is a structured product data layer, not a copy rewrite | product page AI visibility
2026-08-04 | AI search, recommendations & shopping assistants | Why AI Shoppers Bounce at Your On-Site Search Box | AI-referred shoppers convert 42% better than average (Adobe, March 2026) but bounce at keyword-only on-site search, which still fails 72% of sites on core query types | AI site search for ecommerce
2026-08-05 | Commerce platform engineering | B2B Marketplaces Are Booming. The Backend Isn't. | US B2B marketplace sales grew 519% since 2021 and order-error rates climbed right alongside that growth (28% to 33%) — the storefront scaled faster than the real-time inventory and split-payment systems underneath it | B2B marketplace backend architecture
2026-08-06 | US compliance | ADA Overlay Widgets Won't Stop a Lawsuit in 2026 | Q1 2026 data shows 265 of 1,037 ADA lawsuits (25.55%) hit sites already running an accessibility overlay widget, up from 209 in Q1 2025, and Shopify-built sites were named in 44.26% of all filings — overlays don't fix the underlying markup | ADA accessibility overlay widget lawsuit
2026-08-07 | AI cleanup | The Vibe-Coded Store Breach: What US Brands Must Fix | A named January 2026 breach (Moltbook, built entirely through vibe coding) exposed 1.5 million API tokens and 35,000 email addresses in 72 hours — the same security-review and load-testing gaps that caused it show up in AI-built ecommerce stores | vibe coding security risks ecommerce
2026-08-08 | Proof — a real MnT build | Searchlight: The SEO Agent That Verifies Its Own Work | 2026 data shows audit agents are the highest-ROI agent workflow yet the hardest to move past pilot; Searchlight (MnT's own SEO/AEO agent, 5 agent roles, one dedicated purely to verification) is proof of the architecture — separating the acting role from the verifying role — that gets an agent out of pilot and into production | autonomous SEO agent case study
2026-08-09 | Market POV | AI Didn't Cut Your Dev Bill. It Moved It. | AI writes 20-30%+ of code at Microsoft and Google but GitClear data shows 30-40% gets rejected on first review — the cost shifted from writing code to reviewing it, which is exactly what a junior-heavy offshore-plus-AI model can't absorb on checkout, payments, and customer data | senior engineer AI code review
2026-08-10 | Agentic commerce & agent-readiness | AI Traffic Is Surging. Your Conversion Rate Isn't. | AI-driven traffic to US retail sites grew 805% YoY on Black Friday 2025 (Adobe) but ChatGPT-referred sessions convert 86% worse than affiliate links and sit under 0.2% of ecommerce traffic (Kaiser & Schulze) — the gap is a checkout problem, closed by exposing ACP, Google UCP, and Retail MCP rather than more discovery content | AI agent traffic conversion rate
2026-08-11 | AI search, recommendations & shopping assistants | AI Shopping Assistants Convert 154% Better. Yours Doesn't. | Gorgias's 2026 data shows AI-engaged shoppers convert 154% better and 93% of AI-recommended purchases close within 48 hours, but 96% of brands running conversational AI use it only for support — the lift comes from proactive recommendation grounded in live catalog and inventory data, not a reactive support bot | AI shopping assistant conversion rate
2026-08-12 | Commerce platform engineering | Composable Commerce ROI Is Proven. Migration Isn't Keeping Up. | MACH Alliance's 2025 research shows 9 in 10 adopters exceed ROI expectations on composable commerce, yet marketplace operators haven't migrated — the named blockers are leadership buy-in, change-resistant IT teams, and a skills gap higher than a monolith requires, which shows up hardest in real-time inventory sync and split payment orchestration | composable commerce for marketplaces
2026-08-13 | US compliance | PCI DSS 4.0.1: New Payment Page Script Rules | Requirements 6.4.3 and 11.6.1 went from best practice to mandatory on March 31, 2025 — payment-page script inventory with integrity verification and weekly tamper detection — and most stores still haven't done the audit, distinct from the Aug 6 ADA overlay-widget post | PCI DSS 4.0.1 payment page requirements
2026-08-14 | AI cleanup | Amazon's AI Code Broke Checkout. Is Your Store Next? | Amazon's March 2026 checkout outage (~6.3M lost orders, 6 hours) traced to an unreviewed AI-assisted code deployment, paired with Veracode's 2026 data showing AI code still fails security review 44% of the time — a production-reliability and missing-review-gate story, distinct from the Aug 7 breach/exposed-tokens post | AI-generated code ecommerce risk
2026-08-15 | Proof — a real MnT build | AI Cleanup Audit: Real Before/After Numbers | A before/after methodology deep-dive into MnT's own AI Cleanup Lab R&D build (7 findings → 0, 2 critical eliminated, 5/5 live exploits closed, ~48x throughput, ~50x lower p99 latency), framed honestly as our own reproducible lab rather than a client incident — distinct from the Aug 7 breach story and the Aug 14 Amazon outage post, which only linked to the lab in passing | AI cleanup audit ecommerce
