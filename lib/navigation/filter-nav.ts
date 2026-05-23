import { can, canAccessAdminRoute } from "@/lib/auth/permissions";
import type { SessionUser } from "@/lib/auth/types";
import type { NavItemConfig } from "./types";

export function filterNavigation(
  items: NavItemConfig[],
  user: SessionUser
): NavItemConfig[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    if (seen.has(item.href)) return false;

    if (item.permission && !can(user, item.permission)) {
      return false;
    }

    if (item.minAdminLevel && !canAccessAdminRoute(user, item.minAdminLevel)) {
      return false;
    }

    seen.add(item.href);
    return true;
  });
}
