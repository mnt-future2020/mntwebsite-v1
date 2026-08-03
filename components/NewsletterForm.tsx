"use client";

import { useState } from "react";
import Icon from "./Icon";
import { useFormToken, honeypotWrapClass } from "./useFormToken";

export default function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");
  // Anti-spam: see lib/antispam.ts. Confirmation mail goes to whatever address
  // is posted, so this endpoint needs the same gate as the enquiry form.
  const { token, refresh: refreshToken } = useFormToken({ lazy: true });
  const [website, setWebsite] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source, formToken: token, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setMsg(data.error || "Something went wrong.");
        void refreshToken();
        return;
      }
      setState("done");
      setMsg(data.message || "Subscribed: see you in the next issue.");
      setEmail("");
    } catch {
      setState("error");
      setMsg("Network error. Please try again.");
      void refreshToken();
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-center gap-2 text-[13.5px] text-green-300">
        <Icon name="check" className="h-[15px] w-[15px] shrink-0" />
        <span>{msg}</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Honeypot: off-screen and out of the tab order. See ContactForm. */}
      <div className={honeypotWrapClass} aria-hidden="true">
        <label htmlFor="newsletter-website">Leave this field empty</label>
        <input
          id="newsletter-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => { if (!token) void refreshToken(); }}
          placeholder="you@company.com"
          aria-label="Email address"
          className="min-w-0 flex-1 border border-[#1E2A3A] bg-bp-ink px-[13px] py-2.5 text-[13.5px] text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand-500"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="bg-brand-500 px-[18px] py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand-400 disabled:opacity-60"
        >
          {state === "loading" ? "…" : "Subscribe"}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-xs text-red-300">{msg}</p>}
    </form>
  );
}
