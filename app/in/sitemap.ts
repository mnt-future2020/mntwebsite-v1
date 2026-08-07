import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { INDIA_CLIENTS } from "@/lib/indiaClients";
import { CLIENT_DETAILS } from "@/lib/indiaClientDetails";

/**
 * India's own sitemap, served at /in/sitemap.xml.
 *
 * The root sitemap already lists these URLs, but Search Console will only
 * accept a sitemap that sits inside the property it is submitted to. A
 * /in/ URL-prefix property therefore cannot be given /sitemap.xml, and this
 * exists so that property gets its own submission and its own coverage report.
 */
export const revalidate = 3600;

const ROUTES = [
  "/in",
  "/in/ecommerce",
  ...[
    "platform-development",
    "d2c-storefront",
    "marketplace",
    "b2b-wholesale",
    "integrations",
    "managed-support",
  ].map((s) => `/in/ecommerce/${s}`),
  "/in/ai",
  ...[
    "consultation",
    "automation",
    "agent-development",
    "custom-applications",
    "forward-deployed-engineering",
  ].map((s) => `/in/ai/${s}`),
  "/in/products",
  ...["ai-desk", "ai-crm", "commerce-india"].map((s) => `/in/products/${s}`),
  "/in/work",
  "/in/work/clients",
  // Only the client projects that actually have a detail page. The four we
  // cannot inspect are entries on the index, not routes.
  ...INDIA_CLIENTS.filter((c) => CLIENT_DETAILS[c.slug]).map(
    (c) => `/in/work/clients/${c.slug}`
  ),
  "/in/about",
  "/in/contact",
  "/in/strategy-session",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: path === "/in" ? "weekly" : "monthly",
    priority: path === "/in" ? 1 : path.split("/").length === 3 ? 0.8 : 0.6,
  }));
}
