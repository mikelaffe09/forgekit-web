import type { Product } from "./product-types"

export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Mouse",
    sku: "WM-1001",
    category: "Accessories",
    price: 24.99,
    stock: 42,
    status: "Active",
    updatedAt: "2026-07-10",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    sku: "MK-2040",
    category: "Accessories",
    price: 89.99,
    stock: 18,
    status: "Active",
    updatedAt: "2026-07-09",
  },
  {
    id: 3,
    name: "USB-C Hub",
    sku: "UCH-310",
    category: "Adapters",
    price: 39.99,
    stock: 7,
    status: "Active",
    updatedAt: "2026-07-08",
  },
  {
    id: 4,
    name: "Laptop Stand",
    sku: "LS-455",
    category: "Office",
    price: 34.5,
    stock: 0,
    status: "Draft",
    updatedAt: "2026-07-07",
  },
  {
    id: 5,
    name: "Noise Cancelling Headphones",
    sku: "NCH-900",
    category: "Audio",
    price: 149.99,
    stock: 12,
    status: "Archived",
    updatedAt: "2026-07-06",
  },
]

export function getProducts() {
  return products
}