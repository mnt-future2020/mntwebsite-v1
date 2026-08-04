import { prisma } from "@/lib/db";

export async function getPublishedPosts() {
  try {
    return await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      // nulls: "last" matters — Postgres sorts DESC as NULLS FIRST, so a post
      // with no publishedAt would otherwise outrank every dated post and take
      // over the top of the blog index.
      orderBy: [{ publishedAt: { sort: "desc", nulls: "last" } }, { createdAt: "desc" }],
    });
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.post.findFirst({ where: { slug, status: "PUBLISHED" } });
  } catch {
    return null;
  }
}

export async function getAllPublishedSlugs() {
  try {
    const posts = await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true },
    });
    return posts.map((p) => p.slug);
  } catch {
    return [];
  }
}
