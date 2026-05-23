"use client";

import { LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "@/app/components/ui/logo";
import { NavItem } from "@/app/components/navigation/nav-item";
import { ScrollArea } from "@/app/components/ui/scroll-area";
import type { SessionUser } from "@/lib/auth/types";
import type { NavItemConfig } from "@/lib/navigation/types";

interface PortalSidebarProps {
  user: SessionUser;
  mainNavigation: NavItemConfig[];
  bottomNavigation: NavItemConfig[];
}

export function PortalSidebar({
  user,
  mainNavigation,
  bottomNavigation,
}: PortalSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  const renderNavigation = () => (
    <>
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        <Logo />
        <span className="ml-2 text-xs text-muted-foreground capitalize">
          {user.portal}
        </span>
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-1 px-2 py-4">
          {mainNavigation.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.name}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
      </ScrollArea>
      <div className="shrink-0 mt-auto border-t">
        <nav className="px-2 py-4 space-y-1">
          {bottomNavigation.map((item) => (
            <NavItem
              key={item.href}
              href={item.href}
              icon={item.icon}
              label={item.name}
              isActive={pathname === item.href}
            />
          ))}
          <NavItem
            href="/login"
            icon={LogOut}
            label="Logout"
            onClick={handleLogout}
          />
        </nav>
      </div>
    </>
  );

  if (!mounted) {
    return (
      <div className="flex h-full w-64 flex-col fixed left-0 top-0 border-r bg-background z-20">
        {renderNavigation()}
      </div>
    );
  }

  return (
    <div className="flex h-full w-64 flex-col fixed left-0 top-0 border-r bg-background z-20">
      {renderNavigation()}
    </div>
  );
}
