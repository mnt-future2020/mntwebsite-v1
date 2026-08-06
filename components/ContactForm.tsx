"use client";

import { useState } from "react";
import Icon from "./Icon";
import { useFormToken } from "./useFormToken";
import Honeypot from "./Honeypot";

const fieldClass =
  "border border-slate-300 bg-white px-3.5 py-3 text-[14.5px] text-bp-ink placeholder:text-slate-400 outline-none transition-all focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/15";

const labelClass = "flex flex-col gap-[7px] text-[13px] font-semibold text-slate-700";

const NEED_OPTIONS = [
  "Commerce platform build",
  "Shopify store build",
  "AI & agents / agent-ready",
  "AI cleanup / MVP rescue",
  "Something else / not sure yet",
];

const STAGE_OPTIONS = [
  "No store yet: starting fresh",
  "On Shopify / a template platform",
  "On a custom-built platform",
  "Running a marketplace or B2B channel",
  "MVP built, struggling at scale",
];

const BUDGET_OPTIONS = ["Not sure yet", "Under $25k", "$25k to $75k", "$75k to $200k", "$200k+"];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Anti-spam: single-use token minted on mount, plus a field only a bot fills.
  const { token, refresh: refreshToken } = useFormToken();
  const [website, setWebsite] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    need: NEED_OPTIONS[0],
    stage: STAGE_OPTIONS[0],
    budget: BUDGET_OPTIONS[0],
    message: "",
  });

  const update = (k: string, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setError(null);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          vertical: form.need,
          budget: form.budget,
          // The lead table has no column for stage: carry it in the message
          // as a labelled first line so the team sees it with the enquiry.
          message: `Where they are today: ${form.stage}\n\n${form.message}`,
          formToken: token,
          website,
        }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Couldn't send your message. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      // The token is spent on every attempt: take a fresh one so a retry works.
      void refreshToken();
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div className="px-3 py-9 text-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-700">
          <Icon name="check" className="h-[30px] w-[30px]" />
        </span>
        <h3 className="mt-5 font-display text-[23px] font-bold text-bp-ink">
          Thanks: we&apos;ll be in touch.
        </h3>
        <p className="mx-auto mt-3 max-w-[340px] text-[14.5px] leading-[1.65] text-bp-mute">
          A senior consultant will reply within one business day to schedule your strategy session.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
      <Honeypot id="contact-website" value={website} onChange={setWebsite} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          Name
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Work email
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@company.com"
            className={fieldClass}
          />
        </label>
      </div>

      <label className={labelClass}>
        Company / store URL
        <input
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          placeholder="yourstore.com: helps us prep before the call"
          className={fieldClass}
        />
      </label>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={labelClass}>
          What do you need?
          <select
            value={form.need}
            onChange={(e) => update("need", e.target.value)}
            className={fieldClass}
          >
            {NEED_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className={labelClass}>
          Where are you today?
          <select
            value={form.stage}
            onChange={(e) => update("stage", e.target.value)}
            className={fieldClass}
          >
            {STAGE_OPTIONS.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelClass}>
        Indicative budget
        <select
          value={form.budget}
          onChange={(e) => update("budget", e.target.value)}
          className={fieldClass}
        >
          {BUDGET_OPTIONS.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>

      <label className={labelClass}>
        What&apos;s the problem, or what are you building?
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="The bottleneck, the goal, the stack: whatever a senior consultant should read before your session…"
          className={`${fieldClass} resize-y`}
        />
      </label>

      {error && (
        <div className="border border-red-200 bg-red-50 px-3.5 py-[11px] text-[13.5px] text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center gap-[9px] bg-brand-700 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            Book my free strategy session
            <Icon name="arrow" className="h-4 w-4" />
          </>
        )}
      </button>
      {/* slate-500, not 400: 12px text on white needs ≥4.5:1 contrast (WCAG AA) */}
      <p className="text-xs text-slate-500">
        By submitting you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  );
}
