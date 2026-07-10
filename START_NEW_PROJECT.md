# Starting a New Project From ForgeKit Web

This guide explains how to start a new web project using ForgeKit Web as the base.

ForgeKit Web is a reusable React + TypeScript starter kit that already includes routing, dashboard layouts, UI components, forms, tables, auth templates, settings pages, API helpers, and CI.

The point is simple: do not rebuild the same setup from zero every time.

---

## 1. Clone the Starter Into a New Project Folder

Use this command:

```bash
git clone https://github.com/mikelaffe09/forgekit-web.git new-project-name
```

Example:

```bash
git clone https://github.com/mikelaffe09/forgekit-web.git inventory-dashboard
```

Then enter the project:

```bash
cd inventory-dashboard
```

---

## 2. Remove the Old Git History

The cloned project is still connected to the original ForgeKit Web repository.

For a new project, remove the old Git history:

```bash
Remove-Item -Recurse -Force .git
```

On macOS/Linux:

```bash
rm -rf .git
```

Now initialize a fresh Git repo:

```bash
git init
git add .
git commit -m "Initial project from ForgeKit Web"
git branch -M main
```

---

## 3. Install Dependencies

Run:

```bash
npm install
```

Then start the app:

```bash
npm run dev
```

Open the local URL shown in the terminal.

Usually it will be:

```txt
http://localhost:5173/
```

If another port is used, open the port Vite shows.

---

## 4. Confirm the Starter Works

Check these pages:

```txt
/
 /login
 /dashboard
 /users
 /settings
 /random-page
```

Expected result:

| Route          | Expected Page       |
| -------------- | ------------------- |
| `/`            | Landing page        |
| `/login`       | Sign-in template    |
| `/dashboard`   | Dashboard page      |
| `/users`       | Users table example |
| `/settings`    | Settings form       |
| `/random-page` | 404 page            |

If these work, the starter is healthy.

Now run:

```bash
npm run build
```

The build should pass before you start changing the project.

---

## 5. Rename the Project

Open `package.json`.

Change this:

```json
"name": "forgekit-web"
```

To your new project name.

Example:

```json
"name": "inventory-dashboard"
```

Also update the page text inside the app.

Common places to update:

```txt
src/features/landing/landing-page.tsx
src/components/layout/dashboard-layout.tsx
README.md
```

Search the project for:

```txt
ForgeKit Web
```

Replace it with the new project name.

---

## 6. Update Environment Variables

Copy `.env.example` into a real `.env` file:

```bash
Copy-Item .env.example .env
```

On macOS/Linux:

```bash
cp .env.example .env
```

Then edit:

```env
VITE_API_BASE_URL=http://localhost:3000
```

Use the real backend URL for the project.

Examples:

```env
VITE_API_BASE_URL=http://localhost:5000
```

or:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
```

Never commit real secrets to GitHub.

---

## 7. Decide What Type of Project This Is

Before coding randomly, define the project type.

Examples:

```txt
Business website
Admin dashboard
SaaS app
CRM
Inventory system
Booking platform
Client portal
POS admin panel
CMS
Internal tool
```

This matters because it decides what pages and components you keep.

---

## 8. Remove Demo Pages You Do Not Need

ForgeKit includes demo pages to show reusable patterns.

You can keep or remove them.

Common demo files:

```txt
src/features/users/users-page.tsx
src/features/settings/settings-page.tsx
src/features/dashboard/dashboard-page.tsx
```

If your new project needs users/settings/dashboard, keep them and modify them.

If not, remove the route from:

```txt
src/app/router.tsx
```

Example route removal:

```tsx
{
  path: "/users",
  element: <UsersPage />,
}
```

Also remove unused imports from the same file.

After removing routes, run:

```bash
npm run build
```

Do not leave broken imports. That is sloppy.

---

## 9. Create the First Real Feature

Use the existing structure:

```txt
src/features/
```

Example: for an inventory app, create:

```txt
src/features/products/
```

Possible files:

```txt
src/features/products/products-page.tsx
src/features/products/product-form.tsx
src/features/products/product-columns.tsx
src/features/products/product-types.ts
src/features/products/product-service.ts
```

This pattern keeps features organized.

Do not dump everything into `components/`. That turns the project into garbage fast.

---

## 10. Use the Existing Resource Page Pattern

For business list pages, use:

```tsx
<ResourcePage />
```

Example:

```tsx
<ResourcePage
  title="Products"
  description="Manage product inventory and stock levels."
  action={<Button>Add product</Button>}
>
  <DataTable
    columns={columns}
    data={products}
    searchKey="name"
    searchPlaceholder="Search products..."
    emptyTitle="No products found"
    emptyDescription="No products match your current search."
  />
</ResourcePage>
```

This keeps list pages consistent.

Good use cases:

```txt
Products
Customers
Invoices
Orders
Tickets
Appointments
Users
Services
Categories
Suppliers
```

---

## 11. Use the Existing Dashboard Layout

Dashboard pages should be wrapped with:

```tsx
<DashboardLayout title="Dashboard" description="Short page description.">
  Page content here
