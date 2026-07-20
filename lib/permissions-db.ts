import { prisma } from "@/lib/db";
import {
  DEFAULT_PERMS,
  ALL_KEYS,
  SYSTEM_ROLES,
  SYSTEM_ROLE_KEYS,
} from "@/lib/permissions";

export type RoleRecord = {
  key: string;
  label: string;
  perms: string[];
  isSystem: boolean;
  editable: boolean; // ADMIN is never editable; everything else is
};

// Live perms for a role: ADMIN is always all-access; others read from RoleAccess
// (falling back to system defaults when no row / no DB).
export async function getRolePerms(role: string): Promise<string[]> {
  if (role === "ADMIN") return ALL_KEYS;
  try {
    const row = await prisma.roleAccess.findUnique({ where: { role } });
    if (row) return row.perms;
  } catch {
    /* DB optional */
  }
  return DEFAULT_PERMS[role] || [];
}

// Every role in the system: built-in roles (always present, even without a DB
// row) merged with any custom roles stored in RoleAccess. Used by the roles
// matrix and the employee role picker.
export async function listRoles(): Promise<RoleRecord[]> {
  const byKey: Record<string, RoleRecord> = {};

  // 1) Seed the built-in roles from constants so they always show up.
  for (const sr of SYSTEM_ROLES) {
    byKey[sr.key] = {
      key: sr.key,
      label: sr.label,
      perms: sr.key === "ADMIN" ? ALL_KEYS : DEFAULT_PERMS[sr.key] || [],
      isSystem: true,
      editable: sr.key !== "ADMIN",
    };
  }

  // 2) Overlay stored rows (edited system roles + all custom roles).
  try {
    const rows = await prisma.roleAccess.findMany({ orderBy: { role: "asc" } });
    for (const r of rows) {
      if (r.role === "ADMIN") continue; // admin perms are always computed, never stored
      const sys = SYSTEM_ROLE_KEYS.includes(r.role);
      byKey[r.role] = {
        key: r.role,
        label: r.label || byKey[r.role]?.label || r.role,
        perms: r.perms,
        isSystem: sys,
        editable: true,
      };
    }
  } catch {
    /* DB optional: return the built-in roles only */
  }

  // System roles first (canonical order), then custom roles alphabetically.
  const rank = (k: string) => {
    const i = SYSTEM_ROLE_KEYS.indexOf(k);
    return i === -1 ? 100 : i;
  };
  return Object.values(byKey).sort(
    (a, b) => rank(a.key) - rank(b.key) || a.label.localeCompare(b.label)
  );
}
