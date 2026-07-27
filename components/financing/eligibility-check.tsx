"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, Check, Lock, ShieldCheck } from "lucide-react"
import { AUTOMATIC_CRITERION, ELIGIBILITY_CRITERIA } from "@/lib/financing"
import { MaxLoanCalculator } from "@/components/financing/max-loan-calculator"

export function EligibilityCheck() {
  const [confirmed, setConfirmed] = useState<Record<string, boolean>>({})
  const [revealed, setRevealed] = useState(false)
  const calculatorRef = useRef<HTMLDivElement>(null)

  // Bring the calculator into view the moment it is unlocked, otherwise it
  // opens below the fold and reads as if nothing happened.
  useEffect(() => {
    if (revealed) calculatorRef.current?.scrollIntoView({ block: "start" })
  }, [revealed])

  const total = ELIGIBILITY_CRITERIA.length
  const count = ELIGIBILITY_CRITERIA.filter((c) => confirmed[c.id]).length
  const allConfirmed = count === total

  function toggle(id: string) {
    setConfirmed((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <section
      id="eligibility"
      className="relative border-b border-border bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                / Step 01
              </span>
              <span className="h-px w-12 bg-primary" />
            </div>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9] text-foreground">
              Check your
              <br />
              <span className="text-primary">eligibility.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Five quick questions. Nothing is submitted and nothing is stored —
            this is just so you know where you stand before you spend a minute on
            the calculator.
          </p>
        </div>

        <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {ELIGIBILITY_CRITERIA.map((criterion, index) => {
            const isOn = Boolean(confirmed[criterion.id])
            return (
              <button
                key={criterion.id}
                type="button"
                aria-pressed={isOn}
                onClick={() => toggle(criterion.id)}
                className={`group relative flex flex-col items-start p-8 text-left transition-colors ${
                  isOn ? "bg-card" : "bg-background hover:bg-card"
                }`}
              >
                <div className="mb-6 flex w-full items-start justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex h-8 w-8 items-center justify-center border transition-colors ${
                      isOn
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border text-transparent group-hover:border-primary"
                    }`}
                  >
                    <Check className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="font-display text-xl uppercase tracking-tight text-foreground">
                  {criterion.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {criterion.detail}
                </p>
                <div
                  className={`mt-6 h-px w-12 transition-colors ${
                    isOn ? "bg-primary" : "bg-border"
                  }`}
                />
              </button>
            )
          })}

          {/* Handled by Driver Capital, shown so the list is complete. */}
          <div className="flex flex-col items-start bg-background p-8">
            <div className="mb-6 flex w-full items-start justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                Auto
              </span>
              <span className="flex h-8 w-8 items-center justify-center border border-border text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
              </span>
            </div>
            <h3 className="font-display text-xl uppercase tracking-tight text-muted-foreground">
              {AUTOMATIC_CRITERION.label}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {AUTOMATIC_CRITERION.detail}
            </p>
            <div className="mt-6 h-px w-12 bg-border" />
          </div>
        </div>

        {/* Result bar */}
        <div className="mt-px flex flex-col gap-6 border-2 border-foreground bg-card p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <div className="font-display text-5xl leading-none text-primary num-badge">
              {count}
              <span className="text-foreground">/{total}</span>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Requirements confirmed
              </div>
              <p className="mt-1 max-w-md text-sm leading-relaxed text-foreground">
                {allConfirmed
                  ? "You meet every requirement. Find out what you qualify for — no credit check, no impact on your score."
                  : "Tick everything that applies to you. Not sure about one? Call the shop and we'll walk you through it."}
              </p>
            </div>
          </div>

          <div className="flex flex-shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
            {!allConfirmed && (
              <a
                href="#financing-contact"
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                Ask us instead
              </a>
            )}
            <button
              type="button"
              disabled={!allConfirmed}
              onClick={() => setRevealed(true)}
              className="group inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 font-display text-lg uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground hover:text-background disabled:cursor-not-allowed disabled:bg-muted disabled:text-muted-foreground"
            >
              {allConfirmed ? (
                <>
                  Calculate my max loan
                  <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Calculate my max loan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Step 02 — the calculator itself, loaded on demand */}
        {revealed && (
          <div ref={calculatorRef} id="calculator" className="reveal mt-24 scroll-mt-24">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                    / Step 02
                  </span>
                  <span className="h-px w-12 bg-primary" />
                </div>
                <h2 className="font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-[0.9] text-foreground">
                  Your max loan
                  <span className="text-primary">.</span>
                </h2>
              </div>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                Enter your vehicle details below. Driver Capital emails you a Max
                Loan guarantee code — bring that code back here in Step 03 and
                we&apos;ll book the work.
              </p>
            </div>

            <MaxLoanCalculator />
          </div>
        )}
      </div>
    </section>
  )
}
