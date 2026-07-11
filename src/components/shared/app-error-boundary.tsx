import { AlertTriangle, RotateCcw } from "lucide-react"
import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"

import { Button } from "../ui/button"

type AppErrorBoundaryProps = {
  children: ReactNode
}

type AppErrorBoundaryState = {
  hasError: boolean
  errorMessage?: string
}

export class AppErrorBoundary extends Component<
  AppErrorBoundaryProps,
  AppErrorBoundaryState
> {
  state: AppErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error): AppErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error.message,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Application error:", error)
    console.error("Error details:", errorInfo)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
          <div className="w-full max-w-md text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="size-6 text-destructive" />
            </div>

            <h1 className="mt-6 text-3xl font-bold tracking-tight">
              Something went wrong
            </h1>

            <p className="mt-4 text-muted-foreground">
              The app hit an unexpected error. Try reloading the page.
            </p>

            {this.state.errorMessage ? (
              <div className="mt-6 rounded-lg border bg-background p-3 text-left text-sm text-muted-foreground">
                <p className="font-medium text-foreground">Error message</p>
                <p className="mt-1 break-words">{this.state.errorMessage}</p>
              </div>
            ) : null}

            <Button className="mt-6" onClick={this.handleReload}>
              <RotateCcw className="mr-2 size-4" />
              Reload page
            </Button>
          </div>
        </main>
      )
    }

    return this.props.children
  }
}