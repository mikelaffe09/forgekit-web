import { AlertTriangle, CircleCheck, DollarSign, Package, Plus } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { StatCard } from "../../components/shared/stat-card"
import { DataTable } from "../../components/tables/data-table"
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

import { getProductColumns } from "./product-columns"
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

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export function ProductsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  const [products, setProducts] = useLocalStorageState<Product[]>(
    "forgekit-products",
    getProducts(),
  )

  const totalProducts = products.length

  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length

  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock <= 10,
  ).length

  const inventoryValue = products.reduce(
    (total, product) => total + product.price * product.stock,
    0,
  )

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

  function handleEditProduct(product: Product) {
    setEditingProduct(product)
  }

  function handleUpdateProduct(values: ProductFormValues) {
    if (!editingProduct) {
      return
    }

    const updatedProduct: Product = {
      ...editingProduct,
      name: values.name,
      sku: values.sku,
      category: values.category,
      price: values.price,
      stock: values.stock,
      status: values.status,
      updatedAt: getTodayDate(),
    }

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === editingProduct.id ? updatedProduct : product,
      ),
    )

    toast.success("Product updated", {
      description: `${values.name} was updated successfully.`,
    })

    setEditingProduct(null)
  }

  function handleDeleteProduct(product: Product) {
    setProducts((currentProducts) =>
      currentProducts.filter((currentProduct) => currentProduct.id !== product.id),
    )

    toast.success("Product deleted", {
      description: `${product.name} was removed from the products table.`,
    })
  }

  const columns = getProductColumns({
    onEdit: handleEditProduct,
    onDelete: handleDeleteProduct,
  })

  return (
    <DashboardLayout
      title="Products"
      description="Reusable products resource page for business apps."
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value={String(totalProducts)}
            description="Products in the table"
            icon={Package}
          />

          <StatCard
            title="Active Products"
            value={String(activeProducts)}
            description="Currently active items"
            icon={CircleCheck}
          />

          <StatCard
            title="Low Stock"
            value={String(lowStockProducts)}
            description="Items at 10 units or less"
            icon={AlertTriangle}
          />

          <StatCard
            title="Inventory Value"
            value={formatCurrency(inventoryValue)}
            description="Price multiplied by stock"
            icon={DollarSign}
          />
        </div>

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
            columns={columns}
            data={products}
            searchKey="name"
            searchPlaceholder="Search products..."
            emptyTitle="No products found"
            emptyDescription="No products match your current search."
            enableExport
            exportFileName="products"
            enableColumnVisibility
            storageKey="products"
          />
        </ResourcePage>
      </div>

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

      <Dialog
        open={Boolean(editingProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingProduct(null)
          }
        }}
      >
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit product</DialogTitle>
            <DialogDescription>
              Reusable edit-product form pattern with pre-filled values.
            </DialogDescription>
          </DialogHeader>

          {editingProduct ? (
            <ProductForm
              key={editingProduct.id}
              defaultValues={editingProduct}
              submitLabel="Update product"
              onSubmit={handleUpdateProduct}
            />
          ) : null}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}