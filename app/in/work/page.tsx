import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { caseStudies } from "@/lib/caseStudies";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, BpButton, MakerMark, PAGE } from "@/components/blueprint";
import { INDIA_CLIENTS } from "@/lib/indiaClients";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/work", {
    title: "Our Work: Platforms Built in India | MnT Future",
    description:
      "Live commerce platforms MnT Future designed and engineered for clients in India, plus the products and labs we build and run ourselves.",
  });
}

// Client work first, and said so in the heading rather than left to be inferred:
// the one thing this page must never do is let something we own read as
// something a client paid us to build.
const GROUPS = [
  {
    key: "client" as const,
    title: "Client platforms",
    desc: "Commerce platforms we designed and engineered for clients in India, published with their permission. Every one of them is live and trading.",
  },
  {
    key: "own" as const,
    title: "Our own platforms",
    desc: "Products we build, run and sell ourselves. Where we prove an approach works before recommending it to anyone else.",
  },
  {
    key: "lab" as const,
    title: "Labs and audits",
    desc: "Open experiments and internal audits. How we test a method, and measure it, before it reaches a client build.",
  },
];

export default function IndiaWork() {
  const shown = GROUPS.filter((g) => caseStudies.some((c) => c.group === g.key));
  return (
    <>
      <BlueprintMotion />

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
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: "Work" }]} tone="light" />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              Selected work
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              All live
            </span>
          </div>
          <h1 className="mt-8 max-w-[16ch] animate-rise-in font-display text-[42px] font-bold leading-[0.98] tracking-[-0.05em] text-bp-ink sm:text-[60px] lg:text-[80px]">
            Real platforms, shipped.
          </h1>
          <p className="mt-6 max-w-[58ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            Live products we designed and engineered end to end, all of them built here in India.
            Judge our engineering on what we ship, not on a logo wall.
          </p>
        </div>
      </section>

      {/* The client list comes before the written-up studies: it is the bigger
          number and the faster answer to "have you built anything like mine". */}
      <section data-reveal className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-14 lg:py-[76px]`}>
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <div>
              <div className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-300">
                Client projects
              </div>
              <h2 className="mt-5 max-w-[18ch] font-display text-[28px] font-bold leading-[1.08] tracking-[-0.036em] text-white lg:text-[38px]">
                Client platforms, every one of them live.
              </h2>
              <p className="mt-4 max-w-[56ch] text-[16px] leading-[1.7] text-white/65">
                Commerce platforms, facade, printing, solar, education, accounting, disability
                care, events, pest control, travel, engineering and logistics. Every client
                project in one place, the three written up in full included.
              </p>
            </div>
            <div className="lg:justify-self-end">
              <Link
                href="/in/work/clients"
                className="group inline-flex h-14 items-center bg-white pl-7 font-mono text-[13px] font-semibold tracking-[0.06em] text-bp-ink transition-colors hover:bg-brand-300"
              >
                View all client projects
                <span className="ml-4 flex h-14 w-14 items-center justify-center border-l border-bp-ink/15">
                  <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {shown.map((g, gi) => {
        const items = caseStudies.filter((c) => c.group === g.key);
        return (
          <section
            key={g.key}
            data-reveal
            className={`border-b border-bp-line ${gi % 2 === 0 ? "bg-bp-wash" : ""}`}
          >
            <div className={`${PAGE} py-20 lg:py-[120px]`}>
              <SectionHead
                no={String(gi + 1).padStart(2, "0")}
                total={String(shown.length).padStart(2, "0")}
                eyebrow={g.title}
                title={g.title}
                sub={g.desc}
              />
              <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-2">
                {items.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/in/work/${c.slug}`}
                    data-stagger
                    className="group flex flex-col border-b border-r border-bp-edge bg-white transition-shadow duration-250 hover:shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)]"
                  >
                    <div className="relative aspect-[16/8] overflow-hidden border-b border-bp-edge bg-slate-100">
                      <Image
                        src={c.cover}
                        alt={`${c.title}: ${c.type}`}
                        width={1600}
                        height={800}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-7 lg:p-9">
                      <div className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-700">
                        {c.type}
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
                {g.key === shown[0].key && (
                  <div
                    data-stagger
                    className="flex flex-col justify-center border-b border-r border-dashed border-[#C9D6E5] bg-white p-9 lg:p-12"
                  >
                    <h3 className="font-display text-[22px] font-bold tracking-[-0.02em] text-bp-ink">
                      Your platform here next?
                    </h3>
                    <p className="mt-3 max-w-[42ch] text-[15px] leading-[1.7] text-bp-mute">
                      Book a strategy session and we will show you exactly how we would build it:
                      data model, integrations, and the plan to get it live.
                    </p>
                    <div className="mt-7">
                      <BpButton href="/in/strategy-session">Book a strategy session</BpButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        title="Tell us the bottleneck. Leave with a plan you can execute."
        body="A senior consultant, not a salesperson. Bring the problem you have not been able to solve and we will map how we would build it."
        primary={{ label: "Talk to a Senior Engineer", href: "/in/strategy-session" }}
        secondary={{ label: "Our products", href: "/in/products" }}
      />
    </>
  );
}
