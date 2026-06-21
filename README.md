# MnT — Magizh NexGen Technologies

Marketing website **+ admin CMS** for **MnT (Magizh NexGen Technologies)** — a healthcare &
e-commerce software development company. Built with **Next.js (App Router) + TypeScript +
Tailwind CSS**, with **PostgreSQL + Prisma** powering the blog, leads and SEO management.

Brand primary colour: **#2095F1** (extracted from the MnT logo).

## Admin / CMS

A full admin panel lives at **`/admin`** — dynamic SEO blog, lead capture, and site-wide SEO
management. **See [`ADMIN-SETUP.md`](./ADMIN-SETUP.md) for the database + admin setup.**

## Getting started

```bash
npm install
cp .env.example .env          # fill in DATABASE_URL, AUTH_SECRET, admin + SMTP
npm run hash -- "password"    # → put the hash in ADMIN_PASSWORD_HASH
npx prisma migrate dev --name init
npm run dev                   # http://localhost:3000  ·  admin: /admin/login
```

### Contact form / email (nodemailer)

The contact form posts to `app/api/contact/route.ts`, which sends mail via
[nodemailer](https://nodemailer.com) using the SMTP settings in `.env.local`
(see `.env.example`). Enquiries are delivered to `info@mntfuture.com`. Until the
env vars are set, the form will return a friendly error on submit.

Build for production:

```bash
npm run build
npm run start
```

## Pages (Phase 1 — per the SEO blueprint)

| Route | Page |
|---|---|
| `/` | Home — two-vertical positioning |
| `/healthcare-software-development` | Healthcare hub (★ ranks for "healthcare software development company") |
| `/ecommerce-development` | E-Commerce hub (★ ranks for "ecommerce development company") |
| `/security-compliance` | HIPAA · ABDM · ISO 27001 · SOC 2 · GDPR |
| `/about` | About MnT |
| `/contact` | Start a project / discovery call |

### Service sub-pages (7 per industry — Semrush-researched SEO)

Healthcare: `/healthcare-software-development/{custom,telemedicine,ehr-emr,hospital-management,ai-healthcare,abdm-fhir,saas}`

E-Commerce: `/ecommerce-development/{custom,d2c,marketplace,shopify,b2b,mobile-app,saas}`

Each has its own primary keyword (from live Semrush volume/CPC data), title/meta, an
answer-first intro for AEO, `Service` + `FAQPage` + `BreadcrumbList` schema, and internal
links up to its hub and across to sibling services. Vertical SaaS lives inside each
industry (for funded startups), not as a separate vertical.

Auto-generated: `/sitemap.xml`, `/robots.txt`.

## Structure

```
app/                     Routes + SEO metadata + JSON-LD schema
components/              Header, Footer, Hero, HubPage, FAQ, ContactForm, blocks, Icon
lib/site.ts             Site config + navigation data
public/                 Logo assets (mnt-logo.png, mnt-logo-white.png)
tailwind.config.ts      Brand tokens (#2095F1 scale, navy, fonts)
```

## SEO built in

- Per-page `<title>` / meta descriptions (≤60 / ≤155 chars) from the blueprint.
- `Organization` schema (site-wide), `Service` + `FAQPage` schema on hub pages.
- Breadcrumbs, canonical URLs, Open Graph + Twitter cards.
- Semantic headings (one H1 per page), accessible nav and forms.

## To do next (Phase 2+)

- Set SMTP env vars in `.env.local` so the contact form can send mail.
- Replace the Unsplash placeholder photography (`images` map in `lib/site.ts`) with
  your own brand/case-study imagery, and host locally in `public/` for full control.
- Confirm the social handles in `lib/site.ts` (Instagram / LinkedIn / Facebook).
- Build the pillar guides / blog clusters (see the SEO blueprint, §7).
- Replace placeholder case studies with real ones.
- Add OG share images and a favicon set.

---
Prepared for MnT. Design system and content derived from the MnT Website SEO Blueprint.
