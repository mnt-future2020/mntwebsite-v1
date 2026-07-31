import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { site } from "@/lib/site";

/**
 * Spam defence for the public forms.
 *
 * The strategy-session form was being hit by a bot: random-string name,
 * company and message ("aRZyuczrWsaEnSsXxZNiPg"), every <select> left on its
 * default, ~16 hits a day in bursts. Each hit also fired a confirmation mail
 * at the harvested (real, third-party) address in the payload, which turns the
 * site into a mail relay and burns the sending domain's reputation.
 *
 * The guard is layered so a bot has to beat all of it, and none of it asks a
 * human to prove anything — no captcha, no extra click:
 *
 *   1. Origin      — a browser always sends it on a same-origin POST.
 *   2. Form token  — HMAC-signed, minted by GET /api/form-token when the form
 *                    mounts, single use, valid only after MIN_FILL_MS. This is
 *                    what stops a captured JSON payload being replayed.
 *   3. Honeypot    — a field that is off-screen for humans and irresistible
 *                    to anything filling inputs by name.
 *   4. Rate limit  — per IP and global, so a flood can never reach the mailer.
 *   5. Content     — random-string gibberish and link stuffing, as a backstop.
 *
 * Rejections are silent: the caller answers 200 OK so the bot sees success and
 * has nothing to tune against. Rate limiting is the exception — that gets a
 * real 429, because the person hitting it is usually human.
 */

const SECRET =
  process.env.FORM_TOKEN_SECRET ||
  process.env.AUTH_SECRET ||
  "dev-insecure-secret-change-me-in-env";

/** Nobody reads a form and submits it this fast. Bots post the instant they can. */
const MIN_FILL_MS = 2_500;
/** A token outlives a long, thoughtful fill but not an overnight tab. */
const MAX_TOKEN_AGE_MS = 4 * 60 * 60 * 1000;

// ─── Form token ─────────────────────────────────────────────────────────────

function sign(payload: string): string {
  return createHmac("sha256", SECRET).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function issueFormToken(): string {
  const payload = `${Date.now()}.${randomBytes(9).toString("base64url")}`;
  return `${payload}.${sign(payload)}`;
}

/** Nonces already spent, so a token works exactly once. */
const spentNonces = new Map<string, number>();

function prune(map: Map<string, number>, maxAgeMs: number) {
  if (map.size < 5_000) return;
  const cutoff = Date.now() - maxAgeMs;
  for (const [k, t] of map) if (t < cutoff) map.delete(k);
}

type TokenVerdict = "ok" | "missing" | "bad-signature" | "too-fast" | "expired" | "replayed";

export function verifyFormToken(token: unknown): TokenVerdict {
  if (typeof token !== "string" || !token || token.length > 256) return "missing";
  const parts = token.split(".");
  if (parts.length !== 3) return "bad-signature";
  const [issuedAt, nonce, sig] = parts;
  if (!safeEqual(sig, sign(`${issuedAt}.${nonce}`))) return "bad-signature";

  const issued = Number(issuedAt);
  if (!Number.isFinite(issued)) return "bad-signature";
  const age = Date.now() - issued;
  // A negative age means a clock skew or a forged stamp: treat it as too fast.
  if (age < MIN_FILL_MS) return "too-fast";
  if (age > MAX_TOKEN_AGE_MS) return "expired";

  prune(spentNonces, MAX_TOKEN_AGE_MS);
  if (spentNonces.has(nonce)) return "replayed";
  spentNonces.set(nonce, Date.now());
  return "ok";
}

// ─── Rate limiting ──────────────────────────────────────────────────────────
// In-memory sliding windows. Per-instance, which is fine: the point is to cap
// what one source can send, and a restart only ever loses history.

const windows = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (windows.get(key) || []).filter((t) => now - t < windowMs);
  if (hits.length >= limit) {
    windows.set(key, hits);
    return false;
  }
  hits.push(now);
  windows.set(key, hits);

  if (windows.size > 10_000) {
    for (const [k, v] of windows) if (!v.length || now - v[v.length - 1] > 60 * 60 * 1000) windows.delete(k);
  }
  return true;
}

export function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

// ─── Origin ─────────────────────────────────────────────────────────────────

/**
 * A same-origin POST from our own form always carries Origin. A mismatch is a
 * cross-site script posting at us; a missing header is left to the other
 * layers, since a handful of privacy tools strip it.
 */
export function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;

  let host: string;
  try {
    host = new URL(origin).host;
  } catch {
    return false;
  }

  const allowed = new Set<string>();
  const add = (value: string | null | undefined) => {
    if (!value) return;
    try {
      allowed.add(new URL(value.includes("://") ? value : `https://${value}`).host);
    } catch {
      /* ignore malformed config */
    }
  };
  add(req.headers.get("host"));
  add(process.env.NEXT_PUBLIC_SITE_URL);
  add(site.url);
  add(`www.${site.domain}`);

  return allowed.has(host);
}

// ─── Honeypot ───────────────────────────────────────────────────────────────

