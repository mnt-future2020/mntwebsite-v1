"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Icon from "@/components/Icon";

type Punch = { type: string; time: string };

const LABEL: Record<string, string> = {
  CHECK_IN: "Check in",
  BREAK_START: "Start break",
  BREAK_END: "Back from break",
  CHECK_OUT: "Check out",
};
const STEP_DOTS: { type: string; label: string }[] = [
  { type: "CHECK_IN", label: "In" },
  { type: "BREAK_START", label: "Break" },
  { type: "BREAK_END", label: "Resume" },
  { type: "CHECK_OUT", label: "Out" },
];

function nextType(types: string[]): string | null {
  const last = types[types.length - 1];
  if (!last) return "CHECK_IN";
  if (last === "CHECK_OUT") return null;
  if (last === "CHECK_IN" || last === "BREAK_END") return "BREAK_START";
  if (last === "BREAK_START") return "BREAK_END";
  return "CHECK_IN";
}

export default function ScanPanel({
  name,
  code,
  workStart,
  workEnd,
  scanEnabled,
  officeSet,
  radius,
  initialPunches,
  hasProfile,
}: {
  name: string;
  code: string;
  workStart: string;
  workEnd: string;
  scanEnabled: boolean;
  officeSet: boolean;
  radius: number;
  initialPunches: Punch[];
  hasProfile: boolean;
}) {
  const router = useRouter();
  const [punches, setPunches] = useState<Punch[]>(initialPunches);
  const [geo, setGeo] = useState<"idle" | "ok" | "denied" | "error" | "reading">("idle");
  const [coords, setCoords] = useState<{ lat: number; lng: number; acc: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ kind: "ok" | "err"; text: string } | null>(null);

  const next = nextType(punches.map((p) => p.type));

  const readGeo = (cb?: (c: { lat: number; lng: number }) => void) => {
    if (!navigator.geolocation) {
      setGeo("error");
      return;
    }
    setGeo("reading");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const c = { lat: pos.coords.latitude, lng: pos.coords.longitude, acc: pos.coords.accuracy };
        setCoords(c);
        setGeo("ok");
        cb?.({ lat: c.lat, lng: c.lng });
      },
      (err) => {
        setGeo(err.code === 1 ? "denied" : "error");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  useEffect(() => {
    if (hasProfile && scanEnabled && officeSet) readGeo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const punch = async (loc: { lat: number; lng: number }) => {
    setBusy(true);
    setResult(null);
    const res = await fetch("/api/portal/punch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loc),
    });
    const d = await res.json().catch(() => ({}));
    if (res.ok) {
      setPunches((p) => [...p, { type: d.type, time: d.time }]);
      setResult({ kind: "ok", text: `${LABEL[d.type]} recorded at ${d.time} · ${d.distanceM}m from office` });
      router.refresh();
    } else {
      setResult({ kind: "err", text: d.error || "Couldn't record. Try again." });
    }
    setBusy(false);
  };

  const onPunch = () => {
    if (coords) {
      punch({ lat: coords.lat, lng: coords.lng });
    } else {
      readGeo((c) => punch(c));
    }
  };

  const blocked = !hasProfile || !scanEnabled || !officeSet;

  return (
    <div className="w-full max-w-sm">
      <div className="mb-5 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-glow">
          <Icon name="compass" className="h-6 w-6" />
        </div>
        <h1 className="mt-3 text-xl font-bold text-ink">Attendance</h1>
        <p className="text-sm text-slatey">
          {name}
          {code ? ` · ${code}` : ""}
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card">
        {/* status banners */}
        {!hasProfile && (
          <Banner kind="err">No employee profile is linked to this account. Contact HR.</Banner>
        )}
        {hasProfile && !scanEnabled && (
          <Banner kind="err">QR attendance is currently turned off by admin.</Banner>
        )}
        {hasProfile && scanEnabled && !officeSet && (
          <Banner kind="err">Office location isn&apos;t set up yet. Ask HR to lock it in settings.</Banner>
        )}

        {/* step progress */}
        <div className="mb-5 flex items-center justify-between">
          {STEP_DOTS.map((s, i) => {
            const done = punches.some((p) => p.type === s.type);
            const isNext = next === s.type;
            return (
              <div key={s.type} className="flex flex-1 flex-col items-center">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-bold ${
                    done
                      ? "bg-brand text-white"
                      : isNext
                      ? "bg-brand-50 text-brand-700 ring-2 ring-brand"
                      : "bg-slate-100 text-slate-400"
                  }`}
                >
                  {done ? "✓" : i + 1}
                </span>
                <span className="mt-1 text-[10px] text-slatey">{s.label}</span>
              </div>
            );
          })}
        </div>

        {/* GPS status */}
        {!blocked && (
          <div className="mb-4 flex items-center justify-center gap-2 text-xs">
            <span
              className={`h-2 w-2 rounded-full ${
                geo === "ok" ? "bg-green-500" : geo === "reading" ? "bg-amber-400" : "bg-red-400"
              }`}
            />
            <span className="text-slatey">
              {geo === "ok" && coords
                ? `Location ready (±${Math.round(coords.acc)}m)`
                : geo === "reading"
                ? "Reading your location…"
                : geo === "denied"
                ? "Location blocked — allow access"
                : geo === "error"
                ? "Can't read GPS"
                : "Location not read yet"}
            </span>
          </div>
        )}

        {/* main action */}
        {blocked ? null : next === null ? (
          <div className="rounded-2xl bg-green-50 py-6 text-center">
            <p className="text-sm font-semibold text-green-700">You&apos;re done for today ✓</p>
            <p className="mt-1 text-xs text-green-700/80">Checked out. See you tomorrow.</p>
          </div>
        ) : (
          <button
            onClick={onPunch}
            disabled={busy || geo === "reading"}
            className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70"
          >
            {busy ? "Recording…" : LABEL[next]}
          </button>
        )}

        {(geo === "denied" || geo === "error") && !blocked && (
          <button onClick={() => readGeo()} className="mt-3 w-full text-center text-xs font-medium text-brand-700 hover:underline">
            Retry location
          </button>
        )}

        {result && (
          <p
            className={`mt-4 rounded-xl border px-3 py-2.5 text-center text-sm ${
              result.kind === "ok"
                ? "border-green-200 bg-green-50 text-green-800"
                : "border-red-100 bg-red-50 text-red-700"
            }`}
          >
            {result.text}
          </p>
        )}

        {/* today's timeline */}
        {punches.length > 0 && (
          <div className="mt-5 border-t border-slate-100 pt-4">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">Today</p>
            <ul className="space-y-1.5">
              {punches.map((p, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-slatey">{LABEL[p.type]}</span>
                  <span className="font-medium text-ink">{p.time}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-[11px] text-slate-400">
        Office hours {workStart}–{workEnd} · scan works within {radius}m of the office
      </p>
    </div>
  );
}

function Banner({ kind, children }: { kind: "err" | "ok"; children: React.ReactNode }) {
  return (
    <div
      className={`mb-4 rounded-xl border px-3 py-2.5 text-center text-sm ${
        kind === "err" ? "border-amber-200 bg-amber-50 text-amber-800" : "border-green-200 bg-green-50 text-green-800"
      }`}
    >
      {children}
    </div>
  );
}
