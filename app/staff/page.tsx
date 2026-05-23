import { BookOpen, ClipboardList, GraduationCap, Users } from "lucide-react";

const quickLinks = [
  { title: "Classes", description: "View and manage your classes", icon: Users },
  { title: "Attendance", description: "Record student attendance", icon: ClipboardList },
  { title: "Grades", description: "Submit coursework and exam marks", icon: GraduationCap },
  { title: "Modules", description: "Courses you teach this semester", icon: BookOpen },
];

export default function StaffDashboardPage() {
  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2a6fb5]">Staff Portal</h1>
        <p className="text-muted-foreground mt-1">
          Manage classes, attendance, and grades
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickLinks.map((link) => (
          <div
            key={link.title}
            className="bg-white rounded-[3px] p-5 border border-gray-100 shadow-sm"
          >
            <link.icon className="h-8 w-8 text-[#2a6fb5] mb-3" />
            <h2 className="font-semibold text-[#2a6fb5]">{link.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
