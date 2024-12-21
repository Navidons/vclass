'use client'

import { useState } from "react"
import { ModulesCarousel } from "@/app/components/dashboard/modules-carousel"
import { AttendanceChart } from "@/app/components/dashboard/attendance-chart"
import { CalendarView } from "@/app/components/dashboard/calendar-view"
import { DisplayScreen } from "@/app/components/dashboard/display-screen"
import { UpcomingLectures } from "@/app/components/dashboard/upcoming-lectures"
import { Volume2, VolumeX } from "lucide-react"

const containerStyle = {
  wordBreak: 'normal' as const,
  overflowWrap: 'break-word' as const,
  whiteSpace: 'normal' as const,
  boxSizing: 'border-box' as const,
  unicodeBidi: 'isolate' as const,
}

export default function DashboardPage() {
  const [isMuted, setIsMuted] = useState(true)

  return (
    <main className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Modules Section */}
          <div 
            className="w-full bg-white rounded-[3px] p-5 mb-5 block md:block h-[300px]"
            style={containerStyle}
          >
            <div className="pb-3">
              <h2 className="text-[#2a6fb5] text-xl font-semibold">My Modules</h2>
            </div>
            <ModulesCarousel />
          </div>

          {/* Charts and Announcements Section */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Chart */}
            <div 
              className="w-full bg-white rounded-[3px] p-4 block md:block h-[300px]"
              style={containerStyle}
            >
              <div className="pb-2">
                <h2 className="text-[#2a6fb5] text-lg font-semibold">Attendance Overview</h2>
              </div>
              <div className="h-[calc(100%-40px)]">
                <AttendanceChart />
              </div>
            </div>

            {/* Upcoming Lectures */}
            <div 
              className="w-full bg-white rounded-[3px] p-4 block md:block h-[300px]"
              style={containerStyle}
            >
              <div className="pb-2">
                <h2 className="text-[#2a6fb5] text-lg font-semibold">Upcoming Lectures</h2>
              </div>
              <div className="h-[calc(100%-40px)] overflow-y-auto">
                <UpcomingLectures />
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar - Display and Calendar */}
        <div className="lg:col-span-1 space-y-6">
          {/* TV Display */}
          <div 
            className="w-full bg-gray-900 rounded-[3px] p-4 block md:block h-[300px]"
            style={{
              ...containerStyle,
              boxShadow: '0 0 20px rgba(0,0,0,0.2)',
              background: 'linear-gradient(to bottom, #1a1a1a, #000000)'
            }}
          >
            <div className="pb-2">
              <h2 className="text-white text-lg font-semibold flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  VU Live
                </div>
                <button
                  onClick={() => {
                    setIsMuted(prevMuted => {
                      const video = document.querySelector('video')
                      if (video) {
                        video.muted = !prevMuted
                      }
                      return !prevMuted
                    })
                  }}
                  className="p-1 hover:bg-white/10 rounded-full transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white/80" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white/80" />
                  )}
                </button>
              </h2>
            </div>
            <div className="h-[calc(100%-40px)]">
              <DisplayScreen />
            </div>
          </div>

          {/* Calendar */}
          <div 
            className="w-full bg-white rounded-[3px] p-4 block md:block h-[300px]"
            style={containerStyle}
          >
            <div className="pb-2">
              <h2 className="text-[#2a6fb5] text-lg font-semibold">Calendar</h2>
            </div>
            <div className="h-[calc(100%-40px)]">
              <CalendarView />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
