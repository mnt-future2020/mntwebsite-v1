"use client";

import { useState } from "react";
import Icon from "./Icon";

const fieldClass =
  "rounded-[10px] border border-slate-300 bg-white px-3.5 py-3 text-[14.5px] text-ink placeholder:text-slate-400 outline-none transition-all focus:border-brand-500 focus:ring-[3px] focus:ring-brand-500/15";

const labelClass = "flex flex-col gap-[7px] text-[13px] font-semibold text-slate-700";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

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
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error(d.error || "Couldn't send your message. Please try again.");
      }
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
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
        <h3 className="mt-5 font-display text-[23px] font-bold text-ink">
          Thanks — we&apos;ll be in touch.
        </h3>
        <p className="mx-auto mt-3 max-w-[340px] text-[14.5px] leading-[1.65] text-slatey">
          A senior engineer will reply within one business day to schedule your workshop.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-[18px]">
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
          Email
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
        Company
        <input
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
          placeholder="Company / store URL"
          className={fieldClass}
        />
      </label>
      <label className={labelClass}>
        What are you building?
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="A headless rebuild, a marketplace, agent-readiness for our store…"
          className={`${fieldClass} resize-y`}
        />
      </label>

      {error && (
        <div className="rounded-[10px] border border-red-200 bg-red-50 px-3.5 py-[11px] text-[13.5px] text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center gap-[9px] rounded-[10px] bg-brand-700 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {sending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending…
          </>
        ) : (
          <>
            Book my free workshop
            <Icon name="arrow" className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
