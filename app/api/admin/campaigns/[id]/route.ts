import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function PUT(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const existing = await prisma.campaign.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found." }, { status: 404 });
    if (existing.status !== "DRAFT") {
      return NextResponse.json({ error: "Sent campaigns can't be edited." }, { status: 400 });
    }
    const b = await req.json();
    const subject = (b.subject || "").toString().trim();
    if (!subject) return NextResponse.json({ error: "Subject is required." }, { status: 400 });
    const campaign = await prisma.campaign.update({
      where: { id: params.id },
      data: {
        subject,
        preheader: (b.preheader || "").toString().trim() || null,
        contentHtml: (b.contentHtml || "").toString(),
      },
    });
    return NextResponse.json(campaign);
  } catch {
    return NextResponse.json({ error: "Save failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await prisma.campaign.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
