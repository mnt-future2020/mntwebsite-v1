import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";

// prisma + nodemailer need the Node.js runtime.
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

    const message = `agentready scan: ${storeUrl} scored ${grade} (${score}/100) — requested the engineer fix plan.`;

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

    if (process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === "true",
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        const to = process.env.MAIL_TO || "info@mntfuture.com";
        const from =
          process.env.MAIL_FROM || `MnT Website <${process.env.SMTP_USER || "info@mntfuture.com"}>`;
        await transporter.sendMail({
          from,
          to,
          replyTo: email,
          subject: `agentready fix-plan request — ${storeUrl} (${grade})`,
          text: `Email: ${email}\nStore: ${storeUrl}\nGrade: ${grade} (${score}/100)\n\nSource: /agentready scanner — follow up within 24h (OSS lead SLA).`,
        });
      } catch (e) {
        console.error("Scan lead mail failed:", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
