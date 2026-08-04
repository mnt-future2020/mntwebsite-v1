// Publish the blog posts in content/blog-posts.json into the CMS.
// Idempotent: upserts by slug, safe to re-run.
//
//   node --env-file=.env scripts/import-blog-posts.mjs
//   npm run import:blog
//
// Needs DATABASE_URL pointing at the production Neon database. If you don't have
// it locally, use the deployed app instead — it already has the credential:
//   GET https://mntfuture.com/api/cron/sync-blog?secret=$CRON_SECRET
//
// Post entries come from the "1. BLOG POST" section of the daily content-pack
// docs in Google Drive; see .claude/skills/blog-sync.
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { PrismaClient } from "@prisma/client";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const prisma = new PrismaClient();

function readingMinutes(html) {
  const text = (html || "").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Shape one JSON entry into Prisma Post fields. Kept in sync with the same
// mapping in app/api/cron/sync-blog/route.ts.
export function toPostFields(p) {
  // The source doc's own date drives publishedAt, so the blog index (ordered
  // publishedAt desc) always leads with the newest pack, whatever order the
  // posts happen to get imported in.
  const publishedAt = p.date ? new Date(`${p.date}T00:00:00Z`) : new Date();
  return {
    title: p.title,
    excerpt: p.excerpt ?? null,
    contentHtml: p.contentHtml,
    coverImage: p.coverImage ?? null,
    ogImage: p.coverImage ?? null,
    category: p.category ?? null,
    tags: Array.isArray(p.tags) ? p.tags : [],
    author: p.author || "MnT Future Team",
    metaTitle: p.metaTitle ?? null,
    metaDescription: p.metaDescription ?? null,
    keywords: p.keywords ?? null,
    readingMins: readingMinutes(p.contentHtml),
    status: "PUBLISHED",
    publishedAt,
  };
}

// --build is what the deploy runs. It differs from a manual run in two ways, both
// deliberate:
//   * new posts only — a deploy must never overwrite a post someone has since
//     edited in /admin, so existing slugs are left alone.
//   * never fails the deploy — if the database is unreachable, shipping the site
//     still matters more than publishing; the post can be synced afterwards.
// A manual run (no flag) upserts everything and exits non-zero on failure, which
// is what you want when you are deliberately re-syncing.
const BUILD_MODE = process.argv.includes("--build");

async function main() {
  const posts = JSON.parse(await fs.readFile(path.join(ROOT, "content", "blog-posts.json"), "utf8"));

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const p of posts) {
    const fields = toPostFields(p);
    const date = fields.publishedAt.toISOString().slice(0, 10);

    if (BUILD_MODE) {
      const existing = await prisma.post.findUnique({ where: { slug: p.slug }, select: { id: true } });
      if (existing) {
        skipped++;
        continue;
      }
      await prisma.post.create({ data: { slug: p.slug, ...fields } });
      created++;
      console.log(`✓ Published /blog/${p.slug} — "${p.title}" (${fields.author}, ${date})`);
      continue;
    }

    const before = await prisma.post.findUnique({ where: { slug: p.slug }, select: { id: true } });
    await prisma.post.upsert({ where: { slug: p.slug }, update: fields, create: { slug: p.slug, ...fields } });
    before ? updated++ : created++;
    console.log(`✓ ${before ? "Updated" : "Published"} /blog/${p.slug} — "${p.title}" (${fields.author}, ${date})`);
  }

  const parts = [`${created} new`];
  if (!BUILD_MODE) parts.push(`${updated} updated`);
  if (skipped) parts.push(`${skipped} already live`);
  console.log(`\nblog sync: ${parts.join(", ")} (of ${posts.length} in content/blog-posts.json)`);
}

if (BUILD_MODE && !process.env.DATABASE_URL) {
  // Not an error: local/CI builds legitimately have no database.
  console.log("blog sync: no DATABASE_URL, skipping (site build continues)");
  process.exit(0);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(BUILD_MODE ? `blog sync failed (deploy continues): ${e.message}` : e);
    await prisma.$disconnect();
    process.exit(BUILD_MODE ? 0 : 1);
  });
