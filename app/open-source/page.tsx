import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import FAQ, { type QA } from "@/components/FAQ";
import Icon, { type IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Breadcrumbs, SectionHeading } from "@/components/blocks";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const GITHUB_ORG = "https://github.com/MnT-Future";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/open-source", {
    title: "Open Source — agentic & AI-native commerce tooling | MnT Future",
    description:
      "MnT Future's open-source program for agentic & AI-built commerce: agentready (store agent-readiness scanner) and vibecheck (security & production-readiness for AI-built stores) are live and MIT-licensed. retail-mcp and acp-testkit are next.",
  });
}

type Tool = {
  name: string;
  icon: IconName;
  tagline: string;
  desc: string;
  maps: string;
} & ({ status: "live"; href: string } | { status: "soon"; when: string });

const TOOLS: Tool[] = [
  {
    name: "agentready",
    status: "live",
    href: "/agentready",
    icon: "eye",
    tagline: "Is your store visible to AI shopping agents?",
    desc: "29 checks across structured data, agent access, product feeds and ACP · Google UCP · MCP discovery. Free hosted scan + CLI.",
    maps: "Agent-Ready Commerce",
  },
  {
    name: "vibecheck",
    status: "live",
    href: "/vibecheck",
    icon: "shield",
    tagline: "Is your AI-built store secure & production-ready?",
    desc: "26 checks: secrets, injection, commerce-logic tampering, dependency CVEs, production hardening. SARIF + a GitHub Action.",
    maps: "AI Cleanup",
  },
  {
    name: "retail-mcp",
    status: "soon",
    when: "October 2026",
    icon: "store",
    tagline: "Expose your catalog to AI agents, securely.",
    desc: "Open-source Retail MCP server kit — catalog, inventory and pricing for AI agents. Headless engines first; Shopify already ships its own.",
    maps: "Embedded Agents",
  },
  {
    name: "acp-testkit",
    status: "soon",
    when: "October 2026",
    icon: "check",
    tagline: "Test your agentic checkout before a real agent does.",
    desc: "Agentic-checkout conformance suite + a mock shopping agent for your ACP / Google UCP integration.",
    maps: "Integrations & Orchestration",
  },
];

const VALUES = [
  {
    icon: "eye" as const,
    title: "Prove it, don't claim it",
    desc: "The agentic-commerce protocols are months old and full of bold claims. We publish working, inspectable tools instead — run them yourself, no marketing required.",
  },
  {
    icon: "check" as const,
    title: "Honest limitations",
    desc: "Every README documents what the tool can't do. Heuristics are labelled, benchmarks state their conditions, and evidence is quoted from your own code or store.",
  },
  {
    icon: "lock" as const,
    title: "MIT, no lock-in",
    desc: "Use it, fork it, build on the engine. The code is free forever; the engineering behind the fixes is our business, not the tool.",
  },
  {
    icon: "network" as const,
    title: "Maps to real work",
    desc: "Every tool ladders into a service we actually deliver for clients. No orphan repos, no abandonware — each one earns its place.",
  },
];

const FAQ_ITEMS: QA[] = [
  {
    q: "Are the tools really free?",
    a: "Yes — MIT-licensed, forever. The CLIs are free, agentready's hosted scan is free, and no email is needed for a score. Our business is the engineering behind the fixes, not the tools.",
  },
  {
    q: "Do you see my code or my store's data?",
    a: "vibecheck's CLI scans your code entirely on your machine — nothing reaches us. agentready's CLI fetches your store directly from your machine. Only agentready's web scanner has our server fetch your public pages to compute the score shown to you; we keep your email and grade only if you request the fix plan.",
  },
  {
    q: "Can anyone change the code?",
    a: "Anyone can propose a change (fork → pull request), but nothing merges without our review, passing tests, and a signed-off commit. Only the MnT Future team can push to the main branch.",
  },
  {
    q: "Why open-source this instead of selling it?",
    a: "The agentic-commerce and AI-codegen waves are new and full of bold claims. Publishing working, inspectable tools is how we prove we're practitioners — and teams who discover gaps with our tools often ask us to fix them. Honest exchange.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

const itemListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MnT Future open-source tools",
  itemListElement: TOOLS.map((tool, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "SoftwareApplication",
      name: tool.name,
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Node.js 20+",
      description: tool.desc,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      license: "https://opensource.org/licenses/MIT",
      ...(tool.status === "live" ? { url: `${site.url}${tool.href}` } : {}),
      author: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
    },
  })),
};

