import type { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"

import { DeleteDialog } from "../../components/shared/delete-dialog"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

import type { UserRow } from "./user-types"

type UserColumnsOptions = {
  canManageUsers: boolean
  onEdit: (user: UserRow) => void
  onDelete: (user: UserRow) => void
}

export function getUserColumns({
  canManageUsers,
  onEdit,
  onDelete,
}: UserColumnsOptions): ColumnDef<UserRow>[] {
  const columns: ColumnDef<UserRow>[] = [
    {
      accessorKey: "name",
      header: "User",
      cell: ({ row }) => {
        const user = row.original

        return (
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        )
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => <Badge variant="secondary">{row.original.role}</Badge>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status

        return (
          <Badge
            variant={
              status === "Suspended"
                ? "destructive"
                : status === "Invited"
                  ? "secondary"
                  : "default"
            }
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "joinedAt",
      header: "Joined",
    },
  ]

  if (canManageUsers) {
    columns.push({
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit(user)}
            >
              <Pencil className="size-4" />
            </Button>

            <DeleteDialog
              title="Delete user?"
              description={`This will remove ${user.name} from the users table.`}
              onConfirm={() => onDelete(user)}
              trigger={
                <Button variant="outline" size="icon">
                  <Trash2 className="size-4" />
                </Button>
              }
            />
          </div>
        )
      },
    })
  }

  return columns
}