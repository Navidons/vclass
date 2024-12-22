'use client'

import { Bell, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useEffect } from 'react'

interface HeaderProps {
  studentName: string;
  registrationNumber: string;
}

export function Header({ studentName, registrationNumber }: HeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    // Add any logout logic here (clear session, cookies, etc.)
    router.push('/')
  }

  const initials = studentName
    .split(' ')
    .map(word => word[0])
    .join('')

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Student Info */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-[#2a6fb5] ml-8">
            {studentName} | {registrationNumber}
            <span className="text-muted-foreground mx-2">•</span>
            <span className="text-sm font-normal text-muted-foreground">
              VClass Student
            </span>
          </h2>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 hover:bg-blue-950/30 rounded-full transition-colors"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-blue-200" />
              ) : (
                <Moon className="h-5 w-5 text-blue-200" />
              )}
            </button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 hover:bg-blue-950/30 rounded-full transition-colors">
                <Bell className="w-5 h-5 text-blue-200" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 bg-gray-900/95 backdrop-blur-sm border-gray-800">
              <DropdownMenuLabel className="text-blue-200">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="text-gray-300 hover:bg-blue-950/30 cursor-pointer">
                New assignment posted in Operating Systems
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-blue-950/30 cursor-pointer">
                Upcoming test in Data Structures
              </DropdownMenuItem>
              <DropdownMenuItem className="text-gray-300 hover:bg-blue-950/30 cursor-pointer">
                Grade posted for Software Engineering
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="border-2 border-blue-950/30 cursor-pointer hover:opacity-80">
                <AvatarImage src="/avatars/student.jpg" alt={studentName} />
                <AvatarFallback className="bg-blue-950/30 text-blue-200">{initials}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="text-red-500 focus:text-red-500 cursor-pointer"
                onClick={handleLogout}
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
