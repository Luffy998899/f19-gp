import { ArrowDown, Phone } from "lucide-react"

interface FinancingHeroProps {
  content: Record<string, string>
}

const stats = [
  { value: "$10,000", label: "Max loan" },
  { value: "0", label: "Credit checks required" },
  { value: "3 yrs", label: "Payment terms" },
  { value: "Seconds", label: "To an answer" },
]

export function FinancingHero({ content }: FinancingHeroProps) {
  const phone = content.contact_phone || "778-999-8473"

  return (
    <section className="relative border-b border-border bg-background pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-6 flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            / Financing
          </span>
          <span className="h-px w-12 bg-primary" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Powered by Driver Capital
          </span>
        </div>

        <h1 className="font-display text-[clamp(3rem,11vw,10rem)] uppercase leading-[0.85] text-foreground">
          Fix now.
          <br />
          <span className="text-primary">Pay monthly.</span>
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-12">
          <p className="text-lg leading-relaxed text-muted-foreground lg:col-span-6">
            New tires, wheels or a full install shouldn&apos;t have to wait for
            payday. Formula 19 is an authorised Driver Capital Service Centre —
            find out what you qualify for in seconds, with no credit check and no
            impact on your score, then pay it down monthly or bi-weekly.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start lg:col-span-6 lg:justify-end">
            <a
              href="#eligibility"
              className="group inline-flex items-center justify-center gap-3 bg-primary px-7 py-4 font-display text-lg uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              Check my eligibility
              <ArrowDown className="h-5 w-5 transition-transform group-hover:translate-y-1" />
            </a>
            <a
              href={`tel:${phone.replace(/\D/g, "")}`}
              className="inline-flex items-center justify-center gap-3 border border-border px-7 py-4 font-display text-lg uppercase tracking-wider text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Phone className="h-4 w-4" />
              {phone}
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="mt-16 grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-background p-6">
              <div className="font-display text-4xl uppercase leading-none text-foreground num-badge lg:text-5xl">
                {stat.value}
              </div>
              <div className="mt-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Racing accent */}
      <div className="mt-16 h-2 racing-stripes opacity-70" />
    </section>
  )
}
