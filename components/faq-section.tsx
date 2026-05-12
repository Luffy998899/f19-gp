"use client"

import { useState } from "react"
import type { Faq } from "@/lib/data"

type Props = {
  faqs: Faq[]
}

export function FAQSection({ faqs }: Props) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null)
  if (!faqs.length) return null

  return (
    <section className="py-24 md:py-32 border-b border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
          <div className="col-span-12 lg:col-span-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
              <span className="inline-block h-px w-8 bg-foreground" />
              Reference
            </div>
            <h2 className="font-serif text-5xl md:text-6xl tracking-tight leading-[0.95]">
              Frequently
              <br />
              <span className="italic text-accent">asked.</span>
            </h2>
            <p className="mt-6 text-sm text-muted-foreground max-w-xs">
              Cannot find what you&apos;re after? Reach the workshop directly — we reply within one business day.
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="border-t border-border">
              {faqs.map((f, i) => {
                const open = openId === f.id
                return (
                  <div key={f.id} className="border-b border-border">
                    <button
                      type="button"
                      onClick={() => setOpenId(open ? null : f.id)}
                      aria-expanded={open}
                      className="w-full flex items-start justify-between gap-6 py-6 md:py-8 text-left group"
                    >
                      <div className="flex items-baseline gap-6 md:gap-10">
                        <span className="font-mono text-xs text-muted-foreground tabular-nums pt-1">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-serif text-2xl md:text-3xl tracking-tight leading-snug">
                          {f.question}
                        </span>
                      </div>
                      <span
                        className={`font-serif text-3xl md:text-4xl leading-none mt-1 transition-transform duration-300 ${
                          open ? "rotate-45 text-accent" : ""
                        }`}
                        aria-hidden
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pl-0 md:pl-[5.5rem] pr-6 pb-8 text-base text-muted-foreground leading-relaxed">
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
