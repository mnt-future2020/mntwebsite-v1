import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import BlueprintMotion from "@/components/BlueprintMotion";
import Icon from "@/components/Icon";
import { Breadcrumbs } from "@/components/blocks";
import BlueprintFaq from "@/components/BlueprintFaq";
import { RuleLabel, SectionHead, PAGE } from "@/components/blueprint";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/contact", {
    title: "Contact MnT Future India: Ecommerce & AI Engineering",
    description:
      "Talk to MnT Future about an ecommerce platform, AI work, or one of our products. A senior consultant reads every enquiry.",
  });
}

// Like the US contact page, this was a form and two paragraphs. The questions
// below are the ones that actually arrive before someone fills the form in, so
// answering them here is both the honest thing and the thing that gives the
// page enough substance to rank for the queries that lead to it.
const IN_STEPS = [
  {
    no: "01",
    title: "A senior consultant reads it",
    body: "Every enquiry, personally. If the answer is short we send the short answer rather than booking a call, including when the answer is that you do not need us.",
  },
  {
    no: "02",
    title: "A reply inside one working day",
    body: "Usually the same day. If we need something before we can answer properly, we will ask for that one thing rather than send a discovery questionnaire.",
  },
  {
    no: "03",
    title: "45 minutes, no obligation",
    body: "The strategy session is a working session: your bottleneck, the data model, the integrations, and what owning the platform would change about your costs.",
  },
  {
    no: "04",
    title: "You keep what we write",
    body: "The plan is yours whether or not you hire us. Take it to your in-house team if that is the better answer for your business.",
  },
];

const IN_FAQS = [
  {
    q: "What should I put in the message?",
    a: "What you sell, what you run on today, roughly how many orders a month, and the specific thing that is blocking you. If you have a live site, the URL is worth more than a description, because we will look at it before replying.",
  },
  {
    q: "Do you work with businesses outside Tamil Nadu?",
    a: "Yes. We are based in Madurai and work with clients across India and abroad. Almost all delivery happens remotely, with engineers on video and in your tools; we travel for kickoff and for the sessions that genuinely need a room.",
  },
  {
    q: "Should I buy one of your products or have something built?",
    a: "If MnT AI Desk, MnT AI CRM or MnT Commerce India already does what you need, buy the product: it is faster and cheaper and we will say so. Custom is the right answer when the way your business works is the thing that makes you money and no ready product respects it.",
  },
  {
    q: "How do you price work?",
    a: "Fixed scope and fixed price where the scope can honestly be fixed, and a monthly rate for embedded engineering where it cannot. You get the number before work starts, and we would rather lose the enquiry than quote a number we know will move.",
  },
  {
    q: "Do we own the code and the data?",
    a: "Yes. The repository, the database and the hosting accounts are yours, and the architecture is documented so another team could pick it up. There is no per-order commission and no licence that holds your data hostage.",
  },
  {
    q: "Is GST invoicing and Indian payment handling included?",
    a: "For ecommerce builds, yes: place of supply deciding CGST and SGST or IGST, slabs by HSN, gapless invoice serials through the financial year, and UPI-first checkout on an Indian gateway. It is core work here, not an add-on module.",
  },
];

// Phone and WhatsApp come first when they exist: an Indian buyer's first move
// is a call or a message, and a form is the channel they use when there is no
// other one. Both render only when the number is set in lib/site.ts, so the
// page never shows a dead link or a placeholder number.
const ways = [
  ...(site.phone
    ? [
        {
          icon: "phone" as const,
          label: "Call us",
          value: site.phone,
          href: `tel:${site.phone.replace(/[^\d+]/g, "")}`,
        },
      ]
    : []),
  ...(site.whatsapp
    ? [
        {
          icon: "chat" as const,
          label: "WhatsApp",
          value: "Message us, we reply the same day",
          href: `https://wa.me/${site.whatsapp}`,
        },
      ]
    : []),
  { icon: "mail" as const, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "calendar" as const, label: "Strategy session", value: "45 minutes, no obligation", href: "/in/strategy-session" },
  { icon: "grid" as const, label: "Products", value: "AI Desk, AI CRM, Commerce India", href: "/in/products" },
  {
    icon: "pin" as const,
    label: "Where we are",
    value: `${site.city}, ${site.state}: clients across India`,
    href: "/in/about",
  },
];

