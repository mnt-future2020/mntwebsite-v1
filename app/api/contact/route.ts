import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { prisma } from "@/lib/db";

// nodemailer + prisma need the Node.js runtime (not the Edge runtime).
export const runtime = "nodejs";

function escapeHtml(s: string) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const name = (data.name || "").toString().trim();
    const email = (data.email || "").toString().trim();
    const company = (data.company || "").toString().trim();
    const vertical = (data.vertical || "").toString().trim();
    const budget = (data.budget || "").toString().trim();
    const message = (data.message || "").toString().trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Add your name, email and a short message so we can reach you." },
        { status: 400 }
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    // 1) Store the lead in the database (best effort — works even if SMTP isn't set up yet).
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
          source: "contact-form",
        },
      });
      stored = true;
    } catch (e) {
      console.error("Lead store failed:", e);
    }

    // 2) Send the notification email (best effort — only if SMTP is configured).
    let mailed = false;
    if (process.env.SMTP_HOST) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === "true",
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        });
        const to = process.env.MAIL_TO || "info@mntfuture.com";
        const from = process.env.MAIL_FROM || `MnT Future <${process.env.SMTP_USER || "info@mntfuture.com"}>`;
        const rows = [
          ["Name", name],
          ["Email", email],
          ["Company", company || "—"],
          ["Building", vertical || "—"],
          ["Budget", budget || "—"],
        ];
        await transporter.sendMail({
          from,
          to,
          replyTo: email,
          subject: `New enquiry — ${vertical || "General"} — ${name}`,
          text: rows.map(([k, v]) => `${k}: ${v}`).join("\n") + `\n\nMessage:\n${message}`,
          html: `<div style="font-family:Arial,Helvetica,sans-serif;color:#0E1B2E;max-width:560px">
            <h2 style="color:#0E66C2;margin:0 0 16px">New project enquiry</h2>
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              ${rows.map(([k, v]) => `<tr><td style="padding:6px 0;color:#475569;width:120px">${k}</td><td style="padding:6px 0;font-weight:600">${escapeHtml(v)}</td></tr>`).join("")}
            </table>
            <p style="margin:18px 0 6px;color:#475569;font-size:14px">Message</p>
            <div style="padding:14px;background:#F4F8FD;border-radius:10px;font-size:14px;line-height:1.6;white-space:pre-wrap">${escapeHtml(message)}</div>
          </div>`,
        });
        mailed = true;
      } catch (e) {
        console.error("Lead email failed:", e);
      }
    }

    if (!stored && !mailed) {
      return NextResponse.json(
        { error: "Something went wrong on our end. Please try again, or email us directly at info@mntfuture.com." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong on our end. Please try again, or email us directly at info@mntfuture.com." },
      { status: 500 }
    );
  }
}
