import type { ReactNode } from "react"

import { PageHeader } from "../components/shared/page-header"
import { Card, CardContent } from "../components/ui/card"

type ResourcePageProps = {
  title: string
  description?: string
  action?: ReactNode
  children: ReactNode
}

export function ResourcePage({
  title,
  description,
  action,
  children,
}: ResourcePageProps) {
  return (
    <div className="space-y-6">
      <PageHeader title={title} description={description} action={action} />

      <Card>
        <CardContent className="p-6">{children}</CardContent>
      </Card>
    </div>
  )
}