import { Resend } from "resend";
import { site } from "@/lib/site";

// Resend client — only created when an API key is present. Without a key the
// app still works end-to-end (subscribers save, admin loads); sending is a
// no-op that reports back as "skipped" so the UI can tell the user.
const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

export const FROM = process.env.NEWSLETTER_FROM || `MnT <onboarding@resend.dev>`;
// Subscriber replies are routed here — should be a real, monitored mailbox.
export const REPLY_TO = process.env.NEWSLETTER_REPLY_TO || `info@${site.domain}`;

export function emailReady(): boolean {
  return !!resend;
}

// Base URL for confirm/unsubscribe links inside emails.
export function appBaseUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/$/, "");
}

export function confirmUrl(token: string): string {
  return `${appBaseUrl()}/newsletter/confirm?token=${token}`;
}

export function unsubscribeUrl(token: string): string {
  return `${appBaseUrl()}/newsletter/unsubscribe?token=${token}`;
}

// ─── Branded HTML shell ─────────────────────────────────────────────────────
// Wraps campaign/confirmation content in a simple, email-client-safe layout
// (inline styles, table-free body) with a footer. The unsubscribe line is
// legally required on marketing email (CAN-SPAM / GDPR).
export function wrapEmail(
  innerHtml: string,
  opts: { preheader?: string; unsubscribeUrl?: string } = {}
): string {
  const pre = opts.preheader
    ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0">${opts.preheader}</div>`
    : "";
  const footer = `
    <div style="margin-top:32px;padding-top:20px;border-top:1px solid #e2e8f0;font-size:12px;line-height:1.6;color:#94a3b8">
      <p style="margin:0">${site.legalName} · ${site.tagline}</p>
      ${
        opts.unsubscribeUrl
          ? `<p style="margin:8px 0 0">You're receiving this because you subscribed at ${site.domain}.
             <a href="${opts.unsubscribeUrl}" style="color:#64748b;text-decoration:underline">Unsubscribe</a>.</p>`
          : ""
      }
    </div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
  <body style="margin:0;background:#f4f8fd;padding:24px">
    ${pre}
    <div style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:16px;padding:32px;font-family:Arial,Helvetica,sans-serif;color:#0E1B2E">
      <div style="font-size:20px;font-weight:800;color:#0E66C2;margin-bottom:24px">MnT</div>
      <div style="font-size:15px;line-height:1.7">${innerHtml}</div>
      ${footer}
    </div>
  </body></html>`;
}

// ─── Internal transactional email ───────────────────────────────────────────
// For staff-facing notifications (e.g. the daily follow-up digest to a rep).
export async function sendInternal(
  to: string,
  subject: string,
  innerHtml: string
): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  if (!resend) return { sent: false, skipped: true };
  try {
    const { error } = await resend.emails.send({ from: FROM, to, replyTo: REPLY_TO, subject, html: wrapEmail(innerHtml) });
    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (e) {
    return { sent: false, error: e instanceof Error ? e.message : "send failed" };
  }
}

// ─── Double opt-in confirmation ─────────────────────────────────────────────
export async function sendConfirmation(
  to: string,
  token: string
): Promise<{ sent: boolean; skipped?: boolean; error?: string }> {
  if (!resend) return { sent: false, skipped: true };
  const url = confirmUrl(token);
  const html = wrapEmail(
    `<h1 style="font-size:20px;margin:0 0 12px">Confirm your subscription</h1>
     <p style="margin:0 0 20px">Tap the button below to confirm you'd like updates from MnT on healthcare &amp; e-commerce software. If this wasn't you, just ignore this email.</p>
     <p style="margin:0 0 24px">
       <a href="${url}" style="display:inline-block;background:#0E66C2;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600">Confirm subscription</a>
     </p>
     <p style="margin:0;font-size:13px;color:#64748b">Or paste this link: <br><a href="${url}" style="color:#0E66C2">${url}</a></p>`,
    { preheader: "Confirm your MnT newsletter subscription" }
  );
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to,
      replyTo: REPLY_TO,
      subject: "Confirm your MnT subscription",
      html,
    });
    if (error) return { sent: false, error: error.message };
    return { sent: true };
  } catch (e) {
    return { sent: false, error: e instanceof Error ? e.message : "send failed" };
  }
}

