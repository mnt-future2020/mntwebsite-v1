"use client";

import { useEffect, useRef, useState } from "react";
import { useFormToken } from "./useFormToken";

/**
 * Lead form for the ad landing page.
 *
 * The whole reason those utm_* placeholders are on the ad URL is attribution:
 * without capturing them the campaign can tell you a lead arrived but not which
 * ad, adset or creative earned it, which makes the spend unmeasurable. They are
 * read from the query string on mount and travel with the enquiry.
 *
 * Meta substitutes its own values into the placeholders. If a click somehow
 * arrives with the raw `{{ad.name}}` text unsubstituted, that is recorded as-is
 * rather than cleaned up: a broken tracking template is worth knowing about.
 */
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;

export default function LandingLeadForm({
  id = "lead",
  variant = "commerce",
}: {
  id?: string;
  variant?: "commerce" | "fashion";
}) {
  const fashion = variant === "fashion";
  const { token, refresh: refreshToken } = useFormToken({ lazy: true });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const utm = useRef<Record<string, string>>({});

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const got: Record<string, string> = {};
    for (const k of UTM_KEYS) {
      const v = q.get(k);
      if (v) got[k] = v;
    }
    if (document.referrer) got.referrer = document.referrer;
    utm.current = got;
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    const f = new FormData(e.currentTarget);

    const attribution = Object.entries(utm.current)
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");

    const body = {
      name: String(f.get("name") || ""),
      email: String(f.get("email") || ""),
      company: String(f.get("company") || ""),
      // Phone is not a field the enquiry API takes, so it rides in the message
      // rather than being silently dropped on the floor.
      message: [
        `Enquiry from the ${fashion ? "fashion store" : "MnT Commerce India"} landing page.`,
        `Phone / WhatsApp: ${String(f.get("phone") || "not given")}`,
        fashion
          ? `Sells: ${String(f.get("sells") || "not given")}`
          : `Monthly orders: ${String(f.get("volume") || "not given")}`,
        fashion ? `Sells today on: ${String(f.get("channel") || "not given")}` : "",
        String(f.get("message") || "").trim(),
        attribution ? `\n--- campaign ---\n${attribution}` : "",
      ]
        .filter(Boolean)
        .join("\n"),
      source: fashion ? "lp-fashion-store" : "lp-commerce-india",
      formToken: token,
      website: String(f.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.error || "Something went wrong. Please try again.");
        setState("error");
        void refreshToken();
        return;
      }
      setState("done");
    } catch {
      setError("Could not reach us just now. Please try again.");
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="rounded-3xl border border-brand-200 bg-brand-50 p-8 text-center">
        <div className="text-[13px] font-bold text-brand-700">Received</div>
        <p className="mt-3 font-display text-[22px] font-bold leading-[1.25] tracking-[-0.026em] text-bp-ink">
          Thanks. We will be in touch on WhatsApp.
        </p>
        <p className="mt-3 text-[15px] leading-[1.65] text-bp-mute">
          A senior consultant reads this before the call, so we will start at your actual
          question rather than at a script.
        </p>
      </div>
    );
  }

  const field =
    "w-full rounded-xl border border-bp-edge bg-white px-4 py-3.5 text-[15px] text-bp-ink outline-none transition-colors placeholder:text-bp-faint focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10";

  return (
    <form onSubmit={onSubmit} onFocus={() => !token && void refreshToken()} className="space-y-3">
      {/* Honeypot: hidden from people, irresistible to bots. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px opacity-0"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className={field} autoComplete="name" />
        <input
          name="phone"
          required
          type="tel"
          placeholder="Phone / WhatsApp"
          className={field}
          autoComplete="tel"
        />
      </div>
      <input
        name="email"
        required
        type="email"
        placeholder="Email"
        className={field}
        autoComplete="email"
      />
      <input name="company" placeholder="Business name" className={field} autoComplete="organization" />
      {fashion ? (
        <div className="grid gap-3 sm:grid-cols-2">
          <select name="sells" className={`${field} appearance-none`} defaultValue="">
            <option value="" disabled>What do you sell?</option>
            <option>Sarees</option>
            <option>Women&apos;s fashion</option>
            <option>Men&apos;s fashion</option>
            <option>Kids wear</option>
            <option>Ethnic wear</option>
            <option>Boutique / designer</option>
            <option>Other</option>
          </select>
          <select name="channel" className={`${field} appearance-none`} defaultValue="">
            <option value="" disabled>Where do you sell now?</option>
            <option>Physical shop</option>
            <option>Instagram</option>
            <option>WhatsApp</option>
            <option>My own website</option>
            <option>A marketplace</option>
            <option>Not started yet</option>
          </select>
        </div>
      ) : (
        <select name="volume" className={`${field} appearance-none`} defaultValue="">
          <option value="" disabled>Orders a month</option>
          <option>Under 100</option>
          <option>100 to 1,000</option>
          <option>1,000 to 10,000</option>
          <option>Over 10,000</option>
          <option>Not selling online yet</option>
        </select>
      )}
      <textarea
        name="message"
        rows={3}
        placeholder={fashion ? "Anything else we should know? (optional)" : "What are you selling, and what is the platform costing you today?"}
        className={field}
      />

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] leading-[1.55] text-red-800">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        id={id}
        className="w-full rounded-full bg-brand-700 px-6 py-4 text-[16px] font-bold text-white shadow-[0_14px_30px_-12px_rgba(14,102,194,0.7)] transition-all hover:-translate-y-0.5 hover:bg-brand-800 disabled:translate-y-0 disabled:opacity-60"
      >
        {state === "sending" ? "Sending…" : fashion ? "Get my free store plan" : "Book a free demo"}
      </button>
      <p className="text-center text-[12.5px] leading-[1.5] text-bp-faint">
        {fashion
          ? "No spam. No obligation. Just a free consultation."
          : "No obligation. We will tell you if a cheaper option fits you better."}
      </p>
    </form>
  );
}
