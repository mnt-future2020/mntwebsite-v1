export const site = {
  name: "MnT",
  legalName: "Magizh NexGen Technologies",
  domain: "mntfuture.com",
  url: "https://mntfuture.com",
  email: "info@mntfuture.com",
  phone: "+91 00000 00000",
  tagline: "Healthcare & E-Commerce Software Development",
  description:
    "MnT (Magizh NexGen Technologies) is a healthcare and e-commerce software development company. We engineer compliant healthcare platforms and high-growth commerce stores — one senior team, two specialisms, India + global.",
  social: {
    instagram: "https://www.instagram.com/mntfuture",
    linkedin: "https://www.linkedin.com/company/mntfuture",
    facebook: "https://www.facebook.com/mntfuture",
  },
};

// Centralised, professionally curated photography (Unsplash CDN, hot-linked via next/image).
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;

export const images = {
  hero: u("1576091160550-2173dba999ef", 1600), // clinician on laptop — telemedicine
  healthcare: u("1505751172876-fa1923c5c528"), // doctor
  hospital: u("1519494026892-80bbd2d6fd0d"), // hospital corridor
  ecommerce: u("1556742049-0cfed4f6a45d"), // online payment / shopping
  packages: u("1563013544-824ae1b704d3"), // D2C packaging / fulfilment
  mobileShopping: u("1586528116311-ad8dd3c8310d"), // mobile commerce
  team: u("1497366216548-37526070297c", 1600), // team / office
  dev: u("1581091226825-a6a2a5aee158"), // engineer coding
};

export type NavChild = { label: string; href: string; desc: string };
export type NavGroup = {
  label: string;
  href: string;
  overviewLabel: string;
  children: NavChild[];
};

export const healthcareNav: NavGroup = {
  label: "Healthcare",
  href: "/healthcare-software-development",
  overviewLabel: "Healthcare overview",
  children: [
    { label: "Custom Healthcare Software", href: "/healthcare-software-development/custom", desc: "Bespoke platforms built around your clinical workflow" },
    { label: "Telemedicine Apps", href: "/healthcare-software-development/telemedicine", desc: "Video visits, e-Rx, scheduling — HIPAA-ready" },
    { label: "EHR / EMR Development", href: "/healthcare-software-development/ehr-emr", desc: "Interoperable records that actually talk to each other" },
    { label: "Hospital Management", href: "/healthcare-software-development/hospital-management", desc: "OPD, IPD, billing, pharmacy, labs, ABDM-ready" },
    { label: "AI in Healthcare", href: "/healthcare-software-development/ai-healthcare", desc: "Ambient scribe, claims automation, analytics" },
    { label: "ABDM & FHIR Integration", href: "/healthcare-software-development/abdm-fhir", desc: "Connect to India's national health network" },
    { label: "Healthcare SaaS Products", href: "/healthcare-software-development/saas", desc: "Vertical SaaS for funded healthtech startups" },
  ],
};

export const ecommerceNav: NavGroup = {
  label: "E-Commerce",
  href: "/ecommerce-development",
  overviewLabel: "E-Commerce overview",
  children: [
    { label: "Custom E-Commerce", href: "/ecommerce-development/custom", desc: "For brands that have outgrown templates" },
    { label: "D2C Brand Platforms", href: "/ecommerce-development/d2c", desc: "Own your customer, own your margin" },
    { label: "Marketplace Development", href: "/ecommerce-development/marketplace", desc: "Multi-vendor platforms built to scale" },
    { label: "Shopify / Headless", href: "/ecommerce-development/shopify", desc: "Beyond the theme store — custom & headless" },
    { label: "B2B E-Commerce", href: "/ecommerce-development/b2b", desc: "Quotes, approvals, account pricing" },
    { label: "E-Commerce Apps", href: "/ecommerce-development/mobile-app", desc: "Native & cross-platform shopping apps" },
    { label: "Commerce SaaS Products", href: "/ecommerce-development/saas", desc: "Vertical SaaS for funded commerce startups" },
  ],
};

export const companyNav = {
  label: "Company",
  children: [
    { label: "About MnT", href: "/about", desc: "Who we are and how we work" },
    { label: "Security & Compliance", href: "/security-compliance", desc: "HIPAA · ABDM · ISO 27001 · SOC 2 · GDPR" },
    { label: "Blog", href: "/blog", desc: "Guides on healthcare, commerce & SaaS" },
    { label: "Contact", href: "/contact", desc: "Start a project or book a discovery call" },
  ],
};

export const footerNav = [
  {
    title: "Healthcare",
    links: healthcareNav.children.map((c) => ({ label: c.label, href: c.href })),
  },
  {
    title: "E-Commerce",
    links: ecommerceNav.children.map((c) => ({ label: c.label, href: c.href })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Work", href: "/work" },
      { label: "Security & Compliance", href: "/security-compliance" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Healthcare Hub", href: "/healthcare-software-development" },
      { label: "E-Commerce Hub", href: "/ecommerce-development" },
    ],
  },
];
