import { NextResponse } from "next/server";
import { signedGetUrl, isSpacesConfigured } from "@/lib/spaces";

export const runtime = "nodejs";

// Gated by proxy.ts (any signed-in user) → redirect to a short-lived presigned
// URL so the private installer can be downloaded.
const DMG_KEY = "downloads/MnT-Monitor-mac-arm64.dmg";

export async function GET() {
  if (!(await isSpacesConfigured()))
    return NextResponse.json({ error: "The download isn't available yet." }, { status: 503 });
  try {
    const url = await signedGetUrl(DMG_KEY, 120);
    return NextResponse.redirect(url);
  } catch {
    return NextResponse.json({ error: "Couldn't generate the download link." }, { status: 500 });
  }
}
