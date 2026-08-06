import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendLeadEmail, leadRecipients, LEAD_REPLY_TO } from "@/lib/email";
import { enquiryTeamEmail, enquiryConfirmationEmail } from "@/lib/leadEmails";
import {
  guardSubmission,
  rateLimit,
  RATE_LIMITED_MESSAGE,
  TOKEN_EXPIRED_MESSAGE,
  BLOCKED_LEAD_SOURCE,
} from "@/lib/antispam";

// prisma + the Resend SDK need the Node.js runtime (not the Edge runtime).
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = (data.name || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const company = (data.company || "").toString().trim();
    const vertical = (data.vertical || "").toString().trim();
    const budget = (data.budget || "").toString().trim();
    const message = (data.message || "").toString().trim();
    // The form tells us which tree it was submitted from. Allow-listed rather
    // than trusted, so a crafted payload cannot write arbitrary text here.
    const source = data.source === "contact-form-in" ? "contact-form-in" : "contact-form";

    // Shape first, so a visitor who forgot a field gets a straight answer and
    // still has an unspent token to retry with.
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Add your name, email and a short message so we can reach you." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // Spam gate. It runs before the mailer so a bot can never make us send —
    // not to the team, and not to the harvested address it puts in the payload.
    const verdict = guardSubmission(req, {
      scope: "contact",
      token: data.formToken,
      honeypot: data.website,
      content: { name, company, message },
    });
    if (!verdict.ok) {
      console.warn(`Contact submission blocked (${verdict.reason})`);

      if (verdict.action === "rate-limited") {
        return NextResponse.json({ error: RATE_LIMITED_MESSAGE }, { status: 429 });
      }
      if (verdict.action === "retry") {
        return NextResponse.json({ error: TOKEN_EXPIRED_MESSAGE }, { status: 400 });
      }

      // Nothing about the words looked automated, so this may be a real person
      // our own plumbing failed. Keep it out of the inbox but hold it in the
      // admin's review queue rather than losing the enquiry. The cap keeps a
      // bot that learns to write proper sentences from filling that queue:
      // beyond it we're plainly under attack, not losing the odd lead.
      if (verdict.couldBeHuman && rateLimit("contact:hold", 20, 60 * 60 * 1000)) {
        try {
          await prisma.lead.create({
            data: {
              name,
              email,
              company: company || null,
              vertical: vertical || null,
              budget: budget || null,
              message,
              source: BLOCKED_LEAD_SOURCE,
              status: "LOST",
              notes: `Held by the spam filter: ${verdict.reason}`,
            },
          });
        } catch (e) {
          console.error("Held lead store failed:", e);
        }
      }

      // Answer as if it worked: a bot that sees an error just tunes around it.
      return NextResponse.json({ ok: true });
    }

    // 1) Store the lead first: mail is best effort, the record is not.
    let stored = false;
    try {
      await prisma.lead.create({
        data: {
          name,
          email,
          company: company || null,
          vertical: vertical || null,
          budget: budget || null,
          message,
          source,
        },
      });
      stored = true;
    } catch (e) {
      console.error("Lead store failed:", e);
    }

    const enquiry = { name, email, company, vertical, budget, message };

    // 2) Tell the team. replyTo is the prospect, so hitting Reply reaches them.
    const teamMail = enquiryTeamEmail(enquiry);
    const team = await sendLeadEmail({
      to: leadRecipients(),
      subject: teamMail.subject,
      innerHtml: teamMail.innerHtml,
      preheader: teamMail.preheader,
      replyTo: email,
    });
    if (!team.sent && !team.skipped) console.error("Lead team mail failed:", team.error);

    // 3) Confirm to the person who booked, so they are not left wondering.
    const confirmMail = enquiryConfirmationEmail(enquiry);
    const confirm = await sendLeadEmail({
      to: email,
      subject: confirmMail.subject,
      innerHtml: confirmMail.innerHtml,
      preheader: confirmMail.preheader,
      replyTo: LEAD_REPLY_TO,
    });
    if (!confirm.sent && !confirm.skipped) console.error("Lead confirmation failed:", confirm.error);

    // Only a total failure is worth showing the visitor: if the lead is stored
    // the team can still act on it, and if mail went out we have their details.
    if (!stored && !team.sent) {
      return NextResponse.json(
        {
          error:
            "Something went wrong on our end. Please try again, or email us directly at info@mntfuture.com.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Something went wrong on our end. Please try again, or email us directly at info@mntfuture.com.",
      },
      { status: 500 }
    );
  }
}
