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
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar mode="single" />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Lectures</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingLectures.map((lecture) => (
              <div
                key={lecture.id}
                className="flex flex-col space-y-1 border-b pb-3 last:border-0"
              >
                <h3 className="font-medium">{lecture.title}</h3>
                <p className="text-sm text-gray-500">
                  {lecture.time} - {lecture.venue}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

