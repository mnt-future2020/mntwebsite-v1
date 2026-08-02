import Link from "next/link";

// Two belts running in opposite directions, masked at the edges and paused on
// hover. Each card is a stat lifted from a public case study, so the section is
// evidence rather than testimonial.
type Receipt = { value: string; label: string; title: string; slug: string };

function Card({ r }: { r: Receipt }) {
  return (
    <Link
      href={`/work/${r.slug}`}
      className="mr-3.5 flex w-[330px] shrink-0 flex-col border border-[#1E2A3C] bg-[#101B2B] p-[26px] transition-colors duration-250 hover:border-brand-500 hover:bg-[#14212F]"
    >
      <span className="font-display text-[29px] font-bold leading-[1.08] tracking-[-0.032em] text-white">
        {r.value}
      </span>
      <span className="mt-[11px] flex-1 text-[13.5px] leading-[1.6] text-[#9DB0C7]">{r.label}</span>
      <span className="mt-[18px] border-t border-[#1E2A3C] pt-[15px] font-mono text-[11px] tracking-[0.08em] text-brand-300">
        {r.title} case study →
      </span>
    </Link>
  );
}

function Belt({
  items,
  reverse = false,
  seconds,
}: {
  items: Receipt[];
  reverse?: boolean;
  seconds: number;
}) {
  return (
    <div className="group flex w-max">
      {/* Duplicated once so the translate can loop seamlessly at -50%. */}
      <div
        className="flex w-max group-hover:[animation-play-state:paused]"
        style={{
          animation: `${reverse ? "mq-reverse" : "mq"} ${seconds}s linear infinite`,
        }}
      >
        {[...items, ...items].map((r, i) => (
          <Card key={`${r.slug}-${r.label}-${i}`} r={r} />
        ))}
      </div>
    </div>
  );
}

export default function ReceiptsMarquee({ receipts }: { receipts: Receipt[] }) {
  const half = Math.ceil(receipts.length / 2);
  const rowA = receipts.slice(0, half);
  const rowB = receipts.slice(half);
  return (
    <div
      className="relative mt-11 flex flex-col gap-3.5 pb-20 lg:mt-[60px] lg:pb-[140px]"
      style={{
        WebkitMaskImage: "linear-gradient(to right,transparent,#000 5%,#000 95%,transparent)",
        maskImage: "linear-gradient(to right,transparent,#000 5%,#000 95%,transparent)",
      }}
    >
      <Belt items={rowA} seconds={78} />
      <Belt items={rowB.length ? rowB : rowA} reverse seconds={86} />
    </div>
  );
}
