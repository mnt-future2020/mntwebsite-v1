import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

function parseClient(b: Record<string, unknown>) {
  return {
    name: String(b.name || "").trim(),
    contact: (b.contact as string)?.trim() || null,
    email: (b.email as string)?.trim() || null,
    phone: (b.phone as string)?.trim() || null,
    website: (b.website as string)?.trim() || null,
    status: (b.status as string) || "ACTIVE",
    notes: (b.notes as string) || null,
  };
}

export async function GET() {
  try {
    const list = await prisma.client.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { projects: true } } },
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const data = parseClient(await req.json());
    if (!data.name) return NextResponse.json({ error: "Client name is required." }, { status: 400 });
    const c = await prisma.client.create({ data: { ...data, status: data.status as never } });
    return NextResponse.json(c);
  } catch {
    return NextResponse.json({ error: "Couldn't create the client." }, { status: 500 });
  }
}
