'use client'

import { usePathname } from 'next/navigation'
import { Home, BookOpen, Users, Calendar, FileText, GraduationCap, PieChart, DollarSign, Video, Vote, MessageCircle, FileEdit, Settings, LogOut } from 'lucide-react'

import { Logo } from "@/app/components/ui/logo"
import { NavItem } from "@/app/components/navigation/nav-item"
import { ToggleButton } from "@/app/components/ui/toggle-button"
import { ScrollArea } from "@/app/components/ui/scroll-area"

const mainNavigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'My Modules', href: '/dashboard/modules', icon: BookOpen },
  { name: 'Lectures', href: '/dashboard/lectures', icon: Users },
  { name: 'My Timetable', href: '/dashboard/timetable', icon: Calendar },
  { name: 'Course Work', href: '/dashboard/coursework', icon: FileText },
  { name: 'Examinations', href: '/dashboard/exams', icon: GraduationCap },
  { name: 'Examination Results', href: '/dashboard/results', icon: PieChart },
  { name: 'Financial Statements', href: '/dashboard/finance', icon: DollarSign },
  { name: 'Tutorials', href: '/dashboard/tutorials', icon: Video },
  { name: 'VU Elections', href: '/dashboard/elections', icon: Vote },
  { name: 'Chats / Inquiries', href: '/dashboard/chats', icon: MessageCircle },
  { name: 'Apply For Changes', href: '/dashboard/changes', icon: FileEdit },
]

const bottomNavigation = [
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  { name: 'Logout', href: '/logout', icon: LogOut },
]

export function Sidebar() {
  const pathname = usePathname()
  
  return (
    <div className="flex h-full w-64 flex-col fixed left-0 top-0 border-r bg-background">
      <div className="flex h-20 shrink-0 items-center border-b px-4">
        <Logo />
      </div>
      <ScrollArea className="flex-1">
        <nav className="space-y-1 px-2 py-4">
          {mainNavigation.map((item) => (
            <NavItem
              key={item.name}
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
              key={item.name}
              href={item.href}
              icon={item.icon}
              label={item.name}
              isActive={pathname === item.href}
            />
          ))}
        </nav>
        <div className="p-4 border-t">
          <ToggleButton />
        </div>
      </div>
    </div>
  )
}
