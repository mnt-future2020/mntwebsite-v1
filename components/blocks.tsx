import Link from "next/link";
import Icon, { IconName } from "./Icon";
import Reveal from "./Reveal";
import { site } from "@/lib/site";
import Counter from "./Counter";
import SpotlightCard from "./SpotlightCard";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-[760px] text-center" : "max-w-[70ch]"}>
      {eyebrow && (
        <div className={`flex items-center gap-4 ${align === "center" ? "justify-center" : ""}`}>
          {align !== "center" && <span className="h-px w-[38px] shrink-0 bg-brand-500" />}
          <span
            className={`whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] ${
              tone === "dark" ? "text-brand-300" : "text-brand-700"
            }`}
          >
            {eyebrow}
          </span>
          {align !== "center" && (
            <span className={`h-px flex-1 ${tone === "dark" ? "bg-white/12" : "bg-bp-line"}`} />
          )}
        </div>
      )}
      <h2
        className={`mt-5 font-display text-[30px] font-bold leading-[1.04] tracking-[-0.038em] sm:text-[42px] ${
          tone === "dark" ? "text-white" : "text-bp-ink"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 max-w-[62ch] text-[17px] leading-[1.7] ${
            tone === "dark" ? "text-white/70" : "text-bp-mute"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

export function ServiceCard({
  icon,
  title,
  desc,
  href,
  index = 0,
}: {
  icon: IconName;
  title: string;
  desc: string;
  href?: string;
  index?: number;
}) {
  const inner = (
    <>
      <div className="flex h-12 w-12 items-center justify-center bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
        <Icon name={icon} className="h-6 w-6" />
      </div>
      <h3 className="mt-5 text-lg font-bold text-bp-ink">{title}</h3>
      <p className="mt-2 text-[15px] leading-relaxed text-bp-mute">{desc}</p>
      {href && (
        <span className="link-arrow mt-4">
          Learn more <Icon name="arrow" className="h-4 w-4" />
        </span>
      )}
    </>
  );
  return (
    <Reveal delay={index * 60}>
      {href ? (
        <Link href={href} className="group block h-full">
          <SpotlightCard className="card card-hover h-full">{inner}</SpotlightCard>
        </Link>
      ) : (
        <SpotlightCard className="card card-hover group h-full">{inner}</SpotlightCard>
      )}
    </Reveal>
  );
}

export function Stat({
  value,
  label,
  tone = "light",
}: {
  value: string;
  label: string;
  tone?: "light" | "dark";
}) {
  // Values wrap at different line counts across a row ("100%" is one line,
  // "Agent-ready" is two), which pushed each label to its own height. Spanning
  // the parent's two rows as a subgrid sizes the value track to the tallest in
  // the row, so every label starts on the same line, and a row of short values
  // stays tight instead of reserving space it doesn't need.
  return (
    <div className="row-span-2 grid grid-rows-subgrid gap-y-2">
      <div
        className={`font-display text-4xl font-extrabold tracking-tight sm:text-5xl ${
          tone === "dark" ? "text-white" : "text-bp-ink"
        }`}
      >
        <Counter value={value} />
      </div>
      <div className={`text-sm ${tone === "dark" ? "text-white/60" : "text-bp-mute"}`}>
        {label}
      </div>
    </div>
  );
}

export function Process({
  tone = "light",
  steps,
}: {
  tone?: "light" | "dark";
  steps?: { title: string; desc: string }[];
}) {
  const data =
    steps ?? [
      { title: "Discovery", desc: "We map the workflow, the constraints, and the compliance surface before a line of code." },
      { title: "Build", desc: "Senior engineers ship in two-week sprints. You see working software, not status decks." },
      { title: "Verify", desc: "Security and compliance are tested as we go (ADA/WCAG, PCI DSS, SOC 2 controls), never bolted on at the end." },
      { title: "Scale", desc: "We harden, instrument, and hand over, or stay on as your embedded product team." },
    ];
  const dark = tone === "dark";
  return (
    <div
      className={`grid border-l border-t sm:grid-cols-2 lg:grid-cols-4 ${
        dark ? "border-white/10" : "border-bp-edge"
      }`}
    >
      {data.map((s, i) => (
        <div
          key={s.title}
          data-stagger
          className={`border-b border-r p-7 ${
            dark ? "border-white/10 bg-white/[0.03]" : "border-bp-edge bg-white"
          }`}
        >
          <div className="flex items-center justify-between gap-4">
            <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="h-px flex-1 bg-current opacity-[0.08]" />
          </div>
          <h3
            className={`mt-5 font-display text-[18px] font-bold tracking-[-0.022em] ${
              dark ? "text-white" : "text-bp-ink"
            }`}
          >
            {s.title}
          </h3>
          <p className={`mt-3 text-[14.5px] leading-[1.7] ${dark ? "text-white/65" : "text-bp-mute"}`}>
            {s.desc}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CheckList({ items, tone = "light" }: { items: string[]; tone?: "light" | "dark" }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-brand-50 text-brand-700">
            <Icon name="check" className="h-3 w-3" />
          </span>
          <span className={`text-[15px] leading-relaxed ${tone === "dark" ? "text-white/75" : "text-bp-mute"}`}>
            {it}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function Breadcrumbs({
  trail,
  tone = "dark",
}: {
  trail: { label: string; href?: string }[];
  tone?: "dark" | "light";
}) {
  const base = tone === "dark" ? "text-white/50" : "text-bp-faint";
  const current = tone === "dark" ? "text-white/80" : "text-bp-ink";
  const hover = tone === "dark" ? "hover:text-white" : "hover:text-brand-700";
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.label,
      ...(t.href ? { item: `${site.url}${t.href === "/" ? "" : t.href}` } : {}),
    })),
  };
  return (
    <nav
      aria-label="Breadcrumb"
      className={`font-mono text-[11.5px] uppercase tracking-[0.12em] ${base}`}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ol className="flex flex-wrap items-center gap-x-1.5">
        {trail.map((t, i) => (
          <li key={t.label} className="flex items-center gap-1.5">
            {t.href ? (
              <Link href={t.href} className={`inline-block py-1 ${hover}`}>
                {t.label}
              </Link>
            ) : (
              <span className={`inline-block py-1 ${current}`}>{t.label}</span>
            )}
            {i < trail.length - 1 && <span className="opacity-50">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
