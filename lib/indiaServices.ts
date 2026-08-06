import type { ServiceConfig } from "@/components/ServicePage";
import { images } from "./site";

/**
 * The ten India leaf pages, as data.
 *
 * They share the US ServicePage template because the layout is right and the
 * design should not fork by region. What changes is everything a buyer reads:
 * GST rather than sales tax, UPI rather than Stripe, WhatsApp rather than the
 * agent channel, and `areaServed: India` in the schema.
 */

const CTA_IN = {
  primary: { label: "Book a strategy session", href: "/in/strategy-session" },
  secondary: { label: "See our work", href: "/in/work" },
};

const ECOM_PARENT = { label: "Ecommerce", href: "/in/ecommerce" };
const AI_PARENT = { label: "AI", href: "/in/ai" };

const ecomCrumb = (label: string) => [
  { label: "Home", href: "/in" },
  { label: "Ecommerce", href: "/in/ecommerce" },
  { label },
];
const aiCrumb = (label: string) => [
  { label: "Home", href: "/in" },
  { label: "AI", href: "/in/ai" },
  { label },
];

const ecomRelated = [
  { label: "Ecommerce Platform Development", href: "/in/ecommerce/platform-development" },
  { label: "D2C Storefronts", href: "/in/ecommerce/d2c-storefront" },
  { label: "Marketplace Platforms", href: "/in/ecommerce/marketplace" },
  { label: "B2B & Wholesale", href: "/in/ecommerce/b2b-wholesale" },
  { label: "Integrations & Automation", href: "/in/ecommerce/integrations" },
  { label: "Managed Support", href: "/in/ecommerce/managed-support" },
];
const aiRelated = [
  { label: "AI Consultation", href: "/in/ai/consultation" },
  { label: "AI Automation", href: "/in/ai/automation" },
  { label: "AI Agent Development", href: "/in/ai/agent-development" },
  { label: "Customised AI Applications", href: "/in/ai/custom-applications" },
  { label: "Forward Deployed Engineering", href: "/in/ai/forward-deployed-engineering" },
];

const base = { areaServed: ["India"] as string[] };

