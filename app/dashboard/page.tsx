import { ModulesCarousel } from "@/app/components/dashboard/modules-carousel"
import { AttendanceChart } from "@/app/components/dashboard/attendance-chart"
import { CalendarView } from "@/app/components/dashboard/calendar-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <main className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content area - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Modules Section */}
          <Card className="w-full">
            <CardHeader>
              <CardTitle>My Modules</CardTitle>
            </CardHeader>
            <CardContent>
              <ModulesCarousel />
            </CardContent>
          </Card>

          {/* Charts and Announcements Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="w-full h-[400px]">
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[calc(400px-4rem)]">
                <AttendanceChart />
              </CardContent>
            </Card>

            <Card className="w-full h-[400px]">
              <CardHeader>
                <CardTitle>School Announcements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">No new announcements</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-sm mb-1">Tip</h3>
                    <p className="text-sm text-gray-500">Stay tuned for important school announcements and updates here.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right sidebar - Calendar */}
        <div className="lg:col-span-1">
          <CalendarView />
        </div>
      </div>
    </main>
  )
}
