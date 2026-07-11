import {
  Plus,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { ConfirmDialog } from "../../components/shared/confirm-dialog"
import { StatCard } from "../../components/shared/stat-card"
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

import { getUserColumns } from "./user-columns"
import { UserForm } from "./user-form"
import type { UserFormValues } from "./user-form"
import { getUsers } from "./user-service"
import type { UserRow } from "./user-types"

function getTodayDate() {
  return new Date().toISOString().split("T")[0]
}

function getNextUserId(users: UserRow[]) {
  if (users.length === 0) {
    return 1
  }

  return Math.max(...users.map((user) => user.id)) + 1
}

export function UsersPage() {
  const { canManageUsers } = usePermissions()
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserRow | null>(null)

  const [users, setUsers] = useLocalStorageState<UserRow[]>(
    "forgekit-users",
    getUsers(),
  )

  const totalUsers = users.length

  const activeUsers = users.filter((user) => user.status === "Active").length

  const invitedUsers = users.filter((user) => user.status === "Invited").length

  const administratorUsers = users.filter(
    (user) => user.role === "Administrator",
  ).length

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

  function handleResetUsers() {
    setUsers(getUsers())

    toast.success("Demo users reset", {
      description: "The users table was restored to the original demo data.",
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
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Users"
            value={String(totalUsers)}
            description="Users in the table"
            icon={Users}
          />

          <StatCard
            title="Active Users"
            value={String(activeUsers)}
            description="Currently active accounts"
            icon={UserCheck}
          />

          <StatCard
            title="Invited Users"
            value={String(invitedUsers)}
            description="Pending invitations"
            icon={UserPlus}
          />

          <StatCard
            title="Administrators"
            value={String(administratorUsers)}
            description="Users with admin role"
            icon={ShieldCheck}
          />
        </div>

        <ResourcePage
          title="Users"
          description="Manage users, roles, statuses, and account access."
          action={
            <PermissionGate
              permissions={[AUTH_PERMISSIONS.MANAGE_USERS]}
              fallback={<Badge variant="secondary">Read-only access</Badge>}
            >
              <div className="flex flex-wrap gap-2">
                <ConfirmDialog
                  title="Reset demo users?"
                  description="This will replace the current users table with the original demo users. Your local user changes will be removed."
                  confirmLabel="Reset users"
                  onConfirm={handleResetUsers}
                  trigger={
                    <Button variant="outline">
                      <RotateCcw className="mr-2 size-4" />
                      Reset demo users
                    </Button>
                  }
                />

                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="mr-2 size-4" />
                  Add user
                </Button>
              </div>
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
      </div>

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