import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";

export default function NewsletterResult({
  icon,
  title,
  body,
  ok = true,
}: {
  icon: IconName;
  title: string;
  body: string;
  ok?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:54px_54px] opacity-40" />
      <div className="pointer-events-none absolute -left-40 -top-24 h-[26rem] w-[26rem] rounded-full bg-brand/20 blur-[120px]" />
      <div className="container-mnt relative flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
        <span
          className={`flex h-16 w-16 items-center justify-center rounded-2xl ${
            ok ? "bg-brand/15 text-brand-200" : "bg-white/10 text-white/60"
          }`}
        >
          <Icon name={icon} className="h-8 w-8" />
        </span>
        <h1 className="mt-6 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">{body}</p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-600"
        >
          <Icon name="arrow" className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
