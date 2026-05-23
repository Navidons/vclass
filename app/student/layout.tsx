import { PortalLayout } from "@/app/components/layout/portal-layout";
import { PORTALS } from "@/lib/auth/roles";
import { requirePortal } from "@/lib/auth/session";
import { filterNavigation } from "@/lib/navigation/filter-nav";
import {
  studentBottomNavigation,
  studentMainNavigation,
} from "@/lib/navigation/student";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortal(PORTALS.STUDENT);

  return (
    <PortalLayout
      user={user}
      mainNavigation={filterNavigation(studentMainNavigation, user)}
      bottomNavigation={filterNavigation(studentBottomNavigation, user)}
    >
      {children}
    </PortalLayout>
  );
}
