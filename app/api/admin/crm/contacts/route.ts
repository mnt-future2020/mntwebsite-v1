import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

function parse(b: Record<string, unknown>) {
  return {
    firstName: String(b.firstName || "").trim(),
    lastName: (b.lastName as string)?.trim() || null,
    email: (b.email as string)?.trim() || null,
    phone: (b.phone as string)?.trim() || null,
    title: (b.title as string)?.trim() || null,
    clientId: (b.clientId as string) || null,
    ownerId: (b.ownerId as string) || null,
    notes: (b.notes as string) || null,
    nextFollowUp: b.nextFollowUp ? new Date(String(b.nextFollowUp)) : null,
  };
}

export async function GET() {
  try {
    const list = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
      include: { client: true, owner: true, _count: { select: { deals: true } } },
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const data = parse(await req.json());
    if (!data.firstName) return NextResponse.json({ error: "First name is required." }, { status: 400 });
    const c = await prisma.contact.create({ data, include: { client: true, owner: true, _count: { select: { deals: true } } } });
    return NextResponse.json(c);
  } catch {
    return NextResponse.json({ error: "Couldn't create the contact." }, { status: 500 });
  }
}
