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
        <label className="text-[13.5px] font-semibold text-white/55">
          {label}
        </label>
        <span className="font-display text-[19px] font-bold tracking-[-0.02em] text-white">
          {format(value)}
        </span>
      </div>
      {/* The visible track is 4px; the input over it is 24px so it can be
          grabbed with a thumb. WCAG 2.2 SC 2.5.8 asks for 24, and a slider you
          cannot drag on a phone is the one control on this page that matters. */}
      <div className="relative mt-3 flex h-6 items-center">
        <div className="pointer-events-none absolute inset-x-0 h-1 rounded-full bg-white/15" />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          className="relative h-6 w-full cursor-pointer appearance-none bg-transparent accent-[#2095F1] [&::-moz-range-thumb]:h-[18px] [&::-moz-range-thumb]:w-[18px] [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-[#2095F1] [&::-webkit-slider-thumb]:h-[18px] [&::-webkit-slider-thumb]:w-[18px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#2095F1] [&::-webkit-slider-thumb]:shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
        />
      </div>
    </div>
  );
}

export default function CommissionCalculator({ cta = "Book a free demo" }: { cta?: string }) {
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

      <div className="flex flex-col justify-center rounded-3xl border border-white/12 bg-white/[0.05] p-7 shadow-[0_30px_70px_-40px_rgba(0,0,0,0.7)] lg:p-9">
        <div className="text-[13px] font-bold text-brand-300">
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

        <p className="mt-7 rounded-2xl bg-white/[0.06] p-4 text-[14.5px] leading-[1.6] text-white/75">
          On a platform you own, that number is a server bill. It does not grow when you have a
          good month.
        </p>

        <a
          href="#lead-form"
          className="group mt-8 inline-flex h-[56px] items-center justify-center gap-3 rounded-full bg-white px-8 text-[16px] font-bold text-bp-ink shadow-[0_14px_30px_-12px_rgba(0,0,0,0.6)] transition-all hover:-translate-y-0.5"
        >
          {cta}
          <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
