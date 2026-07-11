import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { balanceFieldForKind, eachDay } from "@/lib/hr";
import type { LeaveRequest } from "@prisma/client";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// Managers may only act on their own team's requests; ADMIN/HR act on any.
async function managerBlocked(employeeId: string): Promise<boolean> {
  const session = await getSession();
  if (!session || session.role !== "MANAGER") return false;
  const emp = await prisma.employee.findUnique({ where: { id: employeeId }, select: { managerId: true } });
  return emp?.managerId !== session.sub;
}

function dayStart(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

// Keep the attendance calendar in sync with a leave decision. Approving marks
// each working day of the range LEAVE (or HALF_DAY) — so it no longer shows the
// ABSENT default; reverting an approval clears those marks. Holidays are left
// as-is, and a day the employee was already PRESENT/WFH is never overwritten.
async function leaveAttendanceOps(leave: LeaveRequest, newStatus: string): Promise<unknown[]> {
  const becomingApproved = newStatus === "APPROVED" && leave.status !== "APPROVED";
  const leavingApproved = leave.status === "APPROVED" && (newStatus === "REJECTED" || newStatus === "CANCELLED");
  if (!becomingApproved && !leavingApproved) return [];

  const days = eachDay(leave.startDate, leave.endDate);
  if (days.length === 0) return [];
  const holidays = new Set(
    (
      await prisma.holiday.findMany({
        where: { date: { gte: days[0], lte: days[days.length - 1] } },
        select: { date: true },
      })
    ).map((h) => dayStart(h.date).getTime())
  );
  const working = days.filter((d) => !holidays.has(d.getTime()));
  if (working.length === 0) return [];

  if (leavingApproved) {
    // Only remove marks the approval itself would have made.
    return [
      prisma.attendance.deleteMany({
        where: { employeeId: leave.employeeId, date: { in: working }, status: { in: ["LEAVE", "HALF_DAY"] as never } },
      }),
    ];
  }

  const attStatus = leave.halfDay ? "HALF_DAY" : "LEAVE";
  const existing = await prisma.attendance.findMany({
    where: { employeeId: leave.employeeId, date: { in: working } },
    select: { id: true, date: true, status: true },
  });
  const byTime = new Map(existing.map((r) => [dayStart(r.date).getTime(), r]));
  const ops: unknown[] = [];
  for (const d of working) {
    const cur = byTime.get(d.getTime());
    if (!cur) {
      ops.push(prisma.attendance.create({ data: { employeeId: leave.employeeId, date: d, status: attStatus as never } }));
    } else if (cur.status === "ABSENT") {
      ops.push(prisma.attendance.update({ where: { id: cur.id }, data: { status: attStatus as never } }));
    }
  }
  return ops;
}

// Approve / reject / cancel — adjusts the employee's paid-leave balance.
export async function PATCH(req: Request, props: Ctx) {
  const params = await props.params;
  try {
    const { status, approverNote } = await req.json();
    const leave = await prisma.leaveRequest.findUnique({ where: { id: params.id } });
    if (!leave) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (await managerBlocked(leave.employeeId))
      return NextResponse.json({ error: "You can only act on your team's requests." }, { status: 403 });

    // Deduct from (or restore to) the balance for this leave's type. UNPAID has none.
    const balanceField = balanceFieldForKind(leave.kind);
    let delta = 0;
    if (balanceField) {
      if (status === "APPROVED" && leave.status !== "APPROVED") delta = -leave.days;
      if (leave.status === "APPROVED" && (status === "REJECTED" || status === "CANCELLED")) delta = leave.days;
    }

    const ops: unknown[] = [
      prisma.leaveRequest.update({
        where: { id: params.id },
        data: { status, approverNote: approverNote || null, decidedAt: new Date() },
      }),
    ];
    if (delta !== 0 && balanceField) {
      ops.push(
        prisma.employee.update({
          where: { id: leave.employeeId },
          data: { [balanceField]: { increment: delta } },
        })
      );
    }
    // Reflect the decision on the attendance calendar (LEAVE on approve, clear on revert).
    ops.push(...(await leaveAttendanceOps(leave, status)));
    await prisma.$transaction(ops as never);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const params = await props.params;
  try {
    const leave = await prisma.leaveRequest.findUnique({ where: { id: params.id } });
    if (!leave) return NextResponse.json({ error: "Not found" }, { status: 404 });
    if (await managerBlocked(leave.employeeId))
      return NextResponse.json({ error: "You can only act on your team's requests." }, { status: 403 });

    // If the leave was APPROVED, its days were deducted from the balance — credit
    // them back atomically with the delete (mirrors the PATCH restore branch).
    const balanceField = balanceFieldForKind(leave.kind);
    const ops: unknown[] = [prisma.leaveRequest.delete({ where: { id: params.id } })];
    if (leave.status === "APPROVED" && balanceField) {
      ops.push(
        prisma.employee.update({
          where: { id: leave.employeeId },
          data: { [balanceField]: { increment: leave.days } },
        })
      );
    }
    // Deleting an approved leave also clears the LEAVE marks it put on the calendar.
    ops.push(...(await leaveAttendanceOps(leave, "CANCELLED")));
    await prisma.$transaction(ops as never);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
