"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "./Editor";
import Icon from "@/components/Icon";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const card = "rounded-2xl border border-slate-200 bg-white p-5";

export type CampaignInput = {
  id?: string;
  subject?: string;
  preheader?: string;
  contentHtml?: string;
  status?: "DRAFT" | "SENDING" | "SENT";
  recipients?: number;
  sentCount?: number;
  sentAt?: string | null;
};

export default function CampaignForm({
  initial,
  subscribedCount,
  emailReady,
}: {
  initial?: CampaignInput;
  subscribedCount: number;
  emailReady: boolean;
}) {
  const router = useRouter();
  const editing = Boolean(initial?.id);
  const isSent = initial?.status === "SENT";

  const [f, setF] = useState({
    subject: initial?.subject ?? "",
    preheader: initial?.preheader ?? "",
    contentHtml: initial?.contentHtml ?? "",
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [htmlMode, setHtmlMode] = useState(false);

  const up = (k: string, v: unknown) => setF((s) => ({ ...s, [k]: v }));

  // Create or update; returns the campaign id (or null on failure).
  async function persist(): Promise<string | null> {
    const res = await fetch(editing ? `/api/admin/campaigns/${initial!.id}` : "/api/admin/campaigns", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(f),
    });
    if (!res.ok) {
      const d = await res.json().catch(() => ({}));
      throw new Error(d.error || "Couldn't save the campaign.");
    }
    const data = await res.json();
    return data.id as string;
  }

  const saveDraft = async () => {
    setBusy(true);
    setErr(null);
    setNotice(null);
    try {
      const id = await persist();
      if (!editing && id) {
        router.push(`/admin/campaigns/${id}`);
      } else {
        setNotice("Draft saved.");
      }
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setBusy(false);
    }
  };

  const send = async () => {
    if (!f.subject.trim()) return setErr("Add a subject before sending.");
    if (!f.contentHtml.trim()) return setErr("Write some content before sending.");
    if (subscribedCount === 0) return setErr("No confirmed subscribers to send to yet.");
    if (!confirm(`Send "${f.subject}" to ${subscribedCount} confirmed subscriber${subscribedCount === 1 ? "" : "s"}? This can't be undone.`)) return;

    setBusy(true);
    setErr(null);
    setNotice(null);
    try {
      const id = await persist(); // save latest content first
      if (!id) throw new Error("Couldn't save before sending.");
      const res = await fetch(`/api/admin/campaigns/${id}/send`, { method: "POST" });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(d.error || "Send failed.");
      router.push("/admin/campaigns");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Send failed.");
      setBusy(false);
    }
  };

  const del = async () => {
    if (!initial?.id || !confirm("Delete this campaign? This can't be undone.")) return;
    setBusy(true);
    const res = await fetch(`/api/admin/campaigns/${initial.id}`, { method: "DELETE" });
    if (res.ok) {
      router.push("/admin/campaigns");
      router.refresh();
    } else {
      setErr("Couldn't delete the campaign.");
      setBusy(false);
    }
  };

  return (
    <form onSubmit={(e) => { e.preventDefault(); saveDraft(); }} className="grid gap-6 lg:grid-cols-[1fr_320px]">
      {/* MAIN */}
      <div className="space-y-6">
        <div className={card}>
          <label className={labelCls} htmlFor="subject">Subject line</label>
          <input
            id="subject"
            value={f.subject}
            onChange={(e) => up("subject", e.target.value)}
            className={`${field} text-base`}
            placeholder="What lands in their inbox"
            disabled={isSent}
            required
          />

          <label className={`${labelCls} mt-4`} htmlFor="preheader">
            Preheader <span className="text-slate-400">(inbox preview text)</span>
          </label>
          <input
            id="preheader"
            value={f.preheader}
            onChange={(e) => up("preheader", e.target.value)}
            className={field}
            placeholder="The short line shown after the subject in most inboxes"
            disabled={isSent}
            maxLength={140}
          />
        </div>

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className={`${labelCls} mb-0`}>Email content</label>
            {!isSent && (
              <div className="inline-flex rounded-lg border border-slate-200 p-0.5 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setHtmlMode(false)}
                  className={`rounded-md px-2.5 py-1 transition-colors ${!htmlMode ? "bg-brand text-white" : "text-slatey hover:text-ink"}`}
                >
                  Editor
                </button>
                <button
                  type="button"
                  onClick={() => setHtmlMode(true)}
                  className={`rounded-md px-2.5 py-1 transition-colors ${htmlMode ? "bg-brand text-white" : "text-slatey hover:text-ink"}`}
                >
                  HTML
                </button>
              </div>
            )}
          </div>

          {isSent ? (
            <div
              className="prose prose-slate max-w-none rounded-2xl border border-slate-200 bg-white p-5"
              dangerouslySetInnerHTML={{ __html: f.contentHtml }}
            />
          ) : htmlMode ? (
            <>
              <textarea
                value={f.contentHtml}
                onChange={(e) => up("contentHtml", e.target.value)}
                rows={16}
                className={`${field} resize-y font-mono text-xs leading-relaxed`}
                placeholder="Paste your email body HTML here…"
              />
              <p className="mt-1.5 text-xs text-slatey">
                Paste the email <strong>body</strong> HTML (headings, paragraphs, links). MnT&apos;s header,
                footer, and unsubscribe link are added automatically.
              </p>
            </>
          ) : (
            <Editor value={f.contentHtml} onChange={(html) => up("contentHtml", html)} />
          )}
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="space-y-6">
        <div className={card}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-ink">Campaign</span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                isSent ? "bg-green-100 text-green-700" : "bg-slate-100 text-slatey"
              }`}
            >
              {isSent ? "Sent" : "Draft"}
            </span>
          </div>

          {err && <p className="mt-3 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs text-red-700">{err}</p>}
          {notice && <p className="mt-3 rounded-lg border border-green-100 bg-green-50 px-3 py-2 text-xs text-green-700">{notice}</p>}

          {isSent ? (
            <div className="mt-4 space-y-1 text-sm text-slatey">
              <p>Sent to <strong className="text-ink">{initial?.recipients ?? 0}</strong> subscribers</p>
              <p>Delivered: <strong className="text-ink">{initial?.sentCount ?? 0}</strong></p>
              {initial?.sentAt && (
                <p className="text-xs text-slate-400">
                  {new Date(initial.sentAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}
                </p>
              )}
            </div>
          ) : (
            <>
              <p className="mt-4 text-sm text-slatey">
                Confirmed audience: <strong className="text-ink">{subscribedCount}</strong>
              </p>
              {!emailReady && (
                <p className="mt-2 rounded-lg border border-amber-100 bg-amber-50 px-3 py-2 text-xs text-amber-800">
                  Email sending isn&apos;t configured. Add <code>RESEND_API_KEY</code> to <code>.env</code> to send.
                </p>
              )}
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  disabled={busy || !emailReady || subscribedCount === 0}
                  onClick={send}
                  className="btn-primary w-full disabled:opacity-60"
                  title={!emailReady ? "Add RESEND_API_KEY to enable sending" : ""}
                >
                  <Icon name="rocket" className="h-4 w-4" /> {busy ? "Working…" : "Send campaign"}
                </button>
                <button type="button" disabled={busy} onClick={saveDraft} className="btn-ghost w-full disabled:opacity-70">
                  <Icon name="save" className="h-4 w-4" /> Save draft
                </button>
                {editing && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={del}
                    className="mt-1 inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
                  >
                    <Icon name="trash" className="h-4 w-4" /> Delete
                  </button>
                )}
              </div>
            </>
          )}
        </div>

        <div className={card}>
          <p className="text-sm font-semibold text-ink">Before you send</p>
          <ul className="mt-3 space-y-2 text-xs leading-relaxed text-slatey">
            <li>• An unsubscribe link is added to every email automatically.</li>
            <li>• Only <strong>confirmed</strong> subscribers receive campaigns.</li>
            <li>• Send a test to yourself by subscribing with your own email first.</li>
          </ul>
        </div>
      </div>
    </form>
  );
}
