import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { newToken, isValidEmail } from "@/lib/subscribers";
import { sendConfirmation } from "@/lib/email";

// Prisma + Resend need the Node.js runtime.
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const email = (data.email || "").toString().trim().toLowerCase();
    const name = (data.name || "").toString().trim() || null;
    const source = (data.source || "newsletter").toString().trim();

    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const existing = await prisma.subscriber.findUnique({ where: { email } });

    // Already an active subscriber — nothing to do (don't leak status either way).
    if (existing && existing.status === "SUBSCRIBED") {
      return NextResponse.json({ ok: true, message: "You're already subscribed — thank you!" });
    }

    // Re-subscribe or first-time: (re)set to PENDING with a fresh token.
    const token = newToken();
    const sub = existing
      ? await prisma.subscriber.update({
          where: { email },
          data: { token, status: "PENDING", name: name ?? existing.name, unsubscribedAt: null },
        })
      : await prisma.subscriber.create({
          data: { email, name, source, token, status: "PENDING" },
        });

    const result = await sendConfirmation(sub.email, sub.token);

    // If Resend isn't configured yet, auto-confirm so local/dev flows still work
    // (no confirmation email can be delivered without an API key).
    if (result.skipped) {
      await prisma.subscriber.update({
        where: { id: sub.id },
        data: { status: "SUBSCRIBED", confirmedAt: new Date() },
      });
      return NextResponse.json({
        ok: true,
        message: "Subscribed! (Email sending isn't configured yet, so we confirmed you automatically.)",
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Almost there — check your inbox to confirm your subscription.",
    });
  } catch (e) {
    console.error("Subscribe failed:", e);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
