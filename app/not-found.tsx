import Link from "next/link";
import Icon from "@/components/Icon";

export const metadata = {
  title: "Page not found",
};

const links = [
  { label: "Commerce Platforms", href: "/commerce", icon: "store" as const },
  { label: "AI & Agents", href: "/ai-agents", icon: "ai" as const },
  { label: "Book a free strategy session", href: "/strategy-session", icon: "rocket" as const },
  { label: "Back to home", href: "/", icon: "arrow" as const },
];

export default function NotFound() {
  return (
    <section className="border-b border-line bg-gradient-to-b from-mist to-white">
      <div className="mx-auto flex min-h-[70vh] max-w-[1200px] flex-col items-center justify-center px-5 py-24 text-center sm:px-7">
        <span className="font-display text-[5rem] font-extrabold leading-none tracking-tight text-brand-200 sm:text-[7rem]">
          404
        </span>
        <h1 className="mt-4 font-display text-3xl font-extrabold tracking-[-0.02em] text-bp-ink sm:text-4xl">
          This page took a wrong turn.
        </h1>
        <p className="mt-4 max-w-md text-lg leading-[1.65] text-bp-mute">
          The link may be broken, or the page may have moved. Here&apos;s where most people head next.
        </p>

        <div className="mt-10 grid w-full max-w-xl grid-cols-1 gap-3 sm:grid-cols-2">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group flex items-center justify-between gap-3 rounded-[14px] border border-slate-200 bg-white px-5 py-4 text-left text-sm font-semibold text-slate-700 shadow-[0_1px_3px_rgba(14,27,46,0.04)] transition-colors hover:border-brand-300 hover:text-brand-700"
            >
              <span className="inline-flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700">
                  <Icon name={l.icon} className="h-5 w-5" />
                </span>
                {l.label}
              </span>
              <Icon
                name="arrow"
                className="h-4 w-4 text-slate-400 transition-transform group-hover:translate-x-1 group-hover:text-brand-700"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
