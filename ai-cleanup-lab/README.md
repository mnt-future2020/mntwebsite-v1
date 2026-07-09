# 🧪 AI Cleanup Lab

A reproducible R&D lab behind MnT's **AI Cleanup** service. It builds a deliberately
"vibe-coded" store — the kind of code an AI codegen / no-code tool ships and a founder
deploys — then **proves** it's broken (static scan + live exploits + load test), rebuilds
it hardened, and measures the same tests again.

Every number in the [case study](https://mntfuture.com/work/ai-cleanup-lab) comes from
`lab/run-all.js`. No dependencies, Node 20+.

> ⚠️ **`before/server.js` is intentionally vulnerable.** It exists to be attacked in a
> controlled, localhost-only lab (like OWASP Juice Shop / DVWA). It binds to `127.0.0.1`,
> is git-isolated from the MnT app build, and must **never** be deployed or exposed.
> Don't copy its patterns — copy `after/`.

## Run it

```bash
npm run seed     # generate data/store.json (4000 products, 300 orders)
npm run lab      # scan + exploits + load test, BEFORE vs AFTER → lab/results.json
npm run scan     # static scan only (before vs after)
```

## What it measures

| Layer | Tool | Before → After |
|---|---|---|
| **Static (SAST)** | `lab/scan.js` — pattern rules like semgrep | 7 findings (2 critical) → **0** |
| **Exploits** | `lab/exploit.js` — live attacks | 5 / 5 land → **0 / 5** |
| **Load** | `lab/loadtest.js` — 3000 req @ 60 concurrency | ~680 → **~33,000 req/s**; p99 ~650ms → **~12ms** |

## The five vulnerabilities (before → fix)

1. **Code injection (RCE)** — `new Function()` built from the search query → safe substring match.
2. **Hardcoded secret** — `sk_live_…` in source (and leaked in the checkout response) → env var, never returned.
3. **Broken access control** — `/admin/orders` leaks emails + card digits with no auth → bearer-token check, PII redacted.
4. **Reflected XSS** — search echoes input into HTML unescaped → HTML-escaped output.
5. **Price manipulation** — negative `qty` → negative total → validated integer range 1–99.

## Why the throughput jumps ~48×

The `before` store reads and **JSON-parses the entire 733 KB database from disk,
synchronously, on every request** — serializing Node's event loop. The `after` store loads
it **once** at boot into an in-memory index and never touches disk on the hot path. Same
feature set; the difference is architecture, not micro-optimization.

## Layout

```
before/server.js   the vibe-coded store (vulnerable, slow)
after/server.js    the hardened rebuild (same features)
data/seed.js       generates the store
lab/scan.js        static analysis (before vs after)
lab/exploit.js     live exploit prober
lab/loadtest.js    throughput / latency
lab/run-all.js     orchestrates everything → results.json
```
