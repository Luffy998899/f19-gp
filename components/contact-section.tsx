"use client"

import { useRef, useActionState } from "react"
import { motion, useInView } from "framer-motion"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { submitInquiry, type ContactFormState } from "@/app/actions/contact"

interface ContactSectionProps {
  content: Record<string, string>
}

const initialState: ContactFormState = { status: "idle", message: "" }

export function ContactSection({ content }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [state, formAction, isPending] = useActionState(
    submitInquiry,
    initialState,
  )

  const phone = content.contact_phone || "778-999-8473"
  const email = content.contact_email || "formula19tires@gmail.com"
  const addressLine1 = content.contact_address_line1 || "Unit 1, 715 Evans CT"
  const addressLine2 = content.contact_address_line2 || "Kelowna, BC V1X 6G4"
  const hours = content.business_hours || "Mon-Sat: 9AM - 6PM"
  const whatsapp = content.whatsapp_number || "17789998473"

  const contactInfo = [
    {
      icon: Phone,
      label: "Phone",
      value: phone,
      href: `tel:+${phone.replace(/\D/g, "")}`,
    },
    {
      icon: Mail,
      label: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: `${addressLine1}, ${addressLine2}`,
      href: `https://maps.google.com/maps?q=${encodeURIComponent(addressLine1 + " " + addressLine2)}`,
    },
    {
      icon: Clock,
      label: "Hours",
      value: hours,
      href: null as string | null,
    },
  ]

  return (
    <section ref={sectionRef} id="contact" className="relative py-24">
      <div className="absolute inset-0 bg-zinc-950" />
      <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-red-600/10 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-widest text-red-500">
            Contact Us
          </span>
          <h2 className="mb-6 font-heading text-5xl tracking-wide text-white md:text-6xl lg:text-7xl">
            GET IN TOUCH
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-400">
            Ready to upgrade your ride? Contact us for personalized
            recommendations.
          </p>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Info column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                >
                  {item.href ? (
                    <a
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel={
                        item.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="flex items-start gap-4 rounded-xl border border-white/5 bg-zinc-900 p-5 transition-colors hover:border-red-500/30"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-600/20">
                        <item.icon className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <div className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
                          {item.label}
                        </div>
                        <div className="text-sm font-medium text-white">
                          {item.value}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-4 rounded-xl border border-white/5 bg-zinc-900 p-5">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-red-600/20">
                        <item.icon className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <div className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
                          {item.label}
                        </div>
                        <div className="text-sm font-medium text-white">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-green-600 p-5 font-semibold text-white transition-colors hover:bg-green-700"
            >
              <MessageCircle className="h-6 w-6" />
              Chat on WhatsApp
            </a>

            <div className="aspect-video overflow-hidden rounded-xl border border-white/5 bg-zinc-900">
              <iframe
                src={`https://www.google.com/maps?q=${encodeURIComponent(addressLine1 + " " + addressLine2)}&output=embed`}
                width="100%"
                height="100%"
                style={{
                  border: 0,
                  filter: "grayscale(100%) invert(92%) contrast(83%)",
                }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Formula 19 Tyres Location"
              />
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form
              action={formAction}
              className="rounded-2xl border border-white/5 bg-zinc-900 p-8"
            >
              <h3 className="mb-6 text-2xl font-bold text-white">
                Send Us a Message
              </h3>

              {state.status === "success" && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-green-600/30 bg-green-600/20 p-4 text-green-400">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{state.message}</span>
                </div>
              )}
              {state.status === "error" && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-red-600/30 bg-red-600/20 p-4 text-red-400">
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="text-sm">{state.message}</span>
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm text-zinc-400"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm text-zinc-400"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-sm text-zinc-400"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="778-555-1234"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm text-zinc-400"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="Tire installation quote"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm text-zinc-400"
                  >
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="Tell us about your requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isPending}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-4 font-semibold text-white transition-colors hover:bg-red-700 disabled:bg-red-600/50"
                >
                  {isPending ? (
                    <>
                      <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
