import type { IconName } from "@/components/Icon";

/**
 * The Madurai local pages.
 *
 * Three keywords with real local demand — web development, ecommerce website
 * development and mobile application development, each "in Madurai" — and a hub
 * that holds the local signals they all share.
 *
 * Two things about how these are written. First, they open with a paragraph
 * that answers who we are, where we are and what we do, in that order and in
 * plain sentences: that paragraph is what an answer engine lifts, and a page
 * that buries it under a slogan does not get quoted. Second, every proof entry
 * is a live site with a link, and the ones in Madurai say Madurai. The
 * companies ranking for these terms today cannot show local work, which is the
 * one advantage on this page that cannot be copied by writing better copy.
 *
 * There is no pricing here. That is a standing decision for the India tree, and
 * it costs us something real on these pages, because a rupee figure is exactly
 * the kind of specific an answer engine repeats. Timelines are given instead,
 * and they are the honest ones we already quote on the service pages.
 */

export type LocalProof = {
  kind: string;
  name: string;
  what: string;
  href: string;
};

export type LocalService = {
  slug: string;
  /** The search phrase this page is written for, used verbatim in the H1. */
  keyword: string;
  navLabel: string;
  eyebrow: string;
  heroSub: string;
  /**
   * The extractable answer. Who, where, what, proof — no metaphors, no
   * build-up. Kept to roughly ninety words so it survives being quoted whole.
   */
  answer: string;
  builds: { icon: IconName; title: string; desc: string }[];
  buildsTitle: string;
  /** Timelines and engagement shape: the specifics, minus the price. */
  engagement: { label: string; value: string; note: string }[];
  stack: { group: string; items: string[] }[];
  process: { title: string; desc: string }[];
  proofTitle: string;
  proof: LocalProof[];
  /** Who should not hire us for this. A filter, and a credibility signal. */
  notFor: string[];
  faq: { q: string; a: string }[];
  cta: { title: string; body: string; label: string };
  metaTitle: string;
  metaDescription: string;
};

/* -------------------------------------------------------------- the proof */

// Two of these are Madurai businesses and say so on their own sites. That is
// the local evidence the rest of this page rests on, so it leads.
const TRAVEL_MADURAI: LocalProof[] = [
  {
    kind: "Madurai · Travel",
    name: "Sri Jaidev Tours & Travels",
    what: "Booking and enquiry platform for a Madurai travel company: one-way, round trip and package routes, priced and quoted without a phone call.",
    href: "/in/work/clients/sri-jaidev-travels",
  },
  {
    kind: "Madurai · Travel",
    name: "Vinushree Tours & Travels",
    what: "A second Madurai travel operator on the same footing: routes, fares and enquiries handled by the platform rather than by a person with a notebook.",
    href: "/in/work/clients/vinushree-travels",
  },
];

const VENUE: LocalProof = {
  kind: "Sivagangai · Hospitality",
  name: "RG Golden Palace",
  what: "A wedding venue running on seventeen connected modules: bookings, rooms, guests, staff, expenses, inventory and the log book, in one system.",
  href: "/in/work/clients/rg-golden-palace",
};

const PEST: LocalProof = {
  kind: "Tamil Nadu · Home services",
  name: "Perfect Pest Control",
  what: "Service enquiries, treatment types and territory, run from an admin the owner changes without calling us.",
  href: "/in/work/clients/perfect-pest-control",
};

/* ------------------------------------------------------------- the hub */

