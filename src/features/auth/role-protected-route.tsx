import { Navigate, Outlet } from "react-router"

import { useAuth } from "./auth-context"
import type { AuthRole } from "./auth-roles"

type RoleProtectedRouteProps = {
  allowedRoles: AuthRole[]
}

export function RoleProtectedRoute({ allowedRoles }: RoleProtectedRouteProps) {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/403" replace />
  }

  return <Outlet />
}