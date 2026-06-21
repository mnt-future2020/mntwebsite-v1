import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

// CRM-gated company create (companies are the shared Client model).
function parse(b: Record<string, unknown>) {
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

export async function POST(req: Request) {
  try {
    const data = parse(await req.json());
    if (!data.name) return NextResponse.json({ error: "Company name is required." }, { status: 400 });
    const c = await prisma.client.create({ data: { ...data, status: data.status as never } });
    return NextResponse.json(c);
  } catch {
    return NextResponse.json({ error: "Couldn't create the company." }, { status: 500 });
  }
}
