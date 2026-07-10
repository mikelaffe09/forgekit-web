import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Plus } from "lucide-react"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { DeleteDialog } from "../../components/shared/delete-dialog"
import { DataTable } from "../../components/tables/data-table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { ResourcePage } from "../../templates/resource-page"

type User = {
  id: number
  name: string
  email: string
  role: string
  status: "Active" | "Inactive"
}

const users: User[] = [
  {
    id: 1,
    name: "Mike Laffe",
    email: "mike@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Client",
    email: "sarah@example.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "John Staff",
    email: "john@example.com",
    role: "Staff",
    status: "Inactive",
  },
]

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("name")}</span>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as User["status"]

      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DeleteDialog
          title="Delete user?"
          description={`This will permanently delete ${user.name}. This action cannot be undone.`}
          onConfirm={() => {
            console.log("Delete user:", user.id)
          }}
          trigger={
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="size-4" />
            </Button>
          }
        />
      )
    },
  },
]

export function UsersPage() {
  return (
    <DashboardLayout
      title="Users"
      description="Reusable table page pattern for business apps."
    >
      <ResourcePage
        title="Users"
        description="Reusable resource table pattern with search, actions, and status badges."
        action={
          <Button>
            <Plus className="mr-2 size-4" />
            Add user
          </Button>
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