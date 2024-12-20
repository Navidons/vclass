import { Sidebar } from "@/app/components/navigation/sidebar"
import { Header } from "@/app/components/header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <div className="pl-64">
        <div className="fixed top-0 right-0 left-64 z-10">
          <Header studentName="John Doe" registrationNumber="VU/2024/001" />
        </div>
        <div className="pt-16">
          {children}
        </div>
      </div>
    </div>
  )
}