export const INDIA_SERVICES: Record<string, ServiceConfig> = {
  "platform-development": {
    ...base,
    slug: "/in/ecommerce/platform-development",
    parent: ECOM_PARENT,
    breadcrumb: ecomCrumb("Ecommerce Platform Development"),
    eyebrow: "Ecommerce platform development",
    h1: "Ecommerce platform development in India",
    heroSub:
      "A platform built for how your business actually sells, running on infrastructure you own. GST decided per order, Indian payment gateways integrated properly, and no percentage of every sale going elsewhere.",
    metaDescription:
      "An ecommerce platform built for how your business sells, on infrastructure you own: GST decided per order, Indian gateways integrated, no cut of every sale.",
    heroImage: images.commerce,
    chips: ["GST in the core", "UPI & Indian gateways", "Courier integrations", "No commission per order"],
    primaryKeyword: "Ecommerce platform development",
    intro: {
      title: "The platform is the product, not the theme.",
      body: "Most stores in India run on a rented platform with a theme on top and a stack of plugins holding the important parts together. That works until the order volume makes the commission hurt, or until the way your business actually sells stops fitting what the platform allows. A custom platform costs more up front and stops costing you a percentage forever after.",
    },
    featuresTitle: "What a platform build includes",
    features: [
      { icon: "cart", title: "Catalogue, cart and checkout", desc: "Products, variants, stock and a checkout tuned for Indian buyers: UPI, cards, netbanking and cash on delivery with reconciliation." },
      { icon: "shield", title: "GST handled correctly", desc: "Place of supply decides CGST and SGST or IGST per order, slabs follow the HSN code, and invoice serials run gapless through the financial year." },
      { icon: "wallet", title: "Payments and refunds", desc: "Razorpay, PayU or Cashfree integrated with proper verification, plus refunds that produce credit notes rather than a spreadsheet entry." },
      { icon: "layers", title: "Inventory that tells the truth", desc: "One stock pool across every channel you sell on, so a product sold in store is not still available online ninety seconds later." },
      { icon: "network", title: "Shipping and serviceability", desc: "Courier integrations with rates and serviceability by pincode, tracking pushed back to the customer automatically." },
      { icon: "gauge", title: "Admin your team can use", desc: "The back office is where your staff spend their day. It gets designed, not left as whatever the framework generated." },
    ],
    approachTitle: "How we build it",
    approachSub: "Senior engineers end to end. No juniors on client work, which is the only way a platform survives its second year.",
    approachPoints: [
      "We start from how your business actually sells: pricing rules, exceptions, who gets what rate, how returns really work.",
      "We take the commodity commerce core from a hardened base rather than rewriting cart, stock and payments and reintroducing bugs the industry solved years ago.",
      "The parts that are specific to you get built as modules, so they can keep changing after we hand over.",
      "GST logic is tested against real interstate scenarios before launch, not assumed to be correct because a setting was ticked.",
      "You get the source, documentation and training. A platform your team cannot maintain without us is a platform we built badly.",
    ],
    related: ecomRelated.filter((r) => !r.href.endsWith("platform-development")),
    faq: [
      { q: "How long does it take?", a: "A focused build is typically eight to sixteen weeks depending on how much integration is involved. Marketplaces and B2B platforms take longer because the rules are more complicated. We scope before quoting rather than giving you an optimistic number you cannot plan around." },
      { q: "Can we migrate from Shopify or WooCommerce?", a: "Usually yes. Products, variants, customers and order history migrate from most platforms. We assess what will and will not survive the move up front and tell you honestly about the gaps." },
      { q: "Do we have to host it ourselves?", a: "No. We can host and manage it under a support agreement, or deploy into your own cloud account and hand over. Either way the infrastructure is in your name." },
      { q: "Is a custom platform worth it at our size?", a: "Sometimes not, and we will say so. The honest test is whether your platform fee plus commission is real money yet, and whether the way you sell is being limited by what a rented platform allows." },
    ],
    cta: { title: "Bring your platform bill and your order volume.", body: "A senior consultant will put a real annual number on what renting costs you, then map what owning would look like: data model, integrations, and a realistic timeline.", ...CTA_IN },
  },

  "d2c-storefront": {
    ...base,
    slug: "/in/ecommerce/d2c-storefront",
    parent: ECOM_PARENT,
    breadcrumb: ecomCrumb("D2C Storefronts"),
    eyebrow: "D2C storefronts",
    h1: "D2C storefront development for Indian brands",
    heroSub:
      "Sell straight to your customers on a storefront you own, with your customer data, your margins, and no marketplace taking a cut and keeping the relationship.",
    heroImage: images.commerce,
    chips: ["Your customer data", "Fast on Indian networks", "UPI-first checkout", "Built for repeat purchase"],
    primaryKeyword: "D2C ecommerce development",
    intro: {
      title: "The marketplace sells your product. It does not give you a customer.",
      body: "Selling through a marketplace is a fine way to move stock and a poor way to build a brand: you never learn who bought, you cannot bring them back, and the commission does not fall as you grow. A D2C storefront is how you turn a transaction into a customer you own the relationship with.",
    },
    featuresTitle: "What we build into a D2C store",
    features: [
      { icon: "bolt", title: "Fast on a real phone", desc: "Most of your traffic is mobile on a patchy network. The store gets built and measured for that, not for a designer's laptop on office wifi." },
      { icon: "wallet", title: "A checkout Indians finish", desc: "UPI first, cards and netbanking behind it, cash on delivery where your margins allow, and the fewest possible steps between wanting it and paying." },
      { icon: "users", title: "Customers you can reach again", desc: "Your customer list lives in your database. Repeat purchase, win-back and loyalty become things you can actually run." },
      { icon: "bell", title: "Abandoned cart recovery", desc: "Detect, remind and measure what actually came back as revenue. The cheapest revenue in any store and the most commonly left switched off." },
      { icon: "search", title: "Findable, by people and by AI", desc: "Structured product data and clean pages, so search engines and AI assistants can read your catalogue rather than guess at it." },
      { icon: "chat", title: "Support where they already are", desc: "WhatsApp and chat wired into the store so a question about an order does not become an email nobody answers." },
    ],
    approachTitle: "How we approach a D2C build",
    approachPoints: [
      "Design starts from your best-selling product page, because that is where the money is decided.",
      "Checkout is built and tested with real payments before anything else is polished.",
      "Performance is a budget we hold to, measured on mid-range Android over a normal connection.",
      "The catalogue is structured properly, with HSN and GST correct from the first product rather than fixed later.",
      "Analytics is set up so you can answer which product, which channel and which campaign actually paid.",
    ],
    related: ecomRelated.filter((r) => !r.href.endsWith("d2c-storefront")),
    faq: [
      { q: "We already sell on marketplaces. Why add a store?", a: "Margin and ownership. On your own store there is no commission and you keep the customer relationship, which is what makes the second and third purchase possible. Most brands run both, using marketplaces for reach and their own store for margin and repeat." },
      { q: "How fast should our store be?", a: "Fast enough that a mid-range Android phone on mobile data shows the product in about two seconds. We treat that as a budget and measure against it, because in India that number is the difference between a sale and a bounce." },
      { q: "Do you handle the design?", a: "Yes, built to your brand rather than a theme with your logo dropped in. If you have a design team we work to their direction instead." },
      { q: "Can it handle a sale-day spike?", a: "Yes, and we load test before the date rather than finding out during it. Tell us the expected peak and we size and prove it in advance." },
    ],
    cta: { title: "Bring your best-selling product page.", body: "We will tell you what is costing you conversions on it and what a store you own would change about your margin and your repeat rate.", ...CTA_IN },
  },

  marketplace: {
    ...base,
    slug: "/in/ecommerce/marketplace",
    parent: ECOM_PARENT,
    breadcrumb: ecomCrumb("Marketplace Platforms"),
    eyebrow: "Marketplace platforms",
    h1: "Marketplace platform development in India",
    heroSub:
      "Many sellers on one platform: onboarding, catalogue control, commission, split payouts and settlement. The parts that make a marketplace hard, built properly rather than approximated.",
    metaDescription:
      "Many sellers on one platform: seller onboarding, catalogue control, commission, split payouts and settlement — the hard parts built properly, not approximated.",
    heroImage: images.marketplace,
    chips: ["Seller onboarding", "Split payouts", "Commission & settlement", "Catalogue quality control"],
    primaryKeyword: "Marketplace platform development",
    intro: {
      title: "A marketplace is not a store with more sellers.",
      body: "The catalogue arrives from people who do not work for you, the money has to be split before it is paid out, and every dispute involves three parties. Those are the problems that decide whether a marketplace works, and none of them are solved by a store platform with a vendor plugin.",
    },
    featuresTitle: "What a marketplace build has to get right",
    features: [
      { icon: "users", title: "Seller onboarding", desc: "Registration, KYC document collection, GST verification and bank details, with an approval flow your team can actually operate." },
      { icon: "grid", title: "Catalogue control", desc: "Sellers list, you set the rules: required fields, approval before going live, and duplicate detection so the same product does not appear eleven times." },
      { icon: "wallet", title: "Split payments and payouts", desc: "One payment from the buyer, split by commission, held through the return window, and paid out on a schedule with a statement each seller can reconcile." },
      { icon: "tag", title: "Commission that can vary", desc: "By category, by seller, by campaign. Real marketplaces never have one rate, and hardcoding one is the mistake that forces a rebuild." },
      { icon: "records", title: "Settlement you can audit", desc: "Every rupee traceable from order to payout, with GST handled on both the sale and your commission invoice." },
      { icon: "gauge", title: "Seller and admin dashboards", desc: "Sellers see their orders, stock and payouts without calling you. Your team sees the whole platform without opening the database." },
    ],
    approachTitle: "How we build marketplaces",
    approachPoints: [
      "Money flow gets designed first: who pays whom, when, minus what, and what happens on a return. Everything else follows from that.",
      "Commission and payout rules are configuration, not code, because they will change and you should not need us when they do.",
      "Sellers get a proper dashboard from day one. A marketplace where sellers phone your team for order status does not scale past thirty of them.",
      "Settlement reports are built to be reconciled against a bank statement, because eventually somebody will.",
      "We build for the dispute case, not just the happy path: partial refunds, returns after payout, and seller cancellations.",
    ],
    related: ecomRelated.filter((r) => !r.href.endsWith("marketplace")),
    faq: [
      { q: "Can we start with a simple version?", a: "Yes, and you should. Onboarding, listing, ordering and payouts is a working marketplace. Ratings, ads, subscriptions and loyalty come after you have sellers who care about them." },
      { q: "How do split payments work in India?", a: "Razorpay Route, Cashfree Easy Split and similar products hold and split funds on your behalf, which keeps you out of the business of holding other people's money. We integrate whichever suits your model and volume." },
      { q: "Who is responsible for GST?", a: "Generally each seller invoices the buyer and you invoice the seller for commission, both of which the platform has to generate correctly. We build that in rather than leaving it to a monthly spreadsheet." },
      { q: "We built one already and it is struggling.", a: "Usually it is settlement, catalogue quality or seller experience rather than the storefront. We will audit it and tell you whether it needs fixing or replacing, including when the answer is fixing." },
    ],
    cta: { title: "Describe how the money should move.", body: "Who pays, who gets paid, what you keep, and what happens on a return. That conversation tells us most of what your marketplace needs, and it is where a senior consultant will start.", ...CTA_IN },
  },

  "b2b-wholesale": {
    ...base,
    slug: "/in/ecommerce/b2b-wholesale",
    parent: ECOM_PARENT,
    breadcrumb: ecomCrumb("B2B & Wholesale"),
    eyebrow: "B2B & wholesale commerce",
    h1: "B2B and wholesale ecommerce platforms",
    heroSub:
      "Customer-specific pricing, quotes and RFQ, bulk ordering, credit terms and approval flows, connected to the ERP you already run. Built for buyers who order the same forty items every month.",
    metaDescription:
      "Customer-specific pricing, quotes and RFQ, bulk ordering, credit terms and approval flows, connected to the ERP you already run. Built for repeat B2B buyers.",
    heroImage: images.commerce,
    chips: ["Price per customer", "Quotes & RFQ", "Credit terms", "ERP connected"],
    primaryKeyword: "B2B ecommerce platform",
    intro: {
      title: "Your dealers do not shop. They reorder.",
      body: "A B2B buyer knows exactly what they want, has a rate agreed months ago, and wants to place the order in ninety seconds. Consumer commerce patterns actively get in their way. The platform that wins their orders is the one that makes reordering faster than sending a WhatsApp message to your sales person.",
    },
    featuresTitle: "What B2B buyers actually need",
    features: [
      { icon: "tag", title: "Their price, not a list price", desc: "Rates by customer, group, volume slab and contract, applied automatically. Nobody should be reading a rate card to place an order." },
      { icon: "records", title: "Quotes and RFQ", desc: "A buyer requests, your team prices, the quote converts to an order in one click and stays on record for both sides." },
      { icon: "layers", title: "Bulk and repeat ordering", desc: "Order by SKU code, upload a spreadsheet, or repeat last month's order and change three lines. This is how the volume actually arrives." },
      { icon: "wallet", title: "Credit terms and limits", desc: "Order against a credit limit, see outstanding, and stop at the point your finance team says stop, without a phone call." },
      { icon: "users", title: "Multiple buyers per company", desc: "A purchase assistant raises it, a manager approves it. Roles and approval flows that match how your customers are actually organised." },
      { icon: "network", title: "Connected to your ERP", desc: "Stock, rates, credit and orders in step with Tally or whatever you run, so nobody is retyping orders into a second system." },
    ],
    approachTitle: "How we approach a B2B build",
    approachPoints: [
      "We map your pricing exceptions first. Every distributor has them, they are never written down anywhere complete, and they decide the data model.",
      "Reordering is the flow we optimise hardest, because it is where the volume is.",
      "ERP integration is scoped early and honestly, including the parts of your ERP that will fight us.",
      "Your sales team gets tools too: place orders on behalf of a customer, see what a dealer has not reordered this month.",
      "Rollout goes dealer by dealer rather than all at once, so a problem costs you one customer's patience instead of all of them.",
    ],
    related: ecomRelated.filter((r) => !r.href.endsWith("b2b-wholesale")),
    faq: [
      { q: "Our pricing is complicated. Can it handle that?", a: "Yes, and complicated pricing is the normal case. Customer rates, group rates, volume slabs, contract prices and one-off exceptions all coexist. Getting this right is most of what a B2B platform is." },
      { q: "Can it connect to Tally?", a: "Yes. Tally, SAP, Oracle and most Indian ERPs. We scope the integration properly up front, because the ERP is usually the part that determines the timeline." },
      { q: "Will our dealers actually use it?", a: "Only if it is faster than messaging your sales person, which is the bar. That is why reordering gets the most design attention and why we roll out gradually with your best dealers first." },
      { q: "Can we sell B2B and D2C from one platform?", a: "Yes, on one stock pool with different pricing, catalogues and checkout rules per audience. It is a common and sensible setup." },
    ],
    cta: { title: "Tell us your worst pricing exception.", body: "The one nobody has written down. A senior consultant will show you how it gets modelled, which is the honest test of whether a platform can handle your business.", ...CTA_IN },
  },

  integrations: {
    ...base,
    slug: "/in/ecommerce/integrations",
    parent: ECOM_PARENT,
    breadcrumb: ecomCrumb("Integrations & Automation"),
    eyebrow: "Integrations & automation",
    h1: "Ecommerce integrations and automation",
    heroSub:
      "Tally or your ERP, warehouse, courier, payment gateway and accounting, joined into one flow. So an order is entered once, and nobody spends their morning copying data between two systems.",
    metaDescription:
      "Tally or your ERP, warehouse, courier, gateway and accounting joined into one flow, so an order is entered once and nobody copies data between two systems.",
    heroImage: images.dev,
    chips: ["Tally & ERP", "Warehouse & courier", "Payments & reconciliation", "No double entry"],
    primaryKeyword: "Ecommerce integration services",
    intro: {
      title: "Somebody in your office is a human API.",
      body: "In most growing businesses there is one person whose job is retyping orders from one system into another, reconciling payouts by hand, and updating stock in two places. That is not a staffing problem. It is an integration that was never built, and it caps how much you can sell.",
    },
    featuresTitle: "What we connect",
    features: [
      { icon: "records", title: "Tally and ERP", desc: "Orders, invoices, stock and ledgers in step with your accounting, so month-end stops being an archaeology exercise." },
      { icon: "layers", title: "Warehouse and inventory", desc: "One stock pool across your store, marketplaces and physical counters, updated in near real time rather than at end of day." },
      { icon: "network", title: "Courier and logistics", desc: "Shipment creation, label generation, serviceability checks by pincode, and tracking pushed back to the customer without anyone touching it." },
      { icon: "wallet", title: "Payments and reconciliation", desc: "Gateway settlements matched against orders automatically, so the difference between what you sold and what landed in the bank is visible on a screen instead of in a spreadsheet." },
      { icon: "chat", title: "WhatsApp and notifications", desc: "Order confirmations, dispatch and delivery updates on the channel Indian customers actually read, sent automatically." },
      { icon: "bolt", title: "The workflows in between", desc: "Low stock triggers a purchase order, a failed payment triggers a follow-up, a return triggers a credit note. The small automations that add up." },
    ],
    approachTitle: "How we approach integration work",
    approachPoints: [
      "We start by watching what your team does by hand for a week. That list is the project scope, and it is always more useful than a requirements document.",
      "Integrations are built to survive the other system being down, because it will be. Retries, queues, and alerts when something has genuinely failed.",
      "Every sync is observable: you can see what moved, what did not, and why, without opening a database.",
      "We do not sync everything just because it is possible. Each connection has to remove real work or it is maintenance debt with no payoff.",
      "Documentation and handover, so a future engineer can understand it without ringing us.",
    ],
    related: ecomRelated.filter((r) => !r.href.endsWith("integrations")),
    faq: [
      { q: "Our ERP is old and has no API.", a: "Common, and workable. Depending on the system we integrate through the database, scheduled file exchange, or a small service that sits alongside it. We assess it before quoting rather than promising and discovering." },
      { q: "How long does an integration take?", a: "A single well-documented connection is often two to three weeks. Older systems take longer, and we would rather tell you that after looking than before." },
      { q: "What happens when the other system goes down?", a: "The integration queues and retries rather than losing data, and alerts a human when something has genuinely failed rather than failing silently. Silent failure is the expensive one." },
      { q: "Can you automate without replacing our platform?", a: "Yes, and often that is the right first step. Integration and automation on what you already run is cheaper than a rebuild and buys you time to decide whether you need one." },
    ],
    cta: { title: "Tell us what your team retypes.", body: "The task somebody does every morning by copying between two screens. A senior consultant will tell you what it costs you a year and what removing it involves.", ...CTA_IN },
  },

  "managed-support": {
    ...base,
    slug: "/in/ecommerce/managed-support",
    parent: ECOM_PARENT,
    breadcrumb: ecomCrumb("Managed Support"),
    eyebrow: "Managed support",
    h1: "Managed ecommerce support and maintenance",
    heroSub:
      "We run and maintain the platform against an agreed SLA: monitoring, updates, security patching, and a person who answers when checkout breaks at 9pm on a Saturday.",
    metaDescription:
      "We run and maintain your ecommerce platform against an agreed SLA: monitoring, updates, security patching, and a person who answers when checkout breaks.",
    heroImage: images.dev,
    chips: ["Agreed SLA", "Monitoring & alerts", "Security patching", "A named person"],
    primaryKeyword: "Ecommerce maintenance and support",
    intro: {
      title: "A platform is not finished when it launches.",
      body: "Dependencies get security patches, gateways change their APIs, traffic spikes on sale days, and something eventually breaks at the worst possible hour. The businesses that stay up are the ones where somebody is watching and somebody answers, which is a service rather than a hope.",
    },
    featuresTitle: "What managed support covers",
    features: [
      { icon: "eye", title: "Monitoring that wakes someone", desc: "Uptime, error rates, checkout success and payment failures watched continuously, with alerts that reach a person rather than an unattended inbox." },
      { icon: "shield", title: "Security patching", desc: "Dependencies and infrastructure kept current, with urgent vulnerabilities handled on a defined clock rather than when somebody notices." },
      { icon: "bolt", title: "Performance kept honest", desc: "Page speed and checkout timing measured over time, because platforms get slower gradually and nobody notices until conversions drop." },
      { icon: "clock", title: "An SLA with real numbers", desc: "Response and resolution times by severity, written down. Checkout down is not the same as a typo, and the agreement should say so." },
      { icon: "users", title: "A named engineer", desc: "Somebody who knows your platform, not a ticket queue where you re-explain your architecture every time." },
      { icon: "records", title: "Backups you have tested", desc: "Backed up on a schedule, and restored into a test environment periodically, because an untested backup is a belief rather than a backup." },
    ],
    approachTitle: "How support works",
    approachPoints: [
      "Severity levels agreed at the start, so nobody argues about urgency during an incident.",
      "One channel for raising issues, and a status you can see without asking.",
      "Sale days and festive peaks are planned for in advance: load tested, scaled, and watched live on the day.",
      "A monthly note on what broke, what we changed, and what is worth fixing properly rather than patching again.",
      "Small improvements included, so the platform keeps getting better rather than only being kept alive.",
    ],
    related: ecomRelated.filter((r) => !r.href.endsWith("managed-support")),
    faq: [
      { q: "Do you support platforms you did not build?", a: "Yes, after an audit. We need to understand what we are taking on before agreeing to an SLA, and the audit sometimes finds things you will want fixed before we start." },
      { q: "What counts as an emergency?", a: "Anything stopping customers ordering or paying: checkout down, payment failing, the site unreachable. Those get a defined response clock. A cosmetic issue does not, and the agreement says which is which." },
      { q: "Is this instead of having our own team?", a: "It can be either. Some clients have no engineers and we are the whole function. Others have a team and we cover out of hours, infrastructure and the specialist work. Both are normal." },
      { q: "What about sale days?", a: "Planned in advance. We load test against your expected peak, scale ahead of it, and watch it live on the day rather than reacting afterwards." },
    ],
    cta: { title: "What happens today when checkout breaks?", body: "If the honest answer involves messaging a freelancer and hoping, that is worth a conversation. A senior consultant will map what a real support arrangement would look like for your platform.", ...CTA_IN },
  },

  consultation: {
    ...base,
    slug: "/in/ai/consultation",
    parent: AI_PARENT,
    breadcrumb: aiCrumb("AI Consultation"),
    eyebrow: "AI consultation",
    h1: "AI consultation for Indian businesses",
    heroSub:
      "What is genuinely worth doing with AI in your business, whether your data can support it, and what reaching production would actually cost. It ends with a costed path, not a maturity score.",
    metaDescription:
      "What is genuinely worth doing with AI in your business, whether your data can support it, and what production would cost. Ends with a costed path, not a score.",
    heroImage: images.ai,
    chips: ["Costed path to production", "Data readiness assessed", "Honest no when it is no", "1 to 2 weeks"],
    primaryKeyword: "AI consulting services India",
    intro: {
      title: "Most AI advice is a document nobody can act on.",
      body: "You can buy a strategy deck, a maturity assessment and a roadmap from any consultancy in the country. What none of them tell you is whether your data will actually support the thing they recommended, and what it costs to run it in production. That is the part we do, because we are the people who would then build it.",
    },
    featuresTitle: "What a consultation covers",
    features: [
      { icon: "search", title: "The data you actually have", desc: "Not the data on the architecture diagram. Where it lives, what state it is in, and whether it can support what you want to do." },
      { icon: "compass", title: "The use case behind the ask", desc: "Usually there is a business problem underneath the AI request, and sometimes the best answer to it is not AI at all. We will say so." },
      { icon: "gauge", title: "What working would mean", desc: "How you would know the system is right, defined in numbers before anybody builds. Skipping this is how projects end in arguments." },
      { icon: "wallet", title: "What it costs to run", desc: "Not just to build. Token spend, infrastructure and the engineering time to keep it accurate, sized for your volume." },
      { icon: "shield", title: "Governance and risk", desc: "Where your data may go, what has to stay on your infrastructure, and what your compliance team will ask before this goes live." },
      { icon: "records", title: "A path you can price", desc: "Phases, what each delivers, and what each costs. Enough to take to a board rather than a document that ends in recommendations." },
    ],
    approachTitle: "How a consultation runs",
    approachSub: "One to two weeks, fixed fee. Paid, because a free assessment is worth what you pay for it.",
    approachPoints: [
      "We talk to the people doing the work, not only the people sponsoring the project. The gap between those two accounts is usually where the truth is.",
      "We look at real data and real volumes rather than a schema.",
      "We build a small proof where one is cheap and settles an argument, and we say so when one is not worth building.",
      "You get the costed path in writing, including the option of not doing it.",
      "If we build it afterwards, this is stage one of the same method. If you build it yourselves or with somebody else, the document still works.",
    ],
    related: aiRelated.filter((r) => !r.href.endsWith("consultation")),
    faq: [
      { q: "Why is discovery paid?", a: "Because a free assessment is a sales exercise with a predictable conclusion. Paying for it means we are working for you rather than for the follow-on contract, and it means we can tell you not to build the thing." },
      { q: "What do we actually receive?", a: "A written assessment of your data and use case, a definition of what working would mean in numbers, an architecture direction, a phased plan with costs, and a clear recommendation including whether to proceed." },
      { q: "Do we have to build it with you?", a: "No. The document is yours and it is written to be usable by anyone. Plenty of clients take it to their own team." },
      { q: "How long does it take?", a: "One to two weeks for most engagements. Longer if the data is spread across many systems, and we will tell you that before starting rather than halfway through." },
    ],
    cta: { title: "Start with the problem, not the technology.", body: "Tell us what is slow, expensive or error-prone in your business today. A senior consultant will tell you whether AI is the right tool for it, and what it would take to reach production if it is.", ...CTA_IN },
  },

  automation: {
    ...base,
    slug: "/in/ai/automation",
    parent: AI_PARENT,
    breadcrumb: aiCrumb("AI Automation"),
    eyebrow: "AI automation",
    h1: "AI automation for business workflows",
    heroSub:
      "The work your team repeats every single day, automated: document handling, data entry, classification, routing and reporting. With a person still in the loop wherever being wrong is expensive.",
    metaDescription:
      "The work your team repeats daily, automated: document handling, data entry, classification, routing and reporting — with a person in the loop where it matters.",
    heroImage: images.ai,
    chips: ["Document processing", "Classification & routing", "Human in the loop", "Measured, not assumed"],
    primaryKeyword: "AI automation services",
    intro: {
      title: "Start where the work is boring and the volume is high.",
      body: "The best automation candidates are not the exciting ones. They are the tasks somebody does forty times a day, where the rules are mostly consistent, and where being wrong occasionally is recoverable. Those pay back quickly and build the confidence to attempt harder things.",
    },
    featuresTitle: "What we typically automate",
    features: [
      { icon: "records", title: "Documents into data", desc: "Invoices, purchase orders, forms and delivery notes read and turned into structured records, with anything uncertain routed to a person rather than guessed." },
      { icon: "filter", title: "Classification and routing", desc: "Incoming email, tickets and enquiries read, categorised and sent to the right team, with priority and sentiment attached." },
      { icon: "chat", title: "Drafting and replying", desc: "First-draft replies written from your own documents so your team edits rather than composes. Faster, and consistent in a way people never are." },
      { icon: "search", title: "Extraction and checking", desc: "Pulling the specific facts out of contracts, reports or statements, and flagging where two documents disagree with each other." },
      { icon: "gauge", title: "Reporting that writes itself", desc: "The weekly summary somebody assembles by hand, generated from the source systems with the commentary drafted." },
      { icon: "users", title: "Human in the loop by design", desc: "Confidence thresholds decide what goes through and what a person checks. You choose where that line sits, and you can move it as trust grows." },
    ],
    approachTitle: "How we approach automation",
    approachPoints: [
      "We measure the task before we touch it: how long it takes, how often it happens, and how often it goes wrong today. Without that there is no way to prove the automation helped.",
      "We start with the automation running alongside your team rather than instead of it, and compare.",
      "Confidence thresholds are set so the system escalates rather than guesses. An automation that is confidently wrong is worse than no automation.",
      "Everything it does is logged and reversible, so a mistake is a correction rather than an investigation.",
      "We widen scope only after the narrow version has proved itself on real volume.",
    ],
    related: aiRelated.filter((r) => !r.href.endsWith("automation")),
    faq: [
      { q: "Will this replace our staff?", a: "In our experience it moves them onto the work that needed judgement, because the volume that was queuing up gets handled. We are not going to promise you headcount reduction, because the honest outcome is usually more throughput from the same team." },
      { q: "What if it makes a mistake?", a: "It is designed to escalate rather than guess. You set the confidence line, everything is logged, and actions are reversible. Before go-live we run it alongside your team and compare, so you see the error rate before it matters." },
      { q: "How do we know it is worth it?", a: "We measure the task first: time, volume and current error rate. If those numbers do not justify the build, we will tell you before you spend anything." },
      { q: "Does our data go to an AI provider?", a: "Only if you are comfortable with that, and we tell you exactly what would be sent. Where policy does not allow it we run smaller models on your own infrastructure instead." },
    ],
    cta: { title: "Name the task that eats your team's week.", body: "The repetitive one everybody complains about. A senior consultant will tell you whether it automates well, what it would cost, and whether the numbers justify doing it.", ...CTA_IN },
  },

  "agent-development": {
    ...base,
    slug: "/in/ai/agent-development",
    parent: AI_PARENT,
    breadcrumb: aiCrumb("AI Agent Development"),
    eyebrow: "AI agent development",
    h1: "AI agent development for enterprises",
    heroSub:
      "Agents that do work inside your systems rather than only answer questions, with clear limits on what they may act on alone and a complete record of everything they did.",
    metaDescription:
      "AI agents that do work inside your systems rather than only answer questions, with clear limits on what they may act on alone and a record of what they did.",
    heroImage: images.ai,
    chips: ["Acts, not just answers", "Bounded permissions", "Full audit trail", "Evaluated before live"],
    primaryKeyword: "AI agent development company",
    intro: {
      title: "An agent that can act is a different risk from a chatbot.",
      body: "A chatbot that is wrong wastes someone's time. An agent that is wrong updates a record, sends a message or moves money. That difference is the whole engineering problem: what it may do alone, what needs approval, and how you find out afterwards exactly what happened.",
    },
    featuresTitle: "What our agents are built with",
    features: [
      { icon: "lock", title: "Permissions with a boundary", desc: "Each agent gets the narrowest access that lets it do its job. What it may read, what it may change, and what it must ask about, defined explicitly." },
      { icon: "records", title: "An audit trail that holds up", desc: "Every action logged with what it saw, what it decided and why. When somebody asks what happened on the fourteenth, there is an answer." },
      { icon: "users", title: "Approval where it matters", desc: "Actions above a threshold you set wait for a person. The threshold moves as the agent earns trust, rather than being all or nothing on day one." },
      { icon: "gauge", title: "Evaluated before it goes live", desc: "Tested against real scenarios including the awkward ones, with results you see before it touches production. This is the step almost everyone skips." },
      { icon: "network", title: "Connected to real systems", desc: "Your ERP, CRM, database and internal tools. An agent that cannot reach your systems is a demo." },
      { icon: "eye", title: "Watched after launch", desc: "Monitoring on what it does, how often it escalates and what it costs to run, so drift shows up as a chart rather than a complaint." },
    ],
    approachTitle: "How we build agents",
    approachPoints: [
      "We start with the narrowest useful version. An agent that does one thing reliably beats one that does six things unpredictably.",
      "Every agent is deterministic where it can be. Not everything needs a model, and the parts that do not are cheaper and more reliable without one.",
      "Read-only first, in production, alongside your team. It earns write access by being right.",
      "Evaluation is written before the agent is, so working is a number rather than an opinion.",
      "Cost is designed in: model choice, caching and limits, visible from the first week rather than at the first invoice.",
    ],
    related: aiRelated.filter((r) => !r.href.endsWith("agent-development")),
    faq: [
      { q: "What is the difference between an agent and a chatbot?", a: "A chatbot answers. An agent takes actions in your systems: updating a record, creating an order, sending a message, escalating a case. That makes it more useful and considerably more dangerous, which is why permissions and audit matter as much as the model." },
      { q: "How do we stop it doing something stupid?", a: "Narrow permissions, approval thresholds you control, evaluation before go-live, and read-only operation in production until it has proved itself. Every action is logged and reversible." },
      { q: "Can it work with our existing systems?", a: "That is usually most of the project. We integrate with your ERP, CRM, databases and internal tools, and the difficulty is almost always there rather than in the model." },
      { q: "What does it cost to run?", a: "It depends on volume and model choice, and we size it during design rather than surprising you. Caching, smaller models for simple steps and hard limits are all part of the build." },
    ],
    cta: { title: "Describe a decision your team makes fifty times a day.", body: "With the rules, the exceptions and what happens when it goes wrong. That is the shape of a good first agent, and a senior consultant will tell you whether yours qualifies.", ...CTA_IN },
  },

  "custom-applications": {
    ...base,
    slug: "/in/ai/custom-applications",
    parent: AI_PARENT,
    breadcrumb: aiCrumb("Customised AI Applications"),
    eyebrow: "Customised AI applications",
    h1: "Custom AI application development",
    heroSub:
      "A complete application built for your business with AI inside it, from nothing. For when the shape of your problem means no ready product fits, and bending one to fit would cost more than building right.",
    metaDescription:
      "A complete application built for your business with AI inside it, from nothing — for when no ready product fits and bending one to fit would cost more.",
    heroImage: images.dev,
    chips: ["Built from nothing", "AI where it earns its place", "Yours entirely", "Senior engineers end to end"],
    primaryKeyword: "Custom AI application development",
    intro: {
      title: "When a product would fit, buy the product.",
      body: "We sell three products, and if one of them fits your problem we would rather sell you that: it is faster, cheaper and already works. Custom is for the case where your business does something specific enough that adapting a ready application costs more than building the right one, and leaves you with something that fits nobody well.",
    },
    featuresTitle: "What a custom application involves",
    features: [
      { icon: "compass", title: "The workflow, properly understood", desc: "We map how the work actually happens, including the exceptions people handle without thinking about them. That is where off-the-shelf software breaks." },
      { icon: "grid", title: "An application, not a chat box", desc: "Screens, roles, records and reports built around the job. AI sits inside it where it earns its place, rather than being the whole interface." },
      { icon: "ai", title: "AI where it actually helps", desc: "Extraction, drafting, ranking, classification, judgement support. Deliberately not everywhere: the parts that should be deterministic stay deterministic." },
      { icon: "network", title: "Integrated with what exists", desc: "Your ERP, accounting, existing databases and internal tools, so this becomes part of the business rather than another island." },
      { icon: "gauge", title: "Evaluated and monitored", desc: "The AI parts have tests that catch wrong answers before your users do, and monitoring after launch so quality is visible over time." },
      { icon: "code", title: "Handed over properly", desc: "Source, documentation and training. You can maintain it, extend it, or have somebody else do so." },
    ],
    approachTitle: "How a custom build runs",
    approachPoints: [
      "Discovery first, always. Custom work fails most often because the workflow was described rather than observed.",
      "We build the thinnest end-to-end version early so you use it before the expensive parts are committed to.",
      "The AI features are the last thing built, not the first. The application has to be right without them, so the AI is an improvement rather than a dependency.",
      "Your engineers are in the repository throughout if you have them, so it is maintainable by your team from launch.",
      "We say no when a product would do. Talking a client out of a custom build is a better long-term trade than selling one they did not need.",
    ],
    related: aiRelated.filter((r) => !r.href.endsWith("custom-applications")),
    faq: [
      { q: "How is this different from buying MnT AI Desk or AI CRM?", a: "Those start from software that already works, so they are fast and comparatively cheap and cover a common shape of problem. Custom starts from your workflow, so it fits exactly, takes longer and costs more. We will tell you honestly which one your problem is." },
      { q: "How long does a custom application take?", a: "Typically twelve to twenty-four weeks for a first production version, depending on how much integration is involved. Discovery gives you a real number before you commit to the build." },
      { q: "Do we own it?", a: "Yes, entirely. Source, data and infrastructure. You can maintain it in-house, extend it, or hand it to another firm." },
      { q: "Can we start smaller?", a: "Yes, and we prefer it. The thinnest version that solves one real workflow, in production, then extended. It gets value earlier and it means the expensive decisions are made with real usage rather than assumptions." },
    ],
    cta: { title: "Describe the workflow nothing off the shelf handles.", body: "The thing your business does that every product you have evaluated gets almost right. A senior consultant will tell you whether that is a custom build or a configuration problem, honestly.", ...CTA_IN },
  },
};
