import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.employeeId || !b.period) {
      return NextResponse.json({ error: "Employee and period are required." }, { status: 400 });
    }
    const review = await prisma.performanceReview.create({
      data: {
        employeeId: b.employeeId,
        period: b.period,
        rating: Math.max(1, Math.min(5, parseInt(String(b.rating), 10) || 3)),
        strengths: b.strengths || null,
        improvements: b.improvements || null,
        goals: b.goals || null,
        hikePercent: b.hikePercent ? parseFloat(String(b.hikePercent)) : null,
        reviewer: b.reviewer || null,
        status: b.status === "FINALIZED" ? "FINALIZED" : "DRAFT",
      },
    });
    return NextResponse.json(review);
  } catch {
    return NextResponse.json({ error: "Couldn't save review." }, { status: 500 });
  }
}
