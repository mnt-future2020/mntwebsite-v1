import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const list = await prisma.campaign.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const subject = (b.subject || "").toString().trim();
    if (!subject) return NextResponse.json({ error: "Subject is required." }, { status: 400 });
    const campaign = await prisma.campaign.create({
      data: {
        subject,
        preheader: (b.preheader || "").toString().trim() || null,
        contentHtml: (b.contentHtml || "").toString(),
      },
    });
    return NextResponse.json(campaign);
  } catch {
    return NextResponse.json({ error: "Create failed." }, { status: 500 });
  }
}
