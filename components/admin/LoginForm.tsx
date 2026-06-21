"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const field =
  "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(d.error || "Login failed.");
      }
      const from =
        typeof window !== "undefined"
          ? new URLSearchParams(window.location.search).get("from")
          : null;
      router.push(from || d.redirect || "/portal");
      router.refresh();
    } catch (e2) {
      setErr(e2 instanceof Error ? e2.message : "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
          Email
        </label>
        <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={field} placeholder="admin@mntfuture.com" />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
          Password
        </label>
        <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className={field} placeholder="••••••••" />
      </div>
      {err && (
        <p className="rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-700">{err}</p>
      )}
      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-70">
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
