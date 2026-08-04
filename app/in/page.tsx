import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveMetadata } from "@/lib/seo";
import IndiaHero from "@/components/IndiaHero";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import Partners from "@/components/Partners";
import { QA } from "@/components/FAQ";
import BlueprintFaq from "@/components/BlueprintFaq";
import { caseStudies } from "@/lib/caseStudies";
import { SectionHead, BpButton, MakerMark, PAGE } from "@/components/blueprint";
import BlueprintMotion from "@/components/BlueprintMotion";
import { inEcommerceNav, inAiNav, inProductsNav } from "@/lib/regions";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in", {
    title: "MnT Future India: Ecommerce Platforms, AI Systems & Products",
    description:
      "MnT Future builds ecommerce platforms with GST built in, AI agents and automation that reach production, and ready products for Indian businesses: MnT AI Desk, MnT AI CRM and MnT Commerce India.",
  });
}

const proofStats = [
  { value: "3 platforms", label: "Live client platforms, built end to end" },
  { value: "GST-native", label: "Invoicing, gapless serials, credit notes" },
  { value: "5 stages", label: "Discover · Design · Build · Deploy · Optimize" },
  { value: "100%", label: "Senior-engineer delivery" },
];

// Three lines, deliberately different in kind: a build service, an engineering
// practice, and shipping products. Saying that out loud stops a visitor
// wondering whether AI Agent Development and MnT AI CRM are the same purchase.
const verticals = [
  {
    kicker: "Ecommerce",
    title: "Ecommerce platform development",
    desc: "Your own platform rather than a rented one. Storefronts, marketplaces and B2B, with GST invoicing, UPI and Indian payment gateways handled properly instead of bolted on with plugins.",
    href: inEcommerceNav.href,
    icon: "store" as const,
    count: "6 services",
    items: inEcommerceNav.children.slice(0, 4),
    cta: "Explore ecommerce",
  },
  {
    kicker: "AI",
    title: "AI that reaches production",
    desc: "Consultation, automation, agents and complete custom applications. Delivered by senior engineers embedded in your team who stay until the system runs in production, not by a consultant who hands over a report.",
    href: inAiNav.href,
    icon: "ai" as const,
    count: "4 services",
    items: inAiNav.children.slice(0, 4),
    cta: "Explore AI",
  },
  {
    kicker: "Products",
    title: "Applications ready to brand",
    desc: "Three applications we host, brand and customise for you: a support desk, a WhatsApp CRM with automation and AI, and an ecommerce platform with GST built in. Weeks, not a year, and you own what you get.",
    href: inProductsNav.href,
    icon: "grid" as const,
    count: "3 products",
    items: inProductsNav.children,
    cta: "See the products",
  },
];

const stages = [
  {
    no: "01",
    title: "Discover",
    desc: "We look at your data, your use case and what production would actually take. You get a costed path, not a proposal full of maybes.",
  },
  {
    no: "02",
    title: "Design",
    desc: "Architecture, model choice, and the checks we will judge it by. Agreed before anybody writes code, so nobody argues about done later.",
  },
  {
    no: "03",
    title: "Build",
    desc: "Senior engineers writing code inside your environment, alongside your team. You watch it get built rather than waiting for a handover.",
  },
  {
    no: "04",
    title: "Deploy",
    desc: "Live, monitored, and on your own servers or private cloud where your data governance needs it. This is the stage most AI projects never reach.",
  },
  {
    no: "05",
    title: "Optimize",
    desc: "Evaluated against the checks from stage two, tuned for cost, and watched for drift. We stay until it runs without us.",
  },
];

const whyMnt = [
  {
    icon: "users" as const,
    title: "Embedded, not handed over",
    desc: "Our engineers work inside your team and your environment. The difference from a consultancy is that we own the outcome, and the difference from a contractor is that we ship a working system rather than billing hours.",
  },
  {
    icon: "compass" as const,
    title: "A method with a name",
    desc: "Discover, Design, Build, Deploy, Optimize. Written down, followed on every engagement, and the same one our founder is writing a handbook on. Most firms selling AI services in India have no documented method at all.",
  },
  {
    icon: "shield" as const,
    title: "You own everything",
    desc: "Your platform, your data, your servers, your source code. No per-seat licence that grows with your team, no commission on your orders, and nothing that stops working the day our contract ends.",
  },
  {
    icon: "bolt" as const,
    title: "Senior engineers only",
    desc: "No juniors on client work. Embedded engineering only works when the person embedded has shipped this before, so that is the only kind of person we send.",
  },
];

