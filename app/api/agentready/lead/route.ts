import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendLeadEmail, leadRecipients, LEAD_REPLY_TO } from "@/lib/email";
import { scanTeamEmail, scanConfirmationEmail } from "@/lib/leadEmails";
import { guardSubmission, RATE_LIMITED_MESSAGE, TOKEN_EXPIRED_MESSAGE } from "@/lib/antispam";

// prisma + the Resend SDK need the Node.js runtime.
export const runtime = "nodejs";

/** Fix-plan requests from the /agentready scanner — stored as CRM leads (24h follow-up SLA). */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const email = String(data.email ?? "").trim();
    const storeUrl = String(data.storeUrl ?? "").trim();
    const grade = String(data.grade ?? "").trim();
    const score = Number(data.score ?? 0);

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // This endpoint mails the address it is given, so it gets the same gate as
    // the enquiry form (see lib/antispam.ts).
    const verdict = guardSubmission(req, {
      scope: "agentready-lead",
      token: data.formToken,
      honeypot: data.website,
      content: { company: storeUrl },
    });
    if (!verdict.ok) {
      console.warn(`Scan lead blocked (${verdict.reason})`);
      if (verdict.action === "rate-limited") {
        return NextResponse.json({ error: RATE_LIMITED_MESSAGE }, { status: 429 });
      }
      if (verdict.action === "retry") {
        return NextResponse.json({ error: TOKEN_EXPIRED_MESSAGE }, { status: 400 });
      }
      return NextResponse.json({ ok: true });
    }

    const message = `agentready scan: ${storeUrl} scored ${grade} (${score}/100). Requested the engineer fix plan.`;

    try {
      await prisma.lead.create({
        data: {
          name: email.split("@")[0] || "Scan lead",
          email,
          company: storeUrl || null,
          vertical: "Agent-Ready Commerce",
          message,
          source: "agentready-scanner",
        },
      });
    } catch (e) {
      console.error("Scan lead store failed:", e);
    }

    const scan = { email, storeUrl, grade, score };

    const teamMail = scanTeamEmail(scan);
    const team = await sendLeadEmail({
      to: leadRecipients(),
      subject: teamMail.subject,
      innerHtml: teamMail.innerHtml,
      preheader: teamMail.preheader,
      replyTo: email,
    });
    if (!team.sent && !team.skipped) console.error("Scan lead mail failed:", team.error);

    const confirmMail = scanConfirmationEmail(scan);
    const confirm = await sendLeadEmail({
      to: email,
      subject: confirmMail.subject,
      innerHtml: confirmMail.innerHtml,
      preheader: confirmMail.preheader,
      replyTo: LEAD_REPLY_TO,
    });
    if (!confirm.sent && !confirm.skipped) console.error("Scan confirmation failed:", confirm.error);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
