---
name: db-change
description: Safely change the Prisma schema and apply it to the Neon database. Use when adding or editing models, columns, or enums in prisma/schema.prisma. Covers the DigitalOcean + Neon gotcha that deploys do NOT run migrations.
---

# Change the database schema (Prisma + Neon)

**Critical gotcha:** DigitalOcean App Platform's build runs `prisma generate && next build` — it does **NOT** run migrations. A schema change deployed without applying it to Neon breaks at runtime, because the generated Prisma client expects columns the database doesn't have. Always apply the schema to Neon **before or alongside** the deploy.

## Steps

1. Edit `prisma/schema.prisma`. Prefer **additive, non-destructive** changes: new columns must be nullable or have `@default(...)` so existing rows stay valid on a live DB.
2. Apply to Neon + regenerate the client:
   ```
   npm run db:push
   ```
   This reads `.env`, syncs the schema to Neon (`prisma db push`), and runs `prisma generate`. This project uses `db push`, **not** migration files.
3. Update the TypeScript layer to match the new fields:
   - `lib/org.ts` — for an `OrgSetting` field: add to the `OrgSettings` type, `DEFAULT_ORG`, and the `getOrgSettings` mapping.
   - `lib/hr-parse.ts` — for an `Employee` field saved from a form.
   - The relevant form component and API route.
4. `npx tsc --noEmit` — confirm the regenerated client types line up.
5. Deploy via the **deploy** skill.

## Notes
- `DATABASE_URL` (pooled `-pooler` URL) and `DIRECT_URL` (direct) both point to Neon; `db push` / migrations use `DIRECT_URL`.
- Adding columns with defaults is safe on the live DB. **Dropping or renaming** columns is destructive — confirm with the user first.
- `OrgSetting` is a single row (`id = 1`); settings degrade to `DEFAULT_ORG` when the DB is unreachable.
- After adding per-record columns, existing rows get the default (e.g. new leave-balance columns start at 0) — the user may need to backfill them in the admin UI.
