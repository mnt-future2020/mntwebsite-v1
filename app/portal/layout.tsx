import Logo from "@/components/Logo";
import AdminNav from "@/components/admin/AdminNav";
import { Toaster } from "@/components/admin/Toast";
import { getSession } from "@/lib/auth";
import { getRolePerms } from "@/lib/permissions-db";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession().catch(() => null);
  // Same unified sidebar as the admin shell: base "My workspace" for every
  // employee, plus whatever admin sections their role grants.
  const perms = session ? await getRolePerms(session.role) : [];

  return (
    <div className="lg:grid lg:min-h-screen lg:grid-cols-[260px_1fr]">
      <aside className="flex flex-col gap-6 border-b border-slate-200 bg-white p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
        <div className="px-1 pt-1">
          <Logo />
          <p className="mt-2 px-0 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-700">
            My workspace
          </p>
        </div>
        <div className="flex-1">
          <AdminNav email={session?.email} perms={perms} isEmployee={session?.sub !== "admin"} />
        </div>
      </aside>

      <main className="bg-slate-50/50 p-6 sm:p-8">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
