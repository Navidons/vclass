import "dotenv/config";
import bcrypt from "bcryptjs";

import { ADMIN_LEVELS, ROLES } from "../lib/auth/roles";
import { prisma } from "../lib/db";

const DEFAULT_PASSWORD = "password123";

const users = [
  {
    identifier: "VU-BCS-2409-1302",
    name: "SSEBBOWA RICHARD KINTU",
    role: ROLES.STUDENT,
    portal: "student",
  },
  {
    identifier: "VU-STAFF-LEC-001",
    name: "DR. JANE NAKATO",
    role: ROLES.LECTURER,
    portal: "staff",
    department: "Computer Science",
    faculty: "Science & Technology",
  },
  {
    identifier: "VU-ADMIN-DEPT-001",
    name: "MR. PETER OKELLO",
    role: ROLES.ADMIN,
    portal: "admin",
    adminLevel: ADMIN_LEVELS.DEPARTMENT,
    department: "Computer Science",
    faculty: "Science & Technology",
  },
  {
    identifier: "VU-ADMIN-FAC-001",
    name: "DR. SARAH MUKASA",
    role: ROLES.ADMIN,
    portal: "admin",
    adminLevel: ADMIN_LEVELS.FACULTY,
    faculty: "Science & Technology",
  },
  {
    identifier: "VU-ADMIN-UNI-001",
    name: "PROF. DAVID SSENYONDO",
    role: ROLES.ADMIN,
    portal: "admin",
    adminLevel: ADMIN_LEVELS.UNIVERSITY,
  },
  {
    identifier: "VU-SUPER-ADMIN",
    name: "SYSTEM ADMINISTRATOR",
    role: ROLES.SUPER_ADMIN,
    portal: "admin",
    adminLevel: ADMIN_LEVELS.SYSTEM,
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  for (const user of users) {
    await prisma.user.upsert({
      where: { identifier: user.identifier },
      update: {
        name: user.name,
        role: user.role,
        portal: user.portal,
        adminLevel: user.adminLevel ?? null,
        department: user.department ?? null,
        faculty: user.faculty ?? null,
        passwordHash,
        isActive: true,
      },
      create: {
        identifier: user.identifier,
        name: user.name,
        role: user.role,
        portal: user.portal,
        adminLevel: user.adminLevel ?? null,
        department: user.department ?? null,
        faculty: user.faculty ?? null,
        passwordHash,
      },
    });
  }

  console.log(`Seeded ${users.length} users (password: ${DEFAULT_PASSWORD})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
