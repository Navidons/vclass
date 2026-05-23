import { ADMIN_LEVELS, ROLES } from "./roles";
import type { SessionUser } from "./types";

export interface DemoCredential {
  password: string;
  user: Omit<SessionUser, "id"> & { id?: string };
}

/** Demo accounts — replace with database auth in production */
export const DEMO_USERS: DemoCredential[] = [
  {
    password: "password123",
    user: {
      id: "stu-001",
      name: "SSEBBOWA RICHARD KINTU",
      identifier: "VU-BCS-2409-1302",
      role: ROLES.STUDENT,
      portal: "student",
    },
  },
  {
    password: "password123",
    user: {
      id: "lec-001",
      name: "DR. JANE NAKATO",
      identifier: "VU-STAFF-LEC-001",
      role: ROLES.LECTURER,
      portal: "staff",
      department: "Computer Science",
      faculty: "Science & Technology",
    },
  },
  {
    password: "password123",
    user: {
      id: "adm-dept-001",
      name: "MR. PETER OKELLO",
      identifier: "VU-ADMIN-DEPT-001",
      role: ROLES.ADMIN,
      portal: "admin",
      adminLevel: ADMIN_LEVELS.DEPARTMENT,
      department: "Computer Science",
      faculty: "Science & Technology",
    },
  },
  {
    password: "password123",
    user: {
      id: "adm-fac-001",
      name: "DR. SARAH MUKASA",
      identifier: "VU-ADMIN-FAC-001",
      role: ROLES.ADMIN,
      portal: "admin",
      adminLevel: ADMIN_LEVELS.FACULTY,
      faculty: "Science & Technology",
    },
  },
  {
    password: "password123",
    user: {
      id: "adm-uni-001",
      name: "PROF. DAVID SSENYONDO",
      identifier: "VU-ADMIN-UNI-001",
      role: ROLES.ADMIN,
      portal: "admin",
      adminLevel: ADMIN_LEVELS.UNIVERSITY,
    },
  },
  {
    password: "password123",
    user: {
      id: "adm-sys-001",
      name: "SYSTEM ADMINISTRATOR",
      identifier: "VU-SUPER-ADMIN",
      role: ROLES.SUPER_ADMIN,
      portal: "admin",
      adminLevel: ADMIN_LEVELS.SYSTEM,
    },
  },
];

export function authenticateDemoUser(
  identifier: string,
  password: string
): SessionUser | null {
  const normalized = identifier.trim().toUpperCase();
  const match = DEMO_USERS.find(
    (entry) =>
      entry.user.identifier.toUpperCase() === normalized &&
      entry.password === password
  );

  if (!match) return null;

  return {
    ...match.user,
    id: match.user.id ?? match.user.identifier,
  };
}
