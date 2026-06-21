import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "mnt_admin";

export type Session = { sub: string; email: string; role: string; perms: string[] };

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET || "dev-insecure-secret-change-me-in-env"
  );
}

export async function createSession(s: Session) {
  return new SignJWT({ sub: s.sub, email: s.email, role: s.role, perms: s.perms })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(s.sub)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifyToken(token: string): Promise<Session | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      sub: String(payload.sub),
      email: String(payload.email),
      role: String(payload.role),
      perms: Array.isArray(payload.perms) ? (payload.perms as string[]) : [],
    };
  } catch {
    return null;
  }
}

// Server-component / route-handler helper.
export async function getSession(): Promise<Session | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

export function isAdminRole(role?: string) {
  return role === "ADMIN" || role === "HR";
}
