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
      email: "admin@forgekit.dev",
      password: "password",
    },
  })

  function handleSubmit(values: SignInFormValues) {
    signIn(values)

    toast.success("Signed in", {
      description: "Welcome back to ForgeKit Web.",
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
            ForgeKit Web
          </Link>

          <p className="mt-2 text-sm text-muted-foreground">
            Demo authentication pattern for reusable business apps.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
            <CardDescription>
              Use the demo credentials or enter any valid email and a password
              with at least 6 characters.
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
                placeholder="admin@forgekit.dev"
                error={form.formState.errors.email?.message}
                {...form.register("email")}
              />

              <TextField
                label="Password"
                type="password"
                placeholder="password"
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
      <p>Email: admin@forgekit.dev</p>
      <p>Password: password</p>
    </div>

    <div>
      <p className="font-medium text-foreground">Staff</p>
      <p>Email: staff@forgekit.dev</p>
      <p>Password: password</p>
    </div>
  </div>
</div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}