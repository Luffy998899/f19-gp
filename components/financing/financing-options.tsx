import { Check, CreditCard, ShieldOff } from "lucide-react"
import { FINANCING_PROGRAMS } from "@/lib/financing"

export function FinancingOptions() {
  return (
    <section
      id="options"
      className="relative border-b border-border bg-background py-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                / Your options
              </span>
              <span className="h-px w-12 bg-primary" />
            </div>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9] text-foreground">
              Two ways in.
              <br />
              <span className="text-primary">Three programs.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Finding out your Max Loan amount never touches your credit. Once you
            know the number, you pick the program — keep credit out of it
            entirely, or opt into a check to chase a lower rate.
          </p>
        </div>

        {/* Path headers */}
        <div className="mb-px grid gap-px bg-border lg:grid-cols-3">
          <div className="bg-card p-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <ShieldOff className="h-5 w-5 text-primary" />
              <span className="font-display text-2xl uppercase tracking-tight text-foreground">
                Path A — No credit check
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Approved on the value of your vehicle. Your score is never pulled
              and never affected.
            </p>
          </div>
          <div className="bg-card p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-5 w-5 text-primary" />
              <span className="font-display text-2xl uppercase tracking-tight text-foreground">
                Path B — Credit check
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              You choose to have credit pulled in exchange for a rate tied to
              your score.
            </p>
          </div>
        </div>

        {/* Programs */}
        <div className="grid gap-px bg-border lg:grid-cols-3">
          {FINANCING_PROGRAMS.map((program) => (
            <article
              key={program.id}
              className="group flex flex-col bg-background p-8 transition-colors hover:bg-card lg:p-10"
            >
              <div className="mb-8 flex items-start justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Option {program.num}
                </span>
                <span
                  className={`px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${
                    program.creditCheck
                      ? "bg-foreground text-background"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {program.creditCheck ? "Credit check" : "No credit check"}
                </span>
              </div>

              <h3 className="font-display text-3xl uppercase tracking-tight text-foreground">
                {program.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-primary">
                {program.tagline}
              </p>

              <ul className="mt-8 space-y-3">
                {program.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm text-muted-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                    <span className="leading-relaxed">{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 h-px w-12 bg-primary" />
            </article>
          ))}
        </div>

        <p className="mt-8 max-w-3xl font-mono text-[10px] uppercase leading-relaxed tracking-widest text-muted-foreground">
          Loans from $500 to $10,000 · Terms up to 3 years · Monthly or bi-weekly
          payments · Pay off early with no penalty · Rates from 9.9% OAC on the
          credit-check program
        </p>
      </div>
    </section>
  )
}
