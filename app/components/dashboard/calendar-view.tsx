'use client'

import { Calendar } from "@/components/ui/calendar"

const upcomingLectures = [
  {
    id: 1,
    title: "Web Development",
    time: "09:00 AM",
    date: "2024-01-21",
    venue: "Room 101",
  },
  {
    id: 2,
    title: "Database Systems",
    time: "11:00 AM",
    date: "2024-01-21",
    venue: "Room 203",
  },
]

export function CalendarView() {
  return (
    <div className="space-y-6">
      <div className="w-full">
        <Calendar mode="single" className="w-full" />
      </div>
      
      <div className="w-full bg-white rounded-[3px] p-5 block md:block">
        <div className="pb-3">
          <h2 className="text-[#2a6fb5] text-xl font-semibold">Upcoming Lectures</h2>
        </div>
        <div className="space-y-4">
          {upcomingLectures.map((lecture) => (
            <div
              key={lecture.id}
              className="p-4 bg-gray-50 rounded-lg space-y-2"
            >
              <h3 className="font-medium text-[#2a6fb5]">{lecture.title}</h3>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>Time: {lecture.time}</p>
                <p>Venue: {lecture.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
