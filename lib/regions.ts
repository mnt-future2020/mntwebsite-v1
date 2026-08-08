import { commerceNav, aiNav, type NavGroup } from "./site";

/**
 * Two markets, one site.
 *
 * The US site stays at the root: it already ranks there, and moving 65 pages
 * behind /us would cost redirects and rankings for no gain. India lives under
 * /in, so every India URL is one prefix away from its US counterpart and
 * hreflang can pair them without guesswork.
 *
 * The regions are not translations of each other. They sell different things to
 * different buyers, so the nav, the vocabulary and the proof all differ. The
 * only thing they share is the design system.
 */

export type Region = "us" | "in";

/** Which region a URL belongs to. The prefix is the whole rule. */
export function regionFromPath(pathname: string): Region {
  return pathname === "/in" || pathname.startsWith("/in/") ? "in" : "us";
}

// India says "Ecommerce", not "Commerce": it is what Indian buyers search for
// and what they call it out loud. AI is a top-level category here rather than a
// layer inside commerce, because in India it is a separate thing people buy.
export const inEcommerceNav: NavGroup = {
  label: "Ecommerce",
  href: "/in/ecommerce",
  overviewLabel: "Ecommerce overview",
  children: [
    {
      label: "Ecommerce Platform Development",
      href: "/in/ecommerce/platform-development",
      desc: "Your own platform, built to scale. GST, UPI and Indian payments handled",
    },
    {
      label: "D2C Storefronts",
      href: "/in/ecommerce/d2c-storefront",
      desc: "Sell straight to your customers, on a platform you own",
    },
    {
      label: "Marketplace Platforms",
      href: "/in/ecommerce/marketplace",
      desc: "Many sellers, one platform: commission, payouts and settlement",
    },
    {
      label: "B2B & Wholesale",
      href: "/in/ecommerce/b2b-wholesale",
      desc: "Customer pricing, quotes and bulk ordering, connected to your ERP",
    },
    {
      label: "Integrations & Automation",
      href: "/in/ecommerce/integrations",
      desc: "Tally, ERP, WMS, courier and payment gateway in one flow",
    },
    {
      label: "Managed Support",
      href: "/in/ecommerce/managed-support",
      desc: "We run and maintain the platform, against an SLA",
    },
  ],
};

// Four things a client can buy, and one page explaining how all four get
// delivered. FDE sits inside AI rather than beside it: it is the delivery
// model for this category, not a fifth thing to buy.
export const inAiNav: NavGroup = {
  label: "AI",
  href: "/in/ai",
  overviewLabel: "AI overview",
  children: [
    {
      label: "AI Consultation",
      href: "/in/ai/consultation",
      desc: "What AI is worth doing in your business, and what getting it working costs",
    },
    {
      label: "AI Automation",
      href: "/in/ai/automation",
      desc: "Automate the work your team repeats every single day",
    },
    {
      label: "AI Agent Development",
      href: "/in/ai/agent-development",
      desc: "Agents that do real work, with checks on everything they do",
    },
    {
      label: "Customised AI Applications",
      href: "/in/ai/custom-applications",
      desc: "A complete application built for your business, with AI inside it",
    },
    {
      label: "How we deliver: Forward Deployed Engineering",
      href: "/in/ai/forward-deployed-engineering",
      desc: "Senior engineers inside your team until it is running every day",
    },
  ],
};

// Ready applications we host, brand and customise for a client. Distinct from
// Customised AI Applications, which start from nothing: these start from
// something that already works, which is why they are faster and cheaper.
export const inProductsNav: NavGroup = {
  label: "Products",
  href: "/in/products",
  overviewLabel: "Products overview",
  children: [
    {
      label: "MnT AI Desk",
      href: "/in/products/ai-desk",
      desc: "Support desk: every customer message in one inbox, AI answering the repeats",
    },
    {
      label: "MnT AI CRM",
      href: "/in/products/ai-crm",
      desc: "WhatsApp, automation, AI agent and CRM in one screen",
    },
    {
      label: "MnT Commerce India",
      href: "/in/products/commerce-india",
      desc: "Your own ecommerce platform with GST built in, no cut of your orders",
    },
  ],
};

