import { createBrowserRouter } from "react-router"

import { SignInPage } from "../features/auth/sign-in-page"
import { DashboardPage } from "../features/dashboard/dashboard-page"
import { LandingPage } from "../features/landing/landing-page"
import { NotFoundPage } from "../features/not-found/not-found-page"
import { ProductsPage } from "../features/products/products-page"
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
    path: "/settings",
    element: <SettingsPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
])