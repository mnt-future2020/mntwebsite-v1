import type { Metadata } from "next";
import Link from "next/link";
import CommissionCalculator from "@/components/CommissionCalculator";
import LandingLeadForm from "@/components/LandingLeadForm";
import { ratings, site } from "@/lib/site";

/**
 * Ad landing page: fashion and apparel businesses, India.
 *
 * A second landing page rather than a rewrite of /in/lp/commerce-india. The
 * generic page answers "what does an ecommerce platform cost me" and is aimed at
 * a brand already selling. This one answers "how do I get my shop online at all"
 * and is aimed at a boutique or Instagram seller who has never had a store. One
 * page cannot lead with both without leading with neither, and the campaigns are
 * separate anyway, so the lead source is separate too.
 *
 * Plain English, centred, short lines. The reader is a shop owner on a phone
 * between customers, not a CTO. Every claim here is either something the
 * platform genuinely ships or something named as ours to set up.
 */

const PATH = "/in/lp/fashion-store";
const TITLE = "Start your online fashion store | MnT Future";
const DESCRIPTION =
  "Sell your sarees, kurtis and clothing online across India. Your own store with sizes, colours, UPI, cash on delivery and GST built in. Free store plan, no commission on your sales.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  // Campaign traffic only. Indexing an ad page competes with the product page it
  // was built from and splits the signal between two near-identical URLs.
  robots: { index: false, follow: false },
  alternates: { canonical: "/in/products/commerce-india" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: TITLE,
    description: DESCRIPTION,
    url: PATH,
    images: [`${site.url}/og-default.png`],
  },
};

const WRAP = "mx-auto w-full max-w-[1100px] px-5 sm:px-8";
const NARROW = "mx-auto w-full max-w-[760px] px-5 sm:px-8";

/* ---------------------------------------------------------------- pieces */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-[12.5px] font-bold uppercase tracking-[0.08em] text-brand-800">
      {children}
    </span>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.035em] text-bp-ink sm:text-[38px] lg:text-[46px]">
      {children}
    </h2>
  );
}

function Lede({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.62] text-bp-mute sm:text-[18.5px]">
      {children}
    </p>
  );
}

function Cta({
  children,
  variant = "solid",
  href = "#lead-form",
}: {
  children: React.ReactNode;
  variant?: "solid" | "ghost";
  href?: string;
}) {
  const base =
    "inline-flex h-[58px] w-full max-w-[380px] items-center justify-center gap-2.5 rounded-full px-8 text-[16.5px] font-bold transition-all hover:-translate-y-0.5 sm:w-auto";
  return (
    <a
      href={href}
      className={
        variant === "solid"
          ? `${base} bg-brand-700 text-white shadow-[0_18px_36px_-16px_rgba(14,102,194,0.8)] hover:bg-brand-800`
          : `${base} border border-bp-edge bg-white text-bp-ink hover:border-brand-400 hover:text-brand-800`
      }
    >
      {children}
    </a>
  );
}

