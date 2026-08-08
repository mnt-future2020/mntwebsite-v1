import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import LandingLeadForm from "@/components/LandingLeadForm";
import { ratings, site } from "@/lib/site";
import { INDIA_CLIENTS } from "@/lib/indiaClients";

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
            Get a callback
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
                MnT Commerce India
              </span>
            </div>
            <h1 className="mt-6 max-w-[16ch] font-display text-[38px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[50px] lg:text-[60px]">
              Your own store, with GST done <span className="text-brand-700">properly</span>.
            </h1>
            <p className="mt-6 max-w-[54ch] text-[18px] leading-[1.65] text-bp-mute">
              Stop paying a monthly fee plus a cut of every order to rent your own shop. This is a
              platform you run: India tax in the core, Razorpay and UPI built in, and your customer
              list in your own database.
            </p>

            <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {[
                "No commission on your orders",
                "CGST/SGST or IGST decided per order",
                "Gapless invoice serials",
                "Runs on servers you own",
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
              Talk to a senior engineer
            </div>
            <p className="mt-2.5 text-[14.5px] leading-[1.6] text-bp-mute">
              Two minutes. Tell us what you sell and we will tell you what your platform is really
              costing you a year.
            </p>
            <div className="mt-6">
              <LandingLeadForm />
            </div>
          </div>
        </div>
      </section>

      {/* RENTED VS OWNED */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <h2 className="max-w-[20ch] font-display text-[30px] font-bold leading-[1.08] tracking-[-0.036em] text-bp-ink lg:text-[40px]">
            What renting your store actually costs.
          </h2>
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
              Get a callback
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
