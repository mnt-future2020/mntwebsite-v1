import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { PageHeader } from "@/components/admin/ui";
import CampaignForm from "@/components/admin/CampaignForm";
import { emailReady } from "@/lib/email";

export const dynamic = "force-dynamic";

export default async function EditCampaignPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [campaign, subscribedCount] = await Promise.all([
    prisma.campaign.findUnique({ where: { id: params.id } }).catch(() => null),
    prisma.subscriber.count({ where: { status: "SUBSCRIBED" } }).catch(() => 0),
  ]);

  if (!campaign) notFound();

  return (
    <>
      <PageHeader
        title={campaign.status === "SENT" ? "Campaign" : "Edit campaign"}
        subtitle={campaign.status === "SENT" ? "This campaign has already been sent." : "Make your edits, then send."}
      />
      <CampaignForm
        subscribedCount={subscribedCount}
        emailReady={emailReady()}
        initial={{
          id: campaign.id,
          subject: campaign.subject,
          preheader: campaign.preheader ?? "",
          contentHtml: campaign.contentHtml,
          status: campaign.status,
          recipients: campaign.recipients,
          sentCount: campaign.sentCount,
          sentAt: campaign.sentAt ? campaign.sentAt.toISOString() : null,
        }}
      />
    </>
  );
}
