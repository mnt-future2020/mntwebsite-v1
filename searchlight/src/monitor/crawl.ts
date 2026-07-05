import type { PageSnapshot } from "../types";

const UA = "SearchlightBot/0.1 (+https://mntfuture.com)";

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

function extract(re: RegExp, html: string): string | null {
  const m = html.match(re);
  return m ? decodeEntities(m[1].trim()) : null;
}

function collectSchemaTypes(node: unknown, out: string[]): void {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) {
    node.forEach((n) => collectSchemaTypes(n, out));
    return;
  }
  const obj = node as Record<string, unknown>;
  if (obj["@graph"]) collectSchemaTypes(obj["@graph"], out);
  const t = obj["@type"];
  if (typeof t === "string") out.push(t);
  else if (Array.isArray(t)) t.forEach((x) => typeof x === "string" && out.push(x));
}

/** Read a sitemap.xml and return same-origin HTML page URLs (capped). */
export async function fetchSitemapUrls(sitemapUrl: string, max: number): Promise<string[]> {
  const res = await fetch(sitemapUrl, { headers: { "user-agent": UA } });
  if (!res.ok) throw new Error(`sitemap ${sitemapUrl} -> ${res.status}`);
  const xml = await res.text();
  const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)]
    .map((m) => decodeEntities(m[1].trim()))
    .filter((u) => /^https?:\/\//.test(u));
  return [...new Set(locs)].slice(0, max);
}

/** Fetch a page and extract the on-page SEO/AEO signals we check. */
export async function fetchSnapshot(url: string, baseUrl: string): Promise<PageSnapshot> {
  try {
    const res = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
    const html = await res.text();

    const title = extract(/<title[^>]*>([\s\S]*?)<\/title>/i, html);
    const metaDescription =
      extract(/<meta[^>]+name=["']description["'][^>]*content=["']([\s\S]*?)["']/i, html) ||
      extract(/<meta[^>]+content=["']([\s\S]*?)["'][^>]*name=["']description["']/i, html);
    const canonical = extract(/<link[^>]+rel=["']canonical["'][^>]*href=["']([^"']+)["']/i, html);
    const h1Count = (html.match(/<h1[\s>]/gi) || []).length;

    const schemaTypes: string[] = [];
    for (const m of html.matchAll(
      /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    )) {
      try {
        collectSchemaTypes(JSON.parse(m[1].trim()), schemaTypes);
      } catch {
        /* malformed JSON-LD — the schema check will still flag the missing type */
      }
    }

    const imgs = html.match(/<img\b[^>]*>/gi) || [];
    let imagesMissingAlt = 0;
    for (const tag of imgs) {
      const alt = tag.match(/\balt\s*=\s*["']([^"']*)["']/i);
      if (!alt || alt[1].trim() === "") imagesMissingAlt++;
    }

    const links = new Set<string>();
    const root = baseUrl.replace(/\/$/, "");
    for (const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)) {
      const href = m[1].trim();
      let abs: string | null = null;
      if (href.startsWith("/") && !href.startsWith("//")) abs = root + href;
      else if (href.startsWith(root)) abs = href;
      if (abs) links.add(abs.split("#")[0].split("?")[0]);
    }

    return {
      url,
      status: res.status,
      ok: res.ok,
      title,
      metaDescription,
      h1Count,
      canonical,
      schemaTypes: [...new Set(schemaTypes)],
      imagesMissingAlt,
      imageCount: imgs.length,
      internalLinks: [...links],
    };
  } catch (e) {
    return {
      url,
      status: 0,
      ok: false,
      title: null,
      metaDescription: null,
      h1Count: 0,
      canonical: null,
      schemaTypes: [],
      imagesMissingAlt: 0,
      imageCount: 0,
      internalLinks: [],
      error: (e as Error).message,
    };
  }
}

/** HEAD (falling back to GET) a URL and return its status; 0 on network error. */
export async function checkLinkStatus(url: string): Promise<number> {
  try {
    let res = await fetch(url, { method: "HEAD", headers: { "user-agent": UA }, redirect: "follow" });
    if (res.status === 405 || res.status === 501) {
      res = await fetch(url, { method: "GET", headers: { "user-agent": UA }, redirect: "follow" });
    }
    return res.status;
  } catch {
    return 0;
  }
}

/** Concurrency-limited map. */
export async function mapLimit<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  const workers = new Array(Math.max(1, Math.min(limit, items.length))).fill(0).map(async () => {
    while (cursor < items.length) {
      const idx = cursor++;
      results[idx] = await fn(items[idx]);
    }
  });
  await Promise.all(workers);
  return results;
}
