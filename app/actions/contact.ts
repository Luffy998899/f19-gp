"use server"

import { createClient } from "@/lib/supabase/server"

export type ContactFormState = {
  status: "idle" | "success" | "error"
  message: string
}

export async function submitInquiry(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = String(formData.get("name") || "").trim()
  const email = String(formData.get("email") || "").trim()
  const phone = String(formData.get("phone") || "").trim()
  const subject = String(formData.get("subject") || "").trim()
  const message = String(formData.get("message") || "").trim()

  if (!name || !email || !message) {
    return {
      status: "error",
      message: "Please fill out all required fields.",
    }
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { status: "error", message: "Please enter a valid email address." }
  }

  const supabase = await createClient()
  const { error } = await supabase.from("inquiries").insert({
    name,
    email,
    phone: phone || null,
    subject: subject || null,
    message,
    status: "new",
  })

  if (error) {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    }
  }

  return {
    status: "success",
    message: "Thank you! We will get back to you within 24 hours.",
  }
}

// ---------------------------------------------------------------------------
// Quote inquiry: triggered from "DM us for the quote" buttons on product cards.
// Saves the inquiry, then returns a WhatsApp deep link the client can open
// with the enquiry pre-filled as the first message.
// ---------------------------------------------------------------------------

export type QuoteResult =
  | { ok: true; whatsappUrl: string }
  | { ok: false; error: string }

function digitsOnly(input: string) {
  return input.replace(/\D/g, "")
}

export async function submitQuoteInquiry(formData: FormData): Promise<QuoteResult> {
  const name = String(formData.get("name") || "").trim()
  const contact = String(formData.get("contact") || "").trim()
  const details = String(formData.get("details") || "").trim()
  const productName = String(formData.get("product_name") || "").trim()

  if (!name || !contact || !details) {
    return { ok: false, error: "Please fill out all fields." }
  }

  const supabase = await createClient()

  // Look up the configured WhatsApp number from site_content; fall back to a
  // sensible default that matches the rest of the app.
  const { data: contentRows } = await supabase
    .from("site_content")
    .select("key, value")
    .in("key", ["whatsapp_number"])
  const whatsappRaw =
    contentRows?.find((r) => r.key === "whatsapp_number")?.value || "17789998473"
  const whatsappNumber = digitsOnly(whatsappRaw) || "17789998473"

  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)
  const subject = productName
    ? `Quote request: ${productName}`
    : "Quote request"

  const { error } = await supabase.from("inquiries").insert({
    name,
    email: isEmail ? contact : `${digitsOnly(contact) || "unknown"}@whatsapp.lead`,
    phone: isEmail ? null : contact,
    subject,
    message: details,
    status: "new",
  })

  if (error) {
    return { ok: false, error: "Could not save your request. Please try again." }
  }

  const lines = [
    "Hi Formula 19, I'd like a quote.",
    productName ? `Product: ${productName}` : null,
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Details: ${details}`,
  ].filter(Boolean) as string[]

  const text = encodeURIComponent(lines.join("\n"))
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${text}`

  return { ok: true, whatsappUrl }
}
