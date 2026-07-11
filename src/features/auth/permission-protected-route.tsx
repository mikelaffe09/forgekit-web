import { Navigate, Outlet, useLocation } from "react-router"

import { useAuth } from "./auth-context"
import { roleHasEveryPermission } from "./auth-permissions"
import type { AuthPermission } from "./auth-permissions"

type PermissionProtectedRouteProps = {
  permissions: AuthPermission[]
}

export function PermissionProtectedRoute({
  permissions,
}: PermissionProtectedRouteProps) {
  const location = useLocation()
  const { user } = useAuth()

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  if (!roleHasEveryPermission(user.role, permissions)) {
    return <Navigate to="/403" replace />
  }

  return <Outlet />
}