import {
  BookOpen,
  Calendar,
  ClipboardList,
  GraduationCap,
  Home,
  MessageCircle,
  Settings,
  Users,
} from "lucide-react";

import { portalPath } from "@/lib/auth/routes";
import { PORTALS } from "@/lib/auth/roles";
import { PERMISSIONS } from "@/lib/auth/permissions";
import type { NavItemConfig } from "./types";

const base = portalPath(PORTALS.STAFF);

export const staffMainNavigation: NavItemConfig[] = [
  { name: "Home", href: base, icon: Home },
  {
    name: "My Modules",
    href: `${base}/modules`,
    icon: BookOpen,
    permission: PERMISSIONS.MANAGE_CLASSES,
  },
  {
    name: "Classes",
    href: `${base}/classes`,
    icon: Users,
    permission: PERMISSIONS.MANAGE_CLASSES,
  },
  {
    name: "Attendance",
    href: `${base}/attendance`,
    icon: ClipboardList,
    permission: PERMISSIONS.RECORD_ATTENDANCE,
  },
  {
    name: "Grades",
    href: `${base}/grades`,
    icon: GraduationCap,
    permission: PERMISSIONS.SUBMIT_GRADES,
  },
  { name: "Timetable", href: `${base}/timetable`, icon: Calendar },
  { name: "Messages", href: `${base}/messages`, icon: MessageCircle },
];

export const staffBottomNavigation: NavItemConfig[] = [
  { name: "Settings", href: `${base}/settings`, icon: Settings },
];
