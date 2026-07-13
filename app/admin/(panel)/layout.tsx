import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminNav from "@/components/admin/AdminNav";
import PanelShell from "@/components/admin/PanelShell";
import CommandPalette from "@/components/admin/CommandPalette";
import { Toaster } from "@/components/admin/Toast";
import { getSession } from "@/lib/auth";
import { getRolePerms } from "@/lib/permissions-db";
import { hasAdminAccess, keyForPath, firstAllowedPath } from "@/lib/permissions";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession().catch(() => null);
  // Fail closed: never render the admin shell without a verified session (the
  // edge middleware is the primary gate; this is defense-in-depth).
  if (!session) redirect("/admin/login");

  // Live permission check (catches changes before the JWT expires).
  const perms = await getRolePerms(session.role);
  if (!hasAdminAccess(perms)) redirect("/portal");
  const pathname = (await headers()).get("x-pathname") || "/admin";
  const required = keyForPath(pathname);
  if (required && !perms.includes(required)) {
    redirect(firstAllowedPath(perms) || "/portal");
  }

  return (
    <>
      <PanelShell
        subtitle="Admin"
        nav={<AdminNav email={session?.email} perms={perms} isEmployee={session.sub !== "admin"} />}
      >
        {children}
      </PanelShell>
      <Toaster />
      <CommandPalette />
    </>
  );
}
