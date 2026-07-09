import { AlertTriangle } from "lucide-react"
import { useState } from "react"
import type { ReactNode } from "react"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

type DeleteDialogProps = {
  trigger: ReactNode
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
}

export function DeleteDialog({
  trigger,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false)

  function handleConfirm() {
    onConfirm()
    setOpen(false)
  }

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        className="inline-flex"
        onClick={() => setOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            setOpen(true)
          }
        }}
      >
        {trigger}
      </span>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <div className="mb-2 flex size-10 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="size-5 text-destructive" />
            </div>

            <DialogTitle>{title}</DialogTitle>

            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              {cancelLabel}
            </Button>

            <Button variant="destructive" onClick={handleConfirm}>
              {confirmLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}