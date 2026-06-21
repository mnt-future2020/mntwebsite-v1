import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { employeeId, type, name, url } = await req.json();
    if (!employeeId || !name || !url) {
      return NextResponse.json({ error: "Type, name and URL are required." }, { status: 400 });
    }
    const doc = await prisma.employeeDocument.create({
      data: { employeeId, type: type || "Document", name, url },
    });
    return NextResponse.json(doc);
  } catch {
    return NextResponse.json({ error: "Couldn't add document." }, { status: 500 });
  }
}
