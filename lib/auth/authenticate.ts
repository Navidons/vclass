import bcrypt from "bcryptjs";

import { prisma } from "@/lib/db";
import { getPortalForRole, type AdminLevel, type Role } from "./roles";
import type { SessionUser } from "./types";

export async function authenticateUser(
  identifier: string,
  password: string
): Promise<SessionUser | null> {
  const normalized = identifier.trim().toUpperCase();

  const user = await prisma.user.findUnique({
    where: { identifier: normalized },
  });

  if (!user || !user.isActive) {
    return null;
  }

  const passwordValid = await bcrypt.compare(password, user.passwordHash);
  if (!passwordValid) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    identifier: user.identifier,
    role: user.role as Role,
    portal: getPortalForRole(user.role as Role),
    adminLevel: (user.adminLevel as AdminLevel | null) ?? undefined,
    department: user.department ?? undefined,
    faculty: user.faculty ?? undefined,
  };
}