</DashboardLayout>
```

This gives you:

```txt
Sidebar
Top header
Consistent spacing
Navigation structure
Reusable admin layout
```

Do not create a new dashboard shell for every project. Reuse the one already built.

---

## 12. Use the Existing Form Components

Use these for forms:

```txt
TextField
TextareaField
```

Example:

```tsx
<TextField
  label="Product name"
  placeholder="Enter product name"
  error={errors.name?.message}
  {...register("name")}
/>
```

For validation, use:

```txt
React Hook Form
Zod
@hookform/resolvers
```

Example:

```tsx
const productSchema = z.object({
  name: z.string().min(2, "Product name is required."),
  price: z.number().positive("Price must be greater than zero."),
});
```

This gives clean validation and avoids messy manual form logic.

---

## 13. Use the API Client

The starter includes:

```txt
src/services/api-client.ts
```

Use it instead of writing random `fetch()` calls everywhere.

Example:

```ts
import { apiClient } from "../../services/api-client";

type Product = {
  id: number;
  name: string;
  price: number;
};

export function getProducts() {
  return apiClient.get<Product[]>("/products");
}
```

With query params:

```ts
apiClient.get<Product[]>("/products", {
  params: {
    search: "phone",
    page: 1,
  },
});
```

With POST:

```ts
apiClient.post<Product>("/products", {
  name: "iPhone 15",
  price: 799,
});
```

Keep API calls inside service files, not inside random UI components.

---

## 14. Recommended Feature Folder Pattern

Use this pattern for each serious feature:

```txt
src/features/products/
  products-page.tsx
  product-form.tsx
  product-columns.tsx
  product-types.ts
  product-service.ts
```

What each file does:

| File                  | Purpose                  |
| --------------------- | ------------------------ |
| `products-page.tsx`   | Main page UI             |
| `product-form.tsx`    | Create/edit form         |
| `product-columns.tsx` | Table column definitions |
| `product-types.ts`    | TypeScript types         |
| `product-service.ts`  | API calls                |

This structure scales better than throwing everything into one giant file.

---

## 15. Add the New Route

Open:

```txt
src/app/router.tsx
```

Add the route.

Example:

```tsx
import { ProductsPage } from "../features/products/products-page";

export const router = createBrowserRouter([
  {
    path: "/products",
    element: <ProductsPage />,
  },
]);
```

Also add the sidebar link inside:

```txt
src/components/layout/dashboard-layout.tsx
```

Example:

```tsx
{
  label: "Products",
  href: "/products",
  icon: Package,
}
```

Remember to import the icon from `lucide-react`.

---

## 16. Commit in Small Checkpoints

Do not make 50 changes and commit once. That is amateur.

Use small clean commits.

Good examples:

```bash
git add .
git commit -m "Rename project branding"
git push
```

```bash
git add .
git commit -m "Add products resource page"
git push
```

```bash
git add .
git commit -m "Add product form validation"
git push
```

Before every commit, run:

```bash
npm run build
```

Only commit if the build passes.

---

## 17. Connect to a New GitHub Repo

Create a new empty GitHub repository.

Do not initialize it with README, `.gitignore`, or license if your local project already has files.

Then connect it:

```bash
git remote add origin https://github.com/mikelaffe09/new-project-name.git
git push -u origin main
```

If origin already exists:

```bash
git remote set-url origin https://github.com/mikelaffe09/new-project-name.git
git push -u origin main
```

Check current remote:

```bash
git remote -v
```

---

## 18. Update the README for the New Project

Do not leave the ForgeKit README unchanged in a real project.

Replace it with a README about the actual app.

Minimum sections:

```txt
Project name
Description
Tech stack
Features
Pages
Setup instructions
Environment variables
Build command
Screenshots
Roadmap
```

A starter-kit README inside a real app looks lazy. Update it.

---

## 19. Common Mistakes to Avoid

Do not do this:

```txt
Leave "ForgeKit Web" everywhere
Keep demo users forever
Commit broken builds
Write fetch calls directly in components
Put all code inside one file
Create random folders with no structure
Leave unused routes
Leave old GitHub remote connected
Push real secrets
Skip README updates
```

Those mistakes make the project look unfinished.

---

## 20. Clean New Project Checklist

Before calling the new project ready, confirm:

```txt
Project renamed
ForgeKit branding removed or intentionally kept
New GitHub repo connected
README updated
.env.example exists
npm install works
npm run dev works
npm run build passes
Main routes work
Unused demo pages removed or customized
GitHub Actions passes
```

---

## Recommended Workflow Summary

Use this every time:

```bash
git clone https://github.com/mikelaffe09/forgekit-web.git new-project-name
cd new-project-name
Remove-Item -Recurse -Force .git
git init
npm install
npm run dev
npm run build
git add .
git commit -m "Initial project from ForgeKit Web"
git branch -M main
git remote add origin https://github.com/mikelaffe09/new-project-name.git
git push -u origin main
```

Then start building the actual app.

---

## Final Rule

ForgeKit Web is not the final product.

It is the starting point.

Use it to skip repetitive setup, then replace the demo content with real project-specific features as fast as possible.
