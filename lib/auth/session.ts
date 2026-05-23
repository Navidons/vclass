import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { SESSION_COOKIE, getPortalHomePath } from "./config";
import { getPortalForRole, type Portal } from "./roles";
import type { SessionPayload, SessionUser } from "./types";

export { SESSION_COOKIE, getPortalHomePath };
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function getSecret(): Uint8Array {
  const secret = process.env.AUTH_SECRET ?? "vclass-dev-secret-change-in-production";
  return new TextEncoder().encode(secret);
}

export async function createSession(user: SessionUser): Promise<void> {
  const payload: SessionPayload = {
    ...user,
    portal: user.portal ?? getPortalForRole(user.role),
    exp: Math.floor(Date.now() / 1000) + SESSION_MAX_AGE,
  };

  const token = await new SignJWT(payload as unknown as Record<string, unknown>)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${SESSION_MAX_AGE}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const session = payload as unknown as SessionPayload;

    return {
      id: session.id,
      name: session.name,
      identifier: session.identifier,
      role: session.role,
      portal: session.portal,
      adminLevel: session.adminLevel,
      department: session.department,
      faculty: session.faculty,
    };
  } catch {
    return null;
  }
}

export async function requireSession(): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return session;
}

export async function requirePortal(portal: Portal): Promise<SessionUser> {
  const session = await requireSession();
  if (session.portal !== portal) {
    redirect(getPortalHomePath(session.portal));
  }
  return session;
}
