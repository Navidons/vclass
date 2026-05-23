import { PortalHeader } from "@/app/components/navigation/portal-header";
import { PortalSidebar } from "@/app/components/navigation/portal-sidebar";
import type { SessionUser } from "@/lib/auth/types";
import type { NavItemConfig } from "@/lib/navigation/types";

interface PortalLayoutProps {
  user: SessionUser;
  mainNavigation: NavItemConfig[];
  bottomNavigation: NavItemConfig[];
  children: React.ReactNode;
}

export function PortalLayout({
  user,
  mainNavigation,
  bottomNavigation,
  children,
}: PortalLayoutProps) {
  return (
    <div className="bg-gray-100 min-h-screen">
      <PortalSidebar
        user={user}
        mainNavigation={mainNavigation}
        bottomNavigation={bottomNavigation}
      />
      <div className="pl-64">
        <div className="fixed top-0 right-0 left-64 z-10">
          <PortalHeader user={user} />
        </div>
        <div className="pt-16">{children}</div>
      </div>
    </div>
  );
}
