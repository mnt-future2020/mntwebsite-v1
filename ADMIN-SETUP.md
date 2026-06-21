# MnT Admin / CMS — Setup Guide

The site now ships with a full admin panel: a dynamic **blog CMS** (SEO-friendly, rich-text),
**lead capture** to a database, and site-wide **SEO management**.

Stack: Next.js (App Router) · **PostgreSQL + Prisma** · rich-text editor (Tiptap) · JWT auth.

---

## 1. Prerequisites

- Node 18+
- A PostgreSQL database. Free options that work locally **and** on Vercel:
  [Neon](https://neon.tech) or [Supabase](https://supabase.com). Copy the connection string.

## 2. Configure environment

```bash
cp .env.example .env
```

Fill in `.env`:

| Var | What |
|---|---|
| `DATABASE_URL` | Your Postgres connection string |
| `AUTH_SECRET` | Any long random string (`openssl rand -base64 32`) |
| `ADMIN_EMAIL` | The email you'll log in with |
| `ADMIN_PASSWORD_HASH` | Generated in step 4 |
| `NEXT_PUBLIC_SITE_URL` | e.g. `https://mntfuture.com` (or `http://localhost:3000` in dev) |
| `SMTP_*` / `MAIL_*` | Optional — contact-form email (leads are still saved without it) |

## 3. Install

```bash
npm install        # also runs `prisma generate`
```

## 4. Create your admin password

```bash
npm run hash -- "your-strong-password"
```

Copy the printed hash into `ADMIN_PASSWORD_HASH` in `.env`.

## 5. Create the database tables

```bash
npx prisma migrate dev --name init
```

## 6. Run

```bash
npm run dev
```

Open **http://localhost:3000/admin/login** and sign in with `ADMIN_EMAIL` + your password.

---

## What's in the admin

- **Dashboard** — published posts, drafts, total + new leads at a glance.
- **Blog posts** — create/edit with a rich-text editor (headings, lists, links, images, quotes,
  code). Each post has its own SEO panel (meta title/description, OG image, canonical, keywords,
  noindex), cover image, category, tags, author, and draft/publish. Slugs auto-generate.
- **Leads** — every contact-form submission is saved here automatically. Update status
  (New → Contacted → Qualified → Won/Lost), read the full message, and **export to CSV**.
- **SEO** — per-page title/description/OG/noindex overrides for the main marketing pages.
- **Settings** — site name, title template, default description/OG, **GA4 Measurement ID**,
  **Google + Bing verification**, and robots directives.

## Public blog & SEO

- `/blog` — index of published posts.
- `/blog/[slug]` — each post renders with `generateMetadata` (per-post SEO), **Article +
  BreadcrumbList JSON-LD**, semantic prose, cover image and reading time.
- Published posts are **automatically added to `/sitemap.xml`** and the **RSS feed at `/feed.xml`**.
- `robots.txt` disallows `/admin` and `/api/`.

## How it behaves

- **Leads are saved even before SMTP is configured** — wire `SMTP_*` later for email alerts;
  the database capture works as soon as `DATABASE_URL` is set.
- **Blog SEO is live** (server-rendered with revalidation). **Static-page SEO overrides** apply on
  the next build/deploy (or set up on-demand revalidation) since those pages are statically rendered.
- The whole site **degrades gracefully without a database** — the marketing pages render normally;
  only the blog/admin need the DB.

## Deploying (Vercel + Neon/Supabase)

1. Push to GitHub, import in Vercel.
2. Add all `.env` vars in Vercel project settings.
3. Build command is already `prisma generate && next build`.
4. Run the migration against your production DB once: `npx prisma migrate deploy`.

## Security notes

- Admin routes (`/admin`, `/api/admin`) are protected by middleware (JWT cookie).
- The password is bcrypt-hashed; the session is a signed, httpOnly cookie (7-day expiry).
- Rich-text content is authored by the trusted admin and rendered as HTML — keep admin
  credentials private. (Add server-side HTML sanitisation if you ever open authoring to others.)
