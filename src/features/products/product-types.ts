export type ProductStatus = "Active" | "Draft" | "Archived"

export type Product = {
  id: number
  name: string
  sku: string
  category: string
  price: number
  stock: number
  status: ProductStatus
  updatedAt: string
}