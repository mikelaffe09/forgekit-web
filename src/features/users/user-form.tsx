import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { SelectField } from "../../components/forms/select-field"
import { TextField } from "../../components/forms/text-field"
import { Button } from "../../components/ui/button"

const userFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  role: z.string().min(2, "Role is required."),
  status: z.enum(["Active", "Invited", "Suspended"]),
})

export type UserFormValues = z.infer<typeof userFormSchema>

type UserFormProps = {
  defaultValues?: Partial<UserFormValues>
  submitLabel?: string
  onSubmit: (values: UserFormValues) => void
}

export function UserForm({
  defaultValues,
  submitLabel = "Save user",
  onSubmit,
}: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      email: defaultValues?.email ?? "",
      role: defaultValues?.role ?? "Staff",
      status: defaultValues?.status ?? "Invited",
    },
  })

  return (
    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
      <TextField
        label="Name"
        placeholder="Jane Smith"
        error={form.formState.errors.name?.message}
        {...form.register("name")}
      />

      <TextField
        label="Email"
        type="email"
        placeholder="jane@example.com"
        error={form.formState.errors.email?.message}
        {...form.register("email")}
      />

      <SelectField
        label="Role"
        error={form.formState.errors.role?.message}
        options={[
          {
            label: "Administrator",
            value: "Administrator",
          },
          {
            label: "Manager",
            value: "Manager",
          },
          {
            label: "Staff",
            value: "Staff",
          },
        ]}
        {...form.register("role")}
      />

      <SelectField
        label="Status"
        error={form.formState.errors.status?.message}
        options={[
          {
            label: "Active",
            value: "Active",
          },
          {
            label: "Invited",
            value: "Invited",
          },
          {
            label: "Suspended",
            value: "Suspended",
          },
        ]}
        {...form.register("status")}
      />

      <Button type="submit" className="w-full">
        {submitLabel}
      </Button>
    </form>
  )
}