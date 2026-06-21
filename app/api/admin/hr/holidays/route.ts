import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    return NextResponse.json(await prisma.holiday.findMany({ orderBy: { date: "asc" } }));
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const { date, name } = await req.json();
    if (!date || !name) return NextResponse.json({ error: "Date and name are required." }, { status: 400 });
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    const h = await prisma.holiday.create({ data: { date: d, name } });
    return NextResponse.json(h);
  } catch {
    return NextResponse.json({ error: "Couldn't add — that date may already be a holiday." }, { status: 500 });
  }
}