export default function OpenSourcePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-deep text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-40" />
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-brand-700/25 blur-3xl" />
        <div className="container-mnt relative py-16 sm:py-24">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Open Source" }]} />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
                  Open source
                </div>
                <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] sm:text-5xl">
                  We open-source our{" "}
                  <span className="text-brand-300">agentic-commerce</span> tooling.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                  Anyone can claim &ldquo;agent-ready&rdquo; or &ldquo;secure.&rdquo; We publish the
                  tools that prove it — MIT-licensed, with honest limitations in every README and
                  benchmarks you can reproduce. <strong className="text-white">Two are live</strong>,
                  two are on the way.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#tools"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
                  >
                    Browse the tools <Icon name="arrow" className="h-4 w-4" />
                  </a>
                  <a
                    href={GITHUB_ORG}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    <Icon name="github" className="h-4 w-4" /> GitHub org
                  </a>
                </div>
                <p className="mt-5 text-sm text-white/60">
                  MIT-licensed · deterministic · reproducible benchmarks
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-[#050f1f] p-6 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
                  The toolkit
                </div>
                <ul className="mt-4 divide-y divide-white/5">
                  {TOOLS.map((tool) => (
                    <li key={tool.name} className="flex items-center gap-3 py-3">
                      <span
                        className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                          tool.status === "live" ? "bg-brand/15 text-brand-300" : "bg-white/5 text-white/40"
                        }`}
                      >
                        <Icon name={tool.icon} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <div className="font-mono text-sm font-bold text-white">{tool.name}</div>
                        <div className="truncate text-xs text-white/60">{tool.tagline}</div>
                      </div>
                      <span
                        className={`ml-auto shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          tool.status === "live"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-white/5 text-white/45"
                        }`}
                      >
                        {tool.status === "live" ? "Live" : tool.when}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The tools */}
      <section id="tools" className="container-mnt scroll-mt-24 py-20 sm:py-24">
        <SectionHeading
          eyebrow="The tools"
          title={
            <>
              Four tools. <span className="text-brand">One honest program.</span>
            </>
          }
          subtitle="Each maps to a real problem we fix for clients — and each ships with the MnT Future repo standard: a 30-second quickstart, honest limitations, and tests you can run."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {TOOLS.map((tool, i) => {
            const inner = (
              <>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${
                      tool.status === "live" ? "bg-brand-50 text-brand" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <Icon name={tool.icon} className="h-5 w-5" />
                  </span>
                  {tool.status === "live" ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" /> Live
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                      {tool.when}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 font-mono text-xl font-bold text-navy">{tool.name}</h3>
                <p className="mt-1 text-sm font-medium text-slate-500">{tool.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{tool.desc}</p>
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <span className="text-xs text-slate-400">
                    Feeds <span className="font-semibold text-slate-600">{tool.maps}</span>
                  </span>
                  {tool.status === "live" && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                      Explore <Icon name="arrow" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  )}
                </div>
              </>
            );
            return (
              <Reveal key={tool.name} delay={i * 0.05}>
                {tool.status === "live" ? (
                  <Link
                    href={tool.href}
                    className="group block h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="h-full rounded-2xl border border-dashed border-slate-300 bg-white p-7">
                    {inner}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
        <p className="mt-10 text-center text-sm text-slate-500">
          Follow along:{" "}
          <a href={GITHUB_ORG} className="font-semibold text-brand hover:underline" target="_blank" rel="noopener noreferrer">
            github.com/MnT-Future
          </a>{" "}
          · or{" "}
          <Link href="/newsletter" className="font-semibold text-brand hover:underline">
            get release notes by email
          </Link>
        </p>
      </section>

      {/* How we build in the open */}
      <section className="bg-deep">
        <div className="container-mnt py-20 sm:py-24">
          <SectionHeading
            tone="dark"
            eyebrow="How we build in the open"
            title={
              <>
                Senior by default. <span className="text-brand-300">Honesty over hype.</span>
              </>
            }
            subtitle="The same standard runs through every repo — so a tool of ours reads like our engineering, not a demo."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, i) => (
              <Reveal key={value.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-white/10 bg-white/5 p-6">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/15 text-brand-300">
                    <Icon name={value.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-mnt py-20 sm:py-24">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Fair questions, <span className="text-brand">honest answers.</span>
            </>
          }
        />
        <div className="mt-10">
          <FAQ items={FAQ_ITEMS} />
        </div>
      </section>

      <CTASection
        eyebrow="From tool to fix"
        title="Our tools find the gaps. We build the fixes."
        body="Run any of them, then bring the report to a free architecture workshop — a senior engineer maps every finding to a concrete fix plan for your platform."
      />
    </>
  );
}
