import type { Metadata } from "next";
import Image from "next/image";
import Icon from "@/components/Icon";
import LandingLeadForm from "@/components/LandingLeadForm";
import CommissionCalculator from "@/components/CommissionCalculator";
import { ratings, site } from "@/lib/site";
import { INDIA_CLIENTS } from "@/lib/indiaClients";

/**
 * Ad landing page for MnT Commerce India.
 *
 * Deliberately NOT the blueprint language the rest of the site uses. That is a
 * considered B2B idiom of hairline grids, square corners and mono labels, and
 * it reads as technical. This reader tapped an ad on a phone, so the shapes are
 * softer, the buttons are pills, and the type carries more weight. The palette
 * is untouched: same brand blue, same ink.
 *
 * Centred and written plainly on purpose. The reader is a shop owner who tapped
 * an ad on a phone, not somebody browsing a services site, so every line has to
 * land at a glance and nothing sits off to one side where it gets skipped.
 *
 * noindex: it says much the same thing as /in/products/commerce-india, and
 * letting the two compete in search would cost the product page its ranking to
 * win nothing. This one is reached from an ad.
 */
export const metadata: Metadata = {
  title: { absolute: "An online store that helps you run it | MnT Future" },
  description:
    "Your own online store with an AI helper built into the back office. It does the daily work, helps you sell more, and handles GST. No commission on your orders. Book a free demo.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/in/products/commerce-india" },
};

const PAGE = "mx-auto w-full max-w-[1100px] px-[18px] sm:px-8";

const HOW_IT_RUNS = [
  { n: "1", t: "You ask it something", d: "“Which items are running out of stock?” Just type it, like a message." },
  { n: "2", t: "It shows you the steps", d: "You can read what it is about to do, before it does anything." },
  { n: "3", t: "You decide what it can do alone", d: "Small jobs, let it finish by itself. Anything bigger, it waits for your yes." },
  { n: "4", t: "If it is not sure, it asks you", d: "It will not guess. It stops and hands that bit to a person." },
  { n: "5", t: "You can see everything it did", d: "Every action is written down. Nothing happens quietly." },
];

const GROW = [
  ["Brings back lost carts", "Someone adds to cart and leaves. It reminds them, and shows you how much money came back."],
  ["Collects reviews", "Asks buyers for a review and keeps them in your own admin."],
  ["Keeps your Google listing right", "Your prices and stock on Google Shopping stay the same as your shop."],
  ["Sells on repeat", "Set up subscriptions so a one-time buyer keeps buying every month."],
  ["Gift cards", "Sell them, let people use them across orders, and see the balance any time."],
];

const EASY = [
  ["Set a rule once", "“When this happens, do that.” Your team sets it once and it keeps running."],
  ["A short daily summary", "What happened in your shop yesterday, in a few lines."],
  ["Bills made automatically", "Invoice on every order, credit note on every refund. Nobody types them."],
  ["Everything in one place", "Products, orders, pages, suppliers, reviews. One login, not five tabs."],
  ["It remembers your shop", "You do not explain your business to it again every time."],
];

const NOT_ONLY_MONEY = [
  ["Your customer list", "On a rented platform it sits with them. Here it is in your own database."],
  ["GST", "There it is a plugin somebody set up once. Here it is built into the platform."],
  ["Bill numbers", "There they skip when an order fails. Here they never skip."],
  ["The thing you do differently", "There it is a request nobody builds. Here we build it, and you keep changing it."],
];

const FAQ = [
  { q: "How is this different from Shopify?", a: "Two things. You do not pay a monthly fee plus a cut of every order, and GST is built into the platform instead of an app you hope is set up right. The catch is that you run it. If you are small, Shopify is often better, and we will tell you that." },
  { q: "Will the AI do something wrong?", a: "You decide what it is allowed to do on its own. Everything else waits for your approval, it stops and asks when it is not sure, and every single thing it does is written down so you can check." },
  { q: "Can you move our old shop to this?", a: "Usually yes. Products, customers and past orders come across from most platforms. We check first and tell you honestly what will and will not move." },
  { q: "How long does it take?", a: "Normally eight to sixteen weeks, depending on what needs connecting. We look properly before giving you a number, so it is a number you can plan around." },
  { q: "Who looks after it after launch?", a: "Either we do, for a monthly fee, or we hand it over and train your team. Both are fine. If you cannot run it without us, we built it badly." },
];

