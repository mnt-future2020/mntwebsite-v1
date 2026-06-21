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
  return (
    <>
      <PageHeader title="Settings" subtitle="Global site name, defaults, analytics and verification." />
      <SettingsForm initial={(s as Record<string, string | null>) || {}} />
    </>
  );
}
