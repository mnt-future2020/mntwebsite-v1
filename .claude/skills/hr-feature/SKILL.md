---
name: hr-feature
description: Scaffold a new admin/HR feature following this project's conventions — server page + client form + API route. Use when adding a new admin panel screen, HR/CRM form, or CRUD feature to the MnT site.
---

# Add an admin / HR feature

Mirror the existing patterns in `app/admin/(panel)/hr/*` and `components/admin/hr/*`.

## Conventions (must follow)

- **Never define a React component inside another component's render** (e.g. an `Input`/`Field`/`N` helper inside a form body). React gives it a new identity each render, remounts the `<input>`, and the field **loses focus on every keystroke** — users can't type. Define such helpers at **module scope** and pass `value` + `onChange` as props. (This bug already hit `EmployeeForm` and `PayrollManager`.)
- Server pages that read the DB: `export const dynamic = "force-dynamic"`, and wrap Prisma reads in try/catch so the page degrades when the DB is down (see `getOptions`, `<DbNotice />`).
- Client forms: `"use client"`, hold all fields in one `f` state object with an `up(key, val)` setter, and `fetch` JSON to an API route under `app/api/admin/...`.
- Dates: use the `DateField` component (`components/admin/DateField.tsx`) — month/year dropdowns — NOT a raw `<input type="date">` (Chrome has no year picker).
- Money: format INR with `inr()` from `lib/hr.ts`.
- Reuse the shared `field` / `label` / `card` class-name constants used across the admin forms.
- Company-wide configurable settings go on the single-row `OrgSetting` model and are edited in `components/admin/hr/OrgSettingsForm.tsx` (saved via `PUT /api/admin/hr/org`). See the salary-split and leave-allocation fields for the full pattern: schema → `lib/org.ts` → org API → settings form → consumed where needed.
- API routes: `export const runtime = "nodejs"`, parse the body with a helper (cf. `lib/hr-parse.ts`), return `NextResponse.json(...)`, and guard with `getSession()` where access control matters (managers act only on their own team).

## Steps

1. **Page**: `app/admin/(panel)/hr/<feature>/page.tsx` (server, `force-dynamic`) → fetches data → renders a client form/manager.
2. **Form/UI**: `components/admin/hr/<Feature>Form.tsx` or `<Feature>Manager.tsx` (client).
3. **API**: `app/api/admin/hr/<feature>/route.ts` (GET/POST) and `[id]/route.ts` (PATCH/DELETE) as needed.
4. **Schema change?** Use the **db-change** skill (don't forget `npm run db:push` to Neon).
5. **Verify + deploy** via the **deploy** skill (`tsc --noEmit`, `npm run build`, push).

## Self-service (employee portal) counterpart
If the feature has an employee-facing side, add it under `app/portal/*` + `components/portal/*` and an API under `app/api/portal/*`, using `getCurrentEmployee()` from `lib/portal.ts` for the logged-in employee.
