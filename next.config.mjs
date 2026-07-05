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
      { source: "/ecommerce-development", destination: "/commerce", permanent: true },
      { source: "/ecommerce-development/custom", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/d2c", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/marketplace", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/shopify", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/mobile-app", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/saas", destination: "/commerce/headless-marketplace", permanent: true },
      { source: "/ecommerce-development/b2b", destination: "/commerce/b2b-wholesale", permanent: true },
    ];
  },
};

export default nextConfig;
