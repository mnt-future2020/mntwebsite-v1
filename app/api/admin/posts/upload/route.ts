import { NextResponse } from "next/server";
import { putPublicObject, isSpacesConfigured } from "@/lib/spaces";

export const runtime = "nodejs";
export const maxDuration = 60;

// Upload a blog image → public object in Spaces → return its public URL (stored
// in the post's coverImage / inline <img> in the content).
export async function POST(req: Request) {
  if (!(await isSpacesConfigured()))
    return NextResponse.json(
      { error: "Image storage isn't configured — set DigitalOcean Spaces in HR settings." },
      { status: 503 }
    );
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "No file." }, { status: 400 });
    if (!file.type.startsWith("image/"))
      return NextResponse.json({ error: "Only image files are allowed." }, { status: 400 });
    const buf = Buffer.from(await file.arrayBuffer());
    if (buf.length === 0) return NextResponse.json({ error: "Empty file." }, { status: 400 });
    if (buf.length > 8 * 1024 * 1024)
      return NextResponse.json({ error: "Image too large (max 8 MB)." }, { status: 413 });

    const safe = (file.name || "image").replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
    const key = `blog/${Date.now()}-${safe}`;
    const url = await putPublicObject(key, buf, file.type);
    return NextResponse.json({ url });
  } catch (e) {
    console.error("Blog image upload failed:", e);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}
