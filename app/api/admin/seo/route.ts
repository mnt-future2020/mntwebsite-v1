import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const list = await prisma.seoSetting.findMany();
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function PUT(req: Request) {
  try {
    const b = await req.json();
    if (!b.path) return NextResponse.json({ error: "Path is required." }, { status: 400 });
    const data = {
      title: b.title || null,
      description: b.description || null,
      ogImage: b.ogImage || null,
      noindex: !!b.noindex,
    };
    const s = await prisma.seoSetting.upsert({
      where: { path: b.path },
      update: data,
      create: { path: b.path, ...data },
    });
    return NextResponse.json(s);
  } catch {
    return NextResponse.json({ error: "Save failed." }, { status: 500 });
  }
}
