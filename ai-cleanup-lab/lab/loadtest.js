// Minimal load tester — fires a fixed number of requests at a set concurrency,
// measures throughput, p95 latency, and errors. Pure Node http, no deps.
const http = require("http");

function once(port, p) {
  const t0 = process.hrtime.bigint();
  return new Promise((resolve) => {
    const r = http.get({ host: "127.0.0.1", port, path: p }, (res) => {
      res.on("data", () => {});
      res.on("end", () => {
        const ms = Number(process.hrtime.bigint() - t0) / 1e6;
        resolve({ ok: res.statusCode < 500, ms });
      });
    });
    r.on("error", () => resolve({ ok: false, ms: Number(process.hrtime.bigint() - t0) / 1e6 }));
    r.setTimeout(5000, () => {
      r.destroy();
      resolve({ ok: false, ms: 5000 });
    });
  });
}

// A read-heavy mix that hammers the search + product endpoints (where the
// before/ store re-reads the whole DB per request).
const PATHS = ["/products", "/products?category=home", "/search?q=Pro", "/search?q=Lamp", "/products?category=beauty"];

async function run(port, { total = 3000, concurrency = 60 } = {}) {
  const lat = [];
  let ok = 0,
    err = 0,
    i = 0;
  const t0 = Date.now();
  async function worker() {
    while (i < total) {
      const n = i++;
      const r = await once(port, PATHS[n % PATHS.length]);
      lat.push(r.ms);
      r.ok ? ok++ : err++;
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));
  const secs = (Date.now() - t0) / 1000;
  lat.sort((a, b) => a - b);
  const pct = (q) => Math.round(lat[Math.min(lat.length - 1, Math.floor(lat.length * q))]);
  return {
    total,
    concurrency,
    seconds: Number(secs.toFixed(2)),
    rps: Math.round(total / secs),
    errors: err,
    errorRate: Number(((err / total) * 100).toFixed(1)),
    p50: pct(0.5),
    p95: pct(0.95),
    p99: pct(0.99),
  };
}

module.exports = { run };

if (require.main === module) {
  const port = process.argv[2] || 4001;
  run(port).then((r) => console.log(`:${port} →`, JSON.stringify(r)));
}
