import Icon from "./Icon";
import Marquee from "./Marquee";
import { SectionHeading } from "./blocks";

type T = { quote: string; who: string; role: string };

const ROW_A: T[] = [
  { quote: "AI search and recommendations lifted our conversion 24% in the first quarter — it paid for itself fast.", who: "VP Ecommerce", role: "D2C brand" },
  { quote: "They rebuilt our checkout headless and conversion doubled. The engineering was genuinely senior.", who: "Head of Growth", role: "D2C brand" },
  { quote: "They made us agent-ready — our catalog now shows up and sells inside AI assistants.", who: "Founder", role: "US marketplace" },
  { quote: "Our vibe-coded MVP kept breaking. MnT hardened it and it finally held up at scale.", who: "Product Lead", role: "Commerce startup" },
];

const ROW_B: T[] = [
  { quote: "We needed a product partner, not a contractor. MnT built our SaaS from MVP to our Series A.", who: "Co-founder", role: "Commerce SaaS" },
  { quote: "Core Web Vitals went green and our rankings followed. Performance is clearly in their DNA.", who: "Marketing Lead", role: "Retail brand" },
  { quote: "Our multi-vendor marketplace scaled through a festival-season spike without a wobble.", who: "VP Engineering", role: "Marketplace startup" },
  { quote: "Senior engineers from day one — no juniors learning on our budget. It showed in the code.", who: "Founder", role: "B2B commerce" },
];

function Card({ t }: { t: T }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-card sm:w-[380px]">
      <Icon name="quote" className="h-7 w-7 text-brand-200" />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-700">
          {t.who.split(" ").map((w) => w[0]).join("").slice(0, 2)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-ink">{t.who}</span>
          <span className="block text-xs text-slatey">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="overflow-hidden py-20 sm:py-28">
      <div className="container-mnt">
        <SectionHeading
          eyebrow="What clients say"
          title="Senior delivery you can feel in the outcome."
          subtitle="A flavour of the feedback we hear from the US commerce founders we build with."
        />
      </div>
      <div className="mt-14 flex flex-col gap-5">
        <Marquee duration="48s">
          {ROW_A.map((t) => (
            <Card key={t.quote} t={t} />
          ))}
        </Marquee>
        <Marquee duration="54s" reverse>
          {ROW_B.map((t) => (
            <Card key={t.quote} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
