'use client'

import Link from "next/link"
import { useRouter } from 'next/navigation'
import { type LucideIcon } from 'lucide-react'

import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: LucideIcon
  label: string
  isActive?: boolean
  onClick?: () => void
}

export function NavItem({ href, icon: Icon, label, isActive, onClick }: NavItemProps) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-2 py-2 text-sm font-medium rounded-md relative",
        "text-muted-foreground hover:text-[#2a6fb5]",
        "group transition-colors pl-6",
        isActive && [
          "text-foreground",
          "before:absolute before:left-0 before:top-0 before:bottom-0",
          "before:w-[5px] before:bg-[#df292c]"
        ]
      )}
      onClick={handleClick}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </Link>
  )
}
