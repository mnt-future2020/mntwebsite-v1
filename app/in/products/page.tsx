import type { Metadata } from "next";
import Link from "next/link";
import { resolveMetadata } from "@/lib/seo";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import BlueprintFaq from "@/components/BlueprintFaq";
import { QA } from "@/components/FAQ";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, RuleLabel, BpButton, PAGE } from "@/components/blueprint";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/products", {
    title: "Products: AI Desk, AI CRM & Commerce India | MnT Future",
    description:
      "Three applications we host, brand and customise for you: a support desk with AI, a WhatsApp CRM with automation, and ecommerce with GST built in. You own them.",
  });
}

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

// The chooser comes before the products, deliberately. AI Desk and AI CRM both
// touch WhatsApp and both have AI in them, so a buyer landing here without a
// way to tell them apart will pick wrong or pick neither.
const chooser = [
  {
    problem:
      "Customer messages arrive on WhatsApp, Instagram, Facebook, email and our website chat. The team is drowning across five apps and nobody can see what is unanswered.",
    answer: "MnT AI Desk",
    href: "/in/products/ai-desk",
  },
  {
    problem:
      "We sell on WhatsApp. One phone, one person. No pipeline, follow-ups get missed, and broadcasts keep getting our number restricted.",
    answer: "MnT AI CRM",
    href: "/in/products/ai-crm",
  },
  {
    problem:
      "We want our own online store. We are tired of paying rent plus a percentage of every order, and our GST invoicing is held together with a plugin.",
    answer: "MnT Commerce India",
    href: "/in/products/commerce-india",
  },
  {
    problem:
      "Both: we sell over WhatsApp and we support customers on every other channel too.",
    answer: "AI CRM + AI Desk",
    href: "/in/strategy-session",
  },
];

const products = [
  {
    name: "MnT AI Desk",
    kicker: "Support desk application",
    href: "/in/products/ai-desk",
    icon: "chat" as const,
    line: "Every customer message in one inbox, with AI answering the repeats.",
    desc: "WhatsApp, Instagram, Facebook, email, SMS and website chat in a single screen your whole team works from. The AI answers the questions you get forty times a week, from your own documents, and hands to a person the moment it should.",
    points: ["One inbox, every channel", "AI trained on your documents", "Help centre included", "Unlimited agents, no per-seat licence"],
  },
  {
    name: "MnT AI CRM",
    kicker: "WhatsApp · Automation · AI agent · CRM",
    href: "/in/products/ai-crm",
    icon: "users" as const,
    line: "Your whole WhatsApp business on one screen.",
    desc: "One official number the entire team answers from, every lead a contact with history, a sales pipeline you can see, safe broadcasts on approved templates, and automations that follow up while you sleep.",
    points: ["One number, whole team", "Sales pipeline built in", "Automation without code", "AI assistant on your price list"],
  },
  {
    name: "MnT Commerce India",
    kicker: "Ecommerce platform",
    href: "/in/products/commerce-india",
    icon: "cart" as const,
    line: "Your own store, with GST done properly.",
    desc: "India tax in the platform core rather than bolted on: place of supply decides CGST and SGST or IGST, slabs follow the HSN code, and invoice serials never skip. No monthly rent, no cut of your orders.",
    points: ["GST in the core", "Gapless invoice numbering", "Gift cards, recovery, feeds", "No commission per order"],
  },
];

const compare = [
  { row: "What it is for", desk: "Answering customers", crm: "Selling and following up", commerce: "Taking orders" },
  { row: "Main channel", desk: "All of them", crm: "WhatsApp first", commerce: "Your website" },
  { row: "Main screen", desk: "Shared inbox", crm: "Inbox plus pipeline", commerce: "Admin and storefront" },
  { row: "Who uses it daily", desk: "Support team", crm: "Sales team", commerce: "Operations team" },
  { row: "Broadcasts", desk: "No", crm: "Yes, approved templates", commerce: "No" },
  { row: "AI included", desk: "Answers from your documents", crm: "Drafts replies, optional auto-reply", commerce: "Not by default" },
];

