import { appBaseUrl } from "@/lib/email";

// Email bodies for the two enquiry paths (contact form, agentready scanner).
// Kept out of the route handlers so the copy can be previewed and reviewed
// without submitting a form, and so both routes stay thin.

export function escapeHtml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// The contact form has no Lead column for "where are you today", so it carries
// the answer as a labelled first line of the message. Split it back out so the
// notification reads as fields rather than prose.
export function splitStage(message: string): { stage: string | null; body: string } {
  const m = message.match(/^Where they are today:\s*(.+?)\n\n([\s\S]*)$/);
  return m ? { stage: m[1].trim(), body: m[2].trim() } : { stage: null, body: message };
}

function detailRows(rows: [string, string][]) {
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">
    ${rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 12px 6px 0;color:#64748b;width:150px;vertical-align:top">${k}</td>` +
          `<td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`
      )
      .join("")}
  </table>`;
}

function quoted(text: string) {
  return `<div style="padding:14px;background:#F4F8FD;border-radius:10px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(
    text
  )}</div>`;
}

function adminButton() {
  return `<p style="margin:22px 0 0">
    <a href="${appBaseUrl()}/admin/leads" style="display:inline-block;background:#0E66C2;color:#fff;text-decoration:none;padding:11px 20px;border-radius:10px;font-weight:600;font-size:14px">Open in admin</a>
  </p>`;
}

export type BuiltEmail = { subject: string; innerHtml: string; preheader: string };

// ─── Contact form / strategy session ────────────────────────────────────────

export type Enquiry = {
  name: string;
  email: string;
  company?: string;
  vertical?: string;
  budget?: string;
  message: string;
};

export function enquiryTeamEmail(e: Enquiry): BuiltEmail {
  const { stage, body } = splitStage(e.message);
  const firstName = e.name.split(/\s+/)[0] || e.name;
  const need = e.vertical || "General enquiry";
  return {
    subject: `New strategy session: ${need} · ${e.name}${e.company ? ` (${e.company})` : ""}`,
    preheader: [need, stage, e.budget].filter(Boolean).join(" · "),
    innerHtml: `
      <h1 style="font-size:20px;margin:0 0 6px">New strategy session request</h1>
      <p style="margin:0 0 20px;color:#64748b;font-size:14px">Reply to this email to answer ${escapeHtml(
        firstName
      )} directly.</p>
      ${detailRows([
        ["Name", e.name],
        ["Email", e.email],
        ["Company / store", e.company || "Not given"],
        ["What they need", need],
        ["Where they are today", stage || "Not given"],
        ["Indicative budget", e.budget || "Not given"],
      ])}
      <p style="margin:22px 0 6px;color:#64748b;font-size:14px">What they wrote</p>
      ${quoted(body)}
      ${adminButton()}`,
  };
}

export function enquiryConfirmationEmail(e: Enquiry): BuiltEmail {
  const { stage, body } = splitStage(e.message);
  const firstName = e.name.split(/\s+/)[0] || e.name;
  const need = e.vertical || "General enquiry";
  return {
    subject: "Your MnT Future strategy session: what happens next",
    preheader: "A senior consultant will reply within one business day to find a time.",
    innerHtml: `
      <h1 style="font-size:20px;margin:0 0 12px">Thanks, ${escapeHtml(
        firstName
      )}. Your session request is in.</h1>
      <p style="margin:0 0 18px">Here is exactly what happens next.</p>
      <p style="margin:0 0 12px"><strong>A senior consultant reads what you sent.</strong> Not a sales rep: the person who will actually run your session.</p>
      <p style="margin:0 0 12px"><strong>We reply within one business day</strong> to find a time. The session runs 45 minutes.</p>
      <p style="margin:0 0 18px"><strong>You keep the written plan.</strong> The data model, the gaps we find, and a scalability plan, yours whether you hire us or not.</p>
      <p style="margin:0 0 18px">Your session will be with <strong>Syed Asrar Ahmed</strong>, our Chief Tech Consultant, who runs the strategy sessions for commerce clients.</p>
      <p style="margin:0 0 18px"><strong>Nothing to prepare.</strong> Bring your store or product, your current stack, and the bottleneck or goal. Links help. We will ask the right questions.</p>
      <p style="margin:0 0 6px"><strong>While you wait</strong></p>
      <p style="margin:0 0 22px">Our free agent-readiness scan runs 29 checks on your store and returns a letter grade in seconds. No email needed for the score.<br>
        <a href="${appBaseUrl()}/open-source/agentready" style="color:#0E66C2">Run the free scan</a>
      </p>
      <p style="margin:0 0 8px;color:#64748b;font-size:13px">For your records, this is what you sent us:</p>
      ${detailRows([
        ["What you need", need],
        ["Where you are today", stage || "Not given"],
        ["Company / store", e.company || "Not given"],
      ])}
      <div style="margin-top:12px">${quoted(body)}</div>`,
  };
}

// ─── agentready scanner fix-plan request ────────────────────────────────────

export type ScanLead = { email: string; storeUrl: string; grade: string; score: number };

export function scanTeamEmail(s: ScanLead): BuiltEmail {
  const store = s.storeUrl || "their store";
  return {
    subject: `agentready fix-plan request: ${store} (${s.grade || "no grade"})`,
    preheader: `${store} scored ${s.grade || "n/a"} (${s.score}/100)`,
    innerHtml: `
      <h1 style="font-size:20px;margin:0 0 6px">Fix-plan request from the scanner</h1>
      <p style="margin:0 0 20px;color:#64748b;font-size:14px">Follow up within 24 hours: that is the SLA the page promises. Reply to reach them directly.</p>
      ${detailRows([
        ["Email", s.email],
        ["Store", s.storeUrl || "Not given"],
        ["Grade", `${s.grade || "n/a"} (${s.score}/100)`],
      ])}
      ${adminButton()}`,
  };
}

export function scanConfirmationEmail(s: ScanLead): BuiltEmail {
  const store = s.storeUrl || "your store";
  return {
    subject: "Your agent-readiness fix plan is being prepared",
    preheader: "An engineer will send your prioritized fix plan within one business day.",
    innerHtml: `
      <h1 style="font-size:20px;margin:0 0 12px">We have your scan. The fix plan is next.</h1>
      <p style="margin:0 0 18px">You scanned <strong>${escapeHtml(store)}</strong>${
        s.grade ? ` and it scored <strong>${escapeHtml(s.grade)}</strong> (${s.score}/100)` : ""
      }.</p>
      <p style="margin:0 0 18px">An engineer is going through your findings and will send you a prioritized remediation plan within one business day: every failed check mapped to your platform, with effort estimates. Free, and no call required.</p>
      <p style="margin:0 0 18px">If you would rather talk it through, reply to this email or <a href="${appBaseUrl()}/strategy-session" style="color:#0E66C2">book a free strategy session</a>. A senior consultant will work through the findings with you, and you keep the written plan either way.</p>
      <p style="margin:0;color:#64748b;font-size:13px">The scanner is open source (MIT), so you can audit every one of the 29 checks yourself: <a href="${appBaseUrl()}/open-source/agentready" style="color:#0E66C2">see how it works</a>.</p>`,
  };
}