export const MADURAI_HUB = {
  eyebrow: "Madurai, Tamil Nadu",
  h1: "Software development company in Madurai",
  heroSub:
    "We build the system a business runs on, from Madurai. Websites, ecommerce platforms and mobile apps, custom built and handed over in your name.",
  answer:
    "MnT Future is a software development company based in Madurai, Tamil Nadu. We build custom websites, ecommerce platforms and mobile applications for businesses in Madurai and across India. Our client platforms are live today in travel, hospitality, construction, healthcare, engineering and logistics, including travel companies here in Madurai. Everything is a custom build on Next.js, PostgreSQL and React Native rather than a theme or a page builder, and the platform is yours: your domain, your data, your code, handed over.",
  services: [
    {
      slug: "web-development",
      label: "Web development",
      desc: "Custom websites and the admin your team actually works in.",
    },
    {
      slug: "ecommerce-development",
      label: "Ecommerce development",
      desc: "Online stores with GST, UPI and cash on delivery built in.",
    },
    {
      slug: "mobile-app-development",
      label: "Mobile app development",
      desc: "iOS and Android apps from one codebase, on your own backend.",
    },
  ],
  why: [
    {
      icon: "pin" as IconName,
      title: "We are in Madurai",
      desc: "Not a branch office and not a reseller. You can call, and you can meet the person who will build it.",
    },
    {
      icon: "layers" as IconName,
      title: "Systems, not brochures",
      desc: "The site is the front. The part that matters is the admin behind it, and that is what we spend the build on.",
    },
    {
      icon: "lock" as IconName,
      title: "The code is yours",
      desc: "Your domain, your database, your repository. If you ever leave us, you leave with everything.",
    },
    {
      icon: "bolt" as IconName,
      title: "Built to be fast",
      desc: "Most of your customers are on a mid-range Android on mobile data. We treat that as the budget and measure against it.",
    },
  ],
};

/* --------------------------------------------------------- the three pages */

