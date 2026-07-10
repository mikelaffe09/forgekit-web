import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { SelectField } from "../../components/forms/select-field"
import { TextField } from "../../components/forms/text-field"
import { Button } from "../../components/ui/button"

import type { Product } from "./product-types"

const productSchema = z.object({
  name: z.string().min(2, "Product name is required."),
  sku: z.string().min(2, "SKU is required."),
  category: z.string().min(2, "Category is required."),
  price: z.number().positive("Price must be greater than zero."),
  stock: z
    .number()
    .int("Stock must be a whole number.")
    .min(0, "Stock cannot be negative."),
  status: z.enum(["Active", "Draft", "Archived"]),
})

export type ProductFormValues = z.infer<typeof productSchema>

type ProductFormProps = {
  defaultValues?: Partial<Product>
  submitLabel?: string
  onSubmit?: (values: ProductFormValues) => void
}

const statusOptions = [
  {
    label: "Active",
    value: "Active",
  },
  {
    label: "Draft",
    value: "Draft",
  },
  {
    label: "Archived",
    value: "Archived",
  },
]

const categoryOptions = [
  {
    label: "Accessories",
    value: "Accessories",
  },
  {
    label: "Adapters",
    value: "Adapters",
  },
  {
    label: "Audio",
    value: "Audio",
  },
  {
    label: "Office",
    value: "Office",
  },
  {
    label: "Other",
    value: "Other",
  },
]

export function ProductForm({
  defaultValues,
  submitLabel = "Save product",
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      sku: defaultValues?.sku ?? "",
      category: defaultValues?.category ?? "Accessories",
      price: defaultValues?.price ?? 1,
      stock: defaultValues?.stock ?? 0,
      status: defaultValues?.status ?? "Active",
    },
  })

  function handleFormSubmit(values: ProductFormValues) {
    if (onSubmit) {
      onSubmit(values)
      return
    }

    console.log("Product form submitted:", values)
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Product name"
          placeholder="Wireless Mouse"
          error={errors.name?.message}
          {...register("name")}
        />

        <TextField
          label="SKU"
          placeholder="WM-1001"
          error={errors.sku?.message}
          {...register("sku")}
        />

        <SelectField
          label="Category"
          error={errors.category?.message}
          options={categoryOptions}
          {...register("category")}
        />

        <SelectField
          label="Status"
          error={errors.status?.message}
          options={statusOptions}
          {...register("status")}
        />

        <TextField
          label="Price"
          type="number"
          min="0"
          step="0.01"
          placeholder="24.99"
          error={errors.price?.message}
          {...register("price", {
            valueAsNumber: true,
          })}
        />

        <TextField
          label="Stock"
          type="number"
          min="0"
          step="1"
          placeholder="42"
          error={errors.stock?.message}
          {...register("stock", {
            valueAsNumber: true,
          })}
        />
      </div>

      <Button type="submit" disabled={isSubmitting}>
        <Save className="mr-2 size-4" />
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </form>
  )
}