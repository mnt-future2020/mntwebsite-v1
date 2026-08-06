import type { Metadata } from "next";
import BlueprintMotion from "@/components/BlueprintMotion";
import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import SpotlightCard from "@/components/SpotlightCard";
import { SectionHeading, CheckList, Breadcrumbs } from "@/components/blocks";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/security-compliance", {
    title: "ADA, PCI DSS & US Sales-Tax, Built In | MnT Future",
    description:
      "US commerce compliance engineered into the architecture: ADA/WCAG, minimised PCI DSS v4.0.1 scope, integrated sales tax and SOC 2-aligned controls.",
  });
}

const frameworks: { name: string; icon: IconName; desc: string; tags: string[] }[] = [
  {
    name: "ADA / WCAG",
    icon: "shield",
    desc: "Roughly 78% of accessibility lawsuits target e-commerce. We build to WCAG 2.2 AA and keep testing as the store changes, with the record to show for it.",
    tags: ["WCAG 2.2 AA", "Screen readers", "Keyboard nav"],
  },
  {
    name: "PCI DSS v4.0.1",
    icon: "lock",
    desc: "Payment flows architected so card data stays out of scope: tokenized, gateway-handled, with PCI DSS v4.0.1 controls and evidence kept current. Your QSA validates; we minimise what they have to look at.",
    tags: ["Tokenization", "Scope reduction", "Continuous controls"],
  },
  {
    name: "Sales-tax & nexus",
    icon: "records",
    desc: "Multi-state US sales-tax and economic-nexus handled through Avalara / Anrok: accurate calculation and filing readiness.",
    tags: ["Economic nexus", "Avalara / Anrok", "Multi-state"],
  },
  {
    name: "SOC 2-aligned",
    icon: "gauge",
    desc: "Security, availability, and confidentiality controls engineered to the SOC 2 trust criteria and validated continuously in CI/CD. We build to these principles for your store; SOC 2 itself is an audit of the organization that holds it.",
    tags: ["Trust criteria", "Monitoring", "Evidence"],
  },
  {
    name: "US data privacy",
    icon: "globe",
    desc: "CCPA / CPRA consent, data-subject rights, and retention handling for US consumer data: engineered in, not bolted on.",
    tags: ["CCPA / CPRA", "Consent", "Data rights"],
  },
  {
    name: "Agent-ready integrity",
    icon: "network",
    desc: "AI agents only transact on trustworthy data. We keep price and inventory accurate and feeds structured for the agentic channel.",
    tags: ["Real-time sync", "Feed accuracy", "ACP / MCP"],
  },
];

const principles = [
  "Threat-model first: we map the data, the risks, and the regulatory surface before we design the system.",
  "Least privilege everywhere: role-based access, scoped tokens, and audited service-to-service calls.",
  "Encryption in transit and at rest, with key management and rotation handled as infrastructure.",
  "Continuous compliance: controls validated every sprint in CI/CD, not assembled before an audit.",
  "Observability and audit logging built in, so you can prove what happened, when, and to whom.",
];

export default function SecurityCompliance() {
  return (
    <>
      <BlueprintMotion />
      {/* HERO */}
      <section className="border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 relative pb-[72px] pt-10 sm:pt-12">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Security & Compliance" }]} tone="light" />
          <div className="mt-9 max-w-3xl animate-fade-up">
            <div className="flex items-center gap-4"><span className="h-px w-[38px] shrink-0 bg-brand-500" /><span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">Security &amp; compliance</span></div>
            <h1 className="mt-[18px] font-display text-[2.4rem] font-extrabold leading-[1.1] tracking-[-0.02em] text-bp-ink sm:text-[3.2rem]">
              Compliance isn&apos;t a checkbox. It&apos;s architecture.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-bp-mute">
              For a US store, accessibility, payment security, and sales-tax are liabilities the day
              you launch. The safest systems are the ones where compliance was a design decision: not
              a last-minute patch. Here&apos;s how MnT Future builds it in.
            </p>
            <div className="mt-9">
              <Link href="/contact" className="inline-flex items-center gap-2.5 bg-bp-ink px-7 py-4 font-mono text-[13px] font-semibold tracking-[0.06em] text-white transition-colors hover:bg-brand-700">
                Talk to a senior consultant <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FRAMEWORKS */}
      <section data-reveal className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 py-20 lg:py-[120px]">
        <SectionHeading
          eyebrow="Frameworks we engineer to"
          title="The standards that protect your users, and your business."
          subtitle="We don't just claim compliance. We build to these frameworks and validate them as we ship."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((f, i) => (
            <Reveal key={f.name} delay={i * 60}>
              <SpotlightCard className="card card-hover group h-full">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon name={f.icon} className="h-6 w-6" />
                  </div>
                  <span className="font-display text-lg font-extrabold text-bp-ink">{f.name}</span>
                </div>
                <p className="mt-5 text-[15px] leading-relaxed text-bp-mute">{f.desc}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {f.tags.map((t) => (
                    <span key={t} className="border border-bp-edge bg-bp-wash px-3 py-1 font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.08em] text-bp-mute">
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
      <section className="bg-bp-wash py-20 lg:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="How we engineer it"
              title="Five principles behind every secure build."
              subtitle="The same engineering discipline whether we're hardening a checkout that handles thousands of transactions a minute or making a store agent-ready."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="border border-bp-hair bg-white p-8 shadow-card sm:p-10">
              <CheckList items={principles} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* BY VERTICAL */}
      <section data-reveal className="mx-auto w-full max-w-[1440px] px-[18px] sm:px-8 lg:px-14 py-20 lg:py-[120px]">
        <SectionHeading
          eyebrow="By vertical"
          title="Different surface, same discipline."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col border border-bp-hair bg-white p-8 shadow-card sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center bg-brand-700 text-white">
                <Icon name="store" className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-bp-ink">Commerce platforms</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-bp-mute">
                Customer and payment data stay protected through PCI DSS v4.0.1 architecture, tokenized
                payments, and a secure checkout built to WCAG 2.2 AA, with the US sales-tax engine
                integrated, without slowing the store down.
              </p>
              <Link href="/commerce" className="link-arrow mt-6">
                Commerce platform development <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="flex h-full flex-col border border-bp-hair bg-white p-8 shadow-card sm:p-10">
              <div className="flex h-12 w-12 items-center justify-center bg-brand-700 text-white">
                <Icon name="ai" className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-bp-ink">AI &amp; agents</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-bp-mute">
                AI ships with guardrails: quality gates, a human approving sensitive actions, and accurate
                real-time data so agents transact correctly and safely in AI channels.
              </p>
              <Link href="/ai-agents" className="link-arrow mt-6">
                AI &amp; agents for commerce <Icon name="arrow" className="h-4 w-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection
        title="Have a compliance requirement? Let's map it before you build."
        body="Bring your regulatory surface: ADA, PCI DSS, sales-tax, SOC 2-aligned controls, and we'll walk you through how we'd architect it. No jargon, no scare tactics."
        primary={{ label: "Book a strategy session", href: "/strategy-session" }}
        secondary={{ label: "Explore what we build", href: "/" }}
      />
    </>
  );
}
