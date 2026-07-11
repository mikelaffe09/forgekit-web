import { createBrowserRouter } from "react-router"

import { AUTH_PERMISSIONS } from "../features/auth/auth-permissions"
import { PermissionProtectedRoute } from "../features/auth/permission-protected-route"
import { ProtectedRoute } from "../features/auth/protected-route"
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
        element: (
          <PermissionProtectedRoute
            permissions={[AUTH_PERMISSIONS.ACCESS_SETTINGS]}
          />
        ),
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