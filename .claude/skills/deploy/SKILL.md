---
name: deploy
description: Verify, commit, and deploy the MnT site. Use when the user asks to deploy, ship, release, or "push the code". Runs typecheck + production build, commits, and pushes to GitHub — DigitalOcean App Platform auto-redeploys from the main branch.
---

# Deploy the MnT site

This project deploys via **DigitalOcean App Platform**, which **auto-redeploys on every push to `main`** of the GitHub repo `mnt-future2020/mntwebsite-v1`. There is no separate deploy command — pushing IS deploying.

## Steps

1. **Verify before pushing** — the production build must be clean:
   - `npx tsc --noEmit` — typecheck. IMPORTANT: `next.config.mjs` sets `typescript.ignoreBuildErrors: true`, so `next build` will NOT fail on type errors. Always run `tsc` explicitly.
   - `npm run build` — confirm `✓ Compiled successfully`.
   - Known pre-existing error in `app/admin/(panel)/settings/page.tsx` (SiteSetting cast) — ignore it; don't "fix" unless asked.
2. **If `prisma/schema.prisma` changed** — run the **db-change** flow FIRST. DigitalOcean's build runs `prisma generate` but NOT migrations, so the Neon DB must already have the new columns or the app breaks at runtime.
3. **Commit** with a clear message. End the commit message with:
   `Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>`
4. **Push**: `git push origin main`. Never force-push.
5. **Confirm**: tell the user it's pushed and DO will redeploy (~3–6 min); they can watch App Platform → Deployments.

## Secrets / safety
- `.env` is gitignored — never commit it. Only `.env.example` (placeholders) is tracked.
- Real env vars live in DigitalOcean → App → Settings → Environment Variables, not the repo.
- Bcrypt hashes there must be the **raw** `$2a$...` value — no surrounding quotes, no `\$` backslash-escaping (that breaks admin login).
- `NEXT_PUBLIC_SITE_URL` must be `https://mntfuture.com` in production.
