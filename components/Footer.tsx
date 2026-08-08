import Link from "next/link";
import Logo from "./Logo";
import Icon from "./Icon";
import NewsletterForm from "./NewsletterForm";
import { site } from "@/lib/site";
import FooterNav from "./FooterNav";
import FooterBlurb from "./FooterBlurb";
import FooterContact from "./FooterContact";
import { PAGE } from "./blueprint";

export default function Footer() {
  return (
    <footer className="relative bg-[#070E19]">
      <div className={`${PAGE} grid gap-9 pb-8 pt-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-[54px] lg:pt-[82px]`}>
        <div className="min-w-[230px]">
          <Logo variant="light" />
          <FooterBlurb
            field="footerBlurb"
            className="mt-5 max-w-[34ch] text-[14px] leading-[1.7] text-[#7E90A8]"
          />

          {/* id: the signup lives only here, so pages that offer it link
              down to this block rather than to a /newsletter page. */}
          <div id="newsletter" className="mt-[30px] max-w-[330px] scroll-mt-24">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand-300">
              Newsletter
            </div>
            <FooterBlurb
              field="newsletterBlurb"
              className="mt-3 text-[13.5px] leading-[1.65] text-[#7E90A8]"
            />
            <div className="mt-3.5">
              <NewsletterForm source="footer" />
            </div>
          </div>

          <div className="mt-[26px] flex gap-2.5">
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
                className="inline-flex h-[38px] w-[38px] items-center justify-center border border-[#1E2A3A] text-[#7E90A8] transition-colors hover:border-brand-500 hover:bg-brand-500/15 hover:text-white"
                aria-label={s.label}
              >
                <Icon name={s.icon} className="h-[17px] w-[17px]" />
              </a>
            ))}
          </div>
        </div>

        <FooterNav />
      </div>

      <div
        className={`${PAGE} flex flex-wrap items-center justify-between gap-3.5 border-t border-[#16202E] pb-10 pt-5`}
      >
        <p className="m-0 font-mono text-[11.5px] text-[#71829A]">
          © {new Date().getFullYear()} MnT Future. All rights reserved.
        </p>
        <div className="flex flex-wrap items-center gap-[22px] font-mono text-[11.5px] text-[#71829A]">
          <FooterContact />
          <a href={`mailto:${site.email}`} className="inline-block py-1.5 transition-colors hover:text-white">
            {site.email}
          </a>
          <span>{site.domain}</span>
          <a
            href="#top"
            className="inline-flex items-center gap-2 border border-[#1E2A3A] px-3 py-[7px] tracking-[0.12em] text-[#7E90A8] transition-colors hover:border-brand-500 hover:text-white"
          >
            TOP
            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 19V5M6 11l6-6 6 6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Wordmark watermark: the sign-off, cropped by the viewport. Drawn as
          CSS generated content, not a text node — it is decoration a shade off
          the footer's own background (1.07:1) and was being reported as a
          contrast failure on every page of the site. Same rendering. */}
      <div className="pointer-events-none overflow-hidden px-[18px] pb-8 sm:px-8 lg:px-14" aria-hidden="true">
        <div className='mx-auto max-w-[1440px] whitespace-nowrap font-display text-[52px] font-extrabold leading-[0.78] tracking-[-0.062em] text-[#0C1725] before:content-["MnT_Future"] sm:text-[13.4vw]' />
      </div>
    </footer>
  );
}
