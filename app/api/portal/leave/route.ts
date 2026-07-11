import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leaveDays } from "@/lib/hr";
import { getCurrentEmployee } from "@/lib/portal";

export const runtime = "nodejs";

export async function GET() {
  const emp = await getCurrentEmployee();
  if (!emp) return NextResponse.json([]);
  try {
    const list = await prisma.leaveRequest.findMany({
      where: { employeeId: emp.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  const emp = await getCurrentEmployee();
  if (!emp) return NextResponse.json({ error: "No employee profile on this account." }, { status: 400 });
  try {
    const b = await req.json();
    const halfDay = Boolean(b.halfDay);
    if (!b.startDate || (!halfDay && !b.endDate))
      return NextResponse.json({ error: "Start and end dates are required." }, { status: 400 });
    // A half-day is a single day worth 0.5; ignore any end date the client sent.
    const endDate = halfDay ? b.startDate : b.endDate;
    if (new Date(endDate) < new Date(b.startDate))
      return NextResponse.json({ error: "End date can't be before start date." }, { status: 400 });
    const days = halfDay ? 0.5 : leaveDays(b.startDate, endDate);
    const leave = await prisma.leaveRequest.create({
      data: {
        employeeId: emp.id,
        kind: (b.kind || "PAID") as never,
        startDate: new Date(b.startDate),
        endDate: new Date(endDate),
        days,
        halfDay,
        reason: b.reason || null,
        status: "PENDING",
      },
    });
    return NextResponse.json(leave);
  } catch {
    return NextResponse.json({ error: "Couldn't submit your leave request." }, { status: 500 });
  }
}
