import { PortalLayout } from "@/app/components/layout/portal-layout";
import { PORTALS } from "@/lib/auth/roles";
import { requirePortal } from "@/lib/auth/session";
import { filterNavigation } from "@/lib/navigation/filter-nav";
import {
  staffBottomNavigation,
  staffMainNavigation,
} from "@/lib/navigation/staff";

export default async function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortal(PORTALS.STAFF);

  return (
    <PortalLayout
      user={user}
      mainNavigation={filterNavigation(staffMainNavigation, user)}
      bottomNavigation={filterNavigation(staffBottomNavigation, user)}
    >
      {children}
    </PortalLayout>
  );
}
