import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession, SESSION_COOKIE } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getRolePerms } from "@/lib/permissions-db";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const em = String(email || "").trim();
    const pw = String(password || "");

    // 1) Super-admin from env.
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminHash = process.env.ADMIN_PASSWORD_HASH;
    if (adminEmail && adminHash && em.toLowerCase() === adminEmail.toLowerCase() && bcrypt.compareSync(pw, adminHash)) {
      const perms = await getRolePerms("ADMIN");
      const token = await createSession({ sub: "admin", email: adminEmail, role: "ADMIN", perms });
      // Env super-admin has no employee profile → land on the admin dashboard.
      return setCookie(NextResponse.json({ ok: true, role: "ADMIN", redirect: "/admin" }), token);
    }

    // 2) Employee login.
    try {
      const emp = await prisma.employee.findFirst({
        where: { email: { equals: em, mode: "insensitive" } },
      });
      if (emp && emp.passwordHash && emp.status !== "EXITED" && bcrypt.compareSync(pw, emp.passwordHash)) {
        const perms = await getRolePerms(emp.role);
        const token = await createSession({ sub: emp.id, email: emp.email, role: emp.role, perms });
        // Everyone lands on their My workspace dashboard first, regardless of role.
        return setCookie(NextResponse.json({ ok: true, role: emp.role, redirect: "/portal" }), token);
      }
    } catch {
      // DB not reachable — fall through to invalid.
    }

    return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
  } catch {
    return NextResponse.json({ error: "Login failed. Please try again." }, { status: 500 });
  }
}

function setCookie(res: NextResponse, token: string) {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return res;
}
