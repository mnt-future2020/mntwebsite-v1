import slugify from "slugify";

export function toSlug(s: string) {
  return slugify(s || "", { lower: true, strict: true, trim: true });
}

export function readingMinutes(html: string) {
  const text = (html || "").replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// Server-side sanitizer for rich-text (TipTap) post content. Post bodies are
// admin-authored but rendered with dangerouslySetInnerHTML on the public blog,
// so we strip anything executable before storing: defense-in-depth against a
// malicious/compromised admin or a non-editor client. This is a pragmatic,
// self-contained pass (no jsdom): it removes the practical stored-XSS vectors
// for the limited tag set the editor emits. For untrusted/anonymous HTML, swap
// in a DOM-based sanitizer (e.g. DOMPurify) instead.
const DANGEROUS_TAGS = [
  "script", "style", "iframe", "object", "embed", "form", "input", "button",
  "link", "meta", "base", "svg", "math", "noscript", "template", "frame", "frameset",
];

export function sanitizePostHtml(html: string): string {
  if (!html) return "";
  let out = html;
  // 1) Remove dangerous elements together with their inner content, plus any
  //    stray self-closing/unclosed opening tags.
  for (const tag of DANGEROUS_TAGS) {
    out = out.replace(new RegExp(`<${tag}\\b[\\s\\S]*?</${tag}\\s*>`, "gi"), "");
    out = out.replace(new RegExp(`</?${tag}\\b[^>]*>`, "gi"), "");
  }
  // 2) Strip inline event handlers (onclick, onerror, …) in any quoting style.
  out = out.replace(/\son[a-z]+\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\son[a-z]+\s*=\s*'[^']*'/gi, "");
  out = out.replace(/\son[a-z]+\s*=\s*[^\s>]+/gi, "");
  // 3) Neutralize dangerous URL protocols in href/src (allow data:image/* only).
  const badProto = /^\s*(?:javascript|vbscript|data(?!:image\/)):/i;
  out = out.replace(/\s(href|src)\s*=\s*"([^"]*)"/gi, (m, attr, url) =>
    badProto.test(url) ? ` ${attr}="#"` : m
  );
  out = out.replace(/\s(href|src)\s*=\s*'([^']*)'/gi, (m, attr, url) =>
    badProto.test(url) ? ` ${attr}='#'` : m
  );
  // 4) Drop inline styles (avoid CSS-based exfiltration / legacy expression()).
  out = out.replace(/\sstyle\s*=\s*"[^"]*"/gi, "");
  out = out.replace(/\sstyle\s*=\s*'[^']*'/gi, "");
  return out;
}

export function formatDate(d: Date | string | null | undefined) {
  if (!d) return "";
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}
