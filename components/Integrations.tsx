import BrandLogo from "./BrandLogo";
import { SectionHeading } from "./blocks";
import Reveal from "./Reveal";

// Full-colour brand logos; mailchimp's yellow is darkened slightly for contrast on light tiles.
const integrations: { slug: string; color?: string }[] = [
  { slug: "shopify" },
  { slug: "woocommerce" },
  { slug: "stripe" },
  { slug: "razorpay" },
  { slug: "paypal" },
  { slug: "mailchimp", color: "#C99A0B" },
  { slug: "googlecloud" },
  { slug: "mongodb" },
  { slug: "redis" },
  { slug: "firebase" },
  { slug: "cloudflare" },
  { slug: "docker" },
];

export default function Integrations() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-mnt">
        <SectionHeading
          eyebrow="Integrations"
          title="We plug into the tools you already run on."
          subtitle="Payments, commerce, cloud and data platforms — connected cleanly into your build, not bolted on."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.map((item, i) => (
            <Reveal key={item.slug} delay={i * 40}>
              <div className="group flex h-full items-center justify-center rounded-2xl border border-slate-100 bg-soft py-8 transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:bg-white hover:shadow-card">
                <BrandLogo
                  slug={item.slug}
                  color={item.color}
                  className="h-9 w-9 transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-slatey">
          …and many more — EHR/EMR systems, ABDM/FHIR networks, ERPs, logistics and analytics.
        </p>
      </div>
    </section>
  );
}
