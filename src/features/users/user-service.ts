import type { UserRow } from "./user-types"

const defaultUsers: UserRow[] = [
  {
    id: 1,
    name: "Demo Admin",
    email: "admin@forgekit.dev",
    role: "Administrator",
    status: "Active",
    joinedAt: "2026-01-08",
  },
  {
    id: 2,
    name: "Demo Staff",
    email: "staff@forgekit.dev",
    role: "Staff",
    status: "Active",
    joinedAt: "2026-01-10",
  },
  {
    id: 3,
    name: "Sarah Chen",
    email: "sarah@example.com",
    role: "Manager",
    status: "Invited",
    joinedAt: "2026-01-14",
  },
  {
    id: 4,
    name: "Michael Ross",
    email: "michael@example.com",
    role: "Staff",
    status: "Suspended",
    joinedAt: "2026-01-17",
  },
]

export function getUsers() {
  return defaultUsers.map((user) => ({ ...user }))
}