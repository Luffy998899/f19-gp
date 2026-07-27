import { Calculator, CalendarCheck, Wallet } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: Calculator,
    title: "Calculate your max loan",
    description:
      "Enter a few basic vehicle details. Driver Capital works out what your vehicle supports and emails you a Max Loan guarantee code — no credit check, no obligation, no impact on your score.",
  },
  {
    num: "02",
    icon: CalendarCheck,
    title: "Book the work with us",
    description:
      "Send us your approved amount and guarantee code. We confirm what it covers, order your tires or wheels, and set an install date. Paperwork and the Shepherd Protect GPS unit are handled here in the shop.",
  },
  {
    num: "03",
    icon: Wallet,
    title: "Drive out, pay it down",
    description:
      "You leave on your new setup the same day. Driver Capital sends SMS reminders and you manage payments in the MyDC portal — pay it off early any time, no penalty.",
  },
]

export function FinancingSteps() {
  return (
    <section className="relative border-b border-border bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                / How it works
              </span>
              <span className="h-px w-12 bg-primary" />
            </div>
            <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9] text-foreground">
              Three steps.
              <br />
              <span className="text-primary">One visit.</span>
            </h2>
          </div>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">
            Most customers go from &ldquo;what can I afford?&rdquo; to fitted and
            rolling inside a single appointment.
          </p>
        </div>

        <div className="grid gap-px bg-border lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon
            return (
              <article
                key={step.num}
                className="group relative bg-background p-8 transition-colors hover:bg-card lg:p-10"
              >
                <div className="mb-8 flex items-start justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    {step.num} / 03
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center border border-border transition-colors group-hover:border-primary group-hover:bg-primary">
                    <Icon className="h-5 w-5 text-foreground transition-colors group-hover:text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-display text-3xl uppercase tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
                <div className="mt-6 h-px w-12 bg-primary" />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
