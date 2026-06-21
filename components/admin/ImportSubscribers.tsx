"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";

type Result = {
  found: number;
  valid: number;
  invalid: number;
  alreadySubscribed: number;
  pending: number;
  invited: number;
  failed: number;
  emailSkipped: boolean;
  error?: string;
};

export default function ImportSubscribers() {
  const router = useRouter();
  const [emails, setEmails] = useState("");
  const [source, setSource] = useState("import");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy || !emails.trim()) return;
    setBusy(true);
    setErr(null);
    setResult(null);
    try {
      const res = await fetch("/api/admin/subscribers/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails, source }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.error || "Import failed.");
      } else {
        setResult(data);
        setEmails("");
        router.refresh();
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Consent notice */}
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
        <p className="font-semibold">Opt-in, not a blast</p>
        <p className="mt-2 leading-relaxed">
          Imported contacts are saved as <strong>Pending</strong> and sent a one-time{" "}
          <em>&ldquo;would you like our newsletter?&rdquo;</em> invite. Only people who click confirm
          become subscribers and receive campaigns. This keeps your list consented and protects your
          domain from spam complaints. Only import people you already have a relationship with — never
          purchased or scraped lists.
        </p>
      </div>

      <form onSubmit={submit} className="rounded-2xl border border-slate-200 bg-white p-5">
        <label className="mb-1.5 block text-sm font-medium text-ink" htmlFor="emails">
          Email addresses
        </label>
        <textarea
          id="emails"
          rows={9}
          value={emails}
          onChange={(e) => setEmails(e.target.value)}
          className={`${field} resize-y font-mono text-xs`}
          placeholder={"Paste emails — any format works:\n\njane@acme.com\n\"John Doe\" <john@shop.io>, mary@clinic.org\nbulk, comma, or newline separated…"}
        />

        <label className="mb-1.5 mt-4 block text-sm font-medium text-ink" htmlFor="source">
          Source label <span className="text-slate-400">(for your reference)</span>
        </label>
        <input
          id="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className={field}
          placeholder="e.g. old-contacts, event-2026, leads"
        />

        {err && <p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">{err}</p>}

        <button type="submit" disabled={busy || !emails.trim()} className="btn-primary mt-4 disabled:opacity-60">
          <Icon name="mail" className="h-4 w-4" /> {busy ? "Importing & inviting…" : "Import & send invites"}
        </button>
      </form>

      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-semibold text-ink">Import summary</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {[
              ["Found", result.found],
              ["Valid", result.valid],
              ["Invalid", result.invalid],
              ["Already subscribed", result.alreadySubscribed],
              ["Pending (set)", result.pending],
              ["Invites sent", result.invited],
            ].map(([label, val]) => (
              <div key={label as string} className="rounded-xl bg-slate-50 px-3 py-2.5">
                <div className="text-lg font-bold text-ink">{val as number}</div>
                <div className="text-xs text-slatey">{label as string}</div>
              </div>
            ))}
          </div>
          {result.emailSkipped && (
            <p className="mt-3 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Contacts saved as Pending, but invites weren&apos;t sent — RESEND_API_KEY isn&apos;t configured.
            </p>
          )}
          {result.failed > 0 && (
            <p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">
              {result.failed} invite(s) failed to send. {result.error || ""}
            </p>
          )}
          <p className="mt-3 text-xs text-slatey">
            Pending contacts become subscribers only after they confirm. Track them on the Subscribers list.
          </p>
        </div>
      )}
    </div>
  );
}
