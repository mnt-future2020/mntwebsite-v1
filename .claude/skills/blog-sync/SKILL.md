---
name: blog-sync
description: Sync new/updated blog posts from the MnT Future Google Drive content-pack folder onto the website, with a house-style cover thumbnail. Use when asked to check Drive for new blog posts, publish the daily content pack, or add a post to the blog.
---

# Sync blog posts from Google Drive

Source folder (Google Drive):
`https://drive.google.com/drive/folders/1UcwlBt7UYbhUCmTLv7GlKwrqFuWITxSv`

Each "MnT Content Pack — YYYY-MM-DD — <theme>" doc holds several assets. **Only
section `1. BLOG POST` goes on the website** — sections 2–6 (LinkedIn, Instagram,
Facebook, publishing notes) are for social channels, not the site.

## Steps

1. **List the folder** — `mcp__Google-Drive__search_files` with
   `parentId = '1UcwlBt7UYbhUCmTLv7GlKwrqFuWITxSv'`. Compare `modifiedTime`
   against what's already in `scripts/import-blog-posts.mjs`.
2. **Read the Topic Log** (`MnT Content — Topic Log (do not delete)`) to see
   which angles are already published; skip anything already covered.
3. **Read the pack doc** and pull from section 1: SEO Title, Meta Description,
   Slug, Primary/Secondary Keywords, the `#` headline, and the body.
4. **Convert the body to HTML** — `#`/`##`/`###` → `<h1 is the post title, so h2>/<h3>`,
   `-` lists → `<ul>`, numbered → `<ol>`, `[ANSWER-ENGINE BLOCK …]` → `<blockquote>`.
   Drop the doc's `\` markdown escapes.
5. **Fix the internal links.** The docs reference routes that don't all exist.
   Map them to real ones — verify with a quick grep before trusting:
   - `mntfuture.com/services` → **`/ai-agents`** (there is no `/services` route)
   - `mntfuture.com/work` (MnT Commerce) → **`/work/mnt-commerce`**
   - `mntfuture.com/contact` → `/contact`
6. **Generate the cover thumbnail** in the house style:
   ```bash
   node scripts/generate-blog-thumbnail.mjs \
     --slug <slug> --kicker "AI COMMERCE" \
     --line1 "<punchy line, white>" --line2 "<second line, blue>" \
     --mono1 "<key stat>" --badge1 "<SHORT TAG>" \
     --mono2 "<supporting stat>" --badge2 "<SOURCE>"
   ```
   Writes `public/blog/blog-<slug>.png` (1600×800). Keep the headline to two
   short lines — line 1 must stay under ~1350px, i.e. roughly 36 characters.
   Kicker is usually `AI COMMERCE` or `AGENTIC COMMERCE`.
7. **Add an entry to `scripts/import-blog-posts.mjs`** (`POSTS` array) with:
   - `date:` the doc's own **Date:** field — this drives `publishedAt`, which is
     what makes the newest post sort first on `/blog`. Never leave it to "now"
     when the doc has a date.
   - `author: "CEO Udhayaseelan"` — the standing byline for these posts.
   - `coverImage:` the PNG from step 6 (also used as `ogImage`).
8. **Publish**: `npm run import:blog` (needs the production `DATABASE_URL` in
   `.env`; the upsert is keyed on slug, so re-running is safe).
9. **Append a row to the Drive Topic Log** so tomorrow's pack doesn't repeat the
   angle: `YYYY-MM-DD | Theme | Blog headline | Angle | Primary keyword`.
10. **Deploy** — follow the **deploy** skill (typecheck, build, push to `main`).

## Conventions that must hold

- **Newest first.** `/blog` orders by `publishedAt desc` — correct dates are the
  only thing keeping the order right. Don't reorder in the UI.
- **Byline + date show on both** the blog index card and the post header.
- **Author schema** — `app/blog/[slug]/page.tsx` emits `Person` for a named
  byline and `Organization` only for "… Team"/"MnT Future". Leave that alone.
- **One thumbnail per post**, same 1600×800 blueprint style. Don't hand-make
  covers; use the generator so spacing and colour stay consistent.

## Gotchas

- The generator needs Playwright + Chromium. Fonts are inlined in
  `scripts/assets/blog-thumb-fonts.css`, so no network is required at run time.
- `next build` ignores type errors (`typescript.ignoreBuildErrors: true`) —
  always run `npx tsc --noEmit` separately.
- If there is no production `DATABASE_URL` in the environment, the post can't go
  live from here. Commit the script + thumbnail, then say plainly that publishing
  still needs a run against the prod DB — don't report it as published.
