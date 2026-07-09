// Orchestrator: boot each server, run static scan + live exploits + load test,
// print a before/after comparison, and write results.json (the case-study data).
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const scan = require("./scan");
const { probe } = require("./exploit");
const { run: loadtest } = require("./loadtest");

const ROOT = path.join(__dirname, "..");

function boot(rel, port) {
  return new Promise((resolve, reject) => {
    const child = spawn("node", [path.join(ROOT, rel)], { env: { ...process.env, PORT: String(port) } });
    let done = false;
    const t = setTimeout(() => !done && reject(new Error(`${rel} did not start`)), 5000);
    child.stdout.on("data", (d) => {
      if (String(d).includes("[READY]") && !done) {
        done = true;
        clearTimeout(t);
        resolve(child);
      }
    });
    child.stderr.on("data", (d) => process.stderr.write(d));
  });
}

async function assess(label, rel, port) {
  const child = await boot(rel, port);
  await new Promise((r) => setTimeout(r, 200));
  const sec = scan.report(path.join(ROOT, rel));
  const exploits = await probe(port);
  const load = await loadtest(port, { total: 3000, concurrency: 60 });
  child.kill();
  await new Promise((r) => setTimeout(r, 150));
  return { label, security: { critical: sec.critical, high: sec.high, medium: sec.medium, total: sec.total }, exploited: exploits.filter((e) => e.exploited).length, exploits, load };
}

function seedIfNeeded() {
  const store = path.join(ROOT, "data", "store.json");
  if (!fs.existsSync(store)) require(path.join(ROOT, "data", "seed.js"));
}

(async () => {
  seedIfNeeded();
  console.log("Running AI Cleanup lab — scan + exploits + load test, before vs after…\n");
  const before = await assess("BEFORE", "before/server.js", 4001);
  const after = await assess("AFTER", "after/server.js", 4002);

  const row = (k, b, a) => `  ${k.padEnd(26)} ${String(b).padStart(12)}   →   ${String(a).padStart(12)}`;
  console.log("                                     BEFORE            AFTER");
  console.log(row("SAST findings (total)", before.security.total, after.security.total));
  console.log(row("  critical", before.security.critical, after.security.critical));
  console.log(row("  high", before.security.high, after.security.high));
  console.log(row("Exploits that landed", `${before.exploited}/${before.exploits.length}`, `${after.exploited}/${after.exploits.length}`));
  console.log(row("Throughput (req/s)", before.load.rps, after.load.rps));
  console.log(row("p95 latency (ms)", before.load.p95, after.load.p95));
  console.log(row("p99 latency (ms)", before.load.p99, after.load.p99));
  console.log(row("Error rate (%)", before.load.errorRate, after.load.errorRate));

  const results = { ranAt: new Date().toISOString(), node: process.version, before, after };
  fs.writeFileSync(path.join(ROOT, "lab", "results.json"), JSON.stringify(results, null, 2));
  console.log("\nWrote lab/results.json");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
