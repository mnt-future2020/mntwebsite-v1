import type { Metadata } from "next";
import { getSeoOverride } from "./settings";

// Merge a page's built-in SEO defaults with any admin override (from the SEO panel).
// `base.title` should be the full intended title (including any "| MnT" suffix).
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
    alternates: { canonical: path },
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
