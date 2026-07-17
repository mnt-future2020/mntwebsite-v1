import Icon from "./Icon";
import Marquee from "./Marquee";
import SectionTitle from "./SectionTitle";

type T = { quote: string; who: string; role: string };

const ROW_A: T[] = [
  { quote: "AI search and recommendations lifted our conversion 24% in the first quarter — it paid for itself fast.", who: "VP Ecommerce", role: "D2C brand" },
  { quote: "They rebuilt our checkout headless and conversion doubled. The engineering was genuinely senior.", who: "Head of Growth", role: "D2C brand" },
  { quote: "They made us agent-ready — our catalog now shows up and sells inside AI assistants.", who: "Founder", role: "US marketplace" },
  { quote: "Our vibe-coded MVP kept breaking. MnT Future hardened it and it finally held up at scale.", who: "Product Lead", role: "Commerce startup" },
];

const ROW_B: T[] = [
  { quote: "We needed a product partner, not a contractor. MnT Future built our SaaS from MVP to our Series A.", who: "Co-founder", role: "Commerce SaaS" },
  { quote: "Core Web Vitals went green and our rankings followed. Performance is clearly in their DNA.", who: "Marketing Lead", role: "Retail brand" },
  { quote: "Our multi-vendor marketplace scaled through a festival-season spike without a wobble.", who: "VP Engineering", role: "Marketplace startup" },
  { quote: "Senior engineers from day one — no juniors learning on our budget. It showed in the code.", who: "Founder", role: "B2B commerce" },
];

function Card({ t }: { t: T }) {
  return (
    <figure className="flex w-[320px] shrink-0 flex-col rounded-[14px] border border-slate-200 bg-white p-6 shadow-[0_1px_3px_rgba(14,27,46,0.04)] sm:w-[380px]">
      <Icon name="quote" className="h-6 w-6 text-brand-200" />
      <blockquote className="mt-2.5 flex-1 text-[14.5px] leading-[1.65] text-slate-700">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-4 flex items-center gap-[11px] border-t border-slate-100 pt-3.5">
        <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-brand-50 text-[11px] font-bold text-brand-700">
          {t.who.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
        </span>
        <span>
          <span className="block text-[13.5px] font-semibold text-ink">{t.who}</span>
          <span className="block text-xs text-slate-500">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="overflow-hidden py-24">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-7">
        <SectionTitle
          eyebrow="What clients say"
          title="Senior delivery you can feel in the outcome."
          sub="A flavour of the feedback we hear from the US commerce founders we build with."
        />
      </div>
      <div className="mt-12 flex flex-col gap-[18px]">
        <Marquee duration="48s" gap="1.125rem">
          {ROW_A.map((t) => (
            <Card key={t.quote} t={t} />
          ))}
        </Marquee>
        <Marquee duration="54s" gap="1.125rem" reverse>
          {ROW_B.map((t) => (
            <Card key={t.quote} t={t} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