export default function IndiaContact() {
  return (
    <>
      <BlueprintMotion />
      <section className="relative overflow-hidden border-b border-bp-line bg-gradient-to-b from-[#FBFCFE] via-white to-white">
        <div
          className="pointer-events-none absolute inset-0 mx-auto max-w-[1440px]"
          style={{
            backgroundImage: "linear-gradient(to right,rgba(11,21,36,0.022) 1px,transparent 1px)",
            backgroundSize: "calc(100% / 12) 100%",
          }}
          aria-hidden="true"
        />
        <div className={`relative ${PAGE} pb-20 pt-10 lg:pb-28 lg:pt-14`}>
          <Breadcrumbs trail={[{ label: "Home", href: "/in" }, { label: "Contact" }]} tone="light" />
          <div className="mt-9 grid items-start gap-12 lg:grid-cols-[1fr_0.95fr] lg:gap-[72px]">
            <div className="animate-rise-in">
              <div className="flex items-center gap-4">
                <span className="h-px w-[38px] shrink-0 bg-brand-500" />
                <span className="font-mono text-[11.5px] uppercase tracking-[0.2em] text-brand-700">
                  Contact
                </span>
              </div>
              <h1 className="mt-6 max-w-[14ch] font-display text-[38px] font-bold leading-[0.99] tracking-[-0.048em] text-bp-ink sm:text-[52px] lg:text-[62px]">
                Tell us what you are trying to build.
              </h1>
              <p className="mt-6 max-w-[52ch] text-[18px] leading-[1.68] text-bp-mute">
                A senior consultant reads every enquiry. If your question has a short answer we will
                just answer it, including when the answer is that you do not need us.
              </p>

              <div className="mt-10">
                <RuleLabel>Other ways</RuleLabel>
                <div className="mt-4 border-t border-bp-hair">
                  {ways.map((w) => (
                    <a
                      key={w.label}
                      href={w.href}
                      className="group flex items-center gap-4 border-b border-bp-hair py-4 transition-colors"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#DCE6F2] bg-white text-brand-700">
                        <Icon name={w.icon} className="h-[17px] w-[17px]" />
                      </span>
                      <span className="flex-1">
                        <span className="block font-mono text-[11px] sm:text-[10.5px] uppercase tracking-[0.16em] text-bp-faint">
                          {w.label}
                        </span>
                        <span className="mt-1 block text-[15px] text-bp-body transition-colors group-hover:text-brand-700">
                          {w.value}
                        </span>
                      </span>
                      <Icon
                        name="arrow"
                        className="h-4 w-4 shrink-0 text-bp-faint transition-all group-hover:translate-x-1 group-hover:text-brand-700"
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="animate-rise-in border border-bp-edge bg-white p-7 shadow-[0_34px_66px_-46px_rgba(11,21,36,0.4)] [animation-delay:160ms] lg:p-9">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-700">
                Send us a message
              </div>
              <p className="mt-2.5 text-[14.5px] leading-[1.6] text-bp-mute">
                Two minutes, and you will hear back from a person.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-bp-line bg-white py-20 lg:py-[104px]">
        <div className={PAGE}>
          <SectionHead
            no="01"
            total="02"
            eyebrow="After you hit send"
            title="What actually happens next."
            sub="No automated sequence, no discovery form, no week of silence."
          />
          <div className="mt-11 grid border-l border-t border-bp-edge sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {IN_STEPS.map((s) => (
              <div key={s.no} className="border-b border-r border-bp-edge p-7 lg:p-8">
                <div className="font-mono text-[11px] tracking-[0.16em] text-brand-700">{s.no}</div>
                <h2 className="mt-4 font-display text-[19px] font-bold leading-[1.25] tracking-[-0.02em] text-bp-ink">
                  {s.title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-[1.7] text-bp-mute">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-bp-wash py-20 lg:py-[104px]">
        <div className={PAGE}>
          <SectionHead
            no="02"
            total="02"
            eyebrow="Before you write"
            title="The questions people ask us first."
          />
          <BlueprintFaq items={IN_FAQS} />
        </div>
      </section>
    </>
  );
}
