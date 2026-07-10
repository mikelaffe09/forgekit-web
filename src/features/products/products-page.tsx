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
import type { Product } from "./product-types"

function getTodayDate() {
  return new Date().toISOString().split("T")[0]
}

function getNextProductId(products: Product[]) {
  if (products.length === 0) {
    return 1
  }

  return Math.max(...products.map((product) => product.id)) + 1
}

export function ProductsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [products, setProducts] = useState<Product[]>(() => getProducts())

  function handleCreateProduct(values: ProductFormValues) {
    const newProduct: Product = {
      id: getNextProductId(products),
      name: values.name,
      sku: values.sku,
      category: values.category,
      price: values.price,
      stock: values.stock,
      status: values.status,
      updatedAt: getTodayDate(),
    }

    setProducts((currentProducts) => [newProduct, ...currentProducts])

    toast.success("Product created", {
      description: `${values.name} was added to the products table.`,
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