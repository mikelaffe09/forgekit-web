import type { ColumnDef } from "@tanstack/react-table"
import { Pencil, Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { DeleteDialog } from "../../components/shared/delete-dialog"
import { DataTable } from "../../components/tables/data-table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { useLocalStorageState } from "../../hooks/use-local-storage-state"
import { ResourcePage } from "../../templates/resource-page"
import { AUTH_PERMISSIONS } from "../auth/auth-permissions"
import { PermissionGate } from "../auth/permission-gate"
import { usePermissions } from "../auth/use-permissions"

import { UserForm } from "./user-form"
import type { UserFormValues } from "./user-form"

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

function getTodayDate() {
  return new Date().toISOString().split("T")[0]
}

function getNextUserId(users: UserRow[]) {
  if (users.length === 0) {
    return 1
  }

  return Math.max(...users.map((user) => user.id)) + 1
}

function getUserColumns({
  canManageUsers,
  onEdit,
  onDelete,
}: {
  canManageUsers: boolean
  onEdit: (user: UserRow) => void
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

export function UsersPage() {
  const { canManageUsers } = usePermissions()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserRow | null>(null)

  const [users, setUsers] = useLocalStorageState<UserRow[]>(
    "forgekit-users",
    defaultUsers,
  )

  function handleAddUser(values: UserFormValues) {
    const newUser: UserRow = {
      id: getNextUserId(users),
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
      joinedAt: getTodayDate(),
    }

    setUsers((currentUsers) => [newUser, ...currentUsers])

    toast.success("User created", {
      description: `${values.name} was added to the users table.`,
    })

    setIsCreateDialogOpen(false)
  }

  function handleEditUser(user: UserRow) {
    setEditingUser(user)
  }

  function handleUpdateUser(values: UserFormValues) {
    if (!editingUser) {
      return
    }

    const updatedUser: UserRow = {
      ...editingUser,
      name: values.name,
      email: values.email,
      role: values.role,
      status: values.status,
    }

    setUsers((currentUsers) =>
      currentUsers.map((user) =>
        user.id === editingUser.id ? updatedUser : user,
      ),
    )

    toast.success("User updated", {
      description: `${values.name} was updated successfully.`,
    })

    setEditingUser(null)
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
    onEdit: handleEditUser,
    onDelete: handleDeleteUser,
  })

  return (
    <DashboardLayout
      title="Users"
      description="Reusable users page with permission-aware actions."
    >
      <ResourcePage
        title="Users"
        description="Manage users, roles, statuses, and account access."
        action={
          <PermissionGate
            permissions={[AUTH_PERMISSIONS.MANAGE_USERS]}
            fallback={<Badge variant="secondary">Read-only access</Badge>}
          >
            <Button onClick={() => setIsCreateDialogOpen(true)}>
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add user</DialogTitle>
            <DialogDescription>
              Create a demo user with a role, status, and account details.
            </DialogDescription>
          </DialogHeader>

          <UserForm submitLabel="Create user" onSubmit={handleAddUser} />
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(editingUser)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingUser(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit user</DialogTitle>
            <DialogDescription>
              Update user details, role, and account status.
            </DialogDescription>
          </DialogHeader>

          {editingUser ? (
            <UserForm
              key={editingUser.id}
              defaultValues={editingUser}
              submitLabel="Update user"
              onSubmit={handleUpdateUser}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}