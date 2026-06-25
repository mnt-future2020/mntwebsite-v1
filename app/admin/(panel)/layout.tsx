import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Logo from "@/components/Logo";
import AdminNav from "@/components/admin/AdminNav";
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
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-6 border-b border-slate-200 bg-white p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="px-1 pt-1">
          <Logo />
          <p className="mt-2 px-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            Admin
          </p>
        </div>
        <div className="flex-1">
          <AdminNav email={session?.email} perms={perms} isEmployee={session.sub !== "admin"} />
        </div>
      </aside>

      <main className="p-6 sm:p-8">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
