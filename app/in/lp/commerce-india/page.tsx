import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import LandingLeadForm from "@/components/LandingLeadForm";
import { ratings, site } from "@/lib/site";
import { INDIA_CLIENTS } from "@/lib/indiaClients";
import CommissionCalculator from "@/components/CommissionCalculator";

/**
 * Ad landing page for MnT Commerce India.
 *
 * noindex on purpose. It says much the same thing as /in/products/commerce-india
 * and letting the two compete in organic search would cost the product page its
 * ranking to win nothing: this page exists to convert paid clicks, and it is
 * reached from an ad, never from a search result.
 */
export const metadata: Metadata = {
  title: { absolute: "Your own ecommerce platform, with GST built in | MnT Future" },
  description:
    "Stop paying rent and commission on every order. A self-hosted ecommerce platform with India GST, Razorpay and UPI handled in the core. Get a callback from a senior engineer.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/in/products/commerce-india" },
};

// Verified against the repository, not written from imagination: every one of
// these is a module or admin section that exists in the codebase today.
const BUILT = [
  { icon: "shield" as const, t: "GST decided per order", d: "Place of supply picks CGST and SGST or IGST automatically, and slabs follow the HSN code on the product. In the platform core, so it cannot be forgotten on one checkout path." },
  { icon: "records" as const, t: "Invoice numbers that never skip", d: "A gapless serial per financial year, generated the moment the order is placed. It is a legal requirement, and it is the first thing an auditor checks." },
  { icon: "wallet" as const, t: "Credit notes without anyone remembering", d: "A refund produces a credit note automatically on its own gapless serial. No month-end spreadsheet reconciling what got refunded but never documented." },
  { icon: "cart" as const, t: "Razorpay and UPI in the core", d: "Payment methods, checkout and order statuses are modules of the platform, not plugins hoping to agree with each other." },
  { icon: "lock" as const, t: "OTP login", d: "Customers sign in the way Indians expect, with throttling on the attempt so the endpoint cannot be brute forced." },
  { icon: "bell" as const, t: "Abandoned carts, recovered", d: "Detect, remind, and report what actually came back as revenue rather than how many emails went out. The cheapest revenue in any store." },
  { icon: "tag" as const, t: "Gift cards with a real ledger", d: "Issue, check a balance, redeem across several orders, and see every movement in a ledger that balances." },
  { icon: "clock" as const, t: "Subscriptions", d: "Recurring orders as a first-class module, for anyone selling something people buy again on a schedule." },
  { icon: "download" as const, t: "Digital products", d: "Sell files as well as things, with delivery and entitlement handled by the platform." },
  { icon: "chat" as const, t: "Reviews", d: "Collected and moderated in your own admin, so your social proof is yours rather than a third party's widget." },
  { icon: "network" as const, t: "Google Merchant feeds", d: "XML and CSV generated from your live catalogue behind a token, so Shopping listings match your real stock and prices." },
  { icon: "ai" as const, t: "An Ops Copilot in the admin", d: "AI built into the back office rather than bolted to the storefront as a chatbot, because the person who needs help is the one running the shop." },
];

const RENTED_VS_OWNED = [
  { q: "Monthly fee", rented: "Every month, forever", owned: "Your server. Same cost in a record month as a quiet one" },
  { q: "Commission per order", rented: "A percentage of every sale", owned: "None" },
  { q: "GST", rented: "A plugin somebody configured once", owned: "Place of supply and HSN slabs in the platform core" },
  { q: "Invoice numbering", rented: "Skips when an order fails", owned: "Gapless per financial year" },
  { q: "Your customer list", rented: "On their platform, under their terms", owned: "In your database, in India" },
  { q: "The thing your business does differently", rented: "A feature request nobody actions", owned: "A module we write, and you keep changing" },
];

const FAQ = [
  { q: "How is this different from Shopify?", a: "Two things. There is no monthly fee plus a percentage of every order, and GST is handled in the platform core rather than by an app you hope is configured right. The trade is that you run it. At small volume Shopify is often the right answer, and we will tell you so." },
  { q: "What does gapless invoice numbering mean?", a: "Indian tax rules require invoice serials to run unbroken within a financial year. If your platform skips a number when an order fails, you have gaps, and gaps are what an auditor asks about. This generates the serial at the point of order and never leaves holes." },
  { q: "Can you migrate our existing store?", a: "Usually. Products, variants, customers and order history migrate from most platforms. We assess what will and will not survive the move before you commit, and we are straight about the parts that will not." },
  { q: "How long does it take?", a: "A focused build is typically eight to sixteen weeks depending on how much integration is involved. We scope before quoting rather than giving you an optimistic number you cannot plan around." },
  { q: "Who runs it after launch?", a: "Either we do, under a managed support agreement, or we hand it over with documentation and train your team. Both are supported. A platform you cannot maintain without us is one we built badly." },
];

