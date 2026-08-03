"use client";

import { useEffect, useRef, useState } from "react";
import type { Report, CheckResult, Category } from "@mntglobal/agentready-core";
import Icon from "./Icon";
import { useFormToken, honeypotWrapClass } from "./useFormToken";

// Local copy of the category metadata: client bundles must never import runtime
// values from agentready-core (it pulls in server-only node: builtins via undici).
const CATEGORY_META = [
  { key: "structured-data", label: "Structured Data" },
  { key: "agent-access", label: "Agent Access" },
  { key: "product-feeds", label: "Product Feeds" },
  { key: "protocol-endpoints", label: "Protocol Endpoints" },
  { key: "machine-readability", label: "Machine Readability" },
  { key: "aeo-citability", label: "AEO Citability" },
  { key: "data-freshness", label: "Data Freshness" },
  { key: "accessibility", label: "Accessibility" },
] as const;

const STAGES = [
  "Fetching your store the way an agent does…",
  "Reading robots.txt, llms.txt and sitemaps…",
  "Discovering product pages…",
  "Probing ACP · UCP · MCP endpoints…",
  "Scoring 29 checks…",
];

function gradeTone(grade: string) {
  if (grade.startsWith("A")) return { bg: "bg-emerald-500", bar: "bg-emerald-500", text: "text-emerald-600" };
  if (grade.startsWith("B")) return { bg: "bg-brand", bar: "bg-brand", text: "text-brand-700" };
  if (grade.startsWith("C")) return { bg: "bg-amber-500", bar: "bg-amber-500", text: "text-amber-600" };
  return { bg: "bg-red-500", bar: "bg-red-500", text: "text-red-600" };
}

const STATUS_ICON: Record<CheckResult["status"], { char: string; cls: string }> = {
  pass: { char: "✓", cls: "text-emerald-600" },
  warn: { char: "⚠", cls: "text-amber-600" },
  fail: { char: "✗", cls: "text-red-600" },
  info: { char: "○", cls: "text-slate-400" },
};

function LeadCard({ report }: { report: Report }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent">("idle");
  // Anti-spam: see lib/antispam.ts. This endpoint mails the address it is given.
  const { token, refresh: refreshToken } = useFormToken();
  const [website, setWebsite] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || state === "busy") return;
    setState("busy");
    try {
      const res = await fetch("/api/agentready/lead", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          storeUrl: report.targetUrl,
          grade: report.grade,
          score: report.score,
          formToken: token,
          website,
        }),
      });
      if (!res.ok) {
        // The token is spent per attempt: refresh so a retry can succeed.
        void refreshToken();
        setState("idle");
        return;
      }
      setState("sent");
    } catch {
      void refreshToken();
      setState("idle");
    }
  }

  return (
    <div className="border border-bp-edge bg-white p-7 shadow-sm">
      <h3 className="text-lg font-bold text-navy">Want the engineer-grade fix plan?</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">
        We&apos;ll send a prioritized remediation plan for every finding: mapped to your
        platform, with effort estimates. Free, from the MnT Future engineering team.
      </p>
      {state === "sent" ? (
        <p className="mt-4 text-sm font-semibold text-emerald-600">
          ✓ On its way: check your inbox within one business day.
        </p>
      ) : (
        <form onSubmit={submit} className="mt-4 flex flex-wrap gap-3">
          {/* Honeypot: off-screen and out of the tab order. See ContactForm. */}
          <div className={honeypotWrapClass} aria-hidden="true">
            <label htmlFor="scan-website">Leave this field empty</label>
            <input
              id="scan-website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@brand.com"
            aria-label="Work email"
            className="min-w-0 flex-1 rounded-full border border-slate-300 px-5 py-2.5 text-sm outline-none focus:border-brand"
          />
          <button
            type="submit"
            disabled={state === "busy"}
            className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
          >
            Send my fix plan
          </button>
        </form>
      )}
    </div>
  );
}

