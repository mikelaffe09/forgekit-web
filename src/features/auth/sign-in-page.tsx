import { zodResolver } from "@hookform/resolvers/zod"
import { ShieldCheck } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link, Navigate, useLocation, useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"

import { TextField } from "../../components/forms/text-field"
import { Button } from "../../components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"
import { APP_CONFIG, DEMO_LOGINS } from "../../config/app-config"

import { useAuth } from "./auth-context"

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(6, "Password must be at least 6 characters."),
})

type SignInFormValues = z.infer<typeof signInSchema>

function getRedirectPath(state: unknown) {
  if (
    typeof state === "object" &&
    state !== null &&
    "from" in state &&
    typeof state.from === "string"
  ) {
    return state.from
  }

  return "/dashboard"
}

export function SignInPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { signIn, isAuthenticated } = useAuth()

  const redirectPath = getRedirectPath(location.state)

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: DEMO_LOGINS.ADMIN.email,
      password: DEMO_LOGINS.ADMIN.password,
    },
  })

  function handleSubmit(values: SignInFormValues) {
    signIn(values)

    toast.success("Signed in", {
      description: `Welcome back to ${APP_CONFIG.name}.`,
    })

    navigate(redirectPath, {
      replace: true,
    })
  }

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <Link to="/" className="inline-flex items-center gap-2 font-semibold">
            <ShieldCheck className="size-5" />
            {APP_CONFIG.name}
          </Link>

          <p className="mt-2 text-sm text-muted-foreground">
            Demo authentication pattern for reusable business apps.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Use one of the demo accounts below or enter any valid email and a
              password with at least 6 characters.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form
              className="space-y-4"
              onSubmit={form.handleSubmit(handleSubmit)}
            >
              <TextField
                label="Email"
                type="email"
                placeholder={DEMO_LOGINS.ADMIN.email}
                error={form.formState.errors.email?.message}
                {...form.register("email")}
              />

              <TextField
                label="Password"
                type="password"
                placeholder={DEMO_LOGINS.ADMIN.password}
                error={form.formState.errors.password?.message}
                {...form.register("password")}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Sign in
              </Button>
            </form>

            <div className="mt-6 rounded-lg border bg-muted/50 p-3 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Demo logins</p>

              <div className="mt-3 space-y-3">
                <div>
                  <p className="font-medium text-foreground">Administrator</p>
                  <p>Email: {DEMO_LOGINS.ADMIN.email}</p>
                  <p>Password: {DEMO_LOGINS.ADMIN.password}</p>
                </div>

                <div>
                  <p className="font-medium text-foreground">Staff</p>
                  <p>Email: {DEMO_LOGINS.STAFF.email}</p>
                  <p>Password: {DEMO_LOGINS.STAFF.password}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}