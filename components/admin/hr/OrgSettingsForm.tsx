"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import Icon from "@/components/Icon";
import { breakdownSalary, inr } from "@/lib/hr";

const field =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-ink placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand-100";
const label = "mb-1.5 block text-xs font-medium text-slatey";
const card = "rounded-2xl border border-slate-200 bg-white p-6";
const sec =
  "inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-brand-300 hover:text-brand-700";

type Props = {
  initial: {
    officeLat: number | null;
    officeLng: number | null;
    geofenceRadiusM: number;
    workStart: string;
    workEnd: string;
    scanEnabled: boolean;
    salaryBasicPct: number;
    salaryHraPctOfBasic: number;
  };
  baseUrl?: string;
};

export default function OrgSettingsForm({ initial, baseUrl }: Props) {
  const router = useRouter();
  const [f, setF] = useState({
    officeLat: initial.officeLat != null ? String(initial.officeLat) : "",
    officeLng: initial.officeLng != null ? String(initial.officeLng) : "",
    geofenceRadiusM: String(initial.geofenceRadiusM || 50),
    workStart: initial.workStart || "09:30",
    workEnd: initial.workEnd || "18:30",
    scanEnabled: initial.scanEnabled,
    salaryBasicPct: String(initial.salaryBasicPct ?? 50),
    salaryHraPctOfBasic: String(initial.salaryHraPctOfBasic ?? 50),
  });
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err" | "info"; text: string } | null>(null);
  const [locating, setLocating] = useState(false);
  const [origin, setOrigin] = useState(baseUrl || "");
  const qrRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!baseUrl && typeof window !== "undefined") setOrigin(window.location.origin);
  }, [baseUrl]);

  const up = (k: string, v: unknown) => setF((s) => ({ ...s, [k]: v }));
  const located = f.officeLat !== "" && f.officeLng !== "";
  const scanUrl = `${origin}/scan`;
  const splitPreview = breakdownSalary(50000, {
    basicPct: parseFloat(f.salaryBasicPct) || 0,
    hraPctOfBasic: parseFloat(f.salaryHraPctOfBasic) || 0,
  });

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setMsg({ kind: "err", text: "This browser can't read GPS location." });
      return;
    }
    setLocating(true);
    setMsg({ kind: "info", text: "Reading your current location… stand at the office spot." });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        up("officeLat", pos.coords.latitude.toFixed(6));
        up("officeLng", pos.coords.longitude.toFixed(6));
        setLocating(false);
        setMsg({
          kind: "ok",
          text: `Captured location (±${Math.round(pos.coords.accuracy)}m accuracy). Save to lock it.`,
        });
      },
      (err) => {
        setLocating(false);
        setMsg({
          kind: "err",
          text:
            err.code === 1
              ? "Location permission denied. Allow location access and retry."
              : "Couldn't read location. Try again outdoors / near a window.",
        });
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/admin/hr/org", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        officeLat: f.officeLat === "" ? null : f.officeLat,
        officeLng: f.officeLng === "" ? null : f.officeLng,
        geofenceRadiusM: f.geofenceRadiusM,
        workStart: f.workStart,
        workEnd: f.workEnd,
        scanEnabled: f.scanEnabled,
        salaryBasicPct: f.salaryBasicPct,
        salaryHraPctOfBasic: f.salaryHraPctOfBasic,
      }),
    });
    if (res.ok) {
      setMsg({ kind: "ok", text: "Settings saved. The QR will only accept scans inside the fence." });
      router.refresh();
    } else {
      const d = await res.json().catch(() => ({}));
      setMsg({ kind: "err", text: d.error || "Save failed." });
    }
    setBusy(false);
  };

  const printQR = () => {
    const svg = qrRef.current?.innerHTML;
    if (!svg) return;
    const w = window.open("", "_blank", "width=520,height=680");
    if (!w) return;
    w.document.write(`<!doctype html><html><head><title>MnT Attendance QR</title>
      <style>
        *{margin:0;padding:0;box-sizing:border-box;font-family:-apple-system,Segoe UI,Roboto,sans-serif}
        body{display:flex;align-items:center;justify-content:center;min-height:100vh;background:#fff}
        .card{text-align:center;padding:40px;border:2px solid #081A33;border-radius:24px;width:380px}
        h1{font-size:22px;color:#081A33;margin-bottom:4px}
        p{font-size:13px;color:#475569;margin-bottom:24px}
        .qr{display:flex;justify-content:center;margin:8px 0 20px}
        .url{font-size:12px;color:#2095F1;word-break:break-all;margin-top:12px}
        .note{font-size:12px;color:#475569;margin-top:18px;line-height:1.5}
      </style></head><body>
      <div class="card">
        <h1>Scan to mark attendance</h1>
        <p>MnT &middot; Magizh NexGen Technologies</p>
        <div class="qr">${svg}</div>
        <div class="url">${scanUrl}</div>
        <div class="note">Open the camera, scan this code, then check&nbsp;in / break / check&nbsp;out.
        Works only inside the office (within ${f.geofenceRadiusM}m).</div>
      </div>
      <script>window.onload=function(){window.print()}</script>
      </body></html>`);
    w.document.close();
  };

  const msgStyle =
    msg?.kind === "ok"
      ? "border-green-200 bg-green-50 text-green-800"
      : msg?.kind === "err"
      ? "border-red-100 bg-red-50 text-red-700"
      : "border-brand-100 bg-brand-50 text-brand-700";

  return (
    <form onSubmit={save} className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <div className={card}>
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-ink">Office location lock</h2>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                located ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
              }`}
            >
              {located ? "Location set" : "Not set"}
            </span>
          </div>
          <p className="mt-1 text-sm text-slatey">
            Stand inside the office and capture the GPS point. Scans are accepted only within the radius
            of this point.
          </p>

          <button
            type="button"
            onClick={useMyLocation}
            disabled={locating}
            className={`${sec} mt-4 disabled:opacity-70`}
          >
            <Icon name="compass" className="h-4 w-4" />
            {locating ? "Reading GPS…" : "Use my current location"}
          </button>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className={label}>Latitude</label>
              <input value={f.officeLat} onChange={(e) => up("officeLat", e.target.value)} className={field} placeholder="13.082680" inputMode="decimal" />
            </div>
            <div>
              <label className={label}>Longitude</label>
              <input value={f.officeLng} onChange={(e) => up("officeLng", e.target.value)} className={field} placeholder="80.270718" inputMode="decimal" />
            </div>
            <div>
              <label className={label}>Geofence radius (m)</label>
              <input type="number" min={10} max={500} value={f.geofenceRadiusM} onChange={(e) => up("geofenceRadiusM", e.target.value)} className={field} />
            </div>
          </div>
          {located && (
            <a
              href={`https://www.google.com/maps?q=${f.officeLat},${f.officeLng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand-700 hover:underline"
            >
              <Icon name="link" className="h-3.5 w-3.5" /> Preview this point on Google Maps
            </a>
          )}
        </div>

        <div className={card}>
          <h2 className="text-sm font-semibold text-ink">Work hours &amp; scanning</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <label className={label}>Work start</label>
              <input type="time" value={f.workStart} onChange={(e) => up("workStart", e.target.value)} className={field} />
            </div>
            <div>
              <label className={label}>Work end</label>
              <input type="time" value={f.workEnd} onChange={(e) => up("workEnd", e.target.value)} className={field} />
            </div>
            <div className="flex items-end">
              <label className="flex cursor-pointer items-center gap-2.5 pb-2 text-sm text-ink">
                <input type="checkbox" checked={f.scanEnabled} onChange={(e) => up("scanEnabled", e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand focus:ring-brand" />
                QR scanning enabled
              </label>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Check-ins after work start are flagged late. Turn scanning off to pause QR attendance
            company-wide.
          </p>
        </div>

        <div className={card}>
          <h2 className="text-sm font-semibold text-ink">Salary auto-breakdown</h2>
          <p className="mt-1 text-sm text-slatey">
            When you add an employee and enter their monthly gross, it auto-splits into Basic, HRA and
            Special Allowance using these percentages. No PF/ESI, so deductions stay 0 — edit anytime.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Basic (% of monthly gross)</label>
              <input type="number" min={0} max={100} value={f.salaryBasicPct} onChange={(e) => up("salaryBasicPct", e.target.value)} className={field} />
            </div>
            <div>
              <label className={label}>HRA (% of Basic)</label>
              <input type="number" min={0} max={100} value={f.salaryHraPctOfBasic} onChange={(e) => up("salaryHraPctOfBasic", e.target.value)} className={field} />
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-soft p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Example — monthly gross ₹50,000</p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-center">
              <div><p className="text-xs text-slatey">Basic</p><p className="font-semibold text-ink">{inr(splitPreview.basic)}</p></div>
              <div><p className="text-xs text-slatey">HRA</p><p className="font-semibold text-ink">{inr(splitPreview.hra)}</p></div>
              <div><p className="text-xs text-slatey">Special</p><p className="font-semibold text-ink">{inr(splitPreview.allowances)}</p></div>
            </div>
          </div>
        </div>

        {msg && <p className={`rounded-lg border px-4 py-2.5 text-sm ${msgStyle}`}>{msg.text}</p>}

        <button type="submit" disabled={busy} className="btn-primary disabled:opacity-70">
          <Icon name="save" className="h-4 w-4" /> {busy ? "Saving…" : "Save settings"}
        </button>
      </div>

      <div className="lg:col-span-1">
        <div className={`${card} sticky top-6`}>
          <h2 className="text-sm font-semibold text-ink">Office QR code</h2>
          <p className="mt-1 text-xs text-slatey">
            Print this and paste it at the office entrance. Employees scan it to punch in/out.
          </p>
          <div className="mt-4 flex flex-col items-center rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <div ref={qrRef} className="rounded-xl bg-white p-3">
              <QRCodeSVG value={scanUrl} size={176} level="M" fgColor="#081A33" />
            </div>
            <p className="mt-3 break-all text-center text-[11px] text-slate-400">{scanUrl}</p>
          </div>
          <button type="button" onClick={printQR} className={`${sec} mt-4 w-full`}>
            <Icon name="download" className="h-4 w-4" /> Print QR poster
          </button>
          {!located && (
            <p className="mt-3 text-[11px] text-amber-700">
              Set the office location first — otherwise scans will be rejected as out of range.
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
