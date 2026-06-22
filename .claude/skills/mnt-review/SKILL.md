---
name: mnt-review
description: Review changed code for correctness bugs AND this project's known pitfalls before committing/deploying. Use when asked to review the diff, do a code review, or check changes for the MnT site. Complements the built-in /code-review with MnT-specific checks.
---

# MnT code review

Review the changes (default: the uncommitted git diff; or the files the user names) for correctness bugs and the project-specific pitfalls below. Report findings grouped by severity (Blocker / Should-fix / Nit) with `file:line` and a concrete fix. If nothing is wrong, say so plainly.

## How to run
1. Get the diff: `git diff` (unstaged) + `git diff --cached` (staged); if everything is committed, `git diff origin/main..HEAD` or review the files named by the user.
2. Read each changed file's surrounding context — don't review a hunk in isolation.
3. Check the project-specific list below, then scan for general bugs (null/undefined, off-by-one, wrong await, unhandled error, type mismatch, broken control flow).
4. Verify mechanically when possible: `npx tsc --noEmit` (the build has `ignoreBuildErrors: true`, so tsc is the real type gate) and `npm run build`.

## Project-specific pitfalls (high signal — check every time)

1. **React focus-loss bug (Blocker).** A component defined **inside** another component's render body (e.g. `const Input = (...) => (...)` or `function N(...)` inside a form) gets a new identity each render, so React remounts the `<input>` and the field loses focus / can't be typed. Flag any capitalized component or input-returning helper declared inside a `"use client"` component. Fix: hoist to module scope, pass `value`/`onChange` as props. (Bit `EmployeeForm` and `PayrollManager`.)
2. **Schema change not applied to Neon (Blocker).** If `prisma/schema.prisma` changed, confirm `npm run db:push` was run (DO's build does NOT migrate) and that `lib/org.ts` (for `OrgSetting`) / `lib/hr-parse.ts` (for `Employee`) / the API route were updated to match. A new field in the client but not the DB crashes at runtime.
3. **Secrets / env (Blocker).** No secrets in the diff. `.env` must stay gitignored; only `.env.example` (placeholders) is tracked. Bcrypt hashes and other env values belong in DigitalOcean env vars as **raw** strings (no quotes, no `\$` escaping).
4. **Native date inputs (Should-fix).** Flag new `<input type="date">`; use the `DateField` component (`components/admin/DateField.tsx`) instead — Chrome's native picker has no year dropdown.
5. **DB-reading server page (Should-fix).** New `app/**/page.tsx` that queries Prisma should `export const dynamic = "force-dynamic"` and wrap reads in try/catch (degrade gracefully; cf. `<DbNotice />`).
6. **API auth (Should-fix).** Admin/portal API routes mutating data should guard with `getSession()` and enforce role scoping (managers act only on their own team — see the leave routes).
7. **Money & dates (Nit).** Format INR via `inr()`; format dates via `fmtDate()` / `DateField`. Store dates as `yyyy-mm-dd` strings the API already expects (avoid `toISOString()` day-shift when converting to/from local dates).
8. **Balance/transaction logic (Should-fix).** Leave/payroll balance mutations must use the correct per-type field (`balanceFieldForKind`) and run in a `prisma.$transaction` alongside the status update, with restore-on-cancel symmetry.

## Output
- Blocker / Should-fix / Nit sections, each item: `file:line` — problem — fix.
- End with a one-line verdict: safe to deploy, or list the blockers.
- Offer to apply the fixes (and re-run `tsc`/`build`) if the user wants.
