import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";
import { createAgentToken } from "@/lib/agent-auth";
import { fullName } from "@/lib/hr";

export const runtime = "nodejs";

// Desktop agent login: employee email + password → a 30-day bearer token.
export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const em = String(email || "").trim();
    const pw = String(password || "");
    const emp = await prisma.employee.findFirst({ where: { email: { equals: em, mode: "insensitive" } } });
    if (emp && emp.passwordHash && emp.status !== "EXITED" && bcrypt.compareSync(pw, emp.passwordHash)) {
      const token = await createAgentToken({ sub: emp.id, email: emp.email, name: fullName(emp) });
      return NextResponse.json({ ok: true, token, name: fullName(emp), code: emp.code });
    }
    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Login failed." }, { status: 500 });
  }
}
