import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { PORTALS, getPortalForRole, type Portal } from "@/lib/auth/roles";
import type { SessionPayload } from "@/lib/auth/types";
import {
  SESSION_COOKIE,
  getPortalHomePath,
  isProtectedPath,
  isPublicPath,
} from "@/lib/auth/config";

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET ?? "vclass-dev-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

async function readSession(request: NextRequest): Promise<SessionPayload | null> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

function portalFromPath(pathname: string): Portal | null {
  if (pathname.startsWith(`/${PORTALS.STUDENT}`)) return PORTALS.STUDENT;
  if (pathname.startsWith(`/${PORTALS.STAFF}`)) return PORTALS.STAFF;
  if (pathname.startsWith(`/${PORTALS.ADMIN}`)) return PORTALS.ADMIN;
  return null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/dashboard/, `/${PORTALS.STUDENT}`) || `/${PORTALS.STUDENT}`;
    return NextResponse.redirect(url);
  }

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = await readSession(request);
  const requiredPortal = portalFromPath(pathname);

  if (pathname === "/") {
    if (session) {
      return NextResponse.redirect(
        new URL(getPortalHomePath(session.portal), request.url)
      );
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/login") {
    if (session) {
      return NextResponse.redirect(
        new URL(getPortalHomePath(session.portal), request.url)
      );
    }
    return NextResponse.next();
  }

  if (isProtectedPath(pathname)) {
    if (!session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userPortal = session.portal ?? getPortalForRole(session.role);

    if (requiredPortal && userPortal !== requiredPortal) {
      return NextResponse.redirect(new URL(getPortalHomePath(userPortal), request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