export type RegionConfig = {
  key: Region;
  /** Shown in the region switcher. */
  label: string;
  short: string;
  flag: string;
  /** Prefix for every link in this region. "" for the US root. */
  base: string;
  /** hreflang value. */
  locale: string;
  /** Top-level desktop nav. */
  navLinks: { label: string; href: string }[];
  /** Grouped nav, used by the mobile menu and the footer. */
  groups: NavGroup[];
  cta: { label: string; href: string };
  announcement: string;
  /**
   * What the footer says the company does. This used to be one hardcoded US
   * sentence — "we build AI-native, agent-ready commerce platforms for US D2C
   * and marketplace brands" — printed at the bottom of all 25 India pages. An
   * Indian visitor who read to the end of /in was told, in the company's own
   * words, that it builds for somebody else.
   */
  footerBlurb: string;
  /** The newsletter pitch, for the same reason: the topics differ by market. */
  newsletterBlurb: string;
};

export const REGIONS: Record<Region, RegionConfig> = {
  us: {
    key: "us",
    label: "United States",
    short: "US",
    flag: "🇺🇸",
    base: "",
    locale: "en-US",
    navLinks: [
      { label: "Commerce", href: "/commerce" },
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
    ],
    groups: [commerceNav, aiNav],
    cta: { label: "Book a strategy session", href: "/strategy-session" },
    announcement: "Now shipping: ACP · Google UCP · Retail MCP integrations",
    footerBlurb:
      "MnT Future: we build AI-native, agent-ready commerce platforms for US D2C & marketplace brands.",
    newsletterBlurb:
      "Occasional, practical notes on AI-native, agent-ready commerce. No spam.",
  },
  in: {
    key: "in",
    label: "India",
    short: "IN",
    flag: "🇮🇳",
    base: "/in",
    locale: "en-IN",
    navLinks: [
      { label: "Ecommerce", href: "/in/ecommerce" },
      { label: "AI", href: "/in/ai" },
      { label: "Products", href: "/in/products" },
      { label: "Work", href: "/in/work" },
    ],
    groups: [inEcommerceNav, inAiNav, inProductsNav],
    cta: { label: "Talk to a Senior Engineer", href: "/in/strategy-session" },
    announcement: "New: MnT AI Desk · MnT AI CRM · MnT Commerce India",
    footerBlurb:
      "MnT Future: we build online stores with GST built in, and AI systems your team actually uses, for Indian businesses.",
    newsletterBlurb:
      "Occasional, practical notes on running an online business and using AI without wasting money. No spam.",
  },
};

/** Footer columns for a region: its service groups, then one company column. */
export function footerNavFor(region: Region) {
  const cfg = REGIONS[region];
  const b = cfg.base;
  return [
    ...cfg.groups.map((g) => ({
      title: g.label,
      links: g.children.map((c) => ({ label: c.label, href: c.href })),
    })),
    {
      title: "Company",
      links: [
        { label: cfg.cta.label, href: cfg.cta.href },
        { label: "About", href: `${b}/about` },
        { label: "Work", href: `${b}/work` },
        { label: "Open Source", href: "/open-source" },
        ...(region === "us"
          ? [{ label: "Security & Compliance", href: "/security-compliance" }]
          : []),
        { label: "Blog", href: "/blog" },
        { label: "Contact", href: `${b}/contact` },
      ],
    },
  ];
}

/**
 * The counterpart URL in the other region, used by the switcher and by
 * hreflang. Only paths that genuinely exist in both regions are paired; the
 * rest fall back to the other region's home, because pointing hreflang at a
 * 404 is worse than pointing it at a landing page.
 */
const PAIRS: [string, string][] = [
  ["/", "/in"],
  ["/work", "/in/work"],
  ["/about", "/in/about"],
  ["/contact", "/in/contact"],
  ["/strategy-session", "/in/strategy-session"],
];

export function counterpart(pathname: string, to: Region): string {
  const from: Region = regionFromPath(pathname);
  if (from === to) return pathname;
  for (const [us, ind] of PAIRS) {
    if (to === "in" && pathname === us) return ind;
    if (to === "us" && pathname === ind) return us;
  }
  return to === "in" ? "/in" : "/";
}
