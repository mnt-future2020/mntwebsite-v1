import BrandLogo from "./BrandLogo";
import { RuleLabel, PAGE } from "./blueprint";

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
  // Baked hex predates OpenAI's rebrand: their mark is black now. "Select" is
  // the tier we hold in the OpenAI Partner Network.
  { name: "OpenAI", designation: "Select Partner", slug: "openai", color: "#0A0A0A" },
];

const cellClass =
  "flex flex-col items-center justify-center border-b border-r border-bp-line px-4 py-8 text-center shadow-[inset_0_2px_0_transparent] transition-[background,box-shadow] duration-200 hover:bg-[#FAFCFF] hover:shadow-[inset_0_2px_0_#2095F1]";

function CardBody({ p }: { p: (typeof partners)[number] }) {
  return (
    <>
      <span className="flex h-10 items-center justify-center">
        {p.img ? (
          // eslint-disable-next-line @next/next/no-img-element -- static SVG marks need no optimizer
          <img src={p.img} alt={`${p.name} logo`} className={`w-auto ${p.imgClass}`} />
        ) : (
          <BrandLogo slug={p.slug!} color={p.color} className="h-8 w-8" />
        )}
      </span>
      <span className="mt-[15px] font-display text-[15px] font-bold text-bp-ink">{p.name}</span>
      <span className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] text-bp-faint">
        {p.designation}
      </span>
    </>
  );
}

export default function Partners() {
  return (
    <section className="border-b border-bp-line">
      <div className={`${PAGE} py-11 lg:py-[66px]`}>
        <RuleLabel>Official partners &amp; developer programs</RuleLabel>
        <div className="mt-[30px] grid border-l border-t border-bp-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {partners.map((p) =>
            p.href ? (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${p.name}: view our official partner listing`}
                className={cellClass}
              >
                <CardBody p={p} />
              </a>
            ) : (
              <div key={p.name} className={cellClass}>
                <CardBody p={p} />
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
