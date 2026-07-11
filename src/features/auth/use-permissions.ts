import { useAuth } from "./auth-context"
import { AUTH_PERMISSIONS, roleHasPermission } from "./auth-permissions"
import type { AuthPermission } from "./auth-permissions"

export function usePermissions() {
  const { user } = useAuth()

  function hasPermission(permission: AuthPermission) {
    if (!user) {
      return false
    }

    return roleHasPermission(user.role, permission)
  }

  return {
    hasPermission,
    canAccessSettings: hasPermission(AUTH_PERMISSIONS.ACCESS_SETTINGS),
    canManageProducts: hasPermission(AUTH_PERMISSIONS.MANAGE_PRODUCTS),
    canExportReports: hasPermission(AUTH_PERMISSIONS.EXPORT_REPORTS),
  }
}