import type { ReactNode } from "react"

import { useAuth } from "./auth-context"
import type { AuthRole } from "./auth-roles"

type RoleGateProps = {
  allowedRoles: AuthRole[]
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