import type { ComponentPropsWithoutRef } from "react"

type SelectOption = {
  label: string
  value: string
}

type SelectFieldProps = ComponentPropsWithoutRef<"select"> & {
  label: string
  error?: string
  description?: string
  options: SelectOption[]
}

export function SelectField({
  label,
  error,
  description,
  options,
  id,
  className,
  ...props
}: SelectFieldProps) {
  const selectId = id ?? props.name

  return (
    <div className="space-y-2">
      <label htmlFor={selectId} className="text-sm font-medium leading-none">
        {label}
      </label>

      {description ? (
        <p className="text-sm text-muted-foreground">{description}</p>
      ) : null}

      <select
        id={selectId}
        aria-invalid={error ? "true" : "false"}
        className={[
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none transition-colors",
          "focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-destructive" : "",
          className ?? "",
        ].join(" ")}
        {...props}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error ? (
        <p className="text-sm font-medium text-destructive">{error}</p>
      ) : null}
    </div>
  )
}