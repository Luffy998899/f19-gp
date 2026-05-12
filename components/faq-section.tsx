"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import type { Faq } from "@/lib/data"

interface FAQSectionProps {
  faqs: Faq[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)
  if (!faqs.length) return null

  return (
    <section id="faq" className="relative bg-background py-24 lg:py-32 border-b border-border">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left header */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                / FAQ
              </span>
              <span className="w-12 h-px bg-primary" />
            </div>
            <h2 className="font-display text-foreground uppercase text-[clamp(2.5rem,6vw,5rem)] leading-[0.9] mb-6">
              Quick
              <br />
              <span className="text-primary">answers.</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Can&apos;t find what you need? Give us a call — we&apos;re happy to talk
              specs, options, or pricing.
            </p>
          </div>

          {/* Right - FAQ list */}
          <div className="lg:col-span-8">
            <div className="border-t-2 border-foreground">
              {faqs.map((f, i) => {
                const open = openId === f.id
                return (
                  <div
                    key={f.id}
                    className={`border-b border-border ${open ? "bg-card" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : f.id)}
                      aria-expanded={open}
                      className="w-full flex items-start justify-between gap-6 py-6 px-4 lg:px-6 text-left group hover:bg-card transition-colors"
                    >
                      <div className="flex items-start gap-5 flex-1">
                        <span className="font-mono text-xs text-primary tabular-nums pt-1.5 w-10 flex-shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-xl md:text-2xl uppercase tracking-tight text-foreground leading-tight">
                          {f.question}
                        </span>
                      </div>
                      <Plus
                        className={`w-6 h-6 mt-1 flex-shrink-0 transition-transform duration-300 ${
                          open ? "rotate-45 text-primary" : "text-foreground"
                        }`}
                      />
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pl-4 lg:pl-[5.75rem] pr-6 pb-6 text-base text-muted-foreground leading-relaxed">
                          {f.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
