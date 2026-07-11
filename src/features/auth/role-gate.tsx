import type { ReactNode } from "react"

import { useAuth } from "./auth-context"

type RoleGateProps = {
  allowedRoles: string[]
  children: ReactNode
  fallback?: ReactNode
}

export function RoleGate({
  allowedRoles,
  children,
  fallback = null,
}: RoleGateProps) {
  const { user } = useAuth()

  if (!user || !allowedRoles.includes(user.role)) {
    return fallback
  }

  return children
}