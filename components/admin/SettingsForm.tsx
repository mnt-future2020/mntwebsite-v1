"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { toast } from "@/components/admin/Toast";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const labelCls = "mb-1.5 block text-sm font-medium text-ink";
const card = "rounded-2xl border border-slate-200 bg-white p-6";

type SettingsInitial = {
  siteName?: string | null;
  titleTemplate?: string | null;
  defaultDescription?: string | null;
  defaultOgImage?: string | null;
  gaMeasurementId?: string | null;
  gscVerification?: string | null;
  bingVerification?: string | null;
  robotsExtra?: string | null;
  spacesRegion?: string | null;
  spacesBucket?: string | null;
  spacesKey?: string | null;
  spacesEndpoint?: string | null;
  spacesSecretSet?: boolean;
};

export default function SettingsForm({ initial }: { initial: SettingsInitial }) {
  const [f, setF] = useState({
    siteName: initial.siteName ?? "",
    titleTemplate: initial.titleTemplate ?? "%s | MnT",
    defaultDescription: initial.defaultDescription ?? "",
    defaultOgImage: initial.defaultOgImage ?? "",
    gaMeasurementId: initial.gaMeasurementId ?? "",
    gscVerification: initial.gscVerification ?? "",
    bingVerification: initial.bingVerification ?? "",
    robotsExtra: initial.robotsExtra ?? "",
    spacesRegion: initial.spacesRegion ?? "",
    spacesBucket: initial.spacesBucket ?? "",
    spacesKey: initial.spacesKey ?? "",
    spacesEndpoint: initial.spacesEndpoint ?? "",
    spacesSecret: "",
  });
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const up = (k: string, v: string) => { setF((s) => ({ ...s, [k]: v })); setSaved(false); };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(f),
      });
      if (res.ok) setSaved(true);
      else toast("Couldn't save settings", "err");
    } catch {
      toast("Couldn't save — network error", "err");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Brand &amp; defaults</h2>
        <div className="mt-4 space-y-4">
          <div>
            <label className={labelCls}>Site name</label>
            <input value={f.siteName} onChange={(e) => up("siteName", e.target.value)} className={field} />
          </div>
          <div>
            <label className={labelCls}>Title template <span className="text-slate-400">(use %s for the page title)</span></label>
            <input value={f.titleTemplate} onChange={(e) => up("titleTemplate", e.target.value)} className={field} placeholder="%s | MnT" />
          </div>
          <div>
            <label className={labelCls}>Default meta description</label>
            <textarea rows={2} value={f.defaultDescription} onChange={(e) => up("defaultDescription", e.target.value)} className={`${field} resize-none`} />
          </div>
          <div>
            <label className={labelCls}>Default OG / social image URL</label>
            <input value={f.defaultOgImage} onChange={(e) => up("defaultOgImage", e.target.value)} className={field} placeholder="/opengraph-image.png" />
          </div>
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Analytics &amp; verification</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>GA4 Measurement ID</label>
            <input value={f.gaMeasurementId} onChange={(e) => up("gaMeasurementId", e.target.value)} className={field} placeholder="G-XXXXXXXXXX" />
          </div>
          <div>
            <label className={labelCls}>Google site verification</label>
            <input value={f.gscVerification} onChange={(e) => up("gscVerification", e.target.value)} className={field} placeholder="verification token" />
          </div>
          <div>
            <label className={labelCls}>Bing site verification</label>
            <input value={f.bingVerification} onChange={(e) => up("bingVerification", e.target.value)} className={field} placeholder="msvalidate token" />
          </div>
        </div>
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">robots.txt — extra directives</h2>
        <textarea rows={3} value={f.robotsExtra} onChange={(e) => up("robotsExtra", e.target.value)} className={`${field} mt-3 resize-none font-mono text-xs`} placeholder="e.g. Disallow: /private" />
      </div>

      <div className={card}>
        <h2 className="text-sm font-semibold text-ink">Object storage (DigitalOcean Spaces)</h2>
        <p className="mt-1 text-xs text-slatey">
          Stores screenshots, employee documents and blog images. Create a Space + a Spaces access key in your
          DigitalOcean console, then paste them here — no redeploy needed.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelCls}>Region</label>
            <input value={f.spacesRegion} onChange={(e) => up("spacesRegion", e.target.value)} className={field} placeholder="sgp1" />
          </div>
          <div>
            <label className={labelCls}>Bucket (Space name)</label>
            <input value={f.spacesBucket} onChange={(e) => up("spacesBucket", e.target.value)} className={field} placeholder="mntweb-storage" />
          </div>
          <div>
            <label className={labelCls}>Access key</label>
            <input value={f.spacesKey} onChange={(e) => up("spacesKey", e.target.value)} className={field} placeholder="DO00…" autoComplete="off" />
          </div>
          <div>
            <label className={labelCls}>
              Secret key {initial.spacesSecretSet && <span className="font-semibold text-green-600">· set</span>}
            </label>
            <input
              type="password"
              value={f.spacesSecret}
              onChange={(e) => up("spacesSecret", e.target.value)}
              className={field}
              placeholder={initial.spacesSecretSet ? "•••••• (leave blank to keep)" : "Secret key"}
              autoComplete="new-password"
            />
          </div>
          <div className="sm:col-span-2">
            <label className={labelCls}>Endpoint <span className="text-slate-400">(optional)</span></label>
            <input value={f.spacesEndpoint} onChange={(e) => up("spacesEndpoint", e.target.value)} className={field} placeholder="auto: https://<region>.digitaloceanspaces.com" />
          </div>
        </div>
        <p className="mt-3 text-[11px] text-slate-400">
          The secret is write-only — never shown again; leave it blank to keep the current one.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-70">
          <Icon name="save" className="h-4 w-4" /> {saving ? "Saving…" : "Save settings"}
        </button>
        {saved && <span className="text-sm font-medium text-green-600">Saved ✓</span>}
      </div>
    </form>
  );
}
