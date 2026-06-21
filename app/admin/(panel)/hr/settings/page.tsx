import { PageHeader } from "@/components/admin/ui";
import OrgSettingsForm from "@/components/admin/hr/OrgSettingsForm";
import { getOrgSettings } from "@/lib/org";

export const dynamic = "force-dynamic";

export default async function HrSettingsPage() {
  const settings = await getOrgSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  return (
    <>
      <PageHeader
        title="Attendance &amp; geofence"
        subtitle="Lock the office GPS point and print the QR employees scan to punch in/out."
      />
      <OrgSettingsForm initial={settings} baseUrl={baseUrl} />
    </>
  );
}
