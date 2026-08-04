import { ratings } from "@/lib/site";
import { PAGE } from "./blueprint";

/**
 * Client ratings, in two shapes.
 *
 * `inline` sits under the hero CTAs as a quiet line. `band` is the dark blue
 * strip, placed after the work rather than before it: a score means very little
 * to somebody who does not yet know what we do, and a great deal to somebody
 * who has just finished looking at what we built.
 *
 * A rating is a factual claim, so each links to the profile it came from where
 * we have the URL. Any entry without an `href` renders as plain text rather
 * than as a dead link.
 */
function Stars({ value, size = 13 }: { value: number; size?: number }) {
  // A half-lit star for 4.7 rather than five solid ones: rounding up is the
  // small dishonesty that costs more than the half star is worth.
  return (
    <span className="flex items-center gap-[2px]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        const id = `st-${size}-${String(value).replace(".", "")}-${i}`;
        return (
          <svg key={i} viewBox="0 0 20 19" style={{ width: size, height: size }}>
            <defs>
              <linearGradient id={id}>
                <stop offset={`${fill * 100}%`} stopColor="#FFC24B" />
                <stop offset={`${fill * 100}%`} stopColor="currentColor" />
              </linearGradient>
            </defs>
            <path
              d="M10 0l2.6 6.3 6.8.5-5.2 4.4 1.6 6.6L10 14.2 4.2 17.8l1.6-6.6L.6 6.8l6.8-.5z"
              fill={`url(#${id})`}
            />
          </svg>
        );
      })}
    </span>
  );
}

export default function RatingsRibbon({ variant = "band" }: { variant?: "band" | "inline" }) {
  const dark = variant === "band";

  const items = ratings.map((r) => {
    const inner = (
      <>
        <span
          className={
            dark
              ? "font-display text-[15px] font-bold tracking-[-0.01em] text-white"
              : "font-display text-[13px] font-bold tracking-[-0.01em] text-bp-ink"
          }
        >
          {r.source}
        </span>
        <span className={dark ? "text-white/25" : "text-bp-ghost"}>
          <Stars value={r.score} size={dark ? 14 : 12} />
        </span>
        <span
          className={`font-mono text-[12px] tracking-[0.04em] ${dark ? "text-white/75" : "text-bp-faint"}`}
        >
          {r.score.toFixed(1)}
        </span>
      </>
    );
    const cls = "flex items-center gap-2 whitespace-nowrap py-1";
    return r.href ? (
      <a
        key={r.source}
        href={r.href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${r.source}: rated ${r.score.toFixed(1)} out of 5. Opens the profile.`}
        className={`${cls} transition-opacity hover:opacity-70`}
      >
        {inner}
      </a>
    ) : (
      <span
        key={r.source}
        className={cls}
        aria-label={`${r.source}: rated ${r.score.toFixed(1)} out of 5`}
      >
        {inner}
      </span>
    );
  });

  if (!dark) {
    return (
      <div className="flex flex-wrap items-center gap-x-6 gap-y-1 border-t border-bp-hair pt-5">
        <span className="font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.2em] text-bp-faint">
          Client rated
        </span>
        {items}
      </div>
    );
  }

  return (
    <section className="border-y border-white/10 bg-gradient-to-r from-[#0F529C] to-[#0B2E5C]">
      <div
        className={`${PAGE} flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-7 lg:justify-between lg:gap-x-12 lg:py-8`}
      >
        <div className="text-center lg:text-left">
          <div className="font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.2em] text-brand-300">
            What our clients say
          </div>
          <p className="mt-2 max-w-[34ch] font-display text-[19px] font-bold leading-[1.2] tracking-[-0.028em] text-white lg:text-[23px]">
            Rated by the people we built all of that for.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-9 gap-y-2 lg:gap-x-12">
          {items}
        </div>
      </div>
    </section>
  );
}
