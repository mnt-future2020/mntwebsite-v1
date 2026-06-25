import type { MetadataRoute } from "next";

// PWA manifest — lets employees install the workspace to their home screen and
// run it as a standalone app. Next.js serves this at /manifest.webmanifest and
// auto-links it from <head>.
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/portal",
    name: "MnT Workspace",
    short_name: "MnT",
    description:
      "MnT employee & admin workspace — attendance, leave, payslips, projects and more.",
    start_url: "/portal",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#2095F1",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
