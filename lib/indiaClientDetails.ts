/**
 * Per-project detail for the client case study pages.
 *
 * The `modules` list on each entry is not a marketing list. It is the set of
 * admin sections and API routes that actually exist in that project, read off
 * the repository. That is what lets this page make the argument it makes: a
 * client whose team logs into fourteen sections every day did not buy a
 * website, and the module list is the evidence rather than the claim.
 *
 * Where a project genuinely is small, its entry says so. Inflating the two
 * small ones to match the big ones would undo the point of the page.
 */

export type ClientDetail = {
  slug: string;
  /** The one-line version of what they got, beyond a public site. */
  headline: string;
  /** What a website on its own would have left them doing by hand. */
  problem: string[];
  /** Admin sections and API routes present in the project. Verified. */
  modules: string[];
  /** What the client's own team does in it, in their language. */
  runs: { title: string; desc: string }[];
  /** The thing about this build worth pointing at. */
  note?: string;
};

export const CLIENT_DETAILS: Record<string, ClientDetail> = {
  blufacade: {
    slug: "blufacade",
    headline: "A facade contractor's whole public face, run by their own team.",
    problem: [
      "A facade business wins work on its portfolio, and a portfolio changes every time a project completes.",
      "On a hand-built site that means emailing a developer photographs and waiting.",
      "Careers, testimonials and client logos go stale the same way, and stale is what a prospect notices.",
    ],
    modules: [
      "banners", "blog", "careers", "client-logos", "contact", "feedback",
      "leads", "portfolio", "profile", "seo", "services", "settings", "testimonials",
    ],
    runs: [
      { title: "Publish a finished project", desc: "Photographs, description and category, live the same afternoon the job is signed off." },
      { title: "Post a vacancy", desc: "Careers is its own section, so hiring does not wait on a developer." },
      { title: "Work the enquiries", desc: "Every lead lands in one place with its source, rather than in somebody's inbox." },
      { title: "Control their own SEO", desc: "Titles and descriptions per page, editable by the team that knows the business." },
    ],
    note: "Thirteen admin sections. The public site is what a visitor sees; the team spends its time in the other part.",
  },

  "print-emporium": {
    slug: "print-emporium",
    headline: "A print shop that takes the order, the artwork and the money online.",
    problem: [
      "Print is quoting: size, paper, quantity, finish. Done by phone, every quote costs a call and every call costs an hour.",
      "Artwork arrives over WhatsApp and email, gets lost, and gets printed wrong.",
      "Delivery serviceability by pincode is checked by hand, after the customer has already paid.",
    ],
    modules: [
      "auth", "coupon", "customer", "employee", "fileConversion", "hero-slide",
      "lead", "order", "pdf", "pincode", "seo", "service", "serviceOption",
      "settings", "shiprocket", "payment settings", "pricing settings",
    ],
    runs: [
      { title: "Price it themselves", desc: "Services and their options carry their own pricing rules, so a change to rates is a form, not a release." },
      { title: "Take payment on the order", desc: "Razorpay on checkout, coupons applied against the order, no invoice chase afterwards." },
      { title: "Receive artwork properly", desc: "Customer files uploaded to S3 against the order, with conversion and PDF handling in the platform." },
      { title: "Ship and check serviceability", desc: "Shiprocket wired in, and pincode checked before the customer commits rather than after." },
      { title: "Give staff their own logins", desc: "Employees are a first-class part of the system, not a shared password." },
    ],
    note: "File conversion, PDF handling and pincode serviceability are the parts nobody thinks about until the orders start arriving wrong.",
  },

  "vsv-unite": {
    slug: "vsv-unite",
    headline: "The earning model itself, written as software.",
    problem: [
      "A binary and point-volume plan is arithmetic that has to be right every time, for every member, forever.",
      "Run on spreadsheets it is slow, disputed, and impossible to audit when a member asks why their payout is what it is.",
      "Placement in the tree, wallet balance and withdrawals all have to agree with each other at all times.",
    ],
    modules: [
      "plan", "transaction", "user", "withdrawal",
      "mlm_service", "placement_service", "wallet_service", "admin team tree",
    ],
    runs: [
      { title: "Place a new member", desc: "Placement in the binary tree is a service in the platform, not a manual decision somebody can get wrong." },
      { title: "Calculate earnings", desc: "Point volume computed by the system against the plan, the same way for everyone." },
      { title: "Hold a wallet", desc: "Balance and transactions as records, so a member's history is answerable rather than argued." },
      { title: "Process withdrawals", desc: "Its own model and flow, because money leaving is the part that has to be exact." },
      { title: "See the team tree", desc: "Admin endpoints for the downline, so support can answer a question in seconds." },
    ],
    note: "This is financial logic, not content. Hashed credentials and encrypted secrets throughout, and the architecture written down in the repository.",
  },

  "solar-power-house": {
    slug: "solar-power-house",
    headline: "Solar quoting, finance partners and installations in one place.",
    problem: [
      "Solar sells on consultation, not on a shopping cart. The enquiry is the product.",
      "Finance partners matter to the decision and change often, so they cannot be baked into a page.",
      "A completed installation is the best sales asset the business has, and it sits on somebody's phone.",
    ],
    modules: [
      "auth", "bankPartners", "consultations", "contacts",
      "legalPages", "portfolio", "services", "settings", "upload",
    ],
    runs: [
      { title: "Book and track consultations", desc: "Consultation is a record with a lifecycle, not a form submission that becomes an email." },
      { title: "Manage finance partners", desc: "Bank partners are their own section, added and removed as tie-ups change." },
      { title: "Publish installations", desc: "Portfolio with upload, so a finished rooftop becomes proof the same week." },
      { title: "Keep legal pages current", desc: "Terms and policies editable by the business rather than by us." },
    ],
  },

  "career-hq": {
    slug: "career-hq",
    headline: "A study-abroad platform: universities, courses, jobs and applications.",
    problem: [
      "Study-abroad advice is a data problem. Countries, universities, courses and intakes change constantly.",
      "Written as pages it is out of date within a term, and a student who finds the wrong intake never comes back.",
      "Partner agents and job applicants need to be handled too, and none of it belongs in a spreadsheet.",
    ],
    modules: [
      "University", "Course", "Country", "Company", "Job", "JobApplication",
      "BlogPost", "BlogCategory", "lead", "partner-application", "video",
      "UniversalModule", "ModuleCategory", "Admin",
    ],
    runs: [
      { title: "Maintain the catalogue", desc: "Universities and courses as structured records by country, so a student can actually search rather than browse." },
      { title: "Handle applications", desc: "Job and partner applications captured as records with a status, not as an inbox." },
      { title: "Publish guidance", desc: "Blog with categories and video, because this business sells on trust before it sells on service." },
      { title: "Route student leads", desc: "Enquiries into one queue, reaching counsellors by email as they arrive." },
    ],
    note: "Fourteen data models. This is a platform with a website attached, rather than the other way round.",
  },

  "jcss-global": {
    slug: "jcss-global",
    headline: "A professional practice site, with the parts a practice actually needs.",
    problem: [
      "An accounting practice sells on credibility, and credibility means content that is current and correct.",
      "Enquiries have to reach the right person: tax is not audit and audit is not advisory.",
    ],
    modules: ["auth", "newsletter", "email configuration", "users"],
    runs: [
      { title: "Run a newsletter", desc: "Subscribers held in the platform, so the practice owns the list rather than renting it." },
      { title: "Configure delivery", desc: "Email configuration is a setting, so the practice can change sender details without a deploy." },
    ],
    note: "Deliberately the smallest build on this page. The practice needed a credible site and a mailing list, not a management system, and we did not sell them one.",
  },

  "elegant-care": {
    slug: "elegant-care",
    headline: "An NDIS provider's site, with support models the team maintains.",
    problem: [
      "NDIS support types and their descriptions have to be exact, and they change with the scheme.",
      "A participant or family reading the wrong description is a real problem, not a typo.",
      "Feedback matters in care, and it needs somewhere to go that is not an inbox.",
    ],
    modules: [
      "banners", "contact", "feedback", "leads", "profile",
      "seo", "services", "settings", "support-models", "testimonials",
    ],
    runs: [
      { title: "Maintain support models", desc: "Its own section, because in this sector the support types are the product and they change." },
      { title: "Collect feedback", desc: "Feedback captured as records rather than as email, which matters when you are audited on it." },
      { title: "Work enquiries", desc: "Leads in one queue, routed to the care team as they arrive." },
    ],
    note: "Australia. Different regulator, same principle: the team controls what the public reads.",
  },

  "rg-golden-palace": {
    slug: "rg-golden-palace",
    headline: "Not a venue website. The system the venue is run on.",
    problem: [
      "A wedding venue is a hotel business: rooms, bookings, guests, staff, stock and money, all on the same day.",
      "Run on registers and WhatsApp, the answer to \"is the 14th free\" depends on who you ask.",
      "Expenses and takings are reconciled at month end, from paper, by one person.",
    ],
    modules: [
      "bookings", "rooms", "guests", "crm", "employeeManagement",
      "rolesAndPermission", "expenses", "financials", "inventory", "logBook",
      "hotelDetails", "hotel-data", "hotelColor", "settings", "web-settings",
      "auth", "email verification",
    ],
    runs: [
      { title: "Take and hold bookings", desc: "Rooms and dates in one system with payment through Razorpay, so availability is a fact rather than an opinion." },
      { title: "Run the front desk", desc: "Guests, a log book and a CRM, so what happened on a given day is recorded rather than remembered." },
      { title: "Manage staff", desc: "Employee management with roles and permissions: the cleaner and the manager do not see the same screens." },
      { title: "Track money", desc: "Expenses and financials in the platform, so month end is a report rather than an evening of paperwork." },
      { title: "Hold stock", desc: "Inventory, because a venue runs out of things and finding out on the day is expensive." },
    ],
    note: "Seventeen modules including payroll-adjacent staff management, expenses and inventory. If any single project on this page proves the point, it is this one.",
  },

  "perfect-pest-control": {
    slug: "perfect-pest-control",
    headline: "Service packages, tariffs and service areas, edited by the business.",
    problem: [
      "Pest control is priced by treatment, property size and area, and those rates move.",
      "Every rate change on a static site is a developer ticket, so rates quietly go out of date.",
      "Which areas are actually served changes as the business grows, and the site is the last to know.",
    ],
    modules: [
      "banners", "contact", "leads", "locations", "packages",
      "profile", "seo", "services", "tariff", "testimonials", "theme",
    ],
    runs: [
      { title: "Set tariffs", desc: "Its own section. Rates change when the business decides they change." },
      { title: "Manage service areas", desc: "Locations as records, so coverage on the site matches coverage in reality." },
      { title: "Build packages", desc: "Treatments bundled and priced by the team rather than described in code." },
      { title: "Restyle without us", desc: "A theme section, so seasonal changes to the look do not need a release." },
    ],
  },

  "sri-jaidev-travels": {
    slug: "sri-jaidev-travels",
    headline: "Routes, tariffs and packages that the operator controls.",
    problem: [
      "Taxi and tour pricing changes with fuel, season and route. A printed rate on a website is wrong within a month.",
      "Wrong rates cost either the customer's trust or the operator's margin.",
      "Booking enquiries arrive by phone at all hours and get written on paper.",
    ],
    modules: [
      "banners", "contact", "leads", "locations", "packages",
      "profile", "seo", "tariff", "testimonials", "theme",
    ],
    runs: [
      { title: "Change the tariff", desc: "Rates by route and vehicle, updated by the operator the day fuel moves." },
      { title: "Add routes and destinations", desc: "Locations as records, so a new route is a form rather than a phone call to us." },
      { title: "Sell packages", desc: "Tour packages built and priced in the admin, published immediately." },
      { title: "Catch every enquiry", desc: "Booking enquiries into one queue and emailed through, so nothing sits unanswered overnight." },
    ],
  },

  "vinushree-travels": {
    slug: "vinushree-travels",
    headline: "The same platform, running a second travel business.",
    problem: [
      "Taxi and tour pricing changes with fuel, season and route, and a printed rate goes stale fast.",
      "A small operator cannot afford a developer on call for every rate change.",
      "Enquiries arrive by phone and are written down, or they are lost.",
    ],
    modules: [
      "banners", "contact", "leads", "locations", "packages",
      "profile", "seo", "tariff", "testimonials", "theme",
    ],
    runs: [
      { title: "Change the tariff", desc: "Rates by route and vehicle, updated by the operator, not by us." },
      { title: "Add routes and destinations", desc: "Locations as records, so the coverage on the site is the real coverage." },
      { title: "Sell packages", desc: "Tour packages built and priced in the admin." },
      { title: "Catch every enquiry", desc: "Bookings into one queue, emailed as they arrive." },
    ],
    note: "Built on the same platform as Sri Jaidev, branded and set up separately. Two businesses, one set of software we maintain, which is why the second one cost less than the first.",
  },

  "filigree-solutions": {
    slug: "filigree-solutions",
    headline: "An engineering firm's site, with the whole thing editable.",
    problem: [
      "CAD and CAE work is sold on the portfolio, and the portfolio is confidential until it is not.",
      "Which projects can be shown changes with each client agreement, so it has to be controllable.",
      "Service descriptions in engineering have to be precise, and precision is edited often.",
    ],
    modules: [
      "contact", "leads", "media", "pages", "portfolio",
      "profile", "seo", "services", "settings", "testimonials", "theme",
    ],
    runs: [
      { title: "Control the portfolio", desc: "Projects published or pulled by the firm as client permissions change." },
      { title: "Edit whole pages", desc: "A pages section, not just a blog: the structure of the site is theirs to change." },
      { title: "Manage media", desc: "Its own library, so drawings and renders are organised rather than scattered." },
      { title: "Own the SEO", desc: "Per-page titles and descriptions, controlled by the people who know the terminology." },
    ],
    note: "Seeding scripts for services and portfolio live in the repository, so the content model can be rebuilt from source rather than re-entered by hand.",
  },
};