const faq: QA[] = [
  {
    q: "Are these products or projects?",
    a: "Products, customised. The software already exists and works, so you are not paying for it to be invented. You are paying for deployment, your branding, integration with the systems you already run, the AI layer tuned on your content, and a support contract. That is why these take weeks rather than the year a build from scratch would take.",
  },
  {
    q: "Are they open source?",
    a: "MnT AI Desk and MnT AI CRM start from mature open-source platforms, and we say so plainly on each product page. Our work is the AI layer, the integrations, the deployment and the support. MnT Commerce India is our own closed-source product, built on the Medusa commerce core with an India GST layer we wrote ourselves.",
  },
  {
    q: "Do they run on our own servers?",
    a: "Yes, all three. On your server or your cloud account, and they can stay entirely within India. We can host and manage them for you, or deploy into your infrastructure and hand over. Your data never has to sit with a vendor.",
  },
  {
    q: "Can they talk to each other?",
    a: "Yes. The common combination is AI CRM for selling on WhatsApp and AI Desk for support everywhere else, with a shared view of the customer. If you also run Commerce India, order and customer data flows into both so an agent can see the order without leaving the conversation.",
  },
  {
    q: "What if none of these fit?",
    a: "Then you want a custom AI application rather than a product, and we build those too. Products start from something that already works, which makes them fast and cheap. Custom starts from nothing, which makes it slower and more expensive but exactly right. We will tell you honestly which one your problem is.",
  },
];

