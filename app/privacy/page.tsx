import type { Metadata } from "next";
import Link from "next/link";
import BlueprintMotion from "@/components/BlueprintMotion";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import { Breadcrumbs } from "@/components/blocks";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PAGE } from "@/components/blueprint";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/privacy", {
    title: "Privacy Policy | MnT Future",
    description:
      "How MnT Future (Magizh NexGen Technologies) collects, uses, shares and protects personal data on mntfuture.com, and the rights you have over it under India's DPDP Act, CCPA/CPRA and the GDPR.",
  });
}

/**
 * The date the current text took effect. Deliberately a constant and not
 * `new Date()`: a policy that claims to have been updated today, every day,
 * tells a reader nothing and is the kind of thing a regulator notices. Change
 * it by hand when the text below actually changes.
 */
const EFFECTIVE = "19 August 2026";

type Block =
  | { kind: "p"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "table"; head: string[]; rows: string[][] };

type Section = { id: string; title: string; blocks: Block[] };

const sections: Section[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    blocks: [
      {
        kind: "p",
        text: `${site.name} is the brand of ${site.legalName}, a company based in ${site.city}, ${site.state}, ${site.country}. We build commerce platforms and AI systems for clients in the United States and India.`,
      },
      {
        kind: "p",
        text: `For the personal data described in this policy, ${site.legalName} is the data fiduciary under India's Digital Personal Data Protection Act, 2023, and the data controller under the GDPR where that regulation applies. You can reach us at ${site.email}.`,
      },
    ],
  },
  {
    id: "scope",
    title: "2. What this policy covers",
    blocks: [
      {
        kind: "p",
        text: `This policy covers ${site.domain} and every page on it, including the India section at ${site.domain}/in, our blog, our open-source pages, the agent-readiness scanner, and the forms and newsletter signup on those pages.`,
      },
      {
        kind: "p",
        text: "It does not cover the platforms we build and operate for our clients. When we run a store or an application on a client's behalf, that client decides what data is collected and why: they are the controller, we act on their instructions under a written agreement, and their own privacy notice governs. If you are a customer of one of our clients, ask them.",
      },
      {
        kind: "p",
        text: "It also does not cover third-party sites we link to. Their policies are their own.",
      },
    ],
  },
  {
    id: "what-we-collect",
    title: "3. What we collect",
    blocks: [
      { kind: "p", text: "Information you give us:" },
      {
        kind: "list",
        items: [
          "Contact and strategy-session forms: your name, email address, and — where you choose to fill them in — your company, the kind of business you run, and an indicative budget range, along with the message you write.",
          "Newsletter signup: your email address, optionally your name, and which page you signed up from.",
          "Agent-readiness scanner: the website address you submit for analysis, plus your contact details if you ask us to send the results.",
          "Email, phone and WhatsApp: whatever you choose to tell us when you get in touch directly.",
          "Client and staff accounts: for the small number of people with a login to our client portal or internal admin, the account details and work records that the portal exists to hold. Those are described in the agreement or employment terms that created the account, not here.",
        ],
      },
      { kind: "p", text: "Information collected automatically:" },
      {
        kind: "list",
        items: [
          "Standard server request data — IP address, browser user-agent, the page requested and the time — logged by our hosting provider in the ordinary course of serving the site.",
          "Your IP address is used in memory, for minutes, to rate-limit form submissions and block automated spam. We do not write it to our database alongside your enquiry.",
          "Analytics data, if analytics is switched on for the site — see section 6.",
        ],
      },
      { kind: "p", text: "What we do not collect:" },
      {
        kind: "list",
        items: [
          "We take no payment on this website, so we hold no card numbers or bank details from it.",
          "We do not ask for, and do not want, sensitive personal data — health, biometric, financial account or government-ID information — through the forms on this site. Please do not send it to us in a message field.",
          "We do not buy personal data from brokers, and we do not sell yours. See section 8.",
        ],
      },
    ],
  },
  {
    id: "why-we-use-it",
    title: "4. Why we use it, and on what basis",
    blocks: [
      {
        kind: "table",
        head: ["What we do", "Data used", "Basis"],
        rows: [
          [
            "Reply to your enquiry and run the sales conversation that follows",
            "Name, email, company, message, enquiry details",
            "Steps taken at your request before entering a contract; consent under the DPDP Act",
          ],
          [
            "Send you the newsletter you asked for",
            "Email, name, signup source",
            "Your consent, confirmed by double opt-in and withdrawable at any time",
          ],
          [
            "Deliver the agent-readiness report you requested",
            "Submitted URL, contact details",
            "Steps taken at your request; consent",
          ],
          [
            "Keep the site up, fast and free of spam and abuse",
            "IP address, user-agent, request logs",
            "Our legitimate interest in a working, secure website",
          ],
          [
            "Understand which pages are useful, in aggregate",
            "Analytics events, where enabled",
            "Your consent where the law requires it; otherwise legitimate interest",
          ],
          [
            "Meet our tax, accounting and legal obligations",
            "Contract and billing records",
            "Legal obligation",
          ],
        ],
      },
      {
        kind: "p",
        text: "We do not use your data to make decisions about you by automated means alone, and we do not profile you for advertising.",
      },
    ],
  },
  {
    id: "email",
    title: "5. Email and marketing",
    blocks: [
      {
        kind: "p",
        text: "Our newsletter is double opt-in: signing up sends you a confirmation email, and nothing else is sent until you click the link in it. Every newsletter carries a one-click unsubscribe link, and unsubscribing takes effect immediately.",
      },
      {
        kind: "p",
        text: "If you send us an enquiry, we will reply to it and may follow up about that enquiry. That is not the newsletter, and it stops when you tell us to stop or when the conversation ends.",
      },
      {
        kind: "p",
        text: "We do not sell, rent or share our mailing list, and we do not add people to it because they filled in a different form.",
      },
    ],
  },
  {
    id: "cookies",
    title: "6. Cookies and analytics",
    blocks: [
      {
        kind: "p",
        text: "This site is built to need very little of you. Our fonts are self-hosted rather than fetched from Google, our forms use a signed token rather than a tracking cookie, and there are no advertising pixels, no retargeting tags and no social-media trackers on it.",
      },
      { kind: "p", text: "The cookies that can be set are:" },
      {
        kind: "list",
        items: [
          "A strictly necessary session cookie, set only when someone signs in to the client portal or the admin area. It is HTTP-only, it holds a signed session token and nothing else, and it is cleared when you sign out. Ordinary visitors never receive it.",
          "Google Analytics cookies, but only while a Google Analytics measurement ID is configured for the site. Analytics is a setting we can turn on and off; when it is off, no analytics script loads and no analytics cookie is set. Where it is on, Google Analytics collects usage data such as pages viewed, approximate location derived from a truncated IP, device and referrer, and processes it as an independent controller under its own terms.",
        ],
      },
      {
        kind: "p",
        text: "You can block or delete cookies in your browser settings, and browser-level Do Not Track or Global Privacy Control signals are respected where the law gives them effect. Blocking cookies does not stop you reading anything on this site.",
      },
    ],
  },
  {
    id: "sharing",
    title: "7. Who else handles your data",
    blocks: [
      {
        kind: "p",
        text: "We keep the list of companies that touch your data deliberately short. Each of the processors below handles it only to provide the service named, under a contract that forbids them using it for their own purposes.",
      },
      {
        kind: "table",
        head: ["Provider", "What it does", "Where"],
        rows: [
          ["DigitalOcean", "Hosting for this website, and object storage for files uploaded to it", "United States"],
          ["Neon", "The managed PostgreSQL database that stores enquiries and subscriber records", "United States"],
          ["Resend", "Sends our transactional email and newsletters", "United States"],
          ["Google Analytics", "Aggregate site usage measurement, when enabled", "United States"],
        ],
      },
      {
        kind: "p",
        text: "Beyond these, we disclose personal data only where we are legally required to — a valid order from a court or authority with jurisdiction over us — or where it is necessary to establish or defend a legal claim. If our business is ever restructured or acquired, data may transfer as part of it, and this policy travels with it.",
      },
    ],
  },
  {
    id: "no-sale",
    title: "8. We do not sell or share your personal information",
    blocks: [
      {
        kind: "p",
        text: "For the purposes of the California Consumer Privacy Act as amended by the CPRA, and the comparable laws of other US states, we do not sell personal information and we do not share it for cross-context behavioural advertising. We have not done so in the preceding twelve months, and that includes the personal information of anyone we know to be under sixteen.",
      },
    ],
  },
  {
    id: "transfers",
    title: "9. International transfers",
    blocks: [
      {
        kind: "p",
        text: "We operate from India and our infrastructure runs in the United States, so data you give us crosses borders. Where personal data protected by the GDPR or UK GDPR leaves the EEA or the UK, the transfer is made under the European Commission's Standard Contractual Clauses or the UK Addendum, together with the technical measures described in section 11. Transfers out of India are made in accordance with the DPDP Act and any restrictions notified under it.",
      },
    ],
  },
  {
    id: "retention",
    title: "10. How long we keep it",
    blocks: [
      {
        kind: "table",
        head: ["Record", "Kept for"],
        rows: [
          ["Enquiries and strategy-session requests", "Up to 24 months after our last contact with you, then deleted"],
          ["Newsletter subscribers", "Until you unsubscribe, plus a suppression record so we do not email you again by mistake"],
          ["Unconfirmed newsletter signups", "Deleted if the confirmation link is not clicked"],
          ["Agent-readiness scan requests", "Up to 12 months"],
          ["Server request logs", "Retained by our host on a short rolling window, in the order of 30 days"],
          ["Anti-spam IP records", "Held in memory only, for minutes; never written to the database"],
          ["Client contracts and billing records", "As long as tax and company law requires us to keep them"],
        ],
      },
      {
        kind: "p",
        text: "You can ask us to delete your data sooner, and we will unless we are legally required to keep it.",
      },
    ],
  },
  {
    id: "security",
    title: "11. How we protect it",
    blocks: [
      {
        kind: "p",
        text: "Security on this site is the same discipline we sell: designed in rather than added afterwards.",
      },
      {
        kind: "list",
        items: [
          "Everything is served over HTTPS, and data is encrypted in transit and at rest.",
          "Access to the database and admin area is limited to the people who need it, with individual accounts, hashed passwords and role-based permissions.",
          "Public forms are protected by signed, single-use tokens, timing checks and rate limiting rather than by handing your session to a third-party captcha service.",
          "Secrets and credentials live in the deployment environment, never in the codebase.",
        ],
      },
      {
        kind: "p",
        text: "No system is perfect, and we will not claim otherwise. If a breach affects your personal data, we will notify you and the relevant authority within the timeframes the applicable law sets — including the Data Protection Board of India under the DPDP Act, and 72 hours under the GDPR.",
      },
    ],
  },
  {
    id: "your-rights",
    title: "12. Your rights",
    blocks: [
      {
        kind: "p",
        text: "Wherever you are, you can ask us to show you the personal data we hold about you, correct it if it is wrong, delete it, or stop using it. Specifically:",
      },
      {
        kind: "list",
        items: [
          "In India, the DPDP Act gives you the right to access a summary of your data and how it is processed, to have it corrected, completed, updated or erased, to nominate someone to exercise your rights if you cannot, to withdraw consent as easily as you gave it, and to a grievance-redressal process — section 14.",
          "In California, the CCPA/CPRA gives you the right to know, delete, correct and limit, and the right not to be discriminated against for exercising any of them. You may use an authorised agent.",
          "In the EEA or the UK, the GDPR gives you rights of access, rectification, erasure, restriction, portability, objection to processing based on legitimate interests, and the right to complain to your supervisory authority.",
          "Everywhere: you can unsubscribe from our newsletter at any time, from the link in any email.",
        ],
      },
      {
        kind: "p",
        text: `To exercise any of these, email ${site.email} from the address you contacted us with, or tell us enough to find your record. We do not charge for this. We will verify who you are before acting — that check protects you — and respond within 30 days, or sooner where the law requires it. If we cannot do what you ask, we will tell you why.`,
      },
    ],
  },
  {
    id: "children",
    title: "13. Children",
    blocks: [
      {
        kind: "p",
        text: "This is a business-to-business website and it is not directed at children. We do not knowingly collect personal data from anyone under 18. If you believe a child has sent us personal data, tell us and we will delete it.",
      },
    ],
  },
  {
    id: "changes",
    title: "14. Changes, and how to reach us",
    blocks: [
      {
        kind: "p",
        text: "When this policy changes, we update the effective date at the top of this page. If a change materially affects how we use data you have already given us, we will tell you directly rather than rely on you re-reading this page.",
      },
      {
        kind: "p",
        text: `For any privacy question, request or complaint — including as our Grievance Officer under the DPDP Act, and as our point of contact for GDPR matters — write to the Grievance Officer, ${site.legalName}, ${site.street}, ${site.city}, ${site.state}, ${site.country}, or email ${site.email}. We answer privacy mail ourselves; it does not go into a ticket queue.`,
      },
      {
        kind: "p",
        text: "If you are not satisfied with our response, you may complain to the Data Protection Board of India, to your EU or UK supervisory authority, or to the California Privacy Protection Agency, depending on where you are.",
      },
    ],
  },
];

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.kind === "p") {
          return (
            <p key={i} className="mt-4 text-[15.5px] leading-[1.75] text-bp-mute">
              {b.text}
            </p>
          );
        }
        if (b.kind === "list") {
          return (
            <ul key={i} className="mt-4 space-y-3">
              {b.items.map((item) => (
                <li key={item} className="flex gap-3 text-[15.5px] leading-[1.75] text-bp-mute">
                  <span className="mt-[10px] h-[5px] w-[5px] shrink-0 bg-brand-500" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <div key={i} className="mt-6 -mx-[18px] overflow-x-auto px-[18px] sm:mx-0 sm:px-0">
            <table className="w-full min-w-[520px] border-collapse border border-bp-edge text-left">
              <thead>
                <tr className="bg-bp-wash">
                  {b.head.map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="border border-bp-edge px-4 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-bp-ink"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.rows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`border border-bp-edge px-4 py-3 align-top text-[14.5px] leading-[1.6] ${
                          ci === 0 ? "font-semibold text-bp-ink" : "text-bp-mute"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </>
  );
}

export default function Privacy() {
  return (
    <>
      <BlueprintMotion />

      {/* HERO */}
      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className={`${PAGE} relative pb-[64px] pt-10 sm:pt-12`}>
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} tone="light" />
          <div className="mt-9 max-w-3xl animate-fade-up">
            <div className="flex items-center gap-4">
              <span className="h-px w-[38px] shrink-0 bg-brand-500" />
              <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">Legal</span>
            </div>
            <h1 className="mt-[18px] font-display text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-bp-ink sm:text-[3.2rem]">
              Privacy Policy
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bp-mute">
              What we collect when you use {site.domain}, why we collect it, who else ever sees it, and
              how to make us delete it. Written to be read, not to be scrolled past.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11.5px] uppercase tracking-[0.12em] text-bp-mute">
              <span>Effective {EFFECTIVE}</span>
              <span className="hidden h-3 w-px bg-bp-edge sm:block" />
              <span>{site.legalName}</span>
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className={`${PAGE} py-16 lg:py-[92px]`}>
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          {/* Contents */}
          <nav aria-label="On this page" className="min-w-0 lg:sticky lg:top-28 lg:self-start">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">On this page</div>
            <ul className="mt-4 space-y-[3px] border-l border-bp-edge">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[13.5px] leading-snug text-bp-mute transition-colors hover:border-brand-500 hover:text-bp-ink"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Policy */}
          <div className="min-w-0 max-w-3xl">
            <p className="border-l-2 border-brand-500 bg-bp-wash px-5 py-4 text-[15px] leading-[1.7] text-bp-mute">
              The short version: we collect what you type into a form so we can reply to you, we send the
              newsletter only to people who confirmed they want it, we do not sell your data to anyone,
              and you can have all of it deleted by emailing{" "}
              <a href={`mailto:${site.email}`} className="font-semibold text-brand-700 underline underline-offset-2">
                {site.email}
              </a>
              . The rest of this page is the detail behind those four sentences.
            </p>

            {sections.map((s) => (
              <section key={s.id} id={s.id} className="mt-12 scroll-mt-28 first:mt-10">
                <h2 className="font-display text-[1.45rem] font-extrabold leading-tight tracking-[-0.01em] text-bp-ink sm:text-[1.65rem]">
                  {s.title}
                </h2>
                <div className="mt-1 h-px w-[38px] bg-brand-500" />
                <Blocks blocks={s.blocks} />
              </section>
            ))}

            <div className="mt-14 border-t border-bp-hair pt-8">
              <p className="text-[15px] leading-[1.7] text-bp-mute">
                Related: our{" "}
                <Link href="/security-compliance" className="font-semibold text-brand-700 underline underline-offset-2">
                  security &amp; compliance
                </Link>{" "}
                page covers how we engineer ADA, PCI DSS and US data-privacy requirements into the
                platforms we build for clients.
              </p>
              <Link href="/contact" className="link-arrow mt-5 inline-flex items-center gap-2">
                Ask us a privacy question <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
