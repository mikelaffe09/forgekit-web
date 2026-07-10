import { Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { DataTable } from "../../components/tables/data-table"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import { ResourcePage } from "../../templates/resource-page"

import { productColumns } from "./product-columns"
import { ProductForm } from "./product-form"
import type { ProductFormValues } from "./product-form"
import { getProducts } from "./product-service"

export function ProductsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const products = getProducts()

  function handleCreateProduct(values: ProductFormValues) {
    console.log("Create product:", values)

    toast.success("Product submitted", {
      description: `${values.name} was submitted successfully.`,
    })

    setIsCreateDialogOpen(false)
  }

  return (
    <DashboardLayout
      title="Products"
      description="Reusable products resource page for business apps."
    >
      <ResourcePage
        title="Products"
        description="Manage products, SKUs, categories, prices, stock levels, and statuses."
        action={
          <Button onClick={() => setIsCreateDialogOpen(true)}>
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

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add product</DialogTitle>
            <DialogDescription>
              Reusable create-product form pattern for inventory, POS, and admin
              dashboards.
            </DialogDescription>
          </DialogHeader>

          <ProductForm
            submitLabel="Create product"
            onSubmit={handleCreateProduct}
          />
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}