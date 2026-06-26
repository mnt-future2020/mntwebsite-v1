import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

async function getSettings() {
  try {
    return await prisma.siteSetting.findUnique({ where: { id: 1 } });
  } catch {
    return null;
  }
}

export default async function SettingsPage() {
  const s = await getSettings();
  // Build the form's initial data WITHOUT the storage secret — only a flag saying
  // whether one is set.
  const initial = s
    ? {
        siteName: s.siteName,
        titleTemplate: s.titleTemplate,
        defaultDescription: s.defaultDescription,
        defaultOgImage: s.defaultOgImage,
        gaMeasurementId: s.gaMeasurementId,
        gscVerification: s.gscVerification,
        bingVerification: s.bingVerification,
        robotsExtra: s.robotsExtra,
        spacesRegion: s.spacesRegion,
        spacesBucket: s.spacesBucket,
        spacesKey: s.spacesKey,
        spacesEndpoint: s.spacesEndpoint,
        spacesSecretSet: !!s.spacesSecret,
      }
    : {};
  return (
    <>
      <PageHeader title="Settings" subtitle="Site defaults, analytics, verification, and object storage." />
      <SettingsForm initial={initial} />
    </>
  );
}
