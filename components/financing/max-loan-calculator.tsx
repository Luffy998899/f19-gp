"use client"

import { useEffect, useMemo, useState } from "react"
import { ArrowUpRight, Loader2, TriangleAlert } from "lucide-react"
import {
  CALCULATOR_SCRIPT_URL,
  CALCULATOR_STYLE_URL,
  DRIVER_CAPITAL_KEY,
  MAX_LOAN_HOSTED_URL,
} from "@/lib/financing"

type LoadState = "loading" | "ready" | "error"

const ELEMENT_NAME = "maxloan-calculator"
const LOAD_TIMEOUT_MS = 15000

/**
 * Driver Capital's Max Loan Calculator, embedded as their custom element.
 *
 * Two things to know before touching this:
 *
 * 1. The element is documented as `<maxloan-calculator key='...'>`. In React,
 *    `key` is a reserved prop — it is consumed for reconciliation and never
 *    reaches the DOM, so a plain JSX version renders an element with no service
 *    centre key attached. It still *looks* like it works, but no lead ever
 *    reaches the shop. The markup is therefore injected as raw HTML, which
 *    React does not reconcile.
 * 2. The bundle is ~600 KB plus an Angular Material stylesheet, so both are
 *    fetched only once this component actually mounts.
 */
export function MaxLoanCalculator() {
  const [state, setState] = useState<LoadState>("loading")

  const markup = useMemo(
    () => ({ __html: `<${ELEMENT_NAME} key='${DRIVER_CAPITAL_KEY}'></${ELEMENT_NAME}>` }),
    [],
  )

  useEffect(() => {
    let cancelled = false

    if (!document.querySelector("link[data-dc-calculator]")) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = CALCULATOR_STYLE_URL
      link.setAttribute("data-dc-calculator", "")
      document.head.appendChild(link)
    }

    if (!document.querySelector("script[data-dc-calculator]")) {
      const script = document.createElement("script")
      script.type = "module"
      script.src = CALCULATOR_SCRIPT_URL
      script.setAttribute("data-dc-calculator", "")
      script.onerror = () => {
        if (!cancelled) setState("error")
      }
      document.head.appendChild(script)
    }

    customElements.whenDefined(ELEMENT_NAME).then(() => {
      if (!cancelled) setState("ready")
    })

    const timer = setTimeout(() => {
      if (!cancelled) setState((prev) => (prev === "ready" ? prev : "error"))
    }, LOAD_TIMEOUT_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
    }
  }, [])

  if (state === "error") {
    return (
      <div className="border-2 border-primary bg-card p-8 text-center">
        <TriangleAlert className="mx-auto mb-4 h-8 w-8 text-primary" />
        <h3 className="font-display text-2xl uppercase tracking-tight text-foreground">
          Calculator didn&apos;t load
        </h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Your connection or an ad blocker may be blocking it. You can run the
          same calculator on Driver Capital&apos;s site instead — your result
          still comes back to Formula 19.
        </p>
        <a
          href={MAX_LOAN_HOSTED_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 bg-primary px-6 py-3 font-display text-base uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
        >
          Open the calculator <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    )
  }

  return (
    <div className="relative border-2 border-foreground bg-white">
      {state === "loading" && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Loading calculator
          </span>
        </div>
      )}

      {/* Driver Capital ships a light-themed Angular widget — it gets a white
          panel of its own rather than fighting the site's dark palette. */}
      <div
        className="min-h-[560px] p-2 text-black sm:p-6"
        dangerouslySetInnerHTML={markup}
      />
    </div>
  )
}
