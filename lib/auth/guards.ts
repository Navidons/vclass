import { redirect } from "next/navigation";

import { can, canAccessAdminRoute, type Permission } from "./permissions";
import type { AdminLevel } from "./roles";
import { getPortalHomePath, requireSession } from "./session";

export async function requirePermission(permission: Permission) {
  const user = await requireSession();
  if (!can(user, permission)) {
    redirect(getPortalHomePath(user.portal));
  }
  return user;
}

export async function requireAdminLevel(level: AdminLevel) {
  const user = await requireSession();
  if (!canAccessAdminRoute(user, level)) {
    redirect(getPortalHomePath(user.portal));
  }
  return user;
}
