import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import CampaignForm from "@/components/admin/CampaignForm";
import { emailReady } from "@/lib/email";

export const dynamic = "force-dynamic";

export default async function NewCampaignPage() {
  const subscribedCount = await prisma.subscriber
    .count({ where: { status: "SUBSCRIBED" } })
    .catch(() => 0);

  return (
    <>
      <PageHeader title="New campaign" subtitle="Compose a newsletter and send it to your subscribers." />
      <CampaignForm subscribedCount={subscribedCount} emailReady={emailReady()} />
    </>
  );
}
