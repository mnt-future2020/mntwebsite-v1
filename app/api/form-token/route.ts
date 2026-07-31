import { NextResponse } from "next/server";
import { issueFormToken, clientIp, rateLimit } from "@/lib/antispam";

// crypto (HMAC) needs the Node.js runtime.
export const runtime = "nodejs";
// Every visitor must get their own fresh token: never cache or prerender this.
export const dynamic = "force-dynamic";

/**
 * Mints the single-use token the public forms post back with. Minting is timed,
 * so a token is only accepted a couple of seconds later — see lib/antispam.ts.
 */
export async function GET(req: Request) {
  // Generous: a visitor legitimately mints one per form, per page view.
  if (!rateLimit(`form-token:${clientIp(req)}`, 40, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }
  return NextResponse.json(
    { token: issueFormToken() },
    { headers: { "cache-control": "no-store" } }
  );
}
