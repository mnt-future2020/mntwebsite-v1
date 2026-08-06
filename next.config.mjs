/**
 * Content-Security-Policy.
 *
 * `'unsafe-inline'` on script-src is not optional here: the JSON-LD blocks and
 * the gtag bootstrap in app/layout.tsx are inline, and Next's own hydration
 * payload is inline too. Moving to a nonce means running every page through
 * middleware, which forfeits the static render for the whole marketing tree —
 * a bad trade for a site with no user-generated HTML. `'unsafe-eval'` is dev
 * only: React Refresh needs it, production does not.
 *
 * The allow-lists are exactly the third parties the site actually loads:
 * GA4/GTM, the Clutch reviews badge, the Product Hunt badge image, Unsplash
 * (next/image remote pattern) and DigitalOcean Spaces (admin uploads).
 */
const csp = (dev) =>
  [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${dev ? " 'unsafe-eval'" : ""} https://*.googletagmanager.com https://*.google-analytics.com https://*.clutch.co`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob: https://images.unsplash.com https://*.digitaloceanspaces.com https://api.producthunt.com https://*.google-analytics.com https://*.googletagmanager.com https://*.clutch.co",
    "font-src 'self' data:",
    "connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://*.clutch.co",
    "frame-src 'self' https://*.clutch.co",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    "upgrade-insecure-requests",
  ].join("; ");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Type-checking is run as a separate step (tsc --noEmit) so the production
  // build stays fast. Flip this to false to gate builds on it.
  typescript: { ignoreBuildErrors: true },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    const dev = process.env.NODE_ENV !== "production";
    return [
      {
        source: "/:path*",
        headers: [
          // Two years and preload-eligible. The site is HTTPS-only already, so
          // the only thing this changes is that the first request can no longer
          // be downgraded.
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // frame-ancestors in the CSP is the modern control; this stays for
          // older browsers that only understand the legacy header.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Nothing on the site uses these, so they are denied outright rather
          // than left at the browser default of "ask".
          {
            key: "Permissions-Policy",
            value:
              "accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(self), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), usb=(), xr-spatial-tracking=()",
          },
          { key: "Content-Security-Policy", value: csp(dev) },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // www and the apex both answered, which split every page into two
      // indexable URLs. The apex is the canonical host (it is what
      // site.url, the sitemap and every canonical tag already say), so www
      // is folded into it here rather than left to the CDN.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.mntfuture.com" }],
        destination: "https://mntfuture.com/:path*",
        permanent: true,
      },
      // The workshop briefly lived at /workshop before its strategy-session rename.
      { source: "/workshop", destination: "/strategy-session", permanent: true },
      // The open-source tools moved under their hub for proper slugs.
      { source: "/agentready", destination: "/open-source/agentready", permanent: true },
      { source: "/vibecheck", destination: "/open-source/vibecheck", permanent: true },
      { source: "/ecommerce-development", destination: "/commerce", permanent: true },
      { source: "/ecommerce-development/custom", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/d2c", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/marketplace", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/shopify", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/mobile-app", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/saas", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/b2b", destination: "/commerce/b2b-wholesale", permanent: true },
      // AI Cleanup is refactor work on a store built with AI tools, not an AI
      // capability, so it moved under commerce.
      { source: "/ai-agents/ai-cleanup", destination: "/commerce/ai-cleanup", permanent: true },
      // Healthcare was a vertical we no longer serve. The page is gone, so the
      // old URL was 404ing: send it home rather than to a commerce page it has
      // nothing to do with.
      { source: "/healthcare-software-development", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