export default function ProductsHub() {
  return (
    <>
      <BlueprintMotion />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-14 pt-10 lg:pb-20 lg:pt-14`}>
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: "Products" }]} tone="light" />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              Products
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              3 applications
            </span>
          </div>
          <h1 className="mt-8 max-w-[17ch] animate-rise-in font-display text-[40px] font-bold leading-[0.98] tracking-[-0.05em] text-bp-ink sm:text-[58px] lg:text-[78px]">
            Software that already works, made yours.
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            Three applications we deploy on your infrastructure, brand as yours, connect to the
            systems you already run, and support. You get in weeks what building from scratch takes
            a year, and you own what you get.
          </p>
        </div>
      </section>

      {/* 01 WHICH ONE */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="01"
            total="04"
            eyebrow="Start here"
            title="Which one do you need?"
            sub="Find the sentence that sounds like your business. Two of these overlap enough to confuse people, so this is the fastest way through."
          />
          <div className="mt-11 border-t border-bp-edge lg:mt-16">
            {chooser.map((c, i) => (
              <Link
                key={c.answer}
                href={c.href}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="group grid items-center gap-4 border-b border-bp-edge py-6 transition-colors lg:grid-cols-[1.35fr_0.65fr] lg:gap-12 lg:py-7"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 font-mono text-[11px] tracking-[0.14em] text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="m-0 text-[16.5px] leading-[1.65] text-bp-body">
                    &ldquo;{c.problem}&rdquo;
                  </p>
                </div>
                <div className="flex items-center justify-between gap-3 border-l-2 border-brand-500 pl-5">
                  <span className="font-display text-[19px] font-bold tracking-[-0.024em] text-bp-ink transition-colors group-hover:text-brand-700">
                    {c.answer}
                  </span>
                  <Icon
                    name="arrow"
                    className="h-4 w-4 shrink-0 text-bp-faint transition-all group-hover:translate-x-1 group-hover:text-brand-700"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 02 THE PRODUCTS */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="02" total="04" eyebrow="The products" title="What each one actually is." />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 lg:grid-cols-3">
            {products.map((p) => (
              <div
                key={p.name}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="relative flex flex-col overflow-hidden border-b border-r border-bp-line bg-white transition-shadow duration-250 hover:shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)]"
              >
                <div
                  className="relative overflow-hidden border-b border-bp-line p-7 lg:p-8"
                  style={{ background: "linear-gradient(135deg,rgba(32,149,241,0.07),rgba(62,81,182,0.045))" }}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right,rgba(11,21,36,0.035) 1px,transparent 1px),linear-gradient(to bottom,rgba(11,21,36,0.035) 1px,transparent 1px)",
                      backgroundSize: "34px 34px",
                    }}
                    aria-hidden="true"
                  />
                  <div className="pointer-events-none absolute -bottom-12 -right-9 text-brand-500/10" aria-hidden="true">
                    <Icon name={p.icon} className="h-[200px] w-[200px]" />
                  </div>
                  <span className="relative flex h-12 w-12 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                    <Icon name={p.icon} className="h-6 w-6" />
                  </span>
                  <div className="relative mt-[26px] font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
                    {p.kicker}
                  </div>
                  <h3 className="relative mt-3 font-display text-[24px] font-bold leading-[1.14] tracking-[-0.03em] text-bp-ink">
                    {p.name}
                  </h3>
                  <p className="relative mt-2.5 text-[14.5px] leading-[1.6] text-bp-mute">{p.line}</p>
                </div>
                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <p className="m-0 text-[15px] leading-[1.72] text-bp-mute">{p.desc}</p>
                  <div className="mt-6 border-t border-bp-hair">
                    {p.points.map((pt) => (
                      <div key={pt} className="flex items-start gap-3 border-b border-bp-hair py-2.5">
                        <span className="mt-1 flex h-[16px] w-[16px] shrink-0 items-center justify-center bg-brand-500/[0.09] text-brand-700">
                          <Icon name="check" className="h-[10px] w-[10px]" />
                        </span>
                        <span className="text-[14px] leading-[1.5] text-bp-body">{pt}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-7">
                    <BpButton href={p.href} variant="outline">
                      About {p.name}
                    </BpButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 COMPARE */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="03" total="04" eyebrow="Side by side" title="The differences that matter." />
          <div className="mt-11 overflow-x-auto lg:mt-16">
            <table className="w-full min-w-[720px] border-collapse border-l border-t border-bp-edge bg-white text-left">
              <thead>
                <tr>
                  {/* The corner cell of a comparison table reads as blank to
                      the eye but is still a header a screen reader announces,
                      so it gets a name rather than nothing (axe
                      `empty-table-header`). Visually hidden, not aria-hidden:
                      the row header column needs to be labelled. */}
                  <th
                    scope="col"
                    className="border-b border-r border-bp-edge px-5 py-4 font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.16em] text-bp-faint"
                  >
                    <span className="sr-only">What you are comparing</span>
                  </th>
                  {["MnT AI Desk", "MnT AI CRM", "MnT Commerce India"].map((h) => (
                    <th
                      key={h}
                      className="border-b border-r border-bp-edge bg-bp-tint px-5 py-4 font-display text-[15px] font-bold tracking-[-0.02em] text-bp-ink"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((r) => (
                  <tr key={r.row}>
                    <td className="border-b border-r border-bp-edge bg-bp-tint px-5 py-4 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-700">
                      {r.row}
                    </td>
                    {[r.desk, r.crm, r.commerce].map((cell, i) => (
                      <td
                        key={i}
                        className="border-b border-r border-bp-edge px-5 py-4 text-[14.5px] leading-[1.55] text-bp-body"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 max-w-[62ch] text-[14.5px] leading-[1.7] text-bp-faint">
            If none of these is the right shape for your business, what you want is a custom AI
            application rather than a product. Those we build from nothing, to fit exactly.
          </p>
          <div className="mt-6">
            <BpButton href="/in/ai/custom-applications" variant="outline">
              Customised AI applications
            </BpButton>
          </div>
        </div>
      </section>

      {/* 04 FAQ */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead no="04" total="04" eyebrow="Questions" title="Before you ask us." />
          <div className="mx-auto mt-11 max-w-[1080px] lg:mt-16">
            <BlueprintFaq items={faq} />
          </div>
          <div className="mt-12 border-t border-bp-edge pt-8">
            <RuleLabel>Related</RuleLabel>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {[
                { label: "AI services", href: "/in/ai" },
                { label: "How we deliver", href: "/in/ai/forward-deployed-engineering" },
                { label: "Ecommerce platforms", href: "/in/ecommerce" },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="border border-[#D8E1EC] bg-white px-4 py-2.5 font-mono text-[12px] tracking-[0.06em] text-bp-mute transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Not sure which one? That is a ten minute conversation."
        body="Describe how messages and orders actually reach your business today. A senior consultant will tell you which of these fits, whether you need two of them, or whether you need none of them and something custom instead."
        primary={{ label: "Book a strategy session", href: "/in/strategy-session" }}
        secondary={{ label: "See our work", href: "/in/work" }}
      />
    </>
  );
}
