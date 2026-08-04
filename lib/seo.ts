import type { Metadata } from "next";
import { getSeoOverride } from "./settings";
import { counterpart, regionFromPath } from "./regions";

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
  const ogImage = o?.ogImage || base.ogImage;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path, languages: languages(path) },
    openGraph: {
      title,
      description,
      url: path,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    twitter: {
      title,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: o?.noindex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
