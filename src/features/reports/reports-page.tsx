import {
  BarChart3,
  Download,
  FileText,
  Package,
  TrendingUp,
  Users,
} from "lucide-react"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { StatCard } from "../../components/shared/stat-card"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { AUTH_ROLES } from "../auth/auth-roles"
import { RoleGate } from "../auth/role-gate"

const reports = [
  {
    title: "Sales Summary",
    description: "Track revenue, order volume, and business performance.",
    icon: TrendingUp,
  },
  {
    title: "Inventory Report",
    description: "Review stock levels, low-stock items, and inventory value.",
    icon: Package,
  },
  {
    title: "User Activity",
    description: "Monitor user activity, account status, and role distribution.",
    icon: Users,
  },
]

export function ReportsPage() {
  return (
    <DashboardLayout
      title="Reports"
      description="Reusable reporting page for admin dashboards and business apps."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Monthly Revenue"
            value="$24,800"
            description="+12.5% from last month"
            icon={TrendingUp}
          />

          <StatCard
            title="Active Reports"
            value="8"
            description="Saved reporting views"
            icon={FileText}
          />

          <StatCard
            title="Exported Files"
            value="32"
            description="CSV exports this month"
            icon={Download}
          />

          <StatCard
            title="Data Sources"
            value="4"
            description="Connected modules"
            icon={BarChart3}
          />
        </div>

        <Card>
          <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Available Reports</CardTitle>
              <CardDescription>
                Starter report cards you can connect to real business data later.
              </CardDescription>
            </div>

            <RoleGate
              allowedRoles={[AUTH_ROLES.ADMINISTRATOR]}
              fallback={<Badge variant="secondary">Read-only access</Badge>}
            >
              <Button variant="outline">
                <Download className="mr-2 size-4" />
                Export all
              </Button>
            </RoleGate>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {reports.map((report) => (
                <div
                  key={report.title}
                  className="rounded-lg border bg-card p-4 shadow-xs"
                >
                  <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-primary/10">
                    <report.icon className="size-5 text-primary" />
                  </div>

                  <h3 className="font-semibold">{report.title}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {report.description}
                  </p>

                  <Button variant="outline" className="mt-4 w-full">
                    View report
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}