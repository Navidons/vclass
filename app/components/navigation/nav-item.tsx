import Link from "next/link"
import { type LucideIcon } from 'lucide-react'

import { cn } from "@/lib/utils"

interface NavItemProps {
  href: string
  icon: LucideIcon
  label: string
  isActive?: boolean
}

export function NavItem({ href, icon: Icon, label, isActive }: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-2 py-2 text-sm font-medium rounded-md",
        "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        "group transition-colors",
        isActive && "bg-gray-100 text-gray-900"
      )}
    >
      <Icon className="mr-3 h-5 w-5" />
      {label}
    </Link>
  )
}

