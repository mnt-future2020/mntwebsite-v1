import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Page not found",
};

const links = [
  { label: "Commerce Platforms", href: "/commerce", icon: "store" as const },
  { label: "AI & Agents", href: "/ai-agents", icon: "ai" as const },
  { label: "Book a free workshop", href: "/contact", icon: "rocket" as const },
  { label: "Back to home", href: "/", icon: "arrow" as const },
];

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-40" />
      <div className="pointer-events-none absolute -left-40 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[120px]" />
      <div className="container-mnt relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span className="font-display text-[5rem] font-extrabold leading-none tracking-tight text-brand-300 sm:text-[7rem]">
          404
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          This page took a wrong turn.
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">
          The link may be broken, or the page may have moved. Here&apos;s where most people head next.
        </p>

        <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-4 text-left text-sm font-semibold text-white transition-colors hover:border-brand hover:bg-white/[0.08]"
            >
              <span className="inline-flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-brand-200">
                  <Icon name={l.icon} className="h-5 w-5" />
                </span>
                {l.label}
              </span>
              <Icon name="arrow" className="h-4 w-4 text-white/40 transition-transform group-hover:translate-x-1 group-hover:text-brand-200" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