// ─── Campaign blast ─────────────────────────────────────────────────────────
// Resend's batch endpoint accepts up to 100 messages per call; we chunk the
// audience and personalise each message's unsubscribe link.
type Recipient = { email: string; token: string };

export async function sendCampaign(
  campaign: { subject: string; contentHtml: string; preheader?: string | null },
  recipients: Recipient[]
): Promise<{ sent: number; failed: number; skipped?: boolean; error?: string }> {
  if (!resend) return { sent: 0, failed: recipients.length, skipped: true };
  if (recipients.length === 0) return { sent: 0, failed: 0 };

  let sent = 0;
  let failed = 0;
  let firstError: string | undefined;

  const chunkSize = 100;
  for (let i = 0; i < recipients.length; i += chunkSize) {
    const chunk = recipients.slice(i, i + chunkSize);
    const messages = chunk.map((r) => ({
      from: FROM,
      to: r.email,
      replyTo: REPLY_TO,
      subject: campaign.subject,
      html: wrapEmail(campaign.contentHtml, {
        preheader: campaign.preheader || undefined,
        unsubscribeUrl: unsubscribeUrl(r.token),
      }),
      headers: {
        "List-Unsubscribe": `<${unsubscribeUrl(r.token)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    }));
    try {
      const { error } = await resend.batch.send(messages);
      if (error) {
        failed += chunk.length;
        firstError ??= error.message;
      } else {
        sent += chunk.length;
      }
    } catch (e) {
      failed += chunk.length;
      firstError ??= e instanceof Error ? e.message : "batch send failed";
    }
  }

  return { sent, failed, error: firstError };
}

// ─── Opt-in invite (re-permission) ──────────────────────────────────────────
// For imported contacts: a one-time "would you like our newsletter?" email.
// Only those who click confirm become SUBSCRIBED — keeps the list consented.
export async function sendInvites(
  recipients: Recipient[]
): Promise<{ sent: number; failed: number; skipped?: boolean; error?: string }> {
  if (!resend) return { sent: 0, failed: recipients.length, skipped: true };
  if (recipients.length === 0) return { sent: 0, failed: 0 };

  let sent = 0;
  let failed = 0;
  let firstError: string | undefined;

  const chunkSize = 100;
  for (let i = 0; i < recipients.length; i += chunkSize) {
    const chunk = recipients.slice(i, i + chunkSize);
    const messages = chunk.map((r) => {
      const cUrl = confirmUrl(r.token);
      const inner = `<h1 style="font-size:20px;margin:0 0 12px">Would you like updates from MnT?</h1>
        <p style="margin:0 0 16px">You're receiving this because you're a contact of MnT. If you'd like occasional, practical notes on healthcare &amp; e-commerce engineering, confirm below. If not, just ignore this email — you won't hear from us again.</p>
        <p style="margin:0 0 24px"><a href="${cUrl}" style="display:inline-block;background:#0E66C2;color:#fff;text-decoration:none;padding:12px 22px;border-radius:10px;font-weight:600">Yes, subscribe me</a></p>
        <p style="margin:0;font-size:13px;color:#64748b">Or paste this link:<br><a href="${cUrl}" style="color:#0E66C2">${cUrl}</a></p>`;
      return {
        from: FROM,
        to: r.email,
        replyTo: REPLY_TO,
        subject: "Would you like updates from MnT?",
        html: wrapEmail(inner, {
          preheader: "Confirm to join the MnT newsletter",
          unsubscribeUrl: unsubscribeUrl(r.token),
        }),
        headers: {
          "List-Unsubscribe": `<${unsubscribeUrl(r.token)}>`,
          "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
        },
      };
    });
    try {
      const { error } = await resend.batch.send(messages);
      if (error) {
        failed += chunk.length;
        firstError ??= error.message;
      } else {
        sent += chunk.length;
      }
    } catch (e) {
      failed += chunk.length;
      firstError ??= e instanceof Error ? e.message : "batch send failed";
    }
  }

  return { sent, failed, error: firstError };
}
