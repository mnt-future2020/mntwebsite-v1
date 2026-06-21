import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const s = await prisma.siteSetting.findUnique({ where: { id: 1 } });
    return NextResponse.json(s || {});
  } catch {
    return NextResponse.json({});
  }
}

export async function PUT(req: Request) {
  try {
    const b = await req.json();
    const data = {
      siteName: b.siteName || undefined,
      titleTemplate: b.titleTemplate || undefined,
      defaultDescription: b.defaultDescription || undefined,
      defaultOgImage: b.defaultOgImage || null,
      gaMeasurementId: b.gaMeasurementId || null,
      gscVerification: b.gscVerification || null,
      bingVerification: b.bingVerification || null,
      robotsExtra: b.robotsExtra || null,
    };
    const s = await prisma.siteSetting.upsert({
      where: { id: 1 },
      update: data,
      create: { id: 1, ...data },
    });
    return NextResponse.json(s);
  } catch {
    return NextResponse.json({ error: "Save failed." }, { status: 500 });
  }
}
