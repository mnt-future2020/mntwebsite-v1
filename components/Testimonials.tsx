import Link from "next/link";
import Icon from "./Icon";
import Marquee from "./Marquee";
import SectionTitle from "./SectionTitle";
import { caseStudies } from "@/lib/caseStudies";

// Receipts, not testimonials: every card is a real number from a public case
// study on /work. No invented quotes, no anonymous personas.
type Receipt = { value: string; label: string; title: string; slug: string };

function collectReceipts(): Receipt[] {
  return caseStudies.flatMap((cs) =>
    cs.facts.map((f) => ({ value: f.value, label: f.label, title: cs.title, slug: cs.slug }))
  );
}

function Card({ r }: { r: Receipt }) {
  return (
    <Link
      href={`/work/${r.slug}`}
      className="group flex w-[300px] shrink-0 flex-col rounded-[14px] border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-colors hover:border-brand-200 sm:w-[340px]"
    >
      <span className="font-display text-[28px] font-bold leading-tight text-ink">{r.value}</span>
      <span className="mt-2 flex-1 text-[13.5px] leading-[1.55] text-slatey">{r.label}</span>
      <span className="mt-4 inline-flex items-center gap-1.5 border-t border-slate-100 pt-3.5 text-[12.5px] font-semibold text-brand-700">
        {r.title} case study
        <Icon name="arrow" className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function Testimonials() {
  const receipts = collectReceipts();
  const mid = Math.ceil(receipts.length / 2);
  const rowA = receipts.slice(0, mid);
  const rowB = receipts.slice(mid);

  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
        <SectionTitle
          eyebrow="Receipts, not testimonials"
          title="Numbers from builds you can inspect."
          sub="No invented quotes. Every stat below comes from a public case study, so you can judge the work itself."
        />
      </div>
      <div className="mt-12 flex flex-col gap-[18px]">
        <Marquee duration="60s" gap="1.125rem">
          {rowA.map((r) => (
            <Card key={r.slug + r.label} r={r} />
          ))}
        </Marquee>
        <Marquee duration="66s" gap="1.125rem" reverse>
          {rowB.map((r) => (
            <Card key={r.slug + r.label} r={r} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