export const MADURAI_SERVICES: Record<string, LocalService> = {
  "web-development": {
    slug: "web-development",
    keyword: "Web development company in Madurai",
    navLabel: "Web development",
    eyebrow: "Web development · Madurai",
    heroSub:
      "We do not build websites. We build the system your business runs on, and the website is the front of it.",
    answer:
      "MnT Future is a web development company in Madurai, Tamil Nadu. We build custom websites and the admin panel behind them, where prices, bookings, orders, enquiries, stock and staff are actually managed. Our client platforms are live today in travel, hospitality, construction, healthcare, engineering and logistics, including two travel companies here in Madurai. Every build is custom, on Next.js and PostgreSQL rather than a template, and the code and data are handed over in your name. A working build typically takes two weeks.",
    buildsTitle: "What a build actually includes.",
    builds: [
      {
        icon: "grid",
        title: "The public site",
        desc: "Fast, responsive, built for a mid-range Android on mobile data, with the pages a customer actually needs rather than the pages a template happened to ship.",
      },
      {
        icon: "layers",
        title: "The admin behind it",
        desc: "Where your team lives. Prices, bookings, enquiries, stock, staff, changed by you on the day you decide, not by us on a support ticket.",
      },
      {
        icon: "users",
        title: "Roles and permissions",
        desc: "The counter staff, the manager and the owner do not see the same screens. Real businesses need this on day one and get it late.",
      },
      {
        icon: "chat",
        title: "Enquiries that do not get lost",
        desc: "Every form, call-back and WhatsApp enquiry in one place with a status against it, instead of scattered across three phones.",
      },
      {
        icon: "gauge",
        title: "Reports you can read",
        desc: "What came in, what is pending, what is due. Numbers on a screen rather than a spreadsheet somebody maintains by hand.",
      },
      {
        icon: "shield",
        title: "Hosting, backups and SSL",
        desc: "Set up in your name and handed over with the credentials. We can run it under a support agreement, or you can.",
      },
    ],
    engagement: [
      {
        label: "Typical timeline",
        value: "2 weeks",
        note: "A business site with a working admin. Longer only if it has to talk to an ERP or a legacy system, and we say so before quoting rather than after.",
      },
      {
        label: "What you own",
        value: "Everything",
        note: "Domain, hosting account, database and source repository, all in your name. Handover is part of the project, not an exit negotiation.",
      },
      {
        label: "After it is live",
        value: "Support agreement, optional",
        note: "We can run and maintain it against an SLA, or hand it over completely. Both are real options and we do not price you into one.",
      },
    ],
    stack: [
      { group: "Front end", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Back end", items: ["Node.js", "PostgreSQL", "Prisma"] },
      { group: "Infrastructure", items: ["Managed hosting", "CDN", "Automated backups"] },
    ],
    process: [
      {
        title: "We come and listen",
        desc: "What your team does by hand today, and which part of it costs you money. This is a conversation, not a requirements form.",
      },
      {
        title: "You see the scope in writing",
        desc: "What is being built, what is not, how long, and what could make it longer. Before you commit anything.",
      },
      {
        title: "We build it in the open",
        desc: "You get a working link in the first few days and it changes in front of you. On a two-week build there is no room for a silent month, and there should not be one on any build.",
      },
      {
        title: "We hand it over properly",
        desc: "Credentials, training for the people who will use it, and a month of us being on the phone while your team settles in.",
      },
    ],
    proofTitle: "Live platforms, two of them in Madurai.",
    proof: [...TRAVEL_MADURAI, VENUE, PEST],
    notFor: [
      "You want a five-page brochure site and nothing behind it. A template and a designer will do that faster and cheaper, and we will tell you so.",
      "You do not yet know what the system should do. Two weeks works because the scope is settled before we start. If the requirements keep moving, the date moves with them, and no promise from us changes that.",
      "You want the cheapest quote in Madurai. We will not be it.",
    ],
    faq: [
      {
        q: "How much does a website cost in Madurai?",
        a: "It depends entirely on what sits behind it, and anyone who quotes you before asking is guessing. A brochure site and a booking platform with staff logins are different pieces of work by an order of magnitude. We scope first and quote against the scope, so the number you get is one you can plan around.",
      },
      {
        q: "How long does it take?",
        a: "Two weeks for a business site with a working admin behind it. That holds when the scope is settled before we start, which is why we scope first. It takes longer only when it has to connect to an ERP, Tally or an existing system, because that is usually the part that decides the timeline, and we tell you that after looking rather than after starting.",
      },
      {
        q: "Will I be able to change things myself?",
        a: "Yes, and that is most of the point. Prices, photos, pages, staff, rates: you change them on the day you decide. Calling your developer to change a price is a design failure, not a support plan.",
      },
      {
        q: "Do I own the code?",
        a: "Yes. Domain, hosting, database and source repository are all in your name and handed over. If you stop working with us you leave with the whole thing, which is the only arrangement we think is fair.",
      },
      {
        q: "Do you work with businesses outside Madurai?",
        a: "Yes. We are in Madurai and a good part of our client work is here and across Tamil Nadu, but we build for businesses anywhere in India and abroad. Being local means you can meet us; it is not a restriction on who we work with.",
      },
      {
        q: "Do you do WordPress?",
        a: "Rarely, and only when it is genuinely the right answer, which is usually a content-heavy site with no real system behind it. For anything with logins, bookings, stock or roles we build custom, because that is where WordPress becomes a plugin-maintenance problem you inherit.",
      },
      {
        q: "We already have a site. Can you fix it instead of rebuilding?",
        a: "Often yes, and it is usually the cheaper first step. We will look at what you have and tell you honestly whether it is worth fixing, including when the answer is that it is not.",
      },
    ],
    cta: {
      title: "What does your team still do by hand?",
      body: "Tell us the job somebody repeats every week: the rate change, the booking register, the enquiry written on paper. We will map what running it properly would take.",
      label: "Talk to a Senior Engineer",
    },
    metaTitle: "Web Development Company in Madurai | MnT Future",
    metaDescription:
      "Custom web development company in Madurai, Tamil Nadu. We build the website and the admin system behind it, on Next.js and PostgreSQL. Live client platforms in travel, hospitality and services. Code handed over in your name.",
  },

  "ecommerce-development": {
    slug: "ecommerce-development",
    keyword: "Ecommerce website development company in Madurai",
    navLabel: "Ecommerce development",
    eyebrow: "Ecommerce development · Madurai",
    heroSub:
      "An online store you own, with GST, UPI and cash on delivery handled properly, and no commission on your orders.",
    answer:
      "MnT Future is an ecommerce website development company in Madurai, Tamil Nadu. We build custom online stores for businesses in Madurai and across India: product catalogues with size and colour variants, UPI, cards and cash on delivery, courier integration, and GST invoices generated with the order. We build on Medusa and Next.js rather than on a rented platform, so there is no commission on your sales and the customer data stays yours. A store typically goes live in four weeks.",
    buildsTitle: "What an Indian online store has to get right.",
    builds: [
      {
        icon: "store",
        title: "Catalogue with real variants",
        desc: "Size, colour and material, each with its own stock and price. Getting this wrong is how a store sells what it does not have.",
      },
      {
        icon: "wallet",
        title: "UPI, cards and cash on delivery",
        desc: "Razorpay, Cashfree or PhonePe, and COD configured by pincode where your margins allow it. Money settles to your account, not through us.",
      },
      {
        icon: "records",
        title: "GST, generated not typed",
        desc: "The right slab on each item, the invoice produced with the order, and the numbers ready at month end instead of rebuilt in a spreadsheet.",
      },
      {
        icon: "cart",
        title: "Orders, returns and exchanges",
        desc: "One screen from placed to delivered, and a real flow for the size exchange rather than an argument on WhatsApp.",
      },
      {
        icon: "network",
        title: "Courier and delivery",
        desc: "Shipping calculated at checkout, labels booked from the same screen, tracking that the customer can see without asking you.",
      },
      {
        icon: "spark",
        title: "The follow-ups, automated",
        desc: "Abandoned cart reminders, review requests after delivery, and win-backs for customers who have gone quiet. Revenue you are currently leaving alone.",
      },
    ],
    engagement: [
      {
        label: "Typical timeline",
        value: "4 weeks",
        note: "Assuming your product photos and details are ready, which is the part on your side. Marketplaces and B2B platforms take longer, because the rules are harder.",
      },
      {
        label: "Commission we take",
        value: "None",
        note: "You pay to build it and to run it. That cost does not grow when you have a good month, which is the whole argument for owning the platform.",
      },
      {
        label: "Faster option",
        value: "MnT Commerce India",
        note: "A ready platform we host, brand and customise for you. Cheaper and faster than building from nothing, and the honest answer for a lot of stores.",
      },
    ],
    stack: [
      { group: "Platform", items: ["Medusa", "Next.js", "TypeScript", "PostgreSQL"] },
      { group: "India payments", items: ["Razorpay", "Cashfree", "PhonePe", "UPI", "COD"] },
      { group: "Operations", items: ["GST invoicing", "Courier integration", "Inventory"] },
    ],
    process: [
      {
        title: "We find out what you sell",
        desc: "Products, variants, how you price, who delivers, how you invoice today. The answers change the build more than the design does.",
      },
      {
        title: "Scope and timeline in writing",
        desc: "Including the honest version: whether a ready platform fits you better than a custom build, and what each would cost you to run.",
      },
      {
        title: "We build and load your catalogue",
        desc: "Not a handover with an empty store. We load the first set of products with you so you are not learning it alone.",
      },
      {
        title: "You go live and we stay",
        desc: "Test orders, real orders, and us on the phone through the first weeks while the operational habits settle.",
      },
    ],
    proofTitle: "Ecommerce work, and the platform behind it.",
    proof: [
      {
        kind: "Ecommerce",
        name: "The Print Emporium",
        what: "Custom printing sold online: business cards, flyers and banners, ordered and configured by the customer rather than quoted over the phone.",
        href: "/in/work/clients/print-emporium",
      },
      {
        kind: "Our own platform",
        name: "MnT Commerce India",
        what: "The ecommerce platform we host and customise for Indian businesses: GST, UPI, COD, returns and automation, built and run by us.",
        href: "/in/products/commerce-india",
      },
      ...TRAVEL_MADURAI.slice(0, 1),
      VENUE,
    ],
    notFor: [
      "You have not sold anything yet and want to test the idea. Start on Instagram or a rented store, prove there is demand, then come back. We will tell you this for free.",
      "Your product photos, prices and descriptions are not ready. Four weeks assumes they are. If we are waiting on your catalogue, that is the timeline, and it is not one we control.",
      "Commission on a marketplace is not real money for you yet. If your volume is small, owning the platform is not worth it, and we will say so.",
    ],
    faq: [
      {
        q: "How much does an ecommerce website cost in Madurai?",
        a: "It depends on how you sell, not on how many products you have. A single-brand store, a marketplace with many sellers, and a B2B platform with customer-specific pricing are three different builds. We scope before quoting, and we will tell you when a ready platform costs you less than a custom build.",
      },
      {
        q: "Will GST be handled properly?",
        a: "Yes, and this is the part most stores get wrong. The right slab per item, the invoice generated with the order, HSN on the line items, and the reports ready at month end. Not a spreadsheet somebody rebuilds every month.",
      },
      {
        q: "Can customers pay cash on delivery?",
        a: "Yes, and in India many will. COD can be enabled by pincode or by order value so you are not shipping high-value goods on trust. Most stores start with heavy COD and move to UPI as customers begin to trust them.",
      },
      {
        q: "Do you take a percentage of my sales?",
        a: "No. You pay to build the store and to run it, and that number does not move when you have a good month. That is the entire difference between owning a platform and renting one.",
      },
      {
        q: "Is Shopify not cheaper?",
        a: "At the start, yes, and for some businesses it stays the right answer. The maths changes when the monthly fee plus transaction cut becomes real money, or when the way you want to sell is limited by what the platform allows. We will do that arithmetic with you honestly, including when it says stay.",
      },
      {
        q: "Can you move my existing store to a new platform?",
        a: "Usually yes. Products, variants, customers and order history migrate from most platforms. We check what will and will not survive the move up front and tell you about the gaps before you commit.",
      },
      {
        q: "Will it be fast on mobile data?",
        a: "That is the design target, not an afterthought. Most of your customers are on a mid-range Android phone on mobile data, and in India that is the difference between a sale and a bounce. We measure against it rather than hoping.",
      },
    ],
    cta: {
      title: "What is your platform costing you a year?",
      body: "Tell us your orders, your average order value and what you pay in commission and fees. We will tell you what owning the platform would change, including when the answer is nothing.",
      label: "Talk to a Senior Engineer",
    },
    metaTitle: "Ecommerce Website Development Company in Madurai | MnT Future",
    metaDescription:
      "Ecommerce website development company in Madurai, Tamil Nadu. Custom online stores on Medusa and Next.js with GST, UPI, cash on delivery and courier integration. No commission on your orders, and the platform is yours.",
  },

  "mobile-app-development": {
    slug: "mobile-app-development",
    keyword: "Mobile application development company in Madurai",
    navLabel: "Mobile app development",
    eyebrow: "Mobile app development · Madurai",
    heroSub:
      "iOS and Android from one codebase, on a backend you own, built by the people who will still be there when it needs changing.",
    answer:
      "MnT Future is a mobile application development company in Madurai, Tamil Nadu. We build native iOS and Android apps from a single React Native and Expo codebase, connected to a backend we build and you own. We have shipped a two-app system in production on this stack: a customer app and an owner app on one shared backend, with real-time availability, booking locks and payments. App development typically runs twelve to twenty weeks from first call to store submission.",
    buildsTitle: "What we build into an app.",
    builds: [
      {
        icon: "phone",
        title: "One codebase, both stores",
        desc: "React Native and Expo, so iOS and Android are the same build rather than two teams and two timelines. You pay once and ship twice.",
      },
      {
        icon: "bell",
        title: "Push notifications",
        desc: "The reason an app beats a website. Order updates, reminders and offers land on the phone without you paying for reach.",
      },
      {
        icon: "network",
        title: "Real-time where it matters",
        desc: "Live availability, live status, live chat. When two people can book the same slot, the locking has to be real, and we have built exactly that.",
      },
      {
        icon: "wallet",
        title: "Payments and subscriptions",
        desc: "UPI, cards, in-app purchases where the stores require them, and recurring billing that survives a failed payment.",
      },
      {
        icon: "lock",
        title: "Your own backend",
        desc: "Not a no-code service you rent. The API, the database and the admin are yours, which is what makes the app worth having in three years.",
      },
      {
        icon: "rocket",
        title: "Store submission, handled",
        desc: "App Store and Play Store accounts in your name, review guidelines, screenshots and the resubmission when Apple asks for something.",
      },
    ],
    engagement: [
      {
        label: "Typical timeline",
        value: "12 to 20 weeks",
        note: "First call to store submission, including review time. Two connected apps take longer than one, and we scope which you actually need before quoting.",
      },
      {
        label: "Platforms",
        value: "iOS and Android",
        note: "One React Native codebase covers both. A separate native build is occasionally the right answer and we will say so when it is.",
      },
      {
        label: "The accounts",
        value: "In your name",
        note: "Apple Developer and Google Play accounts registered to your company, not ours. The app stays yours if we part ways.",
      },
    ],
    stack: [
      { group: "Mobile", items: ["React Native", "Expo", "expo-router", "NativeWind"] },
      { group: "Back end", items: ["FastAPI", "PostgreSQL", "Redis", "WebSockets"] },
      { group: "Delivery", items: ["App Store", "Google Play", "Over-the-air updates"] },
    ],
    process: [
      {
        title: "We work out if you need an app",
        desc: "Often a fast mobile website does the job and an app is an expensive habit. We would rather tell you that on the first call than after the invoice.",
      },
      {
        title: "Scope, screens and timeline",
        desc: "What is in version one and what is deliberately not. Apps get expensive when version one tries to be version three.",
      },
      {
        title: "You get builds on your phone",
        desc: "Test builds from early on, installed on your device. You use the app while it is being built rather than reviewing screenshots.",
      },
      {
        title: "Submission and after",
        desc: "We handle the store review, and over-the-air updates mean most fixes reach your users without waiting for another review.",
      },
    ],
    proofTitle: "The apps we have actually shipped.",
    proof: [
      {
        kind: "Our own product",
        name: "LOBBI",
        what: "Two React Native and Expo apps on one shared backend: a player app for booking and a venue-owner app for running the place. Redis-backed slot locking so two people cannot take the same court, live availability over WebSockets, and dynamic pricing. Built and run by us, which is why we can show you the inside of it.",
        href: "/work/lobbi",
      },
      VENUE,
      ...TRAVEL_MADURAI.slice(0, 1),
    ],
    notFor: [
      "You want an app because a competitor has one. That is not a reason, and we will ask you for a better one before quoting.",
      "Your users would open it twice a year. A fast website is the right answer and costs you a fraction of this.",
      "You want it on the store next month. Apple's review alone can take a week, and rushing the build is how you fail it twice.",
    ],
    faq: [
      {
        q: "How much does it cost to develop a mobile app in Madurai?",
        a: "It depends on how much the app has to do and whether it needs its own backend, which most useful apps do. A single-screen catalogue app and a booking platform with payments and live availability are different pieces of work. We scope before quoting rather than giving you a number you cannot plan around.",
      },
      {
        q: "Do you build for both iOS and Android?",
        a: "Yes, from one React Native and Expo codebase. That is the point of the stack: you fund one build and ship to both stores, and a fix lands on both at once instead of twice.",
      },
      {
        q: "Have you actually shipped an app, or just websites?",
        a: "We have shipped a two-app system in production: a customer app and an owner app on one shared backend, with real-time availability, booking locks and payments. It is our own product rather than a client's, and we say so plainly, which also means we can show you the inside of it rather than a screenshot.",
      },
      {
        q: "Who owns the App Store and Play Store accounts?",
        a: "You do. They are registered to your company, not ours, along with the code and the backend. An agency that keeps your store account keeps your app, and that is not an arrangement we offer.",
      },
      {
        q: "How long until it is on the store?",
        a: "Twelve to twenty weeks for a first version, including store review. Apple's review can take a few days to a week on its own, and a rejection costs you another round, which is why we build to the guidelines rather than discovering them at the end.",
      },
      {
        q: "Do I really need an app, or is a website enough?",
        a: "For most businesses a fast mobile website is enough, and we will tell you so. An app earns its cost when you need push notifications, offline use, the camera or GPS, or when your users open it every week. If none of those are true, you are buying a habit your customers do not have.",
      },
      {
        q: "Can you update the app after it is live?",
        a: "Yes, and most updates reach users over the air without another store review. Bigger changes go through review normally. Either way we can maintain it under a support agreement or hand it over to your own team.",
      },
    ],
    cta: {
      title: "Tell us what the app would do.",
      body: "Not the features, the job. Who opens it, how often, and what they are trying to get done. We will tell you honestly whether an app is the right answer.",
      label: "Talk to a Senior Engineer",
    },
    metaTitle: "Mobile Application Development Company in Madurai | MnT Future",
    metaDescription:
      "Mobile application development company in Madurai, Tamil Nadu. Native iOS and Android apps from one React Native and Expo codebase, on a backend you own. Shipped in production, with the store accounts in your name.",
  },
};

export const MADURAI_SLUGS = Object.keys(MADURAI_SERVICES);
