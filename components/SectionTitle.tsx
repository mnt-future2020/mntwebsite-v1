// Blueprint section heading: a mono eyebrow over a rule, then the display
// title. Left-aligned by default now, because the blueprint grid reads from the
// left edge; pages that still want a centred block pass align="center".
export default function SectionTitle({
  eyebrow,
  title,
  sub,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-[760px] text-center" : "max-w-[70ch]"} ${className}`}>
      <div className={`flex items-center gap-4 ${centered ? "justify-center" : ""}`}>
        {!centered && <span className="h-px w-[38px] shrink-0 bg-brand-500" />}
        <span className="whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
          {eyebrow}
        </span>
        {!centered && <span className="h-px flex-1 bg-bp-line" />}
      </div>
      <h2 className="mt-5 font-display text-[30px] font-bold leading-[1.04] tracking-[-0.038em] text-bp-ink sm:text-[42px]">
        {title}
      </h2>
      {sub && <p className="mt-5 max-w-[62ch] text-[17px] leading-[1.7] text-bp-mute">{sub}</p>}
    </div>
  );
}
