import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";
import CTASection from "@/components/CTASection";
import BlueprintMotion from "@/components/BlueprintMotion";
import { Breadcrumbs } from "@/components/blocks";
import { SectionHead, RuleLabel, BpButton, MakerMark, PAGE } from "@/components/blueprint";
import { INDIA_CLIENTS } from "@/lib/indiaClients";
import { CLIENT_DETAILS } from "@/lib/indiaClientDetails";
import { site } from "@/lib/site";

// Only the projects we have the code for get a detail page. The four we cannot
// inspect stay as entries on the index, because a case study we cannot support
// with evidence is just a page of adjectives.
export function generateStaticParams() {
  return Object.keys(CLIENT_DETAILS).map((slug) => ({ slug }));
}

function get(slug: string) {
  const client = INDIA_CLIENTS.find((c) => c.slug === slug);
  const detail = CLIENT_DETAILS[slug];
  return client && detail ? { client, detail } : null;
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const found = get(slug);
  if (!found) return { title: "Project not found" };
  const { client, detail } = found;

  // The headline is a full sentence — good on the page, far too long in a
  // <title>, where it pushed every one of these to 83–105 characters and got
  // cut off mid-clause in results. The industry is the short, honest label.
  const title = `${client.name}: ${client.industry} | MnT Future`;
  // Lead with the headline — it is the reason to click — then the two facts
  // that qualify it. The long `sector` blurb and the stack list are dropped:
  // between them they pushed these descriptions to 169–240 characters, and both
  // are on the page for anyone who wants them.
  const description = `${detail.headline} ${client.name} — ${client.industry}, built by MnT Future in India.`;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: `/in/work/clients/${slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      title: `${client.name} | Built by MnT Future`,
      description: detail.headline,
      url: `/in/work/clients/${slug}`,
      images: [client.shot],
    },
    twitter: {
      card: "summary_large_image",
      title: `${client.name} | Built by MnT Future`,
      description: detail.headline,
      images: [client.shot],
    },
  };
}

const SPOT =
  "radial-gradient(190px circle at var(--mx,50%) var(--my,0%),rgba(32,149,241,calc(0.05 * var(--spot,0))),transparent 72%)";

export default async function ClientCase(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const found = get(slug);
  if (!found) notFound();
  const { client: c, detail: d } = found;

  const others = Object.keys(CLIENT_DETAILS)
    .filter((s) => s !== slug)
    .map((s) => INDIA_CLIENTS.find((x) => x.slug === s)!)
    .slice(0, 4);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${c.name}: ${d.headline}`,
    about: c.sector,
    url: `${site.url}/in/work/clients/${slug}`,
    image: `${site.url}${c.shot}`,
    creator: { "@type": "Organization", name: site.name, legalName: site.legalName, url: site.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BlueprintMotion />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-14 pt-10 lg:pb-20 lg:pt-12`}>
          <Breadcrumbs
            trail={[
              { label: "Home", href: "/in" },
              { label: "Work", href: "/in/work" },
              { label: "Client projects", href: "/in/work/clients" },
              { label: c.name },
            ]}
            tone="light"
          />
          <div className="mt-8 flex animate-rise-in items-center gap-4 border-b border-bp-hair pb-7 lg:gap-7">
            <span className="h-px w-[38px] shrink-0 bg-brand-500" />
            <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
              Client project
            </span>
            <span className="min-w-3 flex-1" />
            <span className="hidden whitespace-nowrap font-mono text-[11.5px] uppercase tracking-[0.2em] text-[#A6B3C4] sm:inline">
              {c.region || "India"}
            </span>
          </div>

          <h1 className="mt-8 animate-rise-in font-display text-[42px] font-bold leading-[1.0] tracking-[-0.045em] text-bp-ink sm:text-[58px] lg:text-[72px]">
            {c.name}
          </h1>
          <p className="mt-5 max-w-[52ch] animate-rise-in text-[19px] leading-[1.6] text-bp-mute [animation-delay:100ms]">
            {c.sector}
          </p>

          <div className="mt-9 grid animate-rise-in items-start gap-9 [animation-delay:160ms] lg:grid-cols-[1fr_0.9fr] lg:gap-14">
            <div>
              <p className="m-0 max-w-[54ch] font-display text-[24px] font-bold leading-[1.28] tracking-[-0.028em] text-bp-ink lg:text-[28px]">
                {d.headline}
              </p>
              <MakerMark group="client" detail="Live" className="mt-7 max-w-[54ch] border-t border-bp-line pt-4" />
              <div className="mt-7 flex flex-wrap gap-3">
                <BpButton href="/in/strategy-session">Start a project</BpButton>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-14 items-center gap-2.5 border border-[#D8E1EC] bg-white px-7 font-mono text-[13px] font-semibold tracking-[0.06em] text-bp-ink transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07]"
                >
                  Visit {c.host}
                  <Icon name="arrow" className="h-3.5 w-3.5 -rotate-45" />
                </a>
              </div>
            </div>

            <div className="border border-[#D3DDE9] bg-white shadow-[0_44px_90px_-46px_rgba(11,21,36,0.42)]">
              <div className="flex items-center gap-1.5 border-b border-bp-hair bg-bp-tint px-3.5 py-[9px]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
                <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
                <span className="h-[7px] w-[7px] rounded-full bg-[#DCE3EC]" />
                <span className="ml-2 truncate border border-[#E9EEF5] bg-white px-2.5 py-1 font-mono text-[11px] sm:text-[10.5px] text-bp-faint">
                  {c.host}
                </span>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <Image
                  src={c.shot}
                  alt={`${c.name} website`}
                  width={1600}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 01 THE PROBLEM */}
      <section data-reveal className="border-b border-bp-line bg-bp-wash">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="01"
            total="04"
            eyebrow="Why a website was not the answer"
            title="What they would still have been doing by hand."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge lg:mt-16 lg:grid-cols-3">
            {d.problem.map((p, i) => (
              <div key={p} data-stagger className="flex gap-4 border-b border-r border-bp-edge bg-white p-7 lg:p-8">
                <span className="font-mono text-[11px] tracking-[0.14em] text-brand-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="m-0 text-[15.5px] leading-[1.7] text-bp-body">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 WHAT THE TEAM RUNS */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="02"
            total="04"
            eyebrow="What their team does in it"
            title="The part the public never sees."
            sub="Not a feature list. These are the jobs somebody at the client does in this system, on an ordinary day, without calling us."
          />
          <div className="mt-11 border-t border-bp-edge lg:mt-16">
            {d.runs.map((r) => (
              <div
                key={r.title}
                data-stagger
                data-spot
                style={{ backgroundImage: SPOT }}
                className="grid gap-3 border-b border-bp-edge py-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12 lg:py-7"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-1 flex h-[18px] w-[18px] shrink-0 items-center justify-center bg-brand-500/[0.09] text-brand-700">
                    <Icon name="check" className="h-[11px] w-[11px]" />
                  </span>
                  <h3 className="m-0 font-display text-[19px] font-bold leading-[1.26] tracking-[-0.024em] text-bp-ink">
                    {r.title}
                  </h3>
                </div>
                <p className="m-0 text-[15.5px] leading-[1.72] text-bp-mute">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 MODULES + STACK */}
      <section data-reveal className="border-b border-bp-line bg-bp-ink">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <SectionHead
            no="03"
            total="04"
            eyebrow="What is actually in there"
            title={`${d.modules.length} working parts, counted from the software itself.`}
            sub="Not a claim about what a site like this usually has. This is the list of sections and routes that exist in this project, which is the difference between a portfolio and an inventory."
            tone="dark"
          />
          <div className="mt-11 flex flex-wrap gap-2 lg:mt-16">
            {d.modules.map((m) => (
              <span
                key={m}
                data-stagger
                className="border border-white/12 bg-white/[0.04] px-3.5 py-2 font-mono text-[12.5px] tracking-[0.04em] text-white/75"
              >
                {m}
              </span>
            ))}
          </div>

          {d.note && (
            <p className="mt-9 max-w-[68ch] border-l-2 border-brand-500 pl-5 text-[16px] leading-[1.72] text-white/70">
              {d.note}
            </p>
          )}

          {c.stack && (
            <div className="mt-12 border-t border-white/10 pt-8">
              <RuleLabel tone="dark">Built with</RuleLabel>
              <div className="mt-5 flex flex-wrap gap-2">
                {c.stack.map((t) => (
                  <span
                    key={t}
                    className="border border-white/12 px-3.5 py-2 font-mono text-[12.5px] tracking-[0.04em] text-white/60"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 04 THE POINT */}
      <section data-reveal className="border-b border-bp-line bg-white">
        <div className={`${PAGE} py-20 lg:py-[110px]`}>
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <RuleLabel>How we work</RuleLabel>
              <h2 className="mt-6 max-w-[15ch] font-display text-[30px] font-bold leading-[1.06] tracking-[-0.038em] text-bp-ink lg:text-[42px]">
                We don&apos;t build websites. We build the system your business runs on.
              </h2>
            </div>
            <div>
              <p className="m-0 max-w-[60ch] text-[17px] leading-[1.75] text-bp-mute">
                The site your customers see is the front of it. Behind it sits the part your team
                actually lives in: prices, bookings, orders, enquiries, stock, staff. Changed by
                you, on the day you decide, not by us on a support ticket.
              </p>
              <p className="mt-5 max-w-[60ch] text-[17px] leading-[1.75] text-bp-mute">
                That is the whole difference. A website tells people you exist. A system runs the
                business, and it keeps running when you are not looking at it.
              </p>
              <div className="mt-9 flex flex-wrap gap-2.5">
                {others.map((o) => (
                  <Link
                    key={o.slug}
                    href={`/in/work/clients/${o.slug}`}
                    className="border border-[#D8E1EC] bg-white px-4 py-2.5 font-mono text-[12px] tracking-[0.06em] text-bp-mute transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07] hover:text-bp-ink"
                  >
                    {o.name}
                  </Link>
                ))}
                <Link
                  href="/in/work/clients"
                  className="border border-[#D8E1EC] bg-white px-4 py-2.5 font-mono text-[12px] tracking-[0.06em] text-brand-700 transition-colors hover:border-brand-500 hover:bg-brand-500/[0.07]"
                >
                  All client projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        title="What would your team stop doing by hand?"
        body="Tell us the job somebody in your business repeats every week: the rate change, the booking register, the enquiry that gets written on paper. A senior consultant will map what running it properly would take."
        primary={{ label: "Book a strategy session", href: "/in/strategy-session" }}
        secondary={{ label: "All client projects", href: "/in/work/clients" }}
      />
    </>
  );
}
