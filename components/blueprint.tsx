import Link from "next/link";
import Icon from "./Icon";

// Shared primitives for the blueprint homepage: a technical, square-cornered
// language built on hairline grids and mono labels. Kept apart from the v3
// components so the rest of the site keeps its rounded card idiom.

export const PAGE = "mx-auto max-w-[1440px] px-[18px] sm:px-8 lg:px-14";

/** Mono label with a rule running to the edge. */
export function RuleLabel({
  children,
  right,
  tone = "light",
}: {
  children: React.ReactNode;
  right?: React.ReactNode;
  tone?: "light" | "dark";
}) {
  return (
    <div className="flex items-center gap-4">
      <span
        className={`font-mono text-[11.5px] uppercase tracking-[0.2em] sm:whitespace-nowrap ${
          tone === "dark" ? "text-white/55" : "text-bp-soft"
        }`}
      >
        {children}
      </span>
      <span className={`h-px flex-1 ${tone === "dark" ? "bg-white/12" : "bg-bp-edge"}`} />
      {right}
    </div>
  );
}

/**
 * The plate a builder leaves on the thing they built.
 *
 * Deliberately smaller than the client's name above it: the inversion is what
 * says somebody else owns this platform and we are the ones who made it. The
 * wording tracks `group` so an internal build can never read as client work.
 */
export function MakerMark({
  group,
  detail,
  tone = "light",
  className = "",
}: {
  group: "client" | "own" | "lab";
  detail?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const label =
    group === "client"
      ? "Built by MnT Future"
      : group === "own"
        ? "Built and run by MnT Future"
        : "MnT Future R&D";
  const dark = tone === "dark";
  return (
    <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 ${className}`}>
      <span
        className={`font-mono text-[11px] sm:text-[10px] uppercase tracking-[0.2em] ${
          dark ? "text-white/85" : "text-bp-ink"
        }`}
      >
        {label}
      </span>
      <span className={`h-px min-w-4 flex-1 ${dark ? "bg-white/15" : "bg-bp-edge"}`} />
      {detail && (
        <span
          className={`font-mono text-[11px] sm:text-[10px] uppercase tracking-[0.14em] ${
            dark ? "text-white/45" : "text-bp-faint"
          }`}
        >
          {detail}
        </span>
      )}
    </div>
  );
}

/** Numbered section header: ghost numeral, mono eyebrow, display title. */
export function SectionHead({
  no,
  total = "06",
  eyebrow,
  title,
  sub,
  tone = "light",
  aside,
}: {
  no: string;
  total?: string;
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  tone?: "light" | "dark";
  aside?: React.ReactNode;
}) {
  const dark = tone === "dark";
  return (
    <div className="flex flex-wrap items-start gap-6 lg:gap-[72px]">
      {/* Fixed width and tabular figures. As auto-width text the numeral was
          81px for "01" and 100px for "04", so every section title on a page
          started at a slightly different x. On a design built out of hairline
          grids that reads as sloppy without anyone being able to name why. */}
      {/* The numeral is drawn as CSS generated content rather than as a text
          node. It is pure decoration — a watermark at 7% opacity that nobody
          reads and that aria-hidden already keeps out of the accessibility
          tree — but as real text it was reported as a 1.1:1 contrast failure on
          every section of every page. WCAG exempts purely decorative text from
          1.4.3; expressing that in CSS is how you say so in markup. Rendering
          is identical: same font, size and colour. */}
      <div
        data-no={no}
        className={`w-[62px] shrink-0 font-display text-[46px] font-extrabold leading-[0.8] tracking-[-0.05em] tabular-nums before:content-[attr(data-no)] lg:w-[104px] lg:text-[74px] ${
          dark ? "text-white/[0.07]" : "text-bp-ghost"
        }`}
        aria-hidden="true"
      />
      <div className="min-w-[300px] flex-1">
        {/* The eyebrow wraps on a phone. Held on one line it pushed the counter
            past the viewport as soon as an eyebrow ran past a few words. */}
        <div className="flex items-center gap-4">
          <span
            className={`font-mono text-[11.5px] uppercase tracking-[0.2em] sm:whitespace-nowrap ${
              dark ? "text-brand-300" : "text-brand-700"
            }`}
          >
            {eyebrow}
          </span>
          <span className={`h-px min-w-3 flex-1 ${dark ? "bg-white/12" : "bg-bp-line"}`} />
          <span
            className={`shrink-0 whitespace-nowrap font-mono text-[11px] tracking-[0.16em] ${
              dark ? "text-white/30" : "text-bp-faint"
            }`}
          >
            {no} / {total}
          </span>
        </div>
        <h2
          className={`mt-4 max-w-[18ch] font-display text-[34px] font-bold leading-[1.02] tracking-[-0.04em] sm:text-[44px] lg:text-[54px] ${
            dark ? "text-white" : "text-bp-ink"
          }`}
        >
          {title}
        </h2>
        {sub && (
          <p
            className={`mt-5 max-w-[62ch] text-[17px] leading-[1.7] ${
              dark ? "text-white/65" : "text-bp-mute"
            }`}
          >
            {sub}
          </p>
        )}
      </div>
      {aside}
    </div>
  );
}

/** Square primary button with the split arrow cell. */
export function BpButton({
  href,
  children,
  variant = "solid",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
}) {
  if (variant === "outline") {
    return (
      <Link
        href={href}
        className={`inline-flex h-14 items-center px-7 font-mono text-[13px] font-semibold tracking-[0.06em] text-bp-ink transition-colors ${className} border border-[#D8E1EC] hover:border-brand-500 hover:bg-brand-500/[0.07]`}
      >
        {children}
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={`group inline-flex h-14 items-center bg-bp-ink pl-7 font-mono text-[13px] font-semibold tracking-[0.06em] text-white transition-colors hover:bg-brand-700 ${className}`}
    >
      {children}
      <span className="ml-4 flex h-14 w-14 items-center justify-center border-l border-white/20">
        <Icon name="arrow" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

/** A hairline grid: the container draws top/left, each cell right/bottom. */
export function GridFrame({
  cols,
  children,
  tone = "light",
  className = "",
}: {
  cols: string;
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`grid border-l border-t ${
        tone === "dark" ? "border-white/10" : "border-bp-line"
      } ${cols} ${className}`}
    >
      {children}
    </div>
  );
}

export function GridCell({
  children,
  tone = "light",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={`border-b border-r ${
        tone === "dark" ? "border-white/10" : "border-bp-line"
      } ${className}`}
    >
      {children}
    </div>
  );
}
