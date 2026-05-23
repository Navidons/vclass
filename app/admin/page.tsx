import { ADMIN_LEVELS, PORTALS, getRoleLabel } from "@/lib/auth/roles";
import { requirePortal } from "@/lib/auth/session";

export default async function AdminDashboardPage() {
  const user = await requirePortal(PORTALS.ADMIN);
  const roleLabel = getRoleLabel(user.role, user.adminLevel);

  const stats = [
    { label: "Students", value: "12,450" },
    { label: "Staff", value: "840" },
    { label: "Active Courses", value: "326" },
    { label: "Departments", value: "48" },
  ];

  return (
    <main className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-[#2a6fb5]">Administration</h1>
        <p className="text-muted-foreground mt-1">
          {roleLabel}
          {user.faculty ? ` · ${user.faculty}` : ""}
          {user.department ? ` · ${user.department}` : ""}
        </p>
        {user.adminLevel && (
          <p className="text-xs text-muted-foreground mt-2">
            Access level:{" "}
            <span className="font-medium capitalize">{user.adminLevel}</span>
            {user.adminLevel === ADMIN_LEVELS.DEPARTMENT &&
              " — department-scoped data only"}
            {user.adminLevel === ADMIN_LEVELS.FACULTY &&
              " — faculty-wide management"}
            {user.adminLevel === ADMIN_LEVELS.UNIVERSITY &&
              " — university-wide management"}
            {user.adminLevel === ADMIN_LEVELS.SYSTEM &&
              " — full system access"}
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-[3px] p-5 border border-gray-100"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-bold text-[#2a6fb5] mt-1">{stat.value}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
