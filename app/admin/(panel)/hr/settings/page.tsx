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
        title="HR settings"
        subtitle="Office geofence &amp; attendance QR, plus the salary auto-breakdown percentages."
      />
      <OrgSettingsForm initial={settings} baseUrl={baseUrl} />
    </>
  );
}
