import type { ComponentPropsWithoutRef } from "react"

import { Textarea } from "../ui/textarea"

type TextareaFieldProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string
  error?: string
  description?: string
}

export function TextareaField({
  label,
  error,
  description,
  id,
  className,
  ...props
}: TextareaFieldProps) {
  const textareaId = id ?? props.name

  return (
    <div className="space-y-2">
      <label htmlFor={textareaId} className="text-sm font-medium leading-none">
        {label}
      </label>

      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}

      <Textarea
        id={textareaId}
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