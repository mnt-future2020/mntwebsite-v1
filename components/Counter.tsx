"use client";

import { useEffect, useRef, useState } from "react";

// Animates the numeric part of a value (e.g. "100%", "5+", "2") when scrolled into view.
// Non-numeric values (e.g. "India + Global") render as-is.
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

  const [display, setDisplay] = useState(0);

  // Depend ONLY on stable primitives — never on the freshly-created `match` array,
  // otherwise the effect tears down and restarts the animation on every frame.
  useEffect(() => {
    if (!isNumeric) return;
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: jump straight to the final value.
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDisplay(target);
      return;
    }

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

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
