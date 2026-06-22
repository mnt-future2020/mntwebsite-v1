import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";

export async function PATCH(req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    const b = await req.json();
    const data: Record<string, unknown> = {};
    if (b.period !== undefined) data.period = String(b.period);
    if (b.rating !== undefined) data.rating = Number(b.rating);
    if (b.hikePercent !== undefined)
      data.hikePercent = b.hikePercent === "" || b.hikePercent == null ? null : Number(b.hikePercent);
    if (b.reviewer !== undefined) data.reviewer = b.reviewer || null;
    if (b.status !== undefined) data.status = String(b.status);
    if (b.strengths !== undefined) data.strengths = b.strengths || null;
    if (b.improvements !== undefined) data.improvements = b.improvements || null;
    if (b.goals !== undefined) data.goals = b.goals || null;
    const r = await prisma.performanceReview.update({ where: { id: params.id }, data });
    return NextResponse.json(r);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  try {
    await prisma.performanceReview.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
