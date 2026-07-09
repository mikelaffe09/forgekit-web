import { ArrowRight, Boxes, LayoutDashboard, LockKeyhole, Table2 } from "lucide-react"
import { Link } from "react-router"

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

const features = [
  {
    title: "Dashboard layouts",
    description:
      "Reusable sidebar, page shell, stat cards, and admin layout patterns.",
    icon: LayoutDashboard,
  },
  {
    title: "Auth templates",
    description:
      "Reusable login forms with validation, ready to connect to real backends.",
    icon: LockKeyhole,
  },
  {
    title: "Table patterns",
    description:
      "Reusable data table structure for users, products, invoices, tickets, and more.",
    icon: Table2,
  },
  {
    title: "Business components",
    description:
      "Shared components like page headers, empty states, delete dialogs, and stat cards.",
    icon: Boxes,
  },
]

export function LandingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
            ForgeKit Web
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Your reusable web-development starter kit.
          </h1>

          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            A practical React + TypeScript foundation for dashboards, SaaS apps,
            admin panels, landing pages, and business software.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/dashboard"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
            >
              View dashboard
              <ArrowRight className="ml-2 size-4" />
            </Link>

            <Link
              to="/login"
              className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View login template
            </Link>

            <Link
              to="/users"
              className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              View users table
            </Link>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <feature.icon className="mb-3 size-6 text-muted-foreground" />
                <CardTitle className="text-base">{feature.title}</CardTitle>
              </CardHeader>

              <CardContent className="text-sm text-muted-foreground">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}