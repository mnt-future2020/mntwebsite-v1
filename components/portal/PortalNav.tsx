"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon, { IconName } from "@/components/Icon";

type Item = { href: string; label: string; icon: IconName; exact?: boolean };

const items: Item[] = [
  { href: "/portal", label: "Dashboard", icon: "grid", exact: true },
  { href: "/portal/projects", label: "My projects", icon: "layers" },
  { href: "/scan", label: "Scan attendance", icon: "compass" },
  { href: "/portal/leave", label: "My leave", icon: "clock" },
  { href: "/portal/attendance", label: "My attendance", icon: "calendar" },
  { href: "/portal/payslips", label: "Payslips", icon: "wallet" },
  { href: "/portal/profile", label: "Profile", icon: "users" },
];

export default function PortalNav({ email }: { email?: string }) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname?.startsWith(href);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex h-full flex-col">
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {items.map((it) => {
          const active = isActive(it.href, it.exact);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active ? "bg-brand-50 text-brand-700" : "text-slatey hover:bg-slate-100 hover:text-ink"
              }`}
            >
              <Icon name={it.icon} className="h-5 w-5" />
              {it.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-slate-200 pt-4">
        {email && <p className="truncate px-3 text-xs text-slate-400">{email}</p>}
        <button
          onClick={logout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slatey transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <Icon name="lock" className="h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
}
