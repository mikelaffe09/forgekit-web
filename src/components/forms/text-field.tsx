import type { ComponentPropsWithoutRef } from "react"

import { Input } from "../ui/input"

type TextFieldProps = ComponentPropsWithoutRef<"input"> & {
  label: string
  error?: string
  description?: string
}

export function TextField({
  label,
  error,
  description,
  id,
  className,
  ...props
}: TextFieldProps) {
  const inputId = id ?? props.name

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="text-sm font-medium leading-none"
      >
        {label}
      </label>

      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}

      <Input
        id={inputId}
        aria-invalid={error ? "true" : "false"}
        className={className}
        {...props}
      />

      {error ? (
        <p className="text-sm font-medium text-destructive">{error}</p>
      ) : null}
    </div>
  )
}