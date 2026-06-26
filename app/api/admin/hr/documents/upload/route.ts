import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { putObject, isSpacesConfigured } from "@/lib/spaces";

export const runtime = "nodejs";
export const maxDuration = 60;

// Upload an employee document file → store in Spaces → create the record.
export async function POST(req: Request) {
  if (!(await isSpacesConfigured()))
    return NextResponse.json(
      { error: "File storage isn't configured — set DigitalOcean Spaces in HR settings." },
      { status: 503 }
    );
  try {
    const form = await req.formData();
    const file = form.get("file");
    const employeeId = String(form.get("employeeId") || "");
    const type = String(form.get("type") || "Document").trim() || "Document";
    if (!(file instanceof File) || !employeeId)
      return NextResponse.json({ error: "Employee and file are required." }, { status: 400 });

    const name = String(form.get("name") || "").trim() || file.name || "Document";
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length === 0) return NextResponse.json({ error: "Empty file." }, { status: 400 });
    if (buf.length > 15 * 1024 * 1024)
      return NextResponse.json({ error: "File too large (max 15 MB)." }, { status: 413 });

    const safe = (file.name || "file").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
    const key = `employee-docs/${employeeId}/${Date.now()}-${safe}`;
    await putObject(key, buf, file.type || "application/octet-stream");

    const doc = await prisma.employeeDocument.create({ data: { employeeId, type, name, storageKey: key } });
    return NextResponse.json({ id: doc.id, type: doc.type, name: doc.name });
  } catch (e) {
    console.error("Document upload failed:", e);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
