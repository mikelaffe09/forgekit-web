import type { ColumnDef } from "@tanstack/react-table"
import { Pencil, Trash2 } from "lucide-react"

import { DeleteDialog } from "../../components/shared/delete-dialog"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"

import type { Product } from "./product-types"

type ProductColumnsOptions = {
  onEdit?: (product: Product) => void
  onDelete?: (product: Product) => void
  canManage?: boolean
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value)
}

export function getProductColumns({
  onEdit,
  onDelete,
  canManage = false,
}: ProductColumnsOptions): ColumnDef<Product>[] {
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        const product = row.original

        return (
          <div>
            <p className="font-medium">{product.name}</p>
            <p className="text-xs text-muted-foreground">{product.sku}</p>
          </div>
        )
      },
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

        if (stock === 0) {
          return <Badge variant="destructive">Out of stock</Badge>
        }

        if (stock <= 10) {
          return <Badge variant="secondary">{stock} left</Badge>
        }

        return <span>{stock}</span>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.original.status

        return (
          <Badge variant={status === "Active" ? "default" : "secondary"}>
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "updatedAt",
      header: "Updated",
    },
  ]

  if (canManage) {
    columns.push({
      id: "actions",
      header: "Actions",
      enableHiding: false,
      cell: ({ row }) => {
        const product = row.original

        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => onEdit?.(product)}
            >
              <Pencil className="size-4" />
            </Button>

            <DeleteDialog
              title="Delete product?"
              description={`This will remove ${product.name} from the products table.`}
              onConfirm={() => onDelete?.(product)}
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