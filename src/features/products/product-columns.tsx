import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { DeleteDialog } from "../../components/shared/delete-dialog"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

import type { Product } from "./product-types"

type ProductColumnsOptions = {
  onDelete: (product: Product) => void
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

function getStatusVariant(status: Product["status"]) {
  if (status === "Active") {
    return "default"
  }

  if (status === "Draft") {
    return "secondary"
  }

  return "outline"
}

export function getProductColumns({
  onDelete,
}: ProductColumnsOptions): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">{row.original.sku}</p>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => formatCurrency(row.original.price),
    },
    {
      accessorKey: "stock",
      header: "Stock",
      cell: ({ row }) => {
        const stock = row.original.stock

        return (
          <span
            className={
              stock === 0
                ? "font-medium text-destructive"
                : stock <= 10
                  ? "font-medium text-amber-600"
                  : "font-medium"
            }
          >
            {stock}
          </span>
        )
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status

        return <Badge variant={getStatusVariant(status)}>{status}</Badge>
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original

        return (
          <DeleteDialog
            title="Delete product?"
            description={`This will permanently delete ${product.name}. This action cannot be undone.`}
            onConfirm={() => onDelete(product)}
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
}