import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Icon, { IconName } from "@/components/Icon";
import { Breadcrumbs } from "@/components/blocks";
import { site } from "@/lib/site";
import { resolveMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return resolveMetadata("/contact", {
    title: "Contact MnT — Start a Project",
    description:
      "Start a project with MnT. Book a 30-minute discovery call with a senior engineer for healthcare or e-commerce software development. India + global.",
  });
}

const expect: { icon: IconName; title: string; desc: string }[] = [
  { icon: "users", title: "A senior engineer, not a sales rep", desc: "You talk to someone who can actually scope and build what you need." },
  { icon: "compass", title: "A clear scope & timeline", desc: "Leave the first call with a realistic plan — not a vague proposal weeks later." },
  { icon: "shield", title: "An honest budget range", desc: "We'll tell you what it really costs and recommend the right engagement for your stage." },
];

export default function Contact() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-50" />
        <div className="pointer-events-none absolute -right-32 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand/25 blur-[120px]" />
        <div className="container-mnt relative pb-20 pt-10 sm:pb-24 sm:pt-14">
          <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <div className="mt-8 max-w-3xl animate-fade-up">
            <span className="eyebrow-dark">Start a project</span>
            <h1 className="mt-6 font-display text-[2.4rem] font-extrabold leading-[1.08] tracking-tight sm:text-[3.2rem]">
              Tell us what you&apos;re building.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/70">
              Whether it&apos;s a compliant healthcare platform or a store built to scale, the first
              step is a 30-minute discovery call. No obligation, no jargon.
            </p>
          </div>
        </div>
      </section>

      {/* FORM + SIDE */}
      <section className="container-mnt pb-24 pt-14 sm:pb-28">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <ContactForm />

          <div className="space-y-6">
            <div className="rounded-[2rem] border border-slate-100 bg-white p-7 shadow-card">
              <h2 className="font-display text-lg font-bold text-ink">What to expect</h2>
              <ul className="mt-5 space-y-5">
                {expect.map((e) => (
                  <li key={e.title} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                      <Icon name={e.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{e.title}</div>
                      <div className="mt-0.5 text-sm leading-snug text-slatey">{e.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] bg-navy p-7 text-white shadow-glow">
              <h2 className="font-display text-lg font-bold">Prefer to reach out directly?</h2>
              <div className="mt-5 space-y-4 text-sm">
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 text-white/80 hover:text-white">
                  <Icon name="mail" className="h-5 w-5 text-brand-200" /> {site.email}
                </a>
                <span className="flex items-center gap-3 text-white/80">
                  <Icon name="globe" className="h-5 w-5 text-brand-200" /> {site.domain}
                </span>
                <span className="flex items-center gap-3 text-white/80">
                  <Icon name="pin" className="h-5 w-5 text-brand-200" /> India · serving US, Middle East &amp; Europe
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
