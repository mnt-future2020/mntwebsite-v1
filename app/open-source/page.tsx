import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Breadcrumbs, SectionHeading } from "@/components/blocks";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/open-source", {
    title: "Open Source — agentready & agentic-commerce tooling | MnT",
    description:
      "MnT's open-source tools for agentic commerce: agentready, the store agent-readiness scanner (ACP · Google UCP · MCP), free hosted scan, MIT-licensed. vibecheck, retail-mcp and acp-testkit are next.",
  });
}

const SCANNER_URL = "/agentready";
const GITHUB_URL = "https://github.com/MnT-Global/agentready";
const NPM_URL = "https://www.npmjs.com/package/@mntglobal/agentready";

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "agentready",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Node.js 20+",
  description:
    "Open-source store agent-readiness scanner: 29 checks across structured data, agent access, product feeds, and ACP / Google UCP / MCP protocol discovery.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  license: "https://opensource.org/licenses/MIT",
  url: `${site.url}/agentready`,
  downloadUrl: NPM_URL,
  author: { "@type": "Organization", name: "MnT (Magizh NexGen Technologies)", url: site.url },
};

const CHECK_AREAS = [
  { icon: "layers" as const, title: "Structured data depth", desc: "Product/Offer/ProductGroup JSON-LD — price, availability, identifiers, ratings." },
  { icon: "shield" as const, title: "Agent access policy", desc: "robots.txt scored by purpose: blocking a training bot is fine; blocking a shopping agent costs sales." },
  { icon: "network" as const, title: "Protocol discovery", desc: "ACP feed-readiness, Google UCP manifest, live MCP endpoints — the 2026 transaction layer." },
  { icon: "gauge" as const, title: "Feeds, freshness & AEO", desc: "Catalog endpoints, sitemap freshness, price consistency, citability, a11y quick pass." },
];

const ROADMAP = [
  {
    name: "vibecheck",
    when: "September 2026",
    desc: "Production-readiness auditor for AI-built stores — injection points, exposed secrets, price-tamper logic, load behaviour. Born from our AI Cleanup Lab.",
    icon: "eye" as const,
  },
  {
    name: "retail-mcp",
    when: "October 2026",
    desc: "Open-source Retail MCP server kit — expose catalog, inventory and pricing to AI agents securely. Shopify adapter first.",
    icon: "store" as const,
  },
  {
    name: "acp-testkit",
    when: "October 2026",
    desc: "Agentic-checkout conformance suite + a mock shopping agent — test your ACP/UCP integration before a real agent embarrasses you.",
    icon: "check" as const,
  },
];

const TERMINAL_LINES = [
  { text: "$ npx @mntglobal/agentready aeropress.com", cls: "text-white" },
  { text: "", cls: "" },
  { text: "  B+   88/100 — 7 fixes to become fully agent-ready", cls: "text-brand-300 font-semibold" },
  { text: "", cls: "" },
  { text: "  ████████████  Agent Access         15/15", cls: "text-emerald-400" },
  { text: "  ███████████░  Structured Data      23.5/25", cls: "text-emerald-400" },
  { text: "  ██████████░░  Protocol Endpoints   11/13", cls: "text-emerald-400" },
  { text: "  ██████░░░░░░  Data Freshness       4/8", cls: "text-amber-400" },
  { text: "", cls: "" },
  { text: "  ✓ PE-02 UCP manifest — discoverable by Google's", cls: "text-white/70" },
  { text: "    agentic surfaces (v2026-04-08)", cls: "text-white/70" },
  { text: "  ⚠ SD-04 Identifiers missing: gtin/mpn", cls: "text-amber-400/90" },
];

