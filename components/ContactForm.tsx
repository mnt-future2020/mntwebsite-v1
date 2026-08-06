"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { useFormToken } from "./useFormToken";
import Honeypot from "./Honeypot";
import { regionFromPath } from "@/lib/regions";

const fieldClass =
  "border border-slate-300 bg-white px-3.5 py-3 text-[14.5px] text-bp-ink placeholder:text-slate-400 outline-none transition-all focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/15";

const labelClass = "flex flex-col gap-[7px] text-[13px] font-semibold text-slate-700";

/**
 * The form is asked in the buyer's own terms, per region.
 *
 * /in/contact was rendering the US form: an Indian buyer was being asked to
 * price the work in dollars, against brackets that start at $25,000 — about
 * ₹21 lakh, which is above the whole budget of most of the businesses this
 * tree is written for — and to pick from service options ("Shopify store
 * build", "AI cleanup / MVP rescue") that are not the lines India sells.
 * Nothing about that form said "this is for you", and a budget question a
 * visitor cannot honestly answer is where they abandon.
 *
 * The values are free text in the DB (Lead.vertical / Lead.budget), so the two
 * sets can differ without a migration.
 */
const COPY = {
  us: {
    need: [
      "Commerce platform build",
      "Shopify store build",
      "AI & agents / agent-ready",
      "AI cleanup / MVP rescue",
      "Something else / not sure yet",
    ],
    stage: [
      "No store yet: starting fresh",
      "On Shopify / a template platform",
      "On a custom-built platform",
      "Running a marketplace or B2B channel",
      "MVP built, struggling at scale",
    ],
    budgetLabel: "Indicative budget",
    budget: ["Not sure yet", "Under $25k", "$25k to $75k", "$75k to $200k", "$200k+"],
    submit: "Book my free strategy session",
    companyPlaceholder: "yourstore.com: helps us prep before the call",
    messagePlaceholder:
      "The bottleneck, the goal, the stack: whatever a senior consultant should read before your session…",
  },
  in: {
    need: [
      "Ecommerce platform build",
      "One of your products: AI Desk, AI CRM, Commerce India",
      "AI consultation or automation",
      "AI agent or a custom AI application",
      "Support for a platform I already have",
      "Something else / not sure yet",
    ],
    stage: [
      "Nothing built yet: starting fresh",
      "On Shopify, WooCommerce or another rented platform",
      "On a platform built for us already",
      "Selling mainly on marketplaces (Amazon, Flipkart, Meesho)",
      "Built something already, struggling at scale",
    ],
    budgetLabel: "Indicative budget (₹)",
    // Rupee brackets, sized for the Indian mid-market this tree sells to.
    // Adjust these if they do not match where your deals actually land — they
    // are a filter for us, not a price list for the buyer.
    budget: [
      "Not sure yet",
      "Under ₹5 lakh",
      "₹5 lakh to ₹15 lakh",
      "₹15 lakh to ₹40 lakh",
      "₹40 lakh+",
      "Monthly retainer, for embedded engineering",
    ],
    // Not "book a session": plenty of enquiries here are a question, and
    // making the only button a 45-minute commitment loses the ones that are.
    submit: "Send my enquiry",
    companyPlaceholder: "yoursite.com: we will look at it before replying",
    messagePlaceholder:
      "What you sell, what you run on today, and the thing that is blocking you…",
  },
} as const;

export default function ContactForm() {
  const region = regionFromPath(usePathname() || "/");
  const copy = COPY[region];

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
    need: copy.need[0],
    stage: copy.stage[0],
    budget: copy.budget[0],
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
          // So the team can tell an India enquiry from a US one at a glance.
          source: region === "in" ? "contact-form-in" : "contact-form",
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
{region === "in"
            ? "A senior consultant reads every enquiry and replies within one working day, usually the same day."
            : "A senior consultant will reply within one business day to schedule your strategy session."}
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
          placeholder={copy.companyPlaceholder}
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
            {copy.need.map((o) => (
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
            {copy.stage.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
      </div>

      <label className={labelClass}>
        {copy.budgetLabel}
        <select
          value={form.budget}
          onChange={(e) => update("budget", e.target.value)}
          className={fieldClass}
        >
          {copy.budget.map((o) => (
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
          placeholder={copy.messagePlaceholder}
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
            {copy.submit}
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