const PROOF = INDIA_CLIENTS.filter((c) =>
  ["print-emporium", "blufacade", "solar-power-house", "rg-golden-palace"].includes(c.slug)
);

function Cta({ label = "Book a free demo" }: { label?: string }) {
  return (
    <a
      href="#lead-form"
      className="group inline-flex h-[58px] w-full max-w-[340px] items-center justify-center gap-3 rounded-full bg-brand-700 px-8 text-[16px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(14,102,194,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-800 sm:w-auto"
    >
      {label}
      <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </a>
  );
}

function Eyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] font-semibold tracking-[0.01em] ${
        dark ? "bg-white/10 text-brand-300" : "bg-brand-50 text-brand-700"
      }`}
    >
      <span className={`h-[6px] w-[6px] rounded-full ${dark ? "bg-brand-300" : "bg-brand-500"}`} />
      {children}
    </span>
  );
}

function H2({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <h2
      className={`mx-auto mt-5 max-w-[19ch] font-display text-[32px] font-extrabold leading-[1.06] tracking-[-0.038em] lg:text-[46px] ${
        dark ? "text-white" : "text-bp-ink"
      }`}
    >
      {children}
    </h2>
  );
}

function Sub({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={`mx-auto mt-5 max-w-[54ch] text-[17.5px] leading-[1.72] ${dark ? "text-white/65" : "text-bp-mute"}`}>
      {children}
    </p>
  );
}

/** Centred block, list left-aligned inside it: centred body text is hard to read. */
function TickList({ items }: { items: string[][] }) {
  return (
    <div className="mx-auto mt-7 max-w-[440px] text-left">
      {items.map(([t, d]) => (
        <div key={t} className="flex gap-3.5 border-b border-bp-hair py-4 last:border-b-0">
          <span className="mt-1 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-500/[0.12] text-brand-700">
            <Icon name="check" className="h-[12px] w-[12px]" />
          </span>
          <div>
            <div className="font-display text-[15.5px] font-bold tracking-[-0.02em] text-bp-ink">{t}</div>
            <p className="mt-1 text-[14px] leading-[1.6] text-bp-mute">{d}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CommerceIndiaLanding() {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-bp-line bg-white/95 backdrop-blur">
        <div className={`${PAGE} flex h-[66px] items-center justify-between gap-4`}>
          <Image src="/mnt-logo.png" alt="MnT Future" width={2828} height={546} priority className="h-8 w-auto" />
          <a
            href="#lead-form"
            className="whitespace-nowrap rounded-full bg-brand-700 px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-brand-800"
          >
            Book a free demo
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className={`${PAGE} py-14 text-center lg:py-20`}>
          <Eyebrow>Your own online shop · Built for India</Eyebrow>
          <h1 className="mx-auto mt-6 max-w-[15ch] font-display text-[40px] font-extrabold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[56px] lg:text-[70px]">
            An online shop that helps you <span className="text-brand-700">run it</span>.
          </h1>
          <Sub>
            Your own shop online, with an AI helper built into the back office. It watches your
            shop, does the daily work for you, and helps you sell more. GST, Razorpay and UPI are
            already inside.
          </Sub>

          <div className="mx-auto mt-9 grid max-w-[700px] gap-2.5 text-left sm:grid-cols-2">
            {[
              "An AI helper that does jobs, not just chats",
              "Brings back lost carts and gets you reviews",
              "GST, Razorpay and UPI already built in",
              "No commission on your orders. Ever.",
            ].map((p) => (
              <div key={p} className="flex items-start gap-2.5">
                <span className="mt-1 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-500/[0.12] text-brand-700">
                  <Icon name="check" className="h-[12px] w-[12px]" />
                </span>
                <span className="text-[15px] leading-[1.5] text-bp-body">{p}</span>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Cta />
          </div>

          <div className="mx-auto mt-9 flex max-w-[560px] flex-wrap items-center justify-center gap-x-7 gap-y-2 border-t border-bp-hair pt-6">
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
      </section>

      {/* THE AI HELPER */}
      <section className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <Eyebrow>The AI helper</Eyebrow>
          <H2>It sits inside your admin, not on your website.</H2>
          <Sub>
            Most shops put a chat box on the website for customers. But the person with too much
            work is you. So our AI sits where you work: prices, stock, listings, refunds,
            follow-ups. You ask, and it gets on with it.
          </Sub>

          <div className="mx-auto mt-11 max-w-[740px] overflow-hidden rounded-3xl border border-bp-hair bg-white text-left shadow-[0_30px_70px_-34px_rgba(11,21,36,0.3)]">
            <div className="flex items-center justify-between gap-3 border-b border-bp-line bg-bp-tint px-5 py-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-brand-700">
                How it works
              </span>
              <span className="font-mono text-[11px] tracking-[0.1em] text-bp-faint">
                You stay in charge
              </span>
            </div>
            <div className="divide-y divide-bp-hair">
              {HOW_IT_RUNS.map((x) => (
                <div key={x.n} className="flex gap-4 px-5 py-4 sm:px-7">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-700 text-[14px] font-bold text-white">
                    {x.n}
                  </span>
                  <div>
                    <div className="font-display text-[16px] font-bold tracking-[-0.02em] text-bp-ink">
                      {x.t}
                    </div>
                    <p className="mt-1 text-[14px] leading-[1.6] text-bp-mute">{x.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-bp-line bg-bp-tint px-5 py-3.5 sm:px-7">
              <span className="font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.16em] text-bp-ink">
                Monthly limit you set
              </span>
              <span className="h-px min-w-4 flex-1 bg-bp-edge" />
              <span className="font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.14em] text-bp-faint">
                It cannot run up a bill
              </span>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <Cta label="Show me the AI helper" />
          </div>
        </div>
      </section>

      {/* GROW + EASIER */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <Eyebrow>What changes for you</Eyebrow>
          <H2>Sell more. Work less.</H2>
          <Sub>Two things every shop owner wants. Here is exactly what the platform does for each.</Sub>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-10">
            <div>
              <h3 className="font-display text-[22px] font-bold tracking-[-0.028em] text-bp-ink">
                Sell more
              </h3>
              <TickList items={GROW} />
            </div>
            <div>
              <h3 className="font-display text-[22px] font-bold tracking-[-0.028em] text-bp-ink">
                Work less
              </h3>
              <TickList items={EASY} />
            </div>
          </div>

          <div className="mt-11 flex justify-center">
            <Cta />
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-16 lg:py-20`}>
          <div className="text-center">
            <Eyebrow dark>Move the sliders</Eyebrow>
            <H2 dark>How much are you paying to rent your shop?</H2>
            <Sub dark>
              Put in your own numbers. This is only your figures multiplied over twelve months, so
              the answer is yours, not ours.
            </Sub>
          </div>
          <div className="mt-12">
            <CommissionCalculator />
          </div>
        </div>
      </section>

      {/* NOT ONLY MONEY */}
      <section className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <Eyebrow>And it is not only money</Eyebrow>
          <H2>Four things you find out later.</H2>
          <div className="mx-auto mt-11 grid max-w-[880px] gap-4 text-left sm:grid-cols-2">
            {NOT_ONLY_MONEY.map(([t, d]) => (
              <div key={t} className="rounded-2xl border border-bp-hair bg-white p-6 shadow-[0_10px_28px_-18px_rgba(11,21,36,0.22)] lg:p-7">
                <h3 className="font-display text-[17px] font-bold tracking-[-0.022em] text-bp-ink">{t}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-bp-mute">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GST, PLAINLY */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <Eyebrow>The boring part, handled</Eyebrow>
          <H2>GST is worked out for you, on every order.</H2>
          <Sub>
            If the buyer is in your state, the bill shows CGST and SGST. If they are in another
            state, it shows IGST. The rate comes from each product&apos;s HSN code. You do not set
            it, and nobody has to remember it.
          </Sub>

          <div className="mx-auto mt-11 grid max-w-[680px] gap-4 text-left sm:grid-cols-2">
            {[
              { t: "Buyer in your state", l: ["CGST", "SGST"], note: "The tax splits into two lines." },
              { t: "Buyer in another state", l: ["IGST"], note: "One line instead of two." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-bp-hair bg-white p-5 shadow-[0_10px_28px_-18px_rgba(11,21,36,0.25)]">
                <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-bp-faint">{b.t}</div>
                <div className="mt-3 space-y-1.5">
                  {b.l.map((x) => (
                    <div
                      key={x}
                      className="rounded-xl bg-brand-50 px-3 py-3 text-center text-[14px] font-bold text-brand-700"
                    >
                      {x}
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-[13px] leading-[1.5] text-bp-faint">{b.note}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-6 max-w-[52ch] text-[14px] leading-[1.6] text-bp-faint">
            Bills are numbered in order and never skip a number, which is what matters if you are
            ever checked. Refunds make their own credit note automatically.
          </p>
        </div>
      </section>

      {/* PROOF */}
      <section className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <Eyebrow dark>We have done this before</Eyebrow>
          <H2 dark>Shops we built that are running today.</H2>
          <div className="mt-11 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PROOF.map((c) => (
              <a
                key={c.slug}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-2xl border border-white/12 bg-white/[0.04] text-left transition-all hover:-translate-y-1 hover:border-white/30"
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
          <div className="mt-11 flex justify-center">
            <a
              href="#lead-form"
              className="group inline-flex h-[58px] w-full max-w-[340px] items-center justify-center gap-3 rounded-full bg-white px-8 text-[16px] font-bold text-bp-ink shadow-[0_14px_30px_-12px_rgba(0,0,0,0.5)] transition-all hover:-translate-y-0.5 sm:w-auto"
            >
              Book a free demo
              <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section id="lead-form" className="scroll-mt-20 border-b border-bp-line bg-white">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <Eyebrow>Book a free demo</Eyebrow>
          <H2>Thirty minutes. We show you the shop working.</H2>
          <Sub>
            We share our screen, walk you through the back office, run a real GST bill, and tell
            you what it would take to move your shop across. No cost, and no obligation.
          </Sub>
          <div className="mx-auto mt-11 max-w-[540px] rounded-3xl border border-bp-hair bg-white p-6 text-left shadow-[0_30px_66px_-38px_rgba(11,21,36,0.32)] lg:p-8">
            <LandingLeadForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <Eyebrow>Questions</Eyebrow>
          <H2>Things people ask us.</H2>
          <div className="mx-auto mt-11 max-w-[740px] text-left">
            {FAQ.map((f, i) => (
              <details key={f.q} className="group mb-3 rounded-2xl border border-bp-hair bg-white px-5 py-4 shadow-[0_8px_24px_-18px_rgba(11,21,36,0.22)]" open={i === 0}>
                <summary className="flex cursor-pointer list-none items-start gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[12.5px] font-bold text-brand-700">
                    {i + 1}
                  </span>
                  <span className="flex-1 font-display text-[17.5px] font-bold leading-[1.35] tracking-[-0.022em] text-bp-ink">
                    {f.q}
                  </span>
                  <span className="mt-1 font-mono text-[16px] text-bp-faint group-open:hidden">+</span>
                  <span className="mt-1 hidden font-mono text-[16px] text-bp-faint group-open:inline">−</span>
                </summary>
                <p className="ml-[34px] mt-3.5 text-[15.5px] leading-[1.72] text-bp-mute">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSE */}
      <section className="bg-white">
        <div className={`${PAGE} py-16 text-center lg:py-20`}>
          <H2>Tell us what you sell. We will show you the rest.</H2>
          <Sub>
            Bring your monthly platform bill and how many orders you get. We will tell you what
            renting your shop costs you in a year, and whether owning one is worth it for you yet.
          </Sub>
          <div className="mt-10 flex justify-center">
            <Cta />
          </div>
        </div>
      </section>

      <footer className="border-t border-bp-line bg-bp-tint">
        <div className={`${PAGE} flex flex-wrap items-center justify-center gap-x-6 gap-y-2 py-7 text-center`}>
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
