import { PageHeader } from "@/components/admin/ui";
import OrgSettingsForm from "@/components/admin/hr/OrgSettingsForm";
import { getOrgSettings } from "@/lib/org";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HrSettingsPage() {
  const settings = await getOrgSettings();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  // Spaces config for the form — the secret is never sent to the client, only a
  // flag saying whether one is set.
  let spaces = { region: "", bucket: "", key: "", endpoint: "", secretSet: false };
  try {
    const row = await prisma.orgSetting.findUnique({
      where: { id: 1 },
      select: { spacesRegion: true, spacesBucket: true, spacesKey: true, spacesEndpoint: true, spacesSecret: true },
    });
    if (row)
      spaces = {
        region: row.spacesRegion || "",
        bucket: row.spacesBucket || "",
        key: row.spacesKey || "",
        endpoint: row.spacesEndpoint || "",
        secretSet: !!row.spacesSecret,
      };
  } catch {
    /* DB optional */
  }

  return (
    <>
      <PageHeader
        title="HR settings"
        subtitle="Office geofence &amp; attendance QR, salary breakdown, and screenshot storage."
      />
      <OrgSettingsForm initial={settings} baseUrl={baseUrl} spaces={spaces} />
    </>
  );
}
