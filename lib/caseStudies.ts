import type { IconName } from "@/components/Icon";

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  type: string; // honest label, e.g. "Platform · Built by MnT"
  category: string;
  cover: string; // OG / social + card image
  heroShot: string; // product mockup shown in the hero
  liveUrl?: string;
  liveLabel?: string;
  summary: string;
  facts: { value: string; label: string }[];
  scope: { label: string; value: string }[];
  problem: string;
  approach: { no: string; title: string; desc: string }[];
  build: { audience: string; icon: IconName; points: string[] }[];
  productShots: { src: string; title: string; desc: string }[];
  highlights: { icon: IconName; title: string; desc: string }[];
  techDecisions: { tech: string; used: string; advantage: string }[];
  stack: { group: string; items: string[] }[];
  metaTitle: string;
  metaDescription: string;
  /* ——— Best-format extensions (optional, AEO-oriented) ——— */
  /** ISO date for Article schema (datePublished). */
  dateISO?: string;
  /** URL shown in the hero browser-frame chrome. */
  frameUrl?: string;
  /** Question-style H2 for the results section (AI-answer extractable). */
  resultsTitle?: string;
  /** Answer-first summary (~40–75 words) stating the outcomes as plain facts. */
  resultsIntro?: string;
  /** Before → after proof table. Only real, honest values. */
  results?: { metric: string; before: string; after: string }[];
  /** Real questions buyers ask — rendered + emitted as FAQPage JSON-LD. */
  faq?: { q: string; a: string }[];
  /** Per-story section headings & CTA copy (defaults are generic). */
  copy?: {
    challengeTitle?: string;
    buildTitle?: string;
    highlightsSubtitle?: string;
    techTitle?: string;
    ctaTitle?: string;
    ctaBody?: string;
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "lobbi",
    title: "LOBBI",
    tagline:
      "A two-sided marketplace with an embedded AI booking agent — three apps, real-time inventory and split payments, engineered end to end.",
    type: "Platform · Built by MnT",
    category: "Two-sided marketplace · AI booking agent",
    cover: "/work/lobbi-cover-v2.png",
    heroShot: "/work/lobbi-owner.webp",
    liveUrl: "https://lobbi.in",
    liveLabel: "Visit lobbi.in",
    frameUrl: "lobbi.in",
    summary:
      "LOBBI is a live two-sided marketplace: players discover and book sports venues, owners run slots, pricing and payouts. MnT designed and engineered all of it — a player app, a venue-owner app, a web app, a real-time FastAPI backend with marketplace payments, and an embedded AI booking agent in WhatsApp. It's the same architecture a US marketplace needs: real-time inventory, split payouts, and an AI agent that transacts safely.",
    facts: [
      { value: "3", label: "Apps shipped (2 native + web)" },
      { value: "Real-time", label: "Live slot availability" },
      { value: "Cashfree", label: "Payments & payouts" },
      { value: "Live", label: "On Google Play" },
    ],
    scope: [
      { label: "Role", value: "Product design + full-stack engineering" },
      { label: "Platforms", value: "iOS · Android · Web" },
      { label: "Delivered", value: "Player app · Owner app · Web · API" },
      { label: "Status", value: "Live — on Google Play" },
    ],
    problem:
      "Turf and sports-venue booking in India was fragmented — phone calls, double bookings, no real discovery, and owners running operations on WhatsApp and paper. Players had nowhere to find venues, matches or teammates in one place. LOBBI had to solve both sides at once: a consumer-grade booking experience for players, and a full operations platform for venue owners — with money moving safely in real time on both ends.",
    approach: [
      { no: "01", title: "Discovery & architecture", desc: "We mapped both journeys — player and venue owner — then designed the data model, the real-time layer and the payment flow before writing feature code." },
      { no: "02", title: "Two-sided build", desc: "Shipped in parallel: a player app for discovery, booking and social; an owner app and dashboard for operations, pricing and payouts." },
      { no: "03", title: "Real-time & payments", desc: "WebSocket availability, Redis-backed slot locking and Cashfree payments/settlements — the hard, money-moving core that has to be correct under load." },
      { no: "04", title: "Launch & iterate", desc: "Shipped to Google Play and lobbi.in, then layered in matchmaking, tournaments, coaching and chat." },
    ],
    build: [
      {
        audience: "For players",
        icon: "users",
        points: [
          "Venue discovery, filtering and instant slot booking",
          "Book, cancel & check availability over WhatsApp — AI agent",
          "Matchmaking — open games with auto-balanced teams and Glicko-2 skill ratings",
          "Social feed, encrypted DMs and group chat",
          "Coaching bookings with QR check-in",
          "Tournaments with registration and live brackets",
          "Player profile with analytics and highlights",
        ],
      },
      {
        audience: "For venue owners",
        icon: "store",
        points: [
          "Multi-turf slot config — per-sport mapping, 15–120 min durations, overnight slots",
          "Two-phase Redis locking — soft + hard locks, zero double bookings",
          "Dynamic pricing engine — recurring (weekday/weekend) and one-time (festival) rules",
          "Real-time availability via WebSockets — live, no refresh",
          "Hold rules — recurring maintenance, one-time blocks, exclusion dates",
          "Cashfree Easy Split — auto platform fee + GST, net payout to bank",
          "Settlements & payouts — capture → split → settle → bank, with UTR history",
          "Smart refunds — tiered policy, refund-splits, auto-recovery of stuck refunds",
        ],
      },
    ],
    productShots: [
      { src: "/work/lobbi-owner.webp", title: "Venue-owner dashboard", desc: "Bookings, occupancy, revenue and payouts in one operations cockpit." },
      { src: "/work/lobbi-player.webp", title: "Player experience", desc: "Discover venues, book slots, find matches and connect with the community." },
      { src: "/work/lobbi-coach.webp", title: "Coaching", desc: "Book sessions, subscribe to packages, and check in with QR." },
    ],
    highlights: [
      { icon: "chat", title: "AI WhatsApp booking agent", desc: "A read-only Claude agent lets players find venues, check availability, book and cancel right inside WhatsApp — each change confirmed by a one-time signed link, so the AI never touches the database." },
      { icon: "network", title: "Two-phase slot locking", desc: "Redis-backed soft + hard locks eliminate double-bookings even under concurrent demand." },
      { icon: "bolt", title: "Real-time everywhere", desc: "WebSocket-driven live availability and chat — instant updates across every viewer, no refresh." },
      { icon: "gauge", title: "Dynamic pricing engine", desc: "Recurring and one-time rules let owners surge on weekends and discount off-peak automatically." },
      { icon: "layers", title: "Multi-app architecture", desc: "Two React Native apps and a React web app on one shared FastAPI backend — a single source of truth." },
      { icon: "tag", title: "Auto-split payments", desc: "Cashfree Easy Split deducts platform fee + GST and routes net payouts to each venue's bank — settlements and tiered refunds, fully automated." },
      { icon: "ai", title: "Skill-based matchmaking", desc: "Glicko-2 ratings and auto-balanced teams keep open games fair and competitive." },
    ],
    techDecisions: [
      { tech: "FastAPI (Python)", used: "The async API and WebSocket server behind both apps and the web.", advantage: "Handles thousands of concurrent real-time connections efficiently, with fast, typed development for complex booking and payment logic." },
      { tech: "Redis", used: "Two-phase slot locking (soft + hard) and hot-path caching.", advantage: "Atomic in-memory locks make double-booking impossible under concurrent demand; sub-millisecond reads keep availability instant." },
      { tech: "WebSockets", used: "Live slot availability and real-time chat.", advantage: "Every viewer sees a slot lock or free up instantly — higher booking conversion, with none of the load of polling." },
      { tech: "MongoDB", used: "Venues, slots, bookings, social, chat and tournament data.", advantage: "A flexible document model lets fast-evolving features (social, coaching, tournaments) ship without rigid schema migrations." },
      { tech: "Cashfree Easy Split", used: "Player payments, platform/venue split, GST, settlements, payouts and refunds.", advantage: "Marketplace money moves correctly and transparently — venues get net payouts to bank automatically, refunds deduct the right share, zero manual reconciliation." },
      { tech: "Claude (Anthropic) + WhatsApp Cloud API", used: "An AI agent that handles venue search, availability, booking and cancellation in WhatsApp chat.", advantage: "Customers self-serve in the app they already live in — and it's safe by design: the AI is read-only, every booking or cancel is a one-time user-confirmed signed link, with webhook signature verification and prompt-injection defense." },
      { tech: "Background workers", used: "Reminders, no-show handling, settlements and stuck-refund recovery.", advantage: "Operations run themselves and self-heal — failed refunds auto-retry, so owners and players are never left stuck." },
      { tech: "React Native + Expo", used: "The player app and the venue-owner app.", advantage: "Two native iOS + Android apps from one toolchain, shipped fast, with over-the-air updates for quick iteration." },
      { tech: "AWS S3", used: "Media storage — images, highlights and documents.", advantage: "Scalable, low-cost storage and delivery for user-generated content." },
    ],
    stack: [
      { group: "Mobile", items: ["React Native", "Expo", "expo-router", "NativeWind"] },
      { group: "Web", items: ["React", "Tailwind CSS", "Radix UI"] },
      { group: "Backend", items: ["FastAPI (Python)", "MongoDB", "Redis", "WebSockets"] },
      { group: "AI & messaging", items: ["Claude (Anthropic)", "WhatsApp Cloud API"] },
      { group: "Payments & infra", items: ["Cashfree Easy Split", "AWS S3", "Firebase (FCM)"] },
    ],
    metaTitle: "LOBBI — Marketplace With an AI Booking Agent | MnT",
    metaDescription:
      "How MnT built LOBBI, a live two-sided marketplace: player and owner apps, real-time slot inventory, split payments, and a safe AI booking agent in WhatsApp.",
    resultsTitle: "What did the architecture buy?",
    resultsIntro:
      "LOBBI runs three apps on one shared backend. Two-phase Redis locking makes double bookings impossible under concurrent demand, Cashfree Easy Split moves marketplace money with zero manual reconciliation, and a read-only Claude agent takes bookings in WhatsApp — every action confirmed by a one-time signed link, so the AI never writes to the database.",
    results: [
      { metric: "Double bookings", before: "Race-condition risk", after: "0 by design — two-phase locks" },
      { metric: "Payout reconciliation", before: "Manual, per venue", after: "Zero-touch capture → split → bank" },
      { metric: "Booking channels", before: "Calls & walk-ins", after: "App · web · WhatsApp AI agent" },
      { metric: "Codebases to maintain", before: "3 separate builds", after: "3 apps, 1 shared backend" },
    ],
    faq: [
      {
        q: "How does the AI booking agent stay safe?",
        a: "The WhatsApp agent is a read-only Claude agent. It can search venues, check availability and prepare a booking or cancellation — but every state change is executed only when the user taps a one-time signed confirmation link. Add webhook signature verification and prompt-injection defenses, and the AI never touches the database directly.",
      },
      {
        q: "How does LOBBI prevent double bookings?",
        a: "With two-phase Redis locking: a soft lock holds the slot during checkout, and a hard lock lands only when payment succeeds. Combined with WebSocket-driven live availability, concurrent buyers can't collide — double bookings are structurally impossible, not just unlikely.",
      },
      {
        q: "Would this pattern work for a US marketplace?",
        a: "Yes — the architecture maps one-to-one. Swap Cashfree Easy Split for Stripe Connect (split payments, payouts, refunds), keep the real-time inventory and locking layer, and the embedded-agent pattern works on any channel: WhatsApp, SMS, or web chat. This build is our production proof for US marketplace and agent-ready commerce work.",
      },
      {
        q: "What did MnT deliver end to end?",
        a: "Product design, the player app, the venue-owner app, the web app, the FastAPI backend with payments and settlements, and the AI booking agent — one senior team, from architecture to Google Play.",
      },
    ],
    copy: {
      challengeTitle: "Two sides, one platform.",
      buildTitle: "A consumer app and an operations platform.",
      highlightsSubtitle: "The parts that make LOBBI hold up under real, concurrent, money-moving load.",
      techTitle: "Why we chose each piece — and what it bought LOBBI.",
      ctaTitle: "Have a platform like this in mind?",
      ctaBody:
        "LOBBI is the kind of multi-sided, real-time platform we specialise in. Tell us your idea — we'll show you how we'd architect it.",
    },
  },
  {
    slug: "searchlight",
    title: "Searchlight",
    tagline:
      "An autonomous SEO/AEO agent that works like an employee — it watches the site, fixes what it finds, and verifies its own work before anything ships.",
    type: "Internal product · Built & dogfooded by MnT",
    category: "Autonomous AI agent · SEO/AEO",
    cover: "/work/searchlight-cover-v2.png",
    heroShot: "/work/searchlight-dashboard-v2.png",
    frameUrl: "searchlight · mntfuture.com",
    dateISO: "2026-07-07",
    summary:
      "Searchlight is a five-role agent system MnT built on the Claude Agent SDK and pointed at its own site, mntfuture.com. A deterministic Monitor crawls every page; an LLM Analyst judges quality and AI-citability; an LLM Fixer edits the actual source code; a deterministic Verifier blocks anything that breaks the build; an opt-in Shipper commits and deploys. In its first AI-driven fix pass (July 2026), open on-page issues fell from 20 to 6.",
    facts: [
      { value: "20 → 6", label: "Open on-page issues after the first AI fix pass (−70%)" },
      { value: "5", label: "Agent roles — 2 LLM, 3 deterministic" },
      { value: "100%", label: "Fixes gated by typecheck + production build" },
      { value: "17", label: "Pages monitored on every run" },
    ],
    scope: [
      { label: "Role", value: "Product design + agent engineering" },
      { label: "Stack", value: "Claude Agent SDK · TypeScript" },
      { label: "Delivered", value: "Monitor · Analyst · Fixer · Verifier · Shipper" },
      { label: "Status", value: "Running against mntfuture.com" },
    ],
    problem:
      "SEO and AEO decay silently: every deploy can push a title over 60 characters, drop a meta description, or break structured data — and nobody notices until traffic dips. Audits are periodic; the web is not. We wanted an employee, not an audit: an agent that re-checks the live site on every run, fixes the source (not the symptom), and never ships a change that breaks the build. The hard problem isn't detection — it's letting an LLM edit production code safely.",
    approach: [
      { no: "01", title: "Split judgment from mechanics", desc: "Rule-decidable checks (title length, missing meta, broken links, schema presence) stay deterministic code — free, instant, repeatable. Only judgment calls (is this title compelling? will an AI cite this?) go to an LLM." },
      { no: "02", title: "Give the Fixer real knowledge", desc: "A Claude Agent SDK agent reads the repo like a developer — plus a site playbook (voice, keywords, where metadata lives) and persistent memory of past outcomes, so it never repeats a failed fix." },
      { no: "03", title: "Gate every edit with a build", desc: "After each fix, the Verifier runs the typecheck and production build. Failures feed the compiler output back to the Fixer — the self-heal loop — and escalate to a human after N retries." },
      { no: "04", title: "Dogfood on our own site", desc: "We pointed Searchlight at mntfuture.com, measured before and after with its own Monitor, and shipped the fixes through our normal CI to production." },
    ],
    build: [
      {
        audience: "The detection layer",
        icon: "search",
        points: [
          "Deterministic Monitor — crawls the sitemap, checks titles, metas, H1s, canonicals, JSON-LD schema, alt text and broken links",
          "LLM Analyst (opt-in) — judges title/meta quality, thin content and AEO readiness against the site playbook",
          "Issues ranked by severity and routed by tier: auto-fix, verify-gated, or escalate to a human",
          "Every run recorded — issue counts, fixes, escalations — feeding an HTML control-room dashboard",
        ],
      },
      {
        audience: "The action layer",
        icon: "code",
        points: [
          "LLM Fixer (Claude Agent SDK) — edits the real source: metadata, schema, alt text, links",
          "Site playbook + cross-run memory keep fixes on-brand and stop repeated failures",
          "Deterministic Verifier — typecheck + production build gate with a self-heal retry loop",
          "Opt-in Shipper — stages only the Fixer's changed files, commits, and pushes to trigger deploy",
          "Hard guardrails — a neverTouch list (admin, database, env) the Fixer cannot edit",
        ],
      },
    ],
    productShots: [
      { src: "/work/searchlight-dashboard-v2.png", title: "Control-room dashboard", desc: "Every agent's model, tools and system prompt — plus run history: issues found, fixes, escalations, ships." },
      { src: "/work/searchlight-loop-v2.png", title: "The self-heal loop", desc: "Monitor → Fixer → Verifier. A failed build feeds the error back to the Fixer; after N retries it escalates to a human." },
      { src: "/work/searchlight-memory-v2.png", title: "Persistent memory", desc: "Outcomes recorded across runs — fixed, escalated, wontfix — so the agent never repeats a failed or rejected fix." },
    ],
    highlights: [
      { icon: "shield", title: "Build-gated autonomy", desc: "No fix ships unless the typecheck and production build pass. The gate is a compiler, not another LLM — objective and non-negotiable." },
      { icon: "bolt", title: "Self-heal loop", desc: "A failing fix gets the build error fed back and retried; unresolved issues escalate to a human with full context after N attempts." },
      { icon: "ai", title: "LLM only where judgment lives", desc: "Detection mechanics, verification and git are deterministic code. Claude is spent on the two places expertise matters: judging quality and writing fixes." },
      { icon: "layers", title: "Persistent memory", desc: "Fixed, escalated and wontfix outcomes persist across runs — human decisions are respected, failed approaches aren't repeated." },
      { icon: "chat", title: "Site playbook", desc: "A per-site Markdown brief — positioning, voice, keyword strategy, and a map of where metadata lives — keeps every fix on-brand and in the right file." },
      { icon: "network", title: "Config-portable", desc: "One JSON config per project: site URL, thresholds, fix tiers, playbook, neverTouch globs. The same agent runs against any repo." },
    ],
    techDecisions: [
      { tech: "Claude Agent SDK (claude-opus-4-8)", used: "The Fixer — an autonomous agent with Read/Edit/Grep/Bash tools scoped to the repo.", advantage: "It works like a developer: finds where a title is defined, edits the source, runs the typecheck — full-auto, inside hard tool and path guardrails." },
      { tech: "Deterministic crawler (native fetch)", used: "The Monitor — sitemap crawl, HTML parsing, link checks on every run.", advantage: "Detection costs nothing, runs anywhere, and returns identical results for identical input — no API key needed just to know the site's state." },
      { tech: "tsc + production build as the Verifier", used: "The regression gate every fix must pass before it counts.", advantage: "An objective, binary judge. An LLM never decides whether the build passed — the compiler does." },
      { tech: "Git-based Shipper (opt-in)", used: "Stages only Fixer-changed files, commits with an audit trail, pushes to the deploy branch.", advantage: "Ships ride the existing CI/CD path with human-readable history — and it's off by default." },
      { tech: "JSON memory, tracked in git", used: "Cross-run outcomes: fixed, escalated, wontfix — committed alongside fixes.", advantage: "Each run is a fresh process, so memory lives in the repo — it survives thrown-away CI machines and the git log doubles as an audit trail." },
      { tech: "Opt-in LLM Analyst", used: "Quality and AEO judgment — weak titles, generic metas, AI-citability — on top of the free deterministic pass.", advantage: "The expensive model runs only when asked (--deep), capped per run, and judges against the playbook so verdicts are on-strategy." },
    ],
    stack: [
      { group: "Agents", items: ["Claude Agent SDK", "claude-opus-4-8", "System-prompt registry"] },
      { group: "Engine", items: ["TypeScript", "Node 20", "Zero runtime deps (core)"] },
      { group: "Safety", items: ["tsc + build gate", "neverTouch globs", "Tiered auto/verify/escalate"] },
      { group: "Ops", items: ["Git + GitHub", "DigitalOcean CI", "HTML dashboard"] },
    ],
    metaTitle: "Searchlight — Autonomous SEO/AEO Agent | MnT Case Study",
    metaDescription:
      "MnT built an autonomous SEO/AEO agent on the Claude Agent SDK and ran it on its own site: open issues cut 20 → 6, every fix gated by the production build.",
    resultsTitle: "What happened when we pointed it at our own site?",
    resultsIntro:
      "In July 2026, Searchlight's Monitor found 20 open on-page SEO/AEO issues across mntfuture.com. After the first AI-driven fix pass — every change human-reviewed and shipped through normal CI — the same Monitor measured 6 remaining, a 70% reduction. The longest meta description tightened from 197 to 150 characters and the longest title from 72 to 58.",
    results: [
      { metric: "Open on-page issues", before: "20", after: "6 (−70%)" },
      { metric: "Longest meta description", before: "197 chars", after: "150 chars" },
      { metric: "Longest page title", before: "72 chars", after: "58 chars" },
      { metric: "Detection cadence", before: "Occasional manual audit", after: "Every run, automated" },
    ],
    faq: [
      {
        q: "How can an AI agent edit code without breaking the site?",
        a: "Every fix must pass a deterministic gate — the TypeScript typecheck and the production build — before it counts. If the gate fails, the compiler output is fed back to the Fixer to correct (the self-heal loop); after N failed retries the issue escalates to a human. A change that breaks the build structurally cannot ship.",
      },
      {
        q: "Which parts use an LLM — and which deliberately don't?",
        a: "Judgment uses Claude: the Analyst (is this title compelling? will an AI engine cite this page?) and the Fixer (write the actual code change). Everything rule-decidable is deterministic code: crawling, length/presence checks, link status, the build gate, and git. That split keeps runs cheap, repeatable, and safe — an LLM never grades its own work.",
      },
      {
        q: "Did it really improve mntfuture.com?",
        a: "Yes — and the numbers are from its own Monitor, measured before and after. In July 2026 the first AI-driven fix pass cut open on-page issues from 20 to 6: metas over 155 characters rewritten (longest 197 → 150), titles over 60 trimmed (72 → 58), with every change reviewed and deployed through normal CI.",
      },
      {
        q: "Does it deploy to production by itself?",
        a: "Only if you turn that on. The Shipper is opt-in and off by default: when enabled, it stages only the files the Fixer changed, commits with an audit message, and pushes to the deploy branch — and it never ships anything the Verifier hasn't passed.",
      },
      {
        q: "Can Searchlight run on another site?",
        a: "Yes — it's config-driven by design: one JSON file sets the site URL, thresholds, fix tiers, brand voice, playbook and neverTouch paths. This is the engine behind MnT's Embedded AI Agents service — the same pattern, domain-trained for your stack.",
      },
    ],
    copy: {
      challengeTitle: "An employee, not an audit.",
      buildTitle: "A detection layer and an action layer.",
      highlightsSubtitle: "Autonomy is easy; safe autonomy is the product. These are the decisions that make it trustworthy.",
      techTitle: "Why we chose each piece — and what it buys the agent.",
      ctaTitle: "Want an agent like this embedded in your stack?",
      ctaBody:
        "Searchlight is the pattern behind our Embedded AI Agents service — domain-trained agents with hard safety gates. Book a free agent-readiness audit and we'll map where one pays off in your commerce stack.",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