export default function OpenSourcePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white">
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
                  We open-source our <span className="text-brand-300">agentic-commerce</span>{" "}
                  tooling.
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                  Anyone can claim &ldquo;agent-ready.&rdquo; We publish the tools that prove it —
                  MIT-licensed, honest limitations in every README, benchmarks you can reproduce.
                  Starting with <strong className="text-white">agentready</strong>: scan any store
                  and see exactly what AI shopping agents see.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={SCANNER_URL}
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
                  >
                    Scan your store free <Icon name="arrow" className="h-4 w-4" />
                  </a>
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    <Icon name="code" className="h-4 w-4" /> Star on GitHub
                  </a>
                </div>
                <p className="mt-5 text-sm text-white/50">
                  No email needed for the score · ~15 polite requests · MIT
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-[#050f1f] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                <div className="mb-4 flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                </div>
                <pre className="overflow-x-auto font-mono text-[13px] leading-relaxed">
                  {TERMINAL_LINES.map((line, i) => (
                    <div key={`${i}-${line.text.slice(0, 12)}`} className={line.cls}>
                      {line.text || " "}
                    </div>
                  ))}
                </pre>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What agentready checks */}
      <section className="container-mnt py-20 sm:py-24">
        <SectionHeading
          eyebrow="agentready"
          title={
            <>
              29 checks. 100 points. <span className="text-brand">One honest grade.</span>
            </>
          }
          subtitle="agentready fetches your store the way an agent does — no JavaScript, no mercy — and grades what it finds, with evidence quoted from your actual pages."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CHECK_AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={area.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-navy">{area.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{area.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-500">
            <a href={GITHUB_URL} className="inline-flex items-center gap-1.5 hover:text-navy" target="_blank" rel="noopener noreferrer">
              <Icon name="code" className="h-4 w-4" /> MnT-Global/agentready
            </a>
            <a href={NPM_URL} className="inline-flex items-center gap-1.5 hover:text-navy" target="_blank" rel="noopener noreferrer">
              <Icon name="download" className="h-4 w-4" /> npx @mntglobal/agentready
            </a>
            <a href={`${GITHUB_URL}/blob/main/docs/checks.md`} className="inline-flex items-center gap-1.5 hover:text-navy" target="_blank" rel="noopener noreferrer">
              <Icon name="link" className="h-4 w-4" /> Full check reference
            </a>
          </div>
        </Reveal>
      </section>

      {/* Why we open source */}
      <section className="bg-slate-50">
        <div className="container-mnt py-20 sm:py-24">
          <SectionHeading
            eyebrow="Why"
            title={
              <>
                Proof over promises. <span className="text-brand">Honesty over hype.</span>
              </>
            }
            subtitle="The agentic-commerce protocols are months old. Everyone claims expertise — we'd rather show working code."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {[
              {
                icon: "eye" as const,
                title: "Inspectable expertise",
                desc: "Our protocol research, spec pins and probe data ship in the repo. You can audit what we scan — closed-source competitors can't say that.",
              },
              {
                icon: "spark" as const,
                title: "Honest by design",
                desc: "Every README has a limitations section. Checks that can't run are excluded from your score — never counted against you. If no vendor consumes llms.txt, the report says so.",
              },
              {
                icon: "rocket" as const,
                title: "Free tools, expert fixes",
                desc: "The scanners are MIT-licensed forever. Our business is the engineering behind the fixes — platform builds, protocol integrations, embedded agents.",
              },
            ].map((point, i) => (
              <Reveal key={point.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
                    <Icon name={point.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-navy">{point.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{point.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="container-mnt py-20 sm:py-24">
        <SectionHeading
          eyebrow="Roadmap"
          title={
            <>
              agentready is the first of <span className="text-brand">four</span>.
            </>
          }
          subtitle="Every tool maps to a real problem we fix for clients — no orphan repos, no abandonware."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {ROADMAP.map((item, i) => (
            <Reveal key={item.name} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-dashed border-slate-300 bg-white p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
                    {item.when}
                  </span>
                </div>
                <h3 className="mt-4 font-mono text-lg font-bold text-navy">{item.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-10 text-center text-sm text-slate-500">
          Follow along:{" "}
          <a href={GITHUB_URL} className="font-semibold text-brand hover:underline" target="_blank" rel="noopener noreferrer">
            github.com/MnT-Global
          </a>{" "}
          · or{" "}
          <Link href="/newsletter" className="font-semibold text-brand hover:underline">
            get release notes by email
          </Link>
        </p>
      </section>

      <CTASection
        eyebrow="From scan to fix"
        title="agentready finds the gaps. We build the fixes."
        body="Run the free scan, then bring the report to a free architecture workshop — a senior engineer maps every finding to a concrete fix plan for your platform."
      />
    </>
  );
}