const homeFaq: QA[] = [
  {
    q: "What does MnT Future do in India?",
    a: "Three things. We build custom ecommerce platforms with GST, UPI and Indian payment gateways handled natively. We deliver AI work that reaches production: consultation, automation, agents, and complete custom applications. And we offer three ready products we brand and customise for you: MnT AI Desk, MnT AI CRM and MnT Commerce India.",
  },
  {
    q: "What is Forward Deployed Engineering?",
    a: "A senior engineer works inside your team and your environment, designing and building your system and staying until it runs in production. It is not consulting, because we write and own the code. It is not staff augmentation, because we own the outcome rather than billing hours. Our method is Discover, Design, Build, Deploy, Optimize.",
  },
  {
    q: "Why do most AI projects never go live?",
    a: "Because getting a model to answer well in a demo and getting a system to run reliably in production are different problems. Production needs evaluation, monitoring, cost control, security review and integration with systems that already exist. That deployment work is what we do, and it is why we stay past the build.",
  },
  {
    q: "Are your products open source?",
    a: "MnT AI Desk and MnT AI CRM start from mature open-source platforms, which is exactly why you get them in weeks instead of a year. We add our own AI layer, your branding, your integrations and our support on top. MnT Commerce India is our own closed-source product, built on the Medusa commerce core with an India GST layer we wrote ourselves.",
  },
  {
    q: "Can we run everything on our own servers?",
    a: "Yes. Every product and platform we deliver can run on your own infrastructure or your private cloud. For AI work where data governance requires it, we deploy on-premise. Your data never has to leave your environment.",
  },
  {
    q: "How do we start?",
    a: "Book a strategy session and tell us the bottleneck. For AI work the usual first step is a short discovery: we assess your data, the use case, and what reaching production would take, and you get a costed path before committing to a build.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

export default function IndiaHome() {
  // India leads with client platforms. All three were built here, which on this
  // side of the site is the strongest proof we have rather than a footnote.
  const clientWork = caseStudies.filter((c) => c.group === "client").slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <BlueprintMotion />
      <IndiaHero />

      {/* PROOF BAR */}
      <section className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} grid border-l border-bp-hair sm:grid-cols-2 lg:grid-cols-4`}>
          {proofStats.map((s) => (
            <div key={s.label} className="border-b border-r border-bp-hair px-6 py-7">
              <div
                data-decode
                className="font-display text-[26px] font-bold tracking-[-0.03em] text-bp-ink lg:text-[30px]"
              >
                {s.value}
              </div>
              <div className="mt-2 text-[13.5px] leading-[1.55] text-bp-mute">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <Partners />

      {/* 01 WHAT WE BUILD */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="01"
            total="05"
            eyebrow="What we build"
            title="Three lines, and they are not the same purchase."
            sub="One is a platform we build for you. One is engineering we do inside your team. One is a product we already have, branded and customised for you. Knowing which you need is usually the first conversation."
          />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 lg:grid-cols-3">
            {verticals.map((v) => (
              <div
                key={v.kicker}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="relative flex flex-col overflow-hidden border-b border-r border-bp-line bg-white transition-shadow duration-250 hover:shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)]"
              >
                <div
                  className="relative overflow-hidden border-b border-bp-line p-7 lg:p-8"
                  style={{
                    background: "linear-gradient(135deg,rgba(32,149,241,0.07),rgba(62,81,182,0.045))",
                  }}
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
                    <Icon name={v.icon} className="h-[200px] w-[200px]" />
                  </div>
                  <div className="relative flex items-start justify-between gap-4">
                    <span className="flex h-12 w-12 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                      <Icon name={v.icon} className="h-6 w-6" />
                    </span>
                    <span className="border border-[#DCE6F2] bg-white px-[11px] py-1.5 font-mono text-[11px] tracking-[0.08em] text-bp-mute">
                      {v.count}
                    </span>
                  </div>
                  <div className="relative mt-[30px] font-mono text-[11px] uppercase tracking-[0.2em] text-brand-700">
                    {v.kicker}
                  </div>
                  <h3 className="relative mt-3 font-display text-[21px] font-bold leading-[1.14] tracking-[-0.028em] text-bp-ink lg:text-[25px]">
                    {v.title}
                  </h3>
                </div>

                <div className="flex flex-1 flex-col p-7 lg:p-8">
                  <p className="m-0 text-[15.5px] leading-[1.72] text-bp-mute">{v.desc}</p>
                  <div className="mt-7 border-t border-bp-hair">
                    {v.items.map((it) => (
                      <Link
                        key={it.href}
                        href={it.href}
                        className="group flex items-center justify-between gap-3 border-b border-bp-hair py-3 text-[14px] text-bp-body transition-colors hover:text-brand-700"
                      >
                        {it.label}
                        <Icon
                          name="arrow"
                          className="h-3.5 w-3.5 shrink-0 text-bp-faint transition-all group-hover:translate-x-0.5 group-hover:text-brand-700"
                        />
                      </Link>
                    ))}
                  </div>
                  <div className="mt-auto pt-7">
                    <BpButton href={v.href} variant="outline">
                      {v.cta}
                    </BpButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 HOW WE DELIVER */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="02"
            total="05"
            eyebrow="How we deliver"
            title="A method that ends in production."
            sub="Most AI work in India stops at a pilot that impressed a room and then went nowhere. Getting a demo to answer well and getting a system to run reliably are different problems, and the second one is the job. This is how we do it."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 sm:grid-cols-2 lg:grid-cols-5">
            {stages.map((s) => (
              <div key={s.no} data-stagger className="border-b border-r border-bp-edge bg-white p-6 lg:p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">{s.no}</span>
                  <span className="h-px flex-1 bg-bp-hair" />
                </div>
                <h3 className="mt-5 font-display text-[18px] font-bold tracking-[-0.022em] text-bp-ink">
                  {s.title}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-bp-mute">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
            <BpButton href="/in/ai/forward-deployed-engineering">
              How Forward Deployed Engineering works
            </BpButton>
            <p className="m-0 max-w-[46ch] text-[14px] leading-[1.6] text-bp-faint">
              The same method our founder is writing a handbook on: <em>The Forward Deployed
              Engineer Handbook</em>.
            </p>
          </div>
        </div>
      </section>

      {/* 03 WHY */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="03"
            total="05"
            eyebrow="Why MnT Future"
            title="What you are actually buying."
          />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 sm:grid-cols-2">
            {whyMnt.map((w) => (
              <div
                key={w.title}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="border-b border-r border-bp-line bg-white p-7 lg:p-9"
              >
                <span className="flex h-11 w-11 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                  <Icon name={w.icon} className="h-[21px] w-[21px]" />
                </span>
                <h3 className="mt-6 font-display text-[20px] font-bold tracking-[-0.026em] text-bp-ink">
                  {w.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.72] text-bp-mute">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 WORK */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="04"
            total="05"
            eyebrow="Selected work"
            title="Platforms running in India right now."
            sub="Every one of these was designed and engineered here, end to end, and every one is live and trading. Published with the client's permission."
          />
          <div className="mt-11 grid border-l border-t border-bp-line lg:mt-16 lg:grid-cols-2">
            {clientWork.map((c) => (
              <Link
                key={c.slug}
                href={`/in/work/${c.slug}`}
                data-stagger
                className="group flex flex-col border-b border-r border-bp-line bg-white transition-shadow duration-250 hover:shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)]"
              >
                <div className="relative aspect-[16/8] overflow-hidden border-b border-bp-line bg-slate-100">
                  <Image
                    src={c.cover}
                    alt={`${c.title}: ${c.tagline}`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 lg:p-9">
                  <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">
                    {c.category}
                  </div>
                  <h3 className="mt-3.5 font-display text-[23px] font-bold tracking-[-0.028em] text-bp-ink lg:text-[27px]">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{c.tagline}</p>
                  <MakerMark
                    group={c.group}
                    detail={c.scope.find((s) => s.label === "Status")?.value}
                    className="mt-6 border-t border-bp-hair pt-4"
                  />
                  <span className="mt-auto inline-flex items-center gap-2.5 pb-1.5 pt-7 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-brand-700 transition-all group-hover:gap-4">
                    Read the case study
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8">
            <BpButton href="/in/work" variant="outline">
              See all work
            </BpButton>
          </div>
        </div>
      </section>

      {/* 05 FAQ */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead no="05" total="05" eyebrow="Questions" title="The ones we get asked." />
          <div className="mx-auto mt-11 max-w-[1080px] lg:mt-16">
            <BlueprintFaq items={homeFaq} />
          </div>
        </div>
      </section>

      <CTASection
        title="Tell us the bottleneck. Leave with a plan you can execute."
        body="A senior consultant, not a salesperson. Bring the problem you have not been able to solve and we will map how we would build it: the data model, the systems it has to touch, and what reaching production would take."
        primary={{ label: "Book a strategy session", href: "/in/strategy-session" }}
        secondary={{ label: "See our work", href: "/in/work" }}
      />
    </>
  );
}
