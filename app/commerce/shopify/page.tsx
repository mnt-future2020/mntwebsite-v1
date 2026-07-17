import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import SectionTitle from "@/components/SectionTitle";
import BrandLogo from "@/components/BrandLogo";
import FAQ from "@/components/FAQ";
import { Breadcrumbs } from "@/components/blocks";
import { site } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/commerce/shopify", {
    title: "Shopify Store Development — Official Shopify Partner | MnT Future",
    description:
      "Official Shopify Partner builds: fast, conversion-ready Shopify stores, advanced Hydrogen (React) headless storefronts, AI search, agent-ready feeds — and a designed upgrade path to a custom AI-native platform.",
  });
}

const chips = [
  "Official Shopify Partner",
  "Live in weeks",
  "Hydrogen (React) storefronts",
  "AI & agent-ready add-ons",
  "Upgrade path to custom",
];

const services = [
  {
    no: "01",
    title: "Store design & build",
    desc: "Conversion-first Shopify stores — theme engineering, not template mush. Fast, accessible, and on-brand from day one.",
  },
  {
    no: "02",
    title: "Apps, integrations & migrations",
    desc: "ERP, 3PL, email, and analytics connected properly — and clean replatforms onto Shopify without losing SEO or order history.",
  },
  {
    no: "03",
    title: "AI & agent-ready on Shopify",
    desc: "AI search and recommendations, structured product feeds, and agentic-checkout readiness — the AI-native layer, on Shopify.",
  },
  {
    no: "04",
    title: "CRO & ongoing growth",
    desc: "A/B testing, Core Web Vitals, and ADA-minded accessibility on a retainer — lift revenue from the traffic you already have.",
  },
];

const shopifyRight = [
  "Launching in weeks matters more than custom logic",
  "A standard D2C catalog and checkout fit your model",
  "A lean team wants managed, battle-tested infrastructure",
  "Proven Shopify apps cover most of your needs",
];

const customRight = [
  "Complex catalogs, marketplaces, or B2B/wholesale logic",
  "Checkout, pricing, or workflows no template allows",
  "Deep ERP, OMS, PIM, and 3PL orchestration",
  "AI search, assistants, and agents at the platform core",
  "You want to own the platform — not rent its ceiling",
];

const path = [
  {
    no: "01",
    title: "Launch on Shopify",
    desc: "An official-partner build: store, theme, apps, analytics, and accessibility — live in weeks, selling from day one.",
  },
  {
    no: "02",
    title: "Make it sell harder",
    desc: "AI search and recommendations, agent-ready product feeds, CRO sprints — the growth layer, without replatforming.",
  },
  {
    no: "03",
    title: "Graduate without trauma",
    desc: "When you hit Shopify's ceiling, the same team carries your data, SEO, and integrations onto a custom AI-native platform.",
  },
];

