'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  studentName: string
  registrationNumber: string
}

export function Header({ studentName, registrationNumber }: HeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b bg-white px-4">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          {studentName} : {registrationNumber}
          <span className="ml-2 text-sm font-normal text-gray-500">
            VClass Student
          </span>
        </h2>
      </div>
      <Avatar>
        <AvatarImage src="/placeholder-user.jpg" />
        <AvatarFallback>VS</AvatarFallback>
      </Avatar>
    </div>
  )
}

