import { zodResolver } from "@hookform/resolvers/zod"
import { Save } from "lucide-react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { TextareaField } from "../../components/forms/textarea-field"
import { TextField } from "../../components/forms/text-field"
import { DashboardLayout } from "../../components/layout/dashboard-layout"
import { PageHeader } from "../../components/shared/page-header"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

const settingsSchema = z.object({
  companyName: z.string().min(2, "Company name is required."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(5, "Phone number is required."),
  website: z.string().url("Enter a valid URL."),
  address: z.string().min(5, "Address is required."),
  notes: z.string().optional(),
})

type SettingsFormValues = z.infer<typeof settingsSchema>

export function SettingsPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: "ForgeKit Demo Company",
      email: "hello@example.com",
      phone: "+1 555 000 0000",
      website: "https://example.com",
      address: "123 Business Street",
      notes: "Reusable settings page template for future apps.",
    },
  })

  function onSubmit(values: SettingsFormValues) {
    console.log("Settings saved:", values)

    toast.success("Settings saved", {
      description: "This is a reusable settings form pattern.",
    })
  }

  return (
    <DashboardLayout
      title="Settings"
      description="Reusable settings page pattern for business apps."
    >
      <div className="space-y-6">
        <PageHeader
          title="Company settings"
          description="Reusable form layout for profile, company, app, and account settings."
        />

        <Card>
          <CardHeader>
            <CardTitle>General information</CardTitle>
          </CardHeader>

          <CardContent>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="Company name"
                  placeholder="Your company"
                  error={errors.companyName?.message}
                  {...register("companyName")}
                />

                <TextField
                  label="Email"
                  type="email"
                  placeholder="hello@example.com"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <TextField
                  label="Phone"
                  placeholder="+1 555 000 0000"
                  error={errors.phone?.message}
                  {...register("phone")}
                />

                <TextField
                  label="Website"
                  placeholder="https://example.com"
                  error={errors.website?.message}
                  {...register("website")}
                />
              </div>

              <TextField
                label="Address"
                placeholder="Business address"
                error={errors.address?.message}
                {...register("address")}
              />

              <TextareaField
                label="Notes"
                placeholder="Internal notes..."
                error={errors.notes?.message}
                {...register("notes")}
              />

              <Button type="submit" disabled={isSubmitting}>
                <Save className="mr-2 size-4" />
                {isSubmitting ? "Saving..." : "Save settings"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}