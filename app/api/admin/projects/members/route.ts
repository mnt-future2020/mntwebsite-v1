import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const projectId = String(b.projectId || "");
    const employeeId = String(b.employeeId || "");
    if (!projectId || !employeeId) return NextResponse.json({ error: "Project and employee are required." }, { status: 400 });
    const m = await prisma.projectMember.create({
      data: {
        projectId,
        employeeId,
        role: (b.role as string)?.trim() || "Engineer",
        allocationPct: Number(b.allocationPct) || 100,
      },
      include: { employee: true },
    });
    return NextResponse.json(m);
  } catch {
    return NextResponse.json({ error: "Couldn't add — they may already be on this project." }, { status: 500 });
  }
}
