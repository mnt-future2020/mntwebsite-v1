import BrandLogo from "./BrandLogo";
import Reveal from "./Reveal";

// Official partner programs and developer memberships. AWS and Google Cloud
// use their official multicolor marks (simple-icons has no AWS icon and only a
// monochrome Google Cloud); the rest render from the baked icon set. Cards with
// an href open the public partner-directory proof for that program.
const partners: {
  name: string;
  designation: string;
  slug?: string;
  color?: string;
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
  // Network" — not an "Anthropic Partner Network" — and the bare word "partner"
  // reads as a tier in this vocabulary, so the programme name carries the claim.
  { name: "Anthropic", designation: "Claude Partner Network", slug: "anthropic" },
  { name: "NVIDIA", designation: "Developer Program Member", slug: "nvidia" },
  // OpenAI is not a card: it has an issued Select-tier badge, which says the
  // same thing with their own authority. It renders below the grid.
];

const cardClass =
  "flex h-full flex-col items-center justify-center rounded-[14px] border border-slate-200 bg-white px-4 py-6 text-center shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]";

function CardBody({ p }: { p: (typeof partners)[number] }) {
  return (
    <>
      <span className="flex h-10 items-center justify-center">
        {p.img ? (
          // eslint-disable-next-line @next/next/no-img-element -- static SVG marks need no optimizer
          <img src={p.img} alt={`${p.name} logo`} className={`w-auto ${p.imgClass}`} />
        ) : (
          <BrandLogo slug={p.slug!} color={p.color} className="h-9 w-9" />
        )}
      </span>
      <span className="mt-3 font-display text-[15px] font-bold text-ink">{p.name}</span>
      <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
        {p.designation}
      </span>
    </>
  );
}

export default function Partners() {
  return (
    <section className="border-b border-line py-14">
      <p className="px-5 text-center text-[12.5px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Official partners &amp; developer programs
      </p>
      {/* Five programmes: a 5-track row keeps them on one line instead of
          orphaning the last card. Widened to match. */}
      <div className="mx-auto mt-9 grid max-w-[1120px] grid-cols-2 gap-[14px] px-5 sm:px-7 lg:grid-cols-5">
        {partners.map((p, i) => (
          <Reveal key={p.name} delay={i * 60}>
            {p.href ? (
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name}: view our official partner listing`}
                className={cardClass}
              >
                <CardBody p={p} />
              </a>
            ) : (
              <div className={cardClass}>
                <CardBody p={p} />
              </div>
            )}
          </Reveal>
        ))}
      </div>

      {/* The badge OpenAI issues to Select-tier partners, used unmodified as
          their guidelines require: no recolouring, no cropping to the mark. */}
      <Reveal delay={360}>
        <div className="mt-9 flex justify-center px-5">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark needs no optimizer */}
          <img
            src="/images/partners/openai-select-partner.svg"
            alt="OpenAI Select Partner"
            width={375}
            height={177}
            className="h-[84px] w-auto"
          />
        </div>
      </Reveal>
    </section>
  );
}
