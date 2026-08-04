import { ratings } from "@/lib/site";

/**
 * Ratings ribbon, directly under the header.
 *
 * A rating is a factual claim, so each one links to the profile it came from
 * where we have the URL. An unlinked number is both weaker (a visitor cannot
 * check it) and riskier (nobody can correct it if the score moves). Any entry
 * without a `href` renders as plain text rather than as a dead link.
 */
function Stars({ value }: { value: number }) {
  // A half-lit star for 4.7 rather than five solid ones: rounding up is the
  // small dishonesty that costs more than the half star is worth.
  return (
    <span className="flex items-center gap-[2px]" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        const id = `st-${String(value).replace(".", "")}-${i}`;
        return (
          <svg key={i} viewBox="0 0 20 19" className="h-[13px] w-[13px]">
            <defs>
              <linearGradient id={id}>
                <stop offset={`${fill * 100}%`} stopColor="#FFC24B" />
                <stop offset={`${fill * 100}%`} stopColor="rgba(255,255,255,0.26)" />
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

export default function RatingsRibbon() {
  return (
    <div className="border-b border-white/10 bg-gradient-to-r from-[#0F529C] to-[#0B2E5C]">
      <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-center gap-x-8 gap-y-2.5 px-[18px] py-2.5 sm:px-8 lg:justify-start lg:gap-x-12 lg:px-14">
        <span className="hidden font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/45 lg:inline">
          Rated by our clients
        </span>
        {ratings.map((r) => {
          const inner = (
            <>
              <span className="font-display text-[13.5px] font-bold tracking-[-0.01em] text-white">
                {r.source}
              </span>
              <Stars value={r.score} />
              <span className="font-mono text-[12px] tracking-[0.04em] text-white/75">
                {r.score.toFixed(1)}
              </span>
            </>
          );
          const cls = "flex items-center gap-2.5 whitespace-nowrap";
          return r.href ? (
            <a
              key={r.source}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${r.source}: rated ${r.score.toFixed(1)} out of 5. Opens the profile.`}
              className={`${cls} py-1 transition-opacity hover:opacity-80`}
            >
              {inner}
            </a>
          ) : (
            <span
              key={r.source}
              className={`${cls} py-1`}
              aria-label={`${r.source}: rated ${r.score.toFixed(1)} out of 5`}
            >
              {inner}
            </span>
          );
        })}
      </div>
    </div>
  );
}
