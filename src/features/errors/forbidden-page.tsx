import { LockKeyhole, ShieldAlert } from "lucide-react"
import { Link } from "react-router"

export function ForbiddenPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10">
          <ShieldAlert className="size-6 text-destructive" />
        </div>

        <p className="mt-6 text-sm font-medium text-muted-foreground">403</p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Access denied
        </h1>

        <p className="mt-4 text-muted-foreground">
          You do not have permission to view this page.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            to="/dashboard"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <LockKeyhole className="mr-2 size-4" />
            Go to dashboard
          </Link>

          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-md border bg-background px-4 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  )
}