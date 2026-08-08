import type { IconName } from "@/components/Icon";
import type { QA } from "@/components/FAQ";

/**
 * India industry pages.
 *
 * The content plan asks for these and adds one condition: "target only sectors
 * where MnT has credible capability/proof". That is the whole selection rule
 * here. Every industry below is backed by work in this repository — a written
 * case study, or client projects whose build lines were read off the codebase —
 * and each page links to that proof rather than describing a sector we would
 * like to win.
 *
 * The honesty rule that governs the client pages governs these too: the travel
 * and services entries say the operator controls routes, tariffs and content,
 * because that is what those builds do. They are not described as booking
 * engines, because they are not booking engines.
 */

export type IndustryProof = {
  /** Client or product name, as it is written everywhere else on the site. */
  name: string;
  href: string;
  /** What that build actually demonstrates for this industry. */
  what: string;
  /** "Case study" for a full write-up, "Client project" for a listed build. */
  kind: "Case study" | "Client project";
};

export type Industry = {
  slug: string;
  /** The plain name, used as the H1 and in the nav. */
  name: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  heroSub: string;
  icon: IconName;
  /** The problem this sector actually has, in its own words. */
  problem: { title: string; body: string };
  buildsTitle: string;
  builds: { icon: IconName; title: string; desc: string }[];
  proofTitle: string;
  proof: IndustryProof[];
  faq: QA[];
  cta: { title: string; body: string; label: string };
};

