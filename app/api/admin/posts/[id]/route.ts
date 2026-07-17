import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toSlug, readingMinutes, sanitizePostHtml } from "@/lib/posts";

export const runtime = "nodejs";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, props: Ctx) {
  const params = await props.params;
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(post);
}

export async function PATCH(req: Request, props: Ctx) {
  const params = await props.params;
  try {
    const b = await req.json();
    const existing = await prisma.post.findUnique({ where: { id: params.id } });
    if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

    let slug = b.slug ? toSlug(b.slug) : existing.slug;
    if (slug && slug !== existing.slug) {
      const base = slug;
      let n = 2;
      while (await prisma.post.findFirst({ where: { slug, NOT: { id: params.id } } })) slug = `${base}-${n++}`;
    }

    const status = b.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
    const publishedAt = status === "PUBLISHED" ? existing.publishedAt ?? new Date() : null;
    const contentHtml = sanitizePostHtml(b.contentHtml || "");

    const post = await prisma.post.update({
      where: { id: params.id },
      data: {
        slug,
        title: b.title ?? existing.title,
        excerpt: b.excerpt || null,
        contentHtml,
        coverImage: b.coverImage || null,
        category: b.category || null,
        tags: Array.isArray(b.tags) ? b.tags : [],
        author: b.author || "MnT Future Team",
        status,
        readingMins: readingMinutes(contentHtml),
        metaTitle: b.metaTitle || null,
        metaDescription: b.metaDescription || null,
        ogImage: b.ogImage || null,
        canonicalUrl: b.canonicalUrl || null,
        keywords: b.keywords || null,
        noindex: !!b.noindex,
        publishedAt,
      },
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, props: Ctx) {
  const params = await props.params;
  try {
    await prisma.post.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 500 });
  }
}
