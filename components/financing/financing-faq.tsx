"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { FINANCING_FAQS } from "@/lib/financing"

export function FinancingFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="financing-faq"
      className="relative border-b border-border bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                / Financing FAQ
              </span>
              <span className="h-px w-12 bg-primary" />
            </div>
            <h2 className="mb-6 space-y-2 font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[1.05] tracking-[0.02em] text-foreground">
              <span className="block">Before you</span>
              <span className="block text-primary">apply.</span>
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Still unsure whether financing fits your situation? Call the shop —
              we set these up every week and can tell you in two minutes.
            </p>
          </div>

          <div className="lg:col-span-8">
            <div className="border-t-2 border-foreground">
              {FINANCING_FAQS.map((faq, i) => {
                const open = openIndex === i
                return (
                  <div
                    key={faq.q}
                    className={`border-b border-border ${open ? "bg-card" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(open ? null : i)}
                      aria-expanded={open}
                      className="group flex w-full items-start justify-between gap-6 px-4 py-6 text-left transition-colors hover:bg-card lg:px-6"
                    >
                      <div className="flex flex-1 items-start gap-5">
                        <span className="w-10 flex-shrink-0 pt-1.5 font-mono text-xs tabular-nums text-primary">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-xl uppercase leading-tight tracking-tight text-foreground md:text-2xl">
                          {faq.q}
                        </span>
                      </div>
                      <Plus
                        className={`mt-1 h-6 w-6 flex-shrink-0 transition-transform duration-300 ${
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
                        <p className="pb-6 pl-4 pr-6 text-base leading-relaxed text-muted-foreground lg:pl-[5.75rem]">
                          {faq.a}
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
