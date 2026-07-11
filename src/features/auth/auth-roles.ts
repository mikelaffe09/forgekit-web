export const AUTH_ROLES = {
  ADMINISTRATOR: "Administrator",
  STAFF: "Staff",
} as const

export type AuthRole = (typeof AUTH_ROLES)[keyof typeof AUTH_ROLES]