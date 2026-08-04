import BrandLogo from "./BrandLogo";
import { RuleLabel, PAGE } from "./blueprint";

// Official partner programs and developer memberships, on a blue band with the
// marks reversed to white.
//
// The multicolour SVGs (AWS, Google Cloud) are forced white with a filter
// rather than shipped as second files: `brightness-0` flattens every colour to
// black and `invert` takes it to white, which is exactly the one-colour reverse
// each of these brands publishes for dark backgrounds. The inline marks just
// take a white fill.
const partners: {
  name: string;
  designation: string;
  slug?: string;
  img?: string;
  imgClass?: string;
  href?: string;
}[] = [
  {
    name: "AWS",
    designation: "Official Partner",
    img: "/images/partners/aws.svg",
    imgClass: "h-8",
    href: "https://aws.amazon.com/marketplace/seller-profile?id=seller-i3nsn3uyjrugc",
  },
  {
    name: "Google Cloud",
    designation: "Official Partner",
    img: "/images/partners/google-cloud.svg",
    imgClass: "h-9",
    href: "https://cloud.google.com/find-a-partner/partner/magizh-nexgen-technologies",
  },
  { name: "Shopify", designation: "Official Partner", slug: "shopify" },
  // Named exactly as Anthropic names it. The programme is the "Claude Partner
  // Network", not an "Anthropic Partner Network", and the bare word "partner"
  // reads as a tier in this vocabulary, so the programme name carries the claim.
  { name: "Anthropic", designation: "Claude Partner Network", slug: "anthropic" },
  { name: "NVIDIA", designation: "Developer Program Member", slug: "nvidia" },
  { name: "OpenAI", designation: "Select Partner", slug: "openai" },
];

const cellClass =
  "flex w-[252px] shrink-0 flex-col items-center justify-center border-r border-white/12 px-6 py-8 text-center transition-colors duration-200 hover:bg-white/[0.06]";

function Card({ p }: { p: (typeof partners)[number] }) {
  const inner = (
    <>
      <span className="flex h-10 items-center justify-center">
        {p.img ? (
          // eslint-disable-next-line @next/next/no-img-element -- static SVG marks need no optimizer
          <img
            src={p.img}
            alt={`${p.name} logo`}
            className={`w-auto brightness-0 invert ${p.imgClass}`}
          />
        ) : (
          <BrandLogo slug={p.slug!} color="#FFFFFF" className="h-8 w-8" />
        )}
      </span>
      <span className="mt-[15px] font-display text-[15px] font-bold text-white">{p.name}</span>
      <span className="mt-1.5 whitespace-nowrap font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.1em] text-white/55">
        {p.designation}
      </span>
    </>
  );
  return p.href ? (
    <a
      href={p.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${p.name}: view our official partner listing`}
      className={cellClass}
    >
      {inner}
    </a>
  ) : (
    <div className={cellClass}>{inner}</div>
  );
}

export default function Partners() {
  return (
    <section className="border-b border-bp-line bg-gradient-to-r from-brand-800 to-brand-900">
      <div className={`${PAGE} pb-[30px] pt-11 lg:pb-9 lg:pt-[62px]`}>
        <RuleLabel tone="dark">Official partners &amp; developer programs</RuleLabel>
      </div>

      {/* Full bleed, so the strip reads as a continuous run rather than a row
          that happens to be cropped by the page gutter. */}
      <div className="marquee-mask overflow-hidden pb-11 lg:pb-[62px]">
        <div className="group flex w-max">
          {/* Two halves, so translating the track by -50% loops seamlessly.
              Each half repeats the six partners, because one pass is 1512px
              and the loop would show a gap on any monitor wider than that.
              The second half is hidden from assistive tech, and the belt stops
              on hover so the partner links stay clickable. */}
          {[0, 1].map((half) => (
            <div
              key={half}
              className="flex w-max border-l border-white/12 group-hover:[animation-play-state:paused]"
              style={{ animation: "mq 84s linear infinite" }}
              aria-hidden={half === 1 || undefined}
            >
              {[0, 1].map((pass) =>
                partners.map((p) => <Card key={`${pass}-${p.name}`} p={p} />)
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
