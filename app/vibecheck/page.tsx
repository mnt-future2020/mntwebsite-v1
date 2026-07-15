import type { Metadata } from "next";
import Link from "next/link";
import CTASection from "@/components/CTASection";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { Breadcrumbs, SectionHeading } from "@/components/blocks";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const GITHUB_URL = "https://github.com/MnT-Global/vibecheck";
const NPM_URL = "https://www.npmjs.com/package/@mntglobal/vibecheck";
const ACTION_URL = "https://github.com/MnT-Global/vibecheck#github-action";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/vibecheck", {
    title: "vibecheck — is your AI-built store secure & production-ready? | MnT",
    description:
      "Open-source scanner for AI-generated commerce codebases: 26 checks across secrets, injection, access control, commerce-logic tampering, dependency CVEs and more. Deterministic, private, MIT. npx @mntglobal/vibecheck.",
  });
}

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "vibecheck",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Node.js 20+",
  description:
    "Open-source, deterministic scanner for AI-generated e-commerce codebases: 26 checks across secrets, injection, access control, commerce-logic tampering, web exposure, performance, dependency CVEs and production hardening.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  license: "https://opensource.org/licenses/MIT",
  url: `${site.url}/vibecheck`,
  downloadUrl: NPM_URL,
  author: { "@type": "Organization", name: "MnT (Magizh NexGen Technologies)", url: site.url },
};

const TERMINAL_LINES: { text: string; cls: string }[] = [
  { text: "$ npx @mntglobal/vibecheck ./store", cls: "text-white/45" },
  { text: "", cls: "" },
  { text: "   F   40/100  · 2 files · 34ms", cls: "font-bold text-red-300" },
  { text: "   2 critical · 3 high · 2 low", cls: "text-white/55" },
  { text: "", cls: "" },
  { text: "  CRITICAL  Hardcoded Stripe secret key  [SEC-01]", cls: "text-red-300" },
  { text: "   server.js:15  const PAYMENT_API_KEY = \"sk_live_…\"", cls: "text-white/45" },
  { text: "  CRITICAL  Code built with new Function() from input  [INJ-01]", cls: "text-red-300" },
  { text: "   server.js:48", cls: "text-white/45" },
  { text: "  HIGH  Admin route /admin/orders has no auth  [AUTH-01]", cls: "text-amber-300" },
  { text: "   server.js:62", cls: "text-white/45" },
  { text: "  HIGH  Order quantity used in pricing without validation  [COM-02]", cls: "text-amber-300" },
  { text: "   server.js:80  const total = prod.price * qty", cls: "text-white/45" },
  { text: "  LOW   Internal error detail returned to the client  [PROD-03]", cls: "text-sky-300" },
  { text: "", cls: "" },
  { text: "  → the same store, hardened: A 94/100.", cls: "text-emerald-300" },
];

const CHECK_AREAS = [
  { icon: "shield" as const, title: "Secrets & credentials", desc: "Hardcoded provider keys, committed .env files, private keys & DB URIs, secrets shipped to the browser via NEXT_PUBLIC_ vars." },
  { icon: "code" as const, title: "Injection & RCE", desc: "eval / new Function from input, string-built SQL, command injection, prototype pollution — the classic AI-slop footguns." },
  { icon: "lock" as const, title: "Access control", desc: "Sensitive routes with no authentication, permissive CORS with credentials, hardcoded / default admin tokens." },
  { icon: "wallet" as const, title: "Commerce logic — the wedge", desc: "Checkout that trusts a client-sent price, unvalidated quantity (buy −5, get a refund), coupons applied without server validation. No generic scanner checks this." },
  { icon: "globe" as const, title: "Web exposure", desc: "Unsanitized dangerouslySetInnerHTML / innerHTML, SSRF on user-supplied URLs, path traversal into the filesystem." },
  { icon: "bolt" as const, title: "Performance & scale", desc: "Synchronous I/O on the request path, re-reading the whole database per request, N+1 queries — demos fine, dies at real traffic." },
  { icon: "layers" as const, title: "Dependencies", desc: "Known-vulnerable npm packages via the OSV database (with the fixed version), missing helmet / CSP security headers." },
  { icon: "gauge" as const, title: "Production hardening", desc: "No rate limiting, internal errors leaked to clients, secrets written to logs, no test suite." },
];

