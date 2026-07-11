import type { ReactNode } from "react"

import { useAuth } from "./auth-context"
import { roleHasEveryPermission } from "./auth-permissions"
import type { AuthPermission } from "./auth-permissions"

type PermissionGateProps = {
  permissions: AuthPermission[]
  children: ReactNode
  fallback?: ReactNode
}

export function PermissionGate({
  permissions,
  children,
  fallback = null,
}: PermissionGateProps) {
  const { user } = useAuth()

  if (!user || !roleHasEveryPermission(user.role, permissions)) {
    return fallback
  }

  return children
}