function Tick() {
  return (
    <span className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={3}>
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

/* ---------------------------------------------------------------- content */

const FOR_WHOM = [
  {
    t: "You have a shop",
    d: "A boutique or a textile shop with regular customers. You want the same shop working after closing time, and for people in other cities.",
  },
  {
    t: "You sell on Instagram",
    d: "Orders come through DMs. You want a proper store link in your bio so people can buy without asking you the price.",
  },
  {
    t: "You are starting a brand",
    d: "You have the clothes and the photos, but no place to sell them. You want to launch properly, not on a rented page.",
  },
  {
    t: "You already sell online",
    d: "You are on a marketplace or a rented platform and paying a cut of every order. You want your own store instead.",
  },
];

const PAINS = [
  "You answer the same price question forty times a day.",
  "Every customer asks the same thing: is M size there, is this colour there.",
  "You explain cash on delivery again and again.",
  "You lose orders inside the chat, and find them the next morning.",
  "Someone asks for the price at 11pm and buys somewhere else by morning.",
  "Instagram reach drops and the orders drop with it, and you can do nothing about it.",
];

const FEATURES = [
  {
    t: "Your catalogue, shown properly",
    d: "Big photos, collections, new arrivals, categories. Customers see the clothes the way they would in your shop.",
  },
  {
    t: "Sizes and colours",
    d: "S, M, L, XL, and the same kurti in four colours. Each one with its own stock, so you never sell what is not there.",
  },
  {
    t: "UPI, cards and cash on delivery",
    d: "Customers pay the way they are comfortable. Money reaches your account directly, not through anyone else.",
  },
  {
    t: "Orders in one place",
    d: "Every order in one screen, not scattered across chats. Pack, dispatch, mark it delivered, done.",
  },
  {
    t: "Returns and exchanges",
    d: "In fashion, size exchanges will happen. The store has a proper flow for it instead of a long argument on WhatsApp.",
  },
  {
    t: "GST invoices, automatic",
    d: "The right rate on each item, the invoice generated with the order. Nothing to type again at month end.",
  },
  {
    t: "Discounts and offers",
    d: "Festival offers, first order discount, free shipping over an amount. You set it, the store applies it.",
  },
  {
    t: "Works on every phone",
    d: "Most of your customers will buy on a phone, on mobile data. The store is built for that first.",
  },
];

const AI_DOES = [
  "Reminds customers who left clothes in the cart, and brings some of them back.",
  "Asks for a review after the parcel is delivered, so new customers see it.",
  "Writes the product description when you upload a new item.",
  "Tells you what is selling and what is sitting, without you opening a report.",
  "Follows up with customers who have not bought in a while.",
];

const COMPARE = [
  ["Who owns the customer", "Instagram does", "You do"],
  ["Customer phone numbers", "You cannot export them", "Yours, in your store"],
  ["If reach drops", "Sales drop with it", "Your store stays open"],
  ["Taking orders", "By hand, in DMs", "Automatic, all day"],
  ["Payment", "You send a UPI ID and hope", "Paid at checkout"],
  ["Cost of growing", "Pay for reach, every time", "The store cost stays the same"],
];

const STEPS = [
  { t: "Tell us about your shop", d: "One call, about 30 minutes. What you sell, who buys it, how you deliver today." },
  { t: "We build your store", d: "Your name, your look, your categories. Sizes, payments, delivery and GST all set up." },
  { t: "You add your products", d: "We show you how, and we load the first set with you so you are not doing it alone." },
  { t: "You start selling", d: "Put the link in your Instagram bio, send it to your WhatsApp customers, and take orders." },
];

const FAQS = [
  {
    q: "I am not technical at all. Can I run this?",
    a: "Yes. If you can post on Instagram, you can add a product. We set everything up, then sit with you and show you how to add items, see orders and mark them dispatched. If something is stuck, you call us.",
  },
  {
    q: "How long until my store is live?",
    a: "For a normal fashion store, a few weeks from the first call. It depends mostly on how fast the product photos and details are ready, which is the part on your side.",
  },
  {
    q: "Do you take a percentage of my sales?",
    a: "No. It is your store and your money. You pay for building it and for running it, and that does not change when you have a good month.",
  },
  {
    q: "What about delivery? I only ship in my city today.",
    a: "The store connects to courier partners, so a customer in another state can order and the shipping is calculated at checkout. You still choose which couriers and which areas.",
  },
  {
    q: "Can I still sell in my shop and on Instagram?",
    a: "Yes, and you should. The store does not replace them. It gives you a place to send everyone who asks for the price, so you stop repeating yourself.",
  },
  {
    q: "What if my customers only pay cash on delivery?",
    a: "Cash on delivery is supported. Many Indian fashion customers start there and move to UPI once they trust you. You can also keep it on for some pincodes only.",
  },
  {
    q: "Will the store be mine, or rented?",
    a: "Yours. Your domain, your data, your customer list. If you ever stop working with us, the store and everything in it stays with you.",
  },
];

/* ---------------------------------------------------------------- page */

export default function FashionStoreLanding() {
  return (
    <div className="bg-white text-bp-ink">
      {/* ------------------------------------------------------------ hero */}
      <section className="relative overflow-hidden border-b border-bp-edge bg-gradient-to-b from-brand-50/70 to-white pb-16 pt-14 text-center sm:pb-20 sm:pt-20">
        <div className={NARROW}>
          <Pill>Built for Indian fashion &amp; apparel businesses</Pill>

          <h1 className="mt-6 font-display text-[36px] font-extrabold leading-[1.06] tracking-[-0.04em] text-bp-ink sm:text-[52px] lg:text-[62px]">
            Take your fashion store{" "}
            <span className="text-brand-700">online</span>, and sell across India.
          </h1>

          <p className="mx-auto mt-6 max-w-[600px] text-[17.5px] leading-[1.6] text-bp-mute sm:text-[20px]">
            Your own online store for your sarees, kurtis and clothing. Sizes, colours, UPI,
            cash on delivery and GST are all set up for you. No commission on your orders.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Cta>Get my free store plan</Cta>
            <Cta variant="ghost" href="#how">
              See how it works
            </Cta>
          </div>

          <p className="mt-5 text-[14px] text-bp-faint">
            Free 30 minute call. No obligation, and nothing to pay to find out.
          </p>

          {/* An order arriving is the whole promise of the page, so the page shows one. */}
          <div className="mx-auto mt-12 max-w-[440px] rounded-3xl border border-bp-edge bg-white p-5 text-left shadow-[0_30px_70px_-45px_rgba(12,32,60,0.5)]">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[19px]">
                🔔
              </span>
              <div>
                <div className="text-[12px] font-bold uppercase tracking-[0.09em] text-brand-700">
                  New order
                </div>
                <div className="font-display text-[17px] font-bold leading-[1.28] tracking-[-0.02em] text-bp-ink">
                  ₹2,499 · Women&apos;s kurti, size M
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-bp-line pt-3 text-[13.5px] text-bp-mute">
              <span>Paid by UPI</span>
              <span>Ships to Coimbatore</span>
            </div>
            <p className="mt-3 text-[13px] leading-[1.55] text-bp-faint">
              An example of what an order looks like in your store. Nobody had to answer a
              message for it.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- who this is for */}
      <section className="border-b border-bp-edge py-16 text-center sm:py-20">
        <div className={WRAP}>
          <H2>This is for you if</H2>
          <Lede>
            Four kinds of fashion business, and all four are welcome. You do not need to be
            selling online already.
          </Lede>

          <div className="mt-11 grid gap-4 text-left sm:grid-cols-2">
            {FOR_WHOM.map((c) => (
              <div
                key={c.t}
                className="rounded-3xl border border-bp-edge bg-bp-mist/40 p-6 sm:p-7"
              >
                <h3 className="font-display text-[19.5px] font-bold tracking-[-0.025em] text-bp-ink">
                  {c.t}
                </h3>
                <p className="mt-3 text-[15.5px] leading-[1.62] text-bp-mute">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- the pain */}
      <section className="border-b border-bp-edge bg-bp-mist/50 py-16 text-center sm:py-20">
        <div className={NARROW}>
          <H2>Does this happen to you?</H2>
          <Lede>
            None of this is a business problem. It is a plumbing problem, and plumbing can be
            fixed.
          </Lede>

          <ul className="mt-10 space-y-3 text-left">
            {PAINS.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3.5 rounded-2xl border border-bp-edge bg-white px-5 py-4"
              >
                <span className="mt-0.5 shrink-0 text-[17px]">😩</span>
                <span className="text-[16px] leading-[1.6] text-bp-ink">{p}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-9 max-w-[560px] text-[17px] font-semibold leading-[1.6] text-bp-ink">
            You are not short of customers. You are short of a place to send them.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- the flow */}
      <section className="border-b border-bp-edge py-16 text-center sm:py-20">
        <div className={WRAP}>
          <H2>What it looks like instead</H2>
          <Lede>
            The same customer, the same Instagram post. Only now there is somewhere for them to
            go.
          </Lede>

          <ol className="mt-11 grid gap-3 sm:grid-cols-3">
            {[
              ["They see your post", "On Instagram, like today."],
              ["They tap your store link", "Prices, sizes and colours, all there."],
              ["They pay", "UPI, card or cash on delivery."],
              ["You get the order", "In one screen, with the address."],
              ["You ship it", "Courier booked from the same screen."],
              ["They come back", "Because now they are your customer."],
            ].map(([t, d], i) => (
              <li
                key={t}
                className="rounded-3xl border border-bp-edge bg-white p-6 text-left"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 font-display text-[15px] font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-[17.5px] font-bold tracking-[-0.02em] text-bp-ink">
                  {t}
                </h3>
                <p className="mt-2 text-[15px] leading-[1.6] text-bp-mute">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ----------------------------------------------------- the features */}
      <section className="border-b border-bp-edge bg-bp-mist/50 py-16 text-center sm:py-20">
        <div className={WRAP}>
          <H2>What your store does</H2>
          <Lede>
            Built for clothes, not for a generic shop. Everything below is part of the store, not
            an extra you buy later.
          </Lede>

          <div className="mt-11 grid gap-4 text-left sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.t} className="rounded-3xl border border-bp-edge bg-white p-6 sm:p-7">
                <div className="flex items-start gap-3">
                  <Tick />
                  <h3 className="font-display text-[18.5px] font-bold leading-[1.3] tracking-[-0.022em] text-bp-ink">
                    {f.t}
                  </h3>
                </div>
                <p className="mt-3 pl-[34px] text-[15.5px] leading-[1.62] text-bp-mute">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <Cta>Get my free store plan</Cta>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- AI */}
      <section className="border-b border-bp-edge py-16 text-center sm:py-20">
        <div className={NARROW}>
          <Pill>Included</Pill>
          <div className="mt-6">
            <H2>An assistant that runs the boring parts</H2>
          </div>
          <Lede>
            You keep doing the part you are good at, choosing and selling clothes. The store does
            the follow-ups you never get time for.
          </Lede>

          <ul className="mt-10 space-y-3 text-left">
            {AI_DOES.map((a) => (
              <li
                key={a}
                className="flex items-start gap-3.5 rounded-2xl border border-bp-edge bg-white px-5 py-4"
              >
                <Tick />
                <span className="text-[16px] leading-[1.6] text-bp-ink">{a}</span>
              </li>
            ))}
          </ul>

          <p className="mx-auto mt-8 max-w-[560px] text-[15px] leading-[1.62] text-bp-faint">
            For WhatsApp campaigns and a shared inbox on top of this, we connect MnT AI CRM to
            your store. That is a separate product of ours, and we will tell you honestly whether
            you need it yet.
          </p>
        </div>
      </section>

      {/* --------------------------------------------- instagram vs a store */}
      <section className="border-b border-bp-edge bg-bp-mist/50 py-16 text-center sm:py-20">
        <div className={WRAP}>
          <H2>Why not just keep selling on Instagram?</H2>
          <Lede>
            Keep Instagram. It is the best shop window you will ever get for free. It is just a
            bad shop.
          </Lede>

          <div className="mt-11 overflow-x-auto">
            <table className="w-full min-w-[540px] border-collapse text-left">
              <thead>
                <tr className="border-b border-bp-edge">
                  <th scope="col" className="w-[34%] py-4 pr-4 text-[13px] font-bold uppercase tracking-[0.07em] text-bp-faint">
                    <span className="sr-only">What is being compared</span>
                  </th>
                  <th className="py-4 pr-4 text-[13px] font-bold uppercase tracking-[0.07em] text-bp-faint">
                    Instagram only
                  </th>
                  <th className="py-4 text-[13px] font-bold uppercase tracking-[0.07em] text-brand-700">
                    Your own store
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map(([label, insta, own]) => (
                  <tr key={label} className="border-b border-bp-line align-top">
                    <td className="py-4 pr-4 text-[15px] font-semibold text-bp-ink">{label}</td>
                    <td className="py-4 pr-4 text-[15px] leading-[1.55] text-bp-mute">{insta}</td>
                    <td className="py-4 text-[15px] font-semibold leading-[1.55] text-brand-800">
                      {own}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- how it works */}
      <section id="how" className="scroll-mt-8 border-b border-bp-edge py-16 text-center sm:py-20">
        <div className={WRAP}>
          <H2>How we get you selling</H2>
          <Lede>Four steps. You are only really needed in two of them.</Lede>

          <ol className="mt-11 grid gap-4 text-left sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="rounded-3xl border border-bp-edge bg-white p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-700 font-display text-[16px] font-bold text-brand-700">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-[18px] font-bold leading-[1.28] tracking-[-0.022em] text-bp-ink">
                  {s.t}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-bp-mute">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------- own the customer */}
      <section className="border-b border-bp-edge bg-bp-ink py-16 text-center text-white sm:py-20">
        <div className={NARROW}>
          <h2 className="font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-[38px] lg:text-[46px]">
            The customer list is the business
          </h2>
          <p className="mx-auto mt-5 max-w-[620px] text-[17px] leading-[1.62] text-white/70 sm:text-[18.5px]">
            A follower is borrowed. A customer with a phone number, an address and three past
            orders is yours. That list is what you will still have in five years, whatever the
            reach looks like that month.
          </p>

          <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
            {[
              ["Your customer data", "Names, numbers, addresses, order history. Exportable, always."],
              ["Your domain", "yourbrand.com, not somebody else's page."],
              ["No cut of your sales", "The cost of running the store does not follow your revenue up."],
            ].map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-white/12 bg-white/[0.05] p-6">
                <h3 className="font-display text-[17.5px] font-bold tracking-[-0.02em] text-white">
                  {t}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.6] text-white/65">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- the cost */}
      <section className="border-b border-bp-edge bg-bp-ink pb-16 text-center text-white sm:pb-20">
        <div className={WRAP}>
          <h2 className="font-display text-[30px] font-extrabold leading-[1.12] tracking-[-0.035em] sm:text-[38px]">
            What a rented store is costing you
          </h2>
          <p className="mx-auto mt-5 max-w-[600px] text-[16.5px] leading-[1.62] text-white/70">
            Move the sliders to your own numbers. If you are not selling online yet, use what you
            do in the shop, because that is what you will be paying a percentage of.
          </p>

          <div className="mt-11 text-left">
            <CommissionCalculator cta="Get my free store plan" />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ proof */}
      <section className="border-b border-bp-edge py-16 text-center sm:py-20">
        <div className={NARROW}>
          <H2>Who is building it</H2>
          <Lede>
            MnT Future, from Madurai. We build the platform, and we are still there after it goes
            live.
          </Lede>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {ratings.map((r) => (
              <div key={r.source} className="rounded-3xl border border-bp-edge bg-white p-6">
                <div className="font-display text-[30px] font-extrabold tracking-[-0.035em] text-bp-ink">
                  {r.score.toFixed(1)}
                </div>
                <div className="mt-1 text-[13.5px] font-semibold text-bp-mute">{r.source}</div>
              </div>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-[580px] text-[16px] leading-[1.62] text-bp-mute">
            19 client platforms live today, across retail, travel, hospitality, engineering and
            healthcare. Real systems that real businesses run on every day, not demos.
          </p>

          <div className="mt-7 flex justify-center">
            <Link
              href="/in/work/clients"
              className="inline-flex h-[52px] items-center justify-center rounded-full border border-bp-edge bg-white px-7 text-[15.5px] font-bold text-bp-ink transition-colors hover:border-brand-400 hover:text-brand-800"
            >
              See the client work
            </Link>
          </div>

          <p className="mx-auto mt-7 text-[14px] leading-[1.6] text-bp-faint">
            We have not built a fashion store for a client yet. Yours would be the first, and we
            would rather tell you that than show you somebody else&apos;s logo.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------- form */}
      <section
        id="lead-form"
        className="scroll-mt-6 border-b border-bp-edge bg-bp-mist/60 py-16 text-center sm:py-20"
      >
        <div className={NARROW}>
          <Pill>Free, no obligation</Pill>
          <div className="mt-6">
            <H2>Get your online store plan</H2>
          </div>
          <Lede>
            Tell us what you sell. We will come back with what your store would look like, what
            it would take to launch, and what it would cost to run. If you are better off staying
            where you are, we will say that too.
          </Lede>

          <div className="mx-auto mt-10 max-w-[560px] rounded-3xl border border-bp-edge bg-white p-6 text-left sm:p-8">
            <LandingLeadForm variant="fashion" id="fashion-lead-submit" />
          </div>

          <ul className="mx-auto mt-8 flex max-w-[560px] flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[14px] text-bp-faint">
            <li>30 minute call</li>
            <li>No sales script</li>
            <li>We reply on WhatsApp</li>
          </ul>
        </div>
      </section>

      {/* -------------------------------------------------------------- faq */}
      <section className="border-b border-bp-edge py-16 text-center sm:py-20">
        <div className={NARROW}>
          <H2>Questions people actually ask</H2>

          <div className="mt-10 space-y-3 text-left">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-bp-edge bg-white px-5 py-4 open:bg-bp-mist/40 sm:px-6"
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-1 text-[16.5px] font-bold leading-[1.45] tracking-[-0.015em] text-bp-ink [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="mt-1 shrink-0 text-brand-700 transition-transform group-open:rotate-45">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-3.5 text-[15.5px] leading-[1.65] text-bp-mute">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------ close */}
      <section className="bg-brand-700 py-16 text-center text-white sm:py-20">
        <div className={NARROW}>
          <h2 className="font-display text-[32px] font-extrabold leading-[1.1] tracking-[-0.038em] sm:text-[42px] lg:text-[50px]">
            Your clothes are ready. The shop is not.
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[17.5px] leading-[1.6] text-white sm:text-[19px]">
            Every day you wait, somebody asks you the price and buys it somewhere else. Let us
            build you the place to send them.
          </p>

          <div className="mt-9 flex justify-center">
            <a
              href="#lead-form"
              className="inline-flex h-[60px] w-full max-w-[400px] items-center justify-center gap-2.5 rounded-full bg-white px-9 text-[17px] font-bold text-brand-800 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.6)] transition-all hover:-translate-y-0.5 sm:w-auto"
            >
              Start my online fashion store
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <p className="mt-6 text-[14.5px] text-white/85">
            MnT Future · Madurai · Free 30 minute call
          </p>
        </div>
      </section>
    </div>
  );
}
