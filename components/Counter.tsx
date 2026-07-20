"use client";

import { useEffect, useRef, useState } from "react";

// Animates the numeric part of a value (e.g. "100%", "5+", "2") when scrolled into view.
// Non-numeric values (e.g. "India + Global") render as-is.
//
// The final value is the SSR/no-JS default: the count-up never leaves a bare "0"
// on the page. Only stats that load BELOW the fold animate (from 0 → target as
// they scroll in); a stat already on screen at load just shows its real value,
// with no target→0→target flicker.
export default function Counter({
  value,
  duration = 1400,
}: {
  value: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const isNumeric = !!match;
  const prefix = match ? match[1] : "";
  const target = match ? parseInt(match[2].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[3] : "";

  // `null` means "not animating: show the real target". A number is a live
  // animation frame. Starting at null keeps SSR and the first client render equal
  // to `target`, so there's no hydration mismatch and never a "0" fallback.
  const [display, setDisplay] = useState<number | null>(null);

  // Depend ONLY on stable primitives: never on the freshly-created `match` array,
  // otherwise the effect tears down and restarts the animation on every frame.
  useEffect(() => {
    if (!isNumeric) return;
    const el = ref.current;
    if (!el || startedRef.current) return;

    // Respect reduced-motion and environments without IO: keep the final value.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    // Already visible at load? Don't animate: the count-up would only flash the
    // value to 0 and back. Only stats below the fold get the reveal animation.
    const rect = el.getBoundingClientRect();
    const viewportH = window.innerHeight || document.documentElement.clientHeight || 0;
    if (rect.top < viewportH && rect.bottom > 0) return;

    // Below the fold and off-screen: reset to 0 (invisible to the user) and count
    // up when it scrolls into view.
    setDisplay(0);

    let raf = 0;
    const run = (startTs: number) => {
      const step = (now: number) => {
        const p = Math.min((now - startTs) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setDisplay(Math.round(eased * target));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !startedRef.current) {
          startedRef.current = true;
          obs.disconnect();
          requestAnimationFrame((t) => run(t));
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [isNumeric, target, duration]);

  if (!isNumeric) return <span ref={ref}>{value}</span>;

  const shown = display === null ? target : display;
  return (
    <span ref={ref}>
      {prefix}
      {shown}
      {suffix}
    </span>
  );
}
