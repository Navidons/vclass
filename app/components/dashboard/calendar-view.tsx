'use client'

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" className="w-full" />
        </CardContent>
      </Card>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Upcoming Lectures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingLectures.map((lecture) => (
              <div
                key={lecture.id}
                className="p-4 bg-gray-50 rounded-lg space-y-2"
              >
                <h3 className="font-medium">{lecture.title}</h3>
                <div className="text-sm text-gray-500 space-y-1">
                  <p>Time: {lecture.time}</p>
                  <p>Venue: {lecture.venue}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
