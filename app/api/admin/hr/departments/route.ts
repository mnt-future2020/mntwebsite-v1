import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const list = await prisma.department.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { employees: true } } },
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const { name, head } = await req.json();
    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    const d = await prisma.department.create({ data: { name, head: head || null } });
    return NextResponse.json(d);
  } catch {
    return NextResponse.json({ error: "Couldn't create — that name may already exist." }, { status: 500 });
  }
}
