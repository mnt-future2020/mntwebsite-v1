import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { readingMinutes, sanitizePostHtml } from "@/lib/posts";
import posts from "@/content/blog-posts.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Publish the blog posts committed in content/blog-posts.json.
//
// This exists because the deployed app already holds DATABASE_URL, while the
// environments that prepare the posts (CI, an agent session, a laptop without a
// prod .env) generally do not. Deploying the content and publishing it are then
// the same operation: push to main, then hit this once.
//
// Idempotent — upserts by slug, so re-running only rewrites the same rows.
//   GET /api/cron/sync-blog?secret=YOUR_SECRET
// or with header: Authorization: Bearer YOUR_SECRET
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  const given =
    new URL(req.url).searchParams.get("secret") ||
    (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "");
  if (!secret || given !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const synced: { slug: string; title: string; publishedAt: string }[] = [];
  try {
    for (const p of posts) {
      // The source doc's own date drives publishedAt, so /blog (ordered
      // publishedAt desc) always leads with the newest pack.
      const publishedAt = p.date ? new Date(`${p.date}T00:00:00Z`) : new Date();
      const contentHtml = sanitizePostHtml(p.contentHtml || "");
      const fields = {
        title: p.title,
        excerpt: p.excerpt ?? null,
        contentHtml,
        coverImage: p.coverImage ?? null,
        ogImage: p.coverImage ?? null,
        category: p.category ?? null,
        tags: Array.isArray(p.tags) ? p.tags : [],
        author: p.author || "MnT Future Team",
        metaTitle: p.metaTitle ?? null,
        metaDescription: p.metaDescription ?? null,
        keywords: p.keywords ?? null,
        readingMins: readingMinutes(contentHtml),
        status: "PUBLISHED" as const,
        publishedAt,
      };
      const post = await prisma.post.upsert({
        where: { slug: p.slug },
        update: fields,
        create: { slug: p.slug, ...fields },
      });
      synced.push({
        slug: post.slug,
        title: post.title,
        publishedAt: publishedAt.toISOString().slice(0, 10),
      });
    }
  } catch {
    return NextResponse.json({ error: "Database unavailable." }, { status: 500 });
  }

  return NextResponse.json({ count: synced.length, synced });
}
