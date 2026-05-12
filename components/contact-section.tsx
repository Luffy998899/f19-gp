"use client"

import { useActionState } from "react"
import { submitInquiry, type ContactFormState } from "@/app/actions/contact"

type Props = {
  content: Record<string, string>
}

const initialState: ContactFormState = { status: "idle", message: "" }

export function ContactSection({ content }: Props) {
  const [state, formAction, isPending] = useActionState(submitInquiry, initialState)

  const phone = content.contact_phone || "778-999-8473"
  const email = content.contact_email || "formula19tires@gmail.com"
  const addressLine1 = content.contact_address_line1 || "Unit 1, 715 Evans CT"
  const addressLine2 = content.contact_address_line2 || "Kelowna, BC V1X 6G4"
  const hours = content.business_hours || "Mon–Sat · 9.00 – 18.00"
  const whatsapp = content.whatsapp_number || "17789998473"

  return (
    <section id="enquiries" className="py-24 md:py-32 border-b border-border">
      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="grid grid-cols-12 gap-y-12 md:gap-x-10">
          {/* Left: title + details */}
          <div className="col-span-12 lg:col-span-5 flex flex-col justify-between gap-12">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground mb-6">
                <span className="inline-block h-px w-8 bg-foreground" />
                Enquiries
              </div>
              <h2 className="font-serif text-5xl md:text-7xl tracking-tight leading-[0.95]">
                Write to the
                <br />
                <span className="italic text-accent">workshop.</span>
              </h2>
              <p className="mt-6 text-base text-muted-foreground max-w-md leading-relaxed">
                For a fitting appointment, custom order, or trade enquiry. We reply within one business day.
              </p>
            </div>

            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6 border-t border-border pt-8">
              <div>
                <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Telephone
                </dt>
                <dd>
                  <a
                    href={`tel:+${phone.replace(/\D/g, "")}`}
                    className="font-serif text-xl hover:text-accent transition-colors"
                  >
                    {phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Correspondence
                </dt>
                <dd>
                  <a
                    href={`mailto:${email}`}
                    className="font-serif text-xl hover:text-accent transition-colors break-all"
                  >
                    {email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Atelier
                </dt>
                <dd className="font-serif text-xl leading-tight">
                  {addressLine1}
                  <br />
                  {addressLine2}
                </dd>
              </div>
              <div>
                <dt className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Hours
                </dt>
                <dd className="font-serif text-xl leading-tight">{hours}</dd>
              </div>
            </dl>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between border-t border-b border-foreground py-4 text-sm font-mono uppercase tracking-widest hover:text-accent hover:border-accent transition-colors"
            >
              <span>Or message on WhatsApp</span>
              <span aria-hidden>↗</span>
            </a>
          </div>

          {/* Right: form */}
          <div className="col-span-12 lg:col-span-7">
            <form action={formAction} className="space-y-8">
              {state.status === "success" && (
                <p className="border border-foreground bg-secondary p-4 text-sm font-mono uppercase tracking-widest">
                  ✓ {state.message}
                </p>
              )}
              {state.status === "error" && (
                <p className="border border-accent text-accent p-4 text-sm font-mono uppercase tracking-widest">
                  ✕ {state.message}
                </p>
              )}

              <Field name="name" label="Name" required placeholder="Your full name" />
              <Field name="email" type="email" label="Email" required placeholder="you@example.com" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field name="phone" type="tel" label="Telephone" placeholder="778 555 1234" />
                <Field name="subject" label="Subject" placeholder="Wheel & tyre quote" />
              </div>

              <div className="border-b border-border focus-within:border-foreground transition-colors pb-2">
                <label
                  htmlFor="message"
                  className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2"
                >
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="w-full bg-transparent font-serif text-xl placeholder:text-muted-foreground/50 focus:outline-none resize-none"
                  placeholder="Tell us what you&rsquo;re after…"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="group inline-flex items-center justify-between w-full md:w-auto bg-foreground text-background px-8 py-5 font-mono text-xs uppercase tracking-widest hover:bg-accent transition-colors disabled:opacity-60 gap-12"
              >
                <span>{isPending ? "Sending…" : "Send enquiry"}</span>
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
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
    <div className="border-b border-border focus-within:border-foreground transition-colors pb-2">
      <label
        htmlFor={name}
        className="block text-[10px] font-mono uppercase tracking-widest text-muted-foreground mb-2"
      >
        {label} {required && <span className="text-accent">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent font-serif text-xl placeholder:text-muted-foreground/50 focus:outline-none"
      />
    </div>
  )
}
