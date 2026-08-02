import type { IconName } from "@/components/Icon";

export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  type: string; // honest label, e.g. "Platform · Built by MnT Future"
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
  /* Best-format extensions (optional, AEO-oriented) */
  /** ISO date for Article schema (datePublished). */
  dateISO?: string;
  /** URL shown in the hero browser-frame chrome. */
  frameUrl?: string;
  /** Question-style H2 for the results section (AI-answer extractable). */
  resultsTitle?: string;
  /** Answer-first summary (~40 to 75 words) stating the outcomes as plain facts. */
  resultsIntro?: string;
  /** Before → after proof table. Only real, honest values. */
  results?: { metric: string; before: string; after: string }[];
  /** Real questions buyers ask: rendered + emitted as FAQPage JSON-LD. */
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
    slug: "mnt-commerce",
    title: "MnT Commerce",
    tagline:
      "The AI-native commerce platform we start client builds from: semantic search, a shopping assistant, and an ops agent that writes its own code and can't run it until you say so.",
    type: "Platform · Built & dogfooded by MnT Future",
    category: "AI-native headless commerce",
    cover: "/work/mnt-commerce-cover.png",
    heroShot: "/work/mnt-commerce-copilot-approval.png",
    frameUrl: "MnT Commerce · admin",
    dateISO: "2026-07-16",
    summary:
      "MnT Commerce is the base we start client commerce work from: a headless engine with AI built into the product rather than bolted on. Shoppers get semantic search and a conversational assistant; operators get an Ops Copilot that answers questions about the store, then proposes changes as real workflow code it cannot execute until a human approves. We ran every AI path against it for real: including the one that creates a promotion, and the approval gate held: zero store changes reached the database before a human clicked Approve.",
    facts: [
      { value: "0", label: "Store changes the agent made without a human approval" },
      { value: "4/4", label: "Semantic queries ranked correctly after fixing the catalog text (was 2/3)" },
      { value: "7", label: "Custom modules on the commerce engine: zero forks of it" },
      { value: "1 file", label: "What changes to re-brand the whole platform for a client" },
    ],
    scope: [
      { label: "Role", value: "Platform architecture + AI engineering" },
      { label: "Stack", value: "Medusa v2 · Postgres + pgvector · Claude · Voyage" },
      { label: "Delivered", value: "Semantic search · Recommendations · Shopping assistant · Ops Copilot" },
      { label: "Status", value: "Internal platform: the base for client builds" },
    ],
    problem:
      "Most \"AI commerce\" is a chatbot parked next to a store: it can describe the catalog but it cannot change anything, because nobody trusts it to. The moment an agent can actually act: create a promotion, move inventory, place a restock order: the hard problem stops being intelligence and becomes authority. An agent that can spend your money is a different engineering problem from one that can answer a question, and it needs a different architecture: one where the interesting work is what the agent is prevented from doing.",
    approach: [
      { no: "01", title: "Split reading from writing, in the executor", desc: "Research runs through a read-only executor that refuses code with side effects. The identical code that creates a promotion is blocked while the agent is investigating and only becomes runnable after a human approves it. The boundary is enforced where the code executes, not in the prompt." },
      { no: "02", title: "Let the agent write code, not call a fixed API", desc: "Rather than a menu of pre-baked actions, the Copilot composes the engine's own workflows: the same ones the admin UI calls. You read the actual code before approving it, so the review surface is the change itself, not a summary of it." },
      { no: "03", title: "Make every AI path degrade, not fail", desc: "No key, no credits, provider outage: every feature falls back to a deterministic path: rule-based chat, keyword search, affinity recommendations. Shoppers see a working store; the real provider error goes to the logs." },
      { no: "04", title: "Dogfood it: run every path for real", desc: "We put a live key on it and exercised each AI feature end to end: chat, embeddings, semantic ranking, Copilot reports, and the full propose → approve → execute chain. Two real bugs surfaced that no amount of reading the code would have found." },
    ],
    build: [
      {
        audience: "The shopper side",
        icon: "chat",
        points: [
          "Semantic search: Voyage embeddings in Postgres via pgvector, ranked by cosine distance, blended with keyword matching and per-shopper affinity",
          "Conversational assistant: a Claude tool-loop that searches, recommends, and manages the cart in natural language",
          "Per-shopper recommendations: affinity scoring from real activity, with cold-start handling and optional AI curation",
          "Shopper profiles: anonymous activity that merges into the customer record on login",
          "Every path has a deterministic fallback that runs with no AI key at all",
        ],
      },
      {
        audience: "The operator side",
        icon: "shield",
        points: [
          "Ops Copilot: asks and answers questions about live store data, writing and running its own read-only queries",
          "Proposals, not actions: changes arrive as reviewable workflow code with a risk tier, held at zero effect until approved",
          "Multi-step plans that halt on the first failure instead of half-applying",
          "Demand and restock: velocity from real activity, stockout projection, and drafted purchase orders for approval",
          "Proactive checks on a schedule: digests and low-stock alerts, idempotent per day",
          "Every approval records who approved it",
        ],
      },
    ],
    productShots: [
      { src: "/work/mnt-commerce-copilot-approval.png", title: "The approval gate", desc: "The Copilot has written real workflow code and is holding it. Nothing has reached the store yet: the promotion does not exist until Approve is clicked." },
      { src: "/work/mnt-commerce-copilot-report.png", title: "A self-correcting research loop", desc: "Asked about stock, it queried the store, noticed its own query was missing a field, refined it, and answered: read-only throughout." },
      { src: "/work/mnt-commerce-chat.png", title: "The shopping assistant", desc: "\"Breathable for a hot summer day\" returns the lightweight tee: matched on meaning, then explained with the product's real specs." },
    ],
    highlights: [
      { icon: "shield", title: "The approval gate is the product", desc: "Store changes are proposed as code and held at zero effect. Before approval the promotion did not exist in the database; after one click it did, with the approver's ID on the record." },
      { icon: "code", title: "Code, not a fixed action menu", desc: "The agent composes the commerce engine's own workflows, so what you approve is the real change, and the agent isn't limited to actions we predicted in advance." },
      { icon: "bolt", title: "Fallback-first, not AI-first", desc: "Every AI feature has a deterministic path underneath it. The store kept selling with no key, no credits, and a provider returning 400s, because that is exactly how we ran it for weeks." },
      { icon: "layers", title: "Composable: including removable", desc: "Seven custom modules, zero forks of the commerce engine. The chat feature can be deleted without touching search, recommendations, or the Copilot; shared catalog logic is deliberately feature-agnostic." },
      { icon: "ai", title: "AI config is global and in the admin", desc: "One place owns the provider key and model for every AI feature: set in the dashboard, not in an env file, never returned to the browser unmasked." },
      { icon: "network", title: "White-label in one file", desc: "Brand name, tagline, mark and colours live in a single module that drives the admin shell, favicon, and widget: via the framework's supported extension points, so upgrades don't undo it." },
    ],
    techDecisions: [
      { tech: "Medusa v2 (unforked)", used: "The commerce engine: products, carts, orders, promotions, inventory.", advantage: "Everything we added is a module beside it, not a patch inside it. Clients get an upgradeable engine and full code ownership, with no fork to maintain." },
      { tech: "Read-only executor for research", used: "The boundary between the Copilot investigating and the Copilot acting.", advantage: "The same code is blocked in research mode and runnable only post-approval. Authority is enforced by the runtime, not requested in a prompt." },
      { tech: "pgvector in the existing Postgres", used: "Product embeddings and cosine ranking, alongside keyword search.", advantage: "Semantic search with no extra service to run, pay for, or keep in sync: the vectors live next to the catalog they describe." },
      { tech: "Voyage embeddings", used: "Turning product text into vectors; re-indexed automatically when the text changes.", advantage: "Anthropic has no embeddings API, and Voyage is the recommended pairing. Content-hashed, so editing a description is the whole re-index step." },
      { tech: "Claude tool-loops (provider SDK, no framework)", used: "The shopping assistant and the Ops Copilot.", advantage: "Direct control over the loop, the tools, and the failure path: which is what lets every branch fall back cleanly instead of throwing." },
      { tech: "Deterministic engines under every AI feature", used: "Rule-based chat, keyword search, affinity recommendations.", advantage: "The AI is an upgrade, not a dependency. Turning it off degrades the experience; it does not break the store." },
    ],
    stack: [
      { group: "Commerce", items: ["Medusa v2", "PostgreSQL", "Core workflows", "7 custom modules"] },
      { group: "AI", items: ["Claude (Anthropic)", "Voyage embeddings", "pgvector + pg_trgm", "Admin-managed keys"] },
      { group: "Safety", items: ["Read-only executor", "Human approval gates", "Risk tiers", "Approver audit trail"] },
      { group: "Delivery", items: ["TypeScript", "Node 20", "Hand-written migrations", "One-file white-label"] },
    ],
    metaTitle: "MnT Commerce: AI-Native Commerce Platform | MnT Future Case Study",
    metaDescription:
      "The AI-native commerce base MnT Future builds clients on: semantic search, a shopping assistant, and an ops agent that writes real workflow code it can't run until a human approves.",
    resultsTitle: "What happened when we ran the AI against our own store?",
    resultsIntro:
      "Asked in one sentence to create a 10% promotion, the Ops Copilot wrote the engine's own workflow code and stopped. The promotion did not exist in the database until a human clicked Approve, then it did, with the approver's ID recorded against it. Semantic search initially ranked one of three probe queries wrong; the fix was the catalog text, not the retrieval code.",
    results: [
      { metric: "Store changes the agent made before approval", before: "None", after: "0 (held as reviewable code)" },
      { metric: "Creating a promotion", before: "Admin form, filled by hand", after: "One sentence, one approval click" },
      { metric: "\"Breathable for a hot summer day\" ranked", before: "Sweatpants (wrong)", after: "Lightweight tee (correct)" },
      { metric: "Semantic ranking confidence (1st vs 2nd)", before: "0.006: indistinguishable", after: "0.05 to 0.08" },
      { metric: "Probe queries ranked correctly", before: "2 of 3", after: "4 of 4" },
    ],
    faq: [
      {
        q: "Is this a real client's store?",
        a: "No, and we're explicit about that. MnT Commerce is our own platform, built as the base we start client work from, running on a small demo catalog we wrote ourselves. The engineering is real and every number here came from running it; the traffic is not. We have no conversion data from it and don't claim any.",
      },
      {
        q: "How can an AI agent change a store without breaking it?",
        a: "It can't act on its own. The Copilot proposes changes as real workflow code with a risk tier, and a read-only executor refuses to run anything with side effects while it's researching. We tested this by asking it for a promotion: it wrote the code, and the promotion did not exist in the database until a human approved it. Every approval records who approved it.",
      },
      {
        q: "Which parts use an LLM, and which deliberately don't?",
        a: "Claude handles judgment: understanding what a shopper means, deciding what to propose, writing the change. Everything else is ordinary code: the approval gate, the executor's read-only check, the vector maths, the workflows that actually touch the database. The model never grades its own work and never holds the authority to act.",
      },
      {
        q: "What broke when you ran it for real?",
        a: "Two things worth reporting. A model-specific API parameter was being sent unconditionally while the model itself was admin-selectable, so choosing one of the three models returned a 400: a bug only a live run finds. And an AI failure was being swallowed into a silent fallback, which meant the real cause (an unfunded account, not the code) stayed invisible until we logged the provider's actual error. Both are fixed; both are why we dogfood.",
      },
      {
        q: "Our search results are bad: is that fixable?",
        a: "Usually, and usually not in the retrieval code. Ours ranked one query wrong at first, and the cause was the catalog: every product description was the same marketing sentence with one word swapped, so there was nothing distinguishing to match on. Rewriting four descriptions with real detail: fabric weight, warmth, season: fixed the wrong result and widened the confidence gap between the top two hits by roughly ten times. We look at your product text before we touch your search stack.",
      },
      {
        q: "Are we locked into your AI, or your commerce engine?",
        a: "No to both, by construction. The engine is unforked and every feature we added is a separate module: we tested that the chat feature can be deleted without disturbing search, recommendations, or the Copilot. Each AI feature has a deterministic fallback underneath it, so switching the AI off degrades the experience rather than breaking the store. You get full code ownership.",
      },
    ],
    copy: {
      challengeTitle: "An agent that can spend your money is a different problem.",
      buildTitle: "One platform, two audiences.",
      highlightsSubtitle: "Capability is the easy half. These are the decisions that make an acting agent safe enough to put near a real store.",
      techTitle: "Why each piece is there, and what it buys you.",
      ctaTitle: "Want this as the base for your store?",
      ctaBody:
        "MnT Commerce is where our client builds start: your brand, your catalog, your storefront, on a platform where the AI is already built in and already gated. Book a free strategy session and we'll map it to your stack.",
    },
  },
  {
    slug: "lobbi",
    title: "LOBBI",
    tagline:
      "A two-sided marketplace with an embedded AI booking agent: three apps, real-time inventory and split payments, engineered end to end.",
    // Our own asset, not a client engagement: the ownership interest is disclosed
    // here and in the first line of the summary. A buyer who finds the corporate
    // link before we say it concludes we passed it off as a client win.
    type: "Our own platform · MnT Future holds an ownership interest",
    category: "Two-sided marketplace · AI booking agent",
    cover: "/work/lobbi-cover-v2.png",
    heroShot: "/work/lobbi-owner.webp",
    liveUrl: "https://lobbi.in",
    liveLabel: "Visit lobbi.in",
    frameUrl: "lobbi.in",
    summary:
      "This one is ours: we built LOBBI, and MnT Future holds an ownership interest in it through a separate company. We say that first because the engineering is worth reading about either way. LOBBI is a live two-sided marketplace: players discover and book sports venues, owners run slots, pricing and payouts. MnT Future designed and engineered all of it: a player app, a venue-owner app, a web app, a real-time FastAPI backend with marketplace payments, and an embedded AI booking agent in WhatsApp. It's the same architecture a US marketplace needs: real-time inventory, split payouts, and an AI agent that transacts safely.",
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
      { label: "Status", value: "Live: on Google Play" },
    ],
    problem:
      "Turf and sports-venue booking in India was fragmented: phone calls, double bookings, no real discovery, and owners running operations on WhatsApp and paper. Players had nowhere to find venues, matches or teammates in one place. LOBBI had to solve both sides at once: a consumer-grade booking experience for players, and a full operations platform for venue owners, with money moving safely in real time on both ends.",
    approach: [
      { no: "01", title: "Discovery & architecture", desc: "We mapped both journeys: player and venue owner, then designed the data model, the real-time layer and the payment flow before writing feature code." },
      { no: "02", title: "Two-sided build", desc: "Shipped in parallel: a player app for discovery, booking and social; an owner app and dashboard for operations, pricing and payouts." },
      { no: "03", title: "Real-time & payments", desc: "WebSocket availability, Redis-backed slot locking and Cashfree payments/settlements: the hard, money-moving core that has to be correct under load." },
      { no: "04", title: "Launch & iterate", desc: "Shipped to Google Play and lobbi.in, then layered in matchmaking, tournaments, coaching and chat." },
    ],
    build: [
      {
        audience: "For players",
        icon: "users",
        points: [
          "Venue discovery, filtering and instant slot booking",
          "Book, cancel & check availability over WhatsApp: AI agent",
          "Matchmaking: open games with auto-balanced teams and Glicko-2 skill ratings",
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
          "Multi-turf slot config: per-sport mapping, 15 to 120 min durations, overnight slots",
          "Two-phase Redis locking: soft + hard locks, zero double bookings",
          "Dynamic pricing engine: recurring (weekday/weekend) and one-time (festival) rules",
          "Real-time availability via WebSockets: live, no refresh",
          "Hold rules: recurring maintenance, one-time blocks, exclusion dates",
          "Cashfree Easy Split: auto platform fee + GST, net payout to bank",
          "Settlements & payouts: capture → split → settle → bank, with UTR history",
          "Smart refunds: tiered policy, refund-splits, auto-recovery of stuck refunds",
        ],
      },
    ],
    productShots: [
      { src: "/work/lobbi-owner.webp", title: "Venue-owner dashboard", desc: "Bookings, occupancy, revenue and payouts in one operations cockpit." },
      { src: "/work/lobbi-player.webp", title: "Player experience", desc: "Discover venues, book slots, find matches and connect with the community." },
      { src: "/work/lobbi-coach.webp", title: "Coaching", desc: "Book sessions, subscribe to packages, and check in with QR." },
    ],
    highlights: [
      { icon: "chat", title: "AI WhatsApp booking agent", desc: "A read-only Claude agent lets players find venues, check availability, book and cancel right inside WhatsApp: each change confirmed by a one-time signed link, so the AI never touches the database." },
      { icon: "network", title: "Two-phase slot locking", desc: "Redis-backed soft + hard locks eliminate double-bookings even under concurrent demand." },
      { icon: "bolt", title: "Real-time everywhere", desc: "WebSocket-driven live availability and chat: instant updates across every viewer, no refresh." },
      { icon: "gauge", title: "Dynamic pricing engine", desc: "Recurring and one-time rules let owners surge on weekends and discount off-peak automatically." },
      { icon: "layers", title: "Multi-app architecture", desc: "Two React Native apps and a React web app on one shared FastAPI backend: a single source of truth." },
      { icon: "tag", title: "Auto-split payments", desc: "Cashfree Easy Split deducts platform fee + GST and routes net payouts to each venue's bank: settlements and tiered refunds, fully automated." },
      { icon: "ai", title: "Skill-based matchmaking", desc: "Glicko-2 ratings and auto-balanced teams keep open games fair and competitive." },
    ],
    techDecisions: [
      { tech: "FastAPI (Python)", used: "The async API and WebSocket server behind both apps and the web.", advantage: "Handles thousands of concurrent real-time connections efficiently, with fast, typed development for complex booking and payment logic." },
      { tech: "Redis", used: "Two-phase slot locking (soft + hard) and hot-path caching.", advantage: "Atomic in-memory locks make double-booking impossible under concurrent demand; sub-millisecond reads keep availability instant." },
      { tech: "WebSockets", used: "Live slot availability and real-time chat.", advantage: "Every viewer sees a slot lock or free up instantly: higher booking conversion, with none of the load of polling." },
      { tech: "MongoDB", used: "Venues, slots, bookings, social, chat and tournament data.", advantage: "A flexible document model lets fast-evolving features (social, coaching, tournaments) ship without rigid schema migrations." },
      { tech: "Cashfree Easy Split", used: "Player payments, platform/venue split, GST, settlements, payouts and refunds.", advantage: "Marketplace money moves correctly and transparently: venues get net payouts to bank automatically, refunds deduct the right share, zero manual reconciliation." },
      { tech: "Claude (Anthropic) + WhatsApp Cloud API", used: "An AI agent that handles venue search, availability, booking and cancellation in WhatsApp chat.", advantage: "Customers self-serve in the app they already live in, and it's safe by design: the AI is read-only, every booking or cancel is a one-time user-confirmed signed link, with webhook signature verification and prompt-injection defense." },
      { tech: "Background workers", used: "Reminders, no-show handling, settlements and stuck-refund recovery.", advantage: "Operations run themselves and self-heal: failed refunds auto-retry, so owners and players are never left stuck." },
      { tech: "React Native + Expo", used: "The player app and the venue-owner app.", advantage: "Two native iOS + Android apps from one toolchain, shipped fast, with over-the-air updates for quick iteration." },
      { tech: "AWS S3", used: "Media storage: images, highlights and documents.", advantage: "Scalable, low-cost storage and delivery for user-generated content." },
    ],
    stack: [
      { group: "Mobile", items: ["React Native", "Expo", "expo-router", "NativeWind"] },
      { group: "Web", items: ["React", "Tailwind CSS", "Radix UI"] },
      { group: "Backend", items: ["FastAPI (Python)", "MongoDB", "Redis", "WebSockets"] },
      { group: "AI & messaging", items: ["Claude (Anthropic)", "WhatsApp Cloud API"] },
      { group: "Payments & infra", items: ["Cashfree Easy Split", "AWS S3", "Firebase (FCM)"] },
    ],
    metaTitle: "LOBBI: Marketplace With an AI Booking Agent | MnT Future",
    metaDescription:
      "How MnT Future built LOBBI, a live two-sided marketplace: player and owner apps, real-time slot inventory, split payments, and a safe AI booking agent in WhatsApp.",
    resultsTitle: "What did the architecture buy?",
    resultsIntro:
      "LOBBI runs three apps on one shared backend. Two-phase Redis locking makes double bookings impossible under concurrent demand, Cashfree Easy Split moves marketplace money with zero manual reconciliation, and a read-only Claude agent takes bookings in WhatsApp: every action confirmed by a one-time signed link, so the AI never writes to the database.",
    results: [
      { metric: "Double bookings", before: "Race-condition risk", after: "0 by design: two-phase locks" },
      { metric: "Payout reconciliation", before: "Manual, per venue", after: "Zero-touch capture → split → bank" },
      { metric: "Booking channels", before: "Calls & walk-ins", after: "App · web · WhatsApp AI agent" },
      { metric: "Codebases to maintain", before: "3 separate builds", after: "3 apps, 1 shared backend" },
    ],
    faq: [
      {
        q: "How does the AI booking agent stay safe?",
        a: "The WhatsApp agent is a read-only Claude agent. It can search venues, check availability and prepare a booking or cancellation, but every state change is executed only when the user taps a one-time signed confirmation link. Add webhook signature verification and prompt-injection defenses, and the AI never touches the database directly.",
      },
      {
        q: "How does LOBBI prevent double bookings?",
        a: "With two-phase Redis locking: a soft lock holds the slot during checkout, and a hard lock lands only when payment succeeds. Combined with WebSocket-driven live availability, concurrent buyers can't collide: double bookings are structurally impossible, not just unlikely.",
      },
      {
        q: "Would this pattern work for a US marketplace?",
        a: "Yes, the architecture maps one-to-one. Swap Cashfree Easy Split for Stripe Connect (split payments, payouts, refunds), keep the real-time inventory and locking layer, and the embedded-agent pattern works on any channel: WhatsApp, SMS, or web chat. This build is our production proof for US marketplace and agent-ready commerce work.",
      },
      {
        q: "What did MnT Future deliver end to end?",
        a: "Product design, the player app, the venue-owner app, the web app, the FastAPI backend with payments and settlements, and the AI booking agent: one senior team, from architecture to Google Play.",
      },
    ],
    copy: {
      challengeTitle: "Two sides, one platform.",
      buildTitle: "A consumer app and an operations platform.",
      highlightsSubtitle: "The parts that make LOBBI hold up under real, concurrent, money-moving load.",
      techTitle: "Why we chose each piece, and what it bought LOBBI.",
      ctaTitle: "Have a platform like this in mind?",
      ctaBody:
        "LOBBI is the kind of multi-sided, real-time platform we specialise in. Tell us your idea: we'll show you how we'd architect it.",
    },
  },
  {
    slug: "searchlight",
    title: "Searchlight",
    tagline:
      "An autonomous SEO/AEO agent that works like an employee: it watches the site, fixes what it finds, and verifies its own work before anything ships.",
    type: "Internal product · Built & dogfooded by MnT Future",
    category: "Autonomous AI agent · SEO/AEO",
    cover: "/work/searchlight-cover-v2.png",
    heroShot: "/work/searchlight-dashboard-v2.png",
    frameUrl: "searchlight · mntfuture.com",
    dateISO: "2026-07-07",
    summary:
      "Searchlight is a five-role agent system MnT Future built on the Claude Agent SDK and pointed at its own site, mntfuture.com. A deterministic Monitor crawls every page; an LLM Analyst judges quality and AI-citability; an LLM Fixer edits the actual source code; a deterministic Verifier blocks anything that breaks the build; an opt-in Shipper commits and deploys. In its first AI-driven fix pass (July 2026), open on-page issues fell from 20 to 6.",
    facts: [
      { value: "20 → 6", label: "Open on-page issues after the first AI fix pass (−70%)" },
      { value: "5", label: "Agent roles: 2 LLM, 3 deterministic" },
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
      "SEO and AEO decay silently: every deploy can push a title over 60 characters, drop a meta description, or break structured data, and nobody notices until traffic dips. Audits are periodic; the web is not. We wanted an employee, not an audit: an agent that re-checks the live site on every run, fixes the source (not the symptom), and never ships a change that breaks the build. The hard problem isn't detection: it's letting an LLM edit production code safely.",
    approach: [
      { no: "01", title: "Split judgment from mechanics", desc: "Rule-decidable checks (title length, missing meta, broken links, schema presence) stay deterministic code: free, instant, repeatable. Only judgment calls (is this title compelling? will an AI cite this?) go to an LLM." },
      { no: "02", title: "Give the Fixer real knowledge", desc: "A Claude Agent SDK agent reads the repo like a developer, plus a site playbook (voice, keywords, where metadata lives) and persistent memory of past outcomes, so it never repeats a failed fix." },
      { no: "03", title: "Gate every edit with a build", desc: "After each fix, the Verifier runs the typecheck and production build. Failures feed the compiler output back to the Fixer: the self-heal loop, and escalate to a human after N retries." },
      { no: "04", title: "Dogfood on our own site", desc: "We pointed Searchlight at mntfuture.com, measured before and after with its own Monitor, and shipped the fixes through our normal CI to production." },
    ],
    build: [
      {
        audience: "The detection layer",
        icon: "search",
        points: [
          "Deterministic Monitor: crawls the sitemap, checks titles, metas, H1s, canonicals, JSON-LD schema, alt text and broken links",
          "LLM Analyst (opt-in): judges title/meta quality, thin content and AEO readiness against the site playbook",
          "Issues ranked by severity and routed by tier: auto-fix, verify-gated, or escalate to a human",
          "Every run recorded: issue counts, fixes, escalations: feeding an HTML control-room dashboard",
        ],
      },
      {
        audience: "The action layer",
        icon: "code",
        points: [
          "LLM Fixer (Claude Agent SDK): edits the real source: metadata, schema, alt text, links",
          "Site playbook + cross-run memory keep fixes on-brand and stop repeated failures",
          "Deterministic Verifier: typecheck + production build gate with a self-heal retry loop",
          "Opt-in Shipper: stages only the Fixer's changed files, commits, and pushes to trigger deploy",
          "Hard guardrails: a neverTouch list (admin, database, env) the Fixer cannot edit",
        ],
      },
    ],
    productShots: [
      { src: "/work/searchlight-dashboard-v2.png", title: "Control-room dashboard", desc: "Every agent's model, tools and system prompt, plus run history: issues found, fixes, escalations, ships." },
      { src: "/work/searchlight-loop-v2.png", title: "The self-heal loop", desc: "Monitor → Fixer → Verifier. A failed build feeds the error back to the Fixer; after N retries it escalates to a human." },
      { src: "/work/searchlight-memory-v2.png", title: "Persistent memory", desc: "Outcomes recorded across runs: fixed, escalated, wontfix, so the agent never repeats a failed or rejected fix." },
    ],
    highlights: [
      { icon: "shield", title: "Build-gated autonomy", desc: "No fix ships unless the typecheck and production build pass. The gate is a compiler, not another LLM: objective and non-negotiable." },
      { icon: "bolt", title: "Self-heal loop", desc: "A failing fix gets the build error fed back and retried; unresolved issues escalate to a human with full context after N attempts." },
      { icon: "ai", title: "LLM only where judgment lives", desc: "Detection mechanics, verification and git are deterministic code. Claude is spent on the two places expertise matters: judging quality and writing fixes." },
      { icon: "layers", title: "Persistent memory", desc: "Fixed, escalated and wontfix outcomes persist across runs: human decisions are respected, failed approaches aren't repeated." },
      { icon: "chat", title: "Site playbook", desc: "A per-site Markdown brief: positioning, voice, keyword strategy, and a map of where metadata lives: keeps every fix on-brand and in the right file." },
      { icon: "network", title: "Config-portable", desc: "One JSON config per project: site URL, thresholds, fix tiers, playbook, neverTouch globs. The same agent runs against any repo." },
    ],
    techDecisions: [
      { tech: "Claude Agent SDK (claude-opus-4-8)", used: "The Fixer: an autonomous agent with Read/Edit/Grep/Bash tools scoped to the repo.", advantage: "It works like a developer: finds where a title is defined, edits the source, runs the typecheck: full-auto, inside hard tool and path guardrails." },
      { tech: "Deterministic crawler (native fetch)", used: "The Monitor: sitemap crawl, HTML parsing, link checks on every run.", advantage: "Detection costs nothing, runs anywhere, and returns identical results for identical input: no API key needed just to know the site's state." },
      { tech: "tsc + production build as the Verifier", used: "The regression gate every fix must pass before it counts.", advantage: "An objective, binary judge. An LLM never decides whether the build passed: the compiler does." },
      { tech: "Git-based Shipper (opt-in)", used: "Stages only Fixer-changed files, commits with an audit trail, pushes to the deploy branch.", advantage: "Ships ride the existing CI/CD path with human-readable history, and it's off by default." },
      { tech: "JSON memory, tracked in git", used: "Cross-run outcomes: fixed, escalated, wontfix: committed alongside fixes.", advantage: "Each run is a fresh process, so memory lives in the repo: it survives thrown-away CI machines and the git log doubles as an audit trail." },
      { tech: "Opt-in LLM Analyst", used: "Quality and AEO judgment: weak titles, generic metas, AI-citability: on top of the free deterministic pass.", advantage: "The expensive model runs only when asked (--deep), capped per run, and judges against the playbook so verdicts are on-strategy." },
    ],
    stack: [
      { group: "Agents", items: ["Claude Agent SDK", "claude-opus-4-8", "System-prompt registry"] },
      { group: "Engine", items: ["TypeScript", "Node 20", "Zero runtime deps (core)"] },
      { group: "Safety", items: ["tsc + build gate", "neverTouch globs", "Tiered auto/verify/escalate"] },
      { group: "Ops", items: ["Git + GitHub", "DigitalOcean CI", "HTML dashboard"] },
    ],
    metaTitle: "Searchlight: Autonomous SEO/AEO Agent | MnT Future Case Study",
    metaDescription:
      "MnT Future built an autonomous SEO/AEO agent on the Claude Agent SDK and ran it on its own site: open issues cut 20 → 6, every fix gated by the production build.",
    resultsTitle: "What happened when we pointed it at our own site?",
    resultsIntro:
      "In July 2026, Searchlight's Monitor found 20 open on-page SEO/AEO issues across mntfuture.com. After the first AI-driven fix pass: every change human-reviewed and shipped through normal CI: the same Monitor measured 6 remaining, a 70% reduction. The longest meta description tightened from 197 to 150 characters and the longest title from 72 to 58.",
    results: [
      { metric: "Open on-page issues", before: "20", after: "6 (−70%)" },
      { metric: "Longest meta description", before: "197 chars", after: "150 chars" },
      { metric: "Longest page title", before: "72 chars", after: "58 chars" },
      { metric: "Detection cadence", before: "Occasional manual audit", after: "Every run, automated" },
    ],
    faq: [
      {
        q: "How can an AI agent edit code without breaking the site?",
        a: "Every fix must pass a deterministic gate: the TypeScript typecheck and the production build: before it counts. If the gate fails, the compiler output is fed back to the Fixer to correct (the self-heal loop); after N failed retries the issue escalates to a human. A change that breaks the build structurally cannot ship.",
      },
      {
        q: "Which parts use an LLM, and which deliberately don't?",
        a: "Judgment uses Claude: the Analyst (is this title compelling? will an AI engine cite this page?) and the Fixer (write the actual code change). Everything rule-decidable is deterministic code: crawling, length/presence checks, link status, the build gate, and git. That split keeps runs cheap, repeatable, and safe: an LLM never grades its own work.",
      },
      {
        q: "Did it really improve mntfuture.com?",
        a: "Yes, and the numbers are from its own Monitor, measured before and after. In July 2026 the first AI-driven fix pass cut open on-page issues from 20 to 6: metas over 155 characters rewritten (longest 197 → 150), titles over 60 trimmed (72 → 58), with every change reviewed and deployed through normal CI.",
      },
      {
        q: "Does it deploy to production by itself?",
        a: "Only if you turn that on. The Shipper is opt-in and off by default: when enabled, it stages only the files the Fixer changed, commits with an audit message, and pushes to the deploy branch, and it never ships anything the Verifier hasn't passed.",
      },
      {
        q: "Can Searchlight run on another site?",
        a: "Yes, it's config-driven by design: one JSON file sets the site URL, thresholds, fix tiers, brand voice, playbook and neverTouch paths. This is the engine behind MnT Future's Custom AI Agents service: the same pattern, domain-trained for your stack.",
      },
    ],
    copy: {
      challengeTitle: "An employee, not an audit.",
      buildTitle: "A detection layer and an action layer.",
      highlightsSubtitle: "Autonomy is easy; safe autonomy is the product. These are the decisions that make it trustworthy.",
      techTitle: "Why we chose each piece, and what it buys the agent.",
      ctaTitle: "Want an agent like this embedded in your stack?",
      ctaBody:
        "Searchlight is the pattern behind our Custom AI Agents service: domain-trained agents with hard safety gates. Book a free agent-readiness audit and we'll map where one pays off in your commerce stack.",
    },
  },
  {
    slug: "wcag-compliance",
    title: "WCAG 2.2 AA",
    tagline:
      "We ran an accessibility audit on our own site and fixed every failure in the design system: no overlay widget. Seven failing checks to zero, measured with axe-core.",
    type: "Internal audit · Dogfooded by MnT Future",
    category: "ADA / WCAG compliance · Design tokens",
    cover: "/work/wcag-cover.png",
    heroShot: "/work/wcag-scan.png",
    frameUrl: "axe-core · mntfuture.com",
    liveUrl: "https://mntfuture.com",
    liveLabel: "The site itself is the proof",
    dateISO: "2026-07-09",
    summary:
      "Most US accessibility lawsuits target ecommerce, and the overlay-widget shortcut has been publicly discredited, so we proved the honest workflow on our own site first. An axe-core baseline (WCAG 2.2 A + AA) across nine key pages of mntfuture.com found 7 failing nodes, all traced to four root causes. We fixed them at the design-token level in July 2026 and re-scanned: zero violations, brand intact, no overlay.",
    facts: [
      { value: "7 → 0", label: "Failing axe nodes after remediation" },
      { value: "9", label: "Key pages scanned: all now violation-free" },
      { value: "4", label: "Root causes: fixed in the design system" },
      { value: "0", label: "Overlay widgets used" },
    ],
    scope: [
      { label: "Role", value: "Accessibility audit + remediation" },
      { label: "Standard", value: "WCAG 2.2 A + AA (axe-core)" },
      { label: "Delivered", value: "Token fixes · a11y-safe 3rd-party embeds" },
      { label: "Status", value: "0 violations across scanned pages" },
    ],
    problem:
      "Accessibility is now a commerce-specific legal risk: the large majority of US ADA website lawsuits target ecommerce, and the FTC's action against overlay vendors ended the 'install a widget' era: courts and plaintiffs treat overlays as evidence of neglect, not compliance. The honest fix lives in the design system itself. Before selling that workflow to clients, we held ourselves to it: audit our own site, fix the real tokens, publish the real numbers.",
    approach: [
      { no: "01", title: "Baseline, honestly", desc: "axe-core against nine key pages: home, both vertical hubs, service pages, work, contact, blog: scoped to WCAG 2.2 A and AA rules. Result: 7 failing nodes across 5 pages." },
      { no: "02", title: "Trace to root causes", desc: "Every failure mapped to four causes: two contrast failures in shared components, one in a global button token, and a third-party iframe with a machine-generated title." },
      { no: "03", title: "Fix the system, not the page", desc: "Contrast fixed by moving tokens within the existing brand palette (brand → brand-700); the third-party embed wrapped with a guard that enforces an accessible name." },
      { no: "04", title: "Re-scan and keep scanning", desc: "Same scanner, same rules: zero violations on all nine pages. The scan is repeatable on any deploy: the same workflow we run for client stores." },
    ],
    build: [
      {
        audience: "The audit",
        icon: "search",
        points: [
          "axe-core engine: the industry-standard WCAG rule set, run in a real browser",
          "Nine key pages scanned: home, /commerce, /ai-agents, services, work, contact, blog",
          "Contrast math checked against WCAG AA thresholds (≥ 4.5:1 for body-size text)",
          "Third-party embeds audited too: iframes need accessible names (WCAG 4.1.2)",
        ],
      },
      {
        audience: "The fixes",
        icon: "shield",
        points: [
          "Global .btn-primary token: white on #2095F1 was 3.16:1 → brand-700 #0E66C2, 5.7:1: one token, every CTA clears the 4.5:1 AA threshold",
          "Footer Subscribe button: rendered on every page: same root cause, same fix",
          "Form microcopy: slate-400 on white was 2.56:1 → slate-500, 4.76:1",
          "Clutch reviews iframe: script kept overwriting the title with a handshake string → a MutationObserver enforces a descriptive name",
        ],
      },
    ],
    productShots: [
      { src: "/work/wcag-scan.png", title: "Before / after, per page", desc: "The axe-core scan across nine key pages: 7 failing nodes before, zero after." },
      { src: "/work/wcag-fixes.png", title: "Four root-cause fixes", desc: "Contrast math and an accessible name for a third-party iframe: fixed in the design system, not painted over." },
      { src: "/work/wcag-cover.png", title: "The honest scoreboard", desc: "Real, dated numbers from our own site: the same audit we run for client stores." },
    ],
    highlights: [
      { icon: "layers", title: "Token-level remediation", desc: "One design-token change fixed every primary CTA on the site at once, and the fix can't drift, because new pages inherit it." },
      { icon: "shield", title: "No overlay widget", desc: "Post-FTC, overlays are a liability. Every fix here is in the actual HTML, CSS and components: the only kind that stands up to an audit." },
      { icon: "network", title: "Third-party embeds handled", desc: "You can't edit a vendor's iframe, but you can guard it: a MutationObserver keeps a descriptive accessible name on the Clutch widget." },
      { icon: "spark", title: "Brand preserved", desc: "The fix moved within MnT Future's own palette: brand-700 is still unmistakably MnT Future blue. Compliance didn't cost the design." },
      { icon: "gauge", title: "Repeatable on every deploy", desc: "The scan is scripted and re-runnable: accessibility as a regression gate, not a one-time certificate." },
      { icon: "check", title: "Honest scope", desc: "Automated rules catch the measurable layer. Keyboard-flow and screen-reader review is the manual layer we run on client engagements." },
    ],
    techDecisions: [
      { tech: "axe-core (WCAG 2.2 A/AA)", used: "The audit engine, run in a real browser against each page.", advantage: "The same rule set plaintiffs' auditors use: deterministic, repeatable, and mapped rule-by-rule to WCAG success criteria." },
      { tech: "Design-token remediation", used: "Contrast fixes made in the shared Tailwind tokens, not per-page overrides.", advantage: "One change fixes every instance sitewide: including pages that don't exist yet." },
      { tech: "In-palette color steps", used: "brand → brand-700 and slate-400 → slate-500 from the existing scale.", advantage: "Clears the AA contrast threshold without inventing new colors: the brand system stays coherent." },
      { tech: "MutationObserver guard", used: "Enforces a descriptive title on the third-party Clutch iframe.", advantage: "Vendor scripts can overwrite attributes at any time; the guard makes the accessible name stick without forking their code." },
    ],
    stack: [
      { group: "Audit", items: ["axe-core 4", "WCAG 2.2 A + AA"] },
      { group: "Remediation", items: ["Tailwind design tokens", "React components"] },
      { group: "Guards", items: ["MutationObserver", "Repeatable scan script"] },
      { group: "Site", items: ["Next.js App Router", "TypeScript"] },
    ],
    metaTitle: "WCAG 2.2 AA on Our Own Site: No Overlay | MnT Future",
    metaDescription:
      "MnT Future audited its own site with axe-core and fixed every WCAG AA failure at the design-token level: 7 failing checks to 0 across 9 pages, no overlay widget.",
    resultsTitle: "What did zero violations actually take?",
    resultsIntro:
      "In July 2026, an axe-core scan (WCAG 2.2 A + AA) of mntfuture.com found 7 failing nodes across 5 of 9 key pages. Every failure traced to four root causes. We fixed them in the design system: two tokens, one text color, one iframe guard, and re-scanned: zero violations on all nine pages, with the brand palette intact.",
    results: [
      { metric: "Failing axe nodes", before: "7", after: "0" },
      { metric: "Pages with violations", before: "5 of 9", after: "0 of 9" },
      { metric: "Primary CTA contrast", before: "3.16:1 (fail)", after: "5.7:1 (AA ✓)" },
      { metric: "Fix location", before: "(overlay era)", after: "Design tokens, in the repo" },
    ],
    faq: [
      {
        q: "Why not just install an accessibility overlay widget?",
        a: "Because overlays don't fix the underlying code, and after the FTC's $1M action against overlay marketing claims, they're treated as a liability, not a defense. Most ADA web lawsuits still target ecommerce sites, overlays installed or not. The only remediation that stands up to an audit is in the actual HTML, CSS and components.",
      },
      {
        q: "How can four fixes clean an entire site?",
        a: "Because the failures lived in shared code, not individual pages: a global button token, a footer component rendered on every page, one form style, and one third-party embed. Fixing the design system fixes every page that uses it: including future ones. That's why we remediate tokens, not screenshots.",
      },
      {
        q: "Did the brand have to change?",
        a: "No: the fix moved within MnT Future's existing palette. The primary button went from brand (#2095F1) to brand-700 (#0E66C2): same blue family, 5.7:1 contrast instead of 3.16:1. Accessible and on-brand are not in tension if the design system has proper color scales.",
      },
      {
        q: "Is an automated scan enough for ADA compliance?",
        a: "No, and we say so plainly: automated rules like axe-core catch the objectively measurable layer: contrast, names, structure. Full WCAG conformance also needs manual keyboard-flow, focus-order and screen-reader review. That manual layer is part of our client engagements; this case study shows the automated layer done honestly.",
      },
      {
        q: "Can you run this on our store?",
        a: "Yes, this is the exact workflow inside our Managed Support & Compliance service: baseline scan, root-cause remediation in your design system, a re-scan you can verify, and the manual review on top. Book a free strategy session and we'll scope your store's ADA exposure.",
      },
    ],
    copy: {
      challengeTitle: "The overlay era is over.",
      buildTitle: "The audit and the fixes.",
      highlightsSubtitle: "Why token-level remediation beats page-by-page patching, and what we deliberately don't claim.",
      techTitle: "Why we fixed it this way.",
      ctaTitle: "Is your store carrying ADA risk?",
      ctaBody:
        "Most US accessibility lawsuits target ecommerce. We'll run this exact audit on your store: baseline scan, root-cause fixes in your design system, verifiable re-scan. Book a free strategy session to scope it.",
    },
  },
  {
    slug: "ai-cleanup-lab",
    title: "AI Cleanup Lab",
    tagline:
      "We built a deliberately 'vibe-coded' store, proved it was broken with live exploits and a load test, then rebuilt it hardened: every number measured, before and after.",
    type: "R&D lab · Built by MnT Future",
    category: "AI Cleanup · security & scalability",
    cover: "/work/cleanup-cover.png",
    heroShot: "/work/cleanup-exploits.png",
    frameUrl: "ai-cleanup-lab · localhost",
    dateISO: "2026-07-09",
    summary:
      "AI codegen and no-code tools ship stores that demo perfectly and fall over: insecurely: at real scale. To prove the AI Cleanup workflow, we built exactly that: an intentionally vibe-coded store, then attacked it. A static scan found 7 issues (2 critical); 5 of 5 live exploits landed; a load test topped out near 680 req/s with ~650ms tail latency. We re-architected it: 0 findings, 0 exploits, ~33,000 req/s. Same features: different engineering. It's a reproducible lab, not a slide.",
    facts: [
      { value: "7 → 0", label: "Security findings (2 critical → 0)" },
      { value: "5/5 → 0/5", label: "Live exploits that landed" },
      { value: "~48×", label: "Throughput after re-architecture" },
      { value: "~50×", label: "Lower p99 tail latency" },
    ],
    scope: [
      { label: "Role", value: "Security audit + re-architecture (R&D)" },
      { label: "Method", value: "SAST + live exploits + load test" },
      { label: "Delivered", value: "Hardened rebuild · reproducible lab" },
      { label: "Status", value: "Reproducible via one command" },
    ],
    problem:
      "'Vibe-coded' stores: generated by AI or assembled in a no-code tool: look production-ready and aren't. They ship with injectable inputs, secrets in source, missing access control, and architecture that collapses the moment real traffic arrives. Founders find out the hard way: a breach, a leaked card list, or a checkout that times out on launch day. We wanted to show the failure and the fix with evidence, not adjectives, so we built the broken store ourselves and measured everything.",
    approach: [
      { no: "01", title: "Build the 'before' honestly", desc: "A small store with the exact anti-patterns these tools produce: a search filter built with new Function(), a hardcoded payment key, an unauthenticated admin route, unescaped output, and the whole database re-read from disk on every request." },
      { no: "02", title: "Prove it's broken", desc: "Three deterministic tools: a static scanner (semgrep-style rules), a live exploit prober that actually runs each attack, and a load test. Result: 7 findings, 5/5 exploits landing, ~680 req/s with a ~650ms p99." },
      { no: "03", title: "Re-architect, don't patch", desc: "Same features, rebuilt: parameterized/safe logic, auth with redacted PII, input validation, secrets from env, a rate limiter, and the database loaded once into an in-memory index: no disk on the hot path." },
      { no: "04", title: "Re-run the exact tests", desc: "Same scanner, same exploits, same load test: 0 findings, 0/5 exploits, ~33,000 req/s, ~12ms p99. The whole lab reproduces from one command." },
    ],
    build: [
      {
        audience: "Proving it's broken",
        icon: "search",
        points: [
          "Static scan (SAST): semgrep-style rules over the source: 7 findings, 2 critical",
          "Live exploit prober: runs each attack for real, not a checklist: 5 of 5 land",
          "Load test: 3000 requests at concurrency 60, measuring throughput and tail latency",
          "Every result written to results.json: the case study's numbers come straight from it",
        ],
      },
      {
        audience: "The hardened rebuild",
        icon: "shield",
        points: [
          "Code injection → safe substring search (no new Function / eval)",
          "Hardcoded secret → payment key from env, never returned to the client",
          "Broken access control → bearer-token auth on admin, card/email data redacted",
          "Reflected XSS → all user input HTML-escaped on output",
          "Price manipulation → checkout validates an integer quantity (1 to 99)",
          "Scalability → database loaded once into an in-memory index; a rate limiter added",
        ],
      },
    ],
    productShots: [
      { src: "/work/cleanup-exploits.png", title: "Five exploits, live-tested", desc: "Each attack runs against both stores: all five land on the before, all five are blocked after." },
      { src: "/work/cleanup-load.png", title: "Same features, ~48× throughput", desc: "The before re-reads the whole database from disk per request; the after serves from memory." },
      { src: "/work/cleanup-cover.png", title: "The measured scoreboard", desc: "Security, exploitability and load: before and after, from a reproducible run." },
    ],
    highlights: [
      { icon: "lock", title: "Evidence, not adjectives", desc: "We don't say 'more secure': a prober runs five real attacks and reports which land. 5/5 before, 0/5 after." },
      { icon: "code", title: "Root cause: new Function()", desc: "The search built a filter from user input with new Function(): textbook remote code execution. AI tools generate this pattern constantly." },
      { icon: "gauge", title: "Architecture beats micro-tuning", desc: "Throughput jumped ~48× from one decision: stop re-reading a 733 KB database from disk on every request. Load it once." },
      { icon: "shield", title: "Secrets and PII contained", desc: "A live payment key was hardcoded and echoed to the client; admin orders leaked emails and card digits. Both closed at the source." },
      { icon: "bolt", title: "Reproducible in one command", desc: "npm run lab boots both stores, runs the scan, exploits and load test, and writes the numbers. Anyone can re-run it." },
      { icon: "check", title: "Honest lab framing", desc: "These are localhost, single-machine numbers on a demo store: the multiples are real, and we say exactly how they were produced." },
    ],
    techDecisions: [
      { tech: "SAST scanner (semgrep-style)", used: "Pattern rules over the source: injection, secrets, access control, unescaped output.", advantage: "Deterministic and re-runnable on every commit: the same class of tool that catches these issues in a real audit." },
      { tech: "Live exploit prober", used: "Sends each real attack and checks whether it succeeds.", advantage: "Proves exploitability instead of asserting it: the difference between 'looks risky' and '5 of 5 land'." },
      { tech: "In-memory index (the rebuild)", used: "The database is loaded once at boot and indexed by id and category.", advantage: "Removes synchronous disk I/O from the request path: the single change behind the ~48× throughput gain." },
      { tech: "Env-based secrets + auth + validation", used: "Payment key from env, bearer-token admin auth, integer-range checkout validation.", advantage: "Closes the injection, secret-exposure, access-control and price-manipulation vectors at their root, not with a filter in front." },
    ],
    stack: [
      { group: "Lab", items: ["Node 20+", "Zero dependencies", "Reproducible harness"] },
      { group: "Audit", items: ["Static analysis", "Live exploit probes", "Load test"] },
      { group: "Fixes", items: ["Input validation", "AuthN/Z", "Output escaping"] },
      { group: "Scale", items: ["In-memory index", "Rate limiting", "No hot-path disk I/O"] },
    ],
    metaTitle: "AI Cleanup: The Vibe-Coded Store That Broke | MnT Future",
    metaDescription:
      "MnT Future built a deliberately vibe-coded store, proved it broken (7 findings, 5/5 exploits, ~680 req/s), then rebuilt it: 0 findings, 0 exploits, ~33,000 req/s.",
    resultsTitle: "What did the re-architecture actually change?",
    resultsIntro:
      "Measured before and after on the same store, same tests (July 2026). Static findings went from 7 (2 critical) to 0. Live exploits went from 5 of 5 landing to 0 of 5. Throughput rose from ~680 to ~33,000 requests per second, and p99 tail latency dropped from ~650ms to ~12ms: driven by removing a synchronous full-database disk read from every request.",
    results: [
      { metric: "Security findings", before: "7 (2 critical)", after: "0" },
      { metric: "Exploits that landed", before: "5 of 5", after: "0 of 5" },
      { metric: "Throughput", before: "~680 req/s", after: "~33,000 req/s" },
      { metric: "p99 tail latency", before: "~650 ms", after: "~12 ms" },
    ],
    faq: [
      {
        q: "Is this a real client's store?",
        a: "No, and we're explicit about that. It's an R&D lab: MnT Future built the intentionally broken store to demonstrate the AI Cleanup workflow with evidence rather than a real client's incident. Every number comes from a reproducible run (npm run lab), not an estimate. The vulnerabilities and the fixes are exactly what we find and do on real engagements.",
      },
      {
        q: "What actually made it insecure?",
        a: "Five root causes an AI codegen tool commonly ships: a search filter built with new Function() (remote code execution), a hardcoded payment key that was also echoed to the client, an admin endpoint with no authentication leaking emails and card digits, search output reflected into HTML unescaped (XSS), and a checkout that accepted a negative quantity for a negative total. A live prober confirms all five before, none after.",
      },
      {
        q: "How did throughput jump ~48× without new hardware?",
        a: "The vibe-coded store re-read and re-parsed the entire 733 KB database from disk, synchronously, on every request: serializing Node's event loop. The rebuild loads it once at boot into an in-memory index and never touches disk on the hot path. Same feature set; the gain is architecture, not micro-optimization.",
      },
      {
        q: "Are these numbers production benchmarks?",
        a: "No: they're localhost, single-machine lab numbers on a demo store, and we label them that way. What's meaningful is the delta and its cause: the security results are deterministic (7→0, 5/5→0/5), and the load multiple comes from a specific, explainable architectural fix you can reproduce.",
      },
      {
        q: "My store was built with AI or no-code: can you do this on it?",
        a: "Yes, this is our AI Cleanup service: a security audit (AI-generated code carries measurably more vulnerabilities), a re-architecture for scale, test coverage, and a clean production handover. Book a free strategy session and we'll scope your store's real exposure.",
      },
    ],
    copy: {
      challengeTitle: "Looks shipped. Isn't.",
      buildTitle: "Break it, then rebuild it.",
      highlightsSubtitle: "Why we measure instead of assert, and exactly how each number was produced.",
      techTitle: "Why we built and fixed it this way.",
      ctaTitle: "Was your store built with AI or no-code?",
      ctaBody:
        "AI-generated code carries measurably more vulnerabilities. We'll run this exact audit on your store: security, scalability, and a clean production handover. Book a free strategy session to scope it.",
    },
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
