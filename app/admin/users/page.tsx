import { StubPage } from "@/app/components/ui/stub-page";
import { requireAdminLevel } from "@/lib/auth/guards";
import { ADMIN_LEVELS } from "@/lib/auth/roles";

export default async function AdminUsersPage() {
  await requireAdminLevel(ADMIN_LEVELS.UNIVERSITY);
  return <StubPage title="User Management" />;
}
