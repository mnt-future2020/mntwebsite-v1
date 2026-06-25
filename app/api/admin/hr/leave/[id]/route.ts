import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getSession } from "@/lib/auth";
import { balanceFieldForKind } from "@/lib/hr";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// Managers may only act on their own team's requests; ADMIN/HR act on any.
async function managerBlocked(employeeId: string): Promise<boolean> {
  const session = await getSession();
  if (!session || session.role !== "MANAGER") return false;
  const emp = await prisma.employee.findUnique({ where: { id: employeeId }, select: { managerId: true } });
  return emp?.managerId !== session.sub;
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
    await prisma.$transaction(ops as never);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
