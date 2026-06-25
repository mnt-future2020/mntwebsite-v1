import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import NewsletterForm from "./NewsletterForm";
import { site, footerNav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-brand/20 blur-3xl" />
      <div className="container-mnt relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">
              MnT (Magizh NexGen Technologies) — a healthcare and e-commerce software
              development company. Two specialisms, one senior team. India + global.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: site.social.instagram, label: "Instagram", icon: "instagram" as const },
                { href: site.social.linkedin, label: "LinkedIn", icon: "linkedin" as const },
                { href: site.social.facebook, label: "Facebook", icon: "facebook" as const },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/75 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
                  aria-label={s.label}
                >
                  <Icon name={s.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>

            <div className="mt-8 max-w-sm">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
                Newsletter
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">
                Occasional, practical notes on healthcare &amp; e-commerce engineering. No spam.
              </p>
              <div className="mt-4">
                <NewsletterForm source="footer" />
              </div>
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-brand-200">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-sm text-white/65 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Magizh NexGen Technologies. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
            <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-white">
              <Icon name="mail" className="h-4 w-4" /> {site.email}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="globe" className="h-4 w-4" /> {site.domain}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
