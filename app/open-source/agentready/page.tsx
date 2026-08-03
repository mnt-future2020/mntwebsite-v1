import type { Metadata } from "next";
import Link from "next/link";
import AgentReadyScanner from "@/components/AgentReadyScanner";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Breadcrumbs } from "@/components/blocks";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/open-source/agentready", {
    title: "Free Agent-Readiness Scan: is your store visible to AI agents? | MnT Future",
    description:
      "Scan any store free: 29 checks across structured data, agent access, feeds and ACP · Google UCP · MCP discovery. Letter grade + prioritized fixes in seconds. No email needed for the score.",
  });
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "agentready: store agent-readiness scanner",
  applicationCategory: "DeveloperApplication",
  description:
    "Free scan that grades any e-commerce store's readiness for AI shopping agents: 29 checks incl. ACP, Google UCP and MCP protocol discovery.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  url: `${site.url}/agentready`,
  provider: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
};

const TRUST_POINTS = [
  { icon: "shield" as const, text: "~15 polite requests, static analysis: what agents actually see" },
  { icon: "eye" as const, text: "Open source (MIT): audit every check on GitHub" },
  { icon: "bolt" as const, text: "No email needed for the score" },
];

export default function AgentReadyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white pb-20 sm:pb-24">
        <div className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 relative pt-10 sm:pt-12">
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Open Source", href: "/open-source" },
              { label: "Free scan" },
            ]}
            tone="light"
          />
          <Reveal>
            <div className="mx-auto mt-10 max-w-3xl text-center">
              <div className="flex items-center gap-4"><span className="h-px w-[38px] shrink-0 bg-brand-500" /><span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
                Free agent-readiness scan
              </span></div>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-[1.08] tracking-[-0.02em] text-bp-ink sm:text-5xl">
                Is your store <span className="text-brand-700">invisible</span> to AI shopping
                agents?
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-bp-mute">
                ChatGPT discovers products from feeds. Google&apos;s AI Mode transacts over UCP.
                Shopify ships MCP endpoints. Find out in seconds how your store looks to the
                agents: 29 checks, a letter grade, and exactly what to fix.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-9">
              <AgentReadyScanner />
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-10 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-bp-mute">
              {TRUST_POINTS.map((point) => (
                <span key={point.text} className="inline-flex items-center gap-2">
                  <Icon name={point.icon} className="h-4 w-4 text-brand-700" /> {point.text}
                </span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-10 flex justify-center">
              <a
                href="https://www.producthunt.com/products/mnt-future-workspace?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-mnt-future-agent-ready"
                target="_blank"
                rel="noopener noreferrer"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- Product Hunt serves the badge SVG */}
                <img
                  alt="MnT Future Agent Ready - Is your store invisible to AI shopping agents? | Product Hunt"
                  width={250}
                  height={54}
                  src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1201493&theme=light&t=1784887498910"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 py-14">
        <p className="text-center text-sm text-slate-500">
          Prefer the terminal?{" "}
          <code className="rounded bg-slate-100 px-2 py-1 font-mono text-[13px] text-navy">
            npx @mntglobal/agentready your-store.com
          </code>{" "}
          · Same engine, open source:{" "}
          <Link href="/open-source" className="font-semibold text-brand hover:underline">
            about our OSS program
          </Link>
        </p>
      </section>

      <CTASection
        title="agentready finds the gaps. We build the fixes."
        body="Bring your report to a free strategy session: a senior consultant maps every finding to a concrete fix plan: feeds, schema, UCP/MCP integration, the lot."
      />
    </>
  );
}
