'use client'

import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { useTheme } from 'next-themes'

export function CalendarView() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
  const { theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <div className="relative h-full rounded-lg border border-gray-800 overflow-hidden">
      {/* Background texture */}
      <div 
        className={`absolute inset-0 ${isDark ? 'bg-[#1a1a1a]/90' : 'bg-white'}`}
        style={{
          backgroundImage: isDark ? `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232a6fb5' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` : 'none'
        }}
      />

      {/* Content */}
      <div className="relative h-full p-3">
        <div className="flex items-start justify-center -mt-1">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-full"
            classNames={{
              months: "space-y-2",
              month: "space-y-2",
              caption: `flex justify-center relative items-center ${isDark ? 'text-blue-200' : 'text-gray-700'}`,
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: `h-6 w-6 bg-transparent p-0 opacity-70 hover:opacity-100 ${isDark ? 'hover:bg-blue-950/30' : 'hover:bg-gray-100'} rounded-md transition-colors`,
              nav_button_previous: "absolute left-1",
              nav_button_next: "absolute right-1",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: `text-muted-foreground rounded-md w-7 font-normal text-[0.75rem] ${isDark ? 'text-blue-300/70' : 'text-gray-500'}`,
              row: "flex w-full mt-1",
              cell: `relative p-0 text-center text-[0.8rem] focus-within:relative focus-within:z-20 [&:has([aria-selected])]:${isDark ? 'bg-blue-950/30' : 'bg-gray-100'}`,
              day: `relative h-7 w-7 p-0 font-normal aria-selected:opacity-100 ${isDark ? 'hover:bg-blue-950/50' : 'hover:bg-gray-100'} rounded-md transition-colors flex items-center justify-center`,
              day_range_end: "day-range-end",
              day_selected: `${isDark ? 'bg-blue-950/50 text-white hover:bg-blue-950/70' : 'bg-blue-600 text-white hover:bg-blue-700'} hover:text-white focus:bg-blue-600 focus:text-white`,
              day_today: "text-current before:absolute before:bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-1 before:w-1 before:rounded-full before:bg-blue-500",
              day_outside: `text-muted-foreground opacity-50 ${isDark ? 'hover:bg-blue-950/30' : 'hover:bg-gray-100'}`,
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle: isDark ? "aria-selected:bg-blue-950/30 aria-selected:text-white" : "aria-selected:bg-gray-100 aria-selected:text-gray-900",
              day_hidden: "invisible",
            }}
            showOutsideDays={true}
            fixedWeeks={true}
          />
        </div>
      </div>
    </div>
  )
}
