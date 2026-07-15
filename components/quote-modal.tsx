"use client"

import { useEffect, useRef, useState, useTransition } from "react"
import { X, Send, MessageCircle } from "lucide-react"
import { submitQuoteInquiry } from "@/app/actions/contact"

interface QuoteModalProps {
  open: boolean
  onClose: () => void
  productName?: string | null
}

export function QuoteModal({ open, onClose, productName }: QuoteModalProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)

  // Close on Escape
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  // Lock body scroll while open
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  if (!open) return null

  function handleSubmit(formData: FormData) {
    setError(null)
    startTransition(async () => {
      const result = await submitQuoteInquiry(formData)
      if (!result.ok) {
        setError(result.error)
        return
      }
      // Open WhatsApp in a new tab with the prefilled message, then dismiss.
      window.open(result.whatsappUrl, "_blank", "noopener,noreferrer")
      onClose()
    })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Request a quote"
      className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        ref={dialogRef}
        className="relative w-full sm:max-w-lg bg-background border-t-2 sm:border-2 border-primary text-foreground"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-border p-6">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
              / DM for quote
            </div>
            <h2 className="font-display uppercase text-2xl leading-none tracking-wide">
              Get your quote
            </h2>
            {productName ? (
              <p className="mt-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Re: {productName}
              </p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form action={handleSubmit} className="p-6 space-y-5">
          {productName ? (
            <input type="hidden" name="product_name" value={productName} />
          ) : null}

          <Field label="Your name" required>
            <input
              name="name"
              required
              autoFocus
              placeholder="Jane Doe"
              className="quote-input"
            />
          </Field>

          <Field label="Phone or email" required>
            <input
              name="contact"
              required
              placeholder="(778) 555-1234 or you@email.com"
              className="quote-input"
            />
          </Field>

          <Field label="What are you after?" required>
            <textarea
              name="details"
              required
              rows={4}
              placeholder="Vehicle, tire/wheel size, qty, install needs..."
              className="quote-input resize-none"
            />
          </Field>

          {error ? (
            <p className="text-sm text-primary font-mono uppercase tracking-widest">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground py-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 font-mono text-xs uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors disabled:opacity-60"
            >
              {isPending ? (
                <>Sending...</>
              ) : (
                <>
                  <MessageCircle className="w-4 h-4" /> Send to WhatsApp{" "}
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80">
            Submitting opens WhatsApp with your enquiry pre-filled.
          </p>
        </form>

        <style jsx global>{`
          .quote-input {
            width: 100%;
            background: transparent;
            border: 1px solid hsl(var(--border, 0 0% 20%));
            border-radius: 0;
            padding: 0.75rem 0.875rem;
            color: inherit;
            font-size: 0.9rem;
            outline: none;
            transition: border-color 0.15s;
          }
          .quote-input::placeholder {
            color: hsl(var(--muted-foreground, 0 0% 60%));
          }
          .quote-input:focus {
            border-color: hsl(var(--primary, 0 80% 55%));
          }
        `}</style>
      </div>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="block font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">
        {label}
        {required ? <span className="text-primary"> *</span> : null}
      </span>
      {children}
    </label>
  )
}