/** The field is off-screen and unlabelled: only a script ever puts text in it. */
export function honeypotTripped(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

// ─── Content screening ──────────────────────────────────────────────────────

/**
 * True for the machine-generated strings this bot sends — one long word with
 * the letter distribution of a random generator rather than of a language.
 * Domains, emails and URLs are exempt: they are legitimately space-free.
 */
function isRandomish(raw: string): boolean {
  const s = raw.trim();
  if (s.length < 10 || /\s/.test(s)) return false;
  if (/[.@:/\\]/.test(s)) return false;
  if (!/^[A-Za-z0-9_-]+$/.test(s)) return false;

  const letters = s.replace(/[^A-Za-z]/g, "");
  if (letters.length < 8) return false;

  const vowels = (letters.match(/[aeiouAEIOU]/g) || []).length;
  const vowelRatio = vowels / letters.length;
  const longConsonantRun = /[^aeiouAEIOU]{5,}/.test(letters);
  const caseFlips = (s.match(/[a-z][A-Z]/g) || []).length;

  return vowelRatio < 0.26 || longConsonantRun || caseFlips >= 3;
}

const SPAM_WORDS =
  /\b(viagra|cialis|casino|porn|escorts?|payday\s*loans?|crypto\s*giveaway|forex\s*signals)\b/i;

/**
 * Signals that the text was not written by a person with an enquiry. Callers
 * treat two or more as spam, so a single quirky lead is never thrown away.
 */
export function screenContent(fields: {
  name?: string;
  company?: string;
  message?: string;
}): string[] {
  const name = (fields.name || "").trim();
  const company = (fields.company || "").trim();
  const message = (fields.message || "").trim();
  const reasons: string[] = [];

  if (isRandomish(message)) reasons.push("message-random-string");
  if (isRandomish(company)) reasons.push("company-random-string");
  if (name.split(/\s+/).some(isRandomish)) reasons.push("name-random-string");

  const links = (message.match(/https?:\/\/|\bwww\.|\[url|\[link/gi) || []).length;
  if (links >= 3) reasons.push("link-stuffed");
  if (SPAM_WORDS.test(`${message} ${company}`)) reasons.push("spam-keyword");
  // Cyrillic in an English-only enquiry form is near-always bulk spam.
  if (/[Ѐ-ӿ]/.test(`${name} ${company} ${message}`)) reasons.push("non-latin-script");

  return reasons;
}

// ─── The guard ──────────────────────────────────────────────────────────────

export type GuardVerdict =
  | { ok: true }
  | {
      ok: false;
      /** Machine-readable cause, for the server log. */
      reason: string;
      /** "silent": answer 200 so the bot learns nothing. */
      action: "silent" | "rate-limited" | "retry";
      /**
       * True when nothing about the content itself looked automated, i.e. this
       * could be a real person our plumbing failed. Callers keep those for review
       * instead of dropping them.
       */
      couldBeHuman: boolean;
    };

export function guardSubmission(
  req: Request,
  opts: {
    /** Distinguishes the rate-limit buckets of one form from another. */
    scope: string;
    token?: unknown;
    honeypot?: unknown;
    content?: { name?: string; company?: string; message?: string };
    /** Submissions allowed from one IP per 10 minutes. */
    perIp?: number;
    /** Submissions allowed from everyone per hour: a flood ceiling. */
    perHour?: number;
  }
): GuardVerdict {
  const ip = clientIp(req);
  const contentReasons = opts.content ? screenContent(opts.content) : [];
  const couldBeHuman = contentReasons.length === 0;

  // Bot checks run before the rate limit on purpose. Offices and mobile
  // carriers put many people behind one IP, so that budget has to be spent by
  // plausible humans only — a bot flood must not lock a real visitor out.
  if (!originAllowed(req)) {
    return { ok: false, reason: "bad-origin", action: "silent", couldBeHuman: false };
  }
  if (honeypotTripped(opts.honeypot)) {
    return { ok: false, reason: "honeypot", action: "silent", couldBeHuman: false };
  }

  const token = verifyFormToken(opts.token);
  if (token === "expired") {
    // A real person left the tab open. Let them submit again with a fresh token.
    return { ok: false, reason: "token-expired", action: "retry", couldBeHuman: true };
  }
  if (token !== "ok") {
    return { ok: false, reason: `token-${token}`, action: "silent", couldBeHuman };
  }

  if (contentReasons.length >= 2) {
    return {
      ok: false,
      reason: `content:${contentReasons.join("+")}`,
      action: "silent",
      couldBeHuman: false,
    };
  }

  // Everything above passed, so this looks like a person: a real 429 is the
  // honest answer, and it still caps what one source can put in the inbox.
  if (!rateLimit(`${opts.scope}:ip:${ip}`, opts.perIp ?? 5, 10 * 60 * 1000)) {
    return { ok: false, reason: "rate-limit-ip", action: "rate-limited", couldBeHuman: true };
  }
  // Blast-radius ceiling: whatever happens, the mailer is never asked to send
  // more than this in an hour.
  if (!rateLimit(`${opts.scope}:global`, opts.perHour ?? 60, 60 * 60 * 1000)) {
    return { ok: false, reason: "rate-limit-global", action: "silent", couldBeHuman: true };
  }

  return { ok: true };
}

/**
 * Source tag for submissions the filter held back but that could still be
 * human. They are kept out of the main leads list and reviewable at
 * /admin/leads?held=1, so a false positive is recoverable rather than lost.
 */
export const BLOCKED_LEAD_SOURCE = "contact-form-held";

/** Message shown when a human trips the rate limit. */
export const RATE_LIMITED_MESSAGE =
  "You've sent this a few times already. Give it a few minutes, or email us directly at info@mntfuture.com.";

/** Message shown when the form sat open long enough for its token to expire. */
export const TOKEN_EXPIRED_MESSAGE =
  "This form was open a while and timed out. Please submit once more: your text is still here.";
