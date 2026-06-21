import { randomBytes } from "crypto";

// Opaque, URL-safe token used in confirm + unsubscribe links.
export function newToken(): string {
  return randomBytes(24).toString("base64url");
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
