import type { Metadata } from "next";
import BlueprintMotion from "@/components/BlueprintMotion";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { Breadcrumbs } from "@/components/blocks";
import BlueprintFaq from "@/components/BlueprintFaq";
import { SectionHead, PAGE } from "@/components/blueprint";
import { site } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/contact", {
    title: "Contact MnT Future: Book a Free Strategy Session",
    description:
      "Book a free strategy session or agent-readiness audit with a senior MnT Future consultant. AI-native, agent-ready commerce for US D2C and marketplace brands.",
  });
}

// The page was 196 words: a form, a heading and two links. That is thin for a
// page people land on straight from search for "e-commerce development agency",
// and it left the most common pre-enquiry questions unanswered right at the
// point where someone decides whether to fill the form in.
const STEPS = [
  {
    no: "01",
    title: "A senior consultant reads it",
    body: "Not a sales development rep, and not a queue. The person who replies is someone who has shipped commerce platforms, so the first answer is already technical.",
  },
  {
    no: "02",
    title: "You hear back within one business day",
    body: "If your question has a short answer, we send the short answer instead of booking a call, including when the answer is that you do not need us for this.",
  },
  {
    no: "03",
    title: "45 minutes, no obligation",
    body: "If a session makes sense, we sketch how we would build it: the data model, the integrations, where it will strain at your volume, and roughly what it costs.",
  },
  {
    no: "04",
    title: "You keep the written brief",
    body: "The recommendation is yours whether or not you hire us. Several people have taken it to their in-house team and built it themselves. That is a fine outcome.",
  },
];

const FAQS = [
  {
    q: "What should I include in the form?",
    a: "Whatever a senior engineer would need to give you a useful first answer: what you sell, what you are on today, the order volume, and the specific thing that is breaking or blocking you. A store URL is worth more than a paragraph of description, because we will look at it before we reply.",
  },
  {
    q: "Do you take small projects?",
    a: "We take projects where custom engineering is genuinely the right answer. If a Shopify theme and two apps would solve your problem for a fraction of the cost, we will tell you that, and we would rather tell you in the first email than three months into a build.",
  },
  {
    q: "Is the strategy session actually free, and is it a sales call?",
    a: "It is free and there is no obligation. It is a working session rather than a pitch: you bring the problem, we work on it live and write up what we would do. If we are not the right fit we say so and, where we can, point you at who is.",
  },
  {
    q: "What if I only want the agent-readiness audit?",
    a: "Ask for it in the form and that is what you will get: how your store looks to AI shopping agents across structured data, feeds, and ACP, UCP and MCP discovery, with the gaps ranked by what they cost you. You can also run the scan yourself, free, at /open-source/agentready.",
  },
  {
    q: "Who owns the code you write?",
    a: "You do. Every build ships to a repository you own, on infrastructure in your accounts, with the architecture documented. There is no platform lock-in and no licence that stops you taking the work elsewhere.",
  },
  {
    q: "Where are you based, and does time zone matter?",
    a: "We work with US brands from offices in India, with senior engineers overlapping US hours. In practice that means a reply waiting for you in the morning rather than a day lost. If you are in India, /in/contact is the page you want.",
  },
];

export default function Contact() {
  return (
    <><section className="bg-gradient-to-b from-[#FBFCFE] via-white to-white">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 pt-10 sm:px-7">
        <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Contact" }]} tone="light" />
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <div className="flex items-center gap-4">
                <span className="h-px w-[38px] shrink-0 bg-brand-500" />
                <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
                  Start a project
                </span>
              </div>
            <h1 className="mt-[18px] font-display text-[34px] font-extrabold leading-[1.14] tracking-[-0.02em] text-bp-ink sm:text-[42px]">
              Tell us what you&apos;re building.
            </h1>
            <p className="mt-[18px] max-w-[480px] text-base leading-[1.65] text-bp-mute">
              A free strategy session with a senior consultant: we sketch how we&apos;d build
              it: data model, APIs, and a scalability plan. Or get a free agent-readiness audit of
              your store.
            </p>

            <div className="mt-[38px] flex flex-col gap-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 text-[15px] font-medium text-slate-700 transition-colors hover:text-brand-700"
              >
                <span className="flex h-10 w-10 items-center justify-center border border-bp-edge bg-white text-brand-700">
                  <Icon name="mail" className="h-[18px] w-[18px]" />
                </span>
                {site.email}
              </a>
              <span className="inline-flex items-center gap-3 text-[15px] font-medium text-slate-700">
                <span className="flex h-10 w-10 items-center justify-center border border-bp-edge bg-white text-brand-700">
                  <Icon name="globe" className="h-[18px] w-[18px]" />
                </span>
                {site.domain}
              </span>
            </div>
          </div>

          <div className="animate-fade-up border border-bp-edge bg-white p-6 shadow-[0_20px_50px_-28px_rgba(14,27,46,0.18)] sm:p-9" style={{ animationDelay: "100ms" }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>

    <section className="border-t border-bp-line bg-white py-20 lg:py-[104px]">
      <div className={PAGE}>
        <SectionHead
          no="01"
          total="02"
          eyebrow="After you hit send"
          title="What actually happens next."
          sub="No drip sequence, no discovery form, no seven-day silence."
        />
        <div className="mt-11 grid border-l border-t border-bp-edge sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.no} className="border-b border-r border-bp-edge p-7 lg:p-8">
              <div className="font-mono text-[11px] tracking-[0.16em] text-brand-700">{s.no}</div>
              <h3 className="mt-4 font-display text-[19px] font-bold leading-[1.25] tracking-[-0.02em] text-bp-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="border-t border-bp-line bg-bp-wash py-20 lg:py-[104px]">
      <div className={PAGE}>
        <SectionHead
          no="02"
          total="02"
          eyebrow="Before you write"
          title="The questions people ask us first."
        />
        <BlueprintFaq items={FAQS} />
      </div>
    </section>
    </>
  );
}
