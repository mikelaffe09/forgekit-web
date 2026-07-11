import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"

import { Toaster } from "../components/ui/sonner"
import { AuthProvider } from "../features/auth/auth-context"

type AppProvidersProps = {
  children: React.ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}

        <Toaster richColors position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  )
}