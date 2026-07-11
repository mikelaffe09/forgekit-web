import type { ColumnDef } from "@tanstack/react-table"
import { Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { DeleteDialog } from "../../components/shared/delete-dialog"
import { DataTable } from "../../components/tables/data-table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { useLocalStorageState } from "../../hooks/use-local-storage-state"
import { ResourcePage } from "../../templates/resource-page"
import { AUTH_PERMISSIONS } from "../auth/auth-permissions"
import { PermissionGate } from "../auth/permission-gate"
import { usePermissions } from "../auth/use-permissions"

type UserStatus = "Active" | "Invited" | "Suspended"

type UserRow = {
  id: number
  name: string
  email: string
  role: string
  status: UserStatus
  joinedAt: string
}

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

function getUserColumns({
  canManageUsers,
  onDelete,
}: {
  canManageUsers: boolean
  onDelete: (user: UserRow) => void
}): ColumnDef<UserRow>[] {
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
          <div className="flex items-center justify-end">
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

export function UsersPage() {
  const { canManageUsers } = usePermissions()

  const [users, setUsers] = useLocalStorageState<UserRow[]>(
    "forgekit-users",
    defaultUsers,
  )

  function handleAddUser() {
    toast.info("Demo action", {
      description: "Connect this button to a create-user form in a real app.",
    })
  }

  function handleDeleteUser(user: UserRow) {
    setUsers((currentUsers) =>
      currentUsers.filter((currentUser) => currentUser.id !== user.id),
    )

    toast.success("User deleted", {
      description: `${user.name} was removed from the users table.`,
    })
  }

  const columns = getUserColumns({
    canManageUsers,
    onDelete: handleDeleteUser,
  })

  return (
    <DashboardLayout
      title="Users"
      description="Reusable users page with role-aware permissions."
    >
      <ResourcePage
        title="Users"
        description="Manage users, roles, statuses, and account access."
        action={
          <PermissionGate
            permissions={[AUTH_PERMISSIONS.MANAGE_USERS]}
            fallback={<Badge variant="secondary">Read-only access</Badge>}
          >
            <Button onClick={handleAddUser}>
              <Plus className="mr-2 size-4" />
              Add user
            </Button>
          </PermissionGate>
        }
      >
        <DataTable
          columns={columns}
          data={users}
          searchKey="name"
          searchPlaceholder="Search users..."
          emptyTitle="No users found"
          emptyDescription="No users match your current search."
          enableExport
          exportFileName="users"
          enableColumnVisibility
          storageKey="users"
        />
      </ResourcePage>
    </DashboardLayout>
  )
}