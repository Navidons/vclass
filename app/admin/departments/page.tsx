import { StubPage } from "@/app/components/ui/stub-page";
import { requireAdminLevel } from "@/lib/auth/guards";
import { ADMIN_LEVELS } from "@/lib/auth/roles";

export default async function AdminDepartmentsPage() {
  await requireAdminLevel(ADMIN_LEVELS.FACULTY);
  return <StubPage title="Departments" />;
}
