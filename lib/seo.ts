import type { Metadata } from "next";
import { getSeoOverride } from "./settings";
import { counterpart, regionFromPath } from "./regions";
import { site } from "./site";

/**
 * Share card used by every page that does not ship its own.
 *
 * The root layout's `openGraph` block does not reach these pages: Next replaces
 * the parent object wholesale when a page returns its own `openGraph`, it does
 * not deep-merge the keys. Every page built through `resolveMetadata` therefore
 * has to restate the defaults, or it ships an og:tag block with no og:image —
 * which is what an audit found on 66 of the site's pages, i.e. a bare link
 * preview everywhere they were shared.
 */
const DEFAULT_OG_IMAGE = `${site.url}/og-default.png`;

/**
 * hreflang for a path that exists in both markets.
 *
 * Only emitted when the counterpart is a genuine pair, not the fallback home:
 * declaring an alternate that is really a different page is worse than
 * declaring none, because Google will swap the wrong URL into results. Both
 * sides must list each other, which they do because both are built from the
 * same pair table.
 */
function languages(path: string): Record<string, string> | undefined {
  const region = regionFromPath(path);
  const other = region === "us" ? "in" : "us";
  const alt = counterpart(path, other);
  const fallback = other === "in" ? "/in" : "/";
  if (alt === fallback && !(path === "/" || path === "/in")) return undefined;

  const us = region === "us" ? path : alt;
  const ind = region === "in" ? path : alt;
  return { "en-US": us, "en-IN": ind, "x-default": us };
}

// Merge a page's built-in SEO defaults with any admin override (from the SEO panel).
// `base.title` should be the full intended title (including any "| MnT Future" suffix).
export async function resolveMetadata(
  path: string,
  base: { title: string; description: string; ogImage?: string }
): Promise<Metadata> {
  const o = await getSeoOverride(path);
  const title = o?.title || base.title;
  const description = o?.description || base.description;
  const ogImage = o?.ogImage || base.ogImage || DEFAULT_OG_IMAGE;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: languages(path) },
    // type and siteName are restated for the same reason as the image: the
    // page's object replaces the layout's rather than extending it.
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: path,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
    robots: o?.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
