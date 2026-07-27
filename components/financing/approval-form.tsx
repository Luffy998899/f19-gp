"use client"

import { useActionState, useState } from "react"
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react"
import { submitFinancingLead, type FinancingFormState } from "@/app/actions/financing"
import { FINANCING_PROGRAMS, LOAN_MAX, LOAN_MIN } from "@/lib/financing"

interface ApprovalFormProps {
  content: Record<string, string>
}

const initialState: FinancingFormState = { status: "idle", message: "" }

const QUICK_AMOUNTS = [1000, 2500, 5000, 7500, 10000]

/** Rough, shop-specific guidance so an approval number means something. */
function coverageHint(amount: number | null): string | null {
  if (amount === null) return null
  if (amount < LOAN_MIN) return `Driver Capital's minimum loan is $${LOAN_MIN}.`
  if (amount < 1000)
    return "Typically covers a pair of tires with mounting, balancing and TPMS service."
  if (amount < 2500)
    return "Typically covers a full set of four tires with install, balancing and disposal."
  if (amount < 5000)
    return "Typically covers a set of four tires plus alloy wheels and fitting."
  if (amount < 8000)
    return "Typically covers a full performance wheel and tire package, fitted."
  return "Typically covers a premium wheel and tire package, or separate summer and winter sets."
}

export function ApprovalForm({ content }: ApprovalFormProps) {
  const [state, formAction, isPending] = useActionState(submitFinancingLead, initialState)
  const [amount, setAmount] = useState("")

  const phone = content.contact_phone || "778-999-8473"
  const parsed = amount.replace(/\D/g, "")
  const amountValue = parsed ? Number(parsed) : null
  const hint = coverageHint(amountValue)

  return (
    <section
      id="financing-contact"
      className="relative border-b border-border bg-background py-24 scroll-mt-24 lg:py-32"
    >
      <div className="mx-auto max-w-[1400px] px-6">
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
              / Step 03
            </span>
            <span className="h-px w-12 bg-primary" />
          </div>
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] uppercase leading-[0.9] text-foreground">
            Got your number?
            <br />
            <span className="text-primary">Let&apos;s book it.</span>
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Left column — context */}
          <div className="space-y-8 lg:col-span-5">
            <p className="text-lg leading-relaxed text-muted-foreground">
              Send us your approved amount and we&apos;ll come back with exactly
              what it covers on your vehicle — sizes, brands, install slot, the
              lot. If you have your Max Loan guarantee code from Driver Capital,
              include it and we can load the deal before you arrive.
            </p>

            <div className="space-y-px bg-border">
              <a
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="group flex items-center justify-between gap-4 border border-border bg-background p-5 transition-colors hover:bg-card"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-primary text-primary-foreground">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                      Prefer to talk it through
                    </div>
                    <div className="font-display text-lg uppercase tracking-tight text-foreground group-hover:text-primary">
                      {phone}
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
              </a>
            </div>

            <div className="border-l-2 border-primary pl-5">
              <p className="font-mono text-[10px] uppercase leading-relaxed tracking-widest text-muted-foreground">
                Financing is provided by Driver Capital Ltd. Formula 19 Tires is
                an authorised Service Centre, not the lender. All loans are
                subject to Driver Capital&apos;s terms, conditions and vehicle
                requirements.
              </p>
            </div>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-7">
            <form
              action={formAction}
              className="space-y-6 border-2 border-foreground bg-card p-8 lg:p-10"
            >
              <div className="flex items-center justify-between border-b border-border pb-4">
                <h3 className="font-display text-2xl uppercase tracking-tight text-foreground">
                  Financing request
                </h3>
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Form / 002
                </span>
              </div>

              {state.status === "success" && (
                <div className="space-y-4 bg-primary p-5 text-primary-foreground">
                  <p className="font-mono text-xs uppercase leading-relaxed tracking-widest">
                    ✓ {state.message}
                  </p>
                  {state.whatsappUrl && (
                    <a
                      href={state.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-primary-foreground px-5 py-3 font-mono text-[10px] uppercase tracking-widest text-primary transition-opacity hover:opacity-80"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Send it on WhatsApp too
                    </a>
                  )}
                </div>
              )}
              {state.status === "error" && (
                <div className="border border-destructive p-4 font-mono text-xs uppercase tracking-widest text-destructive">
                  ✕ {state.message}
                </div>
              )}

              {/* Approved amount */}
              <div>
                <label
                  htmlFor="approved_amount"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  Your approved amount
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 font-display text-lg text-muted-foreground">
                    $
                  </span>
                  <input
                    id="approved_amount"
                    name="approved_amount"
                    inputMode="numeric"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="2,500"
                    className="w-full border border-border bg-background p-3 pl-8 text-sm text-foreground focus:border-primary focus:outline-none"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {QUICK_AMOUNTS.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(String(value))}
                      className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                        amountValue === value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                      }`}
                    >
                      ${value.toLocaleString()}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {hint ??
                    `Loans run from $${LOAN_MIN} to $${LOAN_MAX.toLocaleString()}. Haven't run the calculator yet? Leave this blank and we'll help.`}
                </p>
              </div>

              {/* Program */}
              <fieldset>
                <legend className="mb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  Which program suits you
                </legend>
                <div className="space-y-px bg-border">
                  {FINANCING_PROGRAMS.map((program, index) => (
                    <label
                      key={program.id}
                      className="flex cursor-pointer items-start gap-3 bg-background p-4 transition-colors hover:bg-card has-[:checked]:bg-card"
                    >
                      <input
                        type="radio"
                        name="program"
                        value={program.id}
                        defaultChecked={index === 0}
                        className="mt-1 h-4 w-4 flex-shrink-0 accent-[var(--primary)]"
                      />
                      <span>
                        <span className="block font-display text-base uppercase tracking-tight text-foreground">
                          {program.name}
                        </span>
                        <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                          {program.creditCheck ? "Credit check" : "No credit check"}
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field name="name" label="Full name" required placeholder="Jane Driver" />
                <Field name="phone" type="tel" label="Phone" required placeholder="778 555 1234" />
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <Field name="email" type="email" label="Email" placeholder="you@example.com" />
                <Field
                  name="guarantee_code"
                  label="Guarantee code"
                  placeholder="From Driver Capital's email"
                />
              </div>

              <Field
                name="vehicle"
                label="Vehicle"
                required
                placeholder="2018 Subaru WRX — 235/45R17"
              />

              <div>
                <label
                  htmlFor="details"
                  className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  What do you need done?
                </label>
                <textarea
                  id="details"
                  name="details"
                  rows={4}
                  placeholder="Set of 4 winter tires and install, ideally before the end of the month..."
                  className="w-full resize-none border border-border bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group flex w-full items-center justify-between bg-primary px-7 py-4 font-display text-lg uppercase tracking-wider text-primary-foreground transition-colors hover:bg-foreground hover:text-background disabled:opacity-60"
              >
                <span>{isPending ? "Sending..." : "Send financing request"}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </button>

              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/80">
                No credit application is submitted from this form — it comes
                straight to the shop.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({
  name,
  label,
  type = "text",
  required = false,
  placeholder,
}: {
  name: string
  label: string
  type?: string
  required?: boolean
  placeholder?: string
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
      >
        {label} {required && <span className="text-primary">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full border border-border bg-background p-3 text-sm text-foreground focus:border-primary focus:outline-none"
      />
    </div>
  )
}
