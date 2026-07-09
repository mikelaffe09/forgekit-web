import { Activity, DollarSign, Package, Users } from "lucide-react"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { StatCard } from "../../components/shared/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

const stats = [
  {
    title: "Total Revenue",
    value: "$12,450",
    description: "Revenue placeholder",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "1,284",
    description: "Users placeholder",
    icon: Users,
  },
  {
    title: "Products",
    value: "326",
    description: "Products placeholder",
    icon: Package,
  },
  {
    title: "Activity",
    value: "89%",
    description: "Activity placeholder",
    icon: Activity,
  },
]

export function DashboardPage() {
  return (
    <DashboardLayout
      title="Dashboard"
      description="Reusable dashboard overview for future apps."
    >
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            description={stat.description}
            icon={stat.icon}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>New user created</p>
            <p>Product updated</p>
            <p>Report exported</p>
            <p>Settings changed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Starter notes</CardTitle>
          </CardHeader>

          <CardContent className="text-sm text-muted-foreground">
            Use this layout for SaaS dashboards, admin panels, CRMs, inventory
            systems, booking platforms, and client portals.
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}