import { AUTH_ROLES } from "./auth-roles"
import type { AuthRole } from "./auth-roles"

export const AUTH_PERMISSIONS = {
  ACCESS_SETTINGS: "access:settings",
  MANAGE_PRODUCTS: "manage:products",
  MANAGE_USERS: "manage:users",
  EXPORT_REPORTS: "export:reports",
} as const

export type AuthPermission =
  (typeof AUTH_PERMISSIONS)[keyof typeof AUTH_PERMISSIONS]

const ROLE_PERMISSIONS: Record<AuthRole, AuthPermission[]> = {
  [AUTH_ROLES.ADMINISTRATOR]: [
    AUTH_PERMISSIONS.ACCESS_SETTINGS,
    AUTH_PERMISSIONS.MANAGE_PRODUCTS,
    AUTH_PERMISSIONS.MANAGE_USERS,
    AUTH_PERMISSIONS.EXPORT_REPORTS,
  ],
  [AUTH_ROLES.STAFF]: [],
}

export function roleHasPermission(
  role: AuthRole,
  permission: AuthPermission,
) {
  return ROLE_PERMISSIONS[role].includes(permission)
}

export function roleHasEveryPermission(
  role: AuthRole,
  permissions: AuthPermission[],
) {
  return permissions.every((permission) => roleHasPermission(role, permission))
}