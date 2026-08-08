import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, BpButton, PAGE } from "@/components/blueprint";
import { INDIA_INDUSTRIES } from "@/lib/indiaIndustries";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/industries", {
    title: "Industries We Build For in India | MnT Future",
    description:
      "The sectors we have shipped platforms in: fashion, food and grocery, travel, home services and professional firms. Each one linked to the work behind it.",
  });
}

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

export default function IndustriesIndex() {
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
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: "Industries" }]} tone="light" />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              Industries
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              {INDIA_INDUSTRIES.length} sectors
            </span>
          </div>

          <h1 className="mt-8 max-w-[18ch] animate-rise-in font-display text-[38px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[54px] lg:text-[68px]">
            Industries We Build For
          </h1>
          {/* The list is short on purpose, and saying why is the point: an
              industry page with no work behind it is a page of adjectives. */}
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            Five sectors, and only five, because these are the ones we can show you finished work
            in. Every page below names the client platforms behind it and links to them. If your
            sector is not here it does not mean we cannot build it — it means we would rather talk
            than publish a page claiming experience we do not have.
          </p>
          <div className="mt-9 flex animate-rise-in flex-wrap gap-3 [animation-delay:200ms]">
            <BpButton href="/in/strategy-session">Talk to a Senior Engineer</BpButton>
            <BpButton href="/in/work/clients" variant="outline">
              See every client project
            </BpButton>
          </div>
        </div>
      </section>

      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[120px]`}>
          <SectionHead
            no="01"
            total="01"
            eyebrow="Where we have shipped"
            title="Pick the one that looks like your business."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {INDIA_INDUSTRIES.map((i) => (
              <Link
                key={i.slug}
                href={`/in/industries/${i.slug}`}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="group flex flex-col border-b border-r border-bp-edge bg-white p-7 transition-colors hover:bg-bp-tint lg:p-8"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center border border-[#DCE6F2] bg-bp-tint text-brand-700">
                    <Icon name={i.icon} className="h-5 w-5" />
                  </span>
                  <span className="border border-[#DCE6F2] bg-white px-[11px] py-1.5 font-mono text-[11px] tracking-[0.08em] text-bp-mute">
                    {i.proof.length} {i.proof.length === 1 ? "build" : "builds"}
                  </span>
                </div>
                <h2 className="mt-5 font-display text-[21px] font-bold leading-[1.15] tracking-[-0.028em] text-bp-ink">
                  {i.name}
                </h2>
                <p className="mt-3 flex-1 text-[14.5px] leading-[1.7] text-bp-mute">{i.heroSub}</p>
                <span className="mt-6 inline-flex items-center gap-2 border-t border-bp-hair pt-4 font-mono text-[11.5px] uppercase tracking-[0.12em] text-brand-700">
                  {i.proof.map((p) => p.name).join(" · ")}
                  <Icon
                    name="arrow"
                    className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Not on the list? Say what your business does."
        body="The five above are where we can show you finished work. Tell us the shape of your operation and a senior consultant will tell you honestly whether we are the right people for it."
        primary={{ label: "Talk to a Senior Engineer", href: "/in/strategy-session" }}
        secondary={{ label: "See our work", href: "/in/work" }}
      />
    </>
  );
}
