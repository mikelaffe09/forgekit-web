import { ArrowLeft, Home } from "lucide-react"
import { Link } from "react-router"

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <p className="text-sm font-medium text-muted-foreground">404</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <Home className="mr-2 size-4" />
            Go home
          </Link>

          <Link
            to="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to dashboard
          </Link>
        </div>
      </div>
    </main>
  )
}