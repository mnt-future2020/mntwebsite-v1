import slugify from "slugify";

export function toSlug(s: string) {
  return slugify(s || "", { lower: true, strict: true, trim: true });
}

export function readingMinutes(html: string) {
  const text = (html || "").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(d: Date | string | null | undefined) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
