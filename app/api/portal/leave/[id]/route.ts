import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getCurrentEmployee } from "@/lib/portal";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

// Employee cancels their own pending request.
export async function PATCH(_req: Request, props: Ctx) {
  const params = await props.params;
  const emp = await getCurrentEmployee();
  if (!emp) return NextResponse.json({ error: "No employee profile." }, { status: 400 });
  try {
    const lr = await prisma.leaveRequest.findUnique({ where: { id: params.id } });
    if (!lr || lr.employeeId !== emp.id)
      return NextResponse.json({ error: "Not found." }, { status: 404 });
    if (lr.status !== "PENDING")
      return NextResponse.json({ error: "Only pending requests can be cancelled." }, { status: 400 });
    const updated = await prisma.leaveRequest.update({
      where: { id: params.id },
      data: { status: "CANCELLED", decidedAt: new Date() },
    });
    return NextResponse.json(updated);
  } catch {
    return NextResponse.json({ error: "Couldn't cancel." }, { status: 500 });
  }
}
