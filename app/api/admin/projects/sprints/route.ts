import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const projectId = String(b.projectId || "");
    const name = String(b.name || "").trim();
    if (!projectId || !name) return NextResponse.json({ error: "Project and sprint name are required." }, { status: 400 });
    const s = await prisma.sprint.create({
      data: {
        projectId,
        name,
        goal: (b.goal as string) || null,
        startDate: b.startDate ? new Date(String(b.startDate)) : null,
        endDate: b.endDate ? new Date(String(b.endDate)) : null,
        status: (b.status as string || "PLANNED") as never,
      },
    });
    return NextResponse.json(s);
  } catch {
    return NextResponse.json({ error: "Couldn't create the sprint." }, { status: 500 });
  }
}
