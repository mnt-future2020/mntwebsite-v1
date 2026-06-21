import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { parseEmployee } from "@/lib/hr-parse";
import { nextEmployeeCode } from "@/lib/hr";
import { listRoles } from "@/lib/permissions-db";

export const runtime = "nodejs";

// Coerce an arbitrary role string to a real role key (defaults to EMPLOYEE).
async function safeRole(role: string): Promise<string> {
  const keys = new Set((await listRoles()).map((r) => r.key));
  return keys.has(role) ? role : "EMPLOYEE";
}

export async function GET() {
  try {
    const list = await prisma.employee.findMany({
      orderBy: { code: "asc" },
      include: { department: true },
    });
    return NextResponse.json(list);
  } catch {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const data = parseEmployee(b);
    if (!data.firstName || !data.email) {
      return NextResponse.json({ error: "First name and email are required." }, { status: 400 });
    }
    const count = await prisma.employee.count();
    const code = b.code ? String(b.code) : nextEmployeeCode(count);
    const passwordHash = b.password ? bcrypt.hashSync(String(b.password), 10) : undefined;
    const emp = await prisma.employee.create({
      data: {
        ...data,
        code,
        employmentType: data.employmentType as never,
        status: data.status as never,
        role: await safeRole(data.role),
        ...(passwordHash ? { passwordHash } : {}),
      },
    });
    return NextResponse.json(emp);
  } catch (e) {
    return NextResponse.json({ error: "Couldn't create — email or code may already exist." }, { status: 500 });
  }
}
