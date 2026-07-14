import { scan } from "@mntglobal/agentready-core";
import { NextResponse } from "next/server";

// The scanner does live HTTP fetches (~15 requests, up to ~20s on slow stores).
export const runtime = "nodejs";
export const maxDuration = 60;

// In-memory friction (per server instance): 10 scans/hour/IP, 60s per-domain cooldown.
const ipHits = new Map<string, number[]>();
const domainLast = new Map<string, number>();
const IP_LIMIT = 10;
const DOMAIN_COOLDOWN_MS = 60_000;

// SSRF guard on the initial target (private ranges, localhost, link-local).
const BLOCKED_HOST =
  /^(localhost|.*\.local|.*\.internal|0\.0\.0\.0|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1)/i;

function clientIp(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export async function POST(req: Request) {
  let target: URL;
  try {
    const data = await req.json();
    const raw = String(data.url ?? "").trim();
    target = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return NextResponse.json({ error: "Please enter a valid store URL." }, { status: 400 });
  }

  if (!["http:", "https:"].includes(target.protocol) || BLOCKED_HOST.test(target.hostname)) {
    return NextResponse.json({ error: "That URL can't be scanned." }, { status: 400 });
  }

  const ip = clientIp(req);
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  if (hits.length >= IP_LIMIT) {
    return NextResponse.json(
      {
        error:
          "Rate limit reached (10 scans/hour). Run it locally anytime: npx @mntglobal/agentready",
      },
      { status: 429 }
    );
  }
  const lastDomainScan = domainLast.get(target.hostname) ?? 0;
  if (now - lastDomainScan < DOMAIN_COOLDOWN_MS) {
    return NextResponse.json(
      { error: "This store was just scanned — try again in a minute." },
      { status: 429 }
    );
  }
  hits.push(now);
  ipHits.set(ip, hits);
  domainLast.set(target.hostname, now);

  try {
    const report = await scan(target.toString());
    return NextResponse.json({ report });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Scan failed — please try again." },
      { status: 502 }
    );
  }
}
