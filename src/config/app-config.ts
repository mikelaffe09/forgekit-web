import { AUTH_ROLES } from "../features/auth/auth-roles"

export const APP_CONFIG = {
  name: "ForgeKit Web",
  tagline: "Reusable starter",
  description: "Reusable React, TypeScript, Tailwind, and shadcn starter kit.",
} as const

export const DEMO_LOGINS = {
  ADMIN: {
    name: "Demo Admin",
    email: "admin@forgekit.dev",
    password: "password",
    role: AUTH_ROLES.ADMINISTRATOR,
  },
  STAFF: {
    name: "Demo Staff",
    email: "staff@forgekit.dev",
    password: "password",
    role: AUTH_ROLES.STAFF,
  },
} as const