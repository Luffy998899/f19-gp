"use client"

import { useState, useTransition } from "react"
import { Trash2 } from "lucide-react"

interface DeleteButtonProps {
  action: () => Promise<{ error?: string; success?: boolean }>
  label?: string
}

export function DeleteButton({ action, label = "Are you sure?" }: DeleteButtonProps) {
  const [confirming, setConfirming] = useState(false)
  const [isPending, startTransition] = useTransition()

  if (confirming) {
    return (
      <div className="flex items-center gap-2 text-xs">
        <span className="text-zinc-400">{label}</span>
        <button
          type="button"
          onClick={() =>
            startTransition(async () => {
              await action()
              setConfirming(false)
            })
          }
          disabled={isPending}
          className="rounded bg-red-600 px-2 py-1 font-semibold text-white hover:bg-red-700 disabled:opacity-50"
        >
          {isPending ? "..." : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded bg-white/10 px-2 py-1 font-semibold text-white hover:bg-white/20"
        >
          No
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="rounded-lg p-2 text-zinc-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
      aria-label="Delete"
    >
      <Trash2 className="h-4 w-4" />
    </button>
  )
}
