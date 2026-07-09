"use client";

import { useState } from "react";
import Icon from "./Icon";

const fieldClass =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    vertical: "Commerce platform build",
    budget: "Not sure yet",
    message: "",
  });

  const update = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      <div className="flex flex-col items-center justify-center rounded-[2rem] border border-slate-100 bg-white p-10 text-center shadow-card">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <Icon name="check" className="h-7 w-7" />
        </div>
        <h3 className="mt-5 font-display text-2xl font-bold text-ink">Thanks, {form.name.split(" ")[0] || "there"}.</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-slatey">
          Your message is in. A senior engineer — not a sales rep — will reply within one business
          day to set up your free workshop.
        </p>
        <button
          onClick={() => {
            setSent(false);
            setForm({ name: "", email: "", company: "", vertical: "Commerce platform build", budget: "Not sure yet", message: "" });
          }}
          className="btn-ghost mt-7"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-card sm:p-9">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-ink">
            Name
          </label>
          <input id="name" required value={form.name} onChange={(e) => update("name", e.target.value)} className={fieldClass} placeholder="Your name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-ink">
            Work email
          </label>
          <input id="email" type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} className={fieldClass} placeholder="you@company.com" />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-semibold text-ink">
            Company
          </label>
          <input id="company" value={form.company} onChange={(e) => update("company", e.target.value)} className={fieldClass} placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="vertical" className="mb-1.5 block text-sm font-semibold text-ink">
            What are you building?
          </label>
          <select id="vertical" value={form.vertical} onChange={(e) => update("vertical", e.target.value)} className={fieldClass}>
            <option>Commerce platform build</option>
            <option>AI &amp; agents</option>
            <option>AI cleanup / MVP hardening</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="budget" className="mb-1.5 block text-sm font-semibold text-ink">
          Indicative budget
        </label>
        <select id="budget" value={form.budget} onChange={(e) => update("budget", e.target.value)} className={fieldClass}>
          <option>Not sure yet</option>
          <option>Under $25k</option>
          <option>$25k–$75k</option>
          <option>$75k–$200k</option>
          <option>$200k+</option>
        </select>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-ink">
          Tell us about the project
        </label>
        <textarea id="message" required rows={5} value={form.message} onChange={(e) => update("message", e.target.value)} className={`${fieldClass} resize-none`} placeholder="What are you trying to build, and what's the goal?" />
      </div>

      {error && (
        <p className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button type="submit" disabled={sending} className="btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto">
        {sending ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Sending your message…
          </>
        ) : (
          <>
            Send &amp; book a workshop <Icon name="arrow" className="h-4 w-4" />
          </>
        )}
      </button>
      {/* slate-500, not 400 — 12px text on white needs ≥4.5:1 contrast (WCAG AA) */}
      <p className="mt-4 text-xs text-slate-500">
        By submitting you agree to be contacted about your enquiry. We never share your details.
      </p>
    </form>
  );
}
