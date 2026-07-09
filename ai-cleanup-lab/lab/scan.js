// Deterministic static scan — inspects a server's source for known-bad patterns,
// the way a real SAST tool (semgrep, CodeQL) flags them. No LLM, no deps.
// Each rule is either a regex or a predicate(src) → boolean (true = vulnerable).
const fs = require("fs");

// Isolate the request-handler body (everything after createServer) so
// "in a handler" checks don't trip on boot-time code.
const handlerOf = (src) => src.slice(src.indexOf("createServer"));

// Pull the block for a given route: from `p === "<route>"` to the next `if (p ===`.
function routeBlock(src, route) {
  const start = src.indexOf(`p === "${route}"`);
  if (start < 0) return "";
  const rest = src.slice(start + 1);
  const next = rest.indexOf("if (p ===");
  return next < 0 ? rest : rest.slice(0, next);
}

const RULES = [
  { id: "code-injection", sev: "critical", note: "Dynamic code from input → RCE", test: (s) => /new Function\(|[^.\w]eval\(/.test(s) },
  { id: "hardcoded-secret", sev: "critical", note: "Secret literal in source", test: (s) => /sk_live_[A-Za-z0-9]+/.test(s) },
  {
    id: "broken-access-control",
    sev: "high",
    note: "Admin data served with no auth check",
    test: (s) => {
      const b = routeBlock(s, "/admin/orders");
      return b !== "" && !/authorization|ADMIN_TOKEN|token\s*!==/.test(b);
    },
  },
  { id: "reflected-xss", sev: "high", note: "User input echoed into HTML unescaped", test: (s) => /<h1>Results for \$\{q\}/.test(s) },
  { id: "sync-fs-on-hot-path", sev: "high", note: "Blocking disk I/O inside a request handler", test: (s) => /readFileSync|writeFileSync/.test(handlerOf(s)) },
  {
    id: "missing-input-validation",
    sev: "medium",
    note: "Unvalidated numeric input on checkout",
    test: (s) => {
      const b = routeBlock(s, "/checkout");
      return b !== "" && !/Number\.isInteger/.test(b);
    },
  },
  { id: "no-rate-limit", sev: "medium", note: "No rate limiting present", test: (s) => !/limited\(/.test(s) },
];

function scan(file) {
  const src = fs.readFileSync(file, "utf8");
  return RULES.filter((r) => r.test(src));
}

function report(file) {
  const f = scan(file);
  const by = (s) => f.filter((x) => x.sev === s).length;
  return { file, total: f.length, critical: by("critical"), high: by("high"), medium: by("medium"), findings: f.map((x) => ({ id: x.id, sev: x.sev, note: x.note })) };
}

module.exports = { scan, report };

if (require.main === module) {
  const path = require("path");
  for (const f of ["before/server.js", "after/server.js"]) {
    const r = report(path.join(__dirname, "..", f));
    console.log(`\n${f} — ${r.total} findings (${r.critical} critical, ${r.high} high, ${r.medium} medium)`);
    for (const x of r.findings) console.log(`  [${x.sev.toUpperCase()}] ${x.id} — ${x.note}`);
  }
}
