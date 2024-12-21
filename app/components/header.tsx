'use client'

import { Bell } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Header() {
  const studentName = "Ssebbowa Richard Kintu"
  const studentId = "VU-BCS-2409-1302-DAY"
  const initials = studentName
    .split(' ')
    .map(word => word[0])
    .join('')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Student Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-[#2a6fb5]">
            {studentName} | {studentId}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              VClass Student
            </span>
          </h2>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-600 text-[10px] font-medium text-white flex items-center justify-center">
                  3
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[300px]">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">New Assignment Posted</p>
                  <p className="text-xs text-muted-foreground">Web Development - Due in 3 days</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Grade Posted</p>
                  <p className="text-xs text-muted-foreground">Database Systems - Quiz 2</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Course Announcement</p>
                  <p className="text-xs text-muted-foreground">Important update for Mobile Development</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative inline-flex items-center rounded-full border bg-background p-1 hover:bg-accent">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/student.jpg" alt={studentName} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
