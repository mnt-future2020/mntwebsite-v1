"use client";

import { useState } from "react";
import Icon from "./Icon";

export default function NewsletterForm({ source = "footer" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setState("error");
        setMsg(data.error || "Something went wrong.");
        return;
      }
      setState("done");
      setMsg(data.message || "Thanks for subscribing!");
      setEmail("");
    } catch {
      setState("error");
      setMsg("Network error. Please try again.");
    }
  }

  if (state === "done") {
    return (
      <div className="flex items-start gap-2.5 rounded-xl border border-brand/30 bg-brand/10 px-4 py-3 text-sm text-white/90">
        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-200" />
        <span>{msg}</span>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate>
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-brand"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-brand-600 disabled:opacity-60"
        >
          {state === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-xs text-red-300">{msg}</p>}
    </form>
  );
}
