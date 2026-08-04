/**
 * Client platforms, for the India tree.
 *
 * Every fact here was verified before it was written: the sector comes from
 * what each site says about itself, and the capability lines are derived from
 * the dependencies actually present in each project rather than from what a
 * site of that kind usually has. Where we do not have the repository to check,
 * the entry says what the site is and stops there. That is the whole rule for
 * this page: no capability claimed that was not confirmed.
 */

export type ClientProject = {
  name: string;
  host: string;
  url: string;
  sector: string;
  /** Where the client is, when it is not India. */
  region?: string;
  /** What the build actually does. Only lines confirmed in the codebase. */
  build?: string[];
  /** Verified from the project's own manifest. */
  stack?: string[];
  /** Screenshot of the live site, captured at 1440 and downsampled to 1600x1000. */
  shot: string;
  /** Detail page slug. Matches the screenshot filename, so the two cannot drift. */
  slug: string;
};

export const INDIA_CLIENTS: ClientProject[] = [
  {
    name: "Blufacade",
    shot: "/clients/blufacade.webp",
    slug: "blufacade",
    host: "blufacade.com",
    url: "https://www.blufacade.com/",
    sector: "Facade systems: ACP, structural glazing, aluminium",
    build: [
      "Projects and services managed from an admin panel rather than edited in code",
      "Image upload and delivery for the project gallery",
      "Enquiries emailed to the team as they arrive",
      "Password-protected admin with signed sessions",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "MongoDB", "Cloudinary"],
  },
  {
    name: "The Print Emporium",
    shot: "/clients/print-emporium.webp",
    slug: "print-emporium",
    host: "theprintemporium.in",
    url: "https://www.theprintemporium.in/",
    sector: "Custom printing: business cards, flyers, banners",
    build: [
      "Online ordering with payment through Razorpay",
      "Customer artwork uploaded and stored on S3",
      "Catalogue and orders held in a database, managed from an admin",
      "Order and enquiry email on every submission",
    ],
    stack: ["Express 5", "MongoDB", "Razorpay", "AWS S3", "Cloudinary"],
  },
  {
    name: "VSV Unite",
    shot: "/clients/vsv-unite.webp",
    slug: "vsv-unite",
    host: "vsvunite.com",
    url: "https://www.vsvunite.com/",
    sector: "Network marketing platform: binary and PV earning model",
    build: [
      "The earning model itself, built as software: binary tree placement and point-volume calculation",
      "Member accounts with hashed credentials and encrypted secrets",
      "Team tree endpoints so a member can see their own downline",
      "Documented architecture, kept in the repository alongside the code",
    ],
    stack: ["Python", "FastAPI-style service", "MongoDB", "AWS (boto3)"],
  },
  {
    name: "Solar Power House",
    shot: "/clients/solar-power-house.webp",
    slug: "solar-power-house",
    host: "solarpowerhouses.in",
    url: "https://solarpowerhouses.in/",
    sector: "Solar energy systems for homes and businesses",
    build: [
      "Products and projects served from a database, editable without a deploy",
      "Image upload for installation galleries",
      "Admin login with signed sessions",
    ],
    stack: ["Express", "MongoDB", "Cloudinary"],
  },
  {
    name: "Career HQ",
    shot: "/clients/career-hq.webp",
    slug: "career-hq",
    host: "careerhq.in",
    url: "https://careerhq.in/",
    sector: "International education: university and course discovery",
    build: [
      "Universities and courses held as structured records, searchable rather than listed as pages",
      "Student enquiries captured and emailed through to counsellors",
      "Media handled through Cloudinary",
      "Admin area behind hashed credentials",
    ],
    stack: ["Next.js 15", "React 19", "TypeScript", "MongoDB", "Cloudinary"],
  },
  {
    name: "JCSS Global",
    shot: "/clients/jcss-global.webp",
    slug: "jcss-global",
    host: "jcssglobal.com",
    url: "https://www.jcssglobal.com/",
    sector: "Accounting, tax and advisory services",
    build: [
      "Services and content served from a database rather than hardcoded",
      "Enquiry routing by email to the right part of the practice",
    ],
    stack: ["Express 5", "MongoDB"],
  },
  {
    name: "Elegant Care Services",
    shot: "/clients/elegant-care.webp",
    slug: "elegant-care",
    host: "elegantcareservices.com.au",
    url: "https://elegantcareservices.com.au/",
    sector: "NDIS disability support: supported independent living and respite",
    region: "Australia",
    build: [
      "Services and support content managed from an admin panel",
      "Enquiry forms routed by email to the care team",
      "Media upload and delivery",
      "Admin login with signed sessions",
    ],
    stack: ["Next.js 16", "React 19", "TypeScript", "MongoDB", "Cloudinary"],
  },
  {
    name: "RG Golden Palace",
    shot: "/clients/rg-golden-palace.webp",
    slug: "rg-golden-palace",
    host: "rggoldenpalace.com",
    url: "https://rggoldenpalace.com/",
    sector: "Wedding venue, Singampunari, Sivagangai",
    build: [
      "Booking with payment through Razorpay",
      "Email verification on account creation, implemented and documented",
      "Route protection through middleware, so the booking area is genuinely gated",
      "Media stored on S3",
    ],
    stack: ["Next.js 14", "React 18", "MongoDB", "Razorpay", "AWS S3"],
  },
  {
    name: "Perfect Pest Control",
    shot: "/clients/perfect-pest-control.webp",
    slug: "perfect-pest-control",
    host: "perfectpestcontrol.services",
    url: "https://www.perfectpestcontrol.services/",
    sector: "Pest control: anti-termite, rodent and bed bug treatment",
    build: [
      "Services and treatment content managed from an admin",
      "Enquiries emailed on submission",
      "Image upload for service galleries",
      "Admin behind hashed credentials and signed sessions",
    ],
    stack: ["Next.js 15", "React 18", "TypeScript", "MongoDB", "Cloudinary"],
  },
  {
    name: "Sri Jaidev Tours & Travels",
    shot: "/clients/sri-jaidev-travels.webp",
    slug: "sri-jaidev-travels",
    host: "srijaidevtravels.com",
    url: "https://srijaidevtravels.com/",
    sector: "Travel services, Madurai: one-way, round trip and packages",
    build: [
      "Routes, packages and rates held as records, editable from an admin",
      "Booking enquiries emailed as they come in",
      "Media upload and delivery",
      "Admin login with signed sessions",
    ],
    stack: ["Next.js 15", "React 18", "TypeScript", "MongoDB", "Cloudinary"],
  },
  {
    name: "Vinushree Tours & Travels",
    shot: "/clients/vinushree-travels.webp",
    slug: "vinushree-travels",
    host: "vinushreetravels.com",
    url: "https://www.vinushreetravels.com/",
    sector: "Travel services, Madurai: one-way, round trip and packages",
    build: [
      "Routes, packages and rates held as records, editable from an admin",
      "Booking enquiries emailed as they come in",
      "Media upload and delivery",
      "Admin login with signed sessions",
    ],
    stack: ["Next.js 15", "React 18", "TypeScript", "MongoDB", "Cloudinary"],
  },
  {
    name: "Filigree Solutions",
    shot: "/clients/filigree-solutions.webp",
    slug: "filigree-solutions",
    host: "filigreesolutions.com",
    url: "https://filigreesolutions.com/",
    sector: "CAD, CAE, structural analysis and engineering simulation",
    build: [
      "Services and portfolio held as records, with seeding scripts kept in the repository",
      "Enquiries emailed through on submission",
      "Media upload and delivery",
      "Admin behind hashed credentials",
    ],
    stack: ["Next.js 15", "React 18", "TypeScript", "MongoDB", "Cloudinary"],
  },
  // No repository to inspect, so these say what they are and claim nothing
  // about how they were built. Better a short entry than an invented one.
  {
    name: "Santhosh Ambulance Service",
    shot: "/clients/santhosh-ambulance.webp",
    slug: "santhosh-ambulance",
    host: "santhoshambulance.com",
    url: "https://santhoshambulance.com/",
    sector: "Ambulance and emergency transport",
  },
  {
    name: "Dheera Technologies",
    shot: "/clients/dheera-technologies.webp",
    slug: "dheera-technologies",
    host: "dheeratechnologies.com",
    url: "https://dheeratechnologies.com/",
    sector: "Technology services",
  },
  {
    name: "We Believe Logistics",
    shot: "/clients/we-believe-logistics.webp",
    slug: "we-believe-logistics",
    host: "webelievelogistics.org",
    url: "https://webelievelogistics.org/",
    sector: "Logistics and freight",
  },
  {
    name: "Syarikat Logam Mahaajaya",
    shot: "/clients/mahaajaya.webp",
    slug: "mahaajaya",
    host: "mahaajaya.com",
    url: "https://mahaajaya.com/",
    sector: "Metals and industrial supply",
    region: "Malaysia",
  },
];

/** Sites with a build we could verify, listed first. */
export const CLIENTS_WITH_BUILD = INDIA_CLIENTS.filter((c) => c.build?.length);
export const CLIENTS_LISTED = INDIA_CLIENTS.filter((c) => !c.build?.length);
