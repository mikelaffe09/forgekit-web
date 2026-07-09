import { zodResolver } from "@hookform/resolvers/zod"
import { LockKeyhole } from "lucide-react"
import { useForm } from "react-hook-form"
import { Link } from "react-router"
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

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
})

type SignInFormValues = z.infer<typeof signInSchema>

export function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  function onSubmit(values: SignInFormValues) {
    console.log("Sign in values:", values)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-6 py-12">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="mb-6 inline-block text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back home
        </Link>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
              <LockKeyhole className="size-6 text-primary" />
            </div>

            <CardTitle className="text-2xl">Sign in</CardTitle>

            <CardDescription>
              Reusable authentication page template for future apps.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="Email"
                type="email"
                placeholder="mike@example.com"
                error={errors.email?.message}
                {...register("email")}
              />

              <TextField
                label="Password"
                type="password"
                placeholder="••••••••"
                error={errors.password?.message}
                {...register("password")}
              />

              <Button className="w-full" type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Forgot your password?{" "}
              <span className="font-medium text-foreground">
                Reset template coming later
              </span>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}