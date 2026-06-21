import { prisma } from "@/lib/db";

export async function getPublishedPosts() {
  try {
    return await prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
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
