import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { resolveMetadata } from "@/lib/seo";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, RuleLabel, BpButton, MakerMark, PAGE } from "@/components/blueprint";
import { INDIA_CLIENTS, CLIENTS_WITH_BUILD, CLIENTS_LISTED } from "@/lib/indiaClients";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/work/clients", {
    title: "Client Projects: Websites & Platforms We Built | MnT Future India",
    description:
      "Live client platforms built by MnT Future: facade, printing, solar, education, accounting, care, events, pest control, travel and engineering. Custom builds with admin panels, databases and payments.",
  });
}

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

// Every project is a real, live site, so the page is an ItemList of them rather
// than a marketing claim about how many we have done.
const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Client projects by MnT Future",
  numberOfItems: INDIA_CLIENTS.length,
  itemListElement: INDIA_CLIENTS.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    url: c.url,
  })),
};

export default function ClientProjects() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/in" },
              { label: "Work", href: "/in/work" },
              { label: "Client projects" },
            ]}
            tone="light"
          />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              Client projects
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              {INDIA_CLIENTS.length} live sites
            </span>
          </div>
          <h1 className="mt-8 max-w-[16ch] animate-rise-in font-display text-[40px] font-bold leading-[0.98] tracking-[-0.05em] text-bp-ink sm:text-[58px] lg:text-[78px]">
            {INDIA_CLIENTS.length} client platforms, all of them live.
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            Facade systems, printing, solar, education, accounting, disability care, events, pest
            control, travel, engineering, logistics. Different industries, same approach: a real
            application with a database and an admin behind it, not a brochure somebody has to call
            us to change.
          </p>
          <p className="mt-5 max-w-[58ch] animate-rise-in text-[14.5px] leading-[1.65] text-bp-faint [animation-delay:180ms]">
            Every capability listed on this page was checked against the project&apos;s own code
            before it was written here. Where we did not have the repository to check, the entry
            says what the site is and claims nothing more.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <BpButton href="/in/strategy-session">Start a project</BpButton>
            <BpButton href="/in/work" variant="outline">
              Case studies
            </BpButton>
          </div>
        </div>
      </section>

      {/* 01 THE BUILDS */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="01"
            total="03"
            eyebrow="Custom builds"
            title="Applications, not brochure sites."
            sub="Each of these has a database, an admin the client actually uses, and the parts their business needs: payments where money changes hands, uploads where there are galleries, member accounts where there are members."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 sm:grid-cols-2">
            {CLIENTS_WITH_BUILD.map((c, i) => (
              <div
                key={c.host}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="flex flex-col border-b border-r border-bp-edge bg-white"
              >
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${c.name}: open the live site`}
                  className="group block border-b border-bp-edge"
                >
                  <span className="flex items-center gap-1.5 border-b border-bp-hair bg-bp-tint px-3.5 py-[9px]">
                    <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
                    <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
                    <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
                    <span className="ml-2 truncate border border-[#E9EEF5] bg-white px-2.5 py-1 font-mono text-[11px] sm:text-[10.5px] text-bp-faint">
                      {c.host}
                    </span>
                  </span>
                  <span className="relative block aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image
                      src={c.shot}
                      alt={`${c.name} website`}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </span>
                </a>

                <div className="flex flex-1 flex-col p-7 lg:p-9">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="h-px flex-1 bg-bp-hair" />
                  {c.region && (
                    <span className="whitespace-nowrap font-mono text-[11px] sm:text-[10px] uppercase tracking-[0.12em] text-bp-faint">
                      {c.region}
                    </span>
                  )}
                </div>

                <h3 className="mt-5 font-display text-[23px] font-bold leading-[1.16] tracking-[-0.028em] text-bp-ink">
                  {c.name}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-[1.6] text-bp-mute">{c.sector}</p>

                <div className="mt-6 border-t border-bp-hair">
                  {c.build!.map((b) => (
                    <div key={b} className="flex items-start gap-3 border-b border-bp-hair py-3">
                      <span className="mt-1 flex h-[16px] w-[16px] shrink-0 items-center justify-center bg-brand-500/[0.09] text-brand-700">
                        <Icon name="check" className="h-[10px] w-[10px]" />
                      </span>
                      <span className="text-[14px] leading-[1.55] text-bp-body">{b}</span>
                    </div>
                  ))}
                </div>

                {c.stack && (
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {c.stack.map((t) => (
                      <span
                        key={t}
                        className="border border-bp-edge bg-bp-tint px-2.5 py-1 font-mono text-[11px] sm:text-[10.5px] tracking-[0.04em] text-bp-mute"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-auto pt-7">
                  <MakerMark group="client" detail="Live" className="border-t border-bp-hair pt-4" />
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group mt-4 inline-flex items-center gap-2.5 py-1.5 font-mono text-[12.5px] font-semibold tracking-[0.06em] text-brand-700 transition-all hover:gap-4"
                  >
                    Visit {c.host}
                    <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" />
                  </a>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 ALSO BUILT */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="02"
            total="03"
            eyebrow="Also built"
            title="Live, and listed without embellishment."
            sub="These are ours too. We do not have the codebase in front of us to describe what is behind them, so rather than guess, here is the client and the link."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {CLIENTS_LISTED.map((c) => (
              <a
                key={c.host}
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="group flex flex-col border-b border-r border-bp-edge bg-white transition-shadow duration-250 hover:shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)]"
              >
                <span className="relative block aspect-[16/10] overflow-hidden border-b border-bp-edge bg-slate-100">
                  <Image
                    src={c.shot}
                    alt={`${c.name} website`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-7">
                {c.region && (
                  <span className="mb-3 whitespace-nowrap font-mono text-[11px] sm:text-[10px] uppercase tracking-[0.12em] text-bp-faint">
                    {c.region}
                  </span>
                )}
                <h3 className="font-display text-[19px] font-bold leading-[1.18] tracking-[-0.026em] text-bp-ink">
                  {c.name}
                </h3>
                <p className="mt-2.5 flex-1 text-[14px] leading-[1.6] text-bp-mute">{c.sector}</p>
                <span className="mt-6 inline-flex items-center gap-2.5 py-1.5 font-mono text-[12px] font-semibold tracking-[0.06em] text-brand-700 transition-all group-hover:gap-4">
                  {c.host}
                  <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" />
                </span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 03 WHAT THEY HAVE IN COMMON */}
      <section data-reveal className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="03"
            total="03"
            eyebrow="What they share"
            title="The client can change it without calling us."
            sub="Across every one of these, the same decision: content lives in a database with an admin behind it. A brochure site saves a week at the start and costs the client a phone call every time a price changes."
            tone="dark"
          />
          <div className="mt-11 grid border-l border-t border-white/10 lg:mt-16 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "An admin they use", d: "Services, prices, galleries and pages edited by the client's own team, not by us on a support ticket." },
              { t: "A real database", d: "Records rather than hardcoded pages, so the site can grow without a rebuild." },
              { t: "Enquiries that arrive", d: "Every form routed by email to a person, because a form nobody receives is worse than no form." },
              { t: "Payments where needed", d: "Razorpay on the two where money changes hands. Not bolted on everywhere for the sake of it." },
            ].map((x, i) => (
              <div key={x.t} data-stagger className="border-b border-r border-white/10 bg-white/[0.03] p-7">
                <span className="font-mono text-[11px] tracking-[0.14em] text-brand-300">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-[18px] font-bold tracking-[-0.024em] text-white">
                  {x.t}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.65] text-white/60">{x.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border-t border-white/10 pt-8">
            <RuleLabel tone="dark">Deeper stories</RuleLabel>
            <p className="mt-4 max-w-[62ch] text-[15px] leading-[1.7] text-white/55">
              The commerce platforms we have written up in full, with the architecture and the
              numbers, are on the case studies page.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                { label: "Case studies", href: "/in/work" },
                { label: "Ecommerce platforms", href: "/in/ecommerce" },
                { label: "Our products", href: "/in/products" },
              ].map((r) => (
                <Link
                  key={r.href}
                  href={r.href}
                  className="border border-white/20 px-4 py-2.5 font-mono text-[12px] tracking-[0.06em] text-white/70 transition-colors hover:border-white/45 hover:text-white"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="Your business, on something you can actually run."
        body={`Tell us what your team needs to change without calling a developer. A senior consultant will map it, and tell you honestly when a smaller build would do. Or email us at ${site.email}.`}
        primary={{ label: "Book a strategy session", href: "/in/strategy-session" }}
        secondary={{ label: "Case studies", href: "/in/work" }}
      />
    </>
  );
}
