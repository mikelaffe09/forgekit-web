import { createBrowserRouter } from "react-router"

import { ProtectedRoute } from "../features/auth/protected-route"
import { RoleProtectedRoute } from "../features/auth/role-protected-route"
import { SignInPage } from "../features/auth/sign-in-page"
import { DashboardPage } from "../features/dashboard/dashboard-page"
import { ForbiddenPage } from "../features/errors/forbidden-page"
import { NotFoundPage } from "../features/errors/not-found-page"
import { LandingPage } from "../features/landing/landing-page"
import { ProductsPage } from "../features/products/products-page"
import { ReportsPage } from "../features/reports/reports-page"
import { SettingsPage } from "../features/settings/settings-page"
import { UsersPage } from "../features/users/users-page"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <SignInPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/users",
        element: <UsersPage />,
      },
      {
        path: "/products",
        element: <ProductsPage />,
      },
      {
        path: "/reports",
        element: <ReportsPage />,
      },
      {
        element: <RoleProtectedRoute allowedRoles={["Administrator"]} />,
        children: [
          {
            path: "/settings",
            element: <SettingsPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/403",
    element: <ForbiddenPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])