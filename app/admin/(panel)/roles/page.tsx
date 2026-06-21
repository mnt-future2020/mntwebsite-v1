import { PageHeader } from "@/components/admin/ui";
import RolesMatrix from "@/components/admin/RolesMatrix";
import { listRoles } from "@/lib/permissions-db";

export const dynamic = "force-dynamic";

export default async function RolesPage() {
  const roles = await listRoles();
  return (
    <>
      <PageHeader
        title="Roles &amp; access"
        subtitle="Create roles and choose exactly which sections each one can open. Admin always has full access."
      />
      <RolesMatrix initial={roles} />
    </>
  );
}
