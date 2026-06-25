import AdminNav from "@/components/admin/AdminNav";
import PanelShell from "@/components/admin/PanelShell";
import { Toaster } from "@/components/admin/Toast";
import { getSession } from "@/lib/auth";
import { getRolePerms } from "@/lib/permissions-db";

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession().catch(() => null);
  // Same unified sidebar as the admin shell: base "My workspace" for every
  // employee, plus whatever admin sections their role grants.
  const perms = session ? await getRolePerms(session.role) : [];

  return (
    <>
      <PanelShell
        subtitle="My workspace"
        mainClassName="bg-slate-50/50 p-6 sm:p-8"
        contentClassName="mx-auto max-w-4xl"
        nav={<AdminNav email={session?.email} perms={perms} isEmployee={session?.sub !== "admin"} />}
      >
        {children}
      </PanelShell>
      <Toaster />
    </>
  );
}
