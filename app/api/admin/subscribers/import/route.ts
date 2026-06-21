import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { newToken, isValidEmail } from "@/lib/subscribers";
import { sendInvites } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 60;

// Pull email-looking tokens out of any pasted blob (newlines, commas, "Name <email>", CSV…).
function extractEmails(raw: string): string[] {
  const matches = raw.match(/[^\s@,;<>"']+@[^\s@,;<>"']+\.[^\s@,;<>"']+/g) || [];
  return [...new Set(matches.map((e) => e.trim().toLowerCase()))];
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const raw = (body.emails || "").toString();
    const source = (body.source || "import").toString().trim() || "import";

    const all = extractEmails(raw);
    if (all.length === 0) {
      return NextResponse.json({ error: "No email addresses found in the text." }, { status: 400 });
    }

    const valid = all.filter(isValidEmail);
    const invalid = all.length - valid.length;

    let alreadySubscribed = 0;
    const toInvite: { email: string; token: string }[] = [];

    for (const email of valid) {
      const existing = await prisma.subscriber.findUnique({ where: { email } });
      if (existing?.status === "SUBSCRIBED") {
        alreadySubscribed++;
        continue;
      }
      const token = newToken();
      if (existing) {
        await prisma.subscriber.update({
          where: { email },
          data: { token, status: "PENDING", source: existing.source || source },
        });
      } else {
        await prisma.subscriber.create({ data: { email, token, status: "PENDING", source } });
      }
      toInvite.push({ email, token });
    }

    const result = await sendInvites(toInvite);

    return NextResponse.json({
      ok: true,
      found: all.length,
      valid: valid.length,
      invalid,
      alreadySubscribed,
      pending: toInvite.length,
      invited: result.sent,
      failed: result.failed,
      emailSkipped: result.skipped || false,
      error: result.error,
    });
  } catch (e) {
    console.error("Import failed:", e);
    return NextResponse.json({ error: "Import failed. Please try again." }, { status: 500 });
  }
}
