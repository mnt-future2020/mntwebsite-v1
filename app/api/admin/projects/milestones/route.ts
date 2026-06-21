import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const projectId = String(b.projectId || "");
    const title = String(b.title || "").trim();
    if (!projectId || !title) return NextResponse.json({ error: "Project and title are required." }, { status: 400 });
    const m = await prisma.milestone.create({
      data: {
        projectId,
        title,
        description: (b.description as string) || null,
        dueDate: b.dueDate ? new Date(String(b.dueDate)) : null,
        amount: parseInt(String(b.amount ?? "0"), 10) || 0,
        status: (b.status as string || "PLANNED") as never,
      },
    });
    return NextResponse.json(m);
  } catch {
    return NextResponse.json({ error: "Couldn't create the milestone." }, { status: 500 });
  }
}
