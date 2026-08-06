import type { Metadata } from "next";
import ProductPage, { type ProductConfig } from "@/components/ProductPage";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/products/commerce-india", {
    title: "MnT Commerce India: Ecommerce with GST Built In | MnT Future",
    description:
      "Your own ecommerce platform with India GST handled natively: CGST/SGST vs IGST by place of supply, per-HSN slabs, gapless invoicing. No commission on orders.",
  });
}

const config: ProductConfig = {
  slug: "/in/products/commerce-india",
  name: "MnT Commerce India",
  eyebrow: "Ecommerce platform",
  h1: (
    <>
      Your own store, with GST done <span className="text-brand-700">properly</span>.
    </>
  ),
  heroSub:
    "An ecommerce platform you run yourself, with India tax built into the core rather than bolted on with a plugin. Place of supply decides CGST and SGST or IGST, slabs follow the HSN code, and every invoice carries a legal serial number that never skips. No monthly rent, no cut of your orders.",
  forWho:
    "Indian brands, retailers and distributors selling online at a volume where a percentage of every order has become real money, and where a tax audit would be an uncomfortable afternoon.",
  chips: [
    "GST in the core, not a plugin",
    "Gapless invoice numbering",
    "No commission per order",
    "Runs on servers you own",
  ],

  problem: {
    title: "You are renting your storefront and hand-patching your compliance.",
    sub: "Both problems get worse as you grow, which is the wrong direction for a problem to move.",
    points: [
      "A monthly platform fee plus a percentage of every order. At small volume it is annoying; at real volume it is a salary you are paying for nothing.",
      "Your customer list, order history and behaviour sit on someone else's platform, under terms they can change and you cannot negotiate.",
      "GST arrives as a plugin. Place of supply gets decided by a setting somebody guessed at, and nobody has checked whether interstate orders are charging IGST correctly.",
      "Invoice numbers come from whatever the plugin does. If a series has gaps, that is a problem you find out about during an audit rather than before one.",
      "Refunds happen but credit notes get made in a spreadsheet afterwards, by hand, when someone remembers.",
      "Anything genuinely specific to how your business works turns into a request the platform will not build and you cannot build yourself.",
    ],
  },

  getsTitle: "What it does, and what that changes.",
  gets: [
    {
      icon: "shield",
      what: "GST decided correctly, per order",
      does: "Place of supply determines CGST and SGST or IGST on every order, automatically. Slabs follow the HSN code on the product rather than a single site-wide rate. The logic is in the platform core, so it applies everywhere and cannot be forgotten on one checkout path.",
    },
    {
      icon: "records",
      what: "Invoice numbers that never skip",
      does: "A gapless serial per financial year, generated the moment an order is placed, on Indian financial-year boundaries. This is a legal requirement most platforms treat as a formatting preference, and it is the first thing an auditor checks.",
    },
    {
      icon: "wallet",
      what: "Credit notes without anyone remembering",
      does: "A refund produces a credit note automatically, on its own gapless serial. No spreadsheet, no month-end reconciliation of what got refunded but never documented.",
    },
    {
      icon: "tag",
      what: "Gift cards with a real ledger",
      does: "Issue them, let customers check a balance, redeem across several orders, and see every movement in a ledger that actually balances. Not a discount code pretending to be a gift card.",
    },
    {
      icon: "bell",
      what: "Abandoned carts, recovered",
      does: "Detects the abandonment, sends the reminder, and reports what actually came back as revenue rather than how many emails were sent. The cheapest revenue in any store, and the one most often left switched off.",
    },
    {
      icon: "network",
      what: "Product feeds for Google",
      does: "Google Merchant XML and CSV feeds generated from your catalogue and served behind a token. Your Shopping listings stay in step with your real stock and prices instead of drifting.",
    },
    {
      icon: "layers",
      what: "Suppliers and purchase orders",
      does: "Track who you buy from and what you have ordered, linked to the products they supply. The buying side of the business in the same system as the selling side.",
    },
    {
      icon: "cart",
      what: "Everything a store needs",
      does: "Catalogue, cart, checkout, orders, returns, inventory, payments, and promotions including coupons, automatic discounts, BOGO and scheduled offers. The commodity parts, already hardened.",
    },
  ],

  ownsTitle: "Owned, not rented.",
  owns: [
    {
      title: "No cut of your orders",
      desc: "No commission, no GMV percentage, no per-order fee. Your best month costs the same to run as your worst one, which changes what a growth push is actually worth.",
    },
    {
      title: "Your data, your servers",
      desc: "Customers, orders and catalogue live on infrastructure you control, in India. You can query your own database, run your own reports, and connect anything you like to it.",
    },
    {
      title: "Built to be changed",
      desc: "The thing your business does differently is the thing a rented platform will not build for you. Here it is a module we write, and one you can keep changing after we hand over.",
    },
  ],
  customise: [
    "Your storefront design and brand, built to your identity rather than a theme with your logo dropped in.",
    "The India payment gateways you actually use: Razorpay, PayU, Cashfree, UPI, and cash on delivery with the reconciliation that goes with it.",
    "Shipping and courier integrations, with rates and serviceability by pincode.",
    "Connected to what you already run: Tally or your ERP, your warehouse system, your accounting.",
    "Your catalogue structure, variants and HSN mapping, migrated from wherever it lives today.",
    "Modules for whatever your business does that nothing off the shelf covers.",
    "Deployment, monitoring and a support contract, or a full handover to your own team.",
  ],

  needsTitle: "What we need from your side.",
  needs: [
    {
      label: "Somewhere to run it",
      note: "A server or cloud account with PostgreSQL. We size it for your order volume and can manage it for you or hand it to your team.",
    },
    {
      label: "Your catalogue",
      note: "Products, variants, prices and images in whatever form they exist. We migrate from your current platform or from spreadsheets.",
    },
    {
      label: "HSN codes",
      note: "The HSN code and GST slab per product category. If this has never been done properly, we will help you get it right, because everything downstream depends on it.",
    },
    {
      label: "GST registration details",
      note: "Your GSTIN and the state of registration, which is what place-of-supply logic is calculated against.",
    },
    {
      label: "Payment gateway account",
      note: "Razorpay, PayU, Cashfree or your existing provider. We integrate whichever you already have rather than pushing you to switch.",
    },
    {
      label: "One person to decide",
      note: "Somebody who knows how the business actually runs: how you price, who gets which rate, how returns really work.",
    },
  ],
  timeline: [
    { no: "01", title: "Scope and data", desc: "We map your catalogue, tax setup, integrations and the parts of your business that are genuinely specific." },
    { no: "02", title: "Platform and tax", desc: "Deployed, catalogue migrated, HSN and GST configured, and tested against real order scenarios including interstate." },
    { no: "03", title: "Storefront and payments", desc: "Your storefront built, payment gateway and courier connected, checkout tested end to end with real money." },
    { no: "04", title: "Live, then supported", desc: "Go live, watch it closely through the first weeks, and either keep running it for you or hand it over with documentation." },
  ],

  origin: {
    title: "Our own product, on a commerce core we did not write.",
    body: "MnT Commerce India is ours, closed source, built on Medusa v2 for the commodity commerce core. That choice came from evidence: we audited a fully custom commerce stack and found 42 flow bugs, around ten of them in the core itself, including overselling, payment verification and returns. Cart, stock, payment and returns work identically for every business on earth, and rewriting them only buys you the same bugs again more slowly. So we take that core hardened, and spend our engineering on the India layer, which is genuinely ours: the GST logic, gapless invoicing, credit notes, gift cards, recovery, feeds and purchasing.",
    note: "Where it stands today: GST, invoicing, credit notes, gift cards, abandoned-cart recovery and product feeds are built and working, and purchasing is scaffolded. Digital products and the storefront are in progress. POS, delivery fleet and processing are the next phase and are not built yet. We would rather tell you that now than in month three.",
  },

  faq: [
    {
      q: "How is this different from Shopify?",
      a: "Two things. You are not paying a monthly fee plus a percentage of every order, and GST is handled in the platform core rather than by an app you hope is configured correctly. The trade is that you run it. For a store doing small volume Shopify is often the right answer, and we will say so.",
    },
    {
      q: "What does gapless invoice numbering actually mean?",
      a: "Indian tax rules require invoice serial numbers to run in an unbroken sequence within a financial year. If your platform skips numbers when an order fails or gets cancelled, you have gaps, and gaps are what an auditor asks about. This platform generates the serial at the point of order and never leaves holes in the series.",
    },
    {
      q: "Can it handle interstate orders correctly?",
      a: "Yes, and that is the specific case generic platforms get wrong. Place of supply is compared against your state of registration to decide CGST and SGST or IGST, per order, automatically. We test this with real interstate scenarios before you go live.",
    },
    {
      q: "Can we migrate from our current platform?",
      a: "Usually yes. Products, variants, customers and order history migrate from most platforms. We assess what will and will not come across before you commit, and we are straight about the parts that will not.",
    },
    {
      q: "Is there a storefront included?",
      a: "The admin, the tax engine and the commerce APIs are ready now. The storefront is built for you as part of the engagement, to your brand rather than from a theme. A packaged storefront is on the roadmap but is not something we will pretend is finished.",
    },
    {
      q: "Do you support ONDC?",
      a: "It is a build, not a switch we flip. Tell us what you need from ONDC and we will scope it honestly, including whether it is worth doing for your category yet.",
    },
    {
      q: "What if we want to run it ourselves later?",
      a: "That is a supported outcome, not a penalty. It runs on your infrastructure from day one, and we hand over with documentation and training whenever you want to take it in-house.",
    },
  ],

  cta: {
    title: "Work out what your platform actually costs you.",
    body: "Bring your monthly platform fee, your order volume and your commission rate, and we will put a real number on what you are paying to rent your own store. Then we will show you what running your own would look like, honestly, including when it is not worth it.",
  },
};

export default function Page() {
  return <ProductPage config={config} />;
}
