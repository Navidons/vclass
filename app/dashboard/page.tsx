import { Header } from "@/app/components/dashboard/header"
import { ModulesCarousel } from "@/app/components/dashboard/modules-carousel"
import { AttendanceChart } from "@/app/components/dashboard/attendance-chart"
import { CalendarView } from "@/app/components/dashboard/calendar-view"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <>
      <Header 
        studentName="SSEBBOWA RICHARD KINTU" 
        registrationNumber="VU-BCS-2109-1302" 
      />
      <main className="p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Main content area - 8 columns */}
          <div className="col-span-8 space-y-4">
            <ModulesCarousel />
            <div className="grid grid-cols-2 gap-4">
              <AttendanceChart />
              <Card>
                <CardHeader>
                  <CardTitle>School Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500">
                    No new announcements
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Right sidebar - 4 columns */}
          <div className="col-span-4">
            <CalendarView />
          </div>
        </div>
      </main>
    </>
  )
}

