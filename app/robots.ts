import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getSiteSettings } from "@/lib/settings";

// Cache the generated robots.txt for an hour (parity with sitemap.ts).
export const revalidate = 3600;

// Parse the admin's free-text "robotsExtra" into Allow / Disallow path lists.
// Supports lines like "Disallow: /private" or "Allow: /public"; blank lines and
// "#" comments are ignored, and anything else is skipped so a typo can't
// corrupt the file.
function parseExtra(extra: string | null): { allow: string[]; disallow: string[] } {
  const allow: string[] = [];
  const disallow: string[] = [];
  if (!extra) return { allow, disallow };
  for (const raw of extra.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;
    const d = line.match(/^disallow:\s*(\S.*)$/i);
    if (d) {
      disallow.push(d[1].trim());
      continue;
    }
    const a = line.match(/^allow:\s*(\S.*)$/i);
    if (a) allow.push(a[1].trim());
  }
  return { allow, disallow };
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { robotsExtra } = await getSiteSettings();
  const extra = parseExtra(robotsExtra);

  return {
    rules: {
      userAgent: "*",
      allow: ["/", ...extra.allow],
      disallow: ["/admin", "/api/", ...extra.disallow],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
