import type { Metadata } from "next";
import Link from "next/link";
import AgentReadyScanner from "@/components/AgentReadyScanner";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Breadcrumbs } from "@/components/blocks";
import BlueprintFaq from "@/components/BlueprintFaq";
import { SectionHead, PAGE } from "@/components/blueprint";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/open-source/agentready", {
    title: "Free Agent-Readiness Scan for Your Store | MnT Future",
    description:
      "Scan any store free: 29 checks across structured data, agent access, feeds and ACP, UCP and MCP discovery. A letter grade and prioritized fixes in seconds.",
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

// What the 29 checks are grouped into, in the order the report scores them.
// The page used to be the scanner and almost nothing else — 199 words, which is
// too thin to rank for the queries it should own, and it left a first-time
// visitor with no idea what the grade was measuring before they ran it.
const CATEGORIES = [
  {
    name: "Structured data",
    body: "Product, Offer and Organization markup, and whether price, availability and identifiers are actually present rather than declared empty. An agent that cannot read a price cannot quote you in an answer.",
  },
  {
    name: "Agent access",
    body: "What robots.txt allows, which AI crawlers are blocked outright, and whether the pages an agent needs are reachable without executing JavaScript it will not run.",
  },
  {
    name: "Product feeds",
    body: "Whether a machine-readable catalogue exists at all, how complete it is, and whether it is discoverable from where a crawler will look for it.",
  },
  {
    name: "Protocol endpoints",
    body: "Discovery for the agentic commerce protocols: ACP, Google's UCP and Retail MCP. This is the part almost every store fails today, and the part that decides whether an agent can transact rather than only describe.",
  },
  {
    name: "Machine readability",
    body: "Server-rendered content, clean canonical URLs, sitemaps that resolve, and llms.txt. The unglamorous plumbing that decides whether a crawl gets your catalogue or your loading spinner.",
  },
  {
    name: "AEO citability",
    body: "Whether your pages answer questions in a form an answer engine can lift and attribute: specifics, named entities, and claims that stand on their own out of context.",
  },
  {
    name: "Data freshness",
    body: "How recently the catalogue and its signals changed. Stale stock and stale prices are worse than missing ones, because an agent will confidently quote them.",
  },
  {
    name: "Accessibility",
    body: "The WCAG failures that also break machine parsing: missing names, unlabelled controls, content only reachable by mouse. Agents and screen readers fail on the same things.",
  },
];

const SCAN_FAQS = [
  {
    q: "What does the grade actually mean?",
    a: "It is the share of applicable points earned across 29 deterministic checks, mapped to a letter. It is not an opinion or a model's judgement: run it twice on an unchanged store and you get the same score. Anything the scan could not assess is excluded from the denominator rather than counted as a failure.",
  },
  {
    q: "Will this slow my store down or trip my WAF?",
    a: "No. The scan makes roughly fifteen polite requests with a declared user agent, obeys robots.txt, and analyses what comes back statically. It never crawls your whole catalogue and never posts anything.",
  },
  {
    q: "Do I have to give you an email?",
    a: "Not for the score. The grade, the category breakdown and every check with its evidence appear on screen. Email is only for the remediation plan, which is a written document a person puts together.",
  },
  {
    q: "Why does agent-readiness matter now?",
    a: "Because buying is starting to happen inside assistants rather than only on your site. ChatGPT discovers products from feeds, Google's AI Mode transacts over UCP, and Shopify ships MCP endpoints. A store that is invisible at that layer does not lose ranking, it loses the transaction entirely.",
  },
  {
    q: "Is it open source?",
    a: "Yes, MIT-licensed. The same engine runs on the command line with npx @mntglobal/agentready your-store.com, so you can read every check, run it in CI, and point it at a staging environment before anything is public.",
  },
  {
    q: "My score is bad. What is the fastest thing to fix?",
    a: "Almost always structured data and feeds, in that order: they are the cheapest to fix and the most widely consumed. Protocol endpoints matter more but cost more, so they are worth doing once the readable basics are in place.",
  },
];

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
                  loading="lazy"
                  decoding="async"
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

      <section className="border-t border-bp-line bg-white py-20 lg:py-[104px]">
        <div className={PAGE}>
          <SectionHead
            no="01"
            total="02"
            eyebrow="What the scan checks"
            title="29 checks, in eight groups."
            sub="Every check is deterministic and every one shows its evidence, so you can verify the finding rather than take the grade on trust."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <div key={c.name} className="border-b border-r border-bp-edge p-7 lg:p-8">
                <h2 className="font-display text-[18px] font-bold leading-[1.25] tracking-[-0.02em] text-bp-ink">
                  {c.name}
                </h2>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-bp-line bg-bp-wash py-20 lg:py-[104px]">
        <div className={PAGE}>
          <SectionHead
            no="02"
            total="02"
            eyebrow="Before you scan"
            title="What people ask about the grade."
          />
          <BlueprintFaq items={SCAN_FAQS} />
        </div>
      </section>

      <CTASection
        title="agentready finds the gaps. We build the fixes."
        body="Bring your report to a free strategy session: a senior consultant maps every finding to a concrete fix plan: feeds, schema, UCP/MCP integration, the lot."
      />
    </>
  );
}
