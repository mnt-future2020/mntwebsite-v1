import { SignJWT, jwtVerify } from "jose";

// Bearer-token auth for the desktop monitoring agent (it isn't a browser, so it
// can't use the cookie session). Tokens are marked kind:"agent" and last 30 days.
function secret() {
  return new TextEncoder().encode(process.env.AUTH_SECRET || "dev-insecure-secret-change-me-in-env");
}

export type AgentClaims = { sub: string; email: string; name: string };

export async function createAgentToken(c: AgentClaims): Promise<string> {
  return new SignJWT({ email: c.email, name: c.name, kind: "agent" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(c.sub)
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(secret());
}

export async function verifyAgentToken(token: string): Promise<AgentClaims | null> {
  try {
    const { payload } = await jwtVerify(token, secret());
    if (payload.kind !== "agent") return null;
    return { sub: String(payload.sub), email: String(payload.email), name: String(payload.name || "") };
  } catch {
    return null;
  }
}

export function bearerToken(req: Request): string | null {
  const m = (req.headers.get("authorization") || "").match(/^Bearer (.+)$/i);
  return m ? m[1] : null;
}
