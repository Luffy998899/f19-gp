import Link from "next/link"
import { ArrowUpRight, Check } from "lucide-react"

const points = [
  "Up to $10,000 for tires, wheels and install",
  "No credit check — your score is never touched",
  "Monthly or bi-weekly payments, up to 3 years",
]

export function FinancingBanner() {
  return (
    <section
      id="financing"
      className="relative border-b border-border bg-card py-20 lg:py-28"
    >
      <div className="h-2 racing-stripes absolute inset-x-0 top-0 opacity-70" />

      <div className="mx-auto max-w-[1400px] px-6">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                / Financing
              </span>
              <span className="h-px w-12 bg-primary" />
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Powered by Driver Capital
              </span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9] text-foreground">
              Fix now.
              <br />
              <span className="text-primary">Pay monthly.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Formula 19 is an authorised Driver Capital Service Centre. Find out
              what you qualify for in seconds — no credit check, no obligation,
              no impact on your score.
            </p>
          </div>

          <div className="lg:col-span-5">
            <ul className="space-y-4 border-l-2 border-primary pl-6">
              {points.map((point) => (
                <li key={point} className="flex gap-3 text-sm text-foreground">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/financing"
              className="group mt-8 inline-flex w-full items-center justify-between bg-primary px-7 py-4 font-display text-lg uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground hover:text-background sm:w-auto sm:gap-6"
            >
              <span>Check my eligibility</span>
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
