import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { signedGetUrl } from "@/lib/spaces";

export const runtime = "nodejs";

// Admin-gated (via proxy.ts) download: redirect to a short-lived presigned URL
// for a Spaces-stored file, or to the external link for a legacy url doc.
export async function GET(_req: Request, props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const doc = await prisma.employeeDocument.findUnique({
    where: { id },
    select: { storageKey: true, url: true },
  });
  if (!doc) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (doc.storageKey) {
    const url = await signedGetUrl(doc.storageKey, 120);
    return NextResponse.redirect(url);
  }
  if (doc.url) return NextResponse.redirect(doc.url);
  return NextResponse.json({ error: "No file" }, { status: 404 });
}