const faq = [
  {
    q: "Do you build Shopify stores?",
    a: "Yes — MnT Future is an official Shopify Partner. We design and build conversion-ready Shopify stores, handle apps, integrations, and migrations, and add the AI layer: search, recommendations, and agent-ready product feeds.",
  },
  {
    q: "Shopify or a custom platform — which should we choose?",
    a: "Shopify when speed matters: standard D2C catalog, lean team, launch in weeks. Custom when scale demands: complex catalogs, marketplaces, B2B logic, unique checkout, deep integrations, and AI at the core. We build both, so our recommendation is an architecture decision, not a sales pitch — that's what the free workshop settles.",
  },
  {
    q: "Can a Shopify store be AI-native and agent-ready?",
    a: "Substantially, yes. Shopify already participates in the agent ecosystem — stores expose a storefront MCP endpoint, publish Google UCP manifests, and can sell through ChatGPT via the Agentic Commerce Protocol. We layer on AI search and recommendations and clean, structured product data so agents can actually find and trust your catalog. The deepest agent workflows — custom ops agents, platform-level AI with approval gates — need platform control, which is where our custom AI-native builds come in.",
  },
  {
    q: "What is Hydrogen, and when do you use it?",
    a: "Hydrogen is Shopify's official React framework for building fully custom, headless storefronts, deployed on Oxygen, Shopify's edge hosting. We use it when a brand wants app-grade UX, custom pages, and logic beyond what themes allow — while keeping Shopify's checkout, admin, and infrastructure underneath. It's the natural middle step between a theme store and a fully custom platform.",
  },
  {
    q: "Can we start on Shopify and move to a custom platform later?",
    a: "That's the designed path, not an afterthought. Theme store, Hydrogen headless storefront, custom AI-native platform — each step carries forward. Because the same senior team builds all three, graduating is a planned migration — catalog, customers, SEO, and integrations carried over — not a re-platform trauma with a new agency.",
  },
  {
    q: "What does a Shopify build include?",
    a: "Store architecture and theme or Hydrogen build, app selection and integrations, payments and shipping setup, analytics, ADA-minded accessibility, and launch support — typically live in weeks. AI search, agent-ready feeds, and CRO are available as add-ons or a growth retainer.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Shopify store development",
  provider: { "@type": "Organization", name: site.name, legalName: site.legalName },
  areaServed: ["United States"],
};

export default function ShopifyBuilds() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* HERO */}
      <section className="border-b border-line bg-gradient-to-b from-mist to-white">
        <div className="mx-auto max-w-[1200px] px-5 pb-[72px] pt-10 sm:px-7 lg:pt-12">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Commerce Platforms", href: "/commerce" },
              { label: "Shopify Store Builds" },
            ]}
            tone="light"
          />
          <div className="mt-9 animate-fade-up">
            <div className="flex items-center gap-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">
              <BrandLogo slug="shopify" className="h-[18px] w-[18px]" />
              Official Shopify Partner
            </div>
            <h1 className="mt-[18px] max-w-[760px] font-display text-[34px] font-extrabold leading-[1.12] tracking-[-0.02em] text-ink sm:text-[46px]">
              Shopify stores, built by platform engineers.
            </h1>
            <p className="mt-5 max-w-[640px] text-[17px] leading-[1.65] text-slatey">
              When speed matters, we launch fast, conversion-ready Shopify stores — designed, built,
              and made AI-ready by the same senior team that engineers custom AI-native commerce
              platforms. Start where your stage demands. Never outgrow your team.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              {chips.map((c) => (
                <span key={c} className="inline-flex items-center gap-[7px] text-[13px] font-semibold text-slatey">
                  <Icon name="check" className="h-[15px] w-[15px] text-brand-700" />
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE BUILD ON SHOPIFY */}
      <section className="mx-auto max-w-[1200px] px-5 pb-24 pt-[72px] sm:px-7">
        <Reveal>
          <SectionTitle
            eyebrow="What we build on Shopify"
            title="A partner build, not a template drop."
            sub="Everything a serious store needs at launch — and the growth layer that keeps earning after it."
          />
        </Reveal>
        <div className="mt-[52px] grid gap-[22px] md:grid-cols-2">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 70}>
              <div className="h-full rounded-[14px] border border-slate-200 bg-white p-8 shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_16px_36px_-16px_rgba(14,102,194,0.22)]">
                <div className="font-display text-[13px] font-bold text-brand-700">{s.no}</div>
                <h3 className="mt-3.5 font-display text-[21px] font-bold text-ink">{s.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.65] text-slatey">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ADVANCED: HYDROGEN */}
        <Reveal delay={280}>
          <div className="mt-[22px] grid overflow-hidden rounded-[14px] border border-slate-200 bg-gradient-to-br from-slate-50 to-brand-50/60 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="p-8 sm:p-10">
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.12em] text-brand-700">
                Advanced Shopify
              </div>
              <h3 className="mt-3 font-display text-[24px] font-bold text-ink">
                Hydrogen storefronts — headless, without leaving Shopify.
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-slatey">
                When a theme becomes the ceiling but the platform isn&apos;t, we build with{" "}
                <strong className="font-semibold text-ink">Hydrogen</strong> — Shopify&apos;s React
                framework for fully custom storefronts, deployed on Oxygen, Shopify&apos;s edge
                hosting. App-grade UX, custom pages and logic, sub-second performance — with
                Shopify&apos;s checkout, admin, and infrastructure still underneath.
              </p>
            </div>
            <div className="flex flex-col justify-center gap-3 border-t border-slate-200 p-8 sm:p-10 lg:border-l lg:border-t-0">
              {[
                "Hydrogen + Oxygen — Shopify's own React stack",
                "Fully custom storefront UX, no theme limits",
                "Shopify checkout & admin underneath",
                "The natural step before going fully custom",
              ].map((p) => (
                <span key={p} className="flex items-start gap-[9px] text-[13.5px] font-medium text-slate-700">
                  <Icon name="check" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand-700" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* SHOPIFY VS CUSTOM — the positioning centerpiece */}
      <section className="border-y border-line bg-mist py-24">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
          <Reveal>
            <SectionTitle
              eyebrow="An honest recommendation"
              title="Shopify when speed matters. Custom when scale demands."
              sub="We build both — so which one we recommend is an architecture decision, not a sales pitch. This is roughly how we call it in a workshop:"
            />
          </Reveal>
          <div className="mt-[52px] grid items-stretch gap-[22px] lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-[14px] border border-slate-200 bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)]">
                <div className="flex items-center gap-2.5">
                  <BrandLogo slug="shopify" className="h-6 w-6" />
                  <h3 className="font-display text-2xl font-bold text-ink">Shopify is right when</h3>
                </div>
                <div className="mt-[22px] flex flex-col gap-3">
                  {shopifyRight.map((p) => (
                    <span key={p} className="flex items-start gap-[9px] text-[14.5px] font-medium text-slate-700">
                      <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-700" />
                      {p}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-6 text-[13.5px] leading-relaxed text-slate-500">
                  Live in weeks, managed infrastructure, and an ecosystem of proven apps — the
                  pragmatic start for most D2C brands.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="relative flex h-full flex-col rounded-[14px] border-2 border-brand-500 bg-white p-[30px] shadow-[0_20px_44px_-18px_rgba(32,149,241,0.3)]">
                <span className="absolute right-5 top-5 rounded-full bg-brand-700 px-3 py-[5px] text-[11px] font-semibold tracking-[0.04em] text-white">
                  OUR FLAGSHIP
                </span>
                <h3 className="font-display text-2xl font-bold text-ink">
                  Custom AI-native is right when
                </h3>
                <div className="mt-[22px] flex flex-col gap-3">
                  {customRight.map((p) => (
                    <span key={p} className="flex items-start gap-[9px] text-[14.5px] font-medium text-slate-700">
                      <Icon name="check" className="mt-1 h-3.5 w-3.5 shrink-0 text-brand-700" />
                      {p}
                    </span>
                  ))}
                </div>
                <p className="mt-auto pt-6 text-[13.5px] leading-relaxed text-slate-500">
                  If you can spec it, we can build it — search, agents, checkout, integrations,
                  compliance. Custom removes the ceiling entirely.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* THE UPGRADE PATH */}
      <section className="mx-auto max-w-[1200px] px-5 py-24 sm:px-7">
        <Reveal>
          <SectionTitle
            eyebrow="Land small, expand big"
            title="Start on Shopify. Graduate to custom. Same team."
            sub="Most agencies sell you one or the other. We engineer the path between them — so choosing Shopify today never costs you the platform you'll need tomorrow."
          />
        </Reveal>
        <div className="mt-[52px] grid items-stretch gap-[22px] lg:grid-cols-3">
          {path.map((m, i) => (
            <Reveal key={m.title} delay={i * 80}>
              <div className="flex h-full flex-col rounded-[14px] border border-slate-200 bg-white p-[30px] shadow-[0_1px_3px_rgba(14,27,46,0.04)]">
                <div className="font-display text-[13px] font-bold text-brand-700">{m.no}</div>
                <h3 className="mt-3.5 font-display text-2xl font-bold text-ink">{m.title}</h3>
                <p className="mt-[11px] text-[14.5px] leading-[1.65] text-slatey">{m.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="mt-8 text-center">
            <Link
              href="/commerce"
              className="inline-flex items-center gap-[7px] text-sm font-semibold text-brand-700 transition-colors hover:text-brand-800"
            >
              Explore our custom commerce platforms
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-mist py-24">
        <div className="mx-auto max-w-[860px] px-5 sm:px-7">
          <Reveal>
            <SectionTitle
              eyebrow="FAQ"
              title="Shopify questions, answered straight"
              sub="The same answers we give on a discovery call."
              className="mb-11"
            />
          </Reveal>
          <FAQ items={faq} />
        </div>
      </section>

      <div className="pt-24">
        <CTASection
          title="Not sure if it's Shopify or custom? That's the workshop."
          body="A free architecture session with a senior consultant — we look at your catalog, integrations, and roadmap, and tell you honestly which build fits your stage."
        />
      </div>
    </>
  );
}
