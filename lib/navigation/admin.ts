import {
  BarChart3,
  BookOpen,
  Building2,
  Home,
  Settings,
  UserCog,
  Users,
} from "lucide-react";

import { portalPath } from "@/lib/auth/routes";
import { ADMIN_LEVELS, PORTALS } from "@/lib/auth/roles";
import { PERMISSIONS } from "@/lib/auth/permissions";
import type { NavItemConfig } from "./types";

const base = portalPath(PORTALS.ADMIN);

export const adminMainNavigation: NavItemConfig[] = [
  { name: "Dashboard", href: base, icon: Home },
  {
    name: "Students",
    href: `${base}/students`,
    icon: Users,
    permission: PERMISSIONS.VIEW_STUDENTS,
  },
  {
    name: "Staff",
    href: `${base}/staff`,
    icon: UserCog,
    permission: PERMISSIONS.VIEW_STAFF,
  },
  {
    name: "Courses",
    href: `${base}/courses`,
    icon: BookOpen,
    permission: PERMISSIONS.MANAGE_COURSES,
  },
  {
    name: "Departments",
    href: `${base}/departments`,
    icon: Building2,
    permission: PERMISSIONS.MANAGE_DEPARTMENTS,
    minAdminLevel: ADMIN_LEVELS.FACULTY,
  },
  {
    name: "User Management",
    href: `${base}/users`,
    icon: UserCog,
    permission: PERMISSIONS.MANAGE_USERS,
    minAdminLevel: ADMIN_LEVELS.UNIVERSITY,
  },
  {
    name: "Reports",
    href: `${base}/reports`,
    icon: BarChart3,
    permission: PERMISSIONS.VIEW_REPORTS,
  },
];

export const adminBottomNavigation: NavItemConfig[] = [
  { name: "Settings", href: `${base}/settings`, icon: Settings },
];
