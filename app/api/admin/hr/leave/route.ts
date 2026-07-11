import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { leaveDays } from "@/lib/hr";

export const runtime = "nodejs";

// Managers may only file requests for their own team; ADMIN/HR for anyone.
async function managerBlocked(employeeId: string): Promise<boolean> {
  const session = await getSession();
  if (!session || session.role !== "MANAGER") return false;
  const emp = await prisma.employee.findUnique({ where: { id: employeeId }, select: { managerId: true } });
  return emp?.managerId !== session.sub;
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.employeeId || !b.startDate || !b.endDate) {
      return NextResponse.json({ error: "Employee and dates are required." }, { status: 400 });
    }
    if (await managerBlocked(String(b.employeeId)))
      return NextResponse.json({ error: "You can only create requests for your team." }, { status: 403 });
    // A half-day is a single day worth 0.5; ignore any end date the client sent.
    const halfDay = Boolean(b.halfDay);
    const endDate = halfDay ? b.startDate : b.endDate;
    const days = halfDay ? 0.5 : leaveDays(b.startDate, endDate);
    const leave = await prisma.leaveRequest.create({
      data: {
        employeeId: b.employeeId,
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
    return NextResponse.json({ error: "Couldn't add leave." }, { status: 500 });
  }
}
