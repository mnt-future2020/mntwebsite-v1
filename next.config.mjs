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
};

export default nextConfig;
