import type { Metadata } from "next";
import Link from "next/link";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, BpButton, PAGE } from "@/components/blueprint";
import { INDIA_GUIDES, type Guide } from "@/lib/indiaGuides";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/guides", {
    title: "Guides: Ecommerce, AI & WhatsApp | MnT Future India",
    description:
      "Practical guides on running an online business in India: what a rented platform costs, GST done properly, selling on WhatsApp, and why AI projects stall.",
  });
}

const CLUSTERS: Guide["cluster"][] = ["Ecommerce", "AI & automation", "WhatsApp & CRM"];

export default function GuidesHub() {
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
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: "Guides" }]} tone="light" />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              Guides
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              {INDIA_GUIDES.length} guides
            </span>
          </div>

          <h1 className="mt-8 max-w-[18ch] animate-rise-in font-display text-[38px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[54px] lg:text-[68px]">
            Guides
          </h1>
          <p className="mt-6 max-w-[62ch] animate-rise-in text-[18.5px] leading-[1.68] text-bp-mute [animation-delay:120ms]">
            What we would tell you on a call, written down. Each one answers a question we get asked
            often enough to be worth answering properly, and each one says plainly where the honest
            answer is that you do not need us.
          </p>
          <div className="mt-9 flex animate-rise-in flex-wrap gap-3 [animation-delay:200ms]">
            <BpButton href="/in/strategy-session">Talk to a Senior Engineer</BpButton>
          </div>
        </div>
      </section>

      {CLUSTERS.map((cluster, ci) => {
        const guides = INDIA_GUIDES.filter((g) => g.cluster === cluster);
        if (!guides.length) return null;
        return (
          <section
            key={cluster}
            data-reveal
            className={`border-b border-bp-line ${ci % 2 === 0 ? "bg-bp-wash" : "bg-white"}`}
          >
            <div className={`${PAGE} py-20 lg:py-[110px]`}>
              <SectionHead
                no={String(ci + 1).padStart(2, "0")}
                total={String(CLUSTERS.length).padStart(2, "0")}
                eyebrow={cluster}
                title={
                  cluster === "Ecommerce"
                    ? "Running an online business in India."
                    : cluster === "AI & automation"
                      ? "Getting AI past the demo."
                      : "Selling and supporting on WhatsApp."
                }
              />
              <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-2">
                {guides.map((g) => (
                  <Link
                    key={g.slug}
                    href={`/in/guides/${g.slug}`}
                    data-stagger
                    className="group flex flex-col border-b border-r border-bp-edge bg-white p-7 transition-colors hover:bg-bp-tint lg:p-9"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-bp-faint">
                      {g.readingMins} min read
                    </span>
                    <h2 className="mt-3.5 font-display text-[22px] font-bold leading-[1.18] tracking-[-0.028em] text-bp-ink lg:text-[25px]">
                      {g.title}
                    </h2>
                    <p className="mt-3.5 flex-1 text-[15px] leading-[1.7] text-bp-mute">{g.summary}</p>
                    <span className="mt-6 inline-flex items-center gap-2 border-t border-bp-hair pt-4 font-mono text-[11.5px] uppercase tracking-[0.12em] text-brand-700">
                      Read the guide
                      <Icon
                        name="arrow"
                        className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CTASection
        title="Bring the version of this that is happening in your business."
        body="Reading is cheaper than building, which is why these exist. When you want the answer for your own numbers, a senior consultant will work it with you."
        primary={{ label: "Talk to a Senior Engineer", href: "/in/strategy-session" }}
        secondary={{ label: "See our work", href: "/in/work" }}
      />
    </>
  );
}
