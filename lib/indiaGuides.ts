import type { QA } from "@/components/FAQ";

/**
 * The India guides hub.
 *
 * The content plan asks for a knowledge hub to capture long-tail search around
 * ecommerce, AI, WhatsApp/CRM and business automation. These are written from
 * what this business actually knows and has built — GST in a commerce core,
 * WhatsApp selling, owning versus renting a platform, what makes an AI project
 * stop — rather than from a keyword list. A guide that says nothing a buyer
 * could not have guessed is worse than no guide: it is the thin content the
 * site audit flagged, published on purpose.
 *
 * The blog at /blog stays US-only (see content/topic-log.md). This is India's,
 * and it is deliberately a small set of substantial pieces rather than a large
 * set of thin ones.
 */

export type GuideSection = { heading: string; body: string[] };

export type Guide = {
  slug: string;
  /** Cluster from the content plan, shown as the eyebrow. */
  cluster: "Ecommerce" | "AI & automation" | "WhatsApp & CRM";
  title: string;
  metaTitle: string;
  metaDescription: string;
  /** The one-line answer, for the reader in a hurry and for answer engines. */
  summary: string;
  readingMins: number;
  sections: GuideSection[];
  faq: QA[];
  /** Where to go next on the site, when the guide has done its job. */
  related: { label: string; href: string }[];
};

