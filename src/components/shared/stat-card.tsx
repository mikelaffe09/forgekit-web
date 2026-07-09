import type { LucideIcon } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type StatCardProps = {
  title: string
  value: string
  description?: string
  icon: LucideIcon
}

export function StatCard({
  title,
  value,
  description = "Demo stat component",
  icon: Icon,
}: StatCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="size-4 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}