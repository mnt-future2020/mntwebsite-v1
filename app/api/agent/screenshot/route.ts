import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyAgentToken, bearerToken } from "@/lib/agent-auth";
import { putScreenshot, spacesConfigured } from "@/lib/spaces";

export const runtime = "nodejs";
export const maxDuration = 30;

// The agent POSTs the raw JPEG bytes (Content-Type: image/jpeg) with a Bearer
// token and an X-Captured-At header. We store the image in Spaces and record a row.
export async function POST(req: Request) {
  const token = bearerToken(req);
  const claims = token ? await verifyAgentToken(token) : null;
  if (!claims) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (!spacesConfigured)
    return NextResponse.json({ error: "Screenshot storage isn't configured on the server." }, { status: 503 });

  try {
    const emp = await prisma.employee.findUnique({
      where: { id: claims.sub },
      select: { id: true, status: true },
    });
    if (!emp || emp.status === "EXITED")
      return NextResponse.json({ error: "Inactive account." }, { status: 403 });

    const buf = Buffer.from(await req.arrayBuffer());
    if (buf.length === 0) return NextResponse.json({ error: "Empty image." }, { status: 400 });
    if (buf.length > 5 * 1024 * 1024) return NextResponse.json({ error: "Image too large." }, { status: 413 });

    const capHeader = req.headers.get("x-captured-at");
    const capturedAt = capHeader && !Number.isNaN(Date.parse(capHeader)) ? new Date(capHeader) : new Date();
    const dateStr = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(capturedAt);
    const key = `screenshots/${emp.id}/${dateStr}/${capturedAt.getTime()}.jpg`;

    await putScreenshot(key, buf, "image/jpeg");
    await prisma.screenshot.create({ data: { employeeId: emp.id, capturedAt, storageKey: key } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Screenshot upload failed:", e);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
