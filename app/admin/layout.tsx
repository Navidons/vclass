import { PortalLayout } from "@/app/components/layout/portal-layout";
import { PORTALS } from "@/lib/auth/roles";
import { requirePortal } from "@/lib/auth/session";
import { filterNavigation } from "@/lib/navigation/filter-nav";
import {
  adminBottomNavigation,
  adminMainNavigation,
} from "@/lib/navigation/admin";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requirePortal(PORTALS.ADMIN);

  return (
    <PortalLayout
      user={user}
      mainNavigation={filterNavigation(adminMainNavigation, user)}
      bottomNavigation={filterNavigation(adminBottomNavigation, user)}
    >
      {children}
    </PortalLayout>
  );
}
