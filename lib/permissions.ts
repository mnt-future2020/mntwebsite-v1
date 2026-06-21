// Pure permission constants & helpers — NO prisma import here, so this file is
// safe to use in middleware (edge) and client components. DB lookups live in
// lib/permissions-db.ts.

export type Section = { key: string; label: string; path: string; group: "Workspace" | "Projects" | "CRM" | "Human resources" };

export const SECTIONS: Section[] = [
  // Workspace
  { key: "dashboard", label: "Dashboard", path: "/admin", group: "Workspace" },
  { key: "posts", label: "Blog posts", path: "/admin/posts", group: "Workspace" },
  { key: "leads", label: "Leads", path: "/admin/leads", group: "Workspace" },
  { key: "subscribers", label: "Subscribers", path: "/admin/subscribers", group: "Workspace" },
  { key: "campaigns", label: "Campaigns", path: "/admin/campaigns", group: "Workspace" },
  { key: "seo", label: "SEO", path: "/admin/seo", group: "Workspace" },
  { key: "settings", label: "Site settings", path: "/admin/settings", group: "Workspace" },
  { key: "roles", label: "Roles & access", path: "/admin/roles", group: "Workspace" },
  // Projects
  { key: "projects", label: "Projects & delivery", path: "/admin/projects", group: "Projects" },
  { key: "projects.clients", label: "Clients", path: "/admin/projects/clients", group: "Projects" },
  { key: "projects.billing", label: "Invoices & billing", path: "/admin/projects/invoices", group: "Projects" },
  // CRM
  { key: "crm", label: "CRM — pipeline, contacts, companies", path: "/admin/crm", group: "CRM" },
  // Human resources
  { key: "hr.overview", label: "HR overview", path: "/admin/hr", group: "Human resources" },
  { key: "hr.employees", label: "Employees", path: "/admin/hr/employees", group: "Human resources" },
  { key: "hr.attendance", label: "Attendance", path: "/admin/hr/attendance", group: "Human resources" },
  { key: "hr.leave", label: "Leave", path: "/admin/hr/leave", group: "Human resources" },
  { key: "hr.payroll", label: "Payroll", path: "/admin/hr/payroll", group: "Human resources" },
  { key: "hr.performance", label: "Performance", path: "/admin/hr/performance", group: "Human resources" },
  { key: "hr.departments", label: "Departments", path: "/admin/hr/departments", group: "Human resources" },
  { key: "hr.settings", label: "Attendance QR", path: "/admin/hr/settings", group: "Human resources" },
];

export const ALL_KEYS = SECTIONS.map((s) => s.key);

// Built-in roles. ADMIN is always all-access and not editable; the rest ship with
// sensible defaults (below) and stay editable. Custom roles are created at runtime
// and live in the RoleAccess table — these four can never be renamed or deleted.
export const SYSTEM_ROLES: { key: string; label: string }[] = [
  { key: "ADMIN", label: "Admin" },
  { key: "HR", label: "HR" },
  { key: "MANAGER", label: "Manager" },
  { key: "EMPLOYEE", label: "Employee" },
];
export const SYSTEM_ROLE_KEYS = SYSTEM_ROLES.map((r) => r.key);

export function isSystemRole(key: string): boolean {
  return SYSTEM_ROLE_KEYS.includes(key);
}

// Derive a stable role key from a free-text name (no deps → safe everywhere).
export function roleKeyFromLabel(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export const DEFAULT_PERMS: Record<string, string[]> = {
  ADMIN: ALL_KEYS,
  HR: [
    "dashboard",
    "hr.overview",
    "hr.employees",
    "hr.attendance",
    "hr.leave",
    "hr.payroll",
    "hr.performance",
    "hr.departments",
    "hr.settings",
  ],
  MANAGER: ["hr.attendance", "hr.leave"],
  EMPLOYEE: [],
};

export function hasAdminAccess(perms: string[]): boolean {
  return perms.length > 0;
}

export function hasPerm(perms: string[], key: string): boolean {
  return perms.includes(key);
}

// Map a request pathname to the section key it requires. null = no specific
// section (treat as "needs any admin access").
const PREFIX_KEYS: [string, string][] = [
  // API routes (checked alongside page routes; longest prefix wins).
  ["/api/admin/hr/employees", "hr.employees"],
  ["/api/admin/hr/attendance", "hr.attendance"],
  ["/api/admin/hr/leave", "hr.leave"],
  ["/api/admin/hr/payroll", "hr.payroll"],
  ["/api/admin/hr/performance", "hr.performance"],
  ["/api/admin/hr/departments", "hr.departments"],
  ["/api/admin/hr/org", "hr.settings"],
  ["/api/admin/hr", "hr.overview"],
  ["/api/admin/posts", "posts"],
  ["/api/admin/leads", "leads"],
  ["/api/admin/subscribers", "subscribers"],
  ["/api/admin/campaigns", "campaigns"],
  ["/api/admin/seo", "seo"],
  ["/api/admin/settings", "settings"],
  ["/api/admin/roles", "roles"],
  ["/api/admin/projects/clients", "projects.clients"],
  ["/api/admin/projects/invoices", "projects.billing"],
  ["/api/admin/projects", "projects"],
  ["/api/admin/crm", "crm"],
  // Page routes.
  ["/admin/hr/employees", "hr.employees"],
  ["/admin/hr/attendance", "hr.attendance"],
  ["/admin/hr/leave", "hr.leave"],
  ["/admin/hr/payroll", "hr.payroll"],
  ["/admin/hr/performance", "hr.performance"],
  ["/admin/hr/departments", "hr.departments"],
  ["/admin/hr/settings", "hr.settings"],
  ["/admin/hr", "hr.overview"],
  ["/admin/posts", "posts"],
  ["/admin/leads", "leads"],
  ["/admin/subscribers", "subscribers"],
  ["/admin/campaigns", "campaigns"],
  ["/admin/seo", "seo"],
  ["/admin/settings", "settings"],
  ["/admin/roles", "roles"],
  ["/admin/projects/clients", "projects.clients"],
  ["/admin/projects/invoices", "projects.billing"],
  ["/admin/projects", "projects"],
  ["/admin/crm", "crm"],
  ["/admin", "dashboard"],
].sort((a, b) => b[0].length - a[0].length);

export function keyForPath(pathname: string): string | null {
  for (const [prefix, key] of PREFIX_KEYS) {
    if (pathname === prefix || pathname.startsWith(prefix + "/")) return key;
  }
  return null;
}

// First admin path this set of perms can open (for post-login landing / redirects).
export function firstAllowedPath(perms: string[]): string | null {
  for (const s of SECTIONS) {
    if (perms.includes(s.key)) return s.path;
  }
  return null;
}
