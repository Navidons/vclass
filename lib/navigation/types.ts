import type { LucideIcon } from "lucide-react";

import type { Permission } from "@/lib/auth/permissions";
import type { AdminLevel } from "@/lib/auth/roles";

export interface NavItemConfig {
  name: string;
  href: string;
  icon: LucideIcon;
  permission?: Permission;
  minAdminLevel?: AdminLevel;
}
