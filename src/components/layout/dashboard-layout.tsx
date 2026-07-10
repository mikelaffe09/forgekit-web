import {
  BarChart3,
  Home,
  Menu,
  Package,
  Settings,
  Users,
} from "lucide-react"
import type { ReactNode } from "react"
import { useState } from "react"
import { Link, useLocation } from "react-router"

import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet"

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

function SidebarBrand() {
  return (
    <Link to="/" className="block">
      <div className="rounded-lg border bg-card p-4">
        <p className="text-sm font-semibold">ForgeKit Web</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Reusable starter
        </p>
      </div>
    </Link>
  )
}

type SidebarNavProps = {
  onNavigate?: () => void
}

function SidebarNav({ onNavigate }: SidebarNavProps) {
  const location = useLocation()

  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href

        return (
          <Link
            key={item.label}
            to={item.href}
            onClick={onNavigate}
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
  )
}

export function DashboardLayout({
  children,
  title,
  description,
}: DashboardLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-muted/30">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r bg-background p-4 md:block">
        <SidebarBrand />

        <Separator className="my-4" />

        <SidebarNav />
      </aside>

      <Sheet open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 p-4">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>

          <SidebarBrand />

          <Separator className="my-4" />

          <SidebarNav onNavigate={() => setMobileSidebarOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="md:pl-64">
        <header className="sticky top-0 z-10 border-b bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileSidebarOpen(true)}
              >
                <Menu className="size-4" />
              </Button>

              <div>
                <h1 className="text-xl font-semibold tracking-tight">
                  {title}
                </h1>

                {description ? (
                  <p className="text-sm text-muted-foreground">
                    {description}
                  </p>
                ) : null}
              </div>
            </div>

            <Link
              to="/"
              className="hidden h-9 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
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