import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { parseEmployee } from "@/lib/hr-parse";
import { listRoles } from "@/lib/permissions-db";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

async function safeRole(role: string): Promise<string> {
  const keys = new Set((await listRoles()).map((r) => r.key));
  return keys.has(role) ? role : "EMPLOYEE";
}

export async function GET(_req: Request, props: Ctx) {
  const params = await props.params;
  const emp = await prisma.employee.findUnique({ where: { id: params.id } });
  if (!emp) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(emp);
}

export async function PATCH(req: Request, props: Ctx) {
  const params = await props.params;
  try {
    const b = await req.json();
    const data = parseEmployee(b);
    // prevent self-manager
    if (data.managerId === params.id) data.managerId = null;
    const passwordHash = b.password ? bcrypt.hashSync(String(b.password), 10) : undefined;
    const emp = await prisma.employee.update({
      where: { id: params.id },
      data: {
        ...data,
        employmentType: data.employmentType as never,
        status: data.status as never,
        role: await safeRole(data.role),
        ...(passwordHash ? { passwordHash } : {}),
      },
    });
    return NextResponse.json(emp);
  } catch {
    return NextResponse.json({ error: "Update failed — email may already exist." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const params = await props.params;
  try {
    await prisma.employee.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
