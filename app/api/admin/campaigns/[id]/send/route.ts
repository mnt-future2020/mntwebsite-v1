import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendCampaign, emailReady } from "@/lib/email";

export const runtime = "nodejs";
// Sending a large list can take a while — give it room.
export const maxDuration = 60;

export async function POST(_req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const campaign = await prisma.campaign.findUnique({ where: { id: params.id } });
    if (!campaign) return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
    if (campaign.status === "SENT") {
      return NextResponse.json({ error: "This campaign has already been sent." }, { status: 400 });
    }
    if (campaign.status === "SENDING") {
      return NextResponse.json({ error: "This campaign is already sending." }, { status: 400 });
    }
    if (!campaign.subject.trim() || !campaign.contentHtml.trim()) {
      return NextResponse.json({ error: "Add a subject and some content first." }, { status: 400 });
    }

    if (!emailReady()) {
      return NextResponse.json(
        { error: "Email sending isn't configured. Add RESEND_API_KEY to .env to send campaigns." },
        { status: 400 }
      );
    }

    const recipients = await prisma.subscriber.findMany({
      where: { status: "SUBSCRIBED" },
      select: { email: true, token: true },
    });

    if (recipients.length === 0) {
      return NextResponse.json({ error: "No confirmed subscribers to send to yet." }, { status: 400 });
    }

    // Mark as sending so concurrent clicks can't double-send.
    await prisma.campaign.update({ where: { id: campaign.id }, data: { status: "SENDING" } });

    const result = await sendCampaign(
      { subject: campaign.subject, contentHtml: campaign.contentHtml, preheader: campaign.preheader },
      recipients
    );

    // Every batch failed — nothing went out. Reset to DRAFT so the admin can fix
    // the issue (e.g. unverified domain, rate limit) and retry, rather than
    // locking the campaign as "SENT" having reached nobody.
    if (result.sent === 0) {
      await prisma.campaign.update({ where: { id: campaign.id }, data: { status: "DRAFT" } });
      return NextResponse.json(
        { error: result.error || "No emails could be sent. The campaign was reset to draft." },
        { status: 502 }
      );
    }

    await prisma.campaign.update({
      where: { id: campaign.id },
      data: {
        status: "SENT",
        recipients: recipients.length,
        sentCount: result.sent,
        sentAt: new Date(),
      },
    });

    return NextResponse.json({
      ok: true,
      sent: result.sent,
      failed: result.failed,
      recipients: recipients.length,
      error: result.error,
    });
  } catch (e) {
    // Roll back to DRAFT so the admin can retry.
    await prisma.campaign.update({ where: { id: params.id }, data: { status: "DRAFT" } }).catch(() => {});
    console.error("Campaign send failed:", e);
    return NextResponse.json({ error: "Send failed. The campaign was reset to draft." }, { status: 500 });
  }
}
