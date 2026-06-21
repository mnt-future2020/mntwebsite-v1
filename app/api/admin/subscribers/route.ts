import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const list = await prisma.subscriber.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}
