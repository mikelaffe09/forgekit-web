import { Plus } from "lucide-react"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { DataTable } from "../../components/tables/data-table"
import { Button } from "../../components/ui/button"
import { ResourcePage } from "../../templates/resource-page"

import { productColumns } from "./product-columns"
import { getProducts } from "./product-service"

export function ProductsPage() {
  const products = getProducts()

  return (
    <DashboardLayout
      title="Products"
      description="Reusable products resource page for business apps."
    >
      <ResourcePage
        title="Products"
        description="Manage products, SKUs, categories, prices, stock levels, and statuses."
        action={
          <Button>
            <Plus className="mr-2 size-4" />
            Add product
          </Button>
        }
      >
        <DataTable
          columns={productColumns}
          data={products}
          searchKey="name"
          searchPlaceholder="Search products..."
          emptyTitle="No products found"
          emptyDescription="No products match your current search."
        />
      </ResourcePage>
    </DashboardLayout>
  )
}