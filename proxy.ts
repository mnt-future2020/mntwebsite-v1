import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { keyForPath, firstAllowedPath, hasAdminAccess } from "@/lib/permissions";

const SESSION_COOKIE = "mnt_admin";

function secret() {
  return new TextEncoder().encode(
    process.env.AUTH_SECRET || "dev-insecure-secret-change-me-in-env"
  );
}

async function getAuth(req: NextRequest): Promise<{ role: string; perms: string[] } | null> {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return {
      role: String(payload.role || ""),
      perms: Array.isArray(payload.perms) ? (payload.perms as string[]) : [],
    };
  } catch {
    return null;
  }
}

function redirectLogin(req: NextRequest, from: string) {
  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.searchParams.set("from", from);
  return NextResponse.redirect(url);
}

function redirectTo(req: NextRequest, path: string) {
  const url = req.nextUrl.clone();
  url.pathname = path;
  url.search = "";
  return NextResponse.redirect(url);
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Public auth endpoints (login + logout work for everyone).
  if (
    pathname === "/admin/login" ||
    pathname === "/api/admin/login" ||
    pathname === "/api/admin/logout"
  ) {
    return NextResponse.next();
  }

  const auth = await getAuth(req);
  const isApi = pathname.startsWith("/api/");

  // Admin area — gated per section by the role's permissions.
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    if (!auth) {
      return isApi ? NextResponse.json({ error: "Unauthorized" }, { status: 401 }) : redirectLogin(req, pathname);
    }
    const required = keyForPath(pathname);
    if (required) {
      if (!auth.perms.includes(required)) {
        if (isApi) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        return redirectTo(req, firstAllowedPath(auth.perms) || "/portal");
      }
    } else if (!hasAdminAccess(auth.perms)) {
      if (isApi) return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      return redirectTo(req, "/portal");
    }
    // Forward the path so the admin layout can re-check permissions live (DB),
    // catching permission changes before the baked JWT expires.
    const h = new Headers(req.headers);
    h.set("x-pathname", pathname);
    return NextResponse.next({ request: { headers: h } });
  }

  // Employee self-service + scan — any authenticated user.
  if (pathname.startsWith("/portal") || pathname.startsWith("/api/portal") || pathname.startsWith("/scan")) {
    if (!auth) {
      return isApi ? NextResponse.json({ error: "Unauthorized" }, { status: 401 }) : redirectLogin(req, pathname);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*", "/portal/:path*", "/api/portal/:path*", "/scan/:path*"],
};
