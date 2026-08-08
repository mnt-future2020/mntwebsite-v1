"use client";

import { useMemo, useState } from "react";

/**
 * What renting the store costs, in the visitor's own numbers.
 *
 * "No commission" is an abstraction. The same claim as a rupee figure the
 * visitor produced themselves is an argument, and it is the reason they book
 * the demo. Everything here is their input times arithmetic: nothing is
 * asserted about their business that they did not type in.
 */
const inr = (n: number) =>
  n >= 1e7
    ? `₹${(n / 1e7).toFixed(n / 1e7 < 10 ? 2 : 1)} Cr`
    : n >= 1e5
      ? `₹${(n / 1e5).toFixed(n / 1e5 < 10 ? 2 : 1)} L`
      : `₹${Math.round(n).toLocaleString("en-IN")}`;

function Field({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
          {label}
        </label>
        <span className="font-display text-[19px] font-bold tracking-[-0.02em] text-white">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
        className="mt-3 h-1 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#2095F1]"
      />
    </div>
  );
}

export default function CommissionCalculator() {
  const [orders, setOrders] = useState(1500);
  const [aov, setAov] = useState(1200);
  const [pct, setPct] = useState(2);
  const [monthly, setMonthly] = useState(7000);

  const { gmv, commission, platform, total } = useMemo(() => {
    const gmv = orders * aov * 12;
    const commission = gmv * (pct / 100);
    const platform = monthly * 12;
    return { gmv, commission, platform, total: commission + platform };
  }, [orders, aov, pct, monthly]);

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
      <div className="space-y-7">
        <Field
          label="Orders a month"
          value={orders}
          min={100}
          max={20000}
          step={100}
          onChange={setOrders}
          format={(n) => n.toLocaleString("en-IN")}
        />
        <Field
          label="Average order value"
          value={aov}
          min={200}
          max={10000}
          step={100}
          onChange={setAov}
          format={(n) => `₹${n.toLocaleString("en-IN")}`}
        />
        <Field
          label="Commission you pay"
          value={pct}
          min={0}
          max={10}
          step={0.5}
          onChange={setPct}
          format={(n) => `${n}%`}
        />
        <Field
          label="Platform fee a month"
          value={monthly}
          min={0}
          max={50000}
          step={500}
          onChange={setMonthly}
          format={(n) => `₹${n.toLocaleString("en-IN")}`}
        />
      </div>

      <div className="flex flex-col justify-center border border-white/12 bg-white/[0.04] p-7 lg:p-9">
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
          You are paying, a year
        </div>
        <div
          className="mt-4 font-display text-[46px] font-bold leading-[0.95] tracking-[-0.045em] text-white lg:text-[62px]"
          aria-live="polite"
        >
          {inr(total)}
        </div>

        <dl className="mt-7 space-y-3 border-t border-white/12 pt-6">
          {[
            ["Commission on your sales", commission],
            ["Platform fee", platform],
          ].map(([label, v]) => (
            <div key={String(label)} className="flex items-baseline justify-between gap-4">
              <dt className="text-[14px] text-white/55">{String(label)}</dt>
              <dd className="font-mono text-[14px] text-white/85">{inr(Number(v))}</dd>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 border-t border-white/12 pt-3">
            <dt className="text-[14px] text-white/40">On sales of</dt>
            <dd className="font-mono text-[14px] text-white/50">{inr(gmv)}</dd>
          </div>
        </dl>

        <p className="mt-7 border-l-2 border-brand-500 pl-4 text-[14.5px] leading-[1.6] text-white/70">
          On a platform you own, that number is a server bill. It does not grow when you have a
          good month.
        </p>

        <a
          href="#lead-form"
          className="group mt-7 inline-flex h-14 items-center justify-between bg-white pl-6 font-mono text-[13px] font-semibold tracking-[0.06em] text-bp-ink transition-colors hover:bg-brand-300"
        >
          Book a demo
          <span className="ml-4 flex h-14 w-14 items-center justify-center border-l border-bp-ink/15">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>
      </div>
    </div>
  );
}
