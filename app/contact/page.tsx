import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon from "@/components/Icon";
import { Breadcrumbs } from "@/components/blocks";
import { site } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/contact", {
    title: "Contact MnT Future: Book a Free Strategy Session",
    description:
      "Book a free strategy session or agent-readiness audit with a senior MnT Future consultant. AI-native, agent-ready commerce for US D2C and marketplace brands.",
  });
}

export default function Contact() {
  return (
    <section className="bg-gradient-to-b from-mist to-white">
      <div className="mx-auto max-w-[1200px] px-5 pb-24 pt-10 sm:px-7">
        <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Contact" }]} tone="light" />
        <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <div className="text-[13px] font-semibold uppercase tracking-[0.12em] text-brand-700">
              Start a project
            </div>
            <h1 className="mt-[18px] font-display text-[34px] font-extrabold leading-[1.14] tracking-[-0.02em] text-ink sm:text-[42px]">
              Tell us what you&apos;re building.
            </h1>
            <p className="mt-[18px] max-w-[480px] text-base leading-[1.65] text-slatey">
              A free strategy session with a senior consultant: we sketch how we&apos;d build
              it: data model, APIs, and a scalability plan. Or get a free agent-readiness audit of
              your store.
            </p>

            <div className="mt-[38px] flex flex-col gap-4">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-3 text-[15px] font-medium text-slate-700 transition-colors hover:text-brand-700"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-slate-200 bg-white text-brand-700">
                  <Icon name="mail" className="h-[18px] w-[18px]" />
                </span>
                {site.email}
              </a>
              <span className="inline-flex items-center gap-3 text-[15px] font-medium text-slate-700">
                <span className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-slate-200 bg-white text-brand-700">
                  <Icon name="globe" className="h-[18px] w-[18px]" />
                </span>
                {site.domain}
              </span>
            </div>
          </div>

          <div className="animate-fade-up rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-28px_rgba(14,27,46,0.18)] sm:p-9" style={{ animationDelay: "100ms" }}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
