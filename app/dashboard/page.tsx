import { ModulesCarousel } from "@/app/components/dashboard/modules-carousel"
import { AttendanceChart } from "@/app/components/dashboard/attendance-chart"
import { CalendarView } from "@/app/components/dashboard/calendar-view"
import { DisplayScreen } from "@/app/components/dashboard/display-screen"

const containerStyle = {
  wordBreak: 'normal' as const,
  overflowWrap: 'break-word' as const,
  whiteSpace: 'normal' as const,
  boxSizing: 'border-box' as const,
  unicodeBidi: 'isolate' as const,
}

export default function DashboardPage() {
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Attendance Chart */}
            <div 
              className="w-full bg-white rounded-[3px] p-4 block md:block h-[350px]"
              style={containerStyle}
            >
              <div className="pb-2">
                <h2 className="text-[#2a6fb5] text-lg font-semibold">Attendance Overview</h2>
              </div>
              <div className="h-[calc(100%-40px)] overflow-y-auto">
                <AttendanceChart />
              </div>
            </div>

            {/* Announcements */}
            <div 
              className="w-full bg-white rounded-[3px] p-4 block md:block h-[350px]"
              style={containerStyle}
            >
              <div className="pb-2">
                <h2 className="text-[#2a6fb5] text-lg font-semibold">School Announcements</h2>
              </div>
              <div className="space-y-3 h-[calc(100%-40px)] overflow-y-auto">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-muted-foreground">No new announcements</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-sm mb-1 text-[#2a6fb5]">Tip</h3>
                  <p className="text-sm text-muted-foreground">Stay tuned for important school announcements and updates here.</p>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-sm mb-1 text-[#2a6fb5]">Reminder</h3>
                  <p className="text-sm text-muted-foreground">Check your attendance regularly to maintain the required 75% attendance rate.</p>
                </div>
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
              <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                VU Live
              </h2>
            </div>
            <div className="h-[calc(100%-40px)]">
              <DisplayScreen />
            </div>
          </div>

          {/* Calendar */}
          <div 
            className="w-full bg-white rounded-[3px] p-4 block md:block h-[400px]"
            style={containerStyle}
          >
            <div className="pb-2">
              <h2 className="text-[#2a6fb5] text-lg font-semibold">Calendar</h2>
            </div>
            <div className="h-[calc(100%-40px)] overflow-y-auto">
              <CalendarView />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