const PROOF = INDIA_CLIENTS.filter((c) =>
  ["print-emporium", "blufacade", "solar-power-house", "rg-golden-palace"].includes(c.slug)
);

function Cta({ label = "Get a callback" }: { label?: string }) {
  return (
    <a
      href="#lead-form"
      className="inline-flex h-14 items-center bg-bp-ink pl-7 font-mono text-[13px] font-semibold tracking-[0.06em] text-white transition-colors hover:bg-brand-700"
    >
      {label}
      <span className="ml-4 flex h-14 w-14 items-center justify-center border-l border-white/20">
        <Icon name="arrow" className="h-4 w-4" />
      </span>
    </a>
  );
}

const PAGE = "mx-auto w-full max-w-[1200px] px-[18px] sm:px-8";

export default function CommerceIndiaLanding() {
  return (
    <>
      {/* Minimal chrome: brand and one action, nothing to click away with. */}
      <header className="sticky top-0 z-40 border-b border-bp-line bg-white/95 backdrop-blur">
        <div className={`${PAGE} flex h-[68px] items-center justify-between gap-4`}>
          <Image src="/mnt-logo.png" alt="MnT Future" width={2828} height={546} priority className="h-8 w-auto" />
          <a
            href="#lead-form"
            className="bg-bp-ink px-5 py-3 font-mono text-[12px] font-semibold tracking-[0.06em] text-white transition-colors hover:bg-brand-700"
          >
            Book a demo
          </a>
        </div>
      </header>

      {/* HERO + FORM */}
      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className={`${PAGE} grid items-start gap-12 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20`}>
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-[34px] shrink-0 bg-brand-500" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                MnT Commerce India · AI-native
              </span>
            </div>
            <h1 className="mt-6 max-w-[16ch] font-display text-[38px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[50px] lg:text-[60px]">
              A store that helps you <span className="text-brand-700">run it</span>.
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.65] text-bp-mute">
              Your own ecommerce platform with an AI Ops Copilot inside the admin. It watches the
              shop, drafts the work, and does the safe parts on its own so your team stops doing
              them. Built for India: GST, Razorpay and UPI handled in the core.
            </p>

            <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {[
                "An AI Copilot that runs jobs, not a chatbot",
                "Recovers carts, chases reviews, keeps feeds live",
                "GST, Razorpay and UPI in the core",
                "No commission on your orders",
              ].map((p) => (
                <div key={p} className="flex items-start gap-2.5">
                  <span className="mt-1 flex h-[17px] w-[17px] shrink-0 items-center justify-center bg-brand-500/[0.1] text-brand-700">
                    <Icon name="check" className="h-[11px] w-[11px]" />
                  </span>
                  <span className="text-[15px] leading-[1.5] text-bp-body">{p}</span>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-bp-hair pt-6">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-bp-faint">
                Client rated
              </span>
              {ratings.map((r) => (
                <span key={r.source} className="flex items-center gap-2 whitespace-nowrap">
                  <span className="font-display text-[13px] font-bold text-bp-ink">{r.source}</span>
                  <span className="font-mono text-[12px] text-bp-faint">{r.score.toFixed(1)}★</span>
                </span>
              ))}
            </div>
          </div>

          <div
            id="lead-form"
            className="scroll-mt-24 border border-bp-edge bg-white p-6 shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)] lg:p-8"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
              Book a demo
            </div>
            <p className="mt-2.5 text-[14.5px] leading-[1.6] text-bp-mute">
              Thirty minutes on a screen share. We walk you through the admin, run a real GST
              invoice, and answer what it would take to move your store across.
            </p>
            <div className="mt-6">
              <LandingLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* OPS COPILOT */}
      <section className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <div className="grid gap-11 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                Ops Copilot
              </div>
              <h2 className="mt-5 max-w-[17ch] font-display text-[30px] font-bold leading-[1.06] tracking-[-0.036em] text-bp-ink lg:text-[42px]">
                The AI is in the back office, where the work is.
              </h2>
              <p className="mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-bp-mute">
                Most stores bolt a chatbot onto the storefront. The person actually drowning is the
                one running the shop: pricing, stock, listings, refunds, follow-ups. So the Copilot
                lives in your admin. You ask it something, it writes a plan, and it works through
                the steps.
              </p>
              <p className="mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-bp-mute">
                What it may do on its own is a policy you set. Safe work runs unattended. Anything
                beyond that waits for you, and every action it takes is written to a log you can
                read afterwards.
              </p>
              <div className="mt-8">
                <Cta label="See the Copilot in a demo" />
              </div>
            </div>

            <div className="border border-[#D3DDE9] bg-white shadow-[0_34px_70px_-40px_rgba(11,21,36,0.35)]">
              <div className="flex items-center justify-between gap-3 border-b border-bp-line bg-bp-tint px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                  How a job runs
                </span>
                <span className="font-mono text-[11px] tracking-[0.1em] text-bp-faint">
                  Under your policy
                </span>
              </div>
              <div className="divide-y divide-bp-hair">
                {[
                  { n: "01", t: "You ask", d: "\u201cWhich products lost stock this week and what should I reorder?\u201d" },
                  { n: "02", t: "It plans", d: "The job is broken into steps you can read before anything happens." },
                  { n: "03", t: "Policy decides", d: "Safe steps run on their own. The rest stop and wait for your approval." },
                  { n: "04", t: "It escalates", d: "When it is not confident, it hands the step to a person instead of guessing." },
                  { n: "05", t: "Everything is logged", d: "Each action recorded with what it saw and what it changed." },
                ].map((x) => (
                  <div key={x.n} className="flex gap-4 px-5 py-4">
                    <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">{x.n}</span>
                    <div>
                      <div className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-bp-ink">
                        {x.t}
                      </div>
                      <p className="mt-1 text-[13.5px] leading-[1.6] text-bp-mute">{x.d}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-bp-line bg-bp-tint px-5 py-3.5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-bp-ink">
                  Monthly spend cap
                </span>
                <span className="h-px min-w-4 flex-1 bg-bp-edge" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-bp-faint">
                  It cannot run up a bill
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GROW / EASIER */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <div className="grid gap-11 lg:grid-cols-2 lg:gap-14">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                It grows the shop
              </div>
              <h3 className="mt-4 font-display text-[24px] font-bold leading-[1.15] tracking-[-0.03em] text-bp-ink lg:text-[30px]">
                Revenue you are leaving on the table.
              </h3>
              <div className="mt-6 border-t border-bp-edge">
                {[
                  ["Abandoned carts", "Detected, reminded, and reported as recovered revenue rather than as emails sent."],
                  ["Reviews", "Collected and moderated in your own admin, so your proof is yours."],
                  ["Google Shopping feeds", "Generated from your live catalogue, so listings match real stock and prices."],
                  ["Subscriptions", "Turn a one-off buyer into a repeat one, on a schedule."],
                  ["Gift cards", "Issued, redeemed across orders, tracked in a ledger that balances."],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-3.5 border-b border-bp-edge py-4">
                    <span className="mt-1 flex h-[17px] w-[17px] shrink-0 items-center justify-center bg-brand-500/[0.1] text-brand-700">
                      <Icon name="check" className="h-[11px] w-[11px]" />
                    </span>
                    <div>
                      <div className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-bp-ink">{t}</div>
                      <p className="mt-1 text-[14px] leading-[1.6] text-bp-mute">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                It makes the day easier
              </div>
              <h3 className="mt-4 font-display text-[24px] font-bold leading-[1.15] tracking-[-0.03em] text-bp-ink lg:text-[30px]">
                Work your team stops doing by hand.
              </h3>
              <div className="mt-6 border-t border-bp-edge">
                {[
                  ["Automation rules", "If this happens, do that. Set once by your team, running from then on."],
                  ["A daily digest", "What happened in the shop yesterday, written for you rather than dug out of reports."],
                  ["Invoices and credit notes", "Generated on the order and on the refund. Nobody types one again."],
                  ["One admin, not five tabs", "Catalogue, orders, content, suppliers, subscriptions and reviews in one place."],
                  ["It remembers your store", "The Copilot keeps context, so you are not re-explaining your business every time."],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-3.5 border-b border-bp-edge py-4">
                    <span className="mt-1 flex h-[17px] w-[17px] shrink-0 items-center justify-center bg-brand-500/[0.1] text-brand-700">
                      <Icon name="check" className="h-[11px] w-[11px]" />
                    </span>
                    <div>
                      <div className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-bp-ink">{t}</div>
                      <p className="mt-1 text-[14px] leading-[1.6] text-bp-mute">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <Cta />
          </div>
        </div>
      </section>

      {/* WHAT IT COSTS, IN THEIR NUMBERS */}
      <section className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
            Move the sliders
          </div>
          <h2 className="mt-5 max-w-[22ch] font-display text-[30px] font-bold leading-[1.06] tracking-[-0.036em] text-white lg:text-[42px]">
            What is renting your store costing you a year?
          </h2>
          <p className="mt-5 max-w-[58ch] text-[16.5px] leading-[1.7] text-white/60">
            Your numbers, not ours. Nothing here is a claim about your business: it is what you
            typed in, multiplied out over twelve months.
          </p>
          <div className="mt-11">
            <CommissionCalculator />
          </div>
        </div>
      </section>

      {/* RENTED VS OWNED */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <h2 className="max-w-[20ch] font-display text-[30px] font-bold leading-[1.08] tracking-[-0.036em] text-bp-ink lg:text-[40px]">
            It is not only the money.
          </h2>
          <p className="mt-5 max-w-[58ch] text-[16.5px] leading-[1.7] text-bp-mute">
            The percentage is the part you can put a number on. These are the parts you only find
            out about later.
          </p>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse border-l border-t border-bp-edge bg-white text-left">
              <thead>
                <tr>
                  <th className="border-b border-r border-bp-edge px-5 py-4" />
                  <th className="border-b border-r border-bp-edge bg-bp-tint px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-bp-mute">
                    Rented platform
                  </th>
                  <th className="border-b border-r border-bp-edge bg-brand-50 px-5 py-4 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">
                    MnT Commerce India
                  </th>
                </tr>
              </thead>
              <tbody>
                {RENTED_VS_OWNED.map((r) => (
                  <tr key={r.q}>
                    <td className="border-b border-r border-bp-edge bg-bp-tint px-5 py-4 text-[14px] font-semibold text-bp-ink">
                      {r.q}
                    </td>
                    <td className="border-b border-r border-bp-edge px-5 py-4 text-[14.5px] leading-[1.55] text-bp-mute">
                      {r.rented}
                    </td>
                    <td className="border-b border-r border-bp-edge px-5 py-4 text-[14.5px] leading-[1.55] text-bp-ink">
                      {r.owned}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-9">
            <Cta label="Work out what yours costs" />
          </div>
        </div>
      </section>

      {/* WHAT IS BUILT */}
      <section className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <h2 className="max-w-[20ch] font-display text-[30px] font-bold leading-[1.08] tracking-[-0.036em] text-bp-ink lg:text-[40px]">
            Already built, not a roadmap.
          </h2>
          <p className="mt-5 max-w-[62ch] text-[16.5px] leading-[1.7] text-bp-mute">
            Every item here is a module that exists in the platform today. We are not describing
            what a store like this usually has.
          </p>
          <div className="mt-10 grid border-l border-t border-bp-edge sm:grid-cols-2 lg:grid-cols-3">
            {BUILT.map((b) => (
              <div key={b.t} className="border-b border-r border-bp-edge p-6 lg:p-7">
                <span className="flex h-10 w-10 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                  <Icon name={b.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-display text-[17px] font-bold leading-[1.25] tracking-[-0.022em] text-bp-ink">
                  {b.t}
                </h3>
                <p className="mt-2.5 text-[14px] leading-[1.65] text-bp-mute">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GST, SHOWN */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <div className="grid gap-11 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                And the boring part is handled
              </div>
              <h2 className="mt-5 max-w-[18ch] font-display text-[30px] font-bold leading-[1.06] tracking-[-0.036em] text-bp-ink lg:text-[40px]">
                GST works without you thinking about it.
              </h2>
              <p className="mt-5 max-w-[54ch] text-[16.5px] leading-[1.7] text-bp-mute">
                Same state as your registration, it splits into CGST and SGST. Different state, it
                is IGST. The rate comes from the HSN code on the product, not from one setting
                applied to your whole catalogue. This runs in the platform core, so it applies on
                every checkout path rather than on the one somebody remembered.
              </p>
              <div className="mt-8">
                <Cta label="See it on a real invoice" />
              </div>
            </div>

            <div className="border border-[#D3DDE9] bg-white shadow-[0_34px_70px_-40px_rgba(11,21,36,0.35)]">
              <div className="flex items-center justify-between gap-3 border-b border-bp-line bg-bp-tint px-5 py-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                  Tax decision
                </span>
                <span className="font-mono text-[11px] tracking-[0.1em] text-bp-faint">
                  Per order
                </span>
              </div>
              <div className="p-6 lg:p-7">
                <div className="border border-bp-edge bg-bp-tint px-4 py-3 text-center font-mono text-[12px] tracking-[0.06em] text-bp-ink">
                  Place of supply vs your GSTIN state
                </div>
                <div className="mx-auto my-3 h-6 w-px bg-bp-edge" aria-hidden="true" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { t: "Same state", l: ["CGST 9%", "SGST 9%"], note: "Intra-state. Split in two." },
                    { t: "Different state", l: ["IGST 18%"], note: "Inter-state. One line." },
                  ].map((b) => (
                    <div key={b.t} className="border border-bp-edge bg-white p-4">
                      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-bp-faint">
                        {b.t}
                      </div>
                      <div className="mt-3 space-y-1.5">
                        {b.l.map((x) => (
                          <div
                            key={x}
                            className="border border-brand-200 bg-brand-50 px-3 py-2 text-center font-mono text-[12.5px] text-brand-700"
                          >
                            {x}
                          </div>
                        ))}
                      </div>
                      <p className="mt-3 text-[12.5px] leading-[1.5] text-bp-faint">{b.note}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-5 border-t border-bp-hair pt-4 text-[12.5px] leading-[1.55] text-bp-faint">
                  Rates shown are an example. The actual slab comes from the HSN code on each
                  product, per line.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-bp-line bg-bp-tint px-5 py-3.5">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-bp-ink">
                  Then: invoice on a gapless FY serial
                </span>
                <span className="h-px min-w-4 flex-1 bg-bp-edge" />
                <span className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-bp-faint">
                  Automatic
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
            We have done this before
          </div>
          <h2 className="mt-5 max-w-[22ch] font-display text-[30px] font-bold leading-[1.08] tracking-[-0.036em] text-white lg:text-[38px]">
            Platforms running in India right now.
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((c) => (
              <a
                key={c.slug}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block border border-white/12 bg-white/[0.03] transition-colors hover:border-white/30"
              >
                <span className="relative block aspect-[16/10] overflow-hidden bg-slate-800">
                  <Image
                    src={c.shot}
                    alt={`${c.name} website`}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover object-top opacity-90 transition-opacity group-hover:opacity-100"
                  />
                </span>
                <span className="block p-4">
                  <span className="block font-display text-[15px] font-bold tracking-[-0.02em] text-white">
                    {c.name}
                  </span>
                  <span className="mt-1 block font-mono text-[11px] tracking-[0.04em] text-white/50">
                    {c.host}
                  </span>
                </span>
              </a>
            ))}
          </div>
          <div className="mt-10">
            <a
              href="#lead-form"
              className="group inline-flex h-14 items-center bg-white pl-7 font-mono text-[13px] font-semibold tracking-[0.06em] text-bp-ink transition-colors hover:bg-brand-300"
            >
              Book a demo
              <span className="ml-4 flex h-14 w-14 items-center justify-center border-l border-bp-ink/15">
                <Icon name="arrow" className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <h2 className="font-display text-[30px] font-bold leading-[1.08] tracking-[-0.036em] text-bp-ink lg:text-[38px]">
            Before you ask us.
          </h2>
          <div className="mt-9 border-t border-bp-edge">
            {FAQ.map((f, i) => (
              <details key={f.q} className="group border-b border-bp-edge py-5" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="mt-1 font-mono text-[11px] tracking-[0.14em] text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-display text-[18px] font-bold leading-[1.35] tracking-[-0.022em] text-bp-ink">
                    {f.q}
                  </span>
                  <span className="mt-1 font-mono text-[16px] text-bp-faint group-open:hidden">+</span>
                  <span className="mt-1 hidden font-mono text-[16px] text-bp-faint group-open:inline">−</span>
                </summary>
                <p className="ml-[34px] mt-3.5 max-w-[70ch] text-[15.5px] leading-[1.72] text-bp-mute">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="bg-bp-wash">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <h2 className="mx-auto max-w-[20ch] font-display text-[30px] font-bold leading-[1.08] tracking-[-0.036em] text-bp-ink lg:text-[42px]">
            Bring your platform bill and your order volume.
          </h2>
          <p className="mx-auto mt-5 max-w-[58ch] text-[16.5px] leading-[1.7] text-bp-mute">
            A senior consultant will put a real annual number on what renting costs you, then show
            you what owning would look like. Including when it is not worth it yet.
          </p>
          <div className="mt-9 flex justify-center">
            <Cta />
          </div>
        </div>
      </section>

      <footer className="border-t border-bp-line bg-white">
        <div className={`${PAGE} flex flex-wrap items-center justify-between gap-3 py-7`}>
          <p className="m-0 font-mono text-[11.5px] text-bp-faint">
            © {new Date().getFullYear()} {site.name}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="font-mono text-[11.5px] text-bp-faint transition-colors hover:text-bp-ink"
          >
            {site.email}
          </a>
        </div>
      </footer>
    </>
  );
}
