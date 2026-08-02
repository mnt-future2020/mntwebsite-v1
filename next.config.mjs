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
  async redirects() {
    return [
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