export const INDIA_INDUSTRIES: Industry[] = [
  {
    slug: "fashion-apparel",
    name: "Fashion & Apparel",
    eyebrow: "One stock pool, online and in store",
    metaTitle: "Ecommerce for Fashion & Apparel Brands in India | MnT Future",
    metaDescription:
      "Ecommerce platforms for Indian fashion brands and boutiques: size-level stock shared by the web store and the counter, supplier purchasing, GST and UPI.",
    heroSub:
      "A boutique that sells online and over the counter is running one business and usually two systems. We build the platform where the web store, the shop counter and supplier purchasing all read and write the same size-level stock.",
    icon: "store",
    problem: {
      title: "The last saree sells twice.",
      body: "The web store and the billing counter each keep their own count, so the piece that just went out of the shop is still for sale online for as long as it takes somebody to notice. Then somebody reconciles by hand at night. At one shop that is annoying; at three, with a festival on, it is a refund queue and a customer who does not come back.",
    },
    buildsTitle: "What a fashion platform has to get right",
    builds: [
      {
        icon: "layers",
        title: "Stock at size level, shared",
        desc: "Not stock per product: stock per size and colour, in one pool that the storefront, the admin and the in-store counter all write to. A sale anywhere moves the same number.",
      },
      {
        icon: "cart",
        title: "A counter that is part of the platform",
        desc: "In-store billing on the same system rather than a separate POS you reconcile against. One customer, one order history, whichever way they bought.",
      },
      {
        icon: "network",
        title: "Supplier purchasing",
        desc: "Purchase orders, goods received and cost tracking in the same place as sales, so margin is a number you can read rather than one you work out later.",
      },
      {
        icon: "shield",
        title: "GST on apparel slabs",
        desc: "Apparel sits across GST slabs by price point. Place of supply decides CGST and SGST or IGST, the slab follows the HSN code, and invoice serials run gapless through the financial year.",
      },
      {
        icon: "wallet",
        title: "A checkout Indian shoppers finish",
        desc: "UPI first, cards and netbanking behind it, cash on delivery where your margins allow, and returns that produce a credit note rather than a WhatsApp message.",
      },
      {
        icon: "gauge",
        title: "Fast on a real phone",
        desc: "Most of your traffic is mobile on a patchy network. The store is built and measured for that, not for a designer's laptop on office wifi.",
      },
    ],
    proofTitle: "Built, and trading",
    proof: [
      {
        name: "Lia Fashion",
        href: "/in/work/lia-fashion",
        kind: "Case study",
        what: "A fashion boutique selling online and over the counter on one stock pool. One Laravel 12 API behind a web storefront, an admin back office, an in-store POS and supplier purchasing, with concurrency-safe stock writes so two sales of the last piece cannot both succeed.",
      },
    ],
    faq: [
      {
        q: "We already have a Shopify store. Is this worth it?",
        a: "Not always, and we will tell you when it is not. It becomes worth it when the commission on a good month is real money, when the shop counter and the website disagree often enough to cost you customers, or when something about how you sell — size-level stock, supplier purchasing, a rental or alteration flow — is not something the platform will ever do.",
      },
      {
        q: "Can it run our physical shop billing too?",
        a: "Yes, and that is usually the point. The counter runs on the same platform as the web store rather than on a separate POS you reconcile against at night. Lia Fashion runs exactly this way.",
      },
      {
        q: "What about returns and exchanges?",
        a: "Handled as first-class flows, because in apparel they are not exceptions. A return puts the size back into the same pool the storefront reads, and produces a credit note rather than a manual adjustment somebody has to remember.",
      },
      {
        q: "How long does a build like this take?",
        a: "For a storefront, admin and counter on one stock pool, typically three to five months depending on how much has to connect to what you already run. You get a costed plan before you commit, and we would rather lose the enquiry than quote a number we know will move.",
      },
    ],
    cta: {
      title: "Tell us what your counter and your website disagree about.",
      body: "Bring one product that sells both ways and we will map how the stock, the billing and the purchasing would sit on one platform.",
      label: "Discuss your store",
    },
  },

  {
    slug: "food-grocery",
    name: "Food & Grocery",
    eyebrow: "Fresh stock, real delivery, honest costing",
    metaTitle: "Ecommerce for Food & Grocery Business in India | MnT Future",
    metaDescription:
      "Platforms for Indian food, bakery and fresh grocery: pack sizes as stocked items, weight-slab shipping, pincode delivery zones and own-fleet delivery.",
    heroSub:
      "Food does not behave like the products ecommerce platforms are built for. A whole fish is not the thing you sell, a pack size is not a label on a bag, and shipping cost depends on weight and distance. We build platforms that know that.",
    icon: "cart",
    problem: {
      title: "The platform thinks a kilo of fish is a T-shirt.",
      body: "Off-the-shelf commerce assumes what you buy is what you stock is what you ship. In food it is not: you buy whole, you process into pieces, some of it is wastage, you sell in packs, and the courier charges by weight slab to a destination that may not even be serviceable. Every one of those gaps ends up as somebody doing arithmetic in a notebook.",
    },
    buildsTitle: "What a food platform has to get right",
    builds: [
      {
        icon: "layers",
        title: "Raw material and processing",
        desc: "Stock held at weighted-average cost, processing runs that record what came out and what was lost, so the margin on a pack reflects what it actually cost to make.",
      },
      {
        icon: "grid",
        title: "Pack sizes as real stock",
        desc: "250g, 500g and 1kg are separate stocked items with their own counts and prices, not a dropdown on one product that quietly oversells.",
      },
      {
        icon: "network",
        title: "Weight-slab shipping and serviceability",
        desc: "Rates calculated by weight and destination, and pincodes checked for serviceability before a customer reaches payment rather than after.",
      },
      {
        icon: "bolt",
        title: "Delivery zones and your own fleet",
        desc: "If you deliver yourself: zones by pincode, a rider app, live tracking, and the finance behind it. If you use couriers: tracking pushed back to the customer automatically.",
      },
      {
        icon: "shield",
        title: "GST across food slabs",
        desc: "Food sits across several GST slabs and some of it is exempt. Slabs follow the HSN code rather than a shopkeeper's memory, and invoices are generated rather than typed.",
      },
      {
        icon: "gauge",
        title: "Built for repeat, not for browsing",
        desc: "Grocery is reorder behaviour. Saved lists, quick repeat and a checkout short enough that a weekly order takes under a minute.",
      },
    ],
    proofTitle: "Built, and trading",
    proof: [
      {
        name: "Leats",
        href: "/in/work/leats",
        kind: "Case study",
        what: "Fresh meat and seafood on an own delivery fleet. Raw material at weighted-average cost, processing runs that record outputs and wastage, pincode delivery zones, a delivery-partner app and live tracking, across 61 data models.",
      },
      {
        name: "Sai Nandhini Tasty World",
        href: "/in/work/sntasty",
        kind: "Case study",
        what: "A Madurai sweets and bakery brand shipping across India. Next.js 16 storefront and admin with pack sizes as stocked variants, weight-slab shipping by destination, courier tracking and invoices that generate themselves.",
      },
    ],
    faq: [
      {
        q: "We only ship, we do not deliver ourselves. Is this overkill?",
        a: "No. The delivery-fleet parts are optional and Sai Nandhini Tasty World does not use them: that build is a storefront, pack-size stock, weight-slab shipping and courier tracking. The fleet, zones and rider app are what Leats needed because Leats delivers its own orders.",
      },
      {
        q: "Can it handle cut-off times and delivery slots?",
        a: "Yes. Fresh businesses live on them: order-by times, slot capacity per zone, and blackout days. These are configuration in the admin rather than a code change every festival season.",
      },
      {
        q: "What about wastage and shrinkage?",
        a: "Recorded at the processing step rather than discovered at stock-take. That is what makes the cost per pack real: if a whole fish yields less than expected, the cost of what it did yield goes up, and you can see it.",
      },
      {
        q: "Do you integrate with Swiggy or Zomato?",
        a: "We can push catalogue and pull orders where the platform offers an API, and several of our clients sell on both their own store and an aggregator. Be clear-eyed about why: the aggregator brings volume and keeps the customer; your own store keeps the margin and the customer list.",
      },
    ],
    cta: {
      title: "Bring one product and how it is packed.",
      body: "Tell us what you buy, what you sell it as, and how it gets to the customer. We will map where the platform has to be different from an off-the-shelf one.",
      label: "Discuss your build",
    },
  },

  {
    slug: "travel-tours",
    name: "Travel & Tours",
    eyebrow: "Routes, tariffs and packages you control",
    metaTitle: "Systems for Travel Operators in India | MnT Future",
    metaDescription:
      "Platforms for Indian travel and tour operators: routes, tariffs and packages as records the operator edits, enquiry capture routed to the team, and an admin.",
    heroSub:
      "A travel operator's rates change with the season, the vehicle and the route. If changing them means calling the person who built the website, they do not get changed. We build the version where the operator controls all of it.",
    icon: "compass",
    problem: {
      title: "Your rates are out of date because editing them is somebody else's job.",
      body: "Most operator websites are pages of text. A new route, a festival tariff or a package change means an email to a developer and a wait, so the site slowly stops matching what the business actually offers. Meanwhile enquiries arrive on a form nobody has checked, or on a phone number that goes to whoever picks up.",
    },
    buildsTitle: "What an operator's system has to do",
    builds: [
      {
        icon: "grid",
        title: "Routes, tariffs and packages as records",
        desc: "Held in a database and edited from an admin by your own team. A seasonal rate change takes a minute and needs nobody technical.",
      },
      {
        icon: "chat",
        title: "Enquiries that reach a person",
        desc: "Booking enquiries emailed to the team as they arrive, with the route or package they were looking at attached, so the callback starts informed.",
      },
      {
        icon: "eye",
        title: "A fleet and gallery you maintain",
        desc: "Vehicle photos, package images and trip galleries uploaded and managed by the business rather than sent to somebody to publish.",
      },
      {
        icon: "search",
        title: "Findable for the routes you run",
        desc: "Structured, per-route pages rather than one page listing everything, so a search for a specific run has something to land on.",
      },
      {
        icon: "lock",
        title: "An admin only your team reaches",
        desc: "Hashed credentials and signed sessions. Unglamorous, and the reason the site is still yours a year later.",
      },
      {
        icon: "bolt",
        title: "Fast on a phone, on mobile data",
        desc: "Your customers are looking this up on the road. The site is built and measured for that.",
      },
    ],
    proofTitle: "Built, and running",
    proof: [
      {
        name: "Sri Jaidev Tours & Travels",
        href: "/in/work/clients/sri-jaidev-travels",
        kind: "Client project",
        what: "Routes, tariffs and packages as records the operator edits, booking enquiries emailed as they arrive, media upload, and an admin behind signed sessions.",
      },
      {
        name: "Vinushree Tours & Travels",
        href: "/in/work/clients/vinushree-travels",
        kind: "Client project",
        what: "The same platform, branded and configured for a second travel business. Two operators, one set of software we maintain, which is why the second one cost less than the first.",
      },
    ],
    faq: [
      {
        q: "Is this an online booking engine with payment?",
        a: "The two builds above are not: they are enquiry-led, because that is how those operators sell — the customer asks, somebody calls back, the trip gets shaped. We can build online booking with payment and availability where it fits your business, and we will say plainly which one you actually need rather than selling you the bigger thing.",
      },
      {
        q: "We run two travel businesses. Can they share a platform?",
        a: "Yes, and that is exactly what Sri Jaidev and Vinushree are: one platform, branded and configured separately. The second cost less than the first because the software already existed.",
      },
      {
        q: "Can our office staff update rates without us calling you?",
        a: "That is the point of the build. Routes, tariffs, packages and images are all editable from the admin by your own team. If you have to call us to change a price, we have built the wrong thing.",
      },
    ],
    cta: {
      title: "Tell us what you change most often.",
      body: "Rates, routes, packages or vehicles — whichever one you cannot edit today is where we would start.",
      label: "Discuss your build",
    },
  },

  {
    slug: "home-field-services",
    name: "Home & Field Services",
    eyebrow: "Service packages, tariffs and areas, edited by you",
    metaTitle: "Systems for Service Businesses in India | MnT Future",
    metaDescription:
      "Platforms for Indian service businesses — pest control, solar, installation and maintenance: service packages, tariffs, service areas and enquiries you control.",
    heroSub:
      "A service business sells packages, tariffs and coverage, and all three change. We build the system where your own team edits them, and where an enquiry arrives with enough context that the callback is useful.",
    icon: "shield",
    problem: {
      title: "The enquiry arrives with no idea what it is about.",
      body: "A form that sends name, phone and a message tells you nothing about which treatment, which capacity, or whether you even cover that pincode. So the first call is spent establishing what the website should already have captured — and half the time the answer is that you do not serve that area.",
    },
    buildsTitle: "What a service business needs built",
    builds: [
      {
        icon: "grid",
        title: "Services and packages as records",
        desc: "Treatments, capacities, inclusions and prices held in a database and edited from an admin, so a tariff revision does not need a developer.",
      },
      {
        icon: "chat",
        title: "Enquiries with context attached",
        desc: "The service they were looking at, emailed to the team the moment it is submitted, so whoever calls back already knows what the job is.",
      },
      {
        icon: "eye",
        title: "Galleries that prove the work",
        desc: "Before-and-after and installation photos uploaded by your team. In a trust-led business, evidence of work done is the marketing.",
      },
      {
        icon: "search",
        title: "A page per service, per area",
        desc: "Structured pages rather than one long list, because that is what somebody searching for a specific treatment in a specific place can actually land on.",
      },
      {
        icon: "lock",
        title: "An admin behind real credentials",
        desc: "Hashed passwords and signed sessions rather than a shared login pasted into WhatsApp.",
      },
      {
        icon: "bolt",
        title: "Quick to load, easy to call",
        desc: "Mobile-first, with calling and enquiry never more than a tap away, because that is how this industry actually gets contacted.",
      },
    ],
    proofTitle: "Built, and running",
    proof: [
      {
        name: "Perfect Pest Control",
        href: "/in/work/clients/perfect-pest-control",
        kind: "Client project",
        what: "Service packages, tariffs and service areas edited by the business, enquiries emailed on submission, image upload for service galleries, and an admin behind hashed credentials and signed sessions.",
      },
      {
        name: "Solar Power House",
        href: "/in/work/clients/solar-power-house",
        kind: "Client project",
        what: "Products and projects served from a database and editable without a deploy, image upload for installation galleries, and an admin login with signed sessions.",
      },
    ],
    faq: [
      {
        q: "Can we take bookings and payment online?",
        a: "We can build it. Whether you should is a separate question: in most field-service businesses the job has to be scoped before it can be priced, so an enquiry that reaches the right person quickly beats a booking form that promises a price you may have to renegotiate.",
      },
      {
        q: "Can it handle multiple service areas or branches?",
        a: "Yes. Service areas are records like everything else, so coverage can be edited as you expand, and enquiries can be routed by area to the team that covers it.",
      },
      {
        q: "We have an AMC or repeat-visit model. Does that fit?",
        a: "It fits well, and it is usually where the value is. Contracts, due dates and reminder scheduling are the sort of thing off-the-shelf sites do not have and a custom build does, and it turns a one-off job into a renewal you do not have to remember.",
      },
    ],
    cta: {
      title: "Tell us what your first callback has to ask.",
      body: "Whatever your team has to establish on that call is what the site should have captured. That is where we would start.",
      label: "Discuss your build",
    },
  },

  {
    slug: "professional-services",
    name: "Professional Services",
    eyebrow: "A practice site your practice maintains",
    metaTitle: "Systems for Professional Firms in India | MnT Future",
    metaDescription:
      "Platforms for Indian accounting, engineering and advisory firms: services and portfolio your team edits, and enquiries routed to the right practice area.",
    heroSub:
      "An accounting, engineering or advisory practice sells expertise across several areas, and an enquiry meant for one of them should not land in a shared inbox. We build the site where the content is yours to edit and the enquiry reaches the right desk.",
    icon: "building",
    problem: {
      title: "Everything goes to one inbox, and the site is a year out of date.",
      body: "A practice adds a service line, wins work worth showing, or changes who handles what — and none of it reaches the website, because updating it is a request rather than a task. Meanwhile every enquiry, whatever it is about, arrives at the same address and gets forwarded by hand.",
    },
    buildsTitle: "What a practice site should do",
    builds: [
      {
        icon: "grid",
        title: "Services and content as records",
        desc: "Practice areas, service descriptions and pages held in a database rather than hardcoded, so your team publishes without a deploy.",
      },
      {
        icon: "network",
        title: "Enquiries routed by practice area",
        desc: "A tax question reaches the tax desk and an audit question reaches audit, by email, at the moment it is submitted.",
      },
      {
        icon: "eye",
        title: "A portfolio you keep current",
        desc: "Projects and capabilities managed by the firm, with media upload, so what you can show matches what you can do.",
      },
      {
        icon: "search",
        title: "A page per practice area",
        desc: "Separate, structured pages, because somebody searching for a specific service needs one page about that service, not a paragraph inside a list.",
      },
      {
        icon: "lock",
        title: "An admin behind hashed credentials",
        desc: "Proper authentication on the back office, and the content seeded from scripts kept in the repository so nothing is a mystery later.",
      },
      {
        icon: "shield",
        title: "Yours to take elsewhere",
        desc: "Your repository, your database, your hosting. The architecture is documented so another team could pick it up.",
      },
    ],
    proofTitle: "Built, and running",
    proof: [
      {
        name: "JCSS Global",
        href: "/in/work/clients/jcss-global",
        kind: "Client project",
        what: "An accounting, tax and advisory practice with services and content served from a database rather than hardcoded, and enquiry routing by email to the right part of the practice.",
      },
      {
        name: "Filigree Solutions",
        href: "/in/work/clients/filigree-solutions",
        kind: "Client project",
        what: "A CAD, CAE and structural-analysis firm with services and portfolio held as records, seeding scripts kept in the repository, media upload, and an admin behind hashed credentials.",
      },
    ],
    faq: [
      {
        q: "Do we need a custom build, or will WordPress do?",
        a: "For a brochure site with a contact form, WordPress will do, and we will say so. Custom starts to earn its cost when the content is structured — practice areas, people, projects, resources that relate to each other — or when enquiries need routing and the plugin stack that would do it becomes the thing that breaks.",
      },
      {
        q: "Can we publish articles and updates ourselves?",
        a: "Yes. That is the difference between a site your practice maintains and a site you have to commission changes to. Publishing is a task for your team, not a request to us.",
      },
      {
        q: "What about client portals and document exchange?",
        a: "That is a bigger build and a real one: authentication, permissions, document handling and an audit trail. We would scope it separately rather than fold it into a website project, because it is a different piece of software with different obligations.",
      },
    ],
    cta: {
      title: "Tell us what you last wanted to change and could not.",
      body: "Whatever your practice has been waiting to publish is the clearest sign of what the site should have been built to let you do.",
      label: "Discuss your build",
    },
  },
];

export const industryBySlug = (slug: string) =>
  INDIA_INDUSTRIES.find((i) => i.slug === slug);
