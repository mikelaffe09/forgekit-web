import {
  AlertTriangle,
  DollarSign,
  Package,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { StatCard } from "../../components/shared/stat-card"
import { Badge } from "../../components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { useLocalStorageState } from "../../hooks/use-local-storage-state"
import { getProducts } from "../products/product-service"
import type { Product } from "../products/product-types"
import { getUsers } from "../users/user-service"
import type { UserRow } from "../users/user-types"

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export function DashboardPage() {
  const [products] = useLocalStorageState<Product[]>(
    "forgekit-products",
    getProducts(),
  )

  const [users] = useLocalStorageState<UserRow[]>("forgekit-users", getUsers())

  const totalProducts = products.length

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 10,
  ).length

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  )

  const totalUsers = users.length

  const activeUsers = users.filter((user) => user.status === "Active").length

  const recentProducts = products.slice(0, 3)
  const recentUsers = users.slice(0, 3)

  return (
    <DashboardLayout
      title="Dashboard"
      description="Overview powered by the reusable demo modules."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Total Users"
            value={String(totalUsers)}
            description="Saved demo users"
            icon={Users}
          />

          <StatCard
            title="Active Users"
            value={String(activeUsers)}
            description="Currently active accounts"
            icon={UserCheck}
          />

          <StatCard
            title="Products"
            value={String(totalProducts)}
            description="Saved demo products"
            icon={Package}
          />

          <StatCard
            title="Low Stock"
            value={String(lowStockProducts)}
            description="Products at 10 units or less"
            icon={AlertTriangle}
          />

          <StatCard
            title="Inventory Value"
            value={formatCurrency(inventoryValue)}
            description="Price multiplied by stock"
            icon={DollarSign}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Products</CardTitle>
              <CardDescription>
                Latest products from the reusable products module.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {recentProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between gap-4 rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {product.sku} · {product.category}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">
                      {formatCurrency(product.price)}
                    </p>

                    {product.stock === 0 ? (
                      <Badge variant="destructive">Out</Badge>
                    ) : product.stock <= 10 ? (
                      <Badge variant="secondary">{product.stock} left</Badge>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        {product.stock} in stock
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>
                Latest users from the reusable users module.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between gap-4 rounded-lg border p-3"
                >
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                  </div>

                  <div className="text-right">
                    <Badge variant="secondary">{user.role}</Badge>

                    <div className="mt-2">
                      <Badge
                        variant={
                          user.status === "Suspended"
                            ? "destructive"
                            : user.status === "Invited"
                              ? "secondary"
                              : "default"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Starter Kit Status</CardTitle>
            <CardDescription>
              Core reusable patterns already included in this project.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                "Auth",
                "Protected Routes",
                "Permissions",
                "Reusable Tables",
                "Forms",
                "CRUD Pages",
                "LocalStorage State",
                "CSV Export",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-lg border p-3"
                >
                  <TrendingUp className="size-4 text-primary" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}