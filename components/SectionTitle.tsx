// v3 section heading: eyebrow / Sora title / sub, centered by default.
export default function SectionTitle({
  eyebrow,
  title,
  sub,
  align = "center",
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
    <div className={`${centered ? "mx-auto max-w-[660px] text-center" : "max-w-[560px]"} ${className}`}>
      <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">
        {eyebrow}
      </div>
      <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.15] tracking-[-0.02em] text-ink sm:text-[38px]">
        {title}
      </h2>
      {sub && <p className="mt-4 text-[16.5px] leading-[1.65] text-slatey">{sub}</p>}
    </div>
  );
}
