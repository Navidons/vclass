export const ROLES = {
  STUDENT: "student",
  LECTURER: "lecturer",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

export type Role = (typeof ROLES)[keyof typeof ROLES];

/** Admin tiers — higher levels inherit lower-level permissions */
export const ADMIN_LEVELS = {
  DEPARTMENT: "department",
  FACULTY: "faculty",
  UNIVERSITY: "university",
  SYSTEM: "system",
} as const;

export type AdminLevel = (typeof ADMIN_LEVELS)[keyof typeof ADMIN_LEVELS];

export const PORTALS = {
  STUDENT: "student",
  STAFF: "staff",
  ADMIN: "admin",
} as const;

export type Portal = (typeof PORTALS)[keyof typeof PORTALS];

const ADMIN_LEVEL_RANK: Record<AdminLevel, number> = {
  department: 1,
  faculty: 2,
  university: 3,
  system: 4,
};

export function getPortalForRole(role: Role): Portal {
  switch (role) {
    case ROLES.STUDENT:
      return PORTALS.STUDENT;
    case ROLES.LECTURER:
      return PORTALS.STAFF;
    case ROLES.ADMIN:
    case ROLES.SUPER_ADMIN:
      return PORTALS.ADMIN;
  }
}

export function getDefaultAdminLevel(role: Role): AdminLevel | undefined {
  if (role === ROLES.SUPER_ADMIN) return ADMIN_LEVELS.SYSTEM;
  if (role === ROLES.ADMIN) return ADMIN_LEVELS.UNIVERSITY;
  return undefined;
}

export function getRoleLabel(role: Role, adminLevel?: AdminLevel): string {
  switch (role) {
    case ROLES.STUDENT:
      return "Student";
    case ROLES.LECTURER:
      return "Lecturer";
    case ROLES.SUPER_ADMIN:
      return "Super Administrator";
    case ROLES.ADMIN:
      if (adminLevel === ADMIN_LEVELS.DEPARTMENT) return "Department Administrator";
      if (adminLevel === ADMIN_LEVELS.FACULTY) return "Faculty Administrator";
      if (adminLevel === ADMIN_LEVELS.UNIVERSITY) return "University Administrator";
      return "Administrator";
  }
}

export function hasAdminLevel(
  userLevel: AdminLevel | undefined,
  required: AdminLevel
): boolean {
  if (!userLevel) return false;
  return ADMIN_LEVEL_RANK[userLevel] >= ADMIN_LEVEL_RANK[required];
}
