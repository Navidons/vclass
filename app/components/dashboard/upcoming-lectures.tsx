'use client'

import { Clock, MapPin } from 'lucide-react'

const upcomingLectures = [
  {
    id: 1,
    subject: "Web Development",
    time: "09:00 AM - 11:00 AM",
    location: "Room 205",
    lecturer: "Dr. John Smith",
    status: "upcoming" // upcoming, ongoing, completed
  },
  {
    id: 2,
    subject: "Database Systems",
    time: "11:30 AM - 01:30 PM",
    location: "Lab 102",
    lecturer: "Prof. Sarah Wilson",
    status: "upcoming"
  },
  {
    id: 3,
    subject: "Mobile Development",
    time: "02:00 PM - 04:00 PM",
    location: "Room 301",
    lecturer: "Mr. David Brown",
    status: "upcoming"
  },
  {
    id: 4,
    subject: "Software Engineering",
    time: "04:30 PM - 06:30 PM",
    location: "Room 405",
    lecturer: "Dr. Emily Davis",
    status: "upcoming"
  }
]

export function UpcomingLectures() {
  return (
    <div className="space-y-4">
      {upcomingLectures.map((lecture) => (
        <div
          key={lecture.id}
          className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-[#2a6fb5] font-semibold">{lecture.subject}</h3>
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-700">
              {lecture.status}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {lecture.time}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {lecture.location}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Lecturer: {lecture.lecturer}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}
