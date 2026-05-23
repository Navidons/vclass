import type { AdminLevel, Portal, Role } from "./roles";
import { ADMIN_LEVELS, ROLES, hasAdminLevel } from "./roles";
import type { SessionUser } from "./types";

export const PERMISSIONS = {
  // Student
  VIEW_OWN_MODULES: "view_own_modules",
  VIEW_OWN_RESULTS: "view_own_results",
  APPLY_FOR_CHANGES: "apply_for_changes",

  // Staff
  MANAGE_CLASSES: "manage_classes",
  RECORD_ATTENDANCE: "record_attendance",
  SUBMIT_GRADES: "submit_grades",

  // Admin
  VIEW_STUDENTS: "view_students",
  VIEW_STAFF: "view_staff",
  MANAGE_COURSES: "manage_courses",
  MANAGE_DEPARTMENTS: "manage_departments",
  MANAGE_USERS: "manage_users",
  VIEW_REPORTS: "view_reports",
  SYSTEM_SETTINGS: "system_settings",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  [ROLES.STUDENT]: [
    PERMISSIONS.VIEW_OWN_MODULES,
    PERMISSIONS.VIEW_OWN_RESULTS,
    PERMISSIONS.APPLY_FOR_CHANGES,
  ],
  [ROLES.LECTURER]: [
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.RECORD_ATTENDANCE,
    PERMISSIONS.SUBMIT_GRADES,
    PERMISSIONS.VIEW_STUDENTS,
  ],
  [ROLES.ADMIN]: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_STAFF,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [ROLES.SUPER_ADMIN]: Object.values(PERMISSIONS),
};

const ADMIN_LEVEL_PERMISSIONS: Partial<Record<AdminLevel, Permission[]>> = {
  [ADMIN_LEVELS.DEPARTMENT]: [
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_STAFF,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [ADMIN_LEVELS.FACULTY]: [
    PERMISSIONS.MANAGE_DEPARTMENTS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_STAFF,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [ADMIN_LEVELS.UNIVERSITY]: [
    PERMISSIONS.MANAGE_DEPARTMENTS,
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.VIEW_STUDENTS,
    PERMISSIONS.VIEW_STAFF,
    PERMISSIONS.MANAGE_COURSES,
    PERMISSIONS.VIEW_REPORTS,
  ],
  [ADMIN_LEVELS.SYSTEM]: Object.values(PERMISSIONS),
};

export function getPermissionsForUser(user: SessionUser): Set<Permission> {
  const base = new Set(ROLE_PERMISSIONS[user.role] ?? []);

  if (user.role === ROLES.ADMIN && user.adminLevel) {
    for (const p of ADMIN_LEVEL_PERMISSIONS[user.adminLevel] ?? []) {
      base.add(p);
    }
  }

  if (user.role === ROLES.SUPER_ADMIN) {
    return new Set(Object.values(PERMISSIONS));
  }

  return base;
}

export function can(user: SessionUser, permission: Permission): boolean {
  return getPermissionsForUser(user).has(permission);
}

export function canAccessPortal(user: SessionUser, portal: Portal): boolean {
  return user.portal === portal;
}

export function canAccessAdminRoute(
  user: SessionUser,
  requiredLevel: AdminLevel
): boolean {
  if (user.role === ROLES.SUPER_ADMIN) return true;
  if (user.role !== ROLES.ADMIN) return false;
  return hasAdminLevel(user.adminLevel, requiredLevel);
}
