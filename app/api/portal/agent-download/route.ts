import { NextResponse } from "next/server";
import { cdnUrl, isSpacesConfigured } from "@/lib/spaces";

export const runtime = "nodejs";

// Gated by proxy.ts (any signed-in user) → redirect to the public CDN URL of the
// installer (fast edge-cached download).
const DMG_KEY = "downloads/MnT-Monitor-mac-arm64.dmg";

export async function GET() {
  if (!(await isSpacesConfigured()))
    return NextResponse.json({ error: "The download isn't available yet." }, { status: 503 });
  try {
    const url = await cdnUrl(DMG_KEY);
    if (!url) return NextResponse.json({ error: "Storage not configured." }, { status: 503 });
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.json({ error: "Couldn't generate the download link." }, { status: 500 });
  }
}
