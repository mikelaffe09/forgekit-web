import { BarChart3, Home, Package, Settings, Users } from "lucide-react"
import type { ReactNode } from "react"
import { Link, useLocation } from "react-router"

import { Separator } from "../ui/separator"

type DashboardLayoutProps = {
  children: ReactNode
  title: string
  description?: string
}

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    label: "Users",
    href: "/users",
    icon: Users,
  },
  {
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    label: "Reports",
    href: "#",
    icon: BarChart3,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export function DashboardLayout({
  children,
  title,
  description,
}: DashboardLayoutProps) {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background p-4 md:block">
        <Link to="/" className="block">
          <div className="rounded-lg border bg-card p-4">
            <p className="text-sm font-semibold">ForgeKit Web</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Reusable starter
            </p>
          </div>
        </Link>

        <Separator className="my-4" />

        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href

            return (
              <Link
                key={item.label}
                to={item.href}
                className={[
                  "flex h-10 w-full items-center rounded-md px-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                ].join(" ")}
              >
                <item.icon className="mr-2 size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>

              {description ? (
                <p className="text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>

            <Link
              to="/"
              className="inline-flex h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Back home
            </Link>
          </div>
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}