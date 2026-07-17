import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { toSlug, readingMinutes, sanitizePostHtml } from "@/lib/posts";

export const runtime = "nodejs";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(posts);
  } catch {
    return NextResponse.json({ error: "Database unavailable." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.title) return NextResponse.json({ error: "Title is required." }, { status: 400 });

    let base = (b.slug && toSlug(b.slug)) || toSlug(b.title);
    if (!base) base = "post";
    let slug = base;
    let n = 2;
    while (await prisma.post.findUnique({ where: { slug } })) slug = `${base}-${n++}`;

    const status = b.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";
    const contentHtml = sanitizePostHtml(b.contentHtml || "");
    const post = await prisma.post.create({
      data: {
        slug,
        title: b.title,
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
        publishedAt: status === "PUBLISHED" ? new Date() : null,
      },
    });
    return NextResponse.json(post);
  } catch {
    return NextResponse.json({ error: "Couldn't create the post." }, { status: 500 });
  }
}
