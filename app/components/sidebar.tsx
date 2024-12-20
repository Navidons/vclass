'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Home, BookOpen, Users, Calendar, FileText, GraduationCap, PieChart, DollarSign, Video, Vote, MessageCircle, FileEdit, Settings, LogOut } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const navigation = [
  { name: 'Home', href: '/dashboard', icon: Home },
  { name: 'My Modules', href: '/modules', icon: BookOpen },
  { name: 'Lectures', href: '/lectures', icon: Users },
  { name: 'My Timetable', href: '/timetable', icon: Calendar },
  { name: 'Course Work', href: '/coursework', icon: FileText },
  { name: 'Examinations', href: '/exams', icon: GraduationCap },
  { name: 'Examination Results', href: '/results', icon: PieChart },
  { name: 'Financial Statements', href: '/finance', icon: DollarSign },
  { name: 'Tutorials', href: '/tutorials', icon: Video },
  { name: 'VU Elections', href: '/elections', icon: Vote },
  { name: 'Chats / Inquiries', href: '/chats', icon: MessageCircle },
  { name: 'Apply For Changes', href: '/changes', icon: FileEdit },
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Logout', href: '/logout', icon: LogOut },
]

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col fixed left-0 top-0 border-r bg-gray-50">
      <div className="flex h-16 shrink-0 items-center border-b px-4">
        <Image
          src="/vu-logo.png"
          alt="Victoria University"
          width={150}
          height={40}
          className="h-8 w-auto"
        />
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
              "group transition-colors"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}

