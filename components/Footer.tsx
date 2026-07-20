import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import NewsletterForm from "./NewsletterForm";
import { site, footerNav } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-[1200px] px-5 pb-8 pt-[60px] sm:px-7">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo variant="light" />
            <p className="mt-[18px] max-w-[300px] text-[13.5px] leading-[1.65] text-white/60">
              MnT Future: we build AI-native, agent-ready commerce platforms for US D2C &amp;
              marketplace brands.
            </p>

            <div className="mt-[26px] max-w-[320px]">
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-brand-300">
                Newsletter
              </div>
              <p className="mt-2.5 text-[13px] leading-relaxed text-white/60">
                Occasional, practical notes on AI-native, agent-ready commerce. No spam.
              </p>
              <div className="mt-3">
                <NewsletterForm source="footer" />
              </div>
            </div>

            <div className="mt-[22px] flex gap-2.5">
              {[
                { href: site.social.linkedin, label: "LinkedIn", icon: "linkedin" as const },
                { href: site.social.instagram, label: "Instagram", icon: "instagram" as const },
                { href: site.social.facebook, label: "Facebook", icon: "facebook" as const },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-200 hover:border-brand-500 hover:bg-brand-500 hover:text-white"
                  aria-label={s.label}
                >
                  <Icon name={s.icon} className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {footerNav.map((col) => (
            <div key={col.title}>
              <div className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-brand-300">
                {col.title}
              </div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13.5px] text-white/65 transition-colors hover:text-white"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/[0.12] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Magizh NexGen Technologies. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-[22px] gap-y-2 text-xs text-white/50">
            <a href={`mailto:${site.email}`} className="transition-colors hover:text-white">
              {site.email}
            </a>
            <span>{site.domain}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
