import Link from "next/link";
import Icon, { IconName } from "@/components/Icon";

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold text-ink">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-slatey">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  icon,
  href,
  accent,
}: {
  label: string;
  value: number | string;
  icon: IconName;
  href?: string;
  accent?: boolean;
}) {
  const inner = (
    <>
      <span
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${
          accent ? "bg-brand text-white" : "bg-brand-50 text-brand-700"
        }`}
      >
        <Icon name={icon} className="h-5 w-5" />
      </span>
      <div className="mt-4 text-3xl font-bold text-ink">{value}</div>
      <div className="mt-1 text-sm text-slatey">{label}</div>
    </>
  );
  return href ? (
    <Link href={href} className="block rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-brand-200">
      {inner}
    </Link>
  ) : (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">{inner}</div>
  );
}

export function DbNotice() {
  return (
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
      <p className="font-semibold">Database not connected yet</p>
      <p className="mt-2">
        Set <code className="rounded bg-white/70 px-1">DATABASE_URL</code> in <code className="rounded bg-white/70 px-1">.env</code>,
        then run the migration to activate the admin:
      </p>
      <pre className="mt-3 overflow-x-auto rounded-lg bg-white/70 p-3 text-xs leading-relaxed">
{`npm install
npx prisma migrate dev --name init
npm run dev`}
      </pre>
    </div>
  );
}

export function Empty({ icon, title, body, action }: { icon: IconName; title: string; body: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
        <Icon name={icon} className="h-6 w-6" />
      </span>
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-slatey">{body}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