const OUTPUTS = [
  { icon: "code" as const, title: "Terminal & JSON", desc: "A graded report with evidence and fixes, or machine-readable JSON for your own tooling." },
  { icon: "shield" as const, title: "SARIF → code scanning", desc: "Upload to GitHub's Security tab and see every finding annotated inline on the exact line." },
  { icon: "github" as const, title: "GitHub Action", desc: "One line in your workflow: posts a PR summary comment, uploads SARIF, fails the check below a grade." },
  { icon: "image" as const, title: "Shareable report card", desc: "A self-contained HTML card of the grade and findings — great in a screenshot or a Slack message." },
];

const TRUST = [
  { icon: "lock" as const, text: "Deterministic — no AI, no API key. Same code = same grade." },
  { icon: "shield" as const, text: "Your code never leaves your machine." },
  { icon: "eye" as const, text: "Open source (MIT) — audit every check on GitHub." },
];

export default function VibecheckPage() {
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
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/" },
              { label: "Open Source", href: "/open-source" },
              { label: "vibecheck" },
            ]}
          />
          <div className="mt-8 grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" /> Open source · Live on npm
                </div>
                <h1 className="mt-4 text-4xl font-extrabold leading-[1.08] sm:text-5xl">
                  Your AI wrote the code. Did it ship the{" "}
                  <span className="text-brand-300">vulnerabilities</span> too?
                </h1>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/70">
                  vibecheck reads an AI-built store the way a security reviewer would —
                  deterministically, in seconds — and grades it. Hardcoded keys, unauthenticated
                  admin routes, checkout that trusts client prices. <strong className="text-white">26 checks</strong>,
                  a letter grade, the exact <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm">file:line</code> and the fix.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-600"
                  >
                    <Icon name="github" className="h-4 w-4" /> View on GitHub
                  </a>
                  <a
                    href={NPM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 font-semibold text-white/85 transition hover:bg-white/10"
                  >
                    <Icon name="download" className="h-4 w-4" /> View on npm
                  </a>
                </div>
                <code className="mt-6 block w-fit rounded-xl bg-black/30 px-4 py-3 font-mono text-sm text-brand-200">
                  npx @mntglobal/vibecheck ./your-store
                </code>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-3xl border border-white/10 bg-[#050f1f] p-5 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
                <div className="mb-4 flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                  <span className="h-3 w-3 rounded-full bg-white/15" />
                </div>
                <pre className="overflow-x-auto font-mono text-[12.5px] leading-relaxed">
                  {TERMINAL_LINES.map((line, i) => (
                    <div key={`${i}-${line.text.slice(0, 12)}`} className={line.cls}>
                      {line.text || " "}
                    </div>
                  ))}
                </pre>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-white/55">
              {TRUST.map((point) => (
                <span key={point.text} className="inline-flex items-center gap-2">
                  <Icon name={point.icon} className="h-4 w-4 text-brand-300" /> {point.text}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* What it checks */}
      <section className="container-mnt py-20 sm:py-24">
        <SectionHeading
          eyebrow="What it checks"
          title={
            <>
              26 checks. 8 categories. <span className="text-brand">One honest grade.</span>
            </>
          }
          subtitle="The same AI that wrote your store shipped the bug — so asking it to grade its own work isn't trustworthy. vibecheck is the independent, commerce-tuned second opinion, tuned for the failure modes AI codegen actually ships."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {CHECK_AREAS.map((area, i) => (
            <Reveal key={area.title} delay={i * 0.04}>
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
              <Icon name="github" className="h-4 w-4" /> MnT-Global/vibecheck
            </a>
            <a href={NPM_URL} className="inline-flex items-center gap-1.5 hover:text-navy" target="_blank" rel="noopener noreferrer">
              <Icon name="download" className="h-4 w-4" /> npx @mntglobal/vibecheck
            </a>
            <a href={`${GITHUB_URL}/blob/main/docs/rules.md`} className="inline-flex items-center gap-1.5 hover:text-navy" target="_blank" rel="noopener noreferrer">
              <Icon name="link" className="h-4 w-4" /> Full rules reference
            </a>
          </div>
        </Reveal>
      </section>

      {/* Prove it broken → prove it fixed */}
      <section className="bg-navy">
        <div className="container-mnt py-20 sm:py-24">
          <SectionHeading
            tone="dark"
            eyebrow="Prove it"
            title={
              <>
                From <span className="text-red-300">F 40</span> to{" "}
                <span className="text-emerald-300">A 94</span> — with the receipts.
              </>
            }
            subtitle="vibecheck was born from our AI Cleanup Lab, where a deliberately vibe-coded store went from 5/5 live exploits landing to 0/5 after a rebuild. Every finding quotes your actual code, so it's reproducible by anyone with npx."
          />
          <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-7">
                <div className="font-mono text-sm font-bold text-red-300">before · F 40/100</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>Live Stripe key hardcoded in the source</li>
                  <li>/admin/orders leaks emails + card digits, no auth</li>
                  <li>Checkout accepts a negative quantity</li>
                  <li>Search box runs attacker code via new Function()</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/5 p-7">
                <div className="font-mono text-sm font-bold text-emerald-300">after · A 94/100</div>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>Secrets in env vars, never returned to clients</li>
                  <li>Admin routes behind a bearer-token check</li>
                  <li>Quantity validated as an integer, 1–99</li>
                  <li>Safe substring search, HTML-escaped output</li>
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Outputs */}
      <section className="container-mnt py-20 sm:py-24">
        <SectionHeading
          eyebrow="Fits your workflow"
          title={
            <>
              Run it anywhere. <span className="text-brand">Fail the PR that regresses.</span>
            </>
          }
          subtitle="One deterministic engine, every surface — from a quick local scan to a gated pull request with findings annotated inline."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {OUTPUTS.map((out, i) => (
            <Reveal key={out.title} delay={i * 0.05}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name={out.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-bold text-navy">{out.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{out.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl bg-slate-50 p-6">
            <div className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              .github/workflows/vibecheck.yml
            </div>
            <pre className="mt-3 overflow-x-auto rounded-xl bg-navy px-4 py-4 font-mono text-xs leading-relaxed text-brand-200">{`- uses: MnT-Global/vibecheck@v0.1.0
  with:
    min-grade: B`}</pre>
            <p className="mt-3 text-center text-sm text-slate-500">
              Posts a PR comment, uploads to code scanning, gates on grade —{" "}
              <a href={ACTION_URL} className="font-semibold text-brand hover:underline" target="_blank" rel="noopener noreferrer">
                Action docs
              </a>
            </p>
          </div>
        </Reveal>
      </section>

      <CTASection
        eyebrow="From scan to fix"
        title="vibecheck finds the holes. We close them."
        body="Run the scan, then bring the report to a free architecture workshop — a senior engineer maps every finding to a concrete fix: auth, validation, secrets, the load pathology, the lot. That's our AI Cleanup service."
      />

      <section className="container-mnt pb-20 text-center">
        <p className="text-sm text-slate-500">
          Part of MnT&apos;s open-source program —{" "}
          <Link href="/open-source" className="font-semibold text-brand hover:underline">
            see all our agentic-commerce tooling
          </Link>
        </p>
      </section>
    </>
  );
}