export const INDIA_GUIDES: Guide[] = [
  {
    slug: "own-platform-vs-rented",
    cluster: "Ecommerce",
    title: "What a rented ecommerce platform actually costs you",
    metaTitle: "Rented vs Own Ecommerce Platform: The Real Cost | MnT Future",
    metaDescription:
      "The monthly fee is not the number that matters. How to work out what a rented ecommerce platform costs your business a year, and when owning one is cheaper.",
    summary:
      "Work out the annual number before the argument: subscription, transaction percentage, paid apps, and the theme work you cannot do without. Owning starts to win when that total is large and the way you sell is the thing making you money.",
    readingMins: 6,
    sections: [
      {
        heading: "Add up the real number first",
        body: [
          "Most people compare a monthly subscription against a build quote and stop there. That comparison is wrong in both directions, and it is worth twenty minutes with a spreadsheet before anybody argues.",
          "The rented number is the subscription, plus the transaction percentage on every order, plus the paid apps you cannot remove, plus what you pay somebody to keep the theme and the plugin stack working. At low volume that total is small and renting is genuinely the right answer. At real volume the percentage is the line that grows while everything else stays flat, and a record month costs you more to process than a quiet one.",
          "The owned number is the build, plus hosting, plus the maintenance you will pay somebody for. It is larger up front and flat afterwards. The question is not which is cheaper today, it is where the two lines cross and how far away that is.",
        ],
      },
      {
        heading: "The part that is not about money",
        body: [
          "Cost decides when. What you sell decides whether.",
          "If your business is a catalogue, a cart and a courier, a rented platform does that well and a custom build is an expensive way to arrive at the same place. We will say so.",
          "It changes when the specific thing your business does is the thing that makes you money and no platform respects it. Size-level stock shared by a web store and a shop counter. Raw material bought whole, processed, and sold in packs, with wastage recorded. Customer-specific pricing your dealers have negotiated. These are not features you file a request for. They are the business, and on a rented platform they end up as a spreadsheet somebody maintains by hand.",
        ],
      },
      {
        heading: "GST is a legal requirement, not a preference",
        body: [
          "This is the one Indian businesses discover late. Place of supply decides whether an order is CGST and SGST or IGST. The slab follows the HSN code. Invoice serial numbers have to run gapless through the financial year, and a credit note has to reference the invoice it reverses.",
          "A plugin can approximate this. Approximation is fine until a return, an interstate order and a financial-year boundary happen in the same week, and then somebody is fixing invoice numbers by hand before a filing. Built into the core, it is arithmetic the platform does. Bolted on, it is arithmetic your accountant does.",
        ],
      },
      {
        heading: "What owning actually means",
        body: [
          "Owning is not a feeling, it is four concrete things: the repository, the database, the hosting accounts and the documentation are yours. You can hire another team tomorrow and hand them all of it.",
          "It also means no commission on your orders, no per-seat licence that grows as you hire, and nothing that stops working the day a contract ends. That is the part worth negotiating for in writing, whoever builds it for you.",
        ],
      },
    ],
    faq: [
      {
        q: "At what order volume does owning become worth it?",
        a: "There is no single number, because it depends on your average order value and how much of your platform cost is percentage-based rather than flat. Do the arithmetic on your own numbers: annual subscription plus commission plus apps plus theme maintenance. If that total is a meaningful fraction of a build, you are close. If it is not, keep renting and spend the money on demand instead.",
      },
      {
        q: "Can we move gradually rather than all at once?",
        a: "Usually yes, and it is often the right call. The common path is to build the part that is actually hurting — the stock pool, the B2B pricing, the invoicing — connect it to what you already run, and move the storefront later when it is the last thing left.",
      },
      {
        q: "What happens to our SEO if we move?",
        a: "It survives a careful migration and suffers a careless one. URLs map one to one or redirect permanently, structured data comes across, and the sitemap goes in on the day of the move. The risk is real and it is manageable; anyone who tells you there is no risk has not done many.",
      },
    ],
    related: [
      { label: "Ecommerce Platform Development", href: "/in/ecommerce/platform-development" },
      { label: "MnT Commerce India", href: "/in/products/commerce-india" },
    ],
  },

  {
    slug: "gst-in-your-ecommerce-platform",
    cluster: "Ecommerce",
    title: "GST in an ecommerce platform: what has to be right",
    metaTitle: "GST for Ecommerce in India: What to Get Right | MnT Future",
    metaDescription:
      "Place of supply, CGST/SGST vs IGST, HSN slabs, gapless invoice serials and credit notes: what an ecommerce platform must handle rather than approximate.",
    summary:
      "Four things decide whether your invoicing survives an audit: place of supply, the slab from the HSN code, gapless serial numbers through the financial year, and credit notes that reference the invoice they reverse.",
    readingMins: 7,
    sections: [
      {
        heading: "Place of supply decides the tax, not the shipping address alone",
        body: [
          "For goods, the place of supply is generally where the goods are delivered. If that state matches the seller's state, the order carries CGST and SGST. If it does not, it carries IGST. One order, two different tax lines, decided per order rather than set once in a settings page.",
          "This is why a flat tax rate configured globally is wrong the moment you ship outside your own state, and why it stays quietly wrong until somebody reconciles a return.",
        ],
      },
      {
        heading: "The slab follows the HSN code",
        body: [
          "Rates are not per store or per category as you have defined it: they follow the classification of the item. Apparel changes slab by price point. Food sits across several slabs and some of it is exempt.",
          "So the platform needs the HSN code on the product, and the rate has to be derived from it at the time of the order rather than typed in by whoever added the product. If a rate changes, historical orders must keep the rate that applied when they were placed.",
        ],
      },
      {
        heading: "Invoice numbers must not skip",
        body: [
          "A tax invoice series has to be continuous through the financial year. That sounds trivial until you have two people checking out at the same second, an order that fails at payment after a number was issued, or a system that generates the number optimistically and rolls back.",
          "The correct behaviour is a number allocated once, atomically, and never reused or skipped. It is a small piece of engineering and it is the one most plugin stacks get wrong under concurrency, because it only fails when you are busy.",
        ],
      },
      {
        heading: "Returns produce credit notes, not adjustments",
        body: [
          "A refund is not an edit to the original invoice. It is a credit note that references the invoice it reverses, carries its own series, and reflects the same tax split the original did.",
          "If your current process is somebody adjusting a sheet after a refund, that is the gap. It is invisible for months and expensive at exactly the wrong moment.",
        ],
      },
      {
        heading: "What to ask whoever is building it",
        body: [
          "Four questions, and you do not need to be technical to ask them. How does the platform decide CGST and SGST versus IGST on an order? Where does the rate come from, and what happens to old orders when a rate changes? What guarantees invoice serials never skip when two orders are placed at the same moment? What does a return generate, and does it reference the original invoice?",
          "Vague answers to these are the most useful signal you will get in the whole conversation.",
        ],
      },
    ],
    faq: [
      {
        q: "Can we not just use a GST plugin?",
        a: "You can, and plenty of stores do. It works while your orders are simple and your volume is low. The failures show up at the edges: interstate returns, concurrent checkout, rate changes mid-year, and the financial-year boundary. Whether that risk is acceptable depends on your volume and how much a filing correction costs you.",
      },
      {
        q: "Does the platform file our returns?",
        a: "No, and be wary of anything that claims to. It produces correct, complete, exportable records; your accountant or your filing software does the filing. The platform's job is that the numbers it hands over are right and reconcilable.",
      },
      {
        q: "What about e-invoicing and e-way bills?",
        a: "Both are threshold-dependent obligations, so whether they apply depends on your turnover and what you ship. Where they apply they are integrations, and they are much easier to add to a platform that already models place of supply and HSN properly than to one that treats tax as a single configured percentage.",
      },
    ],
    related: [
      { label: "MnT Commerce India", href: "/in/products/commerce-india" },
      { label: "Ecommerce Platform Development", href: "/in/ecommerce/platform-development" },
    ],
  },

  {
    slug: "whatsapp-selling-without-losing-leads",
    cluster: "WhatsApp & CRM",
    title: "Selling on WhatsApp without losing half your leads",
    metaTitle: "WhatsApp Sales in India: Stop Losing Leads | MnT Future",
    metaDescription:
      "One phone, one person, no record. How Indian businesses lose WhatsApp leads, and what an official number, a shared inbox and a pipeline actually change.",
    summary:
      "The leads are not lost to competitors, they are lost to the fact that nobody can see them. One personal number, one person's phone, no history and no follow-up is the whole problem, and it is fixable without changing how you sell.",
    readingMins: 6,
    sections: [
      {
        heading: "What actually goes wrong",
        body: [
          "Almost every Indian business selling on WhatsApp has the same four failures, in the same order.",
          "The number belongs to a person, not the business, so when they are on leave or they leave, the conversations go with them. Nobody else can see what was promised. A quote sent on Tuesday has no follow-up on Friday because there is no list of things to follow up. And the moment you broadcast to a few hundred people from a personal number, the number gets restricted.",
          "None of these are sales problems. They are record-keeping problems that look like sales problems, and they cost you the leads you already paid to get.",
        ],
      },
      {
        heading: "An official number is the foundation",
        body: [
          "The WhatsApp Business Platform gives the business a number rather than a person, and lets a whole team answer from it. That single change fixes ownership, visibility and continuity at once.",
          "It comes with rules worth knowing before you start. Messages you initiate outside a 24-hour window have to use templates approved in advance, and templates are charged. Within 24 hours of a customer messaging you, the conversation is free-form. Designing around that window is most of what makes WhatsApp automation work rather than annoy.",
        ],
      },
      {
        heading: "A pipeline, not just an inbox",
        body: [
          "A shared inbox stops you losing messages. It does not stop you losing deals. For that, every conversation has to become a contact with a stage — new, quoted, negotiating, won, lost — and a next action with a date on it.",
          "The test is simple: can you answer 'what did we quote them, and when do we chase?' without scrolling a chat. If you cannot, you are running sales out of a messaging app rather than running sales.",
        ],
      },
      {
        heading: "Where automation genuinely helps, and where it does not",
        body: [
          "Helps: instant acknowledgement so nobody waits, routing to the right salesperson, follow-up reminders that fire on a schedule, and broadcasts on approved templates to a list that has opted in.",
          "Does not help: an AI that answers everything with confidence and no oversight. Start with drafted replies a person approves, and let it take more only where being wrong is cheap. The fastest way to lose trust in a WhatsApp channel is to have it confidently quote the wrong price.",
        ],
      },
    ],
    faq: [
      {
        q: "Will we lose our existing chat history if we move to an official number?",
        a: "History does not migrate from a personal WhatsApp account, and anyone claiming otherwise is guessing. Plan for it: run both for a short period, move active conversations deliberately, and treat the switch as a clean start for records rather than a lift-and-shift.",
      },
      {
        q: "Can we keep the same phone number?",
        a: "Often yes, if it is not currently registered on a personal or Business App account you intend to keep. It has to be migrated rather than duplicated, so decide before you start rather than halfway through.",
      },
      {
        q: "How do we broadcast without getting restricted?",
        a: "Approved templates, a list that has opted in, and sending rates that do not look like a blast. Restrictions come from recipients reporting or blocking you, so the real protection is that the people receiving it want it.",
      },
    ],
    related: [
      { label: "MnT AI CRM", href: "/in/products/ai-crm" },
      { label: "MnT AI Desk", href: "/in/products/ai-desk" },
    ],
  },

  {
    slug: "why-ai-projects-stop-halfway",
    cluster: "AI & automation",
    title: "Why AI projects stop halfway, and how to spot it early",
    metaTitle: "Why AI Projects Fail to Go Live in India | MnT Future",
    metaDescription:
      "The demo worked and the project stopped. What separates a demo from a system your team relies on, and the questions to ask before you commit to a build.",
    summary:
      "A demo has to answer well on chosen examples. A system has to be right on a Monday with real data, be watched, cost a predictable amount, and connect to software built long before anyone said AI. The second is most of the work and it is usually not in the quote.",
    readingMins: 7,
    sections: [
      {
        heading: "The gap is not the model",
        body: [
          "Everyone has access to the same models now. That is exactly why access is not the hard part any more, and why a demo is easy to produce.",
          "What separates the demo from the thing your team uses in March is unglamorous: testing that catches wrong answers before a customer sees them, monitoring so you find out from a dashboard rather than a complaint, control over who can use it and what it can touch, a handle on what it costs to run per month, and integration with systems that were built long before anyone said the word AI.",
          "None of that shows in a demo. All of it decides whether the project reaches anyone.",
        ],
      },
      {
        heading: "Agree what 'working' means before anybody writes code",
        body: [
          "This is the single highest-value thing you can insist on. Before the build, write down what a good answer looks like on twenty real examples from your business, including the awkward ones. That set becomes the test.",
          "Without it, 'done' is an opinion, and the argument at the end is unwinnable in both directions: you think it is wrong too often, the vendor thinks it is fine, and neither of you has anything to point at.",
        ],
      },
      {
        heading: "Data first, honestly",
        body: [
          "Most stalled projects were never a model problem. The data was scattered across a system nobody exports from, or it was inconsistent in ways nobody had needed to care about, or it simply was not there.",
          "The cheapest possible outcome is finding that out in week one. A short paid study that looks at your actual data and says 'this is not ready, here is what would make it ready' has saved you a six-month build. Treat a vendor willing to say that as a signal in their favour.",
        ],
      },
      {
        heading: "Give it less power than you think, at first",
        body: [
          "The safest shape for anything that acts on your systems is: it reads and suggests, a person approves, and it earns the right to act on its own by being right over time.",
          "Alongside that: limits on what it can touch, a threshold above which a human must approve, every action recorded, and every action reversible. This is not caution for its own sake — it is what makes it possible to switch the thing on at all.",
        ],
      },
      {
        heading: "Questions to ask before you commit",
        body: [
          "How will we agree what 'working' means, and who writes that list? What happens when it gives a wrong answer — how do we find out, and how fast? What does this cost to run per month at our volume, and what makes that number go up? Which of our existing systems does it have to talk to, and has that integration been done before? Who is responsible after it goes live, and for how long?",
          "You are not testing technical knowledge with these. You are testing whether the person has done this past the demo.",
        ],
      },
    ],
    faq: [
      {
        q: "How long should the first useful version take?",
        a: "A study of one to two weeks, then typically six to twelve weeks to a first version people actually use, depending on how much has to connect to your existing systems. Anyone promising a working system in two weeks is describing a demo.",
      },
      {
        q: "Can we run AI on our own servers?",
        a: "Yes, with smaller models, and it is the right answer where your data is not permitted to leave. It has to be designed for from day one rather than discovered at the end, because it changes which models are realistic and what the hardware costs.",
      },
      {
        q: "How do we keep the running cost predictable?",
        a: "Measure it per task rather than per month, cache what repeats, use the smallest model that passes your tests rather than the largest available, and set alerts on volume. Cost surprises almost always come from a loop nobody metered, not from the price per request.",
      },
    ],
    related: [
      { label: "AI Consultation", href: "/in/ai/consultation" },
      { label: "How we deliver", href: "/in/ai/forward-deployed-engineering" },
    ],
  },

  {
    slug: "what-to-automate-first",
    cluster: "AI & automation",
    title: "What to automate first in an Indian business",
    metaTitle: "What to Automate First: A Practical Order | MnT Future India",
    metaDescription:
      "Start where the work is boring, high volume and cheap to get wrong. A practical way to pick the first process to automate, and the ones to leave alone.",
    summary:
      "Rank candidates on four things: how often it happens, how long it takes, how bad a mistake is, and whether the information is already in a system. Start with high volume, low stakes and clean data — not with the most impressive idea.",
    readingMins: 5,
    sections: [
      {
        heading: "Score the candidates, do not argue about them",
        body: [
          "List the repetitive work your team does. For each one write down four numbers: how many times a week it happens, how many minutes it takes, what it costs when it is wrong, and whether the information needed is already in a system or lives in somebody's head.",
          "The first thing to automate is high on the first two, low on the third, and yes on the fourth. That is usually not the idea anyone was excited about, which is exactly why writing the numbers down beats discussing it.",
        ],
      },
      {
        heading: "The usual first wins",
        body: [
          "Reading a document and putting its contents into a system: invoices, purchase orders, delivery challans. High volume, tedious, and the source is already structured enough to check against.",
          "Classifying and routing what arrives: enquiries, complaints, applications. Getting it to the right desk in seconds instead of after somebody reads it.",
          "Assembling a report somebody currently builds by hand every week out of two systems that do not talk.",
          "Answering the question you get forty times a week, from your own documents, with a person taking over the moment it is not routine.",
        ],
      },
      {
        heading: "What to leave alone for now",
        body: [
          "Anything where being wrong is expensive and hard to reverse — payments going out, pricing commitments to a customer, anything with a legal or tax consequence. Those can be assisted, with a person approving, but they should not run unattended early.",
          "Anything where the knowledge is genuinely in one person's head and has never been written down. Automating that is a documentation project first, and it is worth doing, but it is not a quick win and should not be sold as one.",
        ],
      },
      {
        heading: "Keep a person in the loop where it matters",
        body: [
          "The pattern that works: the system does the work and proposes, a person approves, and the approvals become the record of what good looks like. Over time you widen what it is allowed to do alone, based on evidence rather than optimism.",
          "The measure of success is not how much got automated. It is how many hours came back and how few new errors appeared. Both are countable, and you should agree how you will count them before you start.",
        ],
      },
    ],
    faq: [
      {
        q: "Do we need AI for this, or will a normal integration do?",
        a: "Often a normal integration will do, and it will be cheaper and more reliable. If the task is moving structured data between two systems on a rule, that is plumbing. AI earns its place where the input is messy — free text, documents, images, or a judgement that used to need a person to read it.",
      },
      {
        q: "How do we know it is actually saving time?",
        a: "Measure the before. How many times a week, how many minutes each, how many errors. If nobody wrote that down first, every claim about savings afterwards is a story. It takes an afternoon and it is the difference between knowing and believing.",
      },
      {
        q: "What if our data is messy?",
        a: "Most is. That is a finding, not a blocker — but it does change the order. Sometimes the first project is cleaning up one source so that the next three become possible. A good study tells you that in week one rather than month four.",
      },
    ],
    related: [
      { label: "AI Automation", href: "/in/ai/automation" },
      { label: "AI Consultation", href: "/in/ai/consultation" },
    ],
  },
];

export const guideBySlug = (slug: string) => INDIA_GUIDES.find((g) => g.slug === slug);
