import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { DEFAULT_SETTINGS } from "@/lib/settings";

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
      // These three columns are non-nullable — a cleared field falls back to the
      // canonical default rather than silently keeping the previous value (which
      // `|| undefined` would do, since Prisma skips undefined columns).
      siteName: b.siteName?.trim() || DEFAULT_SETTINGS.siteName,
      titleTemplate: b.titleTemplate?.trim() || DEFAULT_SETTINGS.titleTemplate,
      defaultDescription: b.defaultDescription?.trim() || DEFAULT_SETTINGS.defaultDescription,
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
