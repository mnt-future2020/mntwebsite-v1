import Link from "next/link";
import Icon from "./Icon";
import Reveal from "./Reveal";

export default function CTASection({
  eyebrow = "Start a project",
  title = "Tell us what you're building. We'll tell you how we'd build it.",
  body = "A 30-minute discovery call with a senior engineer — not a sales rep. Walk away with a clear scope, a realistic timeline, and an honest budget range.",
  primary = { label: "Book a discovery call", href: "/contact" },
  secondary = { label: "See our process", href: "/about#process" },
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="container-mnt py-20 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-navy px-7 py-14 text-center sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:48px_48px] opacity-40" />
          <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-brand-700/30 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow-dark">{eyebrow}</span>
            <h2 className="mt-6 font-display text-3xl font-extrabold tracking-tight text-white sm:text-[2.6rem] sm:leading-[1.1]">
              {title}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70">
              {body}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href={primary.href} className="btn-white w-full sm:w-auto">
                {primary.label}
                <Icon name="arrow" className="h-4 w-4" />
              </Link>
              <Link href={secondary.href} className="btn-outline-light w-full sm:w-auto">
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
