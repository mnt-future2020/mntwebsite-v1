import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import BlueprintMotion from "@/components/BlueprintMotion";
import Icon from "@/components/Icon";
import { Breadcrumbs } from "@/components/blocks";
import { RuleLabel, PAGE } from "@/components/blueprint";
import { resolveMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/in/contact", {
    title: "Contact MnT Future India: Ecommerce & AI Engineering",
    description:
      "Talk to MnT Future about an ecommerce platform, AI work, or one of our products. A senior consultant reads every enquiry.",
  });
}

const ways = [
  { icon: "mail" as const, label: "Email", value: site.email, href: `mailto:${site.email}` },
  { icon: "calendar" as const, label: "Strategy session", value: "45 minutes, no obligation", href: "/in/strategy-session" },
  { icon: "grid" as const, label: "Products", value: "AI Desk, AI CRM, Commerce India", href: "/in/products" },
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
    </>
  );
}
