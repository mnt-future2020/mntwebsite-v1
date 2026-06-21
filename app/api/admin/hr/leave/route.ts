import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { leaveDays } from "@/lib/hr";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.employeeId || !b.startDate || !b.endDate) {
      return NextResponse.json({ error: "Employee and dates are required." }, { status: 400 });
    }
    const days = leaveDays(b.startDate, b.endDate);
    const leave = await prisma.leaveRequest.create({
      data: {
        employeeId: b.employeeId,
        kind: (b.kind || "PAID") as never,
        startDate: new Date(b.startDate),
        endDate: new Date(b.endDate),
        days,
        reason: b.reason || null,
        status: "PENDING",
      },
    });
    return NextResponse.json(leave);
  } catch {
    return NextResponse.json({ error: "Couldn't add leave." }, { status: 500 });
  }
}
