// Minimal service worker — makes the app installable (PWA) and shows a graceful
// offline page for navigations. It deliberately does NOT cache authenticated
// pages or API responses, to avoid serving stale or cross-user data.
const CACHE = "mnt-pwa-v1";
const OFFLINE_URL = "/offline.html";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.add(OFFLINE_URL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  // Only intervene on page navigations: serve the network, fall back to the
  // offline page if the device is offline. Everything else is left untouched.
  if (req.method === "GET" && req.mode === "navigate") {
    event.respondWith(fetch(req).catch(() => caches.match(OFFLINE_URL)));
  }
});
