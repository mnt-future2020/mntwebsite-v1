import type { Metadata } from "next";
import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeading, CheckList, Breadcrumbs } from "@/components/blocks";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/security-compliance", {
    title: "HIPAA, ABDM & SOC 2 Compliant Development | MnT",
    description:
      "Compliance engineered into the architecture — HIPAA, ABDM/FHIR, GDPR, ISO 27001, SOC 2. How MnT keeps health and commerce data safe.",
  });
}

const frameworks: { name: string; icon: IconName; desc: string; tags: string[] }[] = [
  {
    name: "HIPAA",
    icon: "shield",
    desc: "Encryption, audit logging, access control, and BAAs — built into healthcare platforms from the first sprint.",
    tags: ["PHI security", "Audit trails", "Access control"],
  },
  {
    name: "ABDM & FHIR",
    icon: "network",
    desc: "HIP/HIU setup, consent, ABHA linking, and the sandbox-to-certified pathway for India's national health stack.",
    tags: ["HIP / HIU", "Consent mgmt", "FHIR APIs"],
  },
  {
    name: "ISO 27001",
    icon: "lock",
    desc: "Information-security management practices engineered into your build and our delivery pipeline.",
    tags: ["ISMS", "Risk controls", "Policies"],
  },
  {
    name: "SOC 2",
    icon: "records",
    desc: "Security, availability, and confidentiality controls — designed for the audit, validated continuously.",
    tags: ["Trust criteria", "Monitoring", "Evidence"],
  },
  {
    name: "GDPR",
    icon: "globe",
    desc: "Data-residency, consent, and subject-rights handling for India, US (CMS) and EU markets.",
    tags: ["Data residency", "Consent", "DSARs"],
  },
  {
    name: "PCI-aware commerce",
    icon: "cart",
    desc: "Payment flows architected so sensitive card data stays out of scope — tokenised, gateway-handled, audited.",
    tags: ["Tokenisation", "UPI / cards", "Secure checkout"],
  },
];

const principles = [
  "Threat-model first — we map the data, the risks, and the regulatory surface before we design the system.",
  "Least privilege everywhere — role-based access, scoped tokens, and audited service-to-service calls.",
  "Encryption in transit and at rest, with key management and rotation handled as infrastructure.",
  "Continuous compliance — controls validated every sprint in CI/CD, not assembled before an audit.",
  "Observability and audit logging built in, so you can prove what happened, when, and to whom.",
];

export default function SecurityCompliance() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-50" />
        <div className="pointer-events-none absolute -right-32 -top-24 h-[28rem] w-[28rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-navy" />
        <div className="container-mnt relative pb-20 pt-10 sm:pb-24 sm:pt-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Security & Compliance" }]} />
          <div className="mt-8 max-w-3xl animate-fade-up">
            <span className="eyebrow-dark">Security &amp; compliance</span>
            <h1 className="mt-6 font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-tight sm:text-[3.4rem]">
              Compliance isn&apos;t a checkbox. It&apos;s architecture.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Whether it&apos;s protected health information or payment data, the safest systems are
              the ones where security and compliance were design decisions — not last-minute patches.
              Here&apos;s how MnT keeps health and commerce data safe.
            </p>
            <div className="mt-9">
              <Link href="/contact" className="btn-primary">
                Talk to a senior engineer <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FRAMEWORKS */}
      <section className="container-mnt py-20 sm:py-28">
        <SectionHeading
          eyebrow="Frameworks we engineer to"
          title="The standards that protect your users — and your business."
          subtitle="We don't just claim compliance. We build to these frameworks and validate them as we ship."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((f, i) => (
            <Reveal key={f.name} delay={i * 60}>
              <SpotlightCard className="card card-hover group h-full">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  <span className="font-display text-lg font-extrabold text-ink">{f.name}</span>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-slatey">{f.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <span key={t} className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-slatey">
                      {t}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="bg-soft py-20 sm:py-28">
        <div className="container-mnt grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="How we engineer it"
              title="Five principles behind every secure build."
              subtitle="The same engineering discipline whether we're building a telemedicine app or a checkout that handles thousands of transactions a minute."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="rounded-[2rem] border border-slate-100 bg-white p-8 shadow-card sm:p-10">
              <CheckList items={principles} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BY VERTICAL */}
      <section className="container-mnt py-20 sm:py-28">
        <SectionHeading
          eyebrow="By vertical"
          title="Different data, same discipline."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col rounded-[2rem] border border-slate-100 bg-white p-8 shadow-card sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                <Icon name="stethoscope" className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">Healthcare data</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slatey">
                PHI demands the highest bar. We engineer HIPAA-aligned platforms with ABDM/FHIR
                interoperability and the certification pathway handled end to end.
              </p>
              <Link href="/healthcare-software-development" className="link-arrow mt-6">
                Healthcare software development <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex h-full flex-col rounded-[2rem] border border-slate-100 bg-white p-8 shadow-card sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white">
                <Icon name="cart" className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-ink">Commerce data</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-slatey">
                Customer and payment data stay protected through PCI-aware architecture, tokenised
                payments, and secure checkout — without slowing the store down.
              </p>
              <Link href="/ecommerce-development" className="link-arrow mt-6">
                E-commerce development <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        eyebrow="Compliance review"
        title="Have a compliance requirement? Let's map it before you build."
        body="Bring your regulatory surface — HIPAA, ABDM, SOC 2, GDPR — and we'll walk you through how we'd architect it. No jargon, no scare tactics."
        primary={{ label: "Book a compliance call", href: "/contact" }}
        secondary={{ label: "Explore the verticals", href: "/" }}
      />
    </>
  );
}
