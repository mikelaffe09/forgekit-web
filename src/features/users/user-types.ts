export type UserStatus = "Active" | "Invited" | "Suspended"

export type UserRow = {
  id: number
  name: string
  email: string
  role: string
  status: UserStatus
  joinedAt: string
}