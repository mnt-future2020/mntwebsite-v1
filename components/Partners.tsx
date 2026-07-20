import BrandLogo from "./BrandLogo";
import Reveal from "./Reveal";

// Official partner programs and developer memberships. AWS and Google Cloud
// use their official multicolor marks (simple-icons has no AWS icon and only a
// monochrome Google Cloud); the rest render from the baked icon set.
const partners: {
  name: string;
  designation: string;
  slug?: string;
  color?: string;
  img?: string;
  imgClass?: string;
}[] = [
  { name: "AWS", designation: "Official Partner", img: "/images/partners/aws.svg", imgClass: "h-8" },
  { name: "Google Cloud", designation: "Official Partner", img: "/images/partners/google-cloud.svg", imgClass: "h-9" },
  { name: "Shopify", designation: "Official Partner", slug: "shopify" },
  // Baked hex predates OpenAI's rebrand: their mark is black now.
  { name: "OpenAI", designation: "Official Partner", slug: "openai", color: "#0A0A0A" },
  { name: "NVIDIA", designation: "Developer Program Member", slug: "nvidia" },
];

export default function Partners() {
  return (
    <section className="border-b border-line py-14">
      <p className="px-5 text-center text-[12.5px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Official partners &amp; developer programs
      </p>
      <div className="mx-auto mt-9 grid max-w-[1200px] grid-cols-2 gap-[14px] px-5 sm:grid-cols-3 sm:px-7 lg:grid-cols-5">
        {partners.map((p, i) => (
          <Reveal key={p.name} delay={i * 60}>
            <div className="flex h-full flex-col items-center justify-center rounded-[14px] border border-slate-200 bg-white px-4 py-6 text-center shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-all duration-[250ms] hover:-translate-y-[3px] hover:border-brand-200 hover:shadow-[0_14px_34px_-16px_rgba(14,102,194,0.2)]">
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
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
