import { PORTALS, type Portal } from "./roles";

export const SESSION_COOKIE = "vclass-session";

export function getPortalHomePath(portal: Portal): string {
  return `/${portal}`;
}

export function isPublicPath(pathname: string): boolean {
  return (
    pathname === "/login" ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/_next") ||
    pathname.includes(".")
  );
}

export function isProtectedPath(pathname: string): boolean {
  return (
    pathname.startsWith(`/${PORTALS.STUDENT}`) ||
    pathname.startsWith(`/${PORTALS.STAFF}`) ||
    pathname.startsWith(`/${PORTALS.ADMIN}`)
  );
}
