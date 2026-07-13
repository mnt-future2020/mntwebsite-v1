"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Icon, { IconName } from "@/components/Icon";

type Item = { href: string; label: string; icon: IconName; key: string; exact?: boolean };

// Base employee self-service ("My workspace") — available to every real employee
// regardless of role. Rendered without a permission check; role-granted admin
// sections appear below it.
const myWorkspace: Item[] = [
  { href: "/portal", label: "Dashboard", icon: "grid", key: "__self", exact: true },
  { href: "/portal/projects", label: "My projects", icon: "layers", key: "__self" },
  { href: "/scan", label: "Mark attendance", icon: "compass", key: "__self" },
  { href: "/portal/leave", label: "My leave", icon: "clock", key: "__self" },
  { href: "/portal/attendance", label: "My attendance", icon: "calendar", key: "__self" },
  { href: "/portal/payslips", label: "Payslips", icon: "wallet", key: "__self" },
  { href: "/portal/profile", label: "Profile", icon: "users", key: "__self" },
];

const workspace: Item[] = [
  { href: "/admin", label: "Dashboard", icon: "grid", key: "dashboard", exact: true },
  { href: "/admin/posts", label: "Blog posts", icon: "records", key: "posts" },
  { href: "/admin/leads", label: "Leads", icon: "users", key: "leads" },
  { href: "/admin/subscribers", label: "Subscribers", icon: "mail", key: "subscribers" },
  { href: "/admin/campaigns", label: "Campaigns", icon: "rocket", key: "campaigns" },
  { href: "/admin/seo", label: "SEO", icon: "compass", key: "seo" },
  { href: "/admin/settings", label: "Settings", icon: "gauge", key: "settings" },
  { href: "/admin/roles", label: "Roles & access", icon: "lock", key: "roles" },
];

const projects: Item[] = [
  { href: "/admin/projects", label: "Overview", icon: "grid", key: "projects", exact: true },
  { href: "/admin/projects/clients", label: "Clients", icon: "building", key: "projects.clients" },
  { href: "/admin/projects/timesheets", label: "Timesheets", icon: "clock", key: "projects" },
  { href: "/admin/projects/invoices", label: "Invoices", icon: "wallet", key: "projects.billing" },
];

const crm: Item[] = [
  { href: "/admin/crm", label: "Pipeline", icon: "network", key: "crm", exact: true },
  { href: "/admin/crm/inbox", label: "Inbox", icon: "bell", key: "crm" },
  { href: "/admin/crm/contacts", label: "Contacts", icon: "users", key: "crm" },
  { href: "/admin/crm/companies", label: "Companies", icon: "building", key: "crm" },
];

const hr: Item[] = [
  { href: "/admin/hr", label: "HR overview", icon: "building", key: "hr.overview", exact: true },
  { href: "/admin/hr/employees", label: "Employees", icon: "users", key: "hr.employees" },
  { href: "/admin/hr/attendance", label: "Attendance", icon: "calendar", key: "hr.attendance" },
  { href: "/admin/hr/leave", label: "Leave", icon: "clock", key: "hr.leave" },
  { href: "/admin/hr/payroll", label: "Payroll", icon: "wallet", key: "hr.payroll" },
  { href: "/admin/hr/performance", label: "Performance", icon: "spark", key: "hr.performance" },
  { href: "/admin/hr/departments", label: "Departments", icon: "layers", key: "hr.departments" },
  { href: "/admin/hr/settings", label: "HR settings", icon: "compass", key: "hr.settings" },
  { href: "/admin/hr/monitoring", label: "Screen monitoring", icon: "eye", key: "hr.monitoring" },
];

const isActive = (pathname: string | null, href: string, exact?: boolean) =>
  exact ? pathname === href : !!pathname?.startsWith(href);

export default function AdminNav({
  email,
  perms,
  isEmployee = false,
}: {
  email?: string;
  perms: string[];
  isEmployee?: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const allow = (it: Item) => perms.includes(it.key);
  const wItems = workspace.filter(allow);
  const projectItems = projects.filter(allow);
  const crmItems = crm.filter(allow);
  const hrItems = hr.filter(allow);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  const renderItem = (it: Item) => (
    <Link
      key={it.href}
      href={it.href}
      className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive(pathname, it.href, it.exact)
          ? "bg-brand-50 text-brand-700"
          : "text-slatey hover:bg-slate-100 hover:text-ink"
      }`}
    >
      <Icon name={it.icon} className="h-5 w-5" />
      {it.label}
    </Link>
  );

  return (
    <div className="flex h-full flex-col">
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto">
        {isEmployee && (
          <NavGroup title="My workspace" items={myWorkspace} storageKey="mnt_self_nav_open" pathname={pathname} renderItem={renderItem} />
        )}
        <NavGroup title="Workspace" items={wItems} storageKey="mnt_workspace_nav_open" pathname={pathname} renderItem={renderItem} />
        <NavGroup title="Projects" items={projectItems} storageKey="mnt_projects_nav_open" pathname={pathname} renderItem={renderItem} />
        <NavGroup title="CRM" items={crmItems} storageKey="mnt_crm_nav_open" pathname={pathname} renderItem={renderItem} />
        <NavGroup title="Human resources" items={hrItems} storageKey="mnt_hr_nav_open" pathname={pathname} renderItem={renderItem} />

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slatey transition-colors hover:bg-slate-100 hover:text-ink"
        >
          <Icon name="globe" className="h-5 w-5" />
          View site
        </a>
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

// A collapsible sidebar section. Opens automatically when you're inside one of
// its pages; otherwise it restores the last open/closed choice from localStorage.
function NavGroup({
  title,
  items,
  storageKey,
  pathname,
  renderItem,
}: {
  title: string;
  items: Item[];
  storageKey: string;
  pathname: string | null;
  renderItem: (it: Item) => React.ReactNode;
}) {
  const active = items.some((it) => isActive(pathname, it.href, it.exact));
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (active) {
      setOpen(true);
      return;
    }
    const saved = localStorage.getItem(storageKey);
    if (saved !== null) setOpen(saved === "1");
  }, [active, storageKey]);

  const toggle = () =>
    setOpen((o) => {
      localStorage.setItem(storageKey, o ? "0" : "1");
      return !o;
    });

  if (items.length === 0) return null;

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-3 pb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400 transition-colors hover:text-slatey"
      >
        <span>{title}</span>
        <Icon name="chevron" className={`h-4 w-4 transition-transform duration-200 ${open ? "" : "-rotate-90"}`} />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-200 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="flex flex-col gap-1 overflow-hidden">{items.map(renderItem)}</div>
      </div>
    </div>
  );
}