function ReportPanel({ report }: { report: Report }) {
  const tone = gradeTone(report.grade);
  const fixCount = report.results.filter((r) => r.status === "fail" || r.status === "warn").length;
  const byCategory = new Map(report.categories.map((c) => [c.category, c]));

  return (
    <div className="mt-10 border border-bp-edge bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-wrap items-center gap-6">
        <div
          className={`flex h-24 w-24 shrink-0 items-center justify-center text-4xl font-extrabold text-white ${tone.bg}`}
        >
          {report.grade}
        </div>
        <div>
          <h2 className="text-2xl font-extrabold text-navy">
            {report.score}/100:{" "}
            {fixCount === 0
              ? "agent-ready"
              : `${fixCount} fix${fixCount === 1 ? "" : "es"} to become fully agent-ready`}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {report.targetUrl} · {report.pointsEarned}/{report.pointsMax} pts across assessed
            checks
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-2.5">
        {CATEGORY_META.map(({ key, label }) => {
          const scored = byCategory.get(key as Category);
          const pct = scored && scored.max > 0 ? (scored.earned / scored.max) * 100 : 0;
          return (
            <div key={key} className="grid grid-cols-[150px_1fr_60px] items-center gap-3 text-sm sm:grid-cols-[180px_1fr_70px]">
              <span className="truncate text-slate-700">{label}</span>
              <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="text-right tabular-nums text-slate-500">
                {scored ? `${scored.earned}/${scored.max}` : "n/a"}
              </span>
            </div>
          );
        })}
      </div>

      {report.topFixes.length > 0 && (
        <div className="mt-8">
          <h3 className="font-bold text-navy">Top fixes</h3>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
            {report.topFixes.slice(0, 5).map((fix) => (
              <li key={fix.id}>
                <span className="font-semibold text-navy">[{fix.id}]</span>{" "}
                {fix.fix ?? fix.summary}
              </li>
            ))}
          </ol>
        </div>
      )}

      <details className="mt-8 bg-slate-50 p-5">
        <summary className="cursor-pointer text-sm font-semibold text-navy">
          All {report.results.length} checks (with evidence)
        </summary>
        <div className="mt-4 space-y-5">
          {CATEGORY_META.map(({ key, label }) => {
            const rows = report.results.filter((r) => r.category === (key as Category));
            if (rows.length === 0) return null;
            return (
              <div key={key}>
                <div className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-700">
                  {label}
                </div>
                <div className="mt-2 space-y-3">
                  {rows.map((result) => (
                    <div key={result.id} className="text-sm">
                      <span className={STATUS_ICON[result.status].cls}>
                        {STATUS_ICON[result.status].char}
                      </span>{" "}
                      <span className="font-semibold text-navy">{result.id}</span>{" "}
                      <span className="text-slate-700">{result.title}</span>{" "}
                      <span className="text-xs text-slate-400">
                        ({result.points}/{result.maxPoints})
                      </span>
                      <p className="ml-5 text-slate-600">{result.summary}</p>
                      {result.evidence.length > 0 && (
                        <ul className="ml-9 mt-1 list-disc text-xs text-slate-500">
                          {result.evidence.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                          {result.fix && (
                            <li className="text-slate-600">
                              <span className="font-semibold">Fix:</span> {result.fix}
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </details>

      <div className="mt-6 bg-slate-50 p-5 text-xs leading-relaxed text-slate-500">
        <span className="font-semibold text-slate-600">Honest limitations:</span>{" "}
        {report.limitations.join(" ")}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <LeadCard report={report} />
        <div className="border border-bp-edge bg-deep p-7 text-white">
          <h3 className="text-lg font-bold">Or talk to the team that built this</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70">
            Bring this report to a free strategy session: a senior consultant maps every
            finding to a concrete fix plan for your platform.
          </p>
          <a
            href="/strategy-session"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
          >
            Book a free strategy session <Icon name="arrow" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AgentReadyScanner() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [stage, setStage] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scanning) return;
    const timer = setInterval(() => setStage((s) => (s + 1) % STAGES.length), 2600);
    return () => clearInterval(timer);
  }, [scanning]);

  useEffect(() => {
    if (report) resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [report]);

  async function runScan(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || scanning) return;
    setScanning(true);
    setStage(0);
    setError(null);
    setReport(null);
    try {
      const res = await fetch("/api/agentready", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = (await res.json()) as { report?: Report; error?: string };
      if (!res.ok || !data.report) setError(data.error ?? "Scan failed: please try again.");
      else setReport(data.report);
    } catch {
      setError("Network error: please try again.");
    } finally {
      setScanning(false);
    }
  }

  return (
    <div>
      <form onSubmit={runScan} className="mx-auto flex max-w-xl flex-wrap justify-center gap-3">
        <input
          type="text"
          inputMode="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="your-store.com"
          aria-label="Store URL"
          className="min-w-0 flex-1 basis-64 rounded-full border border-slate-300 bg-white px-6 py-3.5 text-bp-ink shadow-sm placeholder:text-slate-400 outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
        <button
          type="submit"
          disabled={scanning}
          className="inline-flex items-center gap-2 rounded-full bg-brand px-7 py-3.5 font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
        >
          {scanning ? "Scanning…" : "Scan free"} <Icon name="arrow" className="h-4 w-4" />
        </button>
      </form>
      {scanning && (
        <p className="mt-5 text-center text-sm font-medium text-brand-700">
          <span className="animate-pulse">●</span> {STAGES[stage]}
        </p>
      )}
      {error && (
        <p className="mx-auto mt-5 max-w-xl border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-700">
          {error}
        </p>
      )}
      <div ref={resultRef}>{report && <ReportPanel report={report} />}</div>
    </div>
  );
}
