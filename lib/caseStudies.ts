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
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "lobbi",
    title: "LOBBI",
    tagline: "India's all-in-one sports & turf booking platform",
    type: "Platform · Built by MnT",
    category: "Sports & fitness · Two-sided marketplace",
    cover: "/work/lobbi-cover-v2.png",
    heroShot: "/work/lobbi-owner.webp",
    liveUrl: "https://lobbi.in",
    liveLabel: "Visit lobbi.in",
    summary:
      "LOBBI lets players discover and book turfs, find matches, join tournaments and connect — while venue owners manage slots, pricing and payouts. MnT designed and engineered the full platform end to end: a player app, a venue-owner app, a web app, a real-time FastAPI backend with payments, and an AI WhatsApp booking agent — live at lobbi.in and on Google Play.",
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
    metaTitle: "LOBBI — Sports & Turf Booking Platform | Case Study | MnT",
    metaDescription:
      "How MnT designed and built LOBBI — India's all-in-one sports platform: a player app, a venue-owner app, a web app and a real-time FastAPI backend with Cashfree payments.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
