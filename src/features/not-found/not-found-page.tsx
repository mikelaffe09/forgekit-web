import { ArrowLeft, SearchX } from "lucide-react"
import { Link } from "react-router"

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-12">
      <div className="mx-auto max-w-md text-center">
        <div className="mx-auto mb-6 flex size-14 items-center justify-center rounded-full bg-background shadow-xs">
          <SearchX className="size-7 text-muted-foreground" />
        </div>

        <p className="text-sm font-medium uppercase tracking-[0.3em] text-muted-foreground">
          404
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 text-muted-foreground">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-xs transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back home
          </Link>
        </div>
      </div>
    </main>
  )
